import { projects } from "./projects.js?v=blendspot-20261014";

const disciplines = ["cinematic", "technical"];
const projectList = document.querySelector("#project-list");
const reel = document.querySelector(".reel");
const switcher = document.querySelector(".discipline-switcher");
const controls = document.querySelector(".reel-controls");
const currentLabel = document.querySelector(".counter-current");
const totalLabel = document.querySelector(".counter-total");
const currentProgress = document.querySelector(".progress-fill");
const soundButton = document.querySelector(".sound-toggle");
const playButton = document.querySelector(".play-button");
const stopButton = document.querySelector(".stop-button");
const pauseButton = document.querySelector(".pause-button");
const previousButton = document.querySelector(".previous");
const nextButton = document.querySelector(".next");
let selectedDiscipline = null;
let selectedProjects = [];
let cards = [];
let videos = [];
let activeIndex = 0;
let soundOn = false;
let playbackMode = "play";
let scrollLock = false;
let observer = null;

function updateCounts() {
  for (const discipline of disciplines) {
    const count = projects.filter((project) => project.discipline === discipline).length;
    const label = document.querySelector(`[data-discipline-count="${discipline}"]`);
    if (label) label.textContent = `${String(count).padStart(2, "0")} ${count === 1 ? "PROJECT" : "PROJECTS"}`;
  }
}

function cardMarkup(project, index) {
  const titleText = project.title.replaceAll("\n", " ");
  const number = String(index + 1).padStart(2, "0");
  const toolLogos = (project.toolLogos ?? []).map(({ name, src }) => `<img src="${src}" alt="${name}" title="${name}" loading="lazy" />`).join("");
  return `
    <article class="project" data-index="${index}" id="project-${index + 1}" aria-label="${titleText}">
      <video class="project-video" muted playsinline preload="metadata"${project.poster ? ` poster="${project.poster}"` : ""}>
        <source src="${project.video}" type="video/mp4" />
      </video>
      <div class="video-shade"></div>
      <div class="project-meta">
        <div class="project-heading"><div class="project-year-row"><span class="project-year">${project.year}</span><span class="year-rule"></span><p class="eyebrow">${project.category}</p></div><h2>${project.title.replaceAll("\n", "<br />")}</h2></div>
        <div class="project-details">
          <div><span class="detail-label">MY ROLE</span><p>${project.role}</p></div>
          <div><span class="detail-label">TOOLS</span><div class="tool-content"><p>${project.tools}</p>${toolLogos ? `<div class="tool-logos" aria-label="${project.toolLogos.map(({ name }) => name).join(", ")}">${toolLogos}</div>` : ""}</div></div>
          <div class="detail-description"><span class="detail-label">ABOUT</span><p>${project.description}</p></div>
        </div>
      </div>
      <div class="project-side"><span>JH — PORTFOLIO</span><span>${number} / ${String(selectedProjects.length).padStart(2, "0")}</span></div>
      <div class="project-caption"><span class="caption-number">${number}</span><span class="caption-rule"></span><span>${project.category}</span></div>
      ${project.releaseUrl ? `<a class="release-link" href="${project.releaseUrl}" target="_blank" rel="noopener noreferrer">WATCH RELEASE <span aria-hidden="true">↗</span></a>` : ""}
    </article>`;
}

function setActive(index) {
  if (!cards.length || index < 0 || index >= cards.length) return;
  activeIndex = index;
  currentLabel.textContent = String(index + 1).padStart(2, "0");
  currentProgress.style.transform = `scaleX(${(index + 1) / cards.length})`;
  cards.forEach((card, i) => card.classList.toggle("is-active", i === index));
  videos.forEach((video, i) => {
    if (i !== index) {
      video.pause();
      if (video.readyState > 0) video.currentTime = 0;
      return;
    }
    if (playbackMode !== "play") {
      video.pause();
      return;
    }
    startVideo(i);
  });
}

