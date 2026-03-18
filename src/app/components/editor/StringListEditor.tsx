import { Input } from "../ui/input";
import { EditorActionButton } from "./EditorActionButton";

interface StringListEditorProps {
  addLabel: string;
  items: string[];
  label: string;
  onChange: (items: string[]) => void;
  placeholder?: string;
}

export function StringListEditor({
  addLabel,
  items,
  label,
  onChange,
  placeholder = "Add text",
}: StringListEditorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="block text-xs font-bold uppercase tracking-[0.14em]">{label}</label>
        <EditorActionButton
          variant="ghost"
          onClick={() => onChange([...items, ""])}
        >
          {addLabel}
        </EditorActionButton>
      </div>

      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={`${label}-${index}`} className="flex items-start gap-2">
            <Input
              value={item}
              onChange={(event) => {
                const nextItems = [...items];
                nextItems[index] = event.target.value;
                onChange(nextItems);
              }}
              placeholder={placeholder}
              className="rounded-none"
            />
            <EditorActionButton
              variant="danger"
              onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
            >
              Remove
            </EditorActionButton>
          </div>
        ))}
      </div>
    </div>
  );
}
