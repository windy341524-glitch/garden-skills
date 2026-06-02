---
name: emotional-video-presentation
description: "把文章变成强情绪口播视频素材。7 阶段 pipeline：文章 → 内容导演提炼冲突 → 强情绪口播稿 → Voicebox MCP 配音分段 → 视觉分镜 → 高审美 HTML → 审美批评 → MCP 调用计划。产出物 = 移动端 HTML 页面 + 结构化配音计划，可截图、录屏、转视频。"
---

# Emotional Video Presentation

把一篇文章变成一组有攻击性的视觉镜头 + 结构化配音计划。

**产出物**：移动端 HTML 页面（390px–430px）+ Voicebox MCP 调用计划 JSON。
**不是**：交互式网页、PPT、博客、SaaS 官网。

---

## 适用场景

- "把这篇文章做成口播视频素材"
- "帮我做一个有冲突感的短视频页面"
- "文章 → 情绪海报 → 配音计划"
- 需要 Voicebox MCP 结构化配音
- 需要高审美、强冲突、可录屏的视觉素材

**不适用**：产品页面、仪表盘、交互原型、数据可视化、后端逻辑。

---

## 默认参数

```json
{
  "emotionScale": 5,
  "conflictScale": 4,
  "visualScale": 5,
  "narrativeMode": "brutal"
}
```

用户可自定义。详见 `references/SCALES-CONFIG.md`。

---

## Pipeline

```
输入: article + scales
  │
  ├─→ Stage 1: Content Director      → insight.json
  │     从文章提炼冲突结构（核心观点、隐藏冲突、反常识点、钩子）
  │
  ├─→ Stage 2: Emotional Scriptwriter → script.json
  │     改写成强情绪口播稿（beats、intensity 递进）
  │
  ├─→ Stage 3: Voicebox Director      → voiceboxSegments.json
  │     拆成 Voicebox MCP 友好片段（sceneId、emotion、pace、energy、pause）
  │
  ├─→ Stage 4: Visual Director        → visualStoryboard.json
  │     转成视觉分镜（headline、visualMood、composition、colorMood）
  │
  ├─→ Stage 5: HTML Art Director      → output.html
  │     生成完整 HTML（data-scene-id 对齐、min-height:100vh）
  │
  ├─→ Stage 6: Aesthetic Critic       → critic.json
  │     6 维审美审查（score < 8 → 回 Stage 5 修复，最多 3 次）
  │
  └─→ Stage 7: MCP Call Planner       → mcpPlan.json
        生成 Voicebox MCP 调用计划（每个 segment 一次 voicebox.speak）
```

---

## Stage 1: Content Director

读取 `references/CONTENT-DIRECTOR.md`。

**做什么**：从文章中找到最有传播力的冲突结构。
**不做什么**：总结文章、提取信息、写摘要。

**输入**：用户的文章
**输出**：
```json
{
  "coreInsight": "核心观点",
  "hiddenConflict": "隐藏冲突",
  "contrarianPoint": "反常识点",
  "audienceMisconception": "观众误区",
  "truth": "真相/反转",
  "emotionAxis": "情绪主轴",
  "hook": "开场钩子",
  "memoryHook": "结尾记忆点",
  "recommendedNarrativeMode": "brutal",
  "recommendedEmotionScale": 5,
  "recommendedConflictScale": 4,
  "recommendedVisualScale": 5
}
```

---

## Stage 2: Emotional Scriptwriter

读取 `references/EMOTIONAL-SCRIPTWRITER.md`。

**做什么**：把 Stage 1 的分析改写成适合朗读的口播稿。
**不做什么**：文章改写、公众号文案、科普讲解。

**输入**：Stage 1 JSON + scales
**输出**：
```json
{
  "title": "视频标题",
  "hook": "开场第一句",
  "fullScript": "完整口播稿",
  "beats": [
    {
      "beatId": "beat-01",
      "text": "文字",
      "emotion": "tense",
      "intensity": 4,
      "purpose": "hook"
    }
  ]
}
```

**关键规则**：
- 每句 ≤ 15 字（emotionScale 4-5 时 ≤ 10 字）
- beats 的 intensity 必须有起伏，不是平线
- 每 3-5 句至少一个反问
- 开场必须是钩子，不是"大家好"

---

## Stage 3: Voicebox Director

读取 `references/VOICEBOX-DIRECTOR.md`。

**做什么**：把每个 beat 拆成 Voicebox MCP 友好的结构化片段。
**不做什么**：直接调用 MCP。

**输入**：Stage 2 JSON + emotionScale
**输出**：
```json
{
  "provider": "voicebox-mcp",
  "totalSegments": 8,
  "segments": [
    {
      "sceneId": "scene-01",
      "beatId": "beat-01",
      "text": "文字",
      "emotion": "tense",
      "pace": "slow",
      "energy": 4,
      "pauseBeforeMs": 0,
      "pauseAfterMs": 800,
      "emphasis": ["关键词"],
      "deliveryDirection": "念法指导",
      "profile": null,
      "personality": true
    }
  ],
  "fallback": { "saveJson": true, "reason": "MCP unavailable" }
}
```

