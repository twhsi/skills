const endpointRows = document.querySelectorAll("[data-copy]");

endpointRows.forEach((button) => {
  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    try {
      await navigator.clipboard.writeText(new URL(value, window.location.origin).toString());
      button.dataset.state = "copied";
      button.textContent = "Copied";
      window.setTimeout(() => {
        button.dataset.state = "";
        button.textContent = "Copy";
      }, 1200);
    } catch {
      window.location.href = value;
    }
  });
});

const skillsTable = document.querySelector("[data-skills-table]");
const routeGrid = document.querySelector("[data-route-grid]");
const countNode = document.querySelector("[data-skill-count]");
const searchInput = document.querySelector("[data-skill-search]");
const axisButtons = document.querySelectorAll("[data-axis]");
const latestUpdates = document.querySelector("[data-latest-updates]");
const registryRevision = document.querySelector("[data-registry-revision]");
const consoleRevision = document.querySelector("[data-console-revision]");
const registryGenerated = document.querySelector("[data-registry-generated]");
const registryCount = document.querySelector("[data-registry-count]");

let registry = null;
let activeAxis = "all";

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatDate(value) {
  if (!value) return "unknown";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "unknown";
  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short"
  }).format(date);
}

function versionLabel(skill) {
  if (!skill.version || skill.version === "Unversioned") return "Unversioned";
  return `v${skill.version}`;
}

function displayDescription(description) {
  const text = String(description || "").replace(/\s+/g, " ").trim();
  if (!/[\u4E00-\u9FFF]/.test(text)) return text;

  const sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [text];
  const englishSentences = sentences.filter((sentence) => !/[\u4E00-\u9FFF]/.test(sentence));
  if (englishSentences.length) return englishSentences.join(" ").replace(/(\d)\.\s+(\d)/g, "$1.$2").trim();

  return text
    .replace(/[\u4E00-\u9FFF]+/g, "")
    .replace(/[、，。；：]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function commitUrl(skill) {
  if (!registry?.repository || !skill.revision || skill.revision === "unknown") return null;
  return `${registry.repository}/commit/${skill.revision}`;
}

function axisLabel(axis) {
  return registry?.axes.find((item) => item.id === axis)?.label || axis;
}

function sortedByFreshness(skills) {
  return [...skills].sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0));
}

function skillMatches(skill, query) {
  const haystack = [
    skill.slug,
    skill.name,
    skill.description,
    skill.version,
    skill.revision_short,
    skill.axes.join(" ")
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(query.toLowerCase());
}

function renderRegistryStatus() {
  if (!registry) return;
  const revision = registry.revision || "unknown";
  if (registryRevision) registryRevision.textContent = revision;
  if (consoleRevision) consoleRevision.textContent = revision;
  if (registryGenerated) registryGenerated.textContent = formatDate(registry.generated_at);
  if (registryCount) registryCount.textContent = String(registry.count ?? registry.skills?.length ?? "unknown");
}

function renderLatestUpdates() {
  if (!registry || !latestUpdates) return;

  latestUpdates.innerHTML = sortedByFreshness(registry.skills)
    .slice(0, 6)
    .map((skill) => {
      const revisionLink = commitUrl(skill);
      const revision = revisionLink
        ? `<a href="${revisionLink}">${escapeHtml(skill.revision_short)}</a>`
        : `<span>${escapeHtml(skill.revision_short || "unknown")}</span>`;

      return `
        <article class="update-card">
          <div class="update-card-head">
            <strong><a href="${escapeHtml(skill.github_url)}">${escapeHtml(skill.slug)}</a></strong>
            <code>${escapeHtml(versionLabel(skill))}</code>
          </div>
          <p>${escapeHtml(displayDescription(skill.description))}</p>
          <dl>
            <div><dt>Updated</dt><dd>${escapeHtml(formatDate(skill.updated_at))}</dd></div>
            <div><dt>Revision</dt><dd>${revision}</dd></div>
          </dl>
        </article>
      `;
    })
    .join("");
}

function renderSkills() {
  if (!registry || !skillsTable) return;

  const query = searchInput?.value.trim() || "";
  const skills = sortedByFreshness(registry.skills).filter((skill) => {
    const axisOk = activeAxis === "all" || skill.axes.includes(activeAxis);
    return axisOk && skillMatches(skill, query);
  });

  skillsTable.innerHTML = skills
    .map((skill) => {
      const revisionLink = commitUrl(skill);
      const revision = revisionLink
        ? `<a href="${revisionLink}">${escapeHtml(skill.revision_short)}</a>`
        : escapeHtml(skill.revision_short || "unknown");

      return `
        <tr>
          <td><a href="${escapeHtml(skill.github_url)}">${escapeHtml(skill.slug)}</a></td>
          <td><code>${escapeHtml(versionLabel(skill))}</code></td>
          <td>
            <time datetime="${escapeHtml(skill.updated_at || "")}">${escapeHtml(formatDate(skill.updated_at))}</time>
            <small>${revision}</small>
          </td>
          <td>${skill.axes.map((axis) => `<span>${escapeHtml(axisLabel(axis))}</span>`).join("")}</td>
          <td>${escapeHtml(displayDescription(skill.description))}</td>
          <td><code>${escapeHtml(skill.install_command)}</code></td>
        </tr>
      `;
    })
    .join("");

  if (countNode) countNode.textContent = `${skills.length} skills`;
}

function renderRoutes() {
  if (!registry || !routeGrid) return;

  routeGrid.innerHTML = registry.axes
    .map(
      (axis) => `
        <article class="route-row">
          <div>
            <strong>${escapeHtml(axis.label)}</strong>
            <a href="#skills">${escapeHtml(axis.route)}</a>
          </div>
          <p>${escapeHtml(axis.summary)}</p>
          <code>${axis.skills.map(escapeHtml).join("  ")}</code>
        </article>
      `
    )
    .join("");
}

axisButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeAxis = button.dataset.axis;
    axisButtons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    renderSkills();
  });
});

searchInput?.addEventListener("input", renderSkills);

fetch("/skills.json")
  .then((response) => response.json())
  .then((data) => {
    registry = data;
    renderRegistryStatus();
    renderLatestUpdates();
    renderRoutes();
    renderSkills();
  })
  .catch(() => {
    if (countNode) countNode.textContent = "offline fallback";
    if (latestUpdates) {
      latestUpdates.innerHTML = `
        <article class="update-card">
          <strong>Registry unavailable</strong>
          <span>The static fallback loaded, but live skill metadata could not be fetched.</span>
        </article>
      `;
    }
  });
