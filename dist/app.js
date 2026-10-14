import { projects } from "./projects.js";

const list = document.querySelector("#project-list");
list.innerHTML = projects.map((project, index) => `
  <article class="project" data-index="${index}" id="project-${index + 1}" aria-label="${project.title.replace("\n", " ")}">
    <video class="project-video" muted playsinline preload="metadata"${project.poster ? ` poster="${project.poster}"` : ""}>
      <source src="${project.video}" type="video/mp4" />
    </video>
    <div class="video-shade"></div>
    <div class="project-meta">
      <div class="project-heading"><p class="eyebrow">${project.category}<span class="meta-sep">/</span>${project.year}</p><h2>${project.title.replace("\n", "<br />")}</h2></div>
      <div class="project-details">
        <div><span class="detail-label">MY ROLE</span><p>${project.role}</p></div>
        <div><span class="detail-label">TOOLS</span><p>${project.tools}</p></div>
        <div class="detail-description"><span class="detail-label">ABOUT</span><p>${project.description}</p></div>
      </div>
    </div>
    <div class="project-side"><span>JH — PORTFOLIO</span><span>${project.number} / 0${projects.length}</span></div>
    <div class="project-caption"><span class="caption-number">${project.number}</span><span class="caption-rule"></span><span>${project.category}</span></div>
  </article>`).join("");

const cards = [...document.querySelectorAll(".project")];
const videos = cards.map((card) => card.querySelector("video"));
const currentLabel = document.querySelector(".counter-current");
document.querySelector(".counter-total").textContent = String(cards.length).padStart(2, "0");
const currentProgress = document.querySelector(".progress-fill");
const soundButton = document.querySelector(".sound-toggle");
let activeIndex = 0;
let soundOn = false;
let scrollLock = false;

function setActive(index) {
  activeIndex = index;
  currentLabel.textContent = String(index + 1).padStart(2, "0");
  currentProgress.style.transform = `scaleX(${(index + 1) / cards.length})`;
  cards.forEach((card, i) => card.classList.toggle("is-active", i === index));
  videos.forEach((video, i) => {
    if (i !== index) { video.pause(); return; }
    video.muted = !soundOn;
    const playback = video.play();
    if (playback) playback.catch(() => cards[i].classList.add("video-error"));
  });
}

function moveTo(index) {
  if (scrollLock) return;
  if (index >= cards.length) { document.querySelector("#contact").scrollIntoView({ behavior: "smooth" }); return; }
  if (index < 0) { document.querySelector("#top").scrollIntoView({ behavior: "smooth" }); return; }
  scrollLock = true;
  cards[index].scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => { scrollLock = false; }, 850);
}

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) setActive(Number(visible.target.dataset.index));
}, { threshold: [0.55, 0.8] });
cards.forEach((card) => observer.observe(card));

videos.forEach((video, index) => video.addEventListener("ended", () => {
  if (index === activeIndex) moveTo(index + 1);
}));
document.querySelector(".next").addEventListener("click", () => moveTo(activeIndex + 1));
document.querySelector(".previous").addEventListener("click", () => moveTo(activeIndex - 1));
soundButton.addEventListener("click", () => {
  soundOn = !soundOn;
  videos.forEach((video) => { video.muted = !soundOn; });
  soundButton.setAttribute("aria-pressed", String(soundOn));
  soundButton.querySelector(".sound-label").textContent = soundOn ? "SOUND ON" : "SOUND OFF";
});
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowDown" || event.key === "PageDown") { event.preventDefault(); moveTo(activeIndex + 1); }
  if (event.key === "ArrowUp" || event.key === "PageUp") { event.preventDefault(); moveTo(activeIndex - 1); }
});
