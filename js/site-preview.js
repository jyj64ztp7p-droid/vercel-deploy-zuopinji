const RULES = {
  industry: [
    { keys: ["科技", "tech", "saas", "ai", "人工智能", "软件", "互联网"], id: "tech", label: "科技" },
    { keys: ["电商", "购物", "商城", "零售", "ecommerce", "shop"], id: "ecommerce", label: "电商" },
    { keys: ["餐饮", "美食", "咖啡", "餐厅", "food", "cafe"], id: "food", label: "餐饮" },
    { keys: ["教育", "课程", "学习", "edu", "培训"], id: "edu", label: "教育" },
    { keys: ["医疗", "健康", "医院", "health"], id: "health", label: "健康" },
    { keys: ["金融", "理财", "银行", "finance", "fintech"], id: "finance", label: "金融" },
    { keys: ["web3", "nft", "区块链", "crypto", "元宇宙"], id: "web3", label: "Web3" },
    { keys: ["潮玩", "艺术", "展览", "gallery", "创意"], id: "creative", label: "创意" },
    { keys: ["企业", "官网", "品牌", "corporate", "b2b"], id: "corporate", label: "企业" },
  ],
  style: [
    { keys: ["简约", "极简", "minimal", "干净", "留白"], id: "minimal", label: "简约" },
    { keys: ["现代", "modern", "时尚"], id: "modern", label: "现代" },
    { keys: ["复古", "retro", "怀旧", "vintage"], id: "retro", label: "复古" },
    { keys: ["活泼", "趣味", "playful", "可爱", "卡通"], id: "playful", label: "活泼" },
    { keys: ["高端", "奢华", "luxury", "premium", "精致"], id: "luxury", label: "高端" },
    { keys: ["粗犷", "bold", "大胆", "力量"], id: "bold", label: "粗犷" },
  ],
  theme: [
    { keys: ["暗色", "深色", "dark", "黑夜", "夜间"], id: "dark", label: "暗色" },
    { keys: ["亮色", "浅色", "light", "明亮"], id: "light", label: "亮色" },
  ],
  color: [
    { keys: ["蓝", "blue", "海军"], hex: "#2563eb", label: "蓝色" },
    { keys: ["红", "red", "珊瑚"], hex: "#e96d5a", label: "红色" },
    { keys: ["绿", "green", "自然", "环保"], hex: "#16a34a", label: "绿色" },
    { keys: ["紫", "purple", "紫罗兰"], hex: "#7c3aed", label: "紫色" },
    { keys: ["橙", "orange", "暖色"], hex: "#ea580c", label: "橙色" },
    { keys: ["粉", "pink", "少女"], hex: "#ec4899", label: "粉色" },
    { keys: ["金", "gold", "香槟"], hex: "#b8860b", label: "金色" },
    { keys: ["黑", "black", "黑白"], hex: "#15140f", label: "黑色" },
  ],
  layout: [
    { keys: ["卡片", "card", "网格", "grid"], id: "grid", label: "卡片网格" },
    { keys: ["大图", "视觉", "hero", "全屏", "banner"], id: "hero", label: "大图主视觉" },
    { keys: ["分栏", "左右", "split", "双栏"], id: "split", label: "左右分栏" },
  ],
};

const INDUSTRY_PRESETS = {
  tech: { headline: "让复杂技术，变得简单可用", sub: "面向团队的云端协作与智能分析平台", eyebrow: "NEXT-GEN PLATFORM", slug: "techflow.io" },
  ecommerce: { headline: "发现好物，即刻拥有", sub: "精选全球设计师品牌与生活方式单品", eyebrow: "NEW COLLECTION", slug: "shopnova.com" },
  food: { headline: "每一口，都是新鲜故事", sub: "从农场到餐桌的当季灵感料理", eyebrow: "FARM TO TABLE", slug: "tastelab.cafe" },
  edu: { headline: "系统化学习，看得见成长", sub: "名师直播 + 实战项目，陪你从入门到精通", eyebrow: "ONLINE ACADEMY", slug: "learnhub.edu" },
  health: { headline: "守护健康，从每一次记录开始", sub: "个性化健康档案与专业随访提醒", eyebrow: "WELLNESS", slug: "vitacare.health" },
  finance: { headline: "稳健理财，透明可控", sub: "智能资产配置与实时风险洞察", eyebrow: "WEALTH", slug: "steadyfin.com" },
  web3: { headline: "进入下一代数字游乐场", sub: "链上资产、社交与玩法一体化的沉浸体验", eyebrow: "METAVERSE", slug: "party.icons" },
  creative: { headline: "限量发售，收藏你的宇宙", sub: "艺术家联名系列与沉浸式展览预约", eyebrow: "DROP 2026", slug: "collect.art" },
  corporate: { headline: "以设计驱动商业增长", sub: "为成长型企业提供品牌与数字化解决方案", eyebrow: "STUDIO", slug: "betteroff.studio" },
};

