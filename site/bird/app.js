const keywordMap = new Map([
  [0, ["Book", "core"]],
  [4, ["章節", "core"]],
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
  [60, ["草稿", "route"]],
  [64, ["定稿", "route"]],
  [68, ["Project", "core"]],
  [72, ["書稿", "core"]],
  [76, ["Agent", "tool"]],
  [80, ["輸出", "core"]],
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
copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.command);
    copyStatus.textContent = "已複製 BIRD Skill 指令。";
  } catch {
    copyStatus.textContent = "請長按按鈕旁的 GitHub 連結使用 Skill。";
  }
});
