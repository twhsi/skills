#!/usr/bin/env python3
"""Extract 8 keywords from text and emit a centerless weighted graph JSON."""

from __future__ import annotations

import argparse
import json
import math
import re
from collections import Counter, defaultdict
from datetime import datetime, timezone
from pathlib import Path


BASE_STOPWORDS = {
    "的",
    "了",
    "和",
    "與",
    "是",
    "在",
    "我",
    "你",
    "他",
    "她",
    "它",
    "們",
    "這",
    "那",
    "可以",
    "如果",
    "因為",
    "所以",
    "以及",
    "就是",
    "不是",
    "需要",
    "想要",
    "每個",
    "都",
    "不",
    "不應該",
    "應該",
    "成為",
    "互相",
    "影響",
    "提升",
    "改善",
    "中心",
    "目標",
    "中心目標",
    "主目標",
    "main",
    "goal",
    "the",
    "and",
    "for",
    "with",
    "that",
    "this",
    "from",
    "into",
    "your",
    "you",
    "are",
    "can",
}


DEFAULT_BLACKLIST = ["中心目標", "主目標", "main goal", "goal", "中心", "目標"]


def split_terms(text: str) -> list[str]:
    return [term.strip().lower() for term in re.split(r"[\n,，、;；]+", text) if term.strip()]


def strip_blacklist(text: str, blacklist: list[str]) -> str:
    cleaned = text
    for term in sorted(blacklist, key=len, reverse=True):
      if len(term) < 2:
          continue
      cleaned = re.sub(re.escape(term), " ", cleaned, flags=re.IGNORECASE)
    return cleaned


def tokenize(text: str, blacklist: set[str]) -> list[str]:
    normalized = re.sub(r"[，。！？、；：「」『』（）()【】\[\]{}<>《》.,!?;:\"'`~|/@#$%^&*_+=\\-]", " ", text)
    normalized = re.sub(r"\s+", " ", normalized).strip().lower()
    chunks = re.findall(r"[\u4e00-\u9fff]+|[a-z][a-z0-9_]{1,}", normalized)
    tokens: list[str] = []
    for chunk in chunks:
        if re.fullmatch(r"[\u4e00-\u9fff]+", chunk):
            tokens.extend(segment_cjk_run(chunk))
        else:
            tokens.append(chunk)
    return [token for token in tokens if useful_token(token, blacklist)]


def segment_cjk_run(run: str) -> list[str]:
    breakers = (
        "不應該|應該|需要|可以|以及|因為|所以|就是|不是|如果|成為|互相|影響|"
        "提升|改善|高度|相關|平衡|和|與|及|並|也|而|會|是|的|了|在|都|不"
    )
    parts = [part for part in re.split(f"({breakers})", run) if part]
    tokens: list[str] = []
    for part in parts:
        if re.fullmatch(breakers, part):
            tokens.append(part)
        elif len(part) <= 4:
            tokens.append(part)
        else:
            tokens.extend(part[index : index + 4] for index in range(0, len(part), 4))
    return tokens


def useful_token(token: str, blacklist: set[str]) -> bool:
    if not token or token in BASE_STOPWORDS or token in blacklist:
        return False
    if token.isdigit() or len(token) < 2:
        return False
    return True


def split_sentences(text: str) -> list[str]:
    sentences = [part.strip() for part in re.split(r"(?<=[。！？.!?])\s+|[\n\r]+", text) if part.strip()]
    return sentences or [text.strip()] if text.strip() else []


def score_terms(tokens: list[str]) -> list[dict]:
    counts = Counter(tokens)
    positions = defaultdict(list)
    for index, token in enumerate(tokens):
        positions[token].append(index)
    total = max(1, len(tokens) - 1)
    ranked = []
    for term, count in counts.items():
        spread = (max(positions[term]) - min(positions[term])) / total if count > 1 else 0
        score = count * math.log(2 + len(term)) * (1 + spread * 0.25)
        ranked.append({"term": term, "count": count, "score": score, "positions": positions[term]})
    return sorted(ranked, key=lambda item: (-item["score"], item["term"]))


