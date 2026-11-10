-- KisanSetu / KiranaSetu / Nukkad — survey storage
-- Run this once in Supabase → SQL Editor.

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  survey text not null check (survey in ('kisansetu', 'kiranasetu', 'nukkad')),
  role text not null,
  name text,
  phone text,
  place text,
  answers jsonb not null default '{}'::jsonb,
  lang text,
  duration_seconds integer,
  user_agent text
);

create index if not exists responses_survey_role_idx on public.responses (survey, role);
create index if not exists responses_created_at_idx on public.responses (created_at desc);

alter table public.responses enable row level security;

-- The public browser client may only INSERT. It can never read other people's answers.
drop policy if exists "anon can submit a response" on public.responses;
create policy "anon can submit a response"
  on public.responses
  for insert
  to anon, authenticated
  with check (true);

-- No select / update / delete policy for anon: read from the Supabase dashboard
-- (Table editor, SQL editor) or with the service_role key on a server.

-- Optional: a quick tally view for the dashboard.
create or replace view public.response_counts as
  select survey, role, count(*)::int as responses, max(created_at) as latest
  from public.responses
  group by survey, role
  order by survey, role;

revoke all on public.response_counts from anon, authenticated;

-- Handy checks while testing:
--   select survey, role, count(*) from public.responses group by 1, 2;
--   select answers->>'f3' as sells_where, count(*) from public.responses
--     where survey = 'kisansetu' and role = 'farmer' group by 1 order by 2 desc;
