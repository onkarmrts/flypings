-- ─── Enable UUID extension ────────────────────────────────────────────────────
create extension if not exists "uuid-ossp";

-- ─── Profiles (extends Supabase auth.users) ───────────────────────────────────
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  email         text not null,
  full_name     text,
  avatar_url    text,
  plan_id       text check (plan_id in ('starter', 'growth', 'pro', 'agency')),
  trial_ends_at timestamptz,
  created_at    timestamptz default now() not null,
  updated_at    timestamptz default now() not null
);

-- Auto-create profile on signup (Google OAuth or email)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Instagram Accounts ───────────────────────────────────────────────────────
create table public.instagram_accounts (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references public.profiles(id) on delete cascade,
  ig_user_id       text not null unique,
  username         text not null,
  name             text not null,
  profile_pic_url  text,
  access_token     text not null,         -- store encrypted in production
  token_expires_at timestamptz,
  followers_count  integer default 0,
  is_active        boolean default true,
  connected_at     timestamptz default now() not null,
  updated_at       timestamptz default now() not null
);

-- ─── Automations ──────────────────────────────────────────────────────────────
create table public.automations (
  id             uuid primary key default uuid_generate_v4(),
  user_id        uuid not null references public.profiles(id) on delete cascade,
  account_id     uuid not null references public.instagram_accounts(id) on delete cascade,
  name           text not null,
  description    text,
  trigger_type   text not null check (trigger_type in (
                   'comment_keyword', 'story_reply', 'story_poll_vote',
                   'dm_keyword', 'live_comment', 'mention'
                 )),
  trigger_config jsonb not null default '{}',
  actions        jsonb not null default '[]',
  is_active      boolean default true,
  reply_once     boolean default true,
  post_id        text,                    -- null = apply to all posts
  created_at     timestamptz default now() not null,
  updated_at     timestamptz default now() not null
);

-- ─── DM Logs ──────────────────────────────────────────────────────────────────
create table public.dm_logs (
  id                  uuid primary key default uuid_generate_v4(),
  automation_id       uuid not null references public.automations(id) on delete cascade,
  account_id          uuid not null references public.instagram_accounts(id) on delete cascade,
  recipient_ig_id     text not null,
  recipient_username  text,
  trigger_type        text not null,
  trigger_text        text,
  message_sent        text not null,
  status              text not null check (status in ('sent', 'failed', 'skipped')),
  error               text,
  sent_at             timestamptz default now() not null
);

-- ─── Leads (Creator CRM) ──────────────────────────────────────────────────────
create table public.leads (
  id                    uuid primary key default uuid_generate_v4(),
  user_id               uuid not null references public.profiles(id) on delete cascade,
  account_id            uuid not null references public.instagram_accounts(id) on delete cascade,
  ig_user_id            text not null,
  username              text not null,
  full_name             text,
  profile_pic_url       text,
  source_automation_id  uuid references public.automations(id) on delete set null,
  source_trigger        text,
  tags                  text[] default '{}',
  notes                 text,
  whatsapp_number       text,
  email                 text,
  status                text not null default 'new' check (status in ('new', 'contacted', 'converted', 'lost')),
  converted_at          timestamptz,
  created_at            timestamptz default now() not null,
  updated_at            timestamptz default now() not null,
  unique (account_id, ig_user_id)
);

-- ─── Subscriptions ────────────────────────────────────────────────────────────
create table public.subscriptions (
  id                       uuid primary key default uuid_generate_v4(),
  user_id                  uuid not null unique references public.profiles(id) on delete cascade,
  plan_id                  text not null check (plan_id in ('starter', 'growth', 'pro', 'agency')),
  status                   text not null check (status in ('active', 'past_due', 'cancelled', 'trialing')),
  razorpay_subscription_id text unique,
  current_period_start     timestamptz not null,
  current_period_end       timestamptz not null,
  cancel_at_period_end     boolean default false,
  created_at               timestamptz default now() not null,
  updated_at               timestamptz default now() not null
);

-- ─── Automation Stats (daily rollup) ─────────────────────────────────────────
create table public.automation_stats (
  id             uuid primary key default uuid_generate_v4(),
  automation_id  uuid not null references public.automations(id) on delete cascade,
  date           date not null,
  triggered      integer default 0,
  dms_sent       integer default 0,
  links_clicked  integer default 0,
  conversions    integer default 0,
  unique (automation_id, date)
);

-- ─── Stats Summary View ───────────────────────────────────────────────────────
create or replace view public.automation_stats_summary as
select
  automation_id,
  sum(triggered)     as total_triggered,
  sum(dms_sent)      as total_dms_sent,
  sum(links_clicked) as total_links_clicked,
  sum(conversions)   as total_conversions
from public.automation_stats
group by automation_id;

-- ─── updated_at triggers ──────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_profiles_updated_at         before update on public.profiles         for each row execute procedure public.set_updated_at();
create trigger set_instagram_accounts_updated  before update on public.instagram_accounts for each row execute procedure public.set_updated_at();
create trigger set_automations_updated_at      before update on public.automations       for each row execute procedure public.set_updated_at();
create trigger set_leads_updated_at            before update on public.leads             for each row execute procedure public.set_updated_at();
create trigger set_subscriptions_updated_at    before update on public.subscriptions     for each row execute procedure public.set_updated_at();

-- ─── Row Level Security ───────────────────────────────────────────────────────
alter table public.profiles           enable row level security;
alter table public.instagram_accounts enable row level security;
alter table public.automations        enable row level security;
alter table public.dm_logs            enable row level security;
alter table public.leads              enable row level security;
alter table public.subscriptions      enable row level security;
alter table public.automation_stats   enable row level security;

-- Profiles: users can only read/update their own
create policy "profiles: own row" on public.profiles
  for all using (auth.uid() = id);

-- Instagram accounts: users can only access their own
create policy "instagram_accounts: own rows" on public.instagram_accounts
  for all using (auth.uid() = user_id);

-- Automations: users can only access their own
create policy "automations: own rows" on public.automations
  for all using (auth.uid() = user_id);

-- DM logs: users can only read logs for their accounts
create policy "dm_logs: own account logs" on public.dm_logs
  for select using (
    exists (
      select 1 from public.instagram_accounts
      where id = dm_logs.account_id and user_id = auth.uid()
    )
  );

-- Leads: users can only access their own
create policy "leads: own rows" on public.leads
  for all using (auth.uid() = user_id);

-- Subscriptions: users can only read their own
create policy "subscriptions: own row" on public.subscriptions
  for select using (auth.uid() = user_id);

-- Automation stats: users can only read stats for their own automations
create policy "automation_stats: own rows" on public.automation_stats
  for select using (
    exists (
      select 1 from public.automations
      where id = automation_stats.automation_id and user_id = auth.uid()
    )
  );
