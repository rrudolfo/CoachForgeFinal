import { coachesFallback } from "./content";
import { hasSupabaseConfig, supabase } from "./supabase";
import { CoachEntry, CoachRow } from "../types/content";

function mapCoach(row: CoachRow): CoachEntry {
  return {
    accentColor: row.accent_color ?? "blue",
    aiSupport: row.ai_support ?? "",
    createdAt: row.created_at,
    id: row.id,
    matrixAiSupport: row.matrix_ai_support ?? "",
    matrixLabel: row.matrix_label ?? row.name,
    name: row.name,
    philosophy: row.philosophy,
    practices: row.practices ?? [],
    ritualDescription: row.ritual_description ?? "",
    ritualName: row.ritual_name ?? "",
    sortOrder: row.sort_order ?? 0,
    teamApplication: row.team_application ?? "",
    updatedAt: row.updated_at,
  };
}

export async function listCoaches() {
  if (!hasSupabaseConfig || !supabase) {
    return coachesFallback;
  }

  const { data, error } = await supabase
    .from("coaches")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return (data as CoachRow[]).map(mapCoach);
}

export async function createCoach(coach: Omit<CoachEntry, "id">) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("coaches")
    .insert({
      accent_color: coach.accentColor,
      ai_support: coach.aiSupport,
      matrix_ai_support: coach.matrixAiSupport,
      matrix_label: coach.matrixLabel,
      name: coach.name,
      philosophy: coach.philosophy,
      practices: coach.practices,
      ritual_description: coach.ritualDescription,
      ritual_name: coach.ritualName,
      sort_order: coach.sortOrder,
      team_application: coach.teamApplication,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return mapCoach(data as CoachRow);
}

export async function updateCoach(coach: CoachEntry) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("coaches")
    .update({
      accent_color: coach.accentColor,
      ai_support: coach.aiSupport,
      matrix_ai_support: coach.matrixAiSupport,
      matrix_label: coach.matrixLabel,
      name: coach.name,
      philosophy: coach.philosophy,
      practices: coach.practices,
      ritual_description: coach.ritualDescription,
      ritual_name: coach.ritualName,
      sort_order: coach.sortOrder,
      team_application: coach.teamApplication,
    })
    .eq("id", coach.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return mapCoach(data as CoachRow);
}

export async function deleteCoach(id: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from("coaches").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
