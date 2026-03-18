import {
  CoachEntry,
  PracticalTool,
  ResearchSource,
  StandardsFamily,
} from "../types/content";

export const practicalToolsFallback: PracticalTool[] = [
  {
    id: "tool-weekly-review-checklist",
    title: "Weekly Review Checklist",
    category: "Toolkit",
    description: "",
    link: "",
    icon: "file-check",
    accent: "blue",
    sortOrder: 1,
    items: [
      { marker: "checkbox", text: "Which standards showed up this week?" },
      { marker: "checkbox", text: "Where did friction repeat?" },
      { marker: "checkbox", text: "What signal moved most?" },
      { marker: "checkbox", text: "Which nudge worked?" },
      { marker: "checkbox", text: "What needs human coaching vs AI prompting?" },
      { marker: "checkbox", text: "What is the WIN for next week?" },
    ],
  },
  {
    id: "tool-nudge-library",
    title: "Nudge Library",
    category: "Toolkit",
    description: "",
    link: "",
    icon: "lightbulb",
    accent: "red",
    sortOrder: 2,
    items: [
      { marker: "arrow", text: "Ask one clarifying question before solving" },
      { marker: "arrow", text: "Invite one quieter voice" },
      { marker: "arrow", text: "Close one open commitment" },
      { marker: "arrow", text: "Run one fundamentals rep" },
      { marker: "arrow", text: "Name one early risk" },
      { marker: "arrow", text: "Recognize one teammate contribution" },
      { marker: "arrow", text: "Break this into 3 smaller deliverables" },
      { marker: "arrow", text: "Preview the first 10% of this work" },
      { marker: "arrow", text: "Reset your WIP—close or commit" },
      { marker: "arrow", text: "Check root cause before moving forward" },
    ],
  },
  {
    id: "tool-meeting-reflection-prompts",
    title: "Meeting Reflection Prompts",
    category: "Toolkit",
    description: "",
    link: "",
    icon: "users",
    accent: "yellow",
    sortOrder: 3,
    items: [
      { marker: "question", text: "Did everyone speak?" },
      { marker: "question", text: "Were unique perspectives surfaced?" },
      { marker: "question", text: "Did we solve problems or assign blame?" },
      { marker: "question", text: "What questions went unasked?" },
      { marker: "question", text: "What commitment did we make?" },
    ],
  },
  {
    id: "tool-commitment-follow-through",
    title: "Commitment Follow-Through",
    category: "Toolkit",
    description: "",
    link: "",
    icon: "file-check",
    accent: "pink",
    sortOrder: 4,
    items: [
      { marker: "check", text: "Is the commitment clearly stated?" },
      { marker: "check", text: "Who owns it?" },
      { marker: "check", text: "When is it due?" },
      { marker: "check", text: "How will we know it's done?" },
      { marker: "check", text: "Who needs to be updated when it's complete?" },
    ],
  },
  {
    id: "tool-standards-review-prompts",
    title: "Standards Review Prompts",
    category: "Toolkit",
    description: "",
    link: "",
    icon: "none",
    accent: "none",
    sortOrder: 5,
    items: [
      { marker: "bullet", text: "Which standard is strongest right now?" },
      { marker: "bullet", text: "Which standard needs attention?" },
      { marker: "bullet", text: "What behavior would we add to the library?" },
      { marker: "bullet", text: "What threshold should we adjust?" },
      { marker: "bullet", text: "Where is the system helping? Where is it noisy?" },
    ],
  },
  {
    id: "tool-team-ritual-examples",
    title: "Team Ritual Examples",
    category: "Toolkit",
    description: "",
    link: "",
    icon: "none",
    accent: "none",
    sortOrder: 6,
    items: [
      {
        marker: "bullet",
        title: "Monday Morning Fundamentals",
        text: "Monday Morning Fundamentals",
        description:
          "30-minute team session focused on one core skill. Rotate weekly: planning, code review, testing, documentation.",
      },
      {
        marker: "bullet",
        title: "Friday Risk Scan",
        text: "Friday Risk Scan",
        description:
          "15-minute huddle to identify next week's top 3 risks and assign ownership for monitoring.",
      },
      {
        marker: "bullet",
        title: "WIN Check-In",
        text: "WIN Check-In",
        description:
          "Daily standup starts with each person naming their single most important task for today.",
      },
      {
        marker: "bullet",
        title: "Recognition Ritual",
        text: "Recognition Ritual",
        description:
          "Every retrospective ends with each person recognizing one teammate contribution from the sprint.",
      },
    ],
  },
];