**关键规则**：
- 一个 beat = 一个 segment，不合并
- sceneId 格式 `scene-01` ... `scene-99`
- sceneId 在后续所有 stage 中保持一致

---

## Stage 4: Visual Director

读取 `references/VISUAL-DIRECTOR.md`。

**做什么**：为每个 segment 设计一个"视觉镜头"。
**不做什么**：网页 section、卡片、博客布局。

**输入**：Stage 3 JSON + visualScale + narrativeMode
**输出**：
```json
{
  "totalScenes": 8,
  "scenes": [
    {
      "sceneId": "scene-01",
      "headline": "大标题",
      "subline": "副标题",
      "visualMood": "aggressive",
      "composition": "构图描述",
      "colorMood": "红+黑",
      "motionHint": "动效",
      "typographyHint": "字号/粗细",
      "symbol": "视觉符号"
    }
  ]
}
```

**关键规则**：
- sceneId 与 Stage 3 的 voiceboxSegments 1:1 对齐
- 每一屏有视觉焦点、情绪、构图
- 5 种构图模板：brutal / cinematic / editorial / chaos / neon

---

## Stage 5: HTML Art Director

读取 `references/HTML-ART-DIRECTOR.md`。

**做什么**：把 visualScenes 变成完整 HTML 文件。
**不做什么**：React 项目、外部 CSS、JavaScript。

**输入**：Stage 4 JSON + Stage 3 JSON + narrativeMode + visualScale
**输出**：完整 HTML 文件，只输出 HTML。

**硬性规则**：
- CSS 写在 `<style>` 中
- 不依赖外部图片
- 移动端优先 390px–430px
- 每个 section 带 `data-scene-id`
- 每个 scene `min-height: 100vh`

---

## Stage 6: Aesthetic Critic

读取 `references/AESTHETIC-CRITIC.md`。

**做什么**：用 6 维审美标准审查 HTML。
**判定**：
- score ≥ 8 → pass，进入 Stage 7
- score < 8 → fail，带 repairInstructions 回 Stage 5 修复
- 最多修复 3 次，仍然 fail → full-regenerate

**自动判定失败**：像普通网页 / 博客 / PPT / SaaS / 默认模板 / 最大字号 < 48px / 无情绪 / 无冲突感 / sceneId 不匹配。

---

## Stage 7: MCP Call Planner

读取 `references/MCP-CALL-PLANNER.md`。

**做什么**：把 voiceboxSegments 转成 Voicebox MCP 调用计划。
**不做什么**：直接调用 MCP。

**输出**：每个 segment 对应一次 `voicebox.speak()` 调用参数。MCP 不可用时保存 `voicebox-segments.json` 作为 fallback。

---

## Scene 对齐检查

输出前必须验证：

```
voiceboxSegments.length == visualStoryboard.length == HTML sections[data-scene-id]

for each i:
  voiceboxSegments[i].sceneId == visualScenes[i].sceneId == HTML data-scene-id
```

不对齐 → 修复后再输出。

---

## 与已有 Skill 的关系

| Skill | 用途 | 审美 | 输出 |
|---|---|---|---|
| `web-video-presentation` | 交互式 Vite+React+TS 演示 | 23 个主题，用户选择 | Vite 项目 + 音频 |
| `web-design-engineer` | 通用网页设计 | 29 个风格配方 | HTML / React |
| **`emotional-video-presentation`** | **强情绪短视频素材** | **冲突优先、暗黑压迫、5 种 poster 模式** | **HTML + MCP 调用计划** |

- 不删除 `web-video-presentation`，不删除 `web-design-engineer`
- 吸收 `web-design-engineer` 的审美判断（style-recipes、emotional-poster-guide）
- 吸收 `web-video-presentation` 的口播思路（SCRIPT-STYLE、step-by-step）
- 默认审美更强、更有冲突

---

## References Routing

| Stage | Read |
|---|---|
| Scale 配置 | `references/SCALES-CONFIG.md` |
| Stage 1 | `references/CONTENT-DIRECTOR.md` |
| Stage 2 | `references/EMOTIONAL-SCRIPTWRITER.md` |
| Stage 3 | `references/VOICEBOX-DIRECTOR.md` |
| Stage 4 | `references/VISUAL-DIRECTOR.md` |
| Stage 5 | `references/HTML-ART-DIRECTOR.md` |
| Stage 6 | `references/AESTHETIC-CRITIC.md` |
| Stage 7 | `references/MCP-CALL-PLANNER.md` |
| 视觉配方 | `../web-design-engineer/references/style-recipes/brutal-poster.md` 等 |
| 口播风格参考 | `../web-video-presentation/references/SCRIPT-STYLE.md` |
