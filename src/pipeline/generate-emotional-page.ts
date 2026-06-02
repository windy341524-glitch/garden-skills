// ============================================================
// Emotional Video v2 — Main Pipeline
// 文章 → 情绪口播 → Voicebox MCP 配音计划 → 视觉分镜 → 高审美 HTML
// ============================================================

import {
  type ScaleConfig,
  type EmotionScale,
  type ConflictScale,
  type VisualScale,
  type NarrativeMode,
  DEFAULT_SCALES,
  sceneId,
} from "../config/scales";

// --- Input / Output Types ---

export interface PipelineInput {
  article: string;
  emotionScale?: EmotionScale;
  conflictScale?: ConflictScale;
  visualScale?: VisualScale;
  narrativeMode?: NarrativeMode;
}

export interface ContentInsight {
  coreInsight: string;
  hiddenConflict: string;
  contrarianPoint: string;
  audienceMisconception: string;
  truth: string;
  emotionAxis: string;
  hook: string;
  memoryHook: string;
  recommendedNarrativeMode: NarrativeMode;
  recommendedEmotionScale: EmotionScale;
  recommendedConflictScale: ConflictScale;
  recommendedVisualScale: VisualScale;
}

export interface Beat {
  beatId: string;
  text: string;
  emotion: string;
  intensity: number;
  purpose: string;
}

export interface EmotionalScript {
  title: string;
  hook: string;
  fullScript: string;
  beats: Beat[];
}

export interface VoiceboxSegment {
  sceneId: string;
  beatId: string;
  text: string;
  emotion: string;
  pace: "slow" | "medium" | "fast";
  energy: number;
  pauseBeforeMs: number;
  pauseAfterMs: number;
  emphasis: string[];
  deliveryDirection: string;
  profile: string | null;
  personality: boolean;
}

export interface VoiceboxSegments {
  provider: "voicebox-mcp";
  totalSegments: number;
  segments: VoiceboxSegment[];
  fallback: {
    saveJson: boolean;
    reason: string;
  };
}

export interface VisualScene {
  sceneId: string;
  headline: string;
  subline: string;
  visualMood: string;
  composition: string;
  colorMood: string;
  motionHint: string;
  typographyHint: string;
  symbol: string;
}

export interface VisualStoryboard {
  totalScenes: number;
  scenes: VisualScene[];
}

export interface CriticProblem {
  severity: "critical" | "major" | "minor";
  sceneId: string;
  description: string;
  repairInstruction: string;
}

export interface AestheticCritique {
  pass: boolean;
  score: number;
  problems: CriticProblem[];
  repairInstructions: string[];
  requiredRewriteLevel: "none" | "minor" | "major" | "full-regenerate";
}

export interface McpCallSegment {
  sceneId: string;
  mcpTool: "voicebox_speak";
  params: {
    text: string;
    profile: string | null;
    personality: boolean;
    language: "zh";
  };
  postProcess: {
    pauseAfterMs: number;
    emphasis: string[];
  };
  deliveryDirection: string;
}

export interface McpCallPlan {
  provider: "voicebox-mcp";
  totalCalls: number;
  segments: McpCallSegment[];
  fallback: {
    saveJson: boolean;
    path: string;
    reason: string;
    instructions: string;
  };
}

export interface PipelineOutput {
  title: string;
  hook: string;
  scales: ScaleConfig;
  insight: ContentInsight;
  script: EmotionalScript;
  voiceboxSegments: VoiceboxSegments;
  visualStoryboard: VisualStoryboard;
  html: string;
  critic: AestheticCritique;
  mcpPlan: McpCallPlan;
}

// --- Stage Executor Interface ---

export interface StageExecutor {
  /** Read a skill/reference file as string */
  readFile(path: string): string;
  /** Execute an LLM prompt and return the response */
  callLLM(systemPrompt: string, userPrompt: string): Promise<string>;
  /** Write output file */
  writeFile(path: string, content: string): void;
}

// --- Skill File Paths ---