export const researchSourcesFallback: ResearchSource[] = [
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

export const standardsFamiliesFallback: StandardsFamily[] = [
  {
    id: "family-how-people-work",
    name: "How People Work",
    description: "",
    icon: "file-text",
    color: "blue",
    sortOrder: 1,
    standards: [
      {
        id: "standard-industriousness",
        familyId: "family-how-people-work",
        name: "Industriousness",
        definition:
          "Consistent effort applied to fundamental tasks without prompting. Work is initiated, sustained, and completed with visible momentum.",
        signals: [
          "Tasks started without waiting for reminders",
          "Sustained focus on core work during designated blocks",
          "Work artifacts show progression over time",
        ],
        sources: ["Time logs", "Task records", "Planning docs"],
        threshold: "If less than 70% of planned work shows active progress weekly",
        risk: "Stagnation, missed deadlines, dependency on external pressure to move work forward",
        sortOrder: 1,
      },
      {
        id: "standard-initiative",
        familyId: "family-how-people-work",
        name: "Initiative",
        definition:
          "Proactive identification and pursuit of opportunities or solutions before being asked.",
        signals: [
          "Problems surfaced before they escalate",
          "Improvements suggested without formal prompts",
          "Gaps in process or knowledge addressed independently",
        ],
        sources: ["Chat messages", "Meeting transcripts", "Task creation logs"],
        threshold: "If no proactive contributions noted for 2+ weeks",
        risk: "Reactive culture, missed opportunities, dependence on leadership for all direction",
        sortOrder: 2,
      },
      {
        id: "standard-cooperation",
        familyId: "family-how-people-work",
        name: "Cooperation",
        definition:
          "Active collaboration with teammates, including shared work, responsive communication, and willingness to help.",
        signals: [
          "Timely responses to requests for input or assistance",
          "Joint work sessions or pair activities",
          "Visible support for others' efforts",
        ],
        sources: ["Meeting attendance", "Collaboration tool activity", "Observation checklists"],
        threshold: "If collaboration signals drop below 50% of baseline",
        risk: "Siloed work, duplication of effort, interpersonal friction",
        sortOrder: 3,
      },
      {
        id: "standard-planning",
        familyId: "family-how-people-work",
        name: "Planning",
        definition:
          "Structured preparation and forecasting before execution. Work is decomposed, sequenced, and resource-mapped.",
        signals: [
          "Tasks broken down before starting",
          "Dependencies identified and documented",
          "Time estimates provided and revisited",
        ],
        sources: ["Planning docs", "Task records", "Retrospective notes"],
        threshold: "If planning artifacts absent for major work streams",
        risk: "Chaos, thrashing, last-minute scrambles, hidden blockers",
        sortOrder: 4,
      },
      {
        id: "standard-core-skill-practice",
        familyId: "family-how-people-work",
        name: "Core Skill Practice",
        definition:
          "Deliberate practice of fundamental skills outside of high-pressure delivery contexts.",
        signals: [
          "Practice sessions scheduled and completed",
          "Skill-building activities documented",
          "Fundamentals referenced in team discussions",
        ],
        sources: ["Time logs", "Learning records", "Observation checklists"],
        threshold: "If fewer than 2 practice sessions per month",
        risk: "Skill erosion, reliance on luck instead of capability, brittleness under pressure",
        sortOrder: 5,
      },
      {
        id: "standard-enthusiasm",
        familyId: "family-how-people-work",
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
        sortOrder: 6,
      },
    ],
  },
  {
    id: "family-how-people-talk",
    name: "How People Talk",
    description: "",
    icon: "message-square",
    color: "red",
    sortOrder: 2,
    standards: [
      {
        id: "standard-asking-questions",
        familyId: "family-how-people-talk",
        name: "Asking Questions",
        definition:
          "Seeking clarity, challenging assumptions, and surfacing unknowns through active inquiry.",
        signals: [
          "Questions asked in meetings or chat",
          "Clarifying language used before decisions",
          "Assumptions questioned or tested",
        ],
        sources: ["Meeting transcripts", "Chat logs", "Decision records"],
        threshold: "If question frequency drops below 3 per team discussion",
        risk: "False consensus, hidden confusion, poor decision quality",
        sortOrder: 1,
      },
      {
        id: "standard-sharing-unique-information",
        familyId: "family-how-people-talk",
        name: "Sharing Unique Information",
        definition:
          "Contributing specialized knowledge, context, or perspective that others may not have.",
        signals: [
          "Unique data or insights introduced to discussions",
          "Domain expertise referenced and explained",
          "Diverse viewpoints acknowledged",
        ],
        sources: ["Meeting transcripts", "Documentation contributions", "Discussion threads"],
        threshold: "If fewer than 50% of team members contribute unique info weekly",
        risk: "Groupthink, blind spots, suboptimal solutions",
        sortOrder: 2,
      },
      {
        id: "standard-problem-focused-discussion",
        familyId: "family-how-people-talk",
        name: "Problem-Focused Discussion",
        definition:
          "Conversations centered on solving specific challenges rather than blame or distraction.",
        signals: [
          "Root causes explored in discussions",
          "Solution proposals offered and debated",
          "Blame language absent or corrected",
        ],
        sources: ["Meeting transcripts", "Retrospective notes", "Chat threads"],
        threshold: "If problem-solving tone drops below 60% in team meetings",
        risk: "Defensiveness, unresolved issues, culture of blame",
        sortOrder: 3,
      },
    ],
  },
  {
    id: "family-how-people-learn",
    name: "How People Learn",
    description: "",
    icon: "graduation-cap",
    color: "yellow",
    sortOrder: 3,
    standards: [
      {
        id: "standard-seeking-feedback",
        familyId: "family-how-people-learn",
        name: "Seeking Feedback",
        definition:
          "Actively requesting input, critique, or guidance on work in progress.",
        signals: [
          "Feedback explicitly requested",
          "Work shared before completion for review",
          "Critiques welcomed and integrated",
        ],
        sources: ["Meeting transcripts", "Code/doc review requests", "Chat logs"],
        threshold: "If fewer than 2 feedback requests per team member per sprint",
        risk: "Wasted effort, misaligned work, slow improvement",
        sortOrder: 1,
      },
      {
        id: "standard-requesting-help",
        familyId: "family-how-people-learn",
        name: "Requesting Help",
        definition:
          "Asking for assistance when stuck, rather than suffering in silence or failing independently.",
        signals: [
          "Help requests posted in team channels",
          "Blockers escalated promptly",
          "Pairing or collaboration initiated when struggling",
        ],
        sources: ["Chat logs", "Standup notes", "Task updates"],
        threshold: "If no help requests for 2+ weeks despite known challenges",
        risk: "Hidden struggle, burnout, preventable failures",
        sortOrder: 2,
      },
      {
        id: "standard-reporting-errors",
        familyId: "family-how-people-learn",
        name: "Reporting Errors",
        definition:
          "Transparently acknowledging mistakes, near-misses, or failures for team learning.",
        signals: [
          "Errors disclosed publicly",
          "Incident reports filed",
          "Lessons shared from mistakes",
        ],
        sources: ["Incident logs", "Retrospectives", "Team channels"],
        threshold: "If error reporting drops to zero for extended periods (unlikely to be real)",
        risk: "Cover-up culture, repeated mistakes, eroded trust",
        sortOrder: 3,
      },
    ],
  },
];

export const coachesFallback: CoachEntry[] = [
  {
    id: "coach-john-wooden",
    name: "John Wooden",
    philosophy:
      "Success is peace of mind attained through self-satisfaction in knowing you made the effort to do your best.",
    accentColor: "blue",
    sortOrder: 1,
    matrixLabel: "Wooden: Daily Fundamentals",
    matrixAiSupport: "Track completion, alert on skips",
    practices: [
      {
        title: "Industriousness",
        description:
          "Consistent, hard work on fundamentals. No shortcuts, no excuses. Excellence through daily discipline.",
      },
      {
        title: "Enthusiasm",
        description:
          "Bring energy and joy to practice. Love of the game fuels improvement and team connection.",
      },
      {
        title: "Fundamentals First",
        description:
          "Master the basics before complexity. Every practice starts with core skills, every season starts with shoe-tying.",
      },
      {
        title: "Daily Practice Discipline",
        description:
          "Structure every minute. Practice plans are detailed, timed, and reviewed. No wasted moments.",
      },
    ],
    teamApplication:
      "Teams establish daily fundamentals practice—code reviews, planning rituals, skill-building sessions. Work is structured with clear expectations and consistent cadence. Leaders model industriousness and enthusiasm, creating a culture where effort is celebrated and fundamentals are never skipped.",
    aiSupport:
      "AI tracks fundamentals completion (code review participation, planning session attendance, skill practice hours). Nudges remind teams when practice sessions are skipped or when quality of fundamentals drops. Patterns identify when teams abandon basics under pressure.",
    ritualName: "Daily Fundamentals Block",
    ritualDescription:
      "Every day, 30 minutes dedicated to core skills. Monday: code review practice. Tuesday: planning decomposition. Wednesday: documentation fundamentals. Thursday: testing discipline. Friday: retrospective reflection. No meetings scheduled during this time.",
  },
  {
    id: "coach-bill-belichick",
    name: "Bill Belichick",
    philosophy: "Do your job. Ignore the noise. Exploit inefficiencies. Prepare for everything.",
    accentColor: "red",
    sortOrder: 2,
    matrixLabel: "Belichick: Scenario Planning",
    matrixAiSupport: "Surface edge cases, flag violations",
    practices: [
      {
        title: "Strategic Flexibility",
        description:
          "Adapt game plan to opponent's weaknesses. No rigid playbook—only situational excellence.",
      },
      {
        title: "Exploiting Inefficiencies",
        description:
          "Find what others miss. Study edge cases, special teams, overlooked details. Win in the margins.",
      },
      {
        title: "Preparation Over Talent",
        description:
          "Out-prepare everyone. Film study, scenario planning, contingency drills. Readiness beats raw ability.",
      },
      {
        title: "Standards Enforcement",
        description:
          "Rules are non-negotiable. Violate standards, lose playing time—regardless of talent. Consistency over stars.",
      },
    ],
    teamApplication:
      "Teams prepare for edge cases and failure modes, not just happy paths. Retrospectives analyze what competitors/peers miss. Standards (code quality, planning rigor, communication clarity) are enforced uniformly. High performers who violate standards face consequences. Situational playbooks replace rigid processes.",
    aiSupport:
      "AI identifies patterns in failed edge cases, surfaces overlooked risks, and flags standards violations (incomplete reviews, missing tests, undocumented decisions). Nudges prompt teams to prepare for scenario variations before execution.",
    ritualName: "Weekly Scenario Planning",
    ritualDescription:
      "Every Friday, 45 minutes: identify next week's top 3 risks. For each, create a mini-playbook—what breaks, how to detect it, and response protocol. Review previous week's misses and add to edge case library.",
  },
  {
    id: "coach-pep-guardiola",
    name: "Pep Guardiola",
    philosophy: "Control through structure. Freedom within discipline. Make the right decision easy.",
    accentColor: "yellow",
    sortOrder: 3,
    matrixLabel: "Guardiola: Non-Negotiables",
    matrixAiSupport: "Monitor adherence, suggest env improvements",
    practices: [
      {
        title: "Strict Rules",
        description:
          "Positional rules are non-negotiable. When and where to press, pass, move—all defined. Creativity emerges from structure.",
      },
      {
        title: "Non-Negotiables",
        description:
          "Principles before tactics. High press, possession dominance, positional play—these never change, regardless of opponent.",
      },
      {
        title: "Engineered Conditions",
        description:
          "Design the environment to force good habits. Training drills mimic game pressure. Repetition makes excellence automatic.",
      },
      {
        title: "Positional Advantage",
        description:
          "Always be in the right place at the right time. Space, angles, timing—structure creates superiority.",
      },
    ],
    teamApplication:
      "Teams define non-negotiable principles (e.g., all code reviewed, all decisions documented, all commitments closed). Workflows are structured to make violations hard and compliance easy. Environments (templates, checklists, automation) are engineered to reinforce standards. Flexibility exists only within boundaries.",
    aiSupport:
      "AI monitors adherence to non-negotiables, flags deviations, and suggests environment improvements (better templates, clearer workflows). Nudges reinforce positional discipline—'close the loop before starting new work,' 'document before deciding.'",
    ritualName: "Principles Review + Environment Tuning",
    ritualDescription:
      "Monthly ritual: review team's non-negotiables. Are they still the right ones? Are they being followed? If violations are common, don't blame people—redesign the environment. Update templates, add automation, simplify compliance.",
  },
  {
    id: "coach-nick-saban",
    name: "Nick Saban",
    philosophy:
      "The Process: focus on what you can control, ignore results, execute the next play with perfection.",
    accentColor: "pink",
    sortOrder: 4,
    matrixLabel: "Saban: What's Important Now",
    matrixAiSupport: "Prompt focus, protect deep work",
    practices: [
      {
        title: "The Process",
        description:
          "Break everything into smallest controllable units. Execute each with full effort. Trust that results follow execution.",
      },
      {
        title: "WIN: What's Important Now",
        description:
          "Only focus on the immediate task. Not the score, not the future—just the current moment's requirement.",
      },
      {
        title: "Emotional Neutrality",
        description:
          "No highs, no lows. Celebrate briefly, then refocus. Lose badly, then refocus. Consistency over emotion.",
      },
      {
        title: "Daily Decomposition",
        description:
          "Every goal becomes today's tasks. Championships are won in practice reps, not game day magic.",
      },
    ],
    teamApplication:
      "Teams decompose large goals into daily tasks. Retrospectives focus on execution quality, not outcomes. Wins and losses are acknowledged briefly, then work resumes. 'What's important now?' becomes the default question when overwhelmed. Deep work is protected—2-hour blocks for focused execution.",
    aiSupport:
      "AI prompts 'What's important now?' when multiple priorities collide. Tracks deep work blocks and alerts when they're consistently interrupted. Decomposes large tasks into next-action prompts. Reinforces process focus by surfacing execution quality metrics, not just results.",
    ritualName: "WIN Check-In + Deep Work Block",
    ritualDescription:
      "Daily standup starts with 'What's Important Now?' Each person names their single most critical task for today. Then, everyone gets a protected 2-hour deep work block—no meetings, no interruptions. At end of day, brief reflection: did I execute today's WIN with full effort?",
  },
];
