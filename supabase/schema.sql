create extension if not exists pgcrypto;

create table if not exists public.editor_users (
  email text primary key,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.practical_tools (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text,
  description text,
  link text,
  items jsonb not null default '[]'::jsonb,
  icon text not null default 'none',
  accent text not null default 'none',
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.standards_families (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text not null default 'file-text',
  color text not null default 'blue',
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.standards_items (
  id uuid primary key default gen_random_uuid(),
  family_id uuid not null references public.standards_families(id) on delete cascade,
  name text not null,
  definition text not null,
  signals text[] not null default '{}'::text[],
  sources text[] not null default '{}'::text[],
  threshold text,
  risk text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.coaches (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  philosophy text not null,
  team_application text,
  ai_support text,
  ritual_name text,
  ritual_description text,
  practices jsonb not null default '[]'::jsonb,
  accent_color text not null default 'blue',
  matrix_label text,
  matrix_ai_support text,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists practical_tools_set_updated_at on public.practical_tools;
create trigger practical_tools_set_updated_at
before update on public.practical_tools
for each row
execute function public.set_updated_at();

drop trigger if exists standards_families_set_updated_at on public.standards_families;
create trigger standards_families_set_updated_at
before update on public.standards_families
for each row
execute function public.set_updated_at();

drop trigger if exists standards_items_set_updated_at on public.standards_items;
create trigger standards_items_set_updated_at
before update on public.standards_items
for each row
execute function public.set_updated_at();

drop trigger if exists coaches_set_updated_at on public.coaches;
create trigger coaches_set_updated_at
before update on public.coaches
for each row
execute function public.set_updated_at();

create or replace function public.is_editor()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.editor_users
    where email = auth.jwt() ->> 'email'
  );
$$;

revoke all on function public.is_editor() from public;
grant execute on function public.is_editor() to anon, authenticated;

alter table public.editor_users enable row level security;
alter table public.practical_tools enable row level security;
alter table public.standards_families enable row level security;
alter table public.standards_items enable row level security;
alter table public.coaches enable row level security;

drop policy if exists "Public read practical tools" on public.practical_tools;
create policy "Public read practical tools"
on public.practical_tools
for select
using (true);

drop policy if exists "Editors write practical tools" on public.practical_tools;
create policy "Editors write practical tools"
on public.practical_tools
for all
using (public.is_editor())
with check (public.is_editor());

drop policy if exists "Public read standards families" on public.standards_families;
create policy "Public read standards families"
on public.standards_families
for select
using (true);

drop policy if exists "Editors write standards families" on public.standards_families;
create policy "Editors write standards families"
on public.standards_families
for all
using (public.is_editor())
with check (public.is_editor());

drop policy if exists "Public read standards items" on public.standards_items;
create policy "Public read standards items"
on public.standards_items
for select
using (true);

drop policy if exists "Editors write standards items" on public.standards_items;
create policy "Editors write standards items"
on public.standards_items
for all
using (public.is_editor())
with check (public.is_editor());

drop policy if exists "Public read coaches" on public.coaches;
create policy "Public read coaches"
on public.coaches
for select
using (true);

drop policy if exists "Editors write coaches" on public.coaches;
create policy "Editors write coaches"
on public.coaches
for all
using (public.is_editor())
with check (public.is_editor());

insert into public.practical_tools (id, title, category, description, link, items, icon, accent, sort_order)
values
  (
    '00000000-0000-0000-0000-000000000001',
    'Weekly Review Checklist',
    'Toolkit',
    '',
    '',
    $$[
      {"marker":"checkbox","text":"Which standards showed up this week?"},
      {"marker":"checkbox","text":"Where did friction repeat?"},
      {"marker":"checkbox","text":"What signal moved most?"},
      {"marker":"checkbox","text":"Which nudge worked?"},
      {"marker":"checkbox","text":"What needs human coaching vs AI prompting?"},
      {"marker":"checkbox","text":"What is the WIN for next week?"}
    ]$$::jsonb,
    'file-check',
    'blue',
    1
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Nudge Library',
    'Toolkit',
    '',
    '',
    $$[
      {"marker":"arrow","text":"Ask one clarifying question before solving"},
      {"marker":"arrow","text":"Invite one quieter voice"},
      {"marker":"arrow","text":"Close one open commitment"},
      {"marker":"arrow","text":"Run one fundamentals rep"},
      {"marker":"arrow","text":"Name one early risk"},
      {"marker":"arrow","text":"Recognize one teammate contribution"},
      {"marker":"arrow","text":"Break this into 3 smaller deliverables"},
      {"marker":"arrow","text":"Preview the first 10% of this work"},
      {"marker":"arrow","text":"Reset your WIP—close or commit"},
      {"marker":"arrow","text":"Check root cause before moving forward"}
    ]$$::jsonb,
    'lightbulb',
    'red',
    2
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Meeting Reflection Prompts',
    'Toolkit',
    '',
    '',
    $$[
      {"marker":"question","text":"Did everyone speak?"},
      {"marker":"question","text":"Were unique perspectives surfaced?"},
      {"marker":"question","text":"Did we solve problems or assign blame?"},
      {"marker":"question","text":"What questions went unasked?"},
      {"marker":"question","text":"What commitment did we make?"}
    ]$$::jsonb,
    'users',
    'yellow',
    3
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Commitment Follow-Through',
    'Toolkit',
    '',
    '',
    $$[
      {"marker":"check","text":"Is the commitment clearly stated?"},
      {"marker":"check","text":"Who owns it?"},
      {"marker":"check","text":"When is it due?"},
      {"marker":"check","text":"How will we know it''s done?"},
      {"marker":"check","text":"Who needs to be updated when it''s complete?"}
    ]$$::jsonb,
    'file-check',
    'pink',
    4
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Standards Review Prompts',
    'Toolkit',
    '',
    '',
    $$[
      {"marker":"bullet","text":"Which standard is strongest right now?"},
      {"marker":"bullet","text":"Which standard needs attention?"},
      {"marker":"bullet","text":"What behavior would we add to the library?"},
      {"marker":"bullet","text":"What threshold should we adjust?"},
      {"marker":"bullet","text":"Where is the system helping? Where is it noisy?"}
    ]$$::jsonb,
    'none',
    'none',
    5
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'Team Ritual Examples',
    'Toolkit',
    '',
    '',
    $$[
      {"marker":"bullet","title":"Monday Morning Fundamentals","text":"Monday Morning Fundamentals","description":"30-minute team session focused on one core skill. Rotate weekly: planning, code review, testing, documentation."},
      {"marker":"bullet","title":"Friday Risk Scan","text":"Friday Risk Scan","description":"15-minute huddle to identify next week''s top 3 risks and assign ownership for monitoring."},
      {"marker":"bullet","title":"WIN Check-In","text":"WIN Check-In","description":"Daily standup starts with each person naming their single most important task for today."},
      {"marker":"bullet","title":"Recognition Ritual","text":"Recognition Ritual","description":"Every retrospective ends with each person recognizing one teammate contribution from the sprint."}
    ]$$::jsonb,
    'none',
    'none',
    6
  )
on conflict (id) do update
set
  title = excluded.title,
  category = excluded.category,
  description = excluded.description,
  link = excluded.link,
  items = excluded.items,
  icon = excluded.icon,
  accent = excluded.accent,
  sort_order = excluded.sort_order;

insert into public.standards_families (id, name, description, icon, color, sort_order)
values
  ('10000000-0000-0000-0000-000000000001', 'How People Work', '', 'file-text', 'blue', 1),
  ('10000000-0000-0000-0000-000000000002', 'How People Talk', '', 'message-square', 'red', 2),
  ('10000000-0000-0000-0000-000000000003', 'How People Learn', '', 'graduation-cap', 'yellow', 3)
on conflict (id) do update
set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  color = excluded.color,
  sort_order = excluded.sort_order;

insert into public.standards_items (id, family_id, name, definition, signals, sources, threshold, risk, sort_order)
values
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Industriousness',
    'Consistent effort applied to fundamental tasks without prompting. Work is initiated, sustained, and completed with visible momentum.',
    array['Tasks started without waiting for reminders','Sustained focus on core work during designated blocks','Work artifacts show progression over time'],
    array['Time logs','Task records','Planning docs'],
    'If less than 70% of planned work shows active progress weekly',
    'Stagnation, missed deadlines, dependency on external pressure to move work forward',
    1
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000001',
    'Initiative',
    'Proactive identification and pursuit of opportunities or solutions before being asked.',
    array['Problems surfaced before they escalate','Improvements suggested without formal prompts','Gaps in process or knowledge addressed independently'],
    array['Chat messages','Meeting transcripts','Task creation logs'],
    'If no proactive contributions noted for 2+ weeks',
    'Reactive culture, missed opportunities, dependence on leadership for all direction',
    2
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000001',
    'Cooperation',
    'Active collaboration with teammates, including shared work, responsive communication, and willingness to help.',
    array['Timely responses to requests for input or assistance','Joint work sessions or pair activities','Visible support for others'' efforts'],
    array['Meeting attendance','Collaboration tool activity','Observation checklists'],
    'If collaboration signals drop below 50% of baseline',
    'Siloed work, duplication of effort, interpersonal friction',
    3
  ),
  (
    '20000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000001',
    'Planning',
    'Structured preparation and forecasting before execution. Work is decomposed, sequenced, and resource-mapped.',
    array['Tasks broken down before starting','Dependencies identified and documented','Time estimates provided and revisited'],
    array['Planning docs','Task records','Retrospective notes'],
    'If planning artifacts absent for major work streams',
    'Chaos, thrashing, last-minute scrambles, hidden blockers',
    4
  ),
  (
    '20000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000001',
    'Core Skill Practice',
    'Deliberate practice of fundamental skills outside of high-pressure delivery contexts.',
    array['Practice sessions scheduled and completed','Skill-building activities documented','Fundamentals referenced in team discussions'],
    array['Time logs','Learning records','Observation checklists'],
    'If fewer than 2 practice sessions per month',
    'Skill erosion, reliance on luck instead of capability, brittleness under pressure',
    5
  ),
  (
    '20000000-0000-0000-0000-000000000006',
    '10000000-0000-0000-0000-000000000001',
    'Enthusiasm',
    'Visible energy and positive engagement with work and teammates.',
    array['Active participation in discussions','Positive language in communication','Volunteering for challenges or learning opportunities'],
    array['Meeting transcripts','Chat tone analysis','Observation notes'],
    'If engagement signals decline for 3+ consecutive observations',
    'Disengagement, low morale, talent attrition',
    6
  ),
  (
    '20000000-0000-0000-0000-000000000007',
    '10000000-0000-0000-0000-000000000002',
    'Asking Questions',
    'Seeking clarity, challenging assumptions, and surfacing unknowns through active inquiry.',
    array['Questions asked in meetings or chat','Clarifying language used before decisions','Assumptions questioned or tested'],
    array['Meeting transcripts','Chat logs','Decision records'],
    'If question frequency drops below 3 per team discussion',
    'False consensus, hidden confusion, poor decision quality',
    1
  ),
  (
    '20000000-0000-0000-0000-000000000008',
    '10000000-0000-0000-0000-000000000002',
    'Sharing Unique Information',
    'Contributing specialized knowledge, context, or perspective that others may not have.',
    array['Unique data or insights introduced to discussions','Domain expertise referenced and explained','Diverse viewpoints acknowledged'],
    array['Meeting transcripts','Documentation contributions','Discussion threads'],
    'If fewer than 50% of team members contribute unique info weekly',
    'Groupthink, blind spots, suboptimal solutions',
    2
  ),
  (
    '20000000-0000-0000-0000-000000000009',
    '10000000-0000-0000-0000-000000000002',
    'Problem-Focused Discussion',
    'Conversations centered on solving specific challenges rather than blame or distraction.',
    array['Root causes explored in discussions','Solution proposals offered and debated','Blame language absent or corrected'],
    array['Meeting transcripts','Retrospective notes','Chat threads'],
    'If problem-solving tone drops below 60% in team meetings',
    'Defensiveness, unresolved issues, culture of blame',
    3
  ),
  (
    '20000000-0000-0000-0000-000000000010',
    '10000000-0000-0000-0000-000000000003',
    'Seeking Feedback',
    'Actively requesting input, critique, or guidance on work in progress.',
    array['Feedback explicitly requested','Work shared before completion for review','Critiques welcomed and integrated'],
    array['Meeting transcripts','Code/doc review requests','Chat logs'],
    'If fewer than 2 feedback requests per team member per sprint',
    'Wasted effort, misaligned work, slow improvement',
    1
  ),
  (
    '20000000-0000-0000-0000-000000000011',
    '10000000-0000-0000-0000-000000000003',
    'Requesting Help',
    'Asking for assistance when stuck, rather than suffering in silence or failing independently.',
    array['Help requests posted in team channels','Blockers escalated promptly','Pairing or collaboration initiated when struggling'],
    array['Chat logs','Standup notes','Task updates'],
    'If no help requests for 2+ weeks despite known challenges',
    'Hidden struggle, burnout, preventable failures',
    2
  ),
  (
    '20000000-0000-0000-0000-000000000012',
    '10000000-0000-0000-0000-000000000003',
    'Reporting Errors',
    'Transparently acknowledging mistakes, near-misses, or failures for team learning.',
    array['Errors disclosed publicly','Incident reports filed','Lessons shared from mistakes'],
    array['Incident logs','Retrospectives','Team channels'],
    'If error reporting drops to zero for extended periods (unlikely to be real)',
    'Cover-up culture, repeated mistakes, eroded trust',
    3
  )
on conflict (id) do update
set
  family_id = excluded.family_id,
  name = excluded.name,
  definition = excluded.definition,
  signals = excluded.signals,
  sources = excluded.sources,
  threshold = excluded.threshold,
  risk = excluded.risk,
  sort_order = excluded.sort_order;

insert into public.coaches (
  id,
  name,
  philosophy,
  team_application,
  ai_support,
  ritual_name,
  ritual_description,
  practices,
  accent_color,
  matrix_label,
  matrix_ai_support,
  sort_order
)
values
  (
    '30000000-0000-0000-0000-000000000001',
    'John Wooden',
    'Success is peace of mind attained through self-satisfaction in knowing you made the effort to do your best.',
    'Teams establish daily fundamentals practice—code reviews, planning rituals, skill-building sessions. Work is structured with clear expectations and consistent cadence. Leaders model industriousness and enthusiasm, creating a culture where effort is celebrated and fundamentals are never skipped.',
    'AI tracks fundamentals completion (code review participation, planning session attendance, skill practice hours). Nudges remind teams when practice sessions are skipped or when quality of fundamentals drops. Patterns identify when teams abandon basics under pressure.',
    'Daily Fundamentals Block',
    'Every day, 30 minutes dedicated to core skills. Monday: code review practice. Tuesday: planning decomposition. Wednesday: documentation fundamentals. Thursday: testing discipline. Friday: retrospective reflection. No meetings scheduled during this time.',
    $$[
      {"title":"Industriousness","description":"Consistent, hard work on fundamentals. No shortcuts, no excuses. Excellence through daily discipline."},
      {"title":"Enthusiasm","description":"Bring energy and joy to practice. Love of the game fuels improvement and team connection."},
      {"title":"Fundamentals First","description":"Master the basics before complexity. Every practice starts with core skills, every season starts with shoe-tying."},
      {"title":"Daily Practice Discipline","description":"Structure every minute. Practice plans are detailed, timed, and reviewed. No wasted moments."}
    ]$$::jsonb,
    'blue',
    'Wooden: Daily Fundamentals',
    'Track completion, alert on skips',
    1
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    'Bill Belichick',
    'Do your job. Ignore the noise. Exploit inefficiencies. Prepare for everything.',
    'Teams prepare for edge cases and failure modes, not just happy paths. Retrospectives analyze what competitors/peers miss. Standards (code quality, planning rigor, communication clarity) are enforced uniformly. High performers who violate standards face consequences. Situational playbooks replace rigid processes.',
    'AI identifies patterns in failed edge cases, surfaces overlooked risks, and flags standards violations (incomplete reviews, missing tests, undocumented decisions). Nudges prompt teams to prepare for scenario variations before execution.',
    'Weekly Scenario Planning',
    'Every Friday, 45 minutes: identify next week''s top 3 risks. For each, create a mini-playbook—what breaks, how to detect it, and response protocol. Review previous week''s misses and add to edge case library.',
    $$[
      {"title":"Strategic Flexibility","description":"Adapt game plan to opponent''s weaknesses. No rigid playbook—only situational excellence."},
      {"title":"Exploiting Inefficiencies","description":"Find what others miss. Study edge cases, special teams, overlooked details. Win in the margins."},
      {"title":"Preparation Over Talent","description":"Out-prepare everyone. Film study, scenario planning, contingency drills. Readiness beats raw ability."},
      {"title":"Standards Enforcement","description":"Rules are non-negotiable. Violate standards, lose playing time—regardless of talent. Consistency over stars."}
    ]$$::jsonb,
    'red',
    'Belichick: Scenario Planning',
    'Surface edge cases, flag violations',
    2
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    'Pep Guardiola',
    'Control through structure. Freedom within discipline. Make the right decision easy.',
    'Teams define non-negotiable principles (e.g., all code reviewed, all decisions documented, all commitments closed). Workflows are structured to make violations hard and compliance easy. Environments (templates, checklists, automation) are engineered to reinforce standards. Flexibility exists only within boundaries.',
    'AI monitors adherence to non-negotiables, flags deviations, and suggests environment improvements (better templates, clearer workflows). Nudges reinforce positional discipline—close the loop before starting new work, document before deciding.',
    'Principles Review + Environment Tuning',
    'Monthly ritual: review team''s non-negotiables. Are they still the right ones? Are they being followed? If violations are common, don''t blame people—redesign the environment. Update templates, add automation, simplify compliance.',
    $$[
      {"title":"Strict Rules","description":"Positional rules are non-negotiable. When and where to press, pass, move—all defined. Creativity emerges from structure."},
      {"title":"Non-Negotiables","description":"Principles before tactics. High press, possession dominance, positional play—these never change, regardless of opponent."},
      {"title":"Engineered Conditions","description":"Design the environment to force good habits. Training drills mimic game pressure. Repetition makes excellence automatic."},
      {"title":"Positional Advantage","description":"Always be in the right place at the right time. Space, angles, timing—structure creates superiority."}
    ]$$::jsonb,
    'yellow',
    'Guardiola: Non-Negotiables',
    'Monitor adherence, suggest env improvements',
    3
  ),
  (
    '30000000-0000-0000-0000-000000000004',
    'Nick Saban',
    'The Process: focus on what you can control, ignore results, execute the next play with perfection.',
    'Teams decompose large goals into daily tasks. Retrospectives focus on execution quality, not outcomes. Wins and losses are acknowledged briefly, then work resumes. What''s important now? becomes the default question when overwhelmed. Deep work is protected—2-hour blocks for focused execution.',
    'AI prompts What''s important now? when multiple priorities collide. Tracks deep work blocks and alerts when they''re consistently interrupted. Decomposes large tasks into next-action prompts. Reinforces process focus by surfacing execution quality metrics, not just results.',
    'WIN Check-In + Deep Work Block',
    'Daily standup starts with What''s Important Now? Each person names their single most critical task for today. Then, everyone gets a protected 2-hour deep work block—no meetings, no interruptions. At end of day, brief reflection: did I execute today''s WIN with full effort?',
    $$[
      {"title":"The Process","description":"Break everything into smallest controllable units. Execute each with full effort. Trust that results follow execution."},
      {"title":"WIN: What''s Important Now","description":"Only focus on the immediate task. Not the score, not the future—just the current moment''s requirement."},
      {"title":"Emotional Neutrality","description":"No highs, no lows. Celebrate briefly, then refocus. Lose badly, then refocus. Consistency over emotion."},
      {"title":"Daily Decomposition","description":"Every goal becomes today''s tasks. Championships are won in practice reps, not game day magic."}
    ]$$::jsonb,
    'pink',
    'Saban: What''s Important Now',
    'Prompt focus, protect deep work',
    4
  )
on conflict (id) do update
set
  name = excluded.name,
  philosophy = excluded.philosophy,
  team_application = excluded.team_application,
  ai_support = excluded.ai_support,
  ritual_name = excluded.ritual_name,
  ritual_description = excluded.ritual_description,
  practices = excluded.practices,
  accent_color = excluded.accent_color,
  matrix_label = excluded.matrix_label,
  matrix_ai_support = excluded.matrix_ai_support,
  sort_order = excluded.sort_order;
