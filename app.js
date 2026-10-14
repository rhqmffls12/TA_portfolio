import { projects } from "./projects.js?v=disciplines-20261014";

const disciplines = ["cinematic", "technical"];
const projectList = document.querySelector("#project-list");
const reel = document.querySelector(".reel");
const switcher = document.querySelector(".discipline-switcher");
const controls = document.querySelector(".reel-controls");
const currentLabel = document.querySelector(".counter-current");
const totalLabel = document.querySelector(".counter-total");
const currentProgress = document.querySelector(".progress-fill");
const soundButton = document.querySelector(".sound-toggle");
let selectedDiscipline = null;
let selectedProjects = [];
let cards = [];
let videos = [];
let activeIndex = 0;
let soundOn = false;
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
  return `
    <article class="project" data-index="${index}" id="project-${index + 1}" aria-label="${titleText}">
      <video class="project-video" muted playsinline preload="metadata"${project.poster ? ` poster="${project.poster}"` : ""}>
        <source src="${project.video}" type="video/mp4" />
      </video>
      <div class="video-shade"></div>
      <div class="project-meta">
        <div class="project-heading"><p class="eyebrow">${project.category}<span class="meta-sep">/</span>${project.year}</p><h2>${project.title.replaceAll("\n", "<br />")}</h2></div>
        <div class="project-details">
          <div><span class="detail-label">MY ROLE</span><p>${project.role}</p></div>
          <div><span class="detail-label">TOOLS</span><p>${project.tools}</p></div>
          <div class="detail-description"><span class="detail-label">ABOUT</span><p>${project.description}</p></div>
        </div>
      </div>
      <div class="project-side"><span>JH — PORTFOLIO</span><span>${number} / ${String(selectedProjects.length).padStart(2, "0")}</span></div>
      <div class="project-caption"><span class="caption-number">${number}</span><span class="caption-rule"></span><span>${project.category}</span></div>
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
      return;
    }
    video.muted = !soundOn;
    const playback = video.play();
    if (playback) playback.catch(() => cards[i].classList.add("video-error"));
  });
}

function moveTo(index) {
  if (scrollLock || !cards.length) return;
  if (index >= cards.length) {
    document.querySelector("#contact").scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (index < 0) {
    document.querySelector("#top").scrollIntoView({ behavior: "smooth" });
    return;
  }
  scrollLock = true;
  cards[index].scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => { scrollLock = false; }, 850);
}

function selectDiscipline(discipline, shouldScroll = true) {
  if (!disciplines.includes(discipline)) return;
  selectedDiscipline = discipline;
  selectedProjects = projects.filter((project) => project.discipline === discipline);
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

  videos.forEach((video, index) => video.addEventListener("ended", () => {
    if (index === activeIndex) moveTo(index + 1);
  }));

  if (shouldScroll && cards[0]) {
    window.requestAnimationFrame(() => cards[0].scrollIntoView({ behavior: "smooth", block: "start" }));
  }
}

updateCounts();
document.querySelectorAll("[data-select-discipline]").forEach((button) => {
  button.addEventListener("click", () => selectDiscipline(button.dataset.selectDiscipline));
});
document.querySelector(".next").addEventListener("click", () => moveTo(activeIndex + 1));
document.querySelector(".previous").addEventListener("click", () => moveTo(activeIndex - 1));
soundButton.addEventListener("click", () => {
  soundOn = !soundOn;
  videos.forEach((video) => { video.muted = !soundOn; });
  soundButton.setAttribute("aria-pressed", String(soundOn));
  soundButton.querySelector(".sound-label").textContent = soundOn ? "SOUND ON" : "SOUND OFF";
});
document.addEventListener("keydown", (event) => {
  if (!cards.length) return;
  if (event.key === "ArrowDown" || event.key === "PageDown") { event.preventDefault(); moveTo(activeIndex + 1); }
  if (event.key === "ArrowUp" || event.key === "PageUp") { event.preventDefault(); moveTo(activeIndex - 1); }
});
