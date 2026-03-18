import { Session, User } from "@supabase/supabase-js";
import { hasSupabaseConfig, supabase } from "./supabase";

export function getConfiguredSupabase() {
  if (!supabase || !hasSupabaseConfig) {
    throw new Error("Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  }

  return supabase;
}

export async function loadSession(): Promise<Session | null> {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function signInWithPassword(email: string, password: string) {
  const client = getConfiguredSupabase();
  const { error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }
}

export async function signOut() {
  const client = getConfiguredSupabase();
  const { error } = await client.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function checkEditorAccess(user: User | null): Promise<boolean> {
  if (!supabase || !user) {
    return false;
  }

  const { data, error } = await supabase.rpc("is_editor");

  if (error) {
    throw error;
  }

  return Boolean(data);
}
