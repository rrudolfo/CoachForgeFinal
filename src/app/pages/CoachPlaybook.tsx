import { useEffect, useMemo, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { ContentCard } from "../components/ContentCard";
import { LabelTag } from "../components/LabelTag";
import { useEditor } from "../components/editor/EditorProvider";
import { EditorActionButton } from "../components/editor/EditorActionButton";
import { DeleteDialog } from "../components/editor/DeleteDialog";
import { CoachDialog } from "../components/editor/CoachDialog";
import { coachesFallback } from "../../lib/content";
import { createCoach, deleteCoach, listCoaches, updateCoach } from "../../lib/coaches";
import { CoachEntry } from "../../types/content";

const accentColors = {
  blue: "var(--color-cold-blue)",
  pink: "var(--color-label-pink)",
  red: "var(--color-sport-red)",
  yellow: "var(--color-archive-yellow)",
};

function sortCoaches(coaches: CoachEntry[]) {
  return [...coaches].sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name));
}

interface CoachSectionProps {
  canEdit: boolean;
  coach: CoachEntry;
  editMode: boolean;
  onDelete: (coach: CoachEntry) => void;
  onEdit: (coach: CoachEntry) => void;
}

function CoachSection({ canEdit, coach, editMode, onDelete, onEdit }: CoachSectionProps) {
  const accentColor = accentColors[coach.accentColor];
  const accentText = coach.accentColor === "yellow" ? "var(--color-ink-black)" : "#fff";

  return (
    <div
      className="border-4 mb-8"
      style={{
        backgroundColor: "var(--color-paper-white)",
        borderColor: accentColor,
      }}
    >
      <div
        className="p-6 border-b-4"
        style={{
          backgroundColor: accentColor,
          borderColor: "var(--color-ink-black)",
          color: accentText,
        }}
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: "var(--font-display)" }}>
              {coach.name}
            </h2>
            <p className="text-lg mt-2 italic" style={{ fontFamily: "var(--font-body)" }}>
              {coach.philosophy}
            </p>
          </div>

          {canEdit && editMode ? (
            <div className="flex items-center gap-2">
              <EditorActionButton
                variant="ghost"
                className="flex items-center gap-2"
                onClick={() => onEdit(coach)}
              >
                <Pencil size={12} />
                Edit
              </EditorActionButton>
              <EditorActionButton
                variant="danger"
                className="flex items-center gap-2"
                onClick={() => onDelete(coach)}
              >
                <Trash2 size={12} />
                Delete
              </EditorActionButton>
            </div>
          ) : null}
        </div>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <LabelTag variant="red">Key Practices</LabelTag>
          <div className="mt-3 space-y-3">
            {coach.practices.map((practice, index) => (
              <div
                key={`${coach.id}-practice-${index}`}
                className="p-4 border-l-4"
                style={{
                  borderLeftColor: accentColor,
                  backgroundColor: "var(--color-warm-paper)",
                }}
              >
                <h4 className="font-bold text-sm mb-1" style={{ fontFamily: "var(--font-body)" }}>
                  {practice.title}
                </h4>
                <p className="text-sm" style={{ color: "rgb(11 8 15 / 0.87)" }}>
                  {practice.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <LabelTag>In Team/Org Context</LabelTag>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-ink-black)" }}>
            {coach.teamApplication}
          </p>
        </div>

        <div>
          <LabelTag variant="yellow">What AI Can Support</LabelTag>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-ink-black)" }}>
            {coach.aiSupport}
          </p>
        </div>

        <div
          className="p-5 border-2"
          style={{
            borderColor: accentColor,
            backgroundColor: "var(--color-warm-paper)",
          }}
        >
          <LabelTag variant="pink">Ritual Example</LabelTag>
          <h4 className="font-bold mt-3 mb-2" style={{ fontFamily: "var(--font-body)" }}>
            {coach.ritualName}
          </h4>
          <p className="text-sm" style={{ color: "var(--color-ink-black)" }}>
            {coach.ritualDescription}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CoachPlaybook() {
  const { canEdit, editMode } = useEditor();
  const [coaches, setCoaches] = useState<CoachEntry[]>(coachesFallback);
  const [deleteTarget, setDeleteTarget] = useState<CoachEntry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCoach, setSelectedCoach] = useState<CoachEntry | null>(null);

  useEffect(() => {
    let active = true;

    setIsLoading(true);

    listCoaches()
      .then((data) => {
        if (active) {
          setCoaches(sortCoaches(data));
        }
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Unable to load coaches.");
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const orderedCoaches = useMemo(() => sortCoaches(coaches), [coaches]);

  async function handleSave(value: CoachEntry | Omit<CoachEntry, "id">) {
    try {
      const savedCoach = "id" in value ? await updateCoach(value) : await createCoach(value);
      setCoaches((current) => {
        const otherCoaches = current.filter((coach) => coach.id !== savedCoach.id);
        return sortCoaches([...otherCoaches, savedCoach]);
      });
      toast.success("Coach entry saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save coach entry.");
      throw error;
    }
  }

  async function handleDelete() {
    if (!deleteTarget) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteCoach(deleteTarget.id);
      setCoaches((current) => current.filter((coach) => coach.id !== deleteTarget.id));
      setDeleteTarget(null);
      toast.success("Coach entry deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete coach entry.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--color-warm-paper)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <LabelTag variant="red">Elite Coaching</LabelTag>
            <h1
              className="text-4xl md:text-5xl mt-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink-black)",
              }}
            >
              Coach Playbook
            </h1>
            <p className="text-lg mt-2" style={{ color: "rgb(11 8 15 / 0.87)" }}>
              Translating legendary coaching practices into team rituals and AI support
            </p>
          </div>

          {canEdit && editMode ? (
            <EditorActionButton
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedCoach({
                  accentColor: "blue",
                  aiSupport: "",
                  id: "",
                  matrixAiSupport: "",
                  matrixLabel: "",
                  name: "",
                  philosophy: "",
                  practices: [{ title: "", description: "" }],
                  ritualDescription: "",
                  ritualName: "",
                  sortOrder: coaches.length + 1,
                  teamApplication: "",
                });
                setDialogOpen(true);
              }}
            >
              <Plus size={14} />
              Add Coach
            </EditorActionButton>
          ) : null}
        </div>

        <ContentCard className="mb-12">
          <p className="text-sm leading-relaxed mb-4">
            Elite coaches don&apos;t just win games. They build <strong>systems</strong> that create
            consistent excellence. Wooden&apos;s fundamentals, Belichick&apos;s preparation, Guardiola&apos;s
            structure, Saban&apos;s process, these aren&apos;t sports tactics. They&apos;re{" "}
            <strong>operating principles</strong> for any high-performing team.
          </p>
          <p className="text-sm leading-relaxed">
            This playbook translates their practices into organizational rituals and shows how AI can
            support (but never replace) the human coaching function.
          </p>
        </ContentCard>

        {isLoading ? (
          <ContentCard>
            <p className="text-sm">Loading coach playbook...</p>
          </ContentCard>
        ) : orderedCoaches.length === 0 ? (
          <ContentCard>
            <p className="text-sm">No coach entries yet.</p>
          </ContentCard>
        ) : (
          orderedCoaches.map((coach) => (
            <CoachSection
              key={coach.id}
              coach={coach}
              canEdit={canEdit}
              editMode={editMode}
              onEdit={(value) => {
                setSelectedCoach(value);
                setDialogOpen(true);
              }}
              onDelete={setDeleteTarget}
            />
          ))
        )}

        <div className="mt-12">
          <div className="mb-6">
            <LabelTag variant="red">Cross-Reference</LabelTag>
            <h2
              className="text-3xl font-bold mt-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink-black)",
              }}
            >
              Coach Practice → Team Ritual → AI Signal Support
            </h2>
          </div>

          <ContentCard>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: "var(--color-warm-paper)" }}>
                    <th className="p-3 text-left font-bold border" style={{ borderColor: "rgb(11 8 15 / 0.18)" }}>
                      Coach Practice
                    </th>
                    <th className="p-3 text-left font-bold border" style={{ borderColor: "rgb(11 8 15 / 0.18)" }}>
                      Team Ritual
                    </th>
                    <th className="p-3 text-left font-bold border" style={{ borderColor: "rgb(11 8 15 / 0.18)" }}>
                      AI Signal Support
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orderedCoaches.map((coach, index) => (
                    <tr key={`${coach.id}-matrix`} style={index % 2 === 1 ? { backgroundColor: "var(--color-warm-paper)" } : undefined}>
                      <td className="p-3 border" style={{ borderColor: "rgb(11 8 15 / 0.18)" }}>
                        {coach.matrixLabel}
                      </td>
                      <td className="p-3 border" style={{ borderColor: "rgb(11 8 15 / 0.18)" }}>
                        {coach.ritualName}
                      </td>
                      <td className="p-3 border" style={{ borderColor: "rgb(11 8 15 / 0.18)" }}>
                        {coach.matrixAiSupport}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ContentCard>
        </div>
      </div>

      <CoachDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setSelectedCoach(null);
          }
        }}
        initialValue={selectedCoach}
        onSave={handleSave}
      />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Delete Coach Entry"
        description={`Remove "${deleteTarget?.name ?? ""}" from the Coach Playbook?`}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
