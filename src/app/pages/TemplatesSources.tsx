import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  FileCheck,
  Lightbulb,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { toast } from "sonner";
import { ContentCard } from "../components/ContentCard";
import { LabelTag } from "../components/LabelTag";
import { useEditor } from "../components/editor/EditorProvider";
import { EditorActionButton } from "../components/editor/EditorActionButton";
import { PracticalToolDialog } from "../components/editor/PracticalToolDialog";
import { DeleteDialog } from "../components/editor/DeleteDialog";
import { deletePracticalTool, listPracticalTools, createPracticalTool, updatePracticalTool } from "../../lib/practical-tools";
import { practicalToolsFallback, researchSourcesFallback } from "../../lib/content";
import { PracticalTool, PracticalToolIconKey } from "../../types/content";

const toolIcons: Record<PracticalToolIconKey, typeof FileCheck | typeof Lightbulb | typeof Users | typeof BookOpen | null> = {
  "book-open": BookOpen,
  "file-check": FileCheck,
  lightbulb: Lightbulb,
  none: null,
  users: Users,
};

function sortTools(tools: PracticalTool[]) {
  return [...tools].sort((left, right) => left.sortOrder - right.sortOrder || left.title.localeCompare(right.title));
}

function getToolMarker(marker: PracticalTool["items"][number]["marker"]) {
  switch (marker) {
    case "arrow":
      return "→";
    case "check":
      return "✓";
    case "checkbox":
      return "□";
    case "question":
      return "?";
    default:
      return "•";
  }
}

