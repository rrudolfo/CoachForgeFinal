import { standardsFamiliesFallback } from "./content";
import { hasSupabaseConfig, supabase } from "./supabase";
import {
  StandardItem,
  StandardItemRow,
  StandardsFamily,
  StandardsFamilyRow,
} from "../types/content";

function mapStandard(row: StandardItemRow): StandardItem {
  return {
    createdAt: row.created_at,
    definition: row.definition,
    familyId: row.family_id,
    id: row.id,
    name: row.name,
    risk: row.risk ?? "",
    signals: row.signals ?? [],
    sortOrder: row.sort_order ?? 0,
    sources: row.sources ?? [],
    threshold: row.threshold ?? "",
    updatedAt: row.updated_at,
  };
}

function mapFamily(row: StandardsFamilyRow, standards: StandardItem[]): StandardsFamily {
  return {
    color: row.color ?? "blue",
    createdAt: row.created_at,
    description: row.description ?? "",
    icon: row.icon ?? "file-text",
    id: row.id,
    name: row.name,
    sortOrder: row.sort_order ?? 0,
    standards,
    updatedAt: row.updated_at,
  };
}

export async function listStandardsFamilies() {
  if (!hasSupabaseConfig || !supabase) {
    return standardsFamiliesFallback;
  }

  const [{ data: familyRows, error: familyError }, { data: standardRows, error: standardError }] =
    await Promise.all([
      supabase
        .from("standards_families")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
      supabase
        .from("standards_items")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: true }),
    ]);

  if (familyError) {
    throw familyError;
  }

  if (standardError) {
    throw standardError;
  }

  const standardsByFamily = new Map<string, StandardItem[]>();

  (standardRows as StandardItemRow[]).forEach((row) => {
    const item = mapStandard(row);
    const collection = standardsByFamily.get(item.familyId) ?? [];
    collection.push(item);
    standardsByFamily.set(item.familyId, collection);
  });

  return (familyRows as StandardsFamilyRow[]).map((family) =>
    mapFamily(family, standardsByFamily.get(family.id) ?? []),
  );
}

export async function createStandardsFamily(
  family: Omit<StandardsFamily, "id" | "standards"> & { standards?: StandardItem[] },
) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("standards_families")
    .insert({
      color: family.color,
      description: family.description,
      icon: family.icon,
      name: family.name,
      sort_order: family.sortOrder,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return mapFamily(data as StandardsFamilyRow, []);
}

export async function updateStandardsFamily(family: StandardsFamily) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("standards_families")
    .update({
      color: family.color,
      description: family.description,
      icon: family.icon,
      name: family.name,
      sort_order: family.sortOrder,
    })
    .eq("id", family.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return mapFamily(data as StandardsFamilyRow, family.standards);
}

export async function deleteStandardsFamily(id: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from("standards_families").delete().eq("id", id);

  if (error) {
    throw error;
  }
}

export async function createStandardItem(item: Omit<StandardItem, "id">) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("standards_items")
    .insert({
      definition: item.definition,
      family_id: item.familyId,
      name: item.name,
      risk: item.risk,
      signals: item.signals,
      sort_order: item.sortOrder,
      sources: item.sources,
      threshold: item.threshold,
    })
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return mapStandard(data as StandardItemRow);
}

export async function updateStandardItem(item: StandardItem) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { data, error } = await supabase
    .from("standards_items")
    .update({
      definition: item.definition,
      family_id: item.familyId,
      name: item.name,
      risk: item.risk,
      signals: item.signals,
      sort_order: item.sortOrder,
      sources: item.sources,
      threshold: item.threshold,
    })
    .eq("id", item.id)
    .select("*")
    .single();

  if (error) {
    throw error;
  }

  return mapStandard(data as StandardItemRow);
}

export async function deleteStandardItem(id: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }

  const { error } = await supabase.from("standards_items").delete().eq("id", id);

  if (error) {
    throw error;
  }
}
