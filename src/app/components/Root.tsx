import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Root() {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: 'var(--font-body)' }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
