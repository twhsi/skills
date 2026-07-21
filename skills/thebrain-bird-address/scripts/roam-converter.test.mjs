import assert from "node:assert/strict";
import test from "node:test";
import { birdToRoamPages, parseBirdJson, validateRoamPages } from "./roam-converter.mjs";

const example = {
  version: "BIRD-2.1",
  bookAddress: "Whole System/Part III/3.4/3.4.D.B",
  index: {
    weight: "I3",
    typeCode: "S",
    type: "Skill",
    keyword: "Eight Rocks Weekly Review",
    aliases: ["Weekly Review to 8 Rocks", "AI Weekly Review"]
  },
  route: ["Weekly Review", "Weekly Plan"],
  deepLink: "brain://example/weekly-review",
  structuralType: "Item",
  tag: "Draft",
  semanticRole: "Bridge",
  note: "Review eight life areas.\n\nChoose one rock for each area."
};

test("converts canonical BIRD JSON into an importable Roam page array", () => {
  const pages = birdToRoamPages(example);
  assert.equal(pages.length, 1);
  assert.equal(pages[0].title, "3.4.D.B Eight Rocks Weekly Review");
  assert.deepEqual(pages[0].children[0], { string: "BIRD-2.1", heading: 2 });
  assert.ok(pages[0].children.some((block) => block.string.includes("[[Weekly Review]] → [[Weekly Plan]]")));
  assert.ok(pages[0].children.some((block) => block.string === "D:: brain://example/weekly-review"));
  const note = pages[0].children.find((block) => block.string === "Manuscript Note");
  assert.deepEqual(note.children, [
    { string: "Review eight life areas." },
    { string: "Choose one rock for each area." }
  ]);
  assert.equal(JSON.stringify(pages).includes('"uid"'), false);
  assert.equal(validateRoamPages(pages), pages);
});

test("accepts flat BIRD Excel row fields", () => {
  const pages = birdToRoamPages({
    rows: [{
      B_BookAddress: "Book/2.1/2.1.3",
      I_Weight: "I2",
      I_TypeCode: "C",
      I_Type: "Concept",
      I_Keyword: "Knowledge Address",
      I_Alias: "Semantic Address | BIRD Address",
      R_Route: "Index -> Route -> Deep Link",
      D_DeepLink: "brain://example/address",
      StructuralType: "Item",
      Tag: "Final",
      "Note正文": "One card, one durable address."
    }]
  });

  assert.equal(pages[0].title, "2.1.3 Knowledge Address");
  assert.ok(pages[0].children.some((block) => block.string === "A:: [[Semantic Address]] | [[BIRD Address]]"));
});

test("rejects duplicate page titles before Roam can merge them unexpectedly", () => {
  assert.throws(() => birdToRoamPages([example, example]), /Duplicate Roam page title/);
});

test("reports malformed JSON and invalid BIRD codes", () => {
  assert.throws(() => parseBirdJson("{"), /Invalid JSON/);
  assert.throws(
    () => birdToRoamPages({ ...example, index: { ...example.index, weight: "I9" } }),
    /invalid Index Weight/
  );
});
