import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle2, Minus } from "lucide-react";
import { ContentCard } from "../components/ContentCard";
import { StatusBadge } from "../components/StatusBadge";
import { LabelTag } from "../components/LabelTag";

interface MetricTileProps {
  name: string;
  value: string;
  trend: "up" | "down" | "stable";
  status: "green" | "yellow" | "red";
  note: string;
}

function MetricTile({ name, value, trend, status, note }: MetricTileProps) {
  const TrendIcon = trend === "up" ? TrendingUp : trend === "down" ? TrendingDown : Minus;
  const trendColor = trend === "up" ? "#4CAF50" : trend === "down" ? "var(--color-sport-red)" : "var(--color-warm-gray)";

  return (
    <div 
      className="p-5 border-2"
      style={{ 
        backgroundColor: 'var(--color-paper-white)',
        borderColor: status === 'red' ? 'var(--color-sport-red)' : status === 'yellow' ? 'var(--color-archive-yellow)' : 'var(--color-ink-black)' + '20'
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-sm font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-body)' }}>
          {name}
        </h3>
        <TrendIcon size={18} style={{ color: trendColor }} />
      </div>
      
      <div 
        className="text-4xl font-bold mb-2"
        style={{ 
          fontFamily: 'var(--font-display)',
          color: 'var(--color-ink-black)'
        }}
      >
        {value}
      </div>

      <div className="mb-3">
        <StatusBadge status={status} label={status.toUpperCase()} />
      </div>

      <p className="text-xs italic" style={{ color: 'var(--color-ink-black)' + 'AA' }}>
        {note}
      </p>
    </div>
  );
}

export function Dashboard() {
  const metrics = [
    {
      name: "Speak Up Early",
      value: "68%",
      trend: "down" as const,
      status: "yellow" as const,
      note: "Questions asked before decisions finalized"
    },
    {
      name: "Invite Voice",
      value: "82%",
      trend: "up" as const,
      status: "green" as const,
      note: "Active solicitation of quieter team members"
    },
    {
      name: "Clean Turns",
      value: "91%",
      trend: "stable" as const,
      status: "green" as const,
      note: "Smooth handoffs between work stages"
    },
    {
      name: "Recognition Density",
      value: "54%",
      trend: "down" as const,
      status: "red" as const,
      note: "Teammate contributions acknowledged"
    },
    {
      name: "Run the Reps",
      value: "76%",
      trend: "up" as const,
      status: "green" as const,
      note: "Fundamental practice sessions completed"
    },
    {
      name: "Close the Loop",
      value: "63%",
      trend: "down" as const,
      status: "yellow" as const,
      note: "Commitments followed through to completion"
    },
  ];

  const alerts = [
    { type: "red" as const, title: "Feedback Loop Weakness", desc: "Recognition density below threshold for 2 weeks" },
    { type: "yellow" as const, title: "Collective Efficacy Slide", desc: "Team confidence metrics trending downward" },
    { type: "red" as const, title: "System Strain", desc: "Multiple concurrent pressures without relief" },
    { type: "yellow" as const, title: "Slow Follow-Through", desc: "Close the Loop metric declining steadily" },
  ];

  const signals = [
    "3 team members asked clarifying questions in sprint planning",
    "Recognition mentioned 12 times this week (down from 18)",
    "2 handoff delays noted in retrospective",
    "Fundamental skills practice: 4/5 sessions completed",
    "Team lead invited 2 new voices to contribute ideas",
  ];

  const nudges = [
    { action: "Invite one quieter voice", context: "Before next decision point" },
    { action: "Recognize one teammate contribution", context: "In today's standup" },
    { action: "Close one open commitment", context: "Review from last week's backlog" },
    { action: "Run one fundamentals rep", context: "Schedule 30-min practice block" },
  ];

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: 'var(--color-warm-paper)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <LabelTag variant="red">Performance Monitor</LabelTag>
          <h1 
            className="text-4xl md:text-5xl mt-4"
            style={{ 
              fontFamily: 'var(--font-display)',
              color: 'var(--color-ink-black)'
            }}
          >
            Culture Dashboard
          </h1>
          <p className="text-lg mt-2" style={{ color: 'var(--color-ink-black)' + 'DD' }}>
            Real-time signals, thresholds, and team health indicators
          </p>
        </div>

        {/* Summary Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ContentCard accent="blue">
            <div className="flex items-start justify-between">
              <div>
                <LabelTag>Overall</LabelTag>
                <h2 className="text-2xl font-bold mt-3 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  Culture Health
                </h2>
                <div className="flex items-center gap-3">
                  <div 
                    className="text-5xl font-bold"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-archive-yellow)'
                    }}
                  >
                    73%
                  </div>
                  <StatusBadge status="yellow" label="WATCH" />
                </div>
              </div>
              <CheckCircle2 size={48} style={{ color: 'var(--color-cold-blue)' }} />
            </div>
            <p className="text-sm mt-4" style={{ color: 'var(--color-ink-black)' + 'CC' }}>
              4 of 6 metrics in healthy range. Recognition and feedback loops need attention.
            </p>
          </ContentCard>

          <ContentCard accent="red">
            <div className="flex items-start justify-between">
              <div>
                <LabelTag variant="red">Adherence</LabelTag>
                <h2 className="text-2xl font-bold mt-3 mb-2" style={{ fontFamily: 'var(--font-body)' }}>
                  Standards Active
                </h2>
                <div className="flex items-center gap-3">
                  <div 
                    className="text-5xl font-bold"
                    style={{ 
                      fontFamily: 'var(--font-display)',
                      color: 'var(--color-sport-red)'
                    }}
                  >
                    11/13
                  </div>
                  <StatusBadge status="green" label="GOOD" />
                </div>
              </div>
              <AlertTriangle size={48} style={{ color: 'var(--color-sport-red)' }} />
            </div>
            <p className="text-sm mt-4" style={{ color: 'var(--color-ink-black)' + 'CC' }}>
              Most standards showing consistent application. Focus areas: Recognition, Loop Closure.
            </p>
          </ContentCard>
        </div>

        {/* Metrics Grid */}
        <div className="mb-8">
          <div className="mb-4">
            <LabelTag>Key Metrics</LabelTag>
            <h2 className="text-2xl font-bold mt-2" style={{ fontFamily: 'var(--font-body)' }}>
              Team Behavior Signals
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <MetricTile key={metric.name} {...metric} />
            ))}
          </div>
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <div className="mb-4">
            <LabelTag variant="red">Watchouts</LabelTag>
            <h2 className="text-2xl font-bold mt-2" style={{ fontFamily: 'var(--font-body)' }}>
              Active Alerts
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {alerts.map((alert, idx) => (
              <div 
                key={idx}
                className="p-4 border-l-4"
                style={{ 
                  backgroundColor: 'var(--color-paper-white)',
                  borderLeftColor: alert.type === 'red' ? 'var(--color-sport-red)' : 'var(--color-archive-yellow)'
                }}
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle 
                    size={20} 
                    style={{ color: alert.type === 'red' ? 'var(--color-sport-red)' : 'var(--color-archive-yellow)' }}
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                      {alert.title}
                    </h3>
                    <p className="text-xs" style={{ color: 'var(--color-ink-black)' + 'AA' }}>
                      {alert.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Signals and Nudges */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* This Week's Signals */}
          <div>
            <div className="mb-4">
              <LabelTag variant="yellow">Observations</LabelTag>
              <h2 className="text-2xl font-bold mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                This Week's Signals
              </h2>
            </div>

            <ContentCard>
              <ul className="space-y-3">
                {signals.map((signal, idx) => (
                  <li 
                    key={idx}
                    className="text-sm pb-3 border-b last:border-b-0"
                    style={{ 
                      borderColor: 'var(--color-warm-gray)',
                      fontFamily: 'var(--font-body)'
                    }}
                  >
                    <span className="font-bold mr-2" style={{ color: 'var(--color-sport-red)' }}>•</span>
                    {signal}
                  </li>
                ))}
              </ul>
            </ContentCard>
          </div>

          {/* AI Suggested Nudges */}
          <div>
            <div className="mb-4">
              <LabelTag variant="pink">AI Support</LabelTag>
              <h2 className="text-2xl font-bold mt-2" style={{ fontFamily: 'var(--font-body)' }}>
                Suggested Nudges
              </h2>
            </div>

            <ContentCard>
              <div className="space-y-4">
                {nudges.map((nudge, idx) => (
                  <div 
                    key={idx}
                    className="pb-4 border-b last:border-b-0"
                    style={{ borderColor: 'var(--color-warm-gray)' }}
                  >
                    <h3 className="font-bold text-sm mb-1" style={{ fontFamily: 'var(--font-body)' }}>
                      {nudge.action}
                    </h3>
                    <p className="text-xs italic" style={{ color: 'var(--color-ink-black)' + 'AA' }}>
                      {nudge.context}
                    </p>
                  </div>
                ))}
              </div>
            </ContentCard>
          </div>
        </div>
      </div>
    </div>
  );
}