export function TemplatesSources() {
  const { canEdit, editMode } = useEditor();
  const [deleteTarget, setDeleteTarget] = useState<PracticalTool | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTool, setSelectedTool] = useState<PracticalTool | null>(null);
  const [tools, setTools] = useState<PracticalTool[]>(practicalToolsFallback);

  useEffect(() => {
    let active = true;

    setIsLoading(true);

    listPracticalTools()
      .then((data) => {
        if (!active) {
          return;
        }

        setTools(sortTools(data));
      })
      .catch((error) => {
        toast.error(error instanceof Error ? error.message : "Unable to load practical tools.");
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

  const orderedTools = useMemo(() => sortTools(tools), [tools]);

  async function handleSave(value: PracticalTool | Omit<PracticalTool, "id">) {
    setIsSaving(true);

    try {
      const savedTool =
        "id" in value ? await updatePracticalTool(value) : await createPracticalTool(value);

      setTools((current) => {
        const otherTools = current.filter((tool) => tool.id !== savedTool.id);
        return sortTools([...otherTools, savedTool]);
      });

      toast.success("Practical tool saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to save practical tool.");
      throw error;
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) {
      return;
    }

    setIsDeleting(true);

    try {
      await deletePracticalTool(deleteTarget.id);
      setTools((current) => current.filter((tool) => tool.id !== deleteTarget.id));
      setDeleteTarget(null);
      toast.success("Practical tool deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to delete practical tool.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: "var(--color-warm-paper)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <LabelTag variant="red">Resources</LabelTag>
          <h1
            className="text-4xl md:text-5xl mt-4"
            style={{
              fontFamily: "var(--font-display)",
              color: "var(--color-ink-black)",
            }}
          >
            Templates + Sources
          </h1>
          <p className="text-lg mt-2" style={{ color: "rgb(11 8 15 / 0.87)" }}>
            Reusable tools, checklists, and research references
          </p>
        </div>

        <section className="mb-12">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <LabelTag>Toolkit</LabelTag>
              <h2
                className="text-3xl font-bold mt-4"
                style={{
                  fontFamily: "var(--font-display)",
                  color: "var(--color-ink-black)",
                }}
              >
                Practical Tools
              </h2>
            </div>

            {canEdit && editMode ? (
              <EditorActionButton
                className="flex items-center gap-2"
                onClick={() => {
                  setSelectedTool({
                    accent: "none",
                    category: "Toolkit",
                    description: "",
                    icon: "none",
                    id: "",
                    items: [{ marker: "bullet", text: "", title: "", description: "" }],
                    link: "",
                    sortOrder: tools.length + 1,
                    title: "",
                  });
                  setDialogOpen(true);
                }}
              >
                <Plus size={14} />
                Add Tool
              </EditorActionButton>
            ) : null}
          </div>

          {isLoading ? (
            <ContentCard>
              <p className="text-sm">Loading practical tools...</p>
            </ContentCard>
          ) : orderedTools.length === 0 ? (
            <ContentCard>
              <p className="text-sm">No practical tools yet.</p>
              {canEdit && editMode ? (
                <div className="mt-4">
                  <EditorActionButton
                    onClick={() => {
                      setSelectedTool({
                        accent: "none",
                        category: "Toolkit",
                        description: "",
                        icon: "none",
                        id: "",
                        items: [{ marker: "bullet", text: "", title: "", description: "" }],
                        link: "",
                        sortOrder: 1,
                        title: "",
                      });
                      setDialogOpen(true);
                    }}
                  >
                    Add First Tool
                  </EditorActionButton>
                </div>
              ) : null}
            </ContentCard>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {orderedTools.map((tool) => {
                const Icon = toolIcons[tool.icon];
                const hasDetailedItems = tool.items.some((item) => item.description);

                return (
                  <ContentCard key={tool.id} accent={tool.accent}>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        {Icon ? (
                          <Icon
                            size={32}
                            style={{
                              color:
                                tool.accent === "blue"
                                  ? "var(--color-cold-blue)"
                                  : tool.accent === "red"
                                    ? "var(--color-sport-red)"
                                    : tool.accent === "yellow"
                                      ? "var(--color-archive-yellow)"
                                      : tool.accent === "pink"
                                        ? "var(--color-label-pink)"
                                        : "var(--color-ink-black)",
                            }}
                          />
                        ) : null}
                        <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-body)" }}>
                          {tool.title}
                        </h3>
                      </div>

                      {canEdit && editMode ? (
                        <div className="flex items-center gap-2 shrink-0">
                          <EditorActionButton
                            variant="ghost"
                            className="flex items-center gap-2"
                            onClick={() => {
                              setSelectedTool(tool);
                              setDialogOpen(true);
                            }}
                          >
                            <Pencil size={12} />
                            Edit
                          </EditorActionButton>
                          <EditorActionButton
                            variant="danger"
                            className="flex items-center gap-2"
                            onClick={() => setDeleteTarget(tool)}
                          >
                            <Trash2 size={12} />
                            Delete
                          </EditorActionButton>
                        </div>
                      ) : null}
                    </div>

                    {tool.description ? (
                      <p className="text-sm mb-4" style={{ color: "rgb(11 8 15 / 0.8)" }}>
                        {tool.description}
                      </p>
                    ) : null}

                    {hasDetailedItems ? (
                      <div className="space-y-3">
                        {tool.items.map((item, index) => (
                          <div
                            key={`${tool.id}-detail-${index}`}
                            className="p-3 border-l-2"
                            style={{
                              borderLeftColor: "var(--color-sport-red)",
                              backgroundColor: "var(--color-warm-paper)",
                            }}
                          >
                            <h4 className="font-bold text-sm mb-1">{item.title || item.text}</h4>
                            {item.description ? (
                              <p className="text-xs" style={{ color: "rgb(11 8 15 / 0.67)" }}>
                                {item.description}
                              </p>
                            ) : null}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <ul className="space-y-2">
                        {tool.items.map((item, index) => (
                          <li
                            key={`${tool.id}-item-${index}`}
                            className="text-sm flex items-start gap-2 p-2"
                            style={{ backgroundColor: "var(--color-warm-paper)" }}
                          >
                            <span
                              style={{
                                color:
                                  item.marker === "check" ? "var(--color-label-pink)" : "var(--color-sport-red)",
                              }}
                            >
                              {getToolMarker(item.marker)}
                            </span>
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </ContentCard>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <div className="mb-6">
            <LabelTag variant="red">Research Foundation</LabelTag>
            <h2
              className="text-3xl font-bold mt-4"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-ink-black)",
              }}
            >
              Sources + References
            </h2>
            <p className="text-sm mt-2" style={{ color: "rgb(11 8 15 / 0.87)" }}>
              Research inputs from project development (Weeks 1–4)
            </p>
          </div>

          <div className="space-y-6">
            {researchSourcesFallback.map((source) => (
              <div
                key={source.week}
                className="p-6 border-l-4"
                style={{
                  backgroundColor: "var(--color-paper-white)",
                  borderLeftColor: "var(--color-sport-red)",
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={24} style={{ color: "var(--color-sport-red)" }} />
                  <div>
                    <LabelTag variant="red">{source.week}</LabelTag>
                    <h3 className="text-xl font-bold mt-1" style={{ fontFamily: "var(--font-body)" }}>
                      {source.topic}
                    </h3>
                  </div>
                </div>

                <ul className="space-y-2">
                  {source.references.map((reference, index) => (
                    <li key={`${source.week}-${index}`} className="text-sm flex items-start gap-2">
                      <span style={{ color: "var(--color-sport-red)" }}>→</span>
                      <span>{reference}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <ContentCard className="mt-8" accent="yellow">
            <div className="flex items-start gap-4">
              <BookOpen size={32} style={{ color: "var(--color-archive-yellow)" }} />
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: "var(--font-body)" }}>
                  Research Archive Note
                </h3>
                <p className="text-sm leading-relaxed">
                  This system is built on foundational research in organizational culture, team psychology,
                  coaching methodology, and AI-augmented decision support. Each component—from the behavior
                  taxonomy to the coach playbook to the AI workflow—is grounded in evidence and proven
                  practices.
                </p>
                <p className="text-sm mt-3 leading-relaxed">
                  The synthesis is original, but the principles are not. This is a{" "}
                  <strong>systems design portfolio project</strong>, not a research paper. It demonstrates
                  how disparate research threads can be woven into a coherent operating model.
                </p>
              </div>
            </div>
          </ContentCard>
        </section>
      </div>

      <PracticalToolDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setSelectedTool(null);
          }
        }}
        initialValue={selectedTool}
        onSave={handleSave}
      />

      <DeleteDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        title="Delete Practical Tool"
        description={`Remove "${deleteTarget?.title ?? ""}" from the Practical Tools section?`}
        onConfirm={handleDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
