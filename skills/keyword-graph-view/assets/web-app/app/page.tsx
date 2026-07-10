"use client";

import { ChangeEvent, useMemo, useState, useSyncExternalStore } from "react";
import { Ban, BookOpenText, Copy, FileText, Network, SlidersHorizontal, Sparkles, Trash2, Upload, ZoomIn, ZoomOut } from "lucide-react";
import { caseArticles, type CaseArticle } from "./cases";

type NodeItem = {
  id: string;
  label: string;
  count: number;
  score: number;
  weight: number;
  x: number;
  y: number;
  definition: string;
  note: string;
  evidence: string[];
};

type EdgeItem = {
  id: string;
  source: string;
  target: string;
  weight: number;
  raw: number;
  relation: "co_occurs";
};

type GraphData = {
  meta: {
    model: string;
    keyword_count: number;
    layout: string;
    blacklist: string[];
    generated_at: string;
  };
  nodes: NodeItem[];
  edges: EdgeItem[];
};

type GraphConfig = {
  text: string;
  blacklist: string;
  windowSize: number;
  edgeLimit: number;
  minWeight: number;
};

const baseStopwords = new Set(
  [
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
    "一個",
    "可以",
    "如果",
    "因為",
    "所以",
    "以及",
    "並且",
    "就是",
    "不是",
    "不只",
    "不只是",
    "只是",
    "而是",
    "但是",
    "什麼",
    "我的",
    "說道",
    "說",
    "子曰",
    "有子曰",
    "曾子曰",
    "子貢曰",
    "子夏曰",
    "需要",
    "想要",
    "每個",
    "這個",
    "那個",
    "這些",
    "那些",
    "哪些",
    "自己",
    "我們",
    "你們",
    "你的",
    "他的",
    "她的",
    "沒有",
    "真正",
    "非常",
    "目前",
    "代表",
    "本文",
    "文本",
    "案例",
    "一篇",
    "都",
    "不",
    "不應該",
    "應該",
    "不可",
    "以此",
    "成為",
    "互相",
    "影響",
    "提升",
    "改善",
    "作者",
    "譯文",
    "原典",
    "註釋",
    "講話",
    "在線閱讀",
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
    "my",
    "me",
    "mine",
    "you",
    "are",
    "is",
    "was",
    "were",
    "can",
    "of",
    "to",
    "in",
    "on",
    "at",
    "as",
    "by",
    "be",
    "or",
    "an",
    "a",
    "it",
    "its",
    "he",
    "him",
    "his",
    "she",
    "her",
    "we",
    "our",
    "they",
    "them",
    "their",
    "what",
    "which",
    "when",
    "where",
    "who",
    "how",
    "then",
    "there",
    "these",
    "those",
    "one",
    "two",
    "all",
    "any",
    "thing",
    "things",
    "something",
    "anything",
    "some",
    "many",
    "much",
    "not",
    "no",
    "if",
    "will",
    "must",
    "would",
    "should",
    "could",
    "do",
    "does",
    "did",
    "done",
    "had",
    "has",
    "have",
    "having",
    "get",
    "got",
    "chapter",
    "notes",
    "said",
    "says",
  ].map((term) => term.toLowerCase()),
);

const singleCjkKeywords = new Set(["仁", "信", "孝", "道", "學", "習", "友", "禮", "法", "天", "地", "將", "兵", "勢", "勝", "計", "智", "勇", "嚴", "空", "相", "心", "佛"]);

const sampleText = caseArticles[0].text;

const defaultBlacklist = `中心目標
主目標
main goal
goal
中心
目標`;

const edgePalette = [
  "#7c3aed",
  "#4f46e5",
  "#2563eb",
  "#0891b2",
  "#16a34a",
  "#84cc16",
  "#eab308",
  "#f97316",
  "#ef4444",
];

function splitBlacklist(value: string) {
  return value
    .split(/[\n,，、;；]+/)
    .map((term) => term.trim().toLowerCase())
    .filter(Boolean);
}

