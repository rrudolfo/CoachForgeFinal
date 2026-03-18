import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

interface DeleteDialogProps {
  description: string;
  isDeleting?: boolean;
  onConfirm: () => void | Promise<void>;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: string;
}

export function DeleteDialog({
  description,
  isDeleting = false,
  onConfirm,
  onOpenChange,
  open,
  title,
}: DeleteDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className="border-2 rounded-none"
        style={{
          borderColor: "var(--color-ink-black)",
          backgroundColor: "var(--color-paper-white)",
          fontFamily: "var(--font-body)",
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle style={{ fontFamily: "var(--font-display)" }}>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription style={{ color: "var(--color-ink-black)" }}>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="rounded-none">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="rounded-none"
            style={{
              backgroundColor: "var(--color-sport-red)",
              borderColor: "var(--color-sport-red)",
            }}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
