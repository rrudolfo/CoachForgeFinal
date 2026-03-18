import { useEffect, useMemo, useState } from "react";
import {
  FileText,
  GraduationCap,
  MessageSquare,
  Pencil,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { ContentCard } from "../components/ContentCard";
import { LabelTag } from "../components/LabelTag";
import { useEditor } from "../components/editor/EditorProvider";
import { EditorActionButton } from "../components/editor/EditorActionButton";
import { DeleteDialog } from "../components/editor/DeleteDialog";
import { StandardItemDialog } from "../components/editor/StandardItemDialog";
import { StandardsFamilyDialog } from "../components/editor/StandardsFamilyDialog";
import {
  createStandardItem,
  createStandardsFamily,
  deleteStandardItem,
  deleteStandardsFamily,
  listStandardsFamilies,
  updateStandardItem,
  updateStandardsFamily,
} from "../../lib/standards";
import { standardsFamiliesFallback } from "../../lib/content";
import { StandardItem, StandardsFamily, StandardsIconKey } from "../../types/content";

const familyIcons: Record<StandardsIconKey, typeof FileText | typeof MessageSquare | typeof GraduationCap> = {
  "file-text": FileText,
  "graduation-cap": GraduationCap,
  "message-square": MessageSquare,
};

const familyColors = {
  blue: "var(--color-cold-blue)",
  pink: "var(--color-label-pink)",
  red: "var(--color-sport-red)",
  yellow: "var(--color-archive-yellow)",
};

function sortFamilies(families: StandardsFamily[]) {
  return [...families]
    .map((family) => ({
      ...family,
      standards: [...family.standards].sort(
        (left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name),
      ),
    }))
    .sort((left, right) => left.sortOrder - right.sortOrder || left.name.localeCompare(right.name));
}

interface StandardCardProps {
  canEdit: boolean;
  editMode: boolean;
  onDelete: (standard: StandardItem) => void;
  onEdit: (standard: StandardItem) => void;
  standard: StandardItem;
}

function StandardCard({ canEdit, editMode, onDelete, onEdit, standard }: StandardCardProps) {
  return (
    <div
      className="p-5 border-2 mb-4"
      style={{
        backgroundColor: "var(--color-paper-white)",
        borderColor: "rgb(11 8 15 / 0.18)",
      }}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-body)" }}>
          {standard.name}
        </h3>

        {canEdit && editMode ? (
          <div className="flex items-center gap-2 shrink-0">
            <EditorActionButton
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => onEdit(standard)}
            >
              <Pencil size={12} />
              Edit
            </EditorActionButton>
            <EditorActionButton
              variant="danger"
              className="flex items-center gap-2"
              onClick={() => onDelete(standard)}
            >
              <Trash2 size={12} />
              Delete
            </EditorActionButton>
          </div>
        ) : null}
      </div>

      <div className="space-y-4">
        <div>
          <LabelTag>Definition</LabelTag>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: "var(--color-ink-black)" }}>
            {standard.definition}
          </p>
        </div>

        <div>
          <LabelTag variant="yellow">Observable Signals</LabelTag>
          <ul className="mt-2 space-y-1">
            {standard.signals.map((signal, index) => (
              <li key={`${standard.id}-signal-${index}`} className="text-sm flex items-start gap-2">
                <span style={{ color: "var(--color-sport-red)" }}>•</span>
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <LabelTag>Measurement Sources</LabelTag>
            <ul className="mt-2 space-y-1">
              {standard.sources.map((source, index) => (
                <li
                  key={`${standard.id}-source-${index}`}
                  className="text-xs"
                  style={{ color: "rgb(11 8 15 / 0.87)" }}
                >
                  → {source}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <LabelTag variant="red">Threshold / Watchout</LabelTag>
            <p className="text-xs mt-2" style={{ color: "rgb(11 8 15 / 0.87)" }}>
              {standard.threshold}
            </p>
          </div>
        </div>

        <div
          className="p-3 border-l-4"
          style={{
            borderLeftColor: "var(--color-sport-red)",
            backgroundColor: "var(--color-warm-paper)",
          }}
        >
          <p className="text-xs font-bold uppercase tracking-wide mb-1">Risk if Absent</p>
          <p className="text-sm" style={{ color: "var(--color-ink-black)" }}>
            {standard.risk}
          </p>
        </div>
      </div>
    </div>
  );
}

export function StandardsLibrary() {
  const { canEdit, editMode } = useEditor();
  const [deleteFamilyTarget, setDeleteFamilyTarget] = useState<StandardsFamily | null>(null);
  const [deleteStandardTarget, setDeleteStandardTarget] = useState<StandardItem | null>(null);
  const [familyDialogOpen, setFamilyDialogOpen] = useState(false);
  const [families, setFamilies] = useState<StandardsFamily[]>(standardsFamiliesFallback);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFamily, setSelectedFamily] = useState<StandardsFamily | null>(null);
  const [selectedStandard, setSelectedStandard] = useState<StandardItem | null>(null);
  const [standardDialogFamilyId, setStandardDialogFamilyId] = useState<string>("");
  const [standardDialogOpen, setStandardDialogOpen] = useState(false);

  useEffect(() => {
    let active = true;

    setIsLoading(true);

    listStandardsFamilies()
      .then((data) => {
        if (active) {
          setFamilies(sortFamilies(data));
        }
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Unable to load standards.");
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

  const orderedFamilies = useMemo(() => sortFamilies(families), [families]);

  async function handleSaveFamily(
    value: StandardsFamily | Omit<StandardsFamily, "id" | "standards">,
  ) {
    try {
      const savedFamily =
        "id" in value ? await updateStandardsFamily(value) : await createStandardsFamily(value);

      setFamilies((current) => {
        const existingStandards =
          current.find((family) => family.id === savedFamily.id)?.standards ?? savedFamily.standards;
        const otherFamilies = current.filter((family) => family.id !== savedFamily.id);
        return sortFamilies([...otherFamilies, { ...savedFamily, standards: existingStandards }]);
      });

      toast.success("Standards family saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save standards family.");
      throw error;
    }
  }

  async function handleSaveStandard(value: StandardItem | Omit<StandardItem, "id">) {
    try {
      const savedStandard =
        "id" in value ? await updateStandardItem(value) : await createStandardItem(value);

      setFamilies((current) =>
        sortFamilies(
          current.map((family) =>
            family.id === savedStandard.familyId
              ? {
                  ...family,
                  standards: [...family.standards.filter((standard) => standard.id !== savedStandard.id), savedStandard].sort(
                    (left, right) =>
                      left.sortOrder - right.sortOrder || left.name.localeCompare(right.name),
                  ),
                }
              : family,
          ),
        ),
      );

      toast.success("Standard saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save standard.");
      throw error;
    }
  }

  async function handleDeleteFamily() {
    if (!deleteFamilyTarget) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteStandardsFamily(deleteFamilyTarget.id);
      setFamilies((current) => current.filter((family) => family.id !== deleteFamilyTarget.id));
      setDeleteFamilyTarget(null);
      toast.success("Standards family deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete standards family.");
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleDeleteStandard() {
    if (!deleteStandardTarget) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteStandardItem(deleteStandardTarget.id);
      setFamilies((current) =>
        current.map((family) =>
          family.id === deleteStandardTarget.familyId
            ? {
                ...family,
                standards: family.standards.filter((standard) => standard.id !== deleteStandardTarget.id),
              }
            : family,
        ),
      );
      setDeleteStandardTarget(null);
      toast.success("Standard deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete standard.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--color-warm-paper)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <LabelTag variant="red">Foundation</LabelTag>
            <h1
              className="text-4xl md:text-5xl mt-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink-black)",
              }}
            >
              Standards Library
            </h1>
            <p className="text-lg mt-2" style={{ color: "rgb(11 8 15 / 0.87)" }}>
              Complete behavior taxonomy with observable signals, thresholds, and risks
            </p>
          </div>

          {canEdit && editMode ? (
            <EditorActionButton
              className="flex items-center gap-2"
              onClick={() => {
                setSelectedFamily({
                  color: "blue",
                  description: "",
                  icon: "file-text",
                  id: "",
                  name: "",
                  sortOrder: families.length + 1,
                  standards: [],
                });
                setFamilyDialogOpen(true);
              }}
            >
              <Plus size={14} />
              Add Family
            </EditorActionButton>
          ) : null}
        </div>

        <ContentCard className="mb-12">
          <p className="text-sm leading-relaxed mb-4">
            Culture is not what teams say. It&apos;s what they do. This library defines{" "}
            <strong>measurable behaviors</strong> that create healthy, high-performing teams. Each
            standard includes observable signals, measurement sources, watchout thresholds, and the risks
            that emerge when the behavior is absent.
          </p>
          <p className="text-sm leading-relaxed">
            These standards are organized into three families: <strong>How People Work</strong>,{" "}
            <strong>How People Talk</strong>, and <strong>How People Learn</strong>. Together, they form
            the foundation of the Coach Forge operating system.
          </p>
        </ContentCard>

        {isLoading ? (
          <ContentCard>
            <p className="text-sm">Loading standards library...</p>
          </ContentCard>
        ) : orderedFamilies.length === 0 ? (
          <ContentCard>
            <p className="text-sm">No standards families yet.</p>
          </ContentCard>
        ) : (
          orderedFamilies.map((family) => {
            const Icon = familyIcons[family.icon];
            return (
              <section key={family.id} className="mb-12">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-16 h-16 flex items-center justify-center"
                      style={{ backgroundColor: familyColors[family.color] }}
                    >
                      <Icon className="text-white" size={32} />
                    </div>
                    <div>
                      <LabelTag>{family.name}</LabelTag>
                      <h2
                        className="text-3xl font-bold mt-2"
                        style={{
                          fontFamily: "var(--font-display)",
                          color: "var(--color-ink-black)",
                        }}
                      >
                        {family.name}
                      </h2>
                      {family.description ? (
                        <p className="text-sm mt-2" style={{ color: "rgb(11 8 15 / 0.87)" }}>
                          {family.description}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  {canEdit && editMode ? (
                    <div className="flex flex-wrap items-center gap-2">
                      <EditorActionButton
                        className="flex items-center gap-2"
                        variant="ghost"
                        onClick={() => {
                          setStandardDialogFamilyId(family.id);
                          setSelectedStandard({
                            definition: "",
                            familyId: family.id,
                            id: "",
                            name: "",
                            risk: "",
                            signals: [""],
                            sortOrder: family.standards.length + 1,
                            sources: [""],
                            threshold: "",
                          });
                          setStandardDialogOpen(true);
                        }}
                      >
                        <Plus size={12} />
                        Add Standard
                      </EditorActionButton>
                      <EditorActionButton
                        className="flex items-center gap-2"
                        variant="ghost"
                        onClick={() => {
                          setSelectedFamily(family);
                          setFamilyDialogOpen(true);
                        }}
                      >
                        <Pencil size={12} />
                        Edit Family
                      </EditorActionButton>
                      <EditorActionButton
                        className="flex items-center gap-2"
                        variant="danger"
                        onClick={() => setDeleteFamilyTarget(family)}
                      >
                        <Trash2 size={12} />
                        Delete Family
                      </EditorActionButton>
                    </div>
                  ) : null}
                </div>

                <div className="space-y-4">
                  {family.standards.length === 0 ? (
                    <ContentCard>
                      <p className="text-sm">No standards in this family yet.</p>
                    </ContentCard>
                  ) : (
                    family.standards.map((standard) => (
                      <StandardCard
                        key={standard.id}
                        standard={standard}
                        canEdit={canEdit}
                        editMode={editMode}
                        onEdit={(value) => {
                          setSelectedStandard(value);
                          setStandardDialogFamilyId(family.id);
                          setStandardDialogOpen(true);
                        }}
                        onDelete={setDeleteStandardTarget}
                      />
                    ))
                  )}
                </div>
              </section>
            );
          })
        )}
      </div>

      <StandardsFamilyDialog
        open={familyDialogOpen}
        onOpenChange={(open) => {
          setFamilyDialogOpen(open);
          if (!open) {
            setSelectedFamily(null);
          }
        }}
        initialValue={selectedFamily}
        onSave={handleSaveFamily}
      />

      <StandardItemDialog
        open={standardDialogOpen}
        onOpenChange={(open) => {
          setStandardDialogOpen(open);
          if (!open) {
            setSelectedStandard(null);
          }
        }}
        familyId={standardDialogFamilyId}
        initialValue={selectedStandard}
        onSave={handleSaveStandard}
      />

      <DeleteDialog
        open={Boolean(deleteFamilyTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteFamilyTarget(null);
          }
        }}
        title="Delete Standards Family"
        description={`Remove "${deleteFamilyTarget?.name ?? ""}" and all of its standards?`}
        onConfirm={handleDeleteFamily}
        isDeleting={isDeleting}
      />

      <DeleteDialog
        open={Boolean(deleteStandardTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteStandardTarget(null);
          }
        }}
        title="Delete Standard"
        description={`Remove "${deleteStandardTarget?.name ?? ""}" from the library?`}
        onConfirm={handleDeleteStandard}
        isDeleting={isDeleting}
      />
    </div>
  );
}
