const storageKey = "portfolio:music";
const channelName = "portfolio:music-channel";
const channel = "BroadcastChannel" in window ? new BroadcastChannel(channelName) : null;
const audio = document.getElementById("bgm");

const readState = () => {
  try {
    return JSON.parse(localStorage.getItem(storageKey) || "null");
  } catch {
    return null;
  }
};

const persist = () => {
  const state = {
    playing: !audio.paused && !audio.ended,
    currentTime: audio.currentTime || 0,
    savedAt: Date.now(),
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
  if (channel) channel.postMessage({ type: "state", state });
};

const applyState = async (state) => {
  if (!state) return;
  try {
    if (typeof state.currentTime === "number" && Number.isFinite(state.currentTime)) {
      audio.currentTime = Math.max(0, state.currentTime);
    }
    if (state.playing) await audio.play();
    else audio.pause();
    persist();
  } catch {
    persist();
  }
};

if (channel) {
  channel.onmessage = (e) => {
    const msg = e.data || {};
    if (msg.type === "toggle") {
      applyState({ playing: audio.paused || audio.ended, currentTime: audio.currentTime || 0 });
    } else if (msg.type === "play") {
      applyState({ playing: true, currentTime: msg.currentTime ?? audio.currentTime ?? 0 });
    } else if (msg.type === "pause") {
      applyState({ playing: false, currentTime: audio.currentTime || 0 });
    } else if (msg.type === "sync") {
      persist();
    }
  };
}

audio.addEventListener("play", persist);
audio.addEventListener("pause", persist);
audio.addEventListener("timeupdate", persist);
audio.addEventListener("ended", persist);

const saved = readState();
if (saved?.playing) {
  const elapsed = (Date.now() - (saved.savedAt || 0)) / 1000;
  applyState({ playing: true, currentTime: (saved.currentTime || 0) + elapsed });
} else {
  persist();
}

if (channel) channel.postMessage({ type: "ready" });