const DEFAULT = {
  industry: "corporate",
  style: "modern",
  theme: "light",
  accent: "#e96d5a",
  layout: "hero",
};

function tokenize(raw) {
  return raw
    .toLowerCase()
    .split(/[\s,，、;；/|]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function matchRule(list, tokens) {
  for (const rule of list) {
    if (rule.keys.some((k) => tokens.some((t) => t.includes(k.toLowerCase()) || k.toLowerCase().includes(t)))) {
      return rule;
    }
  }
  return null;
}

function parseKeywords(raw) {
  const tokens = tokenize(raw);
  const industry = matchRule(RULES.industry, tokens)?.id ?? DEFAULT.industry;
  const style = matchRule(RULES.style, tokens)?.id ?? DEFAULT.style;
  const theme = matchRule(RULES.theme, tokens)?.id ?? DEFAULT.theme;
  const layout = matchRule(RULES.layout, tokens)?.id ?? DEFAULT.layout;
  const colorHit = matchRule(RULES.color, tokens);
  const accent = colorHit?.hex ?? DEFAULT.accent;

  const detected = [];
  if (matchRule(RULES.industry, tokens)) detected.push(matchRule(RULES.industry, tokens).label);
  if (matchRule(RULES.style, tokens)) detected.push(matchRule(RULES.style, tokens).label);
  if (matchRule(RULES.theme, tokens)) detected.push(matchRule(RULES.theme, tokens).label);
  if (colorHit) detected.push(colorHit.label);
  if (matchRule(RULES.layout, tokens)) detected.push(matchRule(RULES.layout, tokens).label);

  const brand = tokens.find((t) => t.length >= 2 && !RULES.industry.some((r) => r.keys.some((k) => t.includes(k))) && !RULES.style.some((r) => r.keys.some((k) => t.includes(k))));

  return { tokens, industry, style, theme, layout, accent, detected, brandName: brand || null };
}

function buildTheme(parsed) {
  const isDark = parsed.theme === "dark";
  const isMinimal = parsed.style === "minimal";
  const isLuxury = parsed.style === "luxury";
  const isRetro = parsed.style === "retro";
  const isPlayful = parsed.style === "playful";
  const isBold = parsed.style === "bold";

  let bg = isDark ? "#0f1117" : isMinimal ? "#fafafa" : "#f9f7f3";
  let text = isDark ? "#f2f0eb" : "#15140f";
  let accent2 = parsed.accent;

  if (parsed.industry === "web3") accent2 = "#6366f1";
  if (parsed.industry === "food") accent2 = isDark ? "#f59e0b" : "#c2410c";
  if (parsed.industry === "health") accent2 = "#0d9488";
  if (parsed.industry === "finance") accent2 = "#1e3a5f";

  const radius = isRetro ? "2px" : isPlayful ? "16px" : isMinimal ? "4px" : "8px";
  const font = isLuxury ? '"Playfair Display", Georgia, serif' : isRetro ? "Georgia, serif" : isPlayful ? '"Chakra Petch", sans-serif' : "system-ui, sans-serif";

  return {
    "--pv-bg": bg,
    "--pv-text": text,
    "--pv-accent": parsed.accent,
    "--pv-accent-2": accent2,
    "--pv-border": isDark ? "rgba(255,255,255,0.1)" : "rgba(21,20,15,0.1)",
    "--pv-nav-bg": isDark ? "rgba(0,0,0,0.3)" : isMinimal ? "transparent" : "rgba(255,255,255,0.5)",
    "--pv-card-bg": isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.7)",
    "--pv-cta-text": isDark ? "#0f1117" : "#fff",
    "--pv-radius": radius,
    "--pv-font": font,
    "--pv-hero-align": parsed.layout === "split" ? "left" : "center",
    "--pv-cols": parsed.layout === "grid" || parsed.industry === "ecommerce" ? "3" : "2",
  };
}

function renderMock(parsed) {
  const preset = INDUSTRY_PRESETS[parsed.industry] || INDUSTRY_PRESETS.corporate;
  const brand = parsed.brandName
    ? parsed.brandName.charAt(0).toUpperCase() + parsed.brandName.slice(1)
    : preset.slug.split(".")[0].toUpperCase();

  return `
    <div class="site-preview-mock site-preview-mock--portfolio">
      <header class="site-preview-mock__nav site-preview-mock__nav--portfolio">
        <span class="site-preview-mock__logo">PORTFOLIO</span>
        <nav class="site-preview-mock__links site-preview-mock__links--portfolio" aria-label="Main">
          <span>INDEX</span>
          <span>ABOUT</span>
          <span class="site-preview-mock__avatar" aria-hidden="true"></span>
        </nav>
      </header>

      <section class="site-preview-mock__hero site-preview-mock__hero--portfolio">
        <div class="site-preview-mock__hero-copy">
          <p class="site-preview-mock__eyebrow">${preset.eyebrow}</p>
          <h1 class="site-preview-mock__headline">${preset.headline}</h1>
          <p class="site-preview-mock__sub">${preset.sub}</p>
        </div>
        <div class="site-preview-mock__music music-player music-player--preview is-playing">
          <div class="music-player__cover-wrap">
            <div class="music-player__cover"></div>
            <button class="music-player__toggle" aria-label="Pause">
              <span class="music-player__icon music-player__icon--pause" aria-hidden="true"></span>
            </button>
          </div>
          <div class="music-player__marquee">
            <div class="music-player__marquee-track">
              <span>${brand} / now playing</span><span>${brand} / now playing</span>
            </div>
          </div>
        </div>
      </section>

      <section class="site-preview-mock__block site-preview-mock__block--gif1" style="margin-top:1rem">
        <div class="site-preview-mock__gif site-preview-mock__gif--wide"></div>
        <div class="site-preview-mock__title-card"></div>
      </section>

      <section class="site-preview-mock__block site-preview-mock__block--gif2" style="margin-top:1rem">
        <div class="site-preview-mock__pic"></div>
        <div class="site-preview-mock__gif site-preview-mock__gif--float"></div>
      </section>

      <footer class="site-preview-mock__footer">© 2026 ${brand} — 预览由关键词生成</footer>
    </div>`;
}

function updateMeta(parsed, themeVars) {
  const dl = document.getElementById("preview-meta");
  if (!dl) return;
  const industryLabel = RULES.industry.find((r) => r.id === parsed.industry)?.label ?? parsed.industry;
  const styleLabel = RULES.style.find((r) => r.id === parsed.style)?.label ?? parsed.style;
  const themeLabel = parsed.theme === "dark" ? "暗色" : "亮色";
  const layoutLabel =
    parsed.layout === "grid" ? "卡片网格" : parsed.layout === "split" ? "左右分栏" : "大图主视觉";

  dl.innerHTML = `
    <dt>识别标签</dt><dd>${parsed.detected.length ? parsed.detected.join(" · ") : "（使用默认风格，可补充更多关键词）"}</dd>
    <dt>行业 / 风格</dt><dd>${industryLabel} · ${styleLabel}</dd>
    <dt>主题 / 布局</dt><dd>${themeLabel} · ${layoutLabel}</dd>
    <dt>主色</dt><dd>${themeVars["--pv-accent"]}</dd>
  `;
}

function generatePreview(raw) {
  const parsed = parseKeywords(raw || "科技 简约 蓝色 企业官网");
  const frame = document.getElementById("preview-frame");
  const url = document.getElementById("preview-url");
  const mockRoot = document.getElementById("preview-mock-root");
  if (!frame || !mockRoot) return;

  const themeVars = buildTheme(parsed);
  Object.entries(themeVars).forEach(([k, v]) => frame.style.setProperty(k, v));
  frame.classList.add("site-preview-frame--portfolio");

  const preset = INDUSTRY_PRESETS[parsed.industry] || INDUSTRY_PRESETS.corporate;
  if (url) url.textContent = `https://${preset.slug}/`;

  mockRoot.innerHTML = renderMock(parsed);
  updateMeta(parsed, themeVars);
}

function init() {
  const input = document.getElementById("keyword-input");
  const btn = document.getElementById("btn-generate");
  const reset = document.getElementById("btn-reset");
  const chips = document.querySelectorAll(".site-preview-chip");

  const run = () => generatePreview(input?.value ?? "");

  btn?.addEventListener("click", run);
  input?.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      run();
    }
  });

  reset?.addEventListener("click", () => {
    if (input) input.value = "";
    chips.forEach((c) => c.classList.remove("is-active"));
    generatePreview("");
  });

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const kw = chip.dataset.kw ?? "";
      if (!input) return;
      const parts = tokenize(input.value);
      if (!parts.includes(kw)) {
        input.value = input.value.trim() ? `${input.value.trim()} ${kw}` : kw;
      }
      chip.classList.add("is-active");
      run();
    });
  });

  const params = new URLSearchParams(location.search);
  const q = params.get("q") || params.get("keywords");
  if (q && input) {
    input.value = decodeURIComponent(q);
    run();
  } else {
    generatePreview("");
  }
}

document.addEventListener("DOMContentLoaded", init);

export { parseKeywords, generatePreview };
