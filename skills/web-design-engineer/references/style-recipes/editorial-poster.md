# editorial-poster — 杂志情绪海报

- **School**: Emotional Poster / Viral Content
- **Vibe**: 杂志封面级排版、高级感、思辨性、冷静中带锋利
- **Best for**: 深度观点、行业分析、文化评论、需要"高级感"的口播素材
- **Touchstone**: The New York Times Magazine 封面、Zeit Magazine 排版、Monocle 特刊 + Bloomberg Businessweek 的暴力感被驯化后的版本
- **Default scales**: Emotion 3 / Conflict 4 / Visual 4

**Palette**
- Ground: `#f5f0eb` (warm cream) 或 `#111111` (deep ink)
- Ink (light mode): `#111111`
- Ink (dark mode): `#f5f0eb`
- Accent: `#c41e3a` (深红，像杂志刊头) 或 `#1a1a2e` (深蓝墨)
- Muted: `#888888`
- 最多 3 色 + ground

**Typography**
- Display: 衬线体优先 — "Noto Serif SC" / "Source Han Serif SC" / Georgia
- Body: 无衬线 — "PingFang SC" / "Microsoft YaHei"
- hero 标题 clamp(56px, 15vw, 100px)，font-weight 700
- 引用文字：italic + 左边 3px accent 色竖线
- kicker: 12px，全大写，letter-spacing .2em，accent 色

**Spacing**
- Scene padding: 60px 28px (比 brutal 更宽松)
- 大量留白，但留白是有结构的 — 不是空，是呼吸
- Scene 之间无 border，用留白 + 排版节奏切换

**Radius**: 0

**Shadow**: 无 — 杂志纸面不需要阴影

**Motion**: 无 — 杂志是静态的

**Signature moves**
- 超大衬线标题 + 极小的无衬线正文，对比 ≥ 4:1
- 引用块：左边 3px accent 竖线 + 斜体 + 大号 (20–24px)
- `.pull-quote`：超大字号 (32–40px) 斜体，前后加引号装饰线
- 数字用超大字号 + accent 色 + 衬线体，像杂志的页码设计
- 分隔：用一条 1px accent 色线 + 上下大留白
- 章节编号：巨大的半透明数字 (200px+) 作为背景装饰
- 段落间距 ≥ 24px，段首不缩进，段间有结构感
- 支持 light/dark 双模式：warm cream 底或 deep ink 底

**避免**
- 无衬线标题 (丧失杂志感)
- 阴影和渐变 (纸面不需要)
- 色块大面积铺色 (杂志用留白不用色块)
- 圆角 (杂志版面是直角的)
- emoji
- 超过 3 种颜色
- 普通网页布局 (要像翻开一本杂志)

**AI prompt seed**
> 杂志封面排版，warm cream 底 #f5f0eb，超大衬线标题 100px，深红 accent #c41e3a kicker，极小正文，大量结构化留白，390px 移动端竖屏。

**Don't use when**
- 内容需要强冲突 / 爆发感 — 用 brutal-poster 更好
- 用户要"酷炫"效果 — 这个配方是冷静的
- 内容是纯娱乐 / 搞笑 — 杂志感太严肃

---

> **Same school — Emotional Poster**: [`brutal-poster`](./brutal-poster.md) · [`neon-poster`](./neon-poster.md) · [`chaos-poster`](./chaos-poster.md)
> **Browse all 29 recipes**: [INDEX.md](./INDEX.md)
