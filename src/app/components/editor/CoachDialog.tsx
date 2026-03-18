import { FormEvent, useEffect, useState } from "react";
import { CoachEntry, CoachPractice } from "../../../types/content";
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
import { ObjectListEditor } from "./ObjectListEditor";

interface CoachDialogProps {
  initialValue?: CoachEntry | null;
  onOpenChange: (open: boolean) => void;
  onSave: (value: CoachEntry | Omit<CoachEntry, "id">) => Promise<void>;
  open: boolean;
}

function createPractice(): CoachPractice {
  return {
    title: "",
    description: "",
  };
}

function buildInitialValue(coach?: CoachEntry | null) {
  return {
    accentColor: coach?.accentColor ?? "blue",
    aiSupport: coach?.aiSupport ?? "",
    matrixAiSupport: coach?.matrixAiSupport ?? "",
    matrixLabel: coach?.matrixLabel ?? "",
    name: coach?.name ?? "",
    philosophy: coach?.philosophy ?? "",
    practices: coach?.practices?.length ? coach.practices : [createPractice()],
    ritualDescription: coach?.ritualDescription ?? "",
    ritualName: coach?.ritualName ?? "",
    sortOrder: coach?.sortOrder ?? 0,
    teamApplication: coach?.teamApplication ?? "",
  };
}

export function CoachDialog({ initialValue, onOpenChange, onSave, open }: CoachDialogProps) {
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

    const payload = {
      ...formState,
      practices: formState.practices.filter(
        (practice) => practice.title.trim() || practice.description.trim(),
      ),
    };

    try {
      if (isEditing && initialValue) {
        await onSave({ ...initialValue, ...payload });
      } else {
        await onSave(payload);
      }
      onOpenChange(false);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl border-2 rounded-none"
        style={{
          borderColor: "var(--color-ink-black)",
          backgroundColor: "var(--color-paper-white)",
          fontFamily: "var(--font-body)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-display)" }}>
            {isEditing ? "Edit Coach" : "Add Coach"}
          </DialogTitle>
          <DialogDescription style={{ color: "var(--color-ink-black)" }}>
            Preserve the current CoachSection look while updating practices, ritual framing, and matrix copy.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-[1fr_160px_140px]">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Coach Name</label>
              <Input
                value={formState.name}
                onChange={(event) => setFormState((current) => ({ ...current, name: event.target.value }))}
                className="rounded-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Accent Color</label>
              <select
                value={formState.accentColor}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    accentColor: event.target.value as CoachEntry["accentColor"],
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

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Philosophy</label>
            <Textarea
              value={formState.philosophy}
              onChange={(event) =>
                setFormState((current) => ({ ...current, philosophy: event.target.value }))
              }
              className="rounded-none min-h-20"
              required
            />
          </div>

          <ObjectListEditor
            label="Key Practices"
            items={formState.practices}
            onChange={(practices) => setFormState((current) => ({ ...current, practices }))}
            addLabel="Add Practice"
            createItem={createPractice}
            fields={[
              { key: "title", label: "Practice Title", placeholder: "Practice title" },
              {
                key: "description",
                label: "Practice Description",
                multiline: true,
                placeholder: "Describe the practice",
              },
            ]}
          />

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Team / Org Context</label>
            <Textarea
              value={formState.teamApplication}
              onChange={(event) =>
                setFormState((current) => ({ ...current, teamApplication: event.target.value }))
              }
              className="rounded-none min-h-24"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">AI Support</label>
            <Textarea
              value={formState.aiSupport}
              onChange={(event) =>
                setFormState((current) => ({ ...current, aiSupport: event.target.value }))
              }
              className="rounded-none min-h-24"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Ritual Name</label>
              <Input
                value={formState.ritualName}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, ritualName: event.target.value }))
                }
                className="rounded-none"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Matrix Label</label>
              <Input
                value={formState.matrixLabel}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, matrixLabel: event.target.value }))
                }
                className="rounded-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Ritual Description</label>
            <Textarea
              value={formState.ritualDescription}
              onChange={(event) =>
                setFormState((current) => ({ ...current, ritualDescription: event.target.value }))
              }
              className="rounded-none min-h-24"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Matrix AI Support</label>
            <Textarea
              value={formState.matrixAiSupport}
              onChange={(event) =>
                setFormState((current) => ({ ...current, matrixAiSupport: event.target.value }))
              }
              className="rounded-none min-h-20"
            />
          </div>

          <div className="flex justify-end">
            <EditorActionButton disabled={isSaving} type="submit">
              {isSaving ? "Saving..." : "Save Coach"}
            </EditorActionButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