def build_edges(tokens: list[str], labels: list[str], window_size: int, min_weight: int, edge_limit: int) -> list[dict]:
    keyword_set = set(labels)
    raw_weights = defaultdict(int)
    for index, token in enumerate(tokens):
        if token not in keyword_set:
            continue
        for cursor in range(index + 1, min(len(tokens), index + window_size + 1)):
            other = tokens[cursor]
            if other not in keyword_set or other == token:
                continue
            source, target = sorted((token, other))
            raw_weights[(source, target)] += window_size - (cursor - index) + 1

    if not raw_weights and len(labels) > 1:
        for index in range(len(labels) - 1):
            raw_weights[(labels[index], labels[index + 1])] = 1

    max_raw = max(raw_weights.values() or [1])
    edges = []
    for (source, target), raw in raw_weights.items():
        weight = max(1, min(9, round(raw / max_raw * 9)))
        if weight >= min_weight:
            edges.append({
                "source": source,
                "target": target,
                "weight": weight,
                "raw": raw,
                "relation": "co_occurs",
            })
    edges.sort(key=lambda edge: (-edge["weight"], edge["source"], edge["target"]))
    return edges[:edge_limit]


def evidence_for(term: str, sentences: list[str]) -> list[str]:
    matches = [sentence for sentence in sentences if term.lower() in sentence.lower()]
    return matches[:3]


def build_graph(text: str, blacklist_terms: list[str], keyword_count: int, window_size: int, min_weight: int, edge_limit: int) -> dict:
    blacklist = set(term.lower() for term in blacklist_terms)
    cleaned = strip_blacklist(text, blacklist_terms)
    tokens = tokenize(cleaned, blacklist)
    ranked = score_terms(tokens)
    selected = ranked[:keyword_count]
    while len(selected) < keyword_count:
        filler = f"未命名{len(selected) + 1}"
        selected.append({"term": filler, "count": 1, "score": 0.1, "positions": []})

    labels = [item["term"] for item in selected]
    edges_by_label = build_edges(tokens, labels, window_size, min_weight, edge_limit)
    max_count = max([item["count"] for item in selected] or [1])
    max_score = max([item["score"] for item in selected] or [1])
    sentences = split_sentences(text)

    connections = defaultdict(list)
    for edge in edges_by_label:
        connections[edge["source"]].append((edge["target"], edge["weight"]))
        connections[edge["target"]].append((edge["source"], edge["weight"]))

    nodes = []
    for index, item in enumerate(selected):
        label = item["term"]
        evidence = evidence_for(label, sentences)
        connected = sorted(connections[label], key=lambda pair: -pair[1])
        related = "、".join(term for term, _ in connected[:3]) or "尚未形成強連線"
        best_sentence = evidence[0] if evidence else "文本中沒有足夠句子可提取脈絡。"
        definition = f"「{label}」是本文中的關鍵概念，主要由出現頻率、分佈範圍與共現關係判定。"
        note = f"{definition} 它目前最接近的概念是 {related}。代表脈絡：{best_sentence}"
        nodes.append({
            "id": f"k{index}",
            "label": label,
            "count": item["count"],
            "score": round(item["score"] / max_score, 3),
            "weight": max(1, min(9, round(item["count"] / max_count * 9))),
            "definition": definition,
            "note": note,
            "evidence": evidence,
        })

    id_by_label = {node["label"]: node["id"] for node in nodes}
    edges = [
        {
            "id": f"e{index}",
            "source": id_by_label[edge["source"]],
            "target": id_by_label[edge["target"]],
            "weight": edge["weight"],
            "raw": edge["raw"],
            "relation": edge["relation"],
        }
        for index, edge in enumerate(edges_by_label)
        if edge["source"] in id_by_label and edge["target"] in id_by_label
    ]

    return {
        "meta": {
            "model": "keyword_graph_view",
            "keyword_count": keyword_count,
            "layout": "distributed_weighted_network",
            "blacklist": blacklist_terms,
            "generated_at": datetime.now(timezone.utc).isoformat(),
        },
        "nodes": nodes,
        "edges": edges,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("input", help="Input text file")
    parser.add_argument("--blacklist", help="Optional blacklist text file")
    parser.add_argument("--out", help="Output JSON path")
    parser.add_argument("--keyword-count", type=int, default=8)
    parser.add_argument("--window-size", type=int, default=9)
    parser.add_argument("--min-weight", type=int, default=1)
    parser.add_argument("--edge-limit", type=int, default=18)
    args = parser.parse_args()

    text = Path(args.input).read_text(encoding="utf-8")
    blacklist_text = Path(args.blacklist).read_text(encoding="utf-8") if args.blacklist else "\n".join(DEFAULT_BLACKLIST)
    graph = build_graph(
        text,
        split_terms(blacklist_text),
        max(1, min(32, args.keyword_count)),
        max(2, args.window_size),
        max(1, args.min_weight),
        max(1, args.edge_limit),
    )
    output = json.dumps(graph, ensure_ascii=False, indent=2)
    if args.out:
        Path(args.out).write_text(output + "\n", encoding="utf-8")
    else:
        print(output)


if __name__ == "__main__":
    main()
