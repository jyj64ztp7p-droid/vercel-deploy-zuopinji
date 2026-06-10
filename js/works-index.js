import { passive, prefersReducedMotion } from "./utils.js";

function initSmoothScroll(el) {
  if (!el || prefersReducedMotion()) return;

  let target = el.scrollLeft;
  let current = el.scrollLeft;
  let velocity = 0;
  let isDragging = false;
  let startX = 0;
  let dragStartTarget = 0;
  let lastX = 0;
  let lastTime = 0;
  const lerp = 0.12;
  const friction = 0.92;

  function tick() {
    if (!isDragging) {
      target += velocity;
      velocity *= friction;
      if (Math.abs(velocity) < 0.02) velocity = 0;
    }
    current += (target - current) * lerp;
    el.scrollLeft = current;
    requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);

  el.addEventListener(
    "wheel",
    (e) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
      e.preventDefault();
      target += e.deltaY * 0.55;
      velocity += e.deltaY * 0.045;
    },
    { passive: false }
  );

  el.addEventListener("mousedown", (e) => {
    if (e.button !== 0) return;
    isDragging = true;
    el.classList.add("is-dragging");
    startX = e.pageX;
    dragStartTarget = target;
    lastX = e.pageX;
    lastTime = performance.now();
    velocity = 0;
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    target = dragStartTarget - (e.pageX - startX);
    const now = performance.now();
    const dt = now - lastTime;
    if (dt > 0) velocity = -(e.pageX - lastX) / dt * 0.35;
    lastX = e.pageX;
    lastTime = now;
  });

  window.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    el.classList.remove("is-dragging");
  });

  let touchStartX = 0;
  let touchTargetStart = 0;

  passive(el, "touchstart", (e) => {
    const t = e.touches[0];
    touchStartX = t.pageX;
    touchTargetStart = target;
    lastX = t.pageX;
    lastTime = performance.now();
    velocity = 0;
    isDragging = true;
  });

  passive(el, "touchmove", (e) => {
    const t = e.touches[0];
    target = touchTargetStart - (t.pageX - touchStartX);
    const now = performance.now();
    const dt = now - lastTime;
    if (dt > 0) velocity = -(t.pageX - lastX) / dt * 0.35;
    lastX = t.pageX;
    lastTime = now;
  });

  el.addEventListener("touchend", () => {
    isDragging = false;
  });
}

function initLightbox() {
  if (!window.matchMedia("(max-width: 767px)").matches) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <button class="lightbox__close" aria-label="Close">&times;</button>
    <button class="lightbox__nav lightbox__nav--prev" aria-label="Previous">&#8249;</button>
    <img class="lightbox__img" alt="" />
    <button class="lightbox__nav lightbox__nav--next" aria-label="Next">&#8250;</button>
  `;
  document.body.appendChild(lightbox);

  const img = lightbox.querySelector(".lightbox__img");
  const items = [...document.querySelectorAll(".works-scroll__item img")];
  let index = 0;
  let touchStartX = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    img.src = items[index].src;
    img.alt = items[index].alt;
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  items.forEach((el, i) => {
    el.style.cursor = "pointer";
    el.addEventListener("click", () => show(i));
  });

  lightbox.querySelector(".lightbox__close").addEventListener("click", close);
  lightbox.querySelector(".lightbox__nav--prev").addEventListener("click", () => show(index - 1));
  lightbox.querySelector(".lightbox__nav--next").addEventListener("click", () => show(index + 1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  passive(lightbox, "touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
  });
  lightbox.addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) show(dx > 0 ? index - 1 : index + 1);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".works-scroll").forEach(initSmoothScroll);
  initLightbox();
});
