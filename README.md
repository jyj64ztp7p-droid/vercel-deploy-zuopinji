# PORTFOLIO — 静态作品集站点

依据 [Figma 设计稿](https://www.figma.com/design/J4xqvKDdovjbg0C3mUETBg/Untitled) 实现的纯 HTML / CSS / JavaScript 多页面作品集，可直接部署到 GitHub Pages。

## 页面结构

| 文件 | 对应设计稿 |
|------|------------|
| `index.html` | 1.1 首页 |
| `project-detail-1.html` | 1.2 官网和大屏02 |
| `project-detail-2.html` | 1.3 小程序 |
| `project-detail-3.html` | 1.4 官网 |
| `project-detail-4.html` | 1.5 web3 |
| `project-detail-5.html` | 1.6 潮玩 |
| `about.html` | 1.7 about |
| `works-index.html` | 1.8 Index |
| `404.html` | 自定义 404 |

## 本地预览

```bash
cd e:\cursor_work\portfolio
npx --yes serve .
```

浏览器打开终端显示的地址（ES Module 需 HTTP 服务）。

## 资源说明

- 图片：`assets/images/`（由 `scripts/download-*.ps1` 从 Figma 导出）
- GIF：`assets/gifs/`（详情页动效）
- 背景音乐：将 `bgm.mp3` 放入 `assets/audio/`（不自动播放，需用户点击播放器）

重新下载 Figma 资源：

```powershell
powershell -ExecutionPolicy Bypass -File scripts/download-home-assets.ps1
powershell -ExecutionPolicy Bypass -File scripts/download-detail1-assets.ps1
powershell -ExecutionPolicy Bypass -File scripts/download-about-index-assets.ps1
```

## GitHub Pages 部署步骤

### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击 **New repository**
3. 仓库名例如 `portfolio`（项目站）或 `你的用户名.github.io`（用户站）
4. 选择 Public，创建仓库（可不勾选 README）

### 2. 推送代码

在 PowerShell 中（将 `YOUR_USERNAME` 和仓库名替换为你的）：

```powershell
cd e:\cursor_work\portfolio
git init
git add .
git commit -m "Initial portfolio site from Figma"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

### 3. 开启 GitHub Pages

1. 打开仓库 → **Settings** → **Pages**
2. **Build and deployment** → **Source**：Deploy from a branch
3. **Branch**：`main`，文件夹 **`/ (root)`**
4. 保存后等待 1–3 分钟，页面会显示访问地址

### 4. 访问地址

- **用户/组织站**（仓库名 `用户名.github.io`）：  
  `https://YOUR_USERNAME.github.io/`
- **项目站**（仓库名如 `portfolio`）：  
  `https://YOUR_USERNAME.github.io/portfolio/`

### 5. 发布前检查

1. 编辑 `sitemap.xml`、`robots.txt`，将 `YOUR_USERNAME` 和 `portfolio` 改为你的用户名与仓库名
2. 确认 `assets/audio/bgm.mp3` 已放入真实音频
3. 根目录已包含 `.nojekyll`（避免 Jekyll 忽略路径）

## 技术要点

- GSAP（首页入场动画，CDN）
- 首页：无缝横向轮播、标题粒子、导航闪烁、音乐播放器
- 详情页：左侧 40% sticky + Close 返回
- 索引页：前三组横向滑动 + 第四组静态网格；移动端 Lightbox
- 响应式断点：320–767 / 768–1024 / 1025+
- `prefers-reduced-motion` 下禁用动画

## 字体

Google Fonts：Playfair Display、Asul、DM Serif Display、Chakra Petch、Noto Sans SC（中文替代 Alibaba PuHuiTi）。
