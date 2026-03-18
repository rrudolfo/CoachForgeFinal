import { ContentCard } from "../components/ContentCard";
import { LabelTag } from "../components/LabelTag";
import { FileText, MessageSquare, GraduationCap } from "lucide-react";

interface StandardProps {
  name: string;
  definition: string;
  signals: string[];
  sources: string[];
  threshold: string;
  risk: string;
}

function StandardCard({ name, definition, signals, sources, threshold, risk }: StandardProps) {
  return (
    <div 
      className="p-5 border-2 mb-4"
      style={{ 
        backgroundColor: 'var(--color-paper-white)',
        borderColor: 'var(--color-ink-black)' + '30'
      }}
    >
      <h3 className="text-xl font-bold mb-3" style={{ fontFamily: 'var(--font-body)' }}>
        {name}
      </h3>

      <div className="space-y-4">
        <div>
          <LabelTag>Definition</LabelTag>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-ink-black)' }}>
            {definition}
          </p>
        </div>

        <div>
          <LabelTag variant="yellow">Observable Signals</LabelTag>
          <ul className="mt-2 space-y-1">
            {signals.map((signal, idx) => (
              <li key={idx} className="text-sm flex items-start gap-2">
                <span style={{ color: 'var(--color-sport-red)' }}>•</span>
                <span>{signal}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <LabelTag>Measurement Sources</LabelTag>
            <ul className="mt-2 space-y-1">
              {sources.map((source, idx) => (
                <li key={idx} className="text-xs" style={{ color: 'var(--color-ink-black)' + 'DD' }}>
                  → {source}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <LabelTag variant="red">Threshold / Watchout</LabelTag>
            <p className="text-xs mt-2" style={{ color: 'var(--color-ink-black)' + 'DD' }}>
              {threshold}
            </p>
          </div>
        </div>

        <div 
          className="p-3 border-l-4"
          style={{ 
            borderLeftColor: 'var(--color-sport-red)',
            backgroundColor: 'var(--color-warm-paper)'
          }}
        >
          <p className="text-xs font-bold uppercase tracking-wide mb-1">Risk if Absent</p>
          <p className="text-sm" style={{ color: 'var(--color-ink-black)' }}>
            {risk}
          </p>
        </div>
      </div>
    </div>
  );
}

export function StandardsLibrary() {
  const families = [
    {
      name: "How People Work",
      icon: FileText,
      color: 'var(--color-cold-blue)',
      standards: [
        {
          name: "Industriousness",
          definition: "Consistent effort applied to fundamental tasks without prompting. Work is initiated, sustained, and completed with visible momentum.",
          signals: [
            "Tasks started without waiting for reminders",
            "Sustained focus on core work during designated blocks",
            "Work artifacts show progression over time",
          ],
          sources: ["Time logs", "Task records", "Planning docs"],
          threshold: "If less than 70% of planned work shows active progress weekly",
          risk: "Stagnation, missed deadlines, dependency on external pressure to move work forward",
        },
        {
          name: "Initiative",
          definition: "Proactive identification and pursuit of opportunities or solutions before being asked.",
          signals: [
            "Problems surfaced before they escalate",
            "Improvements suggested without formal prompts",
            "Gaps in process or knowledge addressed independently",
          ],
          sources: ["Chat messages", "Meeting transcripts", "Task creation logs"],
          threshold: "If no proactive contributions noted for 2+ weeks",
          risk: "Reactive culture, missed opportunities, dependence on leadership for all direction",
        },
        {
          name: "Cooperation",
          definition: "Active collaboration with teammates, including shared work, responsive communication, and willingness to help.",
          signals: [
            "Timely responses to requests for input or assistance",
            "Joint work sessions or pair activities",
            "Visible support for others' efforts",
          ],
          sources: ["Meeting attendance", "Collaboration tool activity", "Observation checklists"],
          threshold: "If collaboration signals drop below 50% of baseline",
          risk: "Siloed work, duplication of effort, interpersonal friction",
        },
        {
          name: "Planning",
          definition: "Structured preparation and forecasting before execution. Work is decomposed, sequenced, and resource-mapped.",
          signals: [
            "Tasks broken down before starting",
            "Dependencies identified and documented",
            "Time estimates provided and revisited",
          ],
          sources: ["Planning docs", "Task records", "Retrospective notes"],
          threshold: "If planning artifacts absent for major work streams",
          risk: "Chaos, thrashing, last-minute scrambles, hidden blockers",
        },
        {
          name: "Core Skill Practice",
          definition: "Deliberate practice of fundamental skills outside of high-pressure delivery contexts.",
          signals: [
            "Practice sessions scheduled and completed",
            "Skill-building activities documented",
            "Fundamentals referenced in team discussions",
          ],
          sources: ["Time logs", "Learning records", "Observation checklists"],
          threshold: "If fewer than 2 practice sessions per month",
          risk: "Skill erosion, reliance on luck instead of capability, brittleness under pressure",
        },
        {
          name: "Enthusiasm",
          definition: "Visible energy and positive engagement with work and teammates.",
          signals: [
            "Active participation in discussions",
            "Positive language in communication",
            "Volunteering for challenges or learning opportunities",
          ],
          sources: ["Meeting transcripts", "Chat tone analysis", "Observation notes"],
          threshold: "If engagement signals decline for 3+ consecutive observations",
          risk: "Disengagement, low morale, talent attrition",
        },
      ],
    },
    {
      name: "How People Talk",
      icon: MessageSquare,
      color: 'var(--color-sport-red)',
      standards: [
        {
          name: "Asking Questions",
          definition: "Seeking clarity, challenging assumptions, and surfacing unknowns through active inquiry.",
          signals: [
            "Questions asked in meetings or chat",
            "Clarifying language used before decisions",
            "Assumptions questioned or tested",
          ],
          sources: ["Meeting transcripts", "Chat logs", "Decision records"],
          threshold: "If question frequency drops below 3 per team discussion",
          risk: "False consensus, hidden confusion, poor decision quality",
        },
        {
          name: "Sharing Unique Information",
          definition: "Contributing specialized knowledge, context, or perspective that others may not have.",
          signals: [
            "Unique data or insights introduced to discussions",
            "Domain expertise referenced and explained",
            "Diverse viewpoints acknowledged",
          ],
          sources: ["Meeting transcripts", "Documentation contributions", "Discussion threads"],
          threshold: "If fewer than 50% of team members contribute unique info weekly",
          risk: "Groupthink, blind spots, suboptimal solutions",
        },
        {
          name: "Problem-Focused Discussion",
          definition: "Conversations centered on solving specific challenges rather than blame or distraction.",
          signals: [
            "Root causes explored in discussions",
            "Solution proposals offered and debated",
            "Blame language absent or corrected",
          ],
          sources: ["Meeting transcripts", "Retrospective notes", "Chat threads"],
          threshold: "If problem-solving tone drops below 60% in team meetings",
          risk: "Defensiveness, unresolved issues, culture of blame",
        },
      ],
    },
    {
      name: "How People Learn",
      icon: GraduationCap,
      color: 'var(--color-archive-yellow)',
      standards: [
        {
          name: "Seeking Feedback",
          definition: "Actively requesting input, critique, or guidance on work in progress.",
          signals: [
            "Feedback explicitly requested",
            "Work shared before completion for review",
            "Critiques welcomed and integrated",
          ],
          sources: ["Meeting transcripts", "Code/doc review requests", "Chat logs"],
          threshold: "If fewer than 2 feedback requests per team member per sprint",
          risk: "Wasted effort, misaligned work, slow improvement",
        },
        {
          name: "Requesting Help",
          definition: "Asking for assistance when stuck, rather than suffering in silence or failing independently.",
          signals: [
            "Help requests posted in team channels",
            "Blockers escalated promptly",
            "Pairing or collaboration initiated when struggling",
          ],
          sources: ["Chat logs", "Standup notes", "Task updates"],
          threshold: "If no help requests for 2+ weeks despite known challenges",
          risk: "Hidden struggle, burnout, preventable failures",
        },
        {
          name: "Reporting Errors",
          definition: "Transparently acknowledging mistakes, near-misses, or failures for team learning.",
          signals: [
            "Errors disclosed publicly",
            "Incident reports filed",
            "Lessons shared from mistakes",
          ],
          sources: ["Incident logs", "Retrospectives", "Team channels"],
          threshold: "If error reporting drops to zero for extended periods (unlikely to be real)",
          risk: "Cover-up culture, repeated mistakes, eroded trust",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--color-warm-paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <LabelTag variant="red">Foundation</LabelTag>
          <h1 
            className="text-4xl md:text-5xl mt-4"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink-black)'
            }}
          >
            Standards Library
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--color-ink-black)' + 'DD' }}>
            Complete behavior taxonomy with observable signals, thresholds, and risks
          </p>
        </div>

        {/* Intro */}
        <ContentCard className="mb-12">
          <p className="text-sm leading-relaxed mb-4">
            Culture is not what teams say. It's what they do. This library defines <strong>measurable behaviors</strong> 
            that create healthy, high-performing teams. Each standard includes observable signals, measurement sources, 
            watchout thresholds, and the risks that emerge when the behavior is absent.
          </p>
          <p className="text-sm leading-relaxed">
            These standards are organized into three families: <strong>How People Work</strong>, <strong>How People Talk</strong>, 
            and <strong>How People Learn</strong>. Together, they form the foundation of the Coach Forge operating system.
          </p>
        </ContentCard>

        {/* Standards by Family */}
        {families.map((family) => {
          const Icon = family.icon;
          return (
            <section key={family.name} className="mb-12">
              <div className="flex items-center gap-4 mb-6">
                <div 
                  className="w-16 h-16 flex items-center justify-center"
                  style={{ backgroundColor: family.color }}
                >
                  <Icon className="text-white" size={32} />
                </div>
                <div>
                  <LabelTag>{family.name}</LabelTag>
                  <h2 
                    className="text-3xl font-bold mt-2"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-ink-black)'
                    }}
                  >
                    {family.name}
                  </h2>
                </div>
              </div>

              <div className="space-y-4">
                {family.standards.map((standard) => (
                  <StandardCard key={standard.name} {...standard} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
