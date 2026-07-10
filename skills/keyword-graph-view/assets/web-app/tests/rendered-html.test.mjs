import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the keyword graph app shell", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Keyword Graph View<\/title>/i);
  assert.match(html, /Keyword Graph View/);
  assert.match(html, /從文本提取 8 個關鍵字/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /Distributed semantic network|NODE NOTE|codex-preview|Your site is taking shape|react-loading-skeleton/i);

  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  assert.match(source, /const sampleText = caseArticles\[0\]\.text/);
  assert.match(source, /放大圖表/);
  assert.match(source, /縮小圖表/);
  assert.doesNotMatch(source, /Distributed semantic network|NODE NOTE/);
});
