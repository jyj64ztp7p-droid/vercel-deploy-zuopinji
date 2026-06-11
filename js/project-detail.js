const PD_DESIGN_W = 1134;

function initHomeTitleAnim() {
  const title = document.querySelector('.home_title[data-title-anim]');
  if (!title) return;

  const words = [...title.querySelectorAll('[data-scramble-text]')];
  if (!words.length) return;

  const easeCurves = ['linear', 'inOut(3)', 'outExpo'];
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  const scramble = (target, ease = 'linear', duration = 1200) => {
    const finalText = target.dataset.scrambleText || target.textContent || '';
    const start = performance.now();
    const easeMap = {
      linear: (t) => t,
      'inOut(3)': (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
      outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
    };
    const easeFn = easeMap[ease] || easeMap.linear;

    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = easeFn(p);
      const reveal = Math.floor(finalText.length * eased);
      const output = [...finalText].map((ch, i) => {
        if (ch === ' ' || i < reveal) return ch;
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');

      target.textContent = output;
      if (p < 1) requestAnimationFrame(tick);
      else target.textContent = finalText;
    };

    requestAnimationFrame(tick);
  };

  words.forEach((word, i) => {
    word.style.opacity = '1';
    word.textContent = word.dataset.scrambleText || word.textContent;
    setTimeout(() => scramble(word, easeCurves[i] || easeCurves[0], 1200), i * 80);
  });
}

function initPdStackScale() {
  const right = document.querySelector('.project-detail__right');
  const stack = document.querySelector('.pd-stack');
  if (!right || !stack) return;

  let wrap = stack.parentElement;
  if (!wrap?.classList.contains('pd-stack-wrap')) {
    wrap = document.createElement('div');
    wrap.className = 'pd-stack-wrap';
    stack.parentElement.insertBefore(wrap, stack);
    wrap.appendChild(stack);
  }

  const images = [...stack.querySelectorAll('img')];
  let pending = images.filter((img) => !img.complete).length;

  const update = () => {
    const available = right.clientWidth;
    const scale = Math.min(1, available / PD_DESIGN_W);
    stack.style.transform = scale < 1 ? `scale(${scale})` : 'none';
    wrap.style.height = scale < 1 ? `${stack.offsetHeight * scale}px` : 'auto';
  };

  const schedule = () => requestAnimationFrame(update);

  if (pending === 0) schedule();
  else {
    images.forEach((img) => {
      img.addEventListener('load', () => {
        pending -= 1;
        if (pending <= 0) schedule();
      }, { once: true });
    });
  }

  window.addEventListener('resize', schedule);
  if (document.fonts?.ready) document.fonts.ready.then(schedule);
}


function initCursorLabel() {
  const left = document.querySelector('.project-detail__left');
  if (!left) return;

  const label = document.createElement('div');
  label.className = 'project-detail__cursor-label';
  label.innerHTML = '<span class="project-detail__cursor-dot" aria-hidden="true"></span><span class="project-detail__cursor-text">Close</span>';
  document.body.appendChild(label);

  let visibleTimer = null;
  let hideTimer = null;
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let rafId = 0;

  const render = () => {
    currentX += (targetX - currentX) * 0.16;
    currentY += (targetY - currentY) * 0.16;
    label.style.setProperty('--x', `${currentX}px`);
    label.style.setProperty('--y', `${currentY}px`);
    rafId = requestAnimationFrame(render);
  };

  const startRender = () => {
    if (!rafId) rafId = requestAnimationFrame(render);
  };

  const stopRender = () => {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = 0;
  };

  const show = (e) => {
    clearTimeout(hideTimer);
    targetX = e.clientX - 80;
    targetY = e.clientY - 20;
    if (visibleTimer) return;
    visibleTimer = window.setTimeout(() => {
      label.classList.add('is-visible');
      startRender();
      visibleTimer = null;
    }, 20);
  };

  const move = (e) => {
    targetX = e.clientX - 80;
    targetY = e.clientY - 20;
  };

  const hide = () => {
    clearTimeout(visibleTimer);
    visibleTimer = null;
    hideTimer = window.setTimeout(() => {
      label.classList.remove('is-visible');
      stopRender();
    }, 60);
  };

  left.addEventListener('mouseenter', show);
  left.addEventListener('mousemove', move);
  left.addEventListener('mouseleave', hide);
}

document.addEventListener('DOMContentLoaded', () => {
  initHomeTitleAnim();
  initPdStackScale();
  initCursorLabel();

  const close = document.querySelector('.project-detail__close');
  const back = document.querySelector('.project-detail__back');
  const left = document.querySelector('.project-detail__left');

  const goHome = (e) => {
    e.preventDefault();
    window.location.href = 'index.html';
  };

  if (close) close.addEventListener('click', goHome);
  if (back) back.addEventListener('click', goHome);

  if (left) {
    left.addEventListener('click', (e) => {
      if (e.target.closest('.project-detail__close')) return;
      goHome(e);
    });
  }
});
