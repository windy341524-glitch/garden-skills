# neon-poster — 赛博霓虹海报

- **School**: Emotional Poster / Viral Content
- **Vibe**: 赛博朋克、霓虹灯光、未来感、科技焦虑
- **Best for**: AI/科技话题、未来预测、技术颠覆类内容、赛博美学短视频
- **Touchstone**: 《银翼杀手 2049》色调、Blade Runner 霓虹广告牌、Cyberpunk 2077 UI
- **Default scales**: Emotion 4 / Conflict 3 / Visual 5

**Palette**
- Ground: `#0a0a1a` (deep space blue-black)
- Ink: `#e0e0ff` (cool white with blue cast)
- Neon pink: `#ff00ff` / `#ff2d95`
- Neon cyan: `#00fff5`
- Neon purple: `#b44dff`
- Maximum 3 neon colors per scene + ground + ink

**Typography**
- Display: "PingFang SC" / "Microsoft YaHei" / Inter — Weight 800–900
- hero 标题 clamp(42px, 14vw, 80px)
- 字间距 hero: -0.04em, kicker: +0.3em
- kicker 全大写，用 neon cyan

**Spacing**
- Scene padding: 40px 20px
- Scene 之间用 1px neon 色 20% opacity border 分割
- 每个 scene = min-height: 100vh

**Radius**: 0–2px (极微圆角，模拟屏幕边缘)

**Shadow**: 核心元素 — 所有 neon 色都带 glow
```
text-shadow:
  0 0 10px rgba(0,255,245,.8),
  0 0 40px rgba(0,255,245,.4),
  0 0 80px rgba(0,255,245,.2);
```

**Motion**
- 允许 CSS `@keyframes`：
  - `neon-flicker`: opacity 在 0.8–1.0 之间闪烁，模拟霓虹灯管
  - `scan-line`: 一条半透明线从上到下循环移动，模拟 CRT 扫描线
  - `glow-pulse`: text-shadow blur 半径呼吸变化
- 禁止：位移动画、淡入、弹跳

**Signature moves**
- 背景用多层叠加：深色底 + 水平扫描线纹理 + radial-gradient 霓虹光晕
- 扫描线纹理：`linear-gradient(transparent 50%, rgba(0,0,0,.15) 50%)` background-size 100% 4px
- 关键词用 neon 色 + glow text-shadow，像发光二极管
- `.kicker` 用 neon cyan + 全大写 + .3em letter-spacing
- 分隔线用 neon 色 1px + blur glow：`box-shadow: 0 0 8px rgba(0,255,245,.6)`
- badge 用 neon 边框 + 透明底 + glow
- 数字 / 数据用等宽字体 + neon 色 + 超大字号
- 允许使用 CSS `clip-path` 做几何裁切效果

**Avoid**
- 温暖色调 (橙、黄、棕)
- 自然感 / 有机感
- 柔和渐变 (muted gradient)
- 大量留白 (用光晕填充空间)
- 超过 3 种 neon 色
- 外部图片
- 任何看起来像"正常网页"的东西

**AI prompt seed**
> 赛博朋克海报，深蓝黑背景 #0a0a1a，霓虹 cyan 和 pink 发光文字，CRT 扫描线纹理，几何裁切，390px 移动端竖屏。

**Don't use when**
- 内容偏人文 / 社会 / 生活 — 赛博感会割裂
- 品牌要求温暖、亲近 — 这个配方是冷感的
- 用户反感"花哨"效果 — neon 本身就花哨

---

> **Same school — Emotional Poster**: [`brutal-poster`](./brutal-poster.md) · [`editorial-poster`](./editorial-poster.md) · [`chaos-poster`](./chaos-poster.md)
> **Browse all 29 recipes**: [INDEX.md](./INDEX.md)
