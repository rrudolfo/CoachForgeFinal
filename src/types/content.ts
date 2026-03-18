export type AccentKey = "blue" | "red" | "yellow" | "pink" | "none";
export type PracticalToolIconKey = "file-check" | "lightbulb" | "users" | "book-open" | "none";
export type StandardsIconKey = "file-text" | "message-square" | "graduation-cap";
export type ColorToken = "blue" | "red" | "yellow" | "pink";
export type ToolItemMarker = "checkbox" | "arrow" | "question" | "check" | "bullet";

export interface PracticalToolItem {
  description?: string;
  marker: ToolItemMarker;
  text: string;
  title?: string;
}

export interface PracticalTool {
  accent: AccentKey;
  category: string;
  createdAt?: string;
  description?: string;
  icon: PracticalToolIconKey;
  id: string;
  items: PracticalToolItem[];
  link?: string;
  sortOrder: number;
  title: string;
  updatedAt?: string;
}

export interface PracticalToolRow {
  accent: AccentKey;
  category: string | null;
  created_at: string;
  description: string | null;
  icon: PracticalToolIconKey | null;
  id: string;
  items: PracticalToolItem[] | null;
  link: string | null;
  sort_order: number | null;
  title: string;
  updated_at: string;
}

export interface ResearchSource {
  references: string[];
  topic: string;
  week: string;
}

export interface StandardItem {
  createdAt?: string;
  definition: string;
  familyId: string;
  id: string;
  name: string;
  risk: string;
  signals: string[];
  sortOrder: number;
  sources: string[];
  threshold: string;
  updatedAt?: string;
}

export interface StandardsFamily {
  color: ColorToken;
  createdAt?: string;
  description?: string;
  icon: StandardsIconKey;
  id: string;
  name: string;
  sortOrder: number;
  standards: StandardItem[];
  updatedAt?: string;
}

export interface StandardsFamilyRow {
  color: ColorToken | null;
  created_at: string;
  description: string | null;
  icon: StandardsIconKey | null;
  id: string;
  name: string;
  sort_order: number | null;
  updated_at: string;
}

export interface StandardItemRow {
  created_at: string;
  definition: string;
  family_id: string;
  id: string;
  name: string;
  risk: string | null;
  signals: string[] | null;
  sort_order: number | null;
  sources: string[] | null;
  threshold: string | null;
  updated_at: string;
}

export interface CoachPractice {
  description: string;
  title: string;
}

export interface CoachEntry {
  accentColor: ColorToken;
  aiSupport: string;
  createdAt?: string;
  id: string;
  matrixAiSupport: string;
  matrixLabel: string;
  name: string;
  philosophy: string;
  practices: CoachPractice[];
  ritualDescription: string;
  ritualName: string;
  sortOrder: number;
  teamApplication: string;
  updatedAt?: string;
}

export interface CoachRow {
  accent_color: ColorToken | null;
  ai_support: string | null;
  created_at: string;
  id: string;
  matrix_ai_support: string | null;
  matrix_label: string | null;
  name: string;
  philosophy: string;
  practices: CoachPractice[] | null;
  ritual_description: string | null;
  ritual_name: string | null;
  sort_order: number | null;
  team_application: string | null;
  updated_at: string;
}
