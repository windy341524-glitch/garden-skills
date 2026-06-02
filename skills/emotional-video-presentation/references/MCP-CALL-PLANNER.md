# MCP Call Planner — Voicebox MCP 调用计划

把 voiceboxSegments 转成 Voicebox MCP 调用计划。不执行调用。

---

## 输入

voiceboxSegments JSON。

## 输出

纯 JSON。

```json
{
  "provider": "voicebox-mcp",
  "totalCalls": 8,
  "segments": [
    {
      "sceneId": "scene-01",
      "mcpTool": "voicebox_speak",
      "params": {
        "text": "你以为 AI 会取代医生？",
        "profile": null,
        "personality": true,
        "language": "zh"
      },
      "postProcess": {
        "pauseAfterMs": 800,
        "emphasis": ["取代", "医生"]
      },
      "deliveryDirection": "质问语气，下沉，最后一个字拉长"
    }
  ],
  "fallback": {
    "saveJson": true,
    "path": "voicebox-segments.json",
    "reason": "MCP unavailable or failed",
    "instructions": "将完整 segments JSON 保存到文件，用户可手动处理"
  }
}
```

---

## 规则

- 每个 segment 一次 `voicebox.speak()`，不合并
- 不直接调用 MCP，只生成计划
- profile 默认 null（使用 Voicebox 默认 voice）
- language 固定 "zh"
- MCP 不可用时保存 `voicebox-segments.json` 作为 fallback

---

## MCP 工具参考（供执行层使用）

### voicebox.speak
```
voicebox.speak(text, profile?, personality?, language?, engine?)
→ { generationId: string }
```

### voicebox.transcribe
```
voicebox.transcribe(audio_path?, audio_base64?, language?)
→ { text: string }
```

### voicebox.list_profiles
```
voicebox.list_profiles()
→ Array<{ name: string, ... }>
```
