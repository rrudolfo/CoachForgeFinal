import { practicalToolsFallback } from "./content";
import { hasSupabaseConfig, supabase } from "./supabase";
import { PracticalTool, PracticalToolRow } from "../types/content";

function mapPracticalTool(row: PracticalToolRow): PracticalTool {
  return {
    accent: row.accent ?? "none",
    category: row.category ?? "",
    createdAt: row.created_at,
    description: row.description ?? "",
    icon: row.icon ?? "none",
    id: row.id,
    items: Array.isArray(row.items) ? row.items : [],
    link: row.link ?? "",
    sortOrder: row.sort_order ?? 0,
    title: row.title,
    updatedAt: row.updated_at,
  };
}

export async function listPracticalTools() {
  if (!hasSupabaseConfig || !supabase) {
    return practicalToolsFallback;
  }

  const { data, error } = await supabase
    .from("practical_tools")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw error;
  }

  return (data as PracticalToolRow[]).map(mapPracticalTool);
}

export async function createPracticalTool(tool: Omit<PracticalTool, "id">) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("practical_tools")
    .insert({
      accent: tool.accent,
      category: tool.category,
      description: tool.description,
      icon: tool.icon,
      items: tool.items,
      link: tool.link,
      sort_order: tool.sortOrder,
      title: tool.title,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return mapPracticalTool(data as PracticalToolRow);
}

export async function updatePracticalTool(tool: PracticalTool) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("practical_tools")
    .update({
      accent: tool.accent,
      category: tool.category,
      description: tool.description,
      icon: tool.icon,
      items: tool.items,
      link: tool.link,
      sort_order: tool.sortOrder,
      title: tool.title,
    })
    .eq("id", tool.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return mapPracticalTool(data as PracticalToolRow);
}

export async function deletePracticalTool(id: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from("practical_tools").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
