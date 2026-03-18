import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { EditorActionButton } from "./EditorActionButton";

interface ObjectFieldDefinition<T extends Record<string, string>> {
  key: keyof T;
  label: string;
  multiline?: boolean;
  placeholder?: string;
}

interface ObjectListEditorProps<T extends Record<string, string>> {
  addLabel: string;
  fields: ObjectFieldDefinition<T>[];
  items: T[];
  label: string;
  onChange: (items: T[]) => void;
  createItem: () => T;
}

export function ObjectListEditor<T extends Record<string, string>>({
  addLabel,
  createItem,
  fields,
  items,
  label,
  onChange,
}: ObjectListEditorProps<T>) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="block text-xs font-bold uppercase tracking-[0.14em]">{label}</label>
        <EditorActionButton variant="ghost" onClick={() => onChange([...items, createItem()])}>
          {addLabel}
        </EditorActionButton>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={`${label}-${index}`}
            className="border p-3 space-y-3"
            style={{
              borderColor: "var(--color-ink-black)",
              backgroundColor: "var(--color-warm-paper)",
            }}
          >
            {fields.map((field) => {
              const value = item[field.key] ?? "";

              return (
                <div key={String(field.key)} className="space-y-2">
                  <label className="block text-[11px] font-bold uppercase tracking-[0.14em]">
                    {field.label}
                  </label>
                  {field.multiline ? (
                    <Textarea
                      value={value}
                      onChange={(event) => {
                        const nextItems = [...items];
                        nextItems[index] = {
                          ...item,
                          [field.key]: event.target.value,
                        };
                        onChange(nextItems);
                      }}
                      placeholder={field.placeholder}
                      className="rounded-none min-h-24"
                    />
                  ) : (
                    <Input
                      value={value}
                      onChange={(event) => {
                        const nextItems = [...items];
                        nextItems[index] = {
                          ...item,
                          [field.key]: event.target.value,
                        };
                        onChange(nextItems);
                      }}
                      placeholder={field.placeholder}
                      className="rounded-none"
                    />
                  )}
                </div>
              );
            })}

            <div className="flex justify-end">
              <EditorActionButton
                variant="danger"
                onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              >
                Remove
              </EditorActionButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
