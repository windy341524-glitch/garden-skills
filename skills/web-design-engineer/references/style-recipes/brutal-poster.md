# brutal-poster — 暗黑压迫海报

- **School**: Emotional Poster / Viral Content
- **Vibe**: 暗黑、压迫、攻击性、高冲突，像电影预告片的情绪海报
- **Best for**: 观点输出、争议话题、短视频口播素材、社媒刷屏内容
- **Touchstone**: 电影《小丑》海报排版、Supreme Box Logo 的压迫感、Bloomberg Businessweek 暴力排版的移动端进化版
- **Default scales**: Emotion 5 / Conflict 4 / Visual 5

**Palette**
- Ground: `#050505` (near-black, 不是纯黑)
- Ink: `#f4f4f0` (warm white)
- Danger: `#ff2a2a` (high-alert red)
- Acid: `#c8ff00` (acid green, 用于关键词高亮)
- Muted: `#777777` (辅助灰)
- Maximum 4 colors per scene — 超出就删

**Typography**
- Display: "PingFang SC" / "Microsoft YaHei" / Inter — Weight 900–1000
- 字号使用 clamp()，hero 标题 48px–92px，正文 18–20px
- 行高 hero: 0.86 (极紧), body: 1.45
- Letter-spacing: hero -0.08em (紧缩), kicker +0.24em (展开)
- 所有 kicker 文字全大写 + letter-spacing

**Spacing**
- Scene padding: 48px 24px (移动端)
- Scene 之间用 1px rgba(255,255,255,.12) border 分割
- 每个 scene = min-height: 100vh，flex column，justify-content: center
- 留白是武器：大标题和正文之间至少 18px

**Radius**: 0 (海报感不需要圆角)

**Shadow**: 仅用于 glow 效果 — `text-shadow: 0 0 30px rgba(200,255,0,.35)` 用于 acid 色关键词

**Motion**
- 无 JS 动画 — 纯 CSS
- 允许：`@keyframes` 用于微光、呼吸、脉冲效果
- 禁止：滑入、淡入、弹跳 — 海报是静态冲击，不是动画

**Signature moves**
- 超大标题 `.headline` 用 clamp(48px, 16vw, 92px)，行高 0.86，letter-spacing -0.08em
- 关键词用 `.hit` class 高亮为 acid 色 + glow text-shadow
- `.kicker` 标签：13px，全大写，letter-spacing .24em，danger 色，font-weight 900
- `.badge` 组件：inline-flex，1px 白色半透明边框，pill 圆角，acid 色，transform rotate(-3deg)
- 每屏使用 `radial-gradient` 做背景光晕：左上角 danger 色 28% opacity，右下角 acid 色 12% opacity
- `.noise` 伪元素覆盖层：grid 线条纹理，18px 间距，mask-image radial-gradient 淡出，opacity .18
- 移动端优先：390px–430px 视口，禁止横向滚动

**背景光晕模板**
```css
background:
  radial-gradient(circle at 20% 0%, rgba(255,42,42,.28), transparent 35%),
  radial-gradient(circle at 100% 80%, rgba(200,255,0,.12), transparent 40%),
  #050505;
```

**Avoid**
- 温和卡片 (rounded card + soft shadow)
- 默认 Tailwind 布局
- 蓝白 SaaS 风
- 普通博客排版
- 信息图模板感
- 像 PPT / 简历 / 公众号文章
- emoji 作为图标替代
- 超过 4 种颜色
- 外部图片依赖 (用 CSS 渐变、伪元素、边框代替)

**AI prompt seed**
> 情绪海报，暗黑背景 #050505，超大中文字体 clamp(48px,16vw,92px)，行高 0.86，一个 acid 绿 #c8ff00 关键词带 glow，左上角红色光晕，网格噪点覆盖层，390px 移动端竖屏。

**Don't use when**
- 内容是产品介绍 / 功能说明 / 文档 — 海报感会让信息变模糊
- 品牌要求温和、可信赖的形象 — 这个配方是攻击性的
- 需要多步骤交互 / 表单 / 导航 — 海报是单向输出
- 用户要求"干净简洁" — 这个配方的"简洁"是压迫性留白，不是温柔留白

---

> **Same school — Emotional Poster**: [`neon-poster`](./neon-poster.md) · [`editorial-poster`](./editorial-poster.md) · [`chaos-poster`](./chaos-poster.md)
> **Browse all 29 recipes**: [INDEX.md](./INDEX.md)
