const DESIGN_W = 1920;
const DESIGN_H = 992;

function initAboutScale() {
  const root = document.documentElement;
  const wrap = document.querySelector(".page-about main.about-page");
  if (!wrap) return;

  const update = () => {
    const scale = Math.min(window.innerWidth / DESIGN_W, 1);
    root.style.setProperty("--about-scale", String(scale));
    wrap.style.minHeight = `${DESIGN_H * scale}px`;
  };

  update();
  window.addEventListener("resize", update);
}

document.addEventListener("DOMContentLoaded", initAboutScale);
