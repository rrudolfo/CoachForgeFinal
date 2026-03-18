import { Session, User } from "@supabase/supabase-js";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "sonner";
import { checkEditorAccess, loadSession, signInWithPassword, signOut } from "../../../lib/auth";
import { hasSupabaseConfig, supabase } from "../../../lib/supabase";

interface EditorContextValue {
  authReady: boolean;
  authDialogOpen: boolean;
  canEdit: boolean;
  editMode: boolean;
  hasSupabaseConfig: boolean;
  isCheckingAccess: boolean;
  setAuthDialogOpen: (open: boolean) => void;
  setEditMode: (enabled: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  user: User | null;
}

const EditorContext = createContext<EditorContextValue | null>(null);

async function resolveEditorAccess(user: User | null) {
  if (!user || !hasSupabaseConfig) {
    return false;
  }

  return checkEditorAccess(user);
}

export function EditorProvider({ children }: { children: ReactNode }) {
  const [authReady, setAuthReady] = useState(!hasSupabaseConfig);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [canEdit, setCanEdit] = useState(false);
  const [editMode, setEditModeState] = useState(false);
  const [isCheckingAccess, setIsCheckingAccess] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const setEditMode = useCallback(
    (enabled: boolean) => {
      if (!canEdit) {
        setEditModeState(false);
        return;
      }

      setEditModeState(enabled);
    },
    [canEdit],
  );

  const refreshAccess = useCallback(async (session: Session | null) => {
    setUser(session?.user ?? null);

    if (!session?.user) {
      setCanEdit(false);
      setEditModeState(false);
      return;
    }

    setIsCheckingAccess(true);

    try {
      const allowed = await resolveEditorAccess(session.user);
      setCanEdit(allowed);

      if (!allowed) {
        setEditModeState(false);
      }
    } catch (error) {
      setCanEdit(false);
      setEditModeState(false);
      toast.error(error instanceof Error ? error.message : "Unable to verify editor access.");
    } finally {
      setIsCheckingAccess(false);
    }
  }, []);

  useEffect(() => {
    if (!supabase || !hasSupabaseConfig) {
      return;
    }

    let active = true;

    loadSession()
      .then((session) => {
        if (!active) {
          return;
        }

        return refreshAccess(session);
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Unable to load session.");
      })
      .finally(() => {
        if (active) {
          setAuthReady(true);
        }
      });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      refreshAccess(session).finally(() => setAuthReady(true));
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [refreshAccess]);

  const handleSignIn = useCallback(async (email: string, password: string) => {
    await signInWithPassword(email, password);
    setAuthDialogOpen(false);
    toast.success("Signed in.");
  }, []);

  const handleSignOut = useCallback(async () => {
    await signOut();
    setAuthDialogOpen(false);
    setEditModeState(false);
    toast.success("Signed out.");
  }, []);

  const value = useMemo(
    () => ({
      authReady,
      authDialogOpen,
      canEdit,
      editMode,
      hasSupabaseConfig,
      isCheckingAccess,
      setAuthDialogOpen,
      setEditMode,
      signIn: handleSignIn,
      signOut: handleSignOut,
      user,
    }),
    [
      authDialogOpen,
      authReady,
      canEdit,
      editMode,
      handleSignIn,
      handleSignOut,
      isCheckingAccess,
      setEditMode,
      user,
    ],
  );

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>;
}

export function useEditor() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditor must be used within EditorProvider.");
  }

  return context;
}
