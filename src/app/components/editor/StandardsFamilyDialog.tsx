import { FormEvent, useEffect, useState } from "react";
import { StandardsFamily } from "../../../types/content";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { EditorActionButton } from "./EditorActionButton";

interface StandardsFamilyDialogProps {
  initialValue?: StandardsFamily | null;
  onOpenChange: (open: boolean) => void;
  onSave: (value: StandardsFamily | Omit<StandardsFamily, "id" | "standards">) => Promise<void>;
  open: boolean;
}

function buildInitialValue(family?: StandardsFamily | null) {
  return {
    color: family?.color ?? "blue",
    description: family?.description ?? "",
    icon: family?.icon ?? "file-text",
    name: family?.name ?? "",
    sortOrder: family?.sortOrder ?? 0,
  };
}

export function StandardsFamilyDialog({
  initialValue,
  onOpenChange,
  onSave,
  open,
}: StandardsFamilyDialogProps) {
  const isEditing = Boolean(initialValue?.id);
  const [formState, setFormState] = useState(buildInitialValue(initialValue));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setFormState(buildInitialValue(initialValue));
    }
  }, [initialValue, open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    try {
      if (isEditing && initialValue) {
        await onSave({ ...initialValue, ...formState });
      } else {
        await onSave(formState);
      }
      onOpenChange(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="border-2 rounded-none"
        style={{
          borderColor: "var(--color-ink-black)",
          backgroundColor: "var(--color-paper-white)",
          fontFamily: "var(--font-body)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-display)" }}>
            {isEditing ? "Edit Standards Family" : "Add Standards Family"}
          </DialogTitle>
          <DialogDescription style={{ color: "var(--color-ink-black)" }}>
            Update the family heading, icon, and color while preserving the current section layout.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Name</label>
            <Input
              value={formState.name}
              onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
              className="rounded-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Description</label>
            <Textarea
              value={formState.description}
              onChange={(event) =>
                setFormState((current) => ({ ...current, description: event.target.value }))
              }
              className="rounded-none min-h-20"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Icon</label>
              <select
                value={formState.icon}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    icon: event.target.value as StandardsFamily["icon"],
                  }))
                }
                className="flex h-9 w-full rounded-none border px-3 text-sm"
                style={{ borderColor: "var(--color-ink-black)", backgroundColor: "var(--color-paper-white)" }}
              >
                <option value="file-text">File Text</option>
                <option value="message-square">Message Square</option>
                <option value="graduation-cap">Graduation Cap</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Color</label>
              <select
                value={formState.color}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    color: event.target.value as StandardsFamily["color"],
                  }))
                }
                className="flex h-9 w-full rounded-none border px-3 text-sm"
                style={{ borderColor: "var(--color-ink-black)", backgroundColor: "var(--color-paper-white)" }}
              >
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="pink">Pink</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Sort Order</label>
              <Input
                type="number"
                value={String(formState.sortOrder)}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    sortOrder: Number(event.target.value) || 0,
                  }))
                }
                className="rounded-none"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <EditorActionButton disabled={isSaving} type="submit">
              {isSaving ? "Saving..." : "Save Family"}
            </EditorActionButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
