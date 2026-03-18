import { ContentCard } from "../components/ContentCard";
import { LabelTag } from "../components/LabelTag";
import { Database, Brain, Zap, UserCheck, ArrowRight, Shield } from "lucide-react";

export function WinningLoop() {
  const stages = [
    {
      number: "01",
      title: "Capture",
      icon: Database,
      color: 'var(--color-cold-blue)',
      description: "Collect behavioral signals from multiple sources without disruption",
      sources: [
        "Standards and principles documentation",
        "Work artifacts (tasks, commits, docs)",
        "Interaction signals (meetings, chat, reviews)",
        "Quick check-ins and pulse surveys",
        "Optional: environment and collision data",
      ],
    },
    {
      number: "02",
      title: "Detect / Interpret",
      icon: Brain,
      color: 'var(--color-archive-yellow)',
      description: "Identify patterns, risks, and opportunities across culture metrics",
      patterns: [
        {
          name: "Feedback Loop Weakness",
          signal: "Recognition density dropping, questions declining, help requests absent",
        },
        {
          name: "Collective Efficacy Slide",
          signal: "Enthusiasm down, planning quality degrading, skill practice abandoned",
        },
        {
          name: "System Strain / Symptom Chasing",
          signal: "Multiple pressures, reactive firefighting, no space for fundamentals",
        },
      ],
    },
    {
      number: "03",
      title: "Nudge",
      icon: Zap,
      color: 'var(--color-sport-red)',
      description: "Deliver timely, contextual prompts to teams and individuals",
      nudges: [
        { name: "One Rep Feedback", example: "Ask one clarifying question before solving" },
        { name: "Small Win Ladder", example: "Break this into 3 smaller deliverables" },
        { name: "Preview the Path", example: "What's the first 10% of this work?" },
        { name: "WIP Reset", example: "Close or commit to each open item" },
        { name: "Root Cause Check", example: "Name one early risk before planning" },
      ],
    },
    {
      number: "04",
      title: "Review",
      icon: UserCheck,
      color: 'var(--color-label-pink)',
      description: "Human coach validates, adjusts, and maintains authority over all actions",
      principles: [
        "Coach reviews AI suggestions before team sees them",
        "False positives are filtered out",
        "Context and judgment remain human responsibilities",
        "AI serves the coach, not the other way around",
      ],
    },
  ];

  const guardrails = [
    "Opt-in collection: Teams consent to data sources",
    "Least invasive approach: Use existing artifacts first",
    "Privacy and consent: Personal data minimized and protected",
    "False-positive mitigation: Patterns validated before action",
    "Human review gate: Coach approval required before nudges sent",
    "Transparency: Teams see what's captured and how it's used",
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--color-warm-paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <LabelTag variant="red">AI Workflow</LabelTag>
          <h1 
            className="text-4xl md:text-5xl mt-4"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink-black)'
            }}
          >
            The Winning Loop
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--color-ink-black)' + 'DD' }}>
            Pattern detection, nudges, and authority guardrails in a continuous learning cycle
          </p>
        </div>

        {/* Process Diagram */}
        <div className="mb-12 p-8 border-4" style={{ 
          backgroundColor: 'var(--color-paper-white)',
          borderColor: 'var(--color-ink-black)'
        }}>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {["CAPTURE", "DETECT", "NUDGE", "REVIEW"].map((step, idx) => (
              <div key={step} className="flex items-center gap-4">
                <div 
                  className="px-6 py-3 border-2"
                  style={{ 
                    backgroundColor: idx === 0 ? 'var(--color-cold-blue)' : 
                                   idx === 1 ? 'var(--color-archive-yellow)' :
                                   idx === 2 ? 'var(--color-sport-red)' : 'var(--color-label-pink)',
                    borderColor: 'var(--color-ink-black)',
                    color: idx === 1 ? 'var(--color-ink-black)' : '#fff'
                  }}
                >
                  <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-body)' }}>
                    {step}
                  </span>
                </div>
                {idx < 3 && <ArrowRight size={24} style={{ color: 'var(--color-sport-red)' }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Stages */}
        <div className="space-y-8 mb-12">
          {stages.map((stage) => {
            const Icon = stage.icon;
            return (
              <div 
                key={stage.number}
                className="border-2 overflow-hidden"
                style={{ 
                  backgroundColor: 'var(--color-paper-white)',
                  borderColor: 'var(--color-ink-black)' + '30'
                }}
              >
                <div 
                  className="p-4 border-b-2"
                  style={{ 
                    backgroundColor: stage.color,
                    borderColor: 'var(--color-ink-black)' + '30'
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div 
                      className="text-4xl font-bold"
                      style={{ 
                        fontFamily: 'var(--font-display)',
                        color: stage.color === 'var(--color-archive-yellow)' ? 'var(--color-ink-black)' : '#fff'
                      }}
                    >
                      {stage.number}
                    </div>
                    <Icon 
                      size={32} 
                      style={{ color: stage.color === 'var(--color-archive-yellow)' ? 'var(--color-ink-black)' : '#fff' }}
                    />
                    <h2 
                      className="text-2xl font-bold"
                      style={{ 
                        fontFamily: 'var(--font-body)',
                        color: stage.color === 'var(--color-archive-yellow)' ? 'var(--color-ink-black)' : '#fff'
                      }}
                    >
                      {stage.title}
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-base mb-4" style={{ color: 'var(--color-ink-black)' }}>
                    {stage.description}
                  </p>

                  {stage.sources && (
                    <div>
                      <LabelTag>Capture Sources</LabelTag>
                      <ul className="mt-3 space-y-2">
                        {stage.sources.map((source, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span style={{ color: 'var(--color-sport-red)' }}>→</span>
                            <span>{source}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {stage.patterns && (
                    <div>
                      <LabelTag variant="yellow">Pattern Examples</LabelTag>
                      <div className="mt-3 space-y-3">
                        {stage.patterns.map((pattern, idx) => (
                          <div key={idx} className="p-3" style={{ backgroundColor: 'var(--color-warm-paper)' }}>
                            <h4 className="font-bold text-sm mb-1">{pattern.name}</h4>
                            <p className="text-xs italic" style={{ color: 'var(--color-ink-black)' + 'AA' }}>
                              {pattern.signal}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {stage.nudges && (
                    <div>
                      <LabelTag variant="red">Nudge Examples</LabelTag>
                      <div className="mt-3 space-y-2">
                        {stage.nudges.map((nudge, idx) => (
                          <div key={idx} className="flex items-start gap-3 text-sm">
                            <span className="font-bold" style={{ color: 'var(--color-sport-red)' }}>•</span>
                            <div>
                              <span className="font-bold">{nudge.name}:</span> {nudge.example}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {stage.principles && (
                    <div>
                      <LabelTag variant="pink">Authority Principles</LabelTag>
                      <ul className="mt-3 space-y-2">
                        {stage.principles.map((principle, idx) => (
                          <li key={idx} className="text-sm flex items-start gap-2">
                            <span style={{ color: 'var(--color-label-pink)' }}>✓</span>
                            <span>{principle}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Human Authority Gate */}
        <ContentCard accent="red" className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <Shield size={48} style={{ color: 'var(--color-sport-red)' }} />
            <div>
              <LabelTag variant="red">Critical</LabelTag>
              <h2 className="text-2xl font-bold mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                Human Authority Guardrails
              </h2>
            </div>
          </div>

          <p className="text-sm mb-4 leading-relaxed">
            AI is a tool in service of coaches and teams, not a replacement for human judgment. 
            The system operates under strict guardrails to ensure privacy, consent, and authority remain with people.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {guardrails.map((guardrail, idx) => (
              <div 
                key={idx}
                className="p-3 border-l-2"
                style={{ 
                  borderLeftColor: 'var(--color-sport-red)',
                  backgroundColor: 'var(--color-warm-paper)'
                }}
              >
                <p className="text-sm">{guardrail}</p>
              </div>
            ))}
          </div>
        </ContentCard>
      </div>
    </div>
  );
}
