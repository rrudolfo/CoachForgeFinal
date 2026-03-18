import { Link } from "react-router";
import { ArrowRight, Target, Brain, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ContentCard } from "../components/ContentCard";
import { LabelTag } from "../components/LabelTag";

export function Home() {
  const pageLinks = [
    {
      title: "Dashboard",
      description: "Monitor culture health, standards adherence, and real-time signals",
      path: "/dashboard",
      tag: "KPI System"
    },
    {
      title: "Standards Library",
      description: "Complete behavior taxonomy with observable signals and thresholds",
      path: "/standards-library",
      tag: "Foundation"
    },
    {
      title: "Winning Loop",
      description: "AI workflow for pattern detection, nudges, and human review",
      path: "/winning-loop",
      tag: "AI Layer"
    },
    {
      title: "Coach Playbook",
      description: "Elite coaching practices translated into team rituals",
      path: "/coach-playbook",
      tag: "Rituals"
    },
    {
      title: "Templates + Sources",
      description: "Reusable tools, checklists, and research references",
      path: "/templates-sources",
      tag: "Toolkit"
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-warm-paper)' }}>
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ backgroundColor: 'var(--color-warm-paper)' }}>
        {/* Full-width Hero Image Background */}
        <div className="absolute inset-0 w-full h-full">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1739298061740-5ed03045b280?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBjb2xsYWJvcmF0aW9uJTIwbWVldGluZ3xlbnwxfHx8fDE3NzMzMjYyODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
            alt="Team collaboration and leadership" 
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay for text readability */}
          <div 
            className="absolute inset-0" 
            style={{ 
              background: 'linear-gradient(to right, rgba(246, 242, 234, 0.95) 0%, rgba(246, 242, 234, 0.3) 40%, rgba(0, 0, 0, 0.4) 100%)'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[550px]">
            {/* Left: Text Content */}
            <div className="space-y-6 relative max-w-lg">
              {/* Overline */}
              <div 
                className="text-xs font-bold uppercase tracking-widest"
                style={{ 
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-sport-red)',
                  letterSpacing: '0.15em'
                }}
              >
                Operating System
              </div>

              {/* Headline Block */}
              <div className="space-y-5">
                <h1 
                  className="text-2xl md:text-3xl leading-tight"
                  style={{ 
                    fontFamily: 'var(--font-body)',
                    fontWeight: 700,
                    color: 'var(--color-ink-black)',
                    lineHeight: 1.3
                  }}
                >
                  A culture and performance operating system for healthy, high-performing teams
                </h1>

                {/* System Label Banner */}
                <div 
                  className="inline-block px-4 py-2 border"
                  style={{ 
                    backgroundColor: 'var(--color-sport-red)',
                    borderColor: 'var(--color-ink-black)'
                  }}
                >
                  <p 
                    className="text-xs font-bold text-white uppercase tracking-wide"
                    style={{ fontFamily: 'var(--font-body)', letterSpacing: '0.05em' }}
                  >
                    Culture Mechanics × Coach Practices × AI Functions
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div 
                className="w-20 h-0.5"
                style={{ backgroundColor: 'var(--color-ink-black)', opacity: 0.2 }}
              />

              {/* System Tags */}
              <div className="flex items-center gap-2 flex-wrap">
                {['Measure', 'Coach', 'Nudge', 'Review'].map((tag, index) => (
                  <span 
                    key={tag}
                    className="text-xs font-bold uppercase tracking-wide"
                    style={{ 
                      fontFamily: 'var(--font-body)',
                      color: 'var(--color-ink-black)',
                      opacity: 0.6
                    }}
                  >
                    {tag}
                    {index < 3 && (
                      <span className="ml-2" style={{ color: 'var(--color-sport-red)' }}>
                        /
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Empty space for image */}
            <div className="relative"></div>
          </div>
        </div>
      </section>

      {/* System Layers */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-paper-white)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <LabelTag>System Architecture</LabelTag>
            <h2 
              className="text-3xl md:text-4xl mt-4"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink-black)'
              }}
            >
              Three Interlocking Layers
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContentCard accent="blue">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'var(--color-cold-blue)' }}>
                    <Target className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-body)' }}>
                    Culture Mechanics
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-black)' }}>
                  Measurable behaviors, observable signals, clear thresholds, and identified risks. 
                  Culture becomes tangible through what teams do, not just what they say.
                </p>
                <ul className="text-sm space-y-1" style={{ fontFamily: 'var(--font-body)' }}>
                  <li>• Observable behaviors</li>
                  <li>• Signal detection</li>
                  <li>• Threshold monitoring</li>
                  <li>• Risk identification</li>
                </ul>
              </div>
            </ContentCard>

            <ContentCard accent="red">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'var(--color-sport-red)' }}>
                    <Users className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-body)' }}>
                    Coach Practices
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-black)' }}>
                  Routines, standards, and feedback systems inspired by Wooden, Belichick, Guardiola, and Saban. 
                  Elite coaching principles translated into organizational rituals.
                </p>
                <ul className="text-sm space-y-1" style={{ fontFamily: 'var(--font-body)' }}>
                  <li>• Daily fundamentals</li>
                  <li>• Standards enforcement</li>
                  <li>• Strategic preparation</li>
                  <li>• Process discipline</li>
                </ul>
              </div>
            </ContentCard>

            <ContentCard accent="yellow">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 flex items-center justify-center" style={{ backgroundColor: 'var(--color-archive-yellow)' }}>
                    <Brain className="text-black" size={24} />
                  </div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-body)' }}>
                    AI Functions
                  </h3>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-ink-black)' }}>
                  Capture → interpret → nudge → review. AI supports pattern detection and timely prompts, 
                  while humans remain the authority layer for all decisions.
                </p>
                <ul className="text-sm space-y-1" style={{ fontFamily: 'var(--font-body)' }}>
                  <li>• Signal capture</li>
                  <li>• Pattern detection</li>
                  <li>• Contextual nudges</li>
                  <li>• Human review gate</li>
                </ul>
              </div>
            </ContentCard>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <LabelTag variant="red">Workflow</LabelTag>
            <h2 
              className="text-3xl md:text-4xl mt-4"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink-black)'
              }}
            >
              How It Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { num: "01", title: "Capture Signals", desc: "Collect behavioral data from work artifacts, interactions, and check-ins" },
              { num: "02", title: "Detect Patterns", desc: "Identify trends, risks, and opportunities across culture metrics" },
              { num: "03", title: "Trigger Nudges", desc: "Deliver timely, contextual prompts and feedback to teams" },
              { num: "04", title: "Human Review", desc: "Coach validates, adjusts, and maintains authority over all actions" },
            ].map((step) => (
              <div 
                key={step.num}
                className="p-6 border-2"
                style={{ 
                  backgroundColor: 'var(--color-paper-white)',
                  borderColor: 'var(--color-ink-black)'
                }}
              >
                <div 
                  className="text-4xl font-bold mb-3"
                  style={{ 
                    fontFamily: 'var(--font-display)',
                    color: 'var(--color-sport-red)'
                  }}
                >
                  {step.num}
                </div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  {step.title}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-ink-black)' + 'DD' }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Page Links */}
      <section className="py-16" style={{ backgroundColor: 'var(--color-paper-white)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <LabelTag>Navigation</LabelTag>
            <h2 
              className="text-3xl md:text-4xl mt-4"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink-black)'
              }}
            >
              Explore The System
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pageLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className="group block"
              >
                <div 
                  className="p-6 border-2 h-full transition-all hover:shadow-lg"
                  style={{ 
                    backgroundColor: 'var(--color-paper-white)',
                    borderColor: 'var(--color-ink-black)' + '30'
                  }}
                >
                  <LabelTag variant="default">{link.tag}</LabelTag>
                  <h3 
                    className="text-2xl font-bold mt-4 mb-2 group-hover:text-[var(--color-sport-red)] transition-colors"
                    style={{ fontFamily: 'var(--font-body)' }}
                  >
                    {link.title}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: 'var(--color-ink-black)' + 'CC' }}>
                    {link.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-bold" style={{ color: 'var(--color-sport-red)' }}>
                    <span>Explore</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
