import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { Toaster } from "sonner";
import { EditorAccessDialog } from "./editor/EditorAccessDialog";
import { EditorToolbar } from "./editor/EditorToolbar";

export function Root() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [location.pathname]);

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
