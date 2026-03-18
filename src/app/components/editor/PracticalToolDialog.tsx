import { FormEvent, useEffect, useState } from "react";
import { PracticalTool, PracticalToolItem } from "../../../types/content";
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

interface PracticalToolDialogProps {
  initialValue?: PracticalTool | null;
  onOpenChange: (open: boolean) => void;
  onSave: (value: PracticalTool | Omit<PracticalTool, "id">) => Promise<void>;
  open: boolean;
}

function createEmptyItem(): PracticalToolItem {
  return {
    marker: "bullet",
    text: "",
    title: "",
    description: "",
  };
}

function buildInitialValue(tool?: PracticalTool | null) {
  return {
    accent: tool?.accent ?? "none",
    category: tool?.category ?? "Toolkit",
    description: tool?.description ?? "",
    icon: tool?.icon ?? "none",
    items: tool?.items?.length ? tool.items : [createEmptyItem()],
    link: tool?.link ?? "",
    sortOrder: tool?.sortOrder ?? 0,
    title: tool?.title ?? "",
  };
}

export function PracticalToolDialog({
  initialValue,
  onOpenChange,
  onSave,
  open,
}: PracticalToolDialogProps) {
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
      items: formState.items.filter((item) => item.text.trim() || item.description?.trim()),
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
            {isEditing ? "Edit Practical Tool" : "Add Practical Tool"}
          </DialogTitle>
          <DialogDescription style={{ color: "var(--color-ink-black)" }}>
            Keep the existing card layout. Update the content, accent, icon, and ordered list items.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Title</label>
              <Input
                value={formState.title}
                onChange={(event) => setFormState((current) => ({ ...current, title: event.target.value }))}
                className="rounded-none"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Category</label>
              <Input
                value={formState.category}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, category: event.target.value }))
                }
                className="rounded-none"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Accent</label>
              <select
                value={formState.accent}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, accent: event.target.value as PracticalTool["accent"] }))
                }
                className="flex h-9 w-full rounded-none border px-3 text-sm"
                style={{ borderColor: "var(--color-ink-black)", backgroundColor: "var(--color-paper-white)" }}
              >
                <option value="none">None</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="pink">Pink</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Icon</label>
              <select
                value={formState.icon}
                onChange={(event) =>
                  setFormState((current) => ({ ...current, icon: event.target.value as PracticalTool["icon"] }))
                }
                className="flex h-9 w-full rounded-none border px-3 text-sm"
                style={{ borderColor: "var(--color-ink-black)", backgroundColor: "var(--color-paper-white)" }}
              >
                <option value="none">None</option>
                <option value="file-check">File Check</option>
                <option value="lightbulb">Lightbulb</option>
                <option value="users">Users</option>
                <option value="book-open">Book Open</option>
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
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Link</label>
              <Input
                value={formState.link}
                onChange={(event) => setFormState((current) => ({ ...current, link: event.target.value }))}
                className="rounded-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-[0.14em]">Description</label>
            <Textarea
              value={formState.description}
              onChange={(event) =>
                setFormState((current) => ({ ...current, description: event.target.value }))
              }
              className="rounded-none min-h-24"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <label className="block text-xs font-bold uppercase tracking-[0.14em]">Card Items</label>
              <EditorActionButton
                variant="ghost"
                onClick={() =>
                  setFormState((current) => ({
                    ...current,
                    items: [...current.items, createEmptyItem()],
                  }))
                }
              >
                Add Item
              </EditorActionButton>
            </div>

            <div className="space-y-3">
              {formState.items.map((item, index) => (
                <div
                  key={`tool-item-${index}`}
                  className="border p-3 space-y-3"
                  style={{
                    borderColor: "var(--color-ink-black)",
                    backgroundColor: "var(--color-warm-paper)",
                  }}
                >
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em]">
                        Marker
                      </label>
                      <select
                        value={item.marker}
                        onChange={(event) => {
                          const nextItems = [...formState.items];
                          nextItems[index] = {
                            ...item,
                            marker: event.target.value as PracticalToolItem["marker"],
                          };
                          setFormState((current) => ({ ...current, items: nextItems }));
                        }}
                        className="flex h-9 w-full rounded-none border px-3 text-sm"
                        style={{
                          borderColor: "var(--color-ink-black)",
                          backgroundColor: "var(--color-paper-white)",
                        }}
                      >
                        <option value="bullet">Bullet</option>
                        <option value="checkbox">Checkbox</option>
                        <option value="arrow">Arrow</option>
                        <option value="question">Question</option>
                        <option value="check">Check</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-[11px] font-bold uppercase tracking-[0.14em]">
                        Item Title
                      </label>
                      <Input
                        value={item.title ?? ""}
                        onChange={(event) => {
                          const nextItems = [...formState.items];
                          nextItems[index] = { ...item, title: event.target.value };
                          setFormState((current) => ({ ...current, items: nextItems }));
                        }}
                        className="rounded-none"
                        placeholder="Optional heading"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em]">
                      Main Text
                    </label>
                    <Input
                      value={item.text}
                      onChange={(event) => {
                        const nextItems = [...formState.items];
                        nextItems[index] = { ...item, text: event.target.value };
                        setFormState((current) => ({ ...current, items: nextItems }));
                      }}
                      className="rounded-none"
                      placeholder="Line content"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-[0.14em]">
                      Supporting Description
                    </label>
                    <Textarea
                      value={item.description ?? ""}
                      onChange={(event) => {
                        const nextItems = [...formState.items];
                        nextItems[index] = { ...item, description: event.target.value };
                        setFormState((current) => ({ ...current, items: nextItems }));
                      }}
                      className="rounded-none min-h-20"
                      placeholder="Optional detail text"
                    />
                  </div>

                  <div className="flex justify-end">
                    <EditorActionButton
                      variant="danger"
                      onClick={() =>
                        setFormState((current) => ({
                          ...current,
                          items: current.items.filter((_, itemIndex) => itemIndex !== index),
                        }))
                      }
                    >
                      Remove Item
                    </EditorActionButton>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <EditorActionButton disabled={isSaving} type="submit">
              {isSaving ? "Saving..." : "Save Tool"}
            </EditorActionButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
