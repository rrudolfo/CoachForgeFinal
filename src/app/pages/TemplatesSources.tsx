import { ContentCard } from "../components/ContentCard";
import { LabelTag } from "../components/LabelTag";
import { FileCheck, Lightbulb, BookOpen, Users } from "lucide-react";

export function TemplatesSources() {
  const weeklyReviewPrompts = [
    "Which standards showed up this week?",
    "Where did friction repeat?",
    "What signal moved most?",
    "Which nudge worked?",
    "What needs human coaching vs AI prompting?",
    "What is the WIN for next week?",
  ];

  const nudgeLibrary = [
    "Ask one clarifying question before solving",
    "Invite one quieter voice",
    "Close one open commitment",
    "Run one fundamentals rep",
    "Name one early risk",
    "Recognize one teammate contribution",
    "Break this into 3 smaller deliverables",
    "Preview the first 10% of this work",
    "Reset your WIP—close or commit",
    "Check root cause before moving forward",
  ];

  const meetingReflectionPrompts = [
    "Did everyone speak?",
    "Were unique perspectives surfaced?",
    "Did we solve problems or assign blame?",
    "What questions went unasked?",
    "What commitment did we make?",
  ];

  const commitmentChecklist = [
    "Is the commitment clearly stated?",
    "Who owns it?",
    "When is it due?",
    "How will we know it's done?",
    "Who needs to be updated when it's complete?",
  ];

  const standardsReviewPrompts = [
    "Which standard is strongest right now?",
    "Which standard needs attention?",
    "What behavior would we add to the library?",
    "What threshold should we adjust?",
    "Where is the system helping? Where is it noisy?",
  ];

  const ritualExamples = [
    {
      name: "Monday Morning Fundamentals",
      description: "30-minute team session focused on one core skill. Rotate weekly: planning, code review, testing, documentation.",
    },
    {
      name: "Friday Risk Scan",
      description: "15-minute huddle to identify next week's top 3 risks and assign ownership for monitoring.",
    },
    {
      name: "WIN Check-In",
      description: "Daily standup starts with each person naming their single most important task for today.",
    },
    {
      name: "Recognition Ritual",
      description: "Every retrospective ends with each person recognizing one teammate contribution from the sprint.",
    },
  ];

  const sources = [
    {
      week: "Week 1",
      topic: "Foundation and Taxonomy",
      references: [
        "Culture as measurable behavior (Schein, Organizational Culture and Leadership)",
        "Taxonomy: How people work, talk, learn (Edmondson, The Fearless Organization)",
        "Observable signals and measurement sources",
      ],
    },
    {
      week: "Week 2",
      topic: "Culture Physics / Reinforcing Loops",
      references: [
        "Standards Enforcement Loop (Clear, Atomic Habits)",
        "Candor & Psychological Safety Loop (Edmondson)",
        "Collective Efficacy & Role Alignment (Bandura, Self-Efficacy)",
        "System logic: standards + safety + belief = high performance",
      ],
    },
    {
      week: "Week 3",
      topic: "AI Pattern and Signal Layer",
      references: [
        "Dashboard metrics and thresholds",
        "Pattern detection: feedback loops, efficacy, system strain",
        "Capture → Interpret → Nudge → Review workflow",
        "Key metrics: Speak Up Early, Invite Voice, Clean Turns, Recognition Density, Run the Reps, Close the Loop",
      ],
    },
    {
      week: "Week 4",
      topic: "Coach Integration and Authority",
      references: [
        "Wooden: Industriousness, fundamentals, daily discipline (Wooden, Pyramid of Success)",
        "Belichick: Preparation, standards enforcement, strategic flexibility (Holley, War Room)",
        "Guardiola: Strict rules, engineered conditions, positional advantage (Perarnau, Pep Confidential)",
        "Saban: The Process, WIN, emotional neutrality, deep work (Saban, How Good Do You Want to Be?)",
        "Human authority gate: AI supports, humans decide",
      ],
    },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--color-warm-paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <LabelTag variant="red">Resources</LabelTag>
          <h1 
            className="text-4xl md:text-5xl mt-4"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink-black)'
            }}
          >
            Templates + Sources
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--color-ink-black)' + 'DD' }}>
            Reusable tools, checklists, and research references
          </p>
        </div>

        {/* Toolkit Section */}
        <section className="mb-12">
          <div className="mb-6">
            <LabelTag>Toolkit</LabelTag>
            <h2 
              className="text-3xl font-bold mt-4"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink-black)'
              }}
            >
              Practical Tools
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Weekly Review Checklist */}
            <ContentCard accent="blue">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck size={32} style={{ color: 'var(--color-cold-blue)' }} />
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-body)' }}>
                  Weekly Review Checklist
                </h3>
              </div>
              <ul className="space-y-2">
                {weeklyReviewPrompts.map((prompt, idx) => (
                  <li 
                    key={idx}
                    className="text-sm flex items-start gap-2 p-2"
                    style={{ backgroundColor: 'var(--color-warm-paper)' }}
                  >
                    <span style={{ color: 'var(--color-sport-red)' }}>□</span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </ContentCard>

            {/* Nudge Library */}
            <ContentCard accent="red">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb size={32} style={{ color: 'var(--color-sport-red)' }} />
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-body)' }}>
                  Nudge Library
                </h3>
              </div>
              <ul className="space-y-2">
                {nudgeLibrary.map((nudge, idx) => (
                  <li 
                    key={idx}
                    className="text-sm flex items-start gap-2 p-2"
                    style={{ backgroundColor: 'var(--color-warm-paper)' }}
                  >
                    <span style={{ color: 'var(--color-sport-red)' }}>→</span>
                    <span>{nudge}</span>
                  </li>
                ))}
              </ul>
            </ContentCard>

            {/* Meeting Reflection Prompts */}
            <ContentCard accent="yellow">
              <div className="flex items-center gap-3 mb-4">
                <Users size={32} style={{ color: 'var(--color-archive-yellow)' }} />
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-body)' }}>
                  Meeting Reflection Prompts
                </h3>
              </div>
              <ul className="space-y-2">
                {meetingReflectionPrompts.map((prompt, idx) => (
                  <li 
                    key={idx}
                    className="text-sm flex items-start gap-2 p-2"
                    style={{ backgroundColor: 'var(--color-warm-paper)' }}
                  >
                    <span style={{ color: 'var(--color-sport-red)' }}>?</span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </ContentCard>

            {/* Commitment Follow-Through Checklist */}
            <ContentCard accent="pink">
              <div className="flex items-center gap-3 mb-4">
                <FileCheck size={32} style={{ color: 'var(--color-label-pink)' }} />
                <h3 className="text-xl font-bold" style={{ fontFamily: 'var(--font-body)' }}>
                  Commitment Follow-Through
                </h3>
              </div>
              <ul className="space-y-2">
                {commitmentChecklist.map((item, idx) => (
                  <li 
                    key={idx}
                    className="text-sm flex items-start gap-2 p-2"
                    style={{ backgroundColor: 'var(--color-warm-paper)' }}
                  >
                    <span style={{ color: 'var(--color-label-pink)' }}>✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </ContentCard>
          </div>

          {/* Additional Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Standards Review Prompts */}
            <ContentCard>
              <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                Standards Review Prompts
              </h3>
              <ul className="space-y-2">
                {standardsReviewPrompts.map((prompt, idx) => (
                  <li key={idx} className="text-sm flex items-start gap-2">
                    <span style={{ color: 'var(--color-sport-red)' }}>•</span>
                    <span>{prompt}</span>
                  </li>
                ))}
              </ul>
            </ContentCard>

            {/* Team Ritual Examples */}
            <ContentCard>
              <h3 className="text-lg font-bold mb-3" style={{ fontFamily: 'var(--font-body)' }}>
                Team Ritual Examples
              </h3>
              <div className="space-y-3">
                {ritualExamples.map((ritual, idx) => (
                  <div 
                    key={idx}
                    className="p-3 border-l-2"
                    style={{ 
                      borderLeftColor: 'var(--color-sport-red)',
                      backgroundColor: 'var(--color-warm-paper)'
                    }}
                  >
                    <h4 className="font-bold text-sm mb-1">{ritual.name}</h4>
                    <p className="text-xs" style={{ color: 'var(--color-ink-black)' + 'AA' }}>
                      {ritual.description}
                    </p>
                  </div>
                ))}
              </div>
            </ContentCard>
          </div>
        </section>

        {/* Sources Section */}
        <section>
          <div className="mb-6">
            <LabelTag variant="red">Research Foundation</LabelTag>
            <h2 
              className="text-3xl font-bold mt-4"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink-black)'
              }}
            >
              Sources + References
            </h2>
            <p className="text-sm mt-2" style={{ color: 'var(--color-ink-black)' + 'DD' }}>
              Research inputs from project development (Weeks 1–4)
            </p>
          </div>

          <div className="space-y-6">
            {sources.map((source) => (
              <div 
                key={source.week}
                className="p-6 border-l-4"
                style={{ 
                  backgroundColor: 'var(--color-paper-white)',
                  borderLeftColor: 'var(--color-sport-red)'
                }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={24} style={{ color: 'var(--color-sport-red)' }} />
                  <div>
                    <LabelTag variant="red">{source.week}</LabelTag>
                    <h3 className="text-xl font-bold mt-1" style={{ fontFamily: 'var(--font-body)' }}>
                      {source.topic}
                    </h3>
                  </div>
                </div>

                <ul className="space-y-2">
                  {source.references.map((ref, idx) => (
                    <li key={idx} className="text-sm flex items-start gap-2">
                      <span style={{ color: 'var(--color-sport-red)' }}>→</span>
                      <span>{ref}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Archive Note */}
          <ContentCard className="mt-8" accent="yellow">
            <div className="flex items-start gap-4">
              <BookOpen size={32} style={{ color: 'var(--color-archive-yellow)' }} />
              <div>
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  Research Archive Note
                </h3>
                <p className="text-sm leading-relaxed">
                  This system is built on foundational research in organizational culture, team psychology, 
                  coaching methodology, and AI-augmented decision support. Each component—from the behavior 
                  taxonomy to the coach playbook to the AI workflow—is grounded in evidence and proven practices.
                </p>
                <p className="text-sm mt-3 leading-relaxed">
                  The synthesis is original, but the principles are not. This is a <strong>systems design portfolio project</strong>, 
                  not a research paper. It demonstrates how disparate research threads can be woven into a coherent operating model.
                </p>
              </div>
            </div>
          </ContentCard>
        </section>
      </div>
    </div>
  );
}
