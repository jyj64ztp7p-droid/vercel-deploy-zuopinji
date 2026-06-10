import { prefersReducedMotion } from "./utils.js";

function updateHomeScale() {
  const canvas = document.querySelector(".home-canvas");
  if (!canvas) return;

  const scale = Math.min(1, window.innerWidth / 1920, window.innerHeight / 1080);
  document.documentElement.style.setProperty("--home-scale", String(scale));

  const scaledHeight = 1080 * scale;
  canvas.style.height = `${scaledHeight}px`;
  canvas.style.marginTop = `${Math.max(0, (window.innerHeight - scaledHeight) / 2)}px`;
}

function initHomeMotion() {
  const fg = document.querySelector(".home-hero__foreground");
  if (fg) {
    fg.style.opacity = "1";
    fg.style.transform = "none";
  }
  if (prefersReducedMotion() || !window.gsap) return;
  gsap.from(".home-hero__foreground", { opacity: 0, y: 12, duration: 0.8, ease: "power2.out", delay: 0.1 });
}

function initHomeTitleAnim() {
  const title = document.querySelector(".home_title[data-title-anim]");
  if (!title) return;

  const nodes = [...title.querySelectorAll("[data-scramble-text]")];
  if (!nodes.length) return;

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const easeMap = {
    linear: (t) => t,
    "inOut(3)": (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  };

  const scramble = (node, ease = "linear", duration = 1200) => {
    const finalText = node.dataset.scrambleText || node.textContent || "";
    const start = performance.now();
    const easeFn = easeMap[ease] || easeMap.linear;

    const frame = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeFn(p);
      const reveal = Math.floor(finalText.length * eased);
      const text = [...finalText]
        .map((ch, i) => {
          if (ch === " " || i < reveal) return ch;
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      node.textContent = text;
      node.style.opacity = "1";
      node.style.visibility = "visible";
      node.style.filter = "none";

      if (p < 1) requestAnimationFrame(frame);
      else node.textContent = finalText;
    };

    requestAnimationFrame(frame);
  };

  title.style.opacity = "1";
  title.style.visibility = "visible";
  title.style.filter = "none";
  title.style.transform = "none";

  nodes.forEach((node, i) => {
    node.style.opacity = "1";
    node.style.visibility = "visible";
    node.style.filter = "none";
    node.style.transform = "none";
    setTimeout(() => scramble(node, ["linear", "inOut(3)", "outExpo"][i] || "linear", 1200), i * 80);
  });
}

function initGalleryAutoLoop() {
  const gallery = document.querySelector(".home-gallery");
  const track = document.querySelector(".home-gallery__track");
  if (!gallery || !track) return;

  const originals = [...track.children].map((node) => node.cloneNode(true));
  let duplicated = false;
  let halfWidth = 0;
  let offset = 0;
  let currentVelocity = -0.65;
  let targetVelocity = -0.65;
  let wheelActiveUntil = 0;

  const buildLoop = () => {
    if (!duplicated) {
      originals.forEach((node) => track.appendChild(node.cloneNode(true)));
      duplicated = true;
    }
    halfWidth = track.scrollWidth / 2;
  };

  const normalize = (value) => {
    if (!halfWidth) return value;
    let next = value;
    while (next <= -halfWidth) next += halfWidth;
    while (next > 0) next -= halfWidth;
    return next;
  };

  const render = () => {
    track.style.transform = `translate3d(${offset}px, 0, 0)`;
  };

  const refresh = () => {
    buildLoop();
    offset = normalize(offset);
    render();
  };

  const tick = () => {
    if (halfWidth) {
      const now = performance.now();
      if (now > wheelActiveUntil) {
        targetVelocity = -0.65;
      }
      currentVelocity += (targetVelocity - currentVelocity) * 0.08;
      offset += currentVelocity;
      offset = normalize(offset);
      render();
    }
    requestAnimationFrame(tick);
  };

  refresh();
  requestAnimationFrame(tick);

  const navigateFromSlide = (slide) => {
    const href = slide?.getAttribute("href");
    if (href) window.location.assign(href);
  };

  gallery.addEventListener("click", (e) => {
    const slide = e.target.closest?.(".home-gallery__slide");
    if (!slide) return;
    e.preventDefault();
    navigateFromSlide(slide);
  });

  gallery.addEventListener("wheel", (e) => {
    const dominant = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (!dominant) return;
    e.preventDefault();
    wheelActiveUntil = performance.now() + 40;
    const step = -dominant * 0.18;
    currentVelocity = step;
    targetVelocity = step;
    offset += step;
    offset = normalize(offset);
    render();
  }, { passive: false });

  window.addEventListener("resize", refresh);
}

function boot() {
  updateHomeScale();
  initHomeMotion();
  initHomeTitleAnim();
  initGalleryAutoLoop();
  window.addEventListener("resize", updateHomeScale);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
