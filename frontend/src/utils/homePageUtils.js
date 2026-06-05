export function formatLinkValue(url) {
  if (!url) {
    return "";
  }
  if (url.startsWith("mailto:")) {
    return url.slice(7);
  }
  if (url.startsWith("tel:")) {
    return url.slice(4);
  }
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function isHttpUrl(url) {
  return /^https?:\/\//i.test(String(url || "").trim());
}

function normalizeLinkKind(value) {
  return String(value || "").trim().toLowerCase();
}

export function getLinkByKind(links, kind) {
  if (!Array.isArray(links) || !kind) {
    return null;
  }

  return links.find((link) => normalizeLinkKind(link?.kind) === normalizeLinkKind(kind)) || null;
}

export function localizeRoleText(text) {
  return text || "";
}

export function localizeSkillCategory(category) {
  if (category === "Tiếng Anh") {
    return "English";
  }
  return category || "";
}

export function localizeSkillItem(category, item) {
  if (category === "Tiếng Anh") {
    return "Technical documentation reading";
  }
  return item;
}

export function getProjectTypeTag(project, index) {
  if (String(project?.title || "").toLowerCase().includes("cmms")) {
    return "INTERNSHIP PROJECT";
  }
  if (index === 0) {
    return "INTERNSHIP PROJECT";
  }
  return "PERSONAL PROJECT";
}

export function smoothScrollTo(targetTop, duration = 650) {
  const startY = window.scrollY;
  const deltaY = targetTop - startY;
  if (Math.abs(deltaY) < 2) {
    return;
  }

  let startTime = null;
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const step = (timestamp) => {
    if (startTime === null) {
      startTime = timestamp;
    }
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeInOutCubic(progress);
    window.scrollTo(0, startY + deltaY * eased);

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };

  window.requestAnimationFrame(step);
}

export function getProjectActionLinks(project) {
  const links = Array.isArray(project?.links)
    ? project.links.filter((link) => isHttpUrl(link?.url))
    : [];

  const demoLink = getLinkByKind(links, "demo") || links.find((link) => /demo|live/i.test(String(link?.label || ""))) || null;
  const githubCandidates = links.filter((link) => {
    const label = String(link?.label || "").toLowerCase();
    const url = String(link?.url || "").toLowerCase();
    return normalizeLinkKind(link?.kind) === "github" || label.includes("github") || url.includes("github.com");
  });
  const githubFe =
    getLinkByKind(links, "frontend") || githubCandidates.find((link) => /fe|frontend/i.test(String(link?.label || ""))) || null;
  const githubBe =
    getLinkByKind(links, "backend") || githubCandidates.find((link) => /be|backend/i.test(String(link?.label || ""))) || null;
  const githubGeneral =
    getLinkByKind(links, "github") || githubCandidates.find((link) => /^github$/i.test(String(link?.label || "").trim())) || null;

  const actions = [];
  if (demoLink) {
    actions.push({ label: "Demo", url: demoLink.url, kind: "demo" });
  }
  if (githubFe) {
    actions.push({ label: "Frontend", url: githubFe.url, kind: "frontend" });
  }
  if (githubBe && githubBe.url !== githubFe?.url) {
    actions.push({ label: "Backend", url: githubBe.url, kind: "backend" });
  }
  if (!githubFe && !githubBe && githubGeneral) {
    actions.push({ label: "GitHub", url: githubGeneral.url, kind: "github" });
  }
  if (!actions.length && links[0]) {
    actions.push({ label: links[0].label || "Link", url: links[0].url, kind: "link" });
  }

  return actions;
}
