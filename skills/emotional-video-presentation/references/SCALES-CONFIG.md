# Scale 配置 — 情绪 / 冲突 / 视觉 三维控制

所有 stage 共享此配置。

---

## 三个 Scale

### Emotion Scale（情绪强度）— 控制文案和语音的情绪浓度

| Level | 名称 | 文案风格 | 语音指导 |
|---|---|---|---|
| 1 | 冷静解释 | 长句可，客观叙述 | 平稳、中速、低起伏 |
| 2 | 轻微态度 | 短句增多，有倾向 | 偶尔加重，微起伏 |
| 3 | 明确立场 | 短句为主，有判断词 | 节奏感强，有停顿 |
| 4 | 强对抗 | 极短句，反问句，对比句 | 高起伏，多停顿，有压迫感 |
| 5 | 爆发式 | 感叹号、省略号、压迫性排版 | 爆发式、急促、高能量 |

### Conflict Scale（对抗强度）— 控制内容的冲突结构

| Level | 名称 | 结构 |
|---|---|---|
| 1 | 信息说明 | A 是 B |
| 2 | 问题指出 | A 应该是 B，但实际是 C |
| 3 | 反常识 | 你以为 A 是 B？其实 A 是 C |
| 4 | 正反对撞 | A 阵营说 B，但 C 阵营证明了 D |
| 5 | 群体/时代/利益冲突 | 整个行业都在做 A，但真相是 B，因为 C |

### Visual Scale（视觉冲击力）— 控制 HTML 的审美强度

| Level | 名称 | 视觉语言 |
|---|---|---|
| 1 | 普通排版 | 标准卡片、正文列表 |
| 2 | 卡片排版 | 阴影卡片、分栏布局 |
| 3 | 杂志感 | 大标题、衬线字体、结构化留白 |
| 4 | 海报感 | 超大文字、暗色底、光晕、高对比 |
| 5 | 电影预告片感 | 多层叠加、噪点、错位、几何、极端字号比 |

---

## Narrative Mode（叙事视觉模式）

| Mode | 中文名 | 底色 | 核心特征 | 对应 web-design-engineer 配方 |
|---|---|---|---|---|
| `brutal` | 黑红压迫 | #050505 | acid 绿高亮、网格噪点、背景光晕 | `style-recipes/brutal-poster.md` |
| `cinematic` | 电影预告片 | #0a0a0a | 金色 accent、大景深、电影字幕感 | `style-recipes/brutal-poster.md` (cinematic 变体) |
| `editorial` | 杂志封面 | #f5f0eb / #111 | 衬线体、结构化留白、深红 accent | `style-recipes/editorial-poster.md` |
| `chaos` | 撕裂拼贴 | #fff / #000 | 反色条、文字旋转、硬阴影、撕裂边缘 | `style-recipes/chaos-poster.md` |
| `neon` | 赛博霓虹 | #0a0a1a | neon glow、CRT 扫描线、flicker | `style-recipes/neon-poster.md` |

---

## 默认值

```
emotionScale = 5
conflictScale = 4
visualScale = 5
narrativeMode = "brutal"
```

---

## Forbidden Styles（禁止生成的视觉风格）

以下风格在任何 scale 组合下都不允许出现：

- ❌ 普通博客排版（段落平铺、无视觉层次）
- ❌ PPT 风格（bullet list、模板感、均匀分布）
- ❌ SaaS 官网（蓝白配色、hero section、feature cards）
- ❌ 卡片列表（grid of rounded cards with shadows）
- ❌ 公众号文章（两端对齐、灰色正文、小标题分段）
- ❌ 简历风（section headers + bullet points）
- ❌ 模板站（一看就是"生成的"）
- ❌ 默认 Tailwind 页面（rounded-2xl、shadow-md、p-6）
- ❌ 蓝白科技官网（gradient blue、白色底、灰色正文）
- ❌ 柔和配色（pastel、muted、low-contrast）
- ❌ emoji 作为图标替代

---

## Scene 对齐规则

voiceboxSegments、visualScenes、HTML sections 三者必须共享同一套 sceneId：

```
sceneId 格式: scene-01, scene-02, scene-03 ...
```

每个 sceneId 在三个系统中 1:1 对应：
- voiceboxSegments[i].sceneId == visualScenes[i].sceneId == HTML section[data-scene-id]

---

## TypeScript 类型

可导入的类型定义位于项目根目录 `src/config/scales.ts`。
