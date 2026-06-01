# chaos-poster — 撕裂拼贴海报

- **School**: Emotional Poster / Viral Content
- **Vibe**: 撕裂、拼贴、混乱、情绪爆炸、社媒传播感，像 Instagram Story 和抖音封面的暴力美学
- **Best for**: 情绪输出、吐槽、反转观点、争议性话题、需要"刷屏感"的内容
- **Touchstone**: Virgil Abloh 的剪切粘贴美学、David Carson 的 Ray Gun 杂志排版、Instagram Story 手写字涂鸦 + TikTok 封面设计
- **Default scales**: Emotion 5 / Conflict 5 / Visual 5

**Palette**
- Ground: `#ffffff` (纯白) 或 `#000000` (纯黑) — 不用灰，不柔和
- Accent 1: `#ff0000` (纯红)
- Accent 2: `#ffff00` (纯黄)
- Accent 3: `#0000ff` (纯蓝)
- Ink: 与 ground 对比
- 限制：每次最多 2 accent 色 + ground + ink

**Typography**
- Display: "PingFang SC" / "Microsoft YaHei" — Weight 900
- 允许混合字号：同一行中 14px 和 80px 并存
- 允许 `transform: rotate(-2deg ~ 5deg)` 倾斜文字
- 允许全大写和全小写混用
- 允许用 `background: accent` + `color: ground` 做文字反色条
- body: 16px, weight 400, 正常行高

**Spacing**
- 无固定间距系统 — 可以紧贴、重叠、溢出
- Scene padding: 20px–80px 随机变化
- 元素之间可以用负 margin 制造重叠
- 允许 `position: absolute` + `transform: rotate()` 随机放置元素

**Radius**: 0 或 混合 (同一个页面中可以有圆角和直角混用)

**Shadow**: 允许硬阴影 — `4px 4px 0 #000` 风格，不是柔和投影

**Motion**
- 允许 CSS `@keyframes`：
  - `shake`: 微抖动 2px
  - `glitch`: clip-path 随机裁切闪烁
  - `stamp`: 从大到小弹入 (scale 1.2 → 1)
- 禁止：平滑过渡、优雅缓动 — 这个配方是粗糙的

**Signature moves**
- 关键词用纯色背景条反色：`<span style="background:#ff0000;color:#fff;padding:2px 8px">关键词</span>`
- 文字倾斜：关键句 `transform: rotate(-2deg)` 或 `rotate(3deg)`
- 手写感标注：用 `<span>` + 底部 border + accent 色模拟手划线
- 分隔：不是直线 — 用 `clip-path: polygon(...)` 做撕裂边缘
- 数字巨大化：章节编号 200px+ 用 accent 色 + 部分溢出屏幕
- 贴纸感 badge：白底 + 硬阴影 + 小旋转 + 粗边框
- 背景可以用 2 个色块碰撞 (diagonal split)：`linear-gradient(135deg, #000 50%, #ff0000 50%)`
- 允许元素"溢出"scene 边界 — `overflow: visible`

**文字反色条模板**
```css
.hit {
  background: #ff0000;
  color: #ffffff;
  padding: 2px 10px;
  display: inline;
  box-decoration-break: clone;
  -webkit-box-decoration-break: clone;
}
```

**撕裂边缘模板**
```css
.tear-edge {
  clip-path: polygon(0 0, 100% 2%, 99% 98%, 1% 100%);
}
```

**Avoid**
- 优雅感 / 高级感 (这是反高级的)
- 统一的间距系统 (混乱是有意的)
- 柔和渐变
- 大量留白 (除非留白本身是冲突的一部分)
- 超过 2 种 accent 色
- 外部图片
- 看起来像"设计过的" — 要看起来像"故意没设计"

**AI prompt seed**
> 撕裂拼贴海报，纯白底 #ffffff，纯红 #ff0000 反色文字条，文字倾斜旋转，硬阴影，撕裂边缘，混乱排版，390px 移动端竖屏。

**Don't use when**
- 内容需要可信度 / 专业感 — chaos 风会降低可信度
- 品牌要求精致 — 这个配方是粗糙的
- 用户要"高级感" — 用 editorial-poster
- 信息密度高 — 混乱排版会让密集信息不可读

---

> **Same school — Emotional Poster**: [`brutal-poster`](./brutal-poster.md) · [`neon-poster`](./neon-poster.md) · [`editorial-poster`](./editorial-poster.md)
> **Browse all 29 recipes**: [INDEX.md](./INDEX.md)
