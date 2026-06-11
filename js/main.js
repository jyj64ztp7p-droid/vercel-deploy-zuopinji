import { passive, prefersReducedMotion } from "./utils.js";

function initNavFlicker(root = document) {
  const links = root.querySelectorAll("[data-flicker]");
  links.forEach((link) => {
    if (link.dataset.flickerBound === "1") return;
    link.dataset.flickerBound = "1";
    link.addEventListener("mouseenter", () => {
      if (prefersReducedMotion()) return;
      link.classList.remove("is-flickering");
      void link.offsetWidth;
      link.classList.add("is-flickering");
    });
    link.addEventListener("animationend", (e) => {
      if (e.animationName === "nav-flicker") link.classList.remove("is-flickering");
    });
    link.addEventListener("mouseleave", () => link.classList.remove("is-flickering"));
  });
}

function initHamburger() {
  const btn = document.querySelector(".hamburger");
  const nav = document.querySelector(".mobile-nav");
  if (!btn || !nav || btn.dataset.bound === "1") return;
  btn.dataset.bound = "1";
  btn.addEventListener("click", () => {
    const open = btn.classList.toggle("is-active");
    nav.classList.toggle("is-open", open);
    btn.setAttribute("aria-expanded", String(open));
    document.body.style.overflow = open ? "hidden" : "";
  });
  nav.querySelectorAll("a").forEach((a) => {
    if (a.dataset.bound === "1") return;
    a.dataset.bound = "1";
    a.addEventListener("click", () => {
      btn.classList.remove("is-active");
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });
}

function initMusicPlayer() {
  if (window.__portfolioMusicInit) return;
  window.__portfolioMusicInit = true;
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const players = [...document.querySelectorAll("[data-music-player], .site-header .music-player")];
  if (!players.length) return;
  if (isMobile) {
    players.forEach((player) => player.remove());
    return;
  }

  const storageKey = "portfolio:music";
  const channelName = "portfolio:music-channel";
  const playerWindowName = "portfolio_music_host";
  const channel = "BroadcastChannel" in window ? new BroadcastChannel(channelName) : null;
  const isHome = document.body.classList.contains("page-home");
  const audio = document.querySelector("#bgm");
  let hostWindow = null;

  if (!audio) return;

  const readState = () => {
    try {
      return JSON.parse(localStorage.getItem(storageKey) || "null");
    } catch {
      return null;
    }
  };

  const saveState = (state = { playing: !audio.paused && !audio.ended, currentTime: audio.currentTime || 0 }) => {
    localStorage.setItem(storageKey, JSON.stringify({ ...state, savedAt: Date.now() }));
    if (channel) channel.postMessage({ type: "state", state });
  };

  let lastUiPlaying = null;
  const syncAll = (state = { playing: !audio.paused && !audio.ended, currentTime: audio.currentTime || 0 }) => {
    const playing = Boolean(state.playing);
    if (lastUiPlaying === playing) return;
    lastUiPlaying = playing;
    players.forEach((player) => {
      const toggle = player.querySelector(".music-player__toggle");
      if (!toggle) return;
      player.classList.toggle("is-playing", playing);
      toggle.setAttribute("aria-label", playing ? "Pause music" : "Play music");
    });
  };

  const getHostWindow = () => {
    if (hostWindow && !hostWindow.closed) return hostWindow;
    try {
      hostWindow = window.open("", playerWindowName, "width=1,height=1,left=-10000,top=-10000,noopener=false,noreferrer=false,scrollbars=no,toolbar=no,location=no,status=no,menubar=no,resizable=no");
      if (hostWindow) {
        try {
          hostWindow.blur();
          hostWindow.resizeTo(1, 1);
          hostWindow.moveTo(-10000, -10000);
        } catch {}
      }
      return hostWindow;
    } catch {
      return null;
    }
  };

  const writeHostDocument = (win) => {
    const html = `<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>music-host</title><style>html,body{width:1px;height:1px;overflow:hidden;background:transparent;margin:0;padding:0;}</style></head><body><audio id="bgm" loop preload="auto" autoplay src="assets/audio/bgm.mp3"></audio><script>
const storageKey = ${JSON.stringify(storageKey)};
const channelName = ${JSON.stringify(channelName)};
const bc = 'BroadcastChannel' in window ? new BroadcastChannel(channelName) : null;
const audio = document.getElementById('bgm');
const readState = () => { try { return JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch { return null; } };
const persist = () => {
const state = { playing: !audio.paused && !audio.ended, currentTime: audio.currentTime || 0, savedAt: Date.now() };
localStorage.setItem(storageKey, JSON.stringify(state));
if (bc) bc.postMessage({ type: 'state', state });
};
const applyState = async (state) => {
try {
if (!state) return;
if (typeof state.currentTime === 'number' && Number.isFinite(state.currentTime)) audio.currentTime = Math.max(0, state.currentTime);
if (state.playing) await audio.play(); else audio.pause();
persist();
} catch { persist(); }
};
if (bc) {
bc.onmessage = (e) => {
const msg = e.data || {};
if (msg.type === 'toggle') applyState({ playing: audio.paused || audio.ended, currentTime: audio.currentTime || 0 });
else if (msg.type === 'play') applyState({ playing: true, currentTime: msg.currentTime || audio.currentTime || 0 });
else if (msg.type === 'pause') applyState({ playing: false, currentTime: audio.currentTime || 0 });
else if (msg.type === 'sync') persist();
};
}
audio.addEventListener('play', persist);
audio.addEventListener('pause', persist);
audio.addEventListener('timeupdate', persist);
audio.addEventListener('ended', persist);
const state = readState();
if (state?.playing) applyState(state); else persist();
setTimeout(() => { try { window.blur(); } catch {} }, 0);
<\/script></body></html>`;
    win.document.open();
    win.document.write(html);
    win.document.close();
  };

  const ensureHost = () => {
    const win = getHostWindow();
    if (!win) return null;
    if (win.document?.getElementById?.('bgm')) return win;
    writeHostDocument(win);
    return win;
  };

  const sendCommand = (type) => {
    if (!channel) return;
    const state = readState();
    if (type === 'toggle') channel.postMessage({ type: 'toggle' });
    if (type === 'play') channel.postMessage({ type: 'play', currentTime: state?.currentTime || 0 });
    if (type === 'pause') channel.postMessage({ type: 'pause', currentTime: state?.currentTime || 0 });
    if (type === 'sync') channel.postMessage({ type: 'sync' });
  };

  const togglePlayback = (e) => {
    e.preventDefault();
    e.stopPropagation();
    ensureHost();
    sendCommand('toggle');
  };

  players.forEach((player) => {
    const toggle = player.querySelector('.music-player__toggle');
    if (!toggle || toggle.dataset.bound === '1') return;
    toggle.dataset.bound = '1';
    toggle.addEventListener('click', togglePlayback);
  });

  if (channel) {
    channel.onmessage = (e) => {
      const msg = e.data || {};
      if (msg.type !== 'state') return;
      const state = { playing: Boolean(msg.state?.playing), currentTime: Number(msg.state?.currentTime || 0) };
      saveState(state);
      syncAll(state);
    };
  }

  if (!audio.dataset.bound) {
    audio.dataset.bound = '1';
    audio.addEventListener('play', () => saveState({ playing: true, currentTime: audio.currentTime || 0 }));
    audio.addEventListener('pause', () => saveState({ playing: false, currentTime: audio.currentTime || 0 }));
    audio.addEventListener('timeupdate', () => saveState({ playing: !audio.paused && !audio.ended, currentTime: audio.currentTime || 0 }));
    audio.addEventListener('ended', () => saveState({ playing: false, currentTime: audio.currentTime || 0 }));
    window.addEventListener('pagehide', () => saveState({ playing: !audio.paused && !audio.ended, currentTime: audio.currentTime || 0 }));
    window.addEventListener('beforeunload', () => saveState({ playing: !audio.paused && !audio.ended, currentTime: audio.currentTime || 0 }));
  }

  const initial = readState();
  if (initial) syncAll({ playing: Boolean(initial.playing), currentTime: Number(initial.currentTime || 0) });

  if (isHome) {
    ensureHost();
    window.addEventListener('pageshow', () => {
      const state = readState();
      if (state) syncAll({ playing: Boolean(state.playing), currentTime: Number(state.currentTime || 0) });
    });
  }

  syncAll(initial || undefined);
}

function setupGlobalNav() {
  const pages = ["index.html", "works-index.html", "about.html", "project-detail-1.html", "project-detail-2.html", "project-detail-3.html", "project-detail-4.html", "project-detail-5.html"];
  document.querySelectorAll(pages.map((p) => `a[href='${p}']`).join(", ")).forEach((a) => {
    a.style.cursor = "pointer";
  });
}

function boot() {
  initNavFlicker();
  initHamburger();
  initMusicPlayer();
  setupGlobalNav();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
