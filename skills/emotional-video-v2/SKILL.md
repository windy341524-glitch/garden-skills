---
name: emotional-video-v2
description: "Transform articles into emotionally charged visual video materials through a 7-stage pipeline: content analysis → emotional voiceover script → Voicebox MCP voice plan → visual storyboard → high-aesthetic HTML → aesthetic critique → MCP call plan. Produces mobile-first HTML pages with synchronized scene architecture for screen recording."
---

# Emotional Video v2

**文章 → 情绪口播 → Voicebox MCP 配音计划 → 视觉分镜 → 高审美 HTML → 可录屏视频素材**

这个 skill 把一篇文章变成一组有攻击性的视觉镜头，配上结构化的配音计划。

---

## Scope

✅ **Applicable**: 文章/观点/分析 → 短视频视觉素材、口播稿 + HTML、社媒传播内容
❌ **Not applicable**: 产品页面、仪表盘、原型、数据可视化、后端逻辑

---

## When to Use

- 用户提供一篇文章，想要"情绪海报"、"口播稿"、"短视频素材"
- 用户提到"冲突感"、"视觉冲击"、"刷屏感"
- 用户想要文章 → HTML 的完整链路
- 用户想要接入 Voicebox MCP 做配音

---

## Pipeline Overview

```
输入: article (文章) + scales (可选)
  │
  ├─→ Stage 1: Content Director    → insight.json
  ├─→ Stage 2: Emotional Script    → script.json
  ├─→ Stage 3: Voicebox Director   → voiceboxSegments.json
  ├─→ Stage 4: Visual Director     → visualStoryboard.json
  ├─→ Stage 5: HTML Art Director   → output.html
  ├─→ Stage 6: Aesthetic Critic    → critic.json (pass/fail)
  │     └─ 如果 fail → 回到 Stage 5 修复
  └─→ Stage 7: MCP Call Planner    → mcpPlan.json
```

---

## Step 0: 确定 Scale 配置

读取 `references/SCALES-CONFIG.md` 获取默认值和 forbidden styles。

用户可以自定义：
```json
{
  "emotionScale": 5,
  "conflictScale": 4,
  "visualScale": 5,
  "narrativeMode": "brutal"
}
```

如果用户没有指定，使用默认值。
如果用户只说了"帮我做一个口播视频"，根据文章内容自动推荐 narrativeMode 和 scales。

---

## Stage 1: Content Director（内容导演）

读取 `references/CONTENT-DIRECTOR.md`。

**输入**: 用户的文章
**输出**: 结构化 JSON — 核心观点、隐藏冲突、反常识点、观众误区、真相/反转、情绪主轴、开场钩子、结尾记忆点、推荐 narrativeMode 和 scales

**要求**:
- 不要总结文章
- 不要温和解释
- 要找冲突、立场、反差、压迫感
- 输出纯 JSON，不要 markdown

---

## Stage 2: Emotional Scriptwriter（强情绪口播稿）

读取 `references/EMOTIONAL-SCRIPTWRITER.md`。

**输入**: Stage 1 的 JSON + emotionScale + conflictScale + narrativeMode
**输出**: 结构化 JSON — title、hook、fullScript、beats[]

**要求**:
- 不要写成普通文章总结
- 每句话适合口播，句子短、有停顿感
- beats 的 intensity 必须有起伏（不是一条平线）
- 输出纯 JSON

---

## Stage 3: Voicebox Director（配音分段导演）

读取 `references/VOICEBOX-DIRECTOR.md`。

**输入**: Stage 2 的 JSON + emotionScale
**输出**: 结构化 JSON — voiceboxSegments[]，每个包含 sceneId、text、emotion、pace、energy、pause、emphasis、deliveryDirection

**关键规则**:
- 一个 beat = 一个 segment
- sceneId 格式: scene-01, scene-02, ...
- sceneId 在后续所有 stage 中必须保持一致
- 不要直接调用 MCP，只生成调用计划

---

## Stage 4: Visual Director（视觉分镜导演）

读取 `references/VISUAL-DIRECTOR.md`。

**输入**: Stage 3 的 JSON + visualScale + narrativeMode
**输出**: 结构化 JSON — visualScenes[]，每个包含 sceneId、headline、subline、visualMood、composition、colorMood、motionHint、typographyHint、symbol

**关键规则**:
- 每个 voiceboxSegment 对应一个 visualScene
- sceneId 必须与 Stage 3 一致
- 每一屏都是一个视觉镜头，不是网页 section