function removeBlacklist(text: string, blacklist: string[]) {
  return blacklist
    .filter((term) => term.length >= 2)
    .sort((a, b) => b.length - a.length)
    .reduce((current, term) => current.replace(new RegExp(escapeRegExp(term), "gi"), " "), text);
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function tokenize(text: string, blacklist: Set<string>) {
  const normalized = text
    .replace(/[，。！？、；：「」『』（）()【】\[\]{}<>《》.,!?;:"'`~|/@#$%^&*_+=\\-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();

  if (!normalized) return [];

  if ("Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter(["zh-Hant", "en"], { granularity: "word" });
    return [...segmenter.segment(normalized)]
      .filter((part) => part.isWordLike)
      .map((part) => part.segment.trim().toLowerCase())
      .filter((token) => usefulToken(token, blacklist));
  }

  const chunks = normalized.match(/[\u4e00-\u9fff]+|[a-z][a-z0-9_]{1,}/g) ?? [];
  return chunks.flatMap(segmentCjkRun).filter((token) => usefulToken(token, blacklist));
}

function segmentCjkRun(run: string) {
  if (!/^[\u4e00-\u9fff]+$/.test(run)) return [run];
  const breaker = /(不應該|應該|需要|可以|以及|因為|所以|就是|不是|如果|成為|互相|影響|提升|改善|高度|相關|平衡|和|與|及|並|也|而|會|是|的|了|在|都|不)/g;
  return run
    .split(breaker)
    .filter(Boolean)
    .flatMap((part) => {
      if (breaker.test(part)) {
        breaker.lastIndex = 0;
        return [part];
      }
      breaker.lastIndex = 0;
      if (part.length <= 4) return [part];
      const chunks = [];
      for (let index = 0; index < part.length; index += 4) chunks.push(part.slice(index, index + 4));
      return chunks;
    });
}

function usefulToken(token: string, blacklist: Set<string>) {
  if (!token || baseStopwords.has(token) || blacklist.has(token)) return false;
  if (/^\d+$/.test(token) || /^[a-z]$/.test(token)) return false;
  if (/^[\u4e00-\u9fff]$/.test(token)) return singleCjkKeywords.has(token);
  return token.length >= 2;
}

function scoreTerms(tokens: string[]) {
  const counts = new Map<string, number>();
  const positions = new Map<string, number[]>();
  tokens.forEach((token, index) => {
    counts.set(token, (counts.get(token) ?? 0) + 1);
    positions.set(token, [...(positions.get(token) ?? []), index]);
  });

  const span = Math.max(1, tokens.length - 1);
  return [...counts.entries()]
    .map(([term, count]) => {
      const seen = positions.get(term) ?? [];
      const spread = seen.length > 1 ? (Math.max(...seen) - Math.min(...seen)) / span : 0;
      return {
        term,
        count,
        score: count * Math.log(2 + term.length) * (1 + spread * 0.25),
      };
    })
    .sort((a, b) => b.score - a.score || a.term.localeCompare(b.term));
}

function splitSentences(text: string) {
  const sentences = text
    .split(/(?<=[。！？.!?])\s+|[\n\r]+/)
    .map((part) => part.trim())
    .filter(Boolean);
  return sentences.length ? sentences : text.trim() ? [text.trim()] : [];
}

function buildEdges(tokens: string[], keywords: string[], windowSize: number, minWeight: number, edgeLimit: number) {
  const keywordSet = new Set(keywords);
  const weights = new Map<string, { source: string; target: string; raw: number }>();

  tokens.forEach((token, index) => {
    if (!keywordSet.has(token)) return;
    for (let cursor = index + 1; cursor < Math.min(tokens.length, index + windowSize + 1); cursor += 1) {
      const other = tokens[cursor];
      if (!keywordSet.has(other) || other === token) continue;
      const [source, target] = token < other ? [token, other] : [other, token];
      const key = `${source}::${target}`;
      const distanceWeight = windowSize - (cursor - index) + 1;
      const previous = weights.get(key);
      weights.set(key, { source, target, raw: (previous?.raw ?? 0) + distanceWeight });
    }
  });

  if (!weights.size && keywords.length > 1) {
    keywords.slice(0, -1).forEach((source, index) => {
      weights.set(`${source}::${keywords[index + 1]}`, { source, target: keywords[index + 1], raw: 1 });
    });
  }

  const maxRaw = Math.max(1, ...[...weights.values()].map((edge) => edge.raw));
  return [...weights.values()]
    .map((edge) => ({
      ...edge,
      weight: Math.max(1, Math.min(9, Math.round((edge.raw / maxRaw) * 9))),
      relation: "co_occurs" as const,
    }))
    .filter((edge) => edge.weight >= minWeight)
    .sort((a, b) => b.weight - a.weight || a.source.localeCompare(b.source))
    .slice(0, edgeLimit);
}

function evidenceFor(term: string, sentences: string[]) {
  return sentences.filter((sentence) => sentence.toLowerCase().includes(term.toLowerCase())).slice(0, 3);
}

function layoutNodes(nodes: Omit<NodeItem, "x" | "y">[], edges: EdgeItem[]) {
  const anchors = [
    { x: 150, y: 130 },
    { x: 420, y: 100 },
    { x: 745, y: 150 },
    { x: 265, y: 285 },
    { x: 640, y: 300 },
    { x: 145, y: 470 },
    { x: 440, y: 500 },
    { x: 760, y: 455 },
  ];
  const placed = nodes.map((node, index) => ({
    ...node,
    x: anchors[index]?.x ?? 460,
    y: anchors[index]?.y ?? 300,
    vx: 0,
    vy: 0,
  }));
  const byId = new Map(placed.map((node) => [node.id, node]));

  for (let iteration = 0; iteration < 150; iteration += 1) {
    for (let left = 0; left < placed.length; left += 1) {
      for (let right = left + 1; right < placed.length; right += 1) {
        const a = placed[left];
        const b = placed[right];
        const dx = a.x - b.x || 0.01;
        const dy = a.y - b.y || 0.01;
        const distanceSquared = Math.max(900, dx * dx + dy * dy);
        const distance = Math.sqrt(distanceSquared);
        const force = 6200 / distanceSquared;
        const fx = (dx / distance) * force;
        const fy = (dy / distance) * force;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }
    }

    edges.forEach((edge) => {
      const source = byId.get(edge.source);
      const target = byId.get(edge.target);
      if (!source || !target) return;
      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy));
      const idealDistance = 230 - edge.weight * 9;
      const force = (distance - idealDistance) * (0.0028 + edge.weight * 0.00055);
      const fx = (dx / distance) * force;
      const fy = (dy / distance) * force;
      source.vx += fx;
      source.vy += fy;
      target.vx -= fx;
      target.vy -= fy;
    });

    placed.forEach((node, index) => {
      const anchor = anchors[index] ?? { x: 460, y: 300 };
      node.vx += (anchor.x - node.x) * 0.0024;
      node.vy += (anchor.y - node.y) * 0.0024;
      node.vx *= 0.76;
      node.vy *= 0.76;
      node.x = Math.max(78, Math.min(842, node.x + node.vx));
      node.y = Math.max(72, Math.min(528, node.y + node.vy));
    });
  }

  return placed.map((node) => ({
    id: node.id,
    label: node.label,
    count: node.count,
    score: node.score,
    weight: node.weight,
    definition: node.definition,
    note: node.note,
    evidence: node.evidence,
    x: Math.round(node.x),
    y: Math.round(node.y),
  }));
}

function makeGraph(text: string, blacklistValue: string, windowSize: number, minWeight: number, edgeLimit: number): GraphData {
  const blacklistTerms = splitBlacklist(blacklistValue);
  const blacklist = new Set(blacklistTerms);
  const cleaned = removeBlacklist(text, blacklistTerms);
  const tokens = tokenize(cleaned, blacklist);
  const ranked = scoreTerms(tokens).slice(0, 8);

  while (ranked.length < 8) {
    ranked.push({ term: `未命名${ranked.length + 1}`, count: 1, score: 0.1 });
  }

  const labels = ranked.map((item) => item.term);
  const edgeLabels = buildEdges(tokens, labels, windowSize, minWeight, edgeLimit);
  const maxCount = Math.max(1, ...ranked.map((item) => item.count));
  const maxScore = Math.max(1, ...ranked.map((item) => item.score));
  const sentences = splitSentences(text);
  const connections = new Map<string, { label: string; weight: number }[]>();

  edgeLabels.forEach((edge) => {
    connections.set(edge.source, [...(connections.get(edge.source) ?? []), { label: edge.target, weight: edge.weight }]);
    connections.set(edge.target, [...(connections.get(edge.target) ?? []), { label: edge.source, weight: edge.weight }]);
  });

  const nodesWithoutLayout = ranked.map((item, index) => {
    const connected = (connections.get(item.term) ?? []).sort((a, b) => b.weight - a.weight);
    const related = connected.slice(0, 3).map((edge) => edge.label).join("、") || "尚未形成強連線";
    const evidence = evidenceFor(item.term, sentences);
    const sentence = evidence[0] ?? "文本中沒有足夠句子可提取脈絡。";
    const definition = `「${item.term}」在本文脈絡中，主要連結到 ${related}；它出現 ${item.count} 次，並依文本分佈與共現強度入選關鍵字。`;
    return {
      id: `k${index}`,
      label: item.term,
      count: item.count,
      score: round(item.score / maxScore),
      weight: Math.max(1, Math.min(9, Math.round((item.count / maxCount) * 9))),
      definition,
      note: `${definition} 它目前最接近的概念是 ${related}。代表脈絡：${sentence}`,
      evidence,
    };
  });

  const idByLabel = new Map(nodesWithoutLayout.map((node) => [node.label, node.id]));
  const edges = edgeLabels
    .filter((edge) => idByLabel.has(edge.source) && idByLabel.has(edge.target))
    .map((edge, index) => ({
      id: `e${index}`,
      source: idByLabel.get(edge.source) ?? "",
      target: idByLabel.get(edge.target) ?? "",
      weight: edge.weight,
      raw: edge.raw,
      relation: edge.relation,
    }));

  return {
    meta: {
      model: "keyword_graph_view",
      keyword_count: 8,
      layout: "distributed_weighted_network",
      blacklist: blacklistTerms,
      generated_at: "generated_on_device",
    },
    nodes: layoutNodes(nodesWithoutLayout, edges),
    edges,
  };
}

function round(value: number) {
  return Math.round(value * 1000) / 1000;
}

function edgeColor(weight: number) {
  return edgePalette[Math.max(1, Math.min(9, weight)) - 1];
}

function edgeWidth(weight: number) {
  return 1.4 + weight * 0.82;
}

function nodeRadius(node: NodeItem) {
  return Math.sqrt((980 + node.weight * 210 + node.score * 480) / Math.PI);
}

function connectedEdges(graph: GraphData, nodeId: string) {
  return graph.edges
    .filter((edge) => edge.source === nodeId || edge.target === nodeId)
    .sort((a, b) => b.weight - a.weight);
}

const subscribeToHydration = () => () => undefined;
const getClientHydration = () => true;
const getServerHydration = () => false;

export default function Home() {
  const hydrated = useSyncExternalStore(subscribeToHydration, getClientHydration, getServerHydration);
  const [text, setText] = useState(sampleText);
  const [activeCaseId, setActiveCaseId] = useState(caseArticles[0].id);
  const [copied, setCopied] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [blacklist, setBlacklist] = useState(defaultBlacklist);
  const [windowSize, setWindowSize] = useState(9);
  const [edgeLimit, setEdgeLimit] = useState(18);
  const [minWeight, setMinWeight] = useState(1);
  const [graphConfig, setGraphConfig] = useState<GraphConfig>({
    text: sampleText,
    blacklist: defaultBlacklist,
    windowSize: 9,
    edgeLimit: 18,
    minWeight: 1,
  });
  const graph = useMemo(
    () => makeGraph(graphConfig.text, graphConfig.blacklist, graphConfig.windowSize, graphConfig.minWeight, graphConfig.edgeLimit),
    [graphConfig],
  );
  const [selectedId, setSelectedId] = useState("k0");
  const selected = graph.nodes.find((node) => node.id === selectedId) ?? graph.nodes[0];
  const selectedEdges = selected ? connectedEdges(graph, selected.id) : [];
  const activeCase = caseArticles.find((article) => article.id === activeCaseId);
  const isDirty =
    text !== graphConfig.text ||
    blacklist !== graphConfig.blacklist ||
    windowSize !== graphConfig.windowSize ||
    edgeLimit !== graphConfig.edgeLimit ||
    minWeight !== graphConfig.minWeight;

  async function readFiles(event: ChangeEvent<HTMLInputElement>) {
    const files = [...(event.target.files ?? [])];
    const chunks = await Promise.all(files.map((file) => file.text()));
    setText((current) => `${current}\n\n${chunks.join("\n\n")}`.trim());
    setActiveCaseId("custom");
  }

  function generateGraph() {
    setGraphConfig({ text, blacklist, windowSize, edgeLimit, minWeight });
    setSelectedId("k0");
    setZoom(1);
  }

  function loadCase(article: CaseArticle) {
    setActiveCaseId(article.id);
    setText(article.text);
    setGraphConfig({ text: article.text, blacklist, windowSize, edgeLimit, minWeight });
    setSelectedId("k0");
    setZoom(1);
  }

  async function copyJson() {
    await navigator.clipboard.writeText(JSON.stringify(graph, null, 2));
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  if (!hydrated) {
    return (
      <main className="app-shell">
        <header className="topbar">
          <div className="product-lockup">
            <span className="brand-mark"><Network size={20} /></span>
            <h1>Keyword Graph View</h1>
          </div>
        </header>
        <div className="workspace loading-workspace" aria-hidden="true">
          <aside className="control-panel" />
          <section className="graph-panel" />
          <aside className="note-panel" />
        </div>
      </main>
    );
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="product-lockup">
          <span className="brand-mark"><Network size={20} /></span>
          <h1>Keyword Graph View</h1>
        </div>
        <div className="topbar-status" aria-live="polite">
          <span className={"status-pill" + (isDirty ? " dirty" : "")}>{isDirty ? "待生成" : "已更新"}</span>
          <span className="source-name">{activeCase?.title ?? "自訂文本"}</span>
        </div>
      </header>

      <div className="workspace">
        <aside className="control-panel" aria-label="關鍵字設定">
          <header className="panel-heading">
            <div>
              <p className="eyebrow">INPUT</p>
              <h2>文本與設定</h2>
            </div>
            <span className="char-count">{text.length.toLocaleString()} 字</span>
          </header>

          <div className="panel-scroll control-scroll">
            <section className="control-section">
              <div className="section-label"><BookOpenText size={15} />案例</div>
              <div className="case-grid" aria-label="六篇案例">
                {caseArticles.map((article, index) => (
                  <button
                    key={article.id}
                    className={"case-button" + (activeCaseId === article.id ? " active" : "")}
                    type="button"
                    aria-pressed={activeCaseId === article.id}
                    onClick={() => loadCase(article)}
                  >
                    <span>{index + 1}</span>
                    {article.title}
                  </button>
                ))}
              </div>
            </section>

            <section className="control-section text-section">
              <label className="field text-field">
                <span><FileText size={15} />文本</span>
                <textarea
                  value={text}
                  onChange={(event) => {
                    setText(event.target.value);
                    setActiveCaseId("custom");
                  }}
                  spellCheck={false}
                />
              </label>
              <div className="button-row">
                <label className="file-button">
                  <input type="file" accept=".txt,.md,.csv,.json" multiple onChange={readFiles} />
                  <Upload size={16} />
                  匯入
                </label>
                <button
                  className="icon-button"
                  type="button"
                  title="清空文本"
                  aria-label="清空文本"
                  onClick={() => {
                    setText("");
                    setActiveCaseId("custom");
                  }}
                >
                  <Trash2 size={17} />
                </button>
              </div>
            </section>

            <section className="control-section">
              <label className="field">
                <span><Ban size={15} />黑名單</span>
                <textarea className="blacklist-input" value={blacklist} onChange={(event) => setBlacklist(event.target.value)} spellCheck={false} />
              </label>
            </section>

            <section className="control-section">
              <div className="section-label"><SlidersHorizontal size={15} />網路設定</div>
              <div className="settings-grid">
                <label className="field">
                  <span>視窗距離</span>
                  <input type="number" min={3} max={18} value={windowSize} onChange={(event) => setWindowSize(Number(event.target.value))} />
                </label>
                <label className="field">
                  <span>邊數上限</span>
                  <input type="number" min={4} max={28} value={edgeLimit} onChange={(event) => setEdgeLimit(Number(event.target.value))} />
                </label>
                <label className="field">
                  <span>最小權重</span>
                  <input type="number" min={1} max={9} value={minWeight} onChange={(event) => setMinWeight(Number(event.target.value))} />
                </label>
                <label className="field readonly">
                  <span>節點數</span>
                  <input value="8" readOnly />
                </label>
              </div>
            </section>
          </div>

          <footer className="panel-footer">
            <button className="generate-button" type="button" onClick={generateGraph} disabled={!text.trim()}>
              <Sparkles size={18} />
              生成 Graph
            </button>
          </footer>
        </aside>

        <section className="graph-panel" aria-label="加權分散式關鍵字網路">
          <header className="graph-header">
            <div>
              <p className="eyebrow">DISTRIBUTED GRAPH</p>
              <h2>{graph.nodes.length} 個關鍵字 <span>·</span> {graph.edges.length} 條連線</h2>
            </div>
            <div className="graph-actions">
              <div className="zoom-controls" role="group" aria-label="圖表縮放">
                <button
                  type="button"
                  title="縮小"
                  aria-label="縮小圖表"
                  disabled={zoom <= 0.7}
                  onClick={() => setZoom((current) => Math.max(0.7, round(current - 0.1)))}
                >
                  <ZoomOut size={17} />
                </button>
                <output aria-live="polite">{Math.round(zoom * 100)}%</output>
                <button
                  type="button"
                  title="放大"
                  aria-label="放大圖表"
                  disabled={zoom >= 1.6}
                  onClick={() => setZoom((current) => Math.min(1.6, round(current + 0.1)))}
                >
                  <ZoomIn size={17} />
                </button>
              </div>
              <button className="copy-button" type="button" onClick={copyJson} title="複製 Graph JSON" aria-label="複製 Graph JSON">
                <Copy size={17} />
                <span>{copied ? "已複製" : "JSON"}</span>
              </button>
            </div>
          </header>

          <div className="canvas-wrap">
            <svg className="graph-canvas" viewBox="0 0 920 600" preserveAspectRatio="xMidYMid meet" role="img" aria-label="八個關鍵字的加權分散式網路">
              <defs>
                <radialGradient id="nodeGlow" cx="35%" cy="30%" r="72%">
                  <stop offset="0%" stopColor="#dff7ff" />
                  <stop offset="38%" stopColor="#22b8e6" />
                  <stop offset="100%" stopColor="#0b2232" />
                </radialGradient>
                <filter id="softGlow" x="-40%" y="-40%" width="180%" height="180%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g className="graph-viewport" transform={`translate(460 300) scale(${zoom}) translate(-460 -300)`}>
              {graph.edges.map((edge) => {
                const source = graph.nodes.find((node) => node.id === edge.source);
                const target = graph.nodes.find((node) => node.id === edge.target);
                if (!source || !target) return null;
                const isActive = edge.source === selected.id || edge.target === selected.id;
                return (
                  <g key={edge.id} className={isActive ? "edge-group active" : "edge-group"}>
                    <line
                      x1={source.x}
                      y1={source.y}
                      x2={target.x}
                      y2={target.y}
                      stroke={edgeColor(edge.weight)}
                      strokeWidth={edgeWidth(edge.weight)}
                      strokeLinecap="round"
                    />
                    <text
                      className="edge-label"
                      x={(source.x + target.x) / 2}
                      y={(source.y + target.y) / 2 - 8}
                      fill={edgeColor(edge.weight)}
                    >
                      {edge.weight}
                    </text>
                  </g>
                );
              })}
              {graph.nodes.map((node) => {
                const radius = nodeRadius(node);
                const isSelected = node.id === selected.id;
                const isNeighbor = selectedEdges.some((edge) => edge.source === node.id || edge.target === node.id);
                const visibleLabel = node.label.length > 8 ? node.label.slice(0, 7) + "…" : node.label;
                return (
                  <g
                    key={node.id}
                    className={"node-group" + (isSelected ? " selected" : "") + (isNeighbor ? " neighbor" : "")}
                    role="button"
                    tabIndex={0}
                    aria-label={node.label + "，權重 " + node.weight}
                    onClick={() => setSelectedId(node.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") setSelectedId(node.id);
                    }}
                  >
                    <title>{`${node.label}: ${node.definition}`}</title>
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={radius}
                      fill="url(#nodeGlow)"
                      stroke={isSelected ? "#ffffff" : "#33c6f2"}
                      strokeWidth={isSelected ? 4 : 2}
                      filter="url(#softGlow)"
                    />
                    <text className="node-label" x={node.x} y={node.y - 4}>{visibleLabel}</text>
                    <text className="node-weight" x={node.x} y={node.y + 19}>W{node.weight}</text>
                  </g>
                );
              })}
              </g>
            </svg>
          </div>

          <footer className="legend" aria-label="連線權重圖例">
            <span className="legend-caption">弱</span>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((weight) => (
              <span className="legend-item" key={weight}>
                <i style={{ background: edgeColor(weight), height: String(3 + weight * 0.55) + "px" }} />
                {weight}
              </span>
            ))}
            <span className="legend-caption strong">強</span>
          </footer>
        </section>

        <aside className="note-panel" aria-label="所選關鍵字筆記">
          {selected ? (
            <>
              <div className="note-scroll">
                <div className="metric-grid">
                  <span><strong>{selected.weight}</strong>權重</span>
                  <span><strong>{selected.count}</strong>次數</span>
                  <span><strong>{selected.score}</strong>分數</span>
                </div>

                <section className="note-section">
                  <h3>定義</h3>
                  <p>{selected.definition}</p>
                </section>

                <section className="note-section">
                  <h3>Note</h3>
                  <p>{selected.note}</p>
                </section>

                <section className="note-section">
                  <h3>連線</h3>
                  <div className="edge-list">
                    {selectedEdges.length ? (
                      selectedEdges.map((edge) => {
                        const otherId = edge.source === selected.id ? edge.target : edge.source;
                        const other = graph.nodes.find((node) => node.id === otherId);
                        return (
                          <button key={edge.id} type="button" onClick={() => setSelectedId(otherId)}>
                            <i style={{ background: edgeColor(edge.weight), width: String(18 + edge.weight * 4) + "px" }} />
                            <span>{other?.label ?? otherId}</span>
                            <strong>W{edge.weight}</strong>
                          </button>
                        );
                      })
                    ) : (
                      <p>尚未形成連線。</p>
                    )}
                  </div>
                </section>

                <section className="note-section evidence-section">
                  <h3>證據句</h3>
                  <ul>
                    {(selected.evidence.length ? selected.evidence : ["目前沒有可用證據句。"]).map((sentence) => (
                      <li key={sentence}>{sentence}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </>
          ) : null}
        </aside>
      </div>
    </main>
  );
}
