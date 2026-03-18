import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useEditor } from "./EditorProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { EditorActionButton } from "./EditorActionButton";

export function EditorAccessDialog() {
  const { authDialogOpen, hasSupabaseConfig, setAuthDialogOpen, signIn } = useEditor();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!hasSupabaseConfig) {
      toast.error("Supabase is not configured yet.");
      return;
    }

    setIsSubmitting(true);

    try {
      await signIn(email, password);
      setPassword("");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
      <DialogContent
        className="border-2 rounded-none"
        style={{
          borderColor: "var(--color-ink-black)",
          backgroundColor: "var(--color-paper-white)",
          fontFamily: "var(--font-body)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-display)" }}>Editor Access</DialogTitle>
          <DialogDescription style={{ color: "var(--color-ink-black)" }}>
            Sign in with an authorized Supabase account to enable Edit Mode.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Email</label>
            <Input
              autoComplete="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              required
              className="rounded-none"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Password</label>
            <Input
              autoComplete="current-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              required
              className="rounded-none"
              style={{ fontFamily: "var(--font-body)" }}
            />
          </div>

          <div
            className="border p-3 text-xs leading-relaxed"
            style={{
              borderColor: "var(--color-ink-black)",
              backgroundColor: "var(--color-warm-paper)",
            }}
          >
            Public visitors can view everything. Only whitelisted authenticated users can create,
            update, or delete records.
          </div>

          <div className="flex justify-end">
            <EditorActionButton disabled={isSubmitting} type="submit">
              {isSubmitting ? "Signing In" : "Sign In"}
            </EditorActionButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
