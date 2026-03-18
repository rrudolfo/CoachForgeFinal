import { Link } from "react-router";

export function Footer() {
  return (
    <footer className="border-t mt-20" style={{ 
      borderColor: 'var(--color-ink-black)' + '20',
      backgroundColor: 'var(--color-ink-black)',
      color: 'var(--color-warm-paper)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-bold text-lg mb-2" style={{ fontFamily: 'var(--font-display)' }}>
              Coach Forge
            </h3>
            <p className="text-sm opacity-80 max-w-xs" style={{ fontFamily: 'var(--font-body)' }}>
              A culture and performance operating system for healthy, high-performing teams.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-body)' }}>
              Quick Links
            </h4>
            <div className="flex flex-col gap-2">
              <Link to="/dashboard" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Dashboard
              </Link>
              <Link to="/standards-library" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Standards Library
              </Link>
              <Link to="/winning-loop" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Winning Loop
              </Link>
              <Link to="/coach-playbook" className="text-sm opacity-80 hover:opacity-100 transition-opacity">
                Coach Playbook
              </Link>
            </div>
          </div>

          {/* Reference Note */}
          <div>
            <h4 className="font-bold text-sm mb-3 uppercase tracking-wider" style={{ fontFamily: 'var(--font-body)' }}>
              About This Project
            </h4>
            <p className="text-sm opacity-80">
              Built as a culture operating system prototype
            </p>
            <p className="text-xs opacity-60 mt-4">
              Research-backed. Coach-inspired. Human-centered.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm opacity-60" style={{ borderColor: 'var(--color-warm-paper)' + '30' }}>
          <p>© 2026 Coach Forge. A systems design portfolio project.</p>
        </div>
      </div>
    </footer>
  );
}
