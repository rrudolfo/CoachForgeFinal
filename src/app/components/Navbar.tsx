import { Link, useLocation } from "react-router";
import { LogOut, Menu, Pencil, X } from "lucide-react";
import { useState } from "react";
import { useEditor } from "./editor/EditorProvider";
import { EditorActionButton } from "./editor/EditorActionButton";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Standards Library", path: "/standards-library" },
  { name: "Winning Loop", path: "/winning-loop" },
  { name: "Coach Playbook", path: "/coach-playbook" },
  { name: "Templates + Sources", path: "/templates-sources" },
];

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { canEdit, editMode, isCheckingAccess, setEditMode, signOut, user } = useEditor();

  const logoSrc = `${import.meta.env.BASE_URL}coachforge-logo.png`;
  const showDesktopEditorControls = Boolean(user) || isCheckingAccess;

  return (
    <nav
      className="sticky top-0 z-50 border-b border-[var(--color-ink-black)]/10"
      style={{ backgroundColor: "var(--color-paper-white)" }}
    >
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-[108px]">
          {/* Left Zone: Logo */}
          <Link to="/" className="flex items-center shrink-0 mr-8 w-[420px] h-[110px]">
            <img
              src={logoSrc}
              alt="Coach Forge - Forge Your Potential!"
              className="block w-[420px] max-w-none object-contain object-left"
              style={{
                transform: "translate(-28px, -4px) scale(1.18)",
                transformOrigin: "left center",
              }}
            />
          </Link>

          {/* Right Zone: Desktop Navigation */}
          <div className="hidden lg:flex flex-1 flex-col items-end justify-center gap-2 min-w-0">
            <div className="flex items-center gap-1.5 xl:gap-3 min-w-0">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="group relative px-1.5 xl:px-2.5 py-2 text-[15px] font-bold uppercase tracking-wide whitespace-nowrap transition-all duration-200 ease-out"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: isActive ? "var(--color-sport-red)" : "var(--color-ink-black)",
                    }}
                  >
                    <span className="transition-colors duration-200 group-hover:text-[var(--color-sport-red)]">
                      {item.name}
                    </span>

                    <span
                      className="pointer-events-none absolute left-1.5 xl:left-2.5 right-1.5 xl:right-2.5 -bottom-[10px] h-[2px] origin-left transition-transform duration-200 ease-out"
                      style={{
                        backgroundColor: "var(--color-sport-red)",
                        transform: isActive ? "scaleX(1)" : "scaleX(0)",
                        opacity: isActive ? 1 : 0.75,
                      }}
                    />

                    {!isActive && (
                      <span
                        className="pointer-events-none absolute left-1.5 xl:left-2.5 right-1.5 xl:right-2.5 -bottom-[10px] h-[2px] origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100"
                        style={{
                          backgroundColor: "var(--color-sport-red)",
                          opacity: 0.75,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {showDesktopEditorControls && (
              <div
                className="flex items-center gap-2 shrink-0 pt-1"
                style={{
                  fontFamily: "var(--font-body)",
                }}
              >
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.14em] whitespace-nowrap"
                  style={{ color: "var(--color-ink-black)" }}
                >
                  <span className="mr-2 inline-block align-middle">
                    <Pencil size={14} />
                  </span>
                  {isCheckingAccess
                    ? "Checking Editor Access"
                    : canEdit
                      ? editMode
                        ? "Edit Mode On"
                        : "Editor Ready"
                      : "Signed In"}
                </div>

                {canEdit && (
                  <EditorActionButton
                    onClick={() => setEditMode(!editMode)}
                    variant={editMode ? "default" : "ghost"}
                  >
                    {editMode ? "Disable Edit" : "Enable Edit"}
                  </EditorActionButton>
                )}

                <EditorActionButton
                  className="flex items-center gap-2"
                  onClick={() => signOut()}
                  variant="ghost"
                >
                  <LogOut size={14} />
                  Sign Out
                </EditorActionButton>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: "var(--color-ink-black)" }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden pb-4 border-t"
            style={{ borderColor: "var(--color-ink-black)20" }}
          >
            {(Boolean(user) || isCheckingAccess) && (
              <div
                className="px-4 py-4 border-b"
                style={{ borderColor: "var(--color-ink-black)20" }}
              >
                <div
                  className="text-[11px] font-bold uppercase tracking-[0.14em]"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-ink-black)",
                  }}
                >
                  {isCheckingAccess
                    ? "Checking Editor Access"
                    : canEdit
                      ? editMode
                        ? "Edit Mode On"
                        : "Editor Ready"
                      : "Signed In"}
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {canEdit && (
                    <EditorActionButton
                      onClick={() => setEditMode(!editMode)}
                      variant={editMode ? "default" : "ghost"}
                    >
                      {editMode ? "Disable Edit" : "Enable Edit"}
                    </EditorActionButton>
                  )}

                  <EditorActionButton
                    className="flex items-center gap-2"
                    onClick={() => signOut()}
                    variant="ghost"
                  >
                    <LogOut size={14} />
                    Sign Out
                  </EditorActionButton>
                </div>
              </div>
            )}

            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-3 text-sm font-bold uppercase tracking-wide"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: isActive ? "var(--color-sport-red)" : "var(--color-ink-black)",
                    backgroundColor: isActive ? "var(--color-warm-paper)" : "transparent",
                  }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
}
