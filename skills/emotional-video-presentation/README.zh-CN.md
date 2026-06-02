# Emotional Video Presentation

**把文章变成强情绪口播视频素材的 Agent Skill。**

## 这是什么

一个 7 阶段 pipeline，把一篇文章变成：
- 一组有攻击性的视觉镜头（移动端 HTML 页面）
- 一份结构化的 Voicebox MCP 配音计划

**不是**交互式网页，不是 PPT，不是博客。

## Pipeline

```
文章 → 内容导演(找冲突) → 强情绪口播稿 → Voicebox MCP 配音分段
     → 视觉分镜 → 高审美 HTML → 审美批评 → MCP 调用计划
```

## 默认参数

| 参数 | 默认值 | 含义 |
|---|---|---|
| emotionScale | 5 | 情绪强度（1 冷静 → 5 爆发） |
| conflictScale | 4 | 对抗强度（1 信息说明 → 5 时代冲突） |
| visualScale | 5 | 视觉冲击（1 普通排版 → 5 电影预告片） |
| narrativeMode | brutal | 视觉风格（brutal/cinematic/editorial/chaos/neon） |

## 产出物

1. `output.html` — 移动端 HTML 页面，每屏一个 scene，带 `data-scene-id`
2. `voicebox-segments.json` — 结构化配音片段
3. `mcp-call-plan.json` — Voicebox MCP 调用计划
4. `visual-storyboard.json` — 视觉分镜
5. `critic.json` — 审美评分（6 维，score 1-10）

## Voicebox MCP 集成

- Stage 3 把口播稿拆成结构化片段（sceneId、emotion、pace、energy、pause）
- Stage 7 生成 `voicebox.speak()` 调用计划
- **不直接调用 MCP**，只生成计划
- MCP 不可用时保存 `voicebox-segments.json` 作为 fallback
- sceneId 在 voiceboxSegments / visualStoryboard / HTML 三者间 1:1 对齐

## 文件结构

```
skills/emotional-video-presentation/
├── SKILL.md                          # 主 skill 定义（7 阶段 pipeline）
├── README.md                         # 英文说明
├── README.zh-CN.md                   # 中文说明（本文件）
├── manifest.json                     # 元数据
└── references/
    ├── SCALES-CONFIG.md              # 三维 scale 配置 + forbidden styles
    ├── CONTENT-DIRECTOR.md           # Stage 1: 内容导演
    ├── EMOTIONAL-SCRIPTWRITER.md     # Stage 2: 强情绪口播稿
    ├── VOICEBOX-DIRECTOR.md          # Stage 3: 配音分段
    ├── VISUAL-DIRECTOR.md            # Stage 4: 视觉分镜
    ├── HTML-ART-DIRECTOR.md          # Stage 5: HTML 生成
    ├── AESTHETIC-CRITIC.md           # Stage 6: 审美批评
    └── MCP-CALL-PLANNER.md           # Stage 7: MCP 调用计划
```

## 与已有 Skill 的关系

| Skill | 用途 | 本 Skill 的关系 |
|---|---|---|
| web-video-presentation | 交互式 Vite+React 演示 | 吸收口播思路，但默认审美更强 |
| web-design-engineer | 通用网页设计 | 吸收审美判断（style-recipes），但只做短视频素材 |

不删除已有 Skill。本 Skill 是新增，不是替代。

## 安装

```bash
# Claude Code plugin marketplace
# 或手动复制 skills/emotional-video-presentation/ 到你的项目
```

## 如何使用

在 Claude Code 中说：

```
把这篇文章做成口播视频素材
```

或指定参数：

```
用 emotionScale=5, conflictScale=4, narrativeMode=brutal 把这篇文章做成视频素材
```
