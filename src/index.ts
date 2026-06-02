// ============================================================
// Emotional Video v2 — Entry Point
// 默认入口：调用 generateEmotionalPage pipeline
// ============================================================

export { generateEmotionalPage } from "./pipeline/generate-emotional-page";
export type {
  PipelineInput,
  PipelineOutput,
  ContentInsight,
  EmotionalScript,
  VoiceboxSegment,
  VoiceboxSegments,
  VisualScene,
  VisualStoryboard,
  AestheticCritique,
  McpCallPlan,
  StageExecutor,
} from "./pipeline/generate-emotional-page";

export {
  DEFAULT_SCALES,
  FORBIDDEN_STYLES,
  EMOTION_DESCRIPTIONS,
  CONFLICT_DESCRIPTIONS,
  VISUAL_DESCRIPTIONS,
  NARRATIVE_MODE_DESCRIPTIONS,
  sceneId,
} from "./config/scales";

export type {
  ScaleConfig,
  EmotionScale,
  ConflictScale,
  VisualScale,
  NarrativeMode,
} from "./config/scales";

// --- Usage Example ---
//
// import { generateEmotionalPage, DEFAULT_SCALES } from "garden-skills";
//
// const result = await generateEmotionalPage(executor, {
//   article: "你的文章内容...",
//   ...DEFAULT_SCALES,
// });
//
// console.log(result.html);          // 完整 HTML
// console.log(result.mcpPlan);       // Voicebox MCP 调用计划
// console.log(result.critic.score);  // 审美评分