const SKILLS = {
  scalesConfig: "skills/emotional-video-v2/references/SCALES-CONFIG.md",
  contentDirector: "skills/content-director-v2.md",
  emotionalScriptwriter: "skills/emotional-scriptwriter-v2.md",
  voiceboxDirector: "skills/voicebox-director-v2.md",
  visualDirector: "skills/visual-director-v2.md",
  htmlArtDirector: "skills/html-art-director-v2.md",
  aestheticCritic: "skills/aesthetic-critic-v2.md",
  mcpCallPlanner: "skills/mcp-call-planner-v2.md",
  brutalPoster: "skills/web-design-engineer/references/style-recipes/brutal-poster.md",
} as const;

// --- Pipeline Stages ---

async function stage1_contentDirector(
  exec: StageExecutor,
  article: string,
): Promise<ContentInsight> {
  const skill = exec.readFile(SKILLS.contentDirector);
  const response = await exec.callLLM(skill, article);
  return JSON.parse(response) as ContentInsight;
}

async function stage2_emotionalScriptwriter(
  exec: StageExecutor,
  insight: ContentInsight,
  scales: ScaleConfig,
): Promise<EmotionalScript> {
  const skill = exec.readFile(SKILLS.emotionalScriptwriter);
  const userPrompt = JSON.stringify({ insight, ...scales });
  const response = await exec.callLLM(skill, userPrompt);
  return JSON.parse(response) as EmotionalScript;
}

async function stage3_voiceboxDirector(
  exec: StageExecutor,
  script: EmotionalScript,
  emotionScale: EmotionScale,
): Promise<VoiceboxSegments> {
  const skill = exec.readFile(SKILLS.voiceboxDirector);
  const userPrompt = JSON.stringify({ script, emotionScale });
  const response = await exec.callLLM(skill, userPrompt);
  return JSON.parse(response) as VoiceboxSegments;
}

async function stage4_visualDirector(
  exec: StageExecutor,
  voiceboxSegments: VoiceboxSegments,
  visualScale: VisualScale,
  narrativeMode: NarrativeMode,
): Promise<VisualStoryboard> {
  const skill = exec.readFile(SKILLS.visualDirector);
  const userPrompt = JSON.stringify({ voiceboxSegments, visualScale, narrativeMode });
  const response = await exec.callLLM(skill, userPrompt);
  return JSON.parse(response) as VisualStoryboard;
}

async function stage5_htmlArtDirector(
  exec: StageExecutor,
  visualStoryboard: VisualStoryboard,
  voiceboxSegments: VoiceboxSegments,
  narrativeMode: NarrativeMode,
  visualScale: VisualScale,
): Promise<string> {
  const skill = exec.readFile(SKILLS.htmlArtDirector);
  const styleRecipe = exec.readFile(SKILLS.brutalPoster);
  const fullSkill = skill + "\n\n---\n\n## Style Recipe Reference\n\n" + styleRecipe;
  const userPrompt = JSON.stringify({
    visualStoryboard,
    voiceboxSegments,
    narrativeMode,
    visualScale,
  });
  return exec.callLLM(fullSkill, userPrompt);
}

async function stage6_aestheticCritic(
  exec: StageExecutor,
  html: string,
  voiceboxSegments: VoiceboxSegments,
  visualScale: VisualScale,
  narrativeMode: NarrativeMode,
): Promise<AestheticCritique> {
  const skill = exec.readFile(SKILLS.aestheticCritic);
  const userPrompt = JSON.stringify({ html, voiceboxSegments, visualScale, narrativeMode });
  const response = await exec.callLLM(skill, userPrompt);
  return JSON.parse(response) as AestheticCritique;
}

async function stage7_mcpCallPlanner(
  exec: StageExecutor,
  voiceboxSegments: VoiceboxSegments,
): Promise<McpCallPlan> {
  const skill = exec.readFile(SKILLS.mcpCallPlanner);
  const userPrompt = JSON.stringify(voiceboxSegments);
  const response = await exec.callLLM(skill, userPrompt);
  return JSON.parse(response) as McpCallPlan;
}

// --- Scene Alignment Check ---