---

## Stage 5: HTML Art Director（HTML 艺术导演）

读取 `references/HTML-ART-DIRECTOR.md`。

**输入**: Stage 4 的 JSON + Stage 3 的 JSON + narrativeMode + visualScale
**输出**: 完整 HTML 文件

**关键规则**:
- CSS 写在 `<style>` 标签中
- 不依赖外部图片
- 移动端优先 390px–430px
- 每个 section 带 `data-scene-id`，与 voiceboxSegments 对齐
- 每个 scene `min-height: 100vh`
- 不输出解释，只输出 HTML

---

## Stage 6: Aesthetic Critic（审美批评官）

读取 `references/AESTHETIC-CRITIC.md`。

**输入**: Stage 5 的 HTML + Stage 3 的 JSON + visualScale + narrativeMode
**输出**: 结构化 JSON — pass/fail、score (1-10)、problems[]、repairInstructions[]、requiredRewriteLevel

**判定逻辑**:
- score ≥ 8 → pass，继续 Stage 7
- score < 8 → fail，带着 repairInstructions 回到 Stage 5 修复
- 修复最多 3 次。如果 3 次后仍然 score < 8 → full-regenerate，从 Stage 5 重新生成

---

## Stage 7: MCP Call Planner（Voicebox MCP 调用计划）

读取 `references/MCP-CALL-PLANNER.md`。

**输入**: Stage 3 的 voiceboxSegments JSON
**输出**: 结构化 JSON — MCP 调用计划，包含每个 segment 的 voicebox.speak() 参数

**关键规则**:
- 不直接调用 MCP，只生成计划
- 如果 MCP 不可用，保留 fallback JSON
- 每个 segment 一次调用，不合并

---

## 最终输出

pipeline 完成后，输出以下所有内容：

```json
{
  "title": "视频标题",
  "hook": "开场钩子",
  "scales": {
    "emotionScale": 5,
    "conflictScale": 4,
    "visualScale": 5,
    "narrativeMode": "brutal"
  },
  "insight": { /* Stage 1 输出 */ },
  "script": { /* Stage 2 输出 */ },
  "voiceboxSegments": [ /* Stage 3 输出 */ ],
  "visualStoryboard": [ /* Stage 4 输出 */ ],
  "html": "<!DOCTYPE html>...", /* Stage 5 输出 */
  "critic": { /* Stage 6 输出 */ },
  "mcpPlan": { /* Stage 7 输出 */ }
}
```

---

## Scene 对齐检查

在输出最终结果前，做一次对齐检查：

```
voiceboxSegments.length == visualStoryboard.length == HTML sections with data-scene-id

for each i:
  voiceboxSegments[i].sceneId == visualStoryboard[i].sceneId == HTML section[i].data-scene-id
```

如果不对齐 → 修复后再输出。

---

## 与旧 pipeline 的关系

这个 skill 是 v2，推荐作为默认入口。

旧 pipeline（`web-video-presentation`）仍然可用：
- 旧 pipeline 适合需要 Vite+React+TS 交互式演示的场景
- v2 适合需要快速生成"可截图/可录屏"视觉素材的场景
- 旧 pipeline 的 TTS 用 shell 脚本（minimax/openai）
- v2 的 TTS 用 Voicebox MCP（带 fallback）

如果用户想要旧 pipeline 的完整交互式演示 → 用 `web-video-presentation`。
如果用户想要快速的情绪海报/口播视频素材 → 用这个 `emotional-video-v2`。

---

## References Routing

| Stage | Read |
|---|---|
| Scale 配置 | `references/SCALES-CONFIG.md` |
| Stage 1: Content Director | `references/CONTENT-DIRECTOR.md` |
| Stage 2: Emotional Scriptwriter | `references/EMOTIONAL-SCRIPTWRITER.md` |
| Stage 3: Voicebox Director | `references/VOICEBOX-DIRECTOR.md` |
| Stage 4: Visual Director | `references/VISUAL-DIRECTOR.md` |
| Stage 5: HTML Art Director | `references/HTML-ART-DIRECTOR.md` |
| Stage 6: Aesthetic Critic | `references/AESTHETIC-CRITIC.md` |
| Stage 7: MCP Call Planner | `references/MCP-CALL-PLANNER.md` |
| 视觉配方 (brutal/neon/editorial/chaos) | `../web-design-engineer/references/style-recipes/` |
