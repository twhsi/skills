import { birdToRoamPages, parseBirdJson } from "./roam-converter.js";

const keywordMap = new Map([
  [0, ["Book", "core"]],
  [4, ["Chapter", "core"]],
  [8, ["Address", "core"]],
  [12, ["Weight", "route"]],
  [16, ["Alias", "route"]],
  [20, ["Index", "route"]],
  [24, ["Keyword", "route"]],
  [30, ["Excel", "tool"]],
  [32, ["Type", "tool"]],
  [36, ["Route", "core"]],
  [39, ["Jump", "route"]],
  [40, ["BIRD", "center"]],
  [41, ["Deep Link", "route"]],
  [44, ["TheBrain", "tool"]],
  [48, ["Tag", "tool"]],
  [50, ["Note", "tool"]],
  [56, ["FIRE", "route"]],
  [60, ["Draft", "route"]],
  [64, ["Final", "route"]],
  [68, ["Project", "core"]],
  [72, ["Manuscript", "core"]],
  [76, ["Agent", "tool"]],
  [78, ["Roam", "tool"]],
  [80, ["Export", "core"]],
]);

const mandala = document.querySelector("#mandala");
for (let index = 0; index < 81; index += 1) {
  const cell = document.createElement("span");
  cell.className = "mandala-cell";
  const keyword = keywordMap.get(index);
  if (keyword) {
    cell.textContent = keyword[0];
    cell.classList.add(keyword[1]);
  }
  mandala.appendChild(cell);
}

const copyButton = document.querySelector(".copy-command");
const copyStatus = document.querySelector(".copy-status");
copyButton?.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.command);
    copyStatus.textContent = "BIRD Skill prompt copied.";
  } catch {
    copyStatus.textContent = "Open the GitHub Skill link to use this prompt.";
  }
});

const exampleBird = {
  version: "BIRD-2.0",
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
  note: "Review eight life areas.\n\nChoose one weekly rock for each area."
};

const roamForm = document.querySelector("[data-roam-form]");
const birdInput = document.querySelector("[data-bird-json-input]");
const roamOutput = document.querySelector("[data-roam-json-output]");
const roamStatus = document.querySelector("[data-roam-status]");
const loadExampleButton = document.querySelector("[data-load-roam-example]");
const copyRoamButton = document.querySelector("[data-copy-roam]");
const downloadRoamButton = document.querySelector("[data-download-roam]");

function setRoamStatus(message, state = "ready") {
  if (!roamStatus) return;
  roamStatus.textContent = message;
  roamStatus.dataset.state = state;
}

function convertBirdJson() {
  if (!birdInput || !roamOutput) return [];

  try {
    const pages = birdToRoamPages(parseBirdJson(birdInput.value));
    roamOutput.value = JSON.stringify(pages, null, 2);
    if (copyRoamButton) copyRoamButton.disabled = false;
    if (downloadRoamButton) downloadRoamButton.disabled = false;
    setRoamStatus(`${pages.length} Roam page${pages.length === 1 ? "" : "s"} ready.`, "success");
    return pages;
  } catch (error) {
    roamOutput.value = "";
    if (copyRoamButton) copyRoamButton.disabled = true;
    if (downloadRoamButton) downloadRoamButton.disabled = true;
    setRoamStatus(error.message, "error");
    return [];
  }
}

function loadRoamExample() {
  if (!birdInput) return;
  birdInput.value = JSON.stringify(exampleBird, null, 2);
  convertBirdJson();
}

roamForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  convertBirdJson();
});

loadExampleButton?.addEventListener("click", loadRoamExample);

copyRoamButton?.addEventListener("click", async () => {
  if (!roamOutput?.value) return;
  try {
    await navigator.clipboard.writeText(roamOutput.value);
    setRoamStatus("Roam JSON copied.", "success");
  } catch {
    roamOutput.focus();
    roamOutput.select();
    setRoamStatus("Output selected. Copy it from the text field.", "ready");
  }
});

downloadRoamButton?.addEventListener("click", () => {
  if (!roamOutput?.value) return;
  const blob = new Blob([`${roamOutput.value}\n`], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "bird-roam-import.json";
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  setRoamStatus("Roam import file downloaded.", "success");
});

loadRoamExample();

function restoreHashPosition() {
  if (!window.location.hash) return;
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";
  target.scrollIntoView({ block: "start" });
  root.style.scrollBehavior = previousBehavior;
}

function scheduleHashRestore() {
  window.requestAnimationFrame(restoreHashPosition);
  window.setTimeout(restoreHashPosition, 200);
  window.setTimeout(restoreHashPosition, 700);
}

if (window.location.hash) {
  if (document.readyState === "complete") {
    scheduleHashRestore();
  } else {
    window.addEventListener("load", scheduleHashRestore, { once: true });
  }
}
