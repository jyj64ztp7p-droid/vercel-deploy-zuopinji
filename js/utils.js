export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function debounce(fn, ms) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}

export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

export function passive(el, type, handler) {
  el.addEventListener(type, handler, { passive: true });
}
