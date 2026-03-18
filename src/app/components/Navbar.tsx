import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

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

  return (
    <nav className="sticky top-0 z-50 border-b border-[var(--color-ink-black)]/10" style={{ backgroundColor: 'var(--color-paper-white)' }}>
      <div className="max-w-7xl mx-auto px-[1px] py-[0px]">
        <div className="flex items-center justify-between h-24">
          {/* Left Zone: Logo Container */}
          <Link to="/" className="flex items-center py-3">
            <img 
              src="/coachforge-logo.png" 
              alt="Coach Forge - Forge Your Potential!" 
              className="h-15 w-auto"
            />
          </Link>

          {/* Right Zone: Desktop Navigation */}
          <div className="hidden lg:flex items-center flex-1 justify-end gap-1 ml-12">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors whitespace-nowrap"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: isActive ? 'var(--color-sport-red)' : 'var(--color-ink-black)',
                    borderBottom: isActive ? '2px solid var(--color-sport-red)' : '2px solid transparent',
                  }}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: 'var(--color-ink-black)' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4 border-t" style={{ borderColor: 'var(--color-ink-black)' + '20' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className="block px-4 py-3 text-sm font-bold uppercase tracking-wide"
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: isActive ? 'var(--color-sport-red)' : 'var(--color-ink-black)',
                    backgroundColor: isActive ? 'var(--color-warm-paper)' : 'transparent',
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
