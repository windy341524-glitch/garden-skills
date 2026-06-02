# Emotional Video Presentation

Transform articles into emotionally charged short-video materials with Voicebox MCP voice synthesis integration.

## What it does

A 7-stage pipeline that turns an article into:
- A mobile-first HTML page with cinematic visual scenes
- A structured Voicebox MCP voice synthesis call plan

## Pipeline

```
Article → Content Director (find conflict) → Emotional Voiceover Script
→ Voicebox MCP Segment Split → Visual Storyboard → High-Aesthetic HTML
→ Aesthetic Critique → MCP Call Plan
```

## Default Parameters

| Param | Default | Meaning |
|---|---|---|
| emotionScale | 5 | Emotional intensity (1 calm → 5 explosive) |
| conflictScale | 4 | Conflict structure (1 info → 5 era-level clash) |
| visualScale | 5 | Visual impact (1 plain → 5 cinematic poster) |
| narrativeMode | brutal | Visual style: brutal / cinematic / editorial / chaos / neon |

## Outputs

1. `output.html` — Mobile HTML, one scene per screen, `data-scene-id` aligned
2. `voicebox-segments.json` — Structured voice segments
3. `mcp-call-plan.json` — Voicebox MCP call plan
4. `visual-storyboard.json` — Visual storyboard
5. `critic.json` — 6-dimension aesthetic score

## Voicebox MCP Integration

- Stage 3 splits script into structured segments (sceneId, emotion, pace, energy, pause)
- Stage 7 generates `voicebox.speak()` call plan per segment
- Does NOT call MCP directly — only generates the plan
- Fallback: saves `voicebox-segments.json` when MCP is unavailable

## Relationship to Existing Skills

| Skill | Purpose | This skill's relation |
|---|---|---|
| web-video-presentation | Interactive Vite+React demos | Borrows voiceover approach, stronger default aesthetics |
| web-design-engineer | General web design | Borrows style recipes (brutal-poster, etc.), short-video only |

Does NOT replace existing skills. This is an addition.

## Usage

```
Turn this article into an emotional video material
```

Or with parameters:

```
Use emotionScale=5, conflictScale=4, narrativeMode=brutal to turn this article into video material
```
