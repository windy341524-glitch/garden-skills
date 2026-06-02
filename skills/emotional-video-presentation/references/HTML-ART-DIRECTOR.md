# HTML Art Director — HTML 艺术导演

根据 visualScenes 生成完整 HTML。只输出 HTML，不输出解释。

---

## 输入

visualScenes JSON + voiceboxSegments JSON + narrativeMode + visualScale。

## 输出

一个完整 HTML 文件。

---

## 强制要求

1. CSS 写在 `<style>` 中
2. 不依赖外部图片（用 CSS 渐变、噪点、伪元素）
3. 移动端优先 390px–430px
4. 每个 section 带 `data-scene-id`，与 voiceboxSegments 对齐
5. 每个 scene `min-height: 100vh`

## 禁止

- ❌ 外部图片/CSS/JavaScript/React
- ❌ 博客/PPT/SaaS/卡片/Tailwind
- ❌ 柔和配色、过度圆角、emoji

---

## brutal CSS 模板

```css
:root {
  --bg: #050505;
  --text: #f4f4f0;
  --danger: #ff2a2a;
  --acid: #c8ff00;
  --muted: #777;
}
body {
  margin: 0;
  background:
    radial-gradient(circle at 20% 0%, rgba(255,42,42,.28), transparent 35%),
    radial-gradient(circle at 100% 80%, rgba(200,255,0,.12), transparent 40%),
    var(--bg);
  color: var(--text);
  font-family: "PingFang SC", "Microsoft YaHei", Inter, sans-serif;
}
.scene {
  min-height: 100vh;
  padding: 48px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,.12);
}
.kicker {
  color: var(--danger);
  font-size: 13px;
  letter-spacing: .24em;
  text-transform: uppercase;
  font-weight: 900;
}
.headline {
  font-size: clamp(48px, 16vw, 92px);
  line-height: .86;
  letter-spacing: -0.08em;
  font-weight: 1000;
  margin: 18px 0;
}
.headline .hit {
  color: var(--acid);
  text-shadow: 0 0 30px rgba(200,255,0,.35);
}
.body {
  font-size: 20px;
  line-height: 1.45;
  color: rgba(244,244,240,.78);
  max-width: 330px;
}
.badge {
  display: inline-flex;
  border: 1px solid rgba(255,255,255,.28);
  padding: 8px 12px;
  border-radius: 999px;
  color: var(--acid);
  font-weight: 800;
  transform: rotate(-3deg);
}
.noise::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: .18;
  background-image:
    linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px);
  background-size: 18px 18px;
  mask-image: radial-gradient(circle, black, transparent 70%);
}
```

其他模式参考 `../../web-design-engineer/references/style-recipes/` 中对应配方。

---

## 情绪递进

```
scene-01: 视觉 5 (hook) → scene-02: 视觉 2 (setup) → scene-03: 视觉 3 (conflict)
→ scene-04: 视觉 5 (climax) → scene-05: 视觉 3 (resolution) → scene-06: 视觉 4 (memory)
```

---

## 自检

- [ ] 第一屏 0.5 秒吸住注意力
- [ ] 每个 scene 有明确情绪
- [ ] 关键词 hit 高亮
- [ ] 不像普通网页
- [ ] data-scene-id 与 voiceboxSegments 一致
- [ ] 无外部图片
