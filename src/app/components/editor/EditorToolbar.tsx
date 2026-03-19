import { Lock, LogOut, Pencil, ShieldCheck } from "lucide-react";
import { useEditor } from "./EditorProvider";
import { EditorActionButton } from "./EditorActionButton";

export function EditorToolbar() {
  const {
    authReady,
    canEdit,
    editMode,
    hasSupabaseConfig,
    isCheckingAccess,
    setAuthDialogOpen,
    setEditMode,
    signOut,
    user,
  } = useEditor();

  if (!hasSupabaseConfig || !authReady || user) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="flex items-center gap-2 border-2 p-2 shadow-sm"
        style={{
          backgroundColor: "var(--color-paper-white)",
          borderColor: canEdit && editMode ? "var(--color-sport-red)" : "var(--color-ink-black)",
        }}
      >
        {!user ? (
          <EditorActionButton
            className="flex items-center gap-2"
            variant="ghost"
            onClick={() => setAuthDialogOpen(true)}
          >
            <Lock size={14} />
            Editor Sign In
          </EditorActionButton>
        ) : canEdit ? (
          <>
            <div className="px-2 text-[11px] font-bold uppercase tracking-[0.14em]">
              <span className="mr-2">{editMode ? <Pencil size={14} className="inline" /> : <ShieldCheck size={14} className="inline" />}</span>
              {isCheckingAccess ? "Checking Access" : editMode ? "Edit Mode On" : "Edit Mode Off"}
            </div>
            <EditorActionButton onClick={() => setEditMode(!editMode)} variant={editMode ? "default" : "ghost"}>
              {editMode ? "Disable" : "Enable"}
            </EditorActionButton>
            <EditorActionButton
              className="flex items-center gap-2"
              onClick={() => signOut()}
              variant="ghost"
            >
              <LogOut size={14} />
              Sign Out
            </EditorActionButton>
          </>
        ) : (
          <>
            <div className="px-2 text-[11px] font-bold uppercase tracking-[0.14em]">
              Signed in as {user.email}
            </div>
            <EditorActionButton
              className="flex items-center gap-2"
              onClick={() => signOut()}
              variant="ghost"
            >
              <LogOut size={14} />
              Sign Out
            </EditorActionButton>
          </>
        )}
      </div>
    </div>
  );
}
