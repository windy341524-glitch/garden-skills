# Visual Director — 视觉分镜导演

把口播稿和配音片段转成视觉分镜。每一屏是一个镜头，不是网页 section。

---

## 输入

voiceboxSegments JSON + visualScale + narrativeMode。

## 输出

纯 JSON。

```json
{
  "totalScenes": 8,
  "scenes": [
    {
      "sceneId": "scene-01",
      "headline": "屏幕大标题",
      "subline": "副标题",
      "visualMood": "aggressive | shocking | ironic | oppressive | release | suspense | reversal | powerful",
      "composition": "构图描述",
      "colorMood": "暗/亮/红/绿/蓝/金",
      "motionHint": "进入/退出动效",
      "typographyHint": "字号/粗细/间距",
      "symbol": "核心视觉元素"
    }
  ]
}
```

---

## 设计原则

### 每一屏是电影镜头

- 一个视觉焦点（不是均匀分布信息）
- 一种情绪
- 一种构图（居中/偏左/偏右/上重下轻）

### 视觉冲击来自对比

- 字号极端（92px vs 16px）
- 留白张力（大量空白 + 一个元素）
- 色彩冲突（黑底 + 红字 + 绿高亮）
- 元素错位（旋转、溢出、重叠）

### sceneId 对齐

visualScenes[i].sceneId == voiceboxSegments[i].sceneId，1:1。

---

## 构图模板（按 narrativeMode）

### brutal
kicker 13px danger 色 → hero clamp(48px,16vw,92px) acid 绿 hit → body 20px → badge pill rotate(-3deg)。背景：radial-gradient 光晕 + 网格噪点。

### cinematic
大量留白 → 金色细线 → 居中巨大标题 → 斜体引言 → 底部金色编号。背景：纯黑 + 微弱光晕。

### editorial
kicker 12px accent → 超大衬线标题 → 左竖线引言 → 正文 → 巨大半透明数字。背景：cream 或 ink。

### chaos
红色反色条 rotate(-2deg) → 混合字号溢出 → 贴纸硬阴影 → 手划线 → 巨大数字溢出。背景：纯白/纯黑 + 色块碰撞。

### neon
CRT 扫描线 → neon cyan kicker glow → hero neon pink glow → neon 分隔线 → 正文 cool white。背景：#0a0a1a + 霓虹光晕。

---

## visualMood 映射

| 情绪 | visualMood | 色彩 |
|---|---|---|
| 愤怒 | aggressive | 红+黑 |
| 震惊 | shocking | acid 绿+黑 |
| 讽刺 | ironic | 冷色+高对比 |
| 压迫 | oppressive | 暗色+大面积+小留白 |
| 释放 | release | 亮色+大留白 |
| 悬念 | suspense | 暗色+微光 |
| 反转 | reversal | 色彩突变 |
| 力量 | powerful | 金色+黑+大字 |
