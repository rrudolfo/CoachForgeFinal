import { ContentCard } from "../components/ContentCard";
import { LabelTag } from "../components/LabelTag";

interface CoachSectionProps {
  name: string;
  philosophy: string;
  practices: { title: string; description: string }[];
  teamApplication: string;
  aiSupport: string;
  ritual: { name: string; description: string };
  accentColor: string;
}

function CoachSection({ name, philosophy, practices, teamApplication, aiSupport, ritual, accentColor }: CoachSectionProps) {
  return (
    <div 
      className="border-4 mb-8"
      style={{ 
        backgroundColor: 'var(--color-paper-white)',
        borderColor: accentColor
      }}
    >
      <div 
        className="p-6 border-b-4"
        style={{ 
          backgroundColor: accentColor,
          borderColor: 'var(--color-ink-black)',
          color: accentColor === 'var(--color-archive-yellow)' ? 'var(--color-ink-black)' : '#fff'
        }}
      >
        <h2 
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {name}
        </h2>
        <p className="text-lg mt-2 italic" style={{ fontFamily: 'var(--font-body)' }}>
          {philosophy}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Key Practices */}
        <div>
          <LabelTag variant="red">Key Practices</LabelTag>
          <div className="mt-3 space-y-3">
            {practices.map((practice, idx) => (
              <div 
                key={idx}
                className="p-4 border-l-4"
                style={{ 
                  borderLeftColor: accentColor,
                  backgroundColor: 'var(--color-warm-paper)'
                }}
              >
                <h4 className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                  {practice.title}
                </h4>
                <p className="text-sm" style={{ color: 'var(--color-ink-black)' + 'DD' }}>
                  {practice.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Application */}
        <div>
          <LabelTag>In Team/Org Context</LabelTag>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-ink-black)' }}>
            {teamApplication}
          </p>
        </div>

        {/* AI Support */}
        <div>
          <LabelTag variant="yellow">What AI Can Support</LabelTag>
          <p className="text-sm mt-2 leading-relaxed" style={{ color: 'var(--color-ink-black)' }}>
            {aiSupport}
          </p>
        </div>

        {/* Ritual Example */}
        <div 
          className="p-5 border-2"
          style={{ 
            borderColor: accentColor,
            backgroundColor: 'var(--color-warm-paper)'
          }}
        >
          <LabelTag variant="pink">Ritual Example</LabelTag>
          <h4 className="font-bold mt-3 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
            {ritual.name}
          </h4>
          <p className="text-sm" style={{ color: 'var(--color-ink-black)' }}>
            {ritual.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CoachPlaybook() {
  const coaches: CoachSectionProps[] = [
    {
      name: "John Wooden",
      philosophy: "Success is peace of mind attained through self-satisfaction in knowing you made the effort to do your best.",
      accentColor: 'var(--color-cold-blue)',
      practices: [
        {
          title: "Industriousness",
          description: "Consistent, hard work on fundamentals. No shortcuts, no excuses. Excellence through daily discipline.",
        },
        {
          title: "Enthusiasm",
          description: "Bring energy and joy to practice. Love of the game fuels improvement and team connection.",
        },
        {
          title: "Fundamentals First",
          description: "Master the basics before complexity. Every practice starts with core skills, every season starts with shoe-tying.",
        },
        {
          title: "Daily Practice Discipline",
          description: "Structure every minute. Practice plans are detailed, timed, and reviewed. No wasted moments.",
        },
      ],
      teamApplication: "Teams establish daily fundamentals practice—code reviews, planning rituals, skill-building sessions. Work is structured with clear expectations and consistent cadence. Leaders model industriousness and enthusiasm, creating a culture where effort is celebrated and fundamentals are never skipped.",
      aiSupport: "AI tracks fundamentals completion (code review participation, planning session attendance, skill practice hours). Nudges remind teams when practice sessions are skipped or when quality of fundamentals drops. Patterns identify when teams abandon basics under pressure.",
      ritual: {
        name: "Daily Fundamentals Block",
        description: "Every day, 30 minutes dedicated to core skills. Monday: code review practice. Tuesday: planning decomposition. Wednesday: documentation fundamentals. Thursday: testing discipline. Friday: retrospective reflection. No meetings scheduled during this time.",
      },
    },
    {
      name: "Bill Belichick",
      philosophy: "Do your job. Ignore the noise. Exploit inefficiencies. Prepare for everything.",
      accentColor: 'var(--color-sport-red)',
      practices: [
        {
          title: "Strategic Flexibility",
          description: "Adapt game plan to opponent's weaknesses. No rigid playbook—only situational excellence.",
        },
        {
          title: "Exploiting Inefficiencies",
          description: "Find what others miss. Study edge cases, special teams, overlooked details. Win in the margins.",
        },
        {
          title: "Preparation Over Talent",
          description: "Out-prepare everyone. Film study, scenario planning, contingency drills. Readiness beats raw ability.",
        },
        {
          title: "Standards Enforcement",
          description: "Rules are non-negotiable. Violate standards, lose playing time—regardless of talent. Consistency over stars.",
        },
      ],
      teamApplication: "Teams prepare for edge cases and failure modes, not just happy paths. Retrospectives analyze what competitors/peers miss. Standards (code quality, planning rigor, communication clarity) are enforced uniformly. High performers who violate standards face consequences. Situational playbooks replace rigid processes.",
      aiSupport: "AI identifies patterns in failed edge cases, surfaces overlooked risks, and flags standards violations (incomplete reviews, missing tests, undocumented decisions). Nudges prompt teams to prepare for scenario variations before execution.",
      ritual: {
        name: "Weekly Scenario Planning",
        description: "Every Friday, 45 minutes: identify next week's top 3 risks. For each, create a mini-playbook—what breaks, how to detect it, and response protocol. Review previous week's misses and add to edge case library.",
      },
    },
    {
      name: "Pep Guardiola",
      philosophy: "Control through structure. Freedom within discipline. Make the right decision easy.",
      accentColor: 'var(--color-archive-yellow)',
      practices: [
        {
          title: "Strict Rules",
          description: "Positional rules are non-negotiable. When and where to press, pass, move—all defined. Creativity emerges from structure.",
        },
        {
          title: "Non-Negotiables",
          description: "Principles before tactics. High press, possession dominance, positional play—these never change, regardless of opponent.",
        },
        {
          title: "Engineered Conditions",
          description: "Design the environment to force good habits. Training drills mimic game pressure. Repetition makes excellence automatic.",
        },
        {
          title: "Positional Advantage",
          description: "Always be in the right place at the right time. Space, angles, timing—structure creates superiority.",
        },
      ],
      teamApplication: "Teams define non-negotiable principles (e.g., all code reviewed, all decisions documented, all commitments closed). Workflows are structured to make violations hard and compliance easy. Environments (templates, checklists, automation) are engineered to reinforce standards. Flexibility exists only within boundaries.",
      aiSupport: "AI monitors adherence to non-negotiables, flags deviations, and suggests environment improvements (better templates, clearer workflows). Nudges reinforce positional discipline—'close the loop before starting new work,' 'document before deciding.'",
      ritual: {
        name: "Principles Review + Environment Tuning",
        description: "Monthly ritual: review team's non-negotiables. Are they still the right ones? Are they being followed? If violations are common, don't blame people—redesign the environment. Update templates, add automation, simplify compliance.",
      },
    },
    {
      name: "Nick Saban",
      philosophy: "The Process: focus on what you can control, ignore results, execute the next play with perfection.",
      accentColor: 'var(--color-label-pink)',
      practices: [
        {
          title: "The Process",
          description: "Break everything into smallest controllable units. Execute each with full effort. Trust that results follow execution.",
        },
        {
          title: "WIN: What's Important Now",
          description: "Only focus on the immediate task. Not the score, not the future—just the current moment's requirement.",
        },
        {
          title: "Emotional Neutrality",
          description: "No highs, no lows. Celebrate briefly, then refocus. Lose badly, then refocus. Consistency over emotion.",
        },
        {
          title: "Daily Decomposition",
          description: "Every goal becomes today's tasks. Championships are won in practice reps, not game day magic.",
        },
      ],
      teamApplication: "Teams decompose large goals into daily tasks. Retrospectives focus on execution quality, not outcomes. Wins and losses are acknowledged briefly, then work resumes. 'What's important now?' becomes the default question when overwhelmed. Deep work is protected—2-hour blocks for focused execution.",
      aiSupport: "AI prompts 'What's important now?' when multiple priorities collide. Tracks deep work blocks and alerts when they're consistently interrupted. Decomposes large tasks into next-action prompts. Reinforces process focus by surfacing execution quality metrics, not just results.",
      ritual: {
        name: "WIN Check-In + Deep Work Block",
        description: "Daily standup starts with 'What's Important Now?' Each person names their single most critical task for today. Then, everyone gets a protected 2-hour deep work block—no meetings, no interruptions. At end of day, brief reflection: did I execute today's WIN with full effort?",
      },
    },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--color-warm-paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <LabelTag variant="red">Elite Coaching</LabelTag>
          <h1 
            className="text-4xl md:text-5xl mt-4"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink-black)'
            }}
          >
            Coach Playbook
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--color-ink-black)' + 'DD' }}>
            Translating legendary coaching practices into team rituals and AI support
          </p>
        </div>

        {/* Intro */}
        <ContentCard className="mb-12">
          <p className="text-sm leading-relaxed mb-4">
            Elite coaches don't just win games. They build <strong>systems</strong> that create consistent excellence. 
            Wooden's fundamentals, Belichick's preparation, Guardiola's structure, Saban's process—these aren't sports tactics. 
            They're <strong>operating principles</strong> for any high-performing team.
          </p>
          <p className="text-sm leading-relaxed">
            This playbook translates their practices into organizational rituals and shows how AI can support 
            (but never replace) the human coaching function.
          </p>
        </ContentCard>

        {/* Coach Sections */}
        {coaches.map((coach) => (
          <CoachSection key={coach.name} {...coach} />
        ))}

        {/* Matrix */}
        <div className="mt-12">
          <div className="mb-6">
            <LabelTag variant="red">Cross-Reference</LabelTag>
            <h2 
              className="text-3xl font-bold mt-4"
              style={{ 
                fontFamily: 'var(--font-display)',
                color: 'var(--color-ink-black)'
              }}
            >
              Coach Practice → Team Ritual → AI Signal Support
            </h2>
          </div>

          <ContentCard>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ backgroundColor: 'var(--color-warm-paper)' }}>
                    <th className="p-3 text-left font-bold border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Coach Practice
                    </th>
                    <th className="p-3 text-left font-bold border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Team Ritual
                    </th>
                    <th className="p-3 text-left font-bold border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      AI Signal Support
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Wooden: Daily Fundamentals
                    </td>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      30-min daily practice block
                    </td>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Track completion, alert on skips
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: 'var(--color-warm-paper)' }}>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Belichick: Scenario Planning
                    </td>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Weekly risk playbook session
                    </td>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Surface edge cases, flag violations
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Guardiola: Non-Negotiables
                    </td>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Monthly principles review
                    </td>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Monitor adherence, suggest env improvements
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: 'var(--color-warm-paper)' }}>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Saban: What's Important Now
                    </td>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Daily WIN check-in + deep work
                    </td>
                    <td className="p-3 border" style={{ borderColor: 'var(--color-ink-black)' + '30' }}>
                      Prompt focus, protect deep work
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ContentCard>
        </div>
      </div>
    </div>
  );
}