function verifySceneAlignment(
  voiceboxSegments: VoiceboxSegments,
  visualStoryboard: VisualStoryboard,
  html: string,
): string[] {
  const errors: string[] = [];
  const segmentIds = voiceboxSegments.segments.map((s) => s.sceneId);
  const sceneIds = visualStoryboard.scenes.map((s) => s.sceneId);

  if (segmentIds.length !== sceneIds.length) {
    errors.push(
      `Segment count (${segmentIds.length}) != scene count (${sceneIds.length})`,
    );
  }

  for (let i = 0; i < Math.min(segmentIds.length, sceneIds.length); i++) {
    if (segmentIds[i] !== sceneIds[i]) {
      errors.push(
        `Mismatch at index ${i}: segment=${segmentIds[i]} vs scene=${sceneIds[i]}`,
      );
    }
  }

  for (const id of segmentIds) {
    if (!html.includes(`data-scene-id="${id}"`)) {
      errors.push(`HTML missing data-scene-id="${id}"`);
    }
  }

  return errors;
}

// --- Main Pipeline ---

export async function generateEmotionalPage(
  exec: StageExecutor,
  input: PipelineInput,
): Promise<PipelineOutput> {
  // Resolve scales
  const scales: ScaleConfig = {
    emotionScale: input.emotionScale ?? DEFAULT_SCALES.emotionScale,
    conflictScale: input.conflictScale ?? DEFAULT_SCALES.conflictScale,
    visualScale: input.visualScale ?? DEFAULT_SCALES.visualScale,
    narrativeMode: input.narrativeMode ?? DEFAULT_SCALES.narrativeMode,
  };

  // Stage 1: Content Director
  const insight = await stage1_contentDirector(exec, input.article);

  // Stage 2: Emotional Scriptwriter
  const script = await stage2_emotionalScriptwriter(exec, insight, scales);

  // Stage 3: Voicebox Director
  const voiceboxSegments = await stage3_voiceboxDirector(
    exec,
    script,
    scales.emotionScale,
  );

  // Stage 4: Visual Director
  const visualStoryboard = await stage4_visualDirector(
    exec,
    voiceboxSegments,
    scales.visualScale,
    scales.narrativeMode,
  );

  // Stage 5: HTML Art Director (with retry on critic failure)
  let html = await stage5_htmlArtDirector(
    exec,
    visualStoryboard,
    voiceboxSegments,
    scales.narrativeMode,
    scales.visualScale,
  );

  // Stage 6: Aesthetic Critic (up to 3 retries)
  let critic = await stage6_aestheticCritic(
    exec,
    html,
    voiceboxSegments,
    scales.visualScale,
    scales.narrativeMode,
  );

  let retries = 0;
  while (!critic.pass && retries < 3) {
    retries++;
    html = await stage5_htmlArtDirector(
      exec,
      visualStoryboard,
      voiceboxSegments,
      scales.narrativeMode,
      scales.visualScale,
    );
    critic = await stage6_aestheticCritic(
      exec,
      html,
      voiceboxSegments,
      scales.visualScale,
      scales.narrativeMode,
    );
  }

  // Scene alignment check
  const alignmentErrors = verifySceneAlignment(
    voiceboxSegments,
    visualStoryboard,
    html,
  );
  if (alignmentErrors.length > 0) {
    throw new Error(
      `Scene alignment failed:\n${alignmentErrors.join("\n")}`,
    );
  }

  // Stage 7: MCP Call Planner
  const mcpPlan = await stage7_mcpCallPlanner(exec, voiceboxSegments);

  // Save outputs
  exec.writeFile("voicebox-segments.json", JSON.stringify(voiceboxSegments, null, 2));
  exec.writeFile("visual-storyboard.json", JSON.stringify(visualStoryboard, null, 2));
  exec.writeFile("mcp-call-plan.json", JSON.stringify(mcpPlan, null, 2));
  exec.writeFile("output.html", html);
  exec.writeFile("critic.json", JSON.stringify(critic, null, 2));

  return {
    title: script.title,
    hook: script.hook,
    scales,
    insight,
    script,
    voiceboxSegments,
    visualStoryboard,
    html,
    critic,
    mcpPlan,
  };
}
