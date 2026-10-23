-- Run once in the Supabase SQL Editor for the project receiving interest registrations.
create table if not exists public.interest_leads (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 2 and 40),
  phone text not null check (char_length(phone) between 10 and 20),
  consent boolean not null check (consent = true),
  consented_at timestamptz not null,
  created_at timestamptz not null default now()
);

alter table public.interest_leads enable row level security;
revoke all on table public.interest_leads from public, anon, authenticated;
grant insert on table public.interest_leads to anon;
grant usage on sequence public.interest_leads_id_seq to anon;

drop policy if exists "anonymous visitors can submit interest" on public.interest_leads;
create policy "anonymous visitors can submit interest"
on public.interest_leads
for insert
to anon
with check (true);

-- No anonymous SELECT, UPDATE, or DELETE policy is created.
-- Owner access is through the Supabase project dashboard; do not add a public SELECT policy.
