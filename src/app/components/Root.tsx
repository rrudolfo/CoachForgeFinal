import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "sonner";
import { EditorAccessDialog } from "./editor/EditorAccessDialog";
import { EditorToolbar } from "./editor/EditorToolbar";

export function Root() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <EditorToolbar />
      <EditorAccessDialog />
      <Toaster position="top-right" richColors />
    </div>
  );
}
