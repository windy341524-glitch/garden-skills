// ============================================================
// Emotional Video v2 — Scale Configuration
// 统一情绪与审美配置
// ============================================================

// --- Types ---

export type EmotionScale = 1 | 2 | 3 | 4 | 5;
export type ConflictScale = 1 | 2 | 3 | 4 | 5;
export type VisualScale = 1 | 2 | 3 | 4 | 5;

export type NarrativeMode =
  | "brutal"      // 黑红压迫、强冲突、强观点
  | "cinematic"   // 电影预告片感、镜头感、强氛围
  | "editorial"   // 杂志封面、高级排版、思辨感
  | "chaos"       // 拼贴、撕裂、社媒爆发感
  | "neon";       // 赛博霓虹、科技焦虑、未来感

export interface ScaleConfig {
  emotionScale: EmotionScale;
  conflictScale: ConflictScale;
  visualScale: VisualScale;
  narrativeMode: NarrativeMode;
}

// --- Default values ---

export const DEFAULT_SCALES: ScaleConfig = {
  emotionScale: 5,
  conflictScale: 4,
  visualScale: 5,
  narrativeMode: "brutal",
};

// --- Forbidden styles ---

export const FORBIDDEN_STYLES: readonly string[] = [
  "普通博客排版（段落平铺、无视觉层次）",
  "PPT 风格（bullet list、模板感、均匀分布）",
  "SaaS 官网（蓝白配色、hero section、feature cards）",
  "卡片列表（grid of rounded cards with shadows）",
  "公众号文章（两端对齐、灰色正文、小标题分段）",
  "简历风（section headers + bullet points）",
  "模板站（一看就是'生成的'）",
  "默认 Tailwind 页面（rounded-2xl、shadow-md、p-6）",
  "蓝白科技官网（gradient blue、白色底、灰色正文）",
  "过度圆角（border-radius > 4px 除非 narrativeMode 需要）",
  "柔和配色（pastel、muted、low-contrast）",
  "emoji 作为图标替代",
] as const;

// --- Scene ID format ---

export function sceneId(index: number): string {
  return `scene-${String(index).padStart(2, "0")}`;
}

// --- Scale descriptions (for prompt injection) ---

export const EMOTION_DESCRIPTIONS: Record<EmotionScale, string> = {
  1: "冷静解释 — 长句可，客观叙述，平稳语调",
  2: "轻微态度 — 短句增多，有倾向，偶尔加重",
  3: "明确立场 — 短句为主，有判断词，节奏感强",
  4: "强对抗 — 极短句，反问句，对比句，高起伏",
  5: "爆发式 — 感叹号、省略号、压迫性排版、爆发式语调",
};

export const CONFLICT_DESCRIPTIONS: Record<ConflictScale, string> = {
  1: "信息说明 — A 是 B",
  2: "问题指出 — A 应该是 B，但实际是 C",
  3: "反常识 — 你以为 A 是 B？其实 A 是 C",
  4: "正反对撞 — A 阵营说 B，但 C 阵营证明了 D",
  5: "群体/时代/利益冲突 — 整个行业都在做 A，但真相是 B，因为 C",
};

export const VISUAL_DESCRIPTIONS: Record<VisualScale, string> = {
  1: "普通排版 — 标准卡片、正文列表",
  2: "卡片排版 — 阴影卡片、分栏布局",
  3: "杂志感 — 大标题、衬线字体、结构化留白",
  4: "海报感 — 超大文字、暗色底、光晕、高对比",
  5: "电影预告片感 — 多层叠加、噪点、错位、几何、极端字号比",
};

export const NARRATIVE_MODE_DESCRIPTIONS: Record<NarrativeMode, string> = {
  brutal: "黑红压迫 — #050505 底、acid 绿高亮、网格噪点、背景光晕",
  cinematic: "电影预告片 — #0a0a0a 底、金色 accent、大景深、电影字幕感",
  editorial: "杂志封面 — #f5f0eb/#111 底、衬线体、结构化留白、深红 accent",
  chaos: "撕裂拼贴 — #fff/#000 底、反色条、文字旋转、硬阴影、撕裂边缘",
  neon: "赛博霓虹 — #0a0a1a 底、neon glow、CRT 扫描线、flicker",
};
