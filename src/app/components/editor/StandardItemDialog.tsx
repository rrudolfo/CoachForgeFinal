import { FormEvent, useEffect, useState } from "react";
import { StandardItem } from "../../../types/content";
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
import { StringListEditor } from "./StringListEditor";

interface StandardItemDialogProps {
  familyId: string;
  initialValue?: StandardItem | null;
  onOpenChange: (open: boolean) => void;
  onSave: (value: StandardItem | Omit<StandardItem, "id">) => Promise<void>;
  open: boolean;
}

function buildInitialValue(familyId: string, standard?: StandardItem | null) {
  return {
    definition: standard?.definition ?? "",
    familyId,
    name: standard?.name ?? "",
    risk: standard?.risk ?? "",
    signals: standard?.signals ?? [""],
    sortOrder: standard?.sortOrder ?? 0,
    sources: standard?.sources ?? [""],
    threshold: standard?.threshold ?? "",
  };
}

export function StandardItemDialog({
  familyId,
  initialValue,
  onOpenChange,
  onSave,
  open,
}: StandardItemDialogProps) {
  const isEditing = Boolean(initialValue?.id);
  const [formState, setFormState] = useState(buildInitialValue(familyId, initialValue));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (open) {
      setFormState(buildInitialValue(familyId, initialValue));
    }
  }, [familyId, initialValue, open]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);

    const payload = {
      ...formState,
      signals: formState.signals.map((item) => item.trim()).filter(Boolean),
      sources: formState.sources.map((item) => item.trim()).filter(Boolean),
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
        className="max-w-3xl border-2 rounded-none"
        style={{
          borderColor: "var(--color-ink-black)",
          backgroundColor: "var(--color-paper-white)",
          fontFamily: "var(--font-body)",
        }}
      >
        <DialogHeader>
          <DialogTitle style={{ fontFamily: "var(--font-display)" }}>
            {isEditing ? "Edit Standard" : "Add Standard"}
          </DialogTitle>
          <DialogDescription style={{ color: "var(--color-ink-black)" }}>
            Preserve the current StandardCard structure while updating the definition, signals, and risks.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-[1fr_140px]">
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
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Definition</label>
            <Textarea
              value={formState.definition}
              onChange={(event) =>
                setFormState((current) => ({ ...current, definition: event.target.value }))
              }
              className="rounded-none min-h-24"
              required
            />
          </div>

          <StringListEditor
            label="Observable Signals"
            items={formState.signals}
            onChange={(signals) => setFormState((current) => ({ ...current, signals }))}
            addLabel="Add Signal"
            placeholder="Observable signal"
          />

          <StringListEditor
            label="Measurement Sources"
            items={formState.sources}
            onChange={(sources) => setFormState((current) => ({ ...current, sources }))}
            addLabel="Add Source"
            placeholder="Measurement source"
          />

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Threshold / Watchout</label>
            <Textarea
              value={formState.threshold}
              onChange={(event) =>
                setFormState((current) => ({ ...current, threshold: event.target.value }))
              }
              className="rounded-none min-h-20"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Risk if Absent</label>
            <Textarea
              value={formState.risk}
              onChange={(event) => setFormState((current) => ({ ...current, risk: event.target.value }))}
              className="rounded-none min-h-20"
            />
          </div>

          <div className="flex justify-end">
            <EditorActionButton disabled={isSaving} type="submit">
              {isSaving ? "Saving..." : "Save Standard"}
            </EditorActionButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