function startVideo(index) {
  const video = videos[index];
  if (!video) return;
  video.muted = !soundOn;
  const playback = video.play();
  if (playback) playback.catch(() => cards[index].classList.add("video-error"));
}

function updatePlaybackButtons() {
  playButton.setAttribute("aria-pressed", String(playbackMode === "play"));
  pauseButton.setAttribute("aria-pressed", String(playbackMode === "pause"));
  stopButton.setAttribute("aria-pressed", String(playbackMode === "stop"));
}

function moveTo(index) {
  if (!cards.length) return;
  if (scrollLock) return;
  if (index >= cards.length) {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (index < 0) {
    document.querySelector("#top").scrollIntoView({ behavior: "smooth" });
    return;
  }
  scrollLock = true;
  const top = cards[index].getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: "smooth" });
  const unlock = () => {
    scrollLock = false;
    window.removeEventListener("scrollend", unlock);
  };
  window.addEventListener("scrollend", unlock, { once: true });
  window.setTimeout(unlock, 1200);
}

function selectDiscipline(discipline, shouldScroll = true) {
  if (!disciplines.includes(discipline)) return;
  selectedDiscipline = discipline;
  selectedProjects = projects
    .filter((project) => project.discipline === discipline)
    .sort((a, b) => Number(b.year) - Number(a.year));
  if (observer) observer.disconnect();

  projectList.innerHTML = selectedProjects.map(cardMarkup).join("");
  cards = [...projectList.querySelectorAll(".project")];
  videos = cards.map((card) => card.querySelector("video"));
  activeIndex = 0;
  currentLabel.textContent = String(cards.length ? 1 : 0).padStart(2, "0");
  totalLabel.textContent = String(cards.length).padStart(2, "0");
  currentProgress.style.transform = "scaleX(0)";
  switcher.hidden = false;
  controls.hidden = cards.length === 0;
  reel.classList.toggle("has-selection", cards.length > 0);

  document.querySelectorAll("[data-select-discipline]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.selectDiscipline === selectedDiscipline));
  });

  observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(Number(visible.target.dataset.index));
  }, { threshold: [0.55, 0.8] });
  cards.forEach((card) => observer.observe(card));

  videos.forEach((video, index) => {
    video.addEventListener("ended", () => {
      if (playbackMode === "play" && index === activeIndex) moveTo(index + 1);
    });
  });

  if (shouldScroll && cards[0]) {
    window.requestAnimationFrame(() => cards[0].scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

updateCounts();
document.querySelectorAll("[data-select-discipline]").forEach((button) => {
  button.addEventListener("click", () => selectDiscipline(button.dataset.selectDiscipline));
});
soundButton.addEventListener("click", () => {
  soundOn = !soundOn;
  videos.forEach((video) => { video.muted = !soundOn; });
  soundButton.setAttribute("aria-pressed", String(soundOn));
  soundButton.querySelector(".sound-label").textContent = soundOn ? "SOUND ON" : "SOUND OFF";
});
previousButton.addEventListener("click", () => moveTo(activeIndex - 1));
nextButton.addEventListener("click", () => moveTo(activeIndex + 1));
playButton.addEventListener("click", () => {
  playbackMode = "play";
  updatePlaybackButtons();
  startVideo(activeIndex);
});
pauseButton.addEventListener("click", () => {
  playbackMode = "pause";
  videos[activeIndex]?.pause();
  updatePlaybackButtons();
});
stopButton.addEventListener("click", () => {
  playbackMode = "stop";
  const video = videos[activeIndex];
  if (video) {
    video.pause();
    if (video.readyState > 0) video.currentTime = 0;
  }
  updatePlaybackButtons();
});
updatePlaybackButtons();
document.addEventListener("keydown", (event) => {
  if (!cards.length) return;
  if (event.key === "ArrowDown" || event.key === "PageDown") { event.preventDefault(); moveTo(activeIndex + 1); }
  if (event.key === "ArrowUp" || event.key === "PageUp") { event.preventDefault(); moveTo(activeIndex - 1); }
});
