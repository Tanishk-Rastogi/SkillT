-- Supabase Schema for SkillTree Ecosystem

-- Create a table for Domains
CREATE TABLE public.domains (
  id text primary key, -- e.g., 'web-development'
  title text not null,
  description text not null,
  icon_type text not null,
  is_coming_soon boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for Roles
CREATE TABLE public.roles (
  id text primary key, -- e.g., 'frontend'
  domain_id text references public.domains(id) on delete cascade not null,
  title text not null,
  description text not null,
  difficulty text check (difficulty in ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  estimated_time text not null,
  career_outcomes jsonb not null, -- Array of strings
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for Users
CREATE TABLE public.users (
  id uuid references auth.users not null primary key,
  username text unique,
  xp integer default 0,
  level integer default 1,
  active_class_id text,
  active_title_id text,
  visual_theme text default 'cyber',
  aura_effect text default 'none',
  dominant_domain text,
  progression_style text default 'Balanced',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for Skills (Universal Structure)
CREATE TABLE public.skills (
  id text primary key,
  title text not null,
  description text not null,
  why_it_exists text not null,
  why_it_matters text not null,
  real_world_usage text not null,
  used_in jsonb not null default '[]'::jsonb,
  difficulty text check (difficulty in ('Beginner', 'Intermediate', 'Advanced', 'Expert')),
  domains_used_in jsonb not null default '[]'::jsonb,
  roles_used_in jsonb not null default '[]'::jsonb,
  unlocks jsonb not null default '[]'::jsonb,
  prerequisites jsonb not null default '[]'::jsonb,
  related_skills jsonb not null default '[]'::jsonb,
  xp_value integer default 10,
  estimated_learning_time text not null,
  recommended_projects jsonb not null default '[]'::jsonb,
  learning_resources jsonb not null default '{"freeCourses": [], "paidCourses": [], "youtube": [], "articles": []}'::jsonb,
  practice_platforms jsonb not null default '[]'::jsonb,
  documentation_links jsonb not null default '[]'::jsonb,
  github_repos jsonb not null default '[]'::jsonb,
  tags jsonb not null default '[]'::jsonb,
  rarity text check (rarity in ('Common', 'Rare', 'Epic', 'Legendary')),
  visual_type text check (visual_type in ('Core', 'Utility', 'Theory', 'Tool')),
  category text not null,
  universal_skill boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create a table for Role Skills (Mapping skills to specific roles with positions)
CREATE TABLE public.role_skills (
  role_id text references public.roles(id) on delete cascade not null,
  skill_id text references public.skills(id) on delete cascade not null,
  position_x integer not null,
  position_y integer not null,
  primary key (role_id, skill_id)
);

-- Create a table for UserSkills (tracking unlocked/completed skills globally)
CREATE TABLE public.user_skills (
  user_id uuid references public.users(id) on delete cascade not null,
  skill_id text references public.skills(id) on delete cascade not null,
  completed boolean default false,
  unlocked_at timestamp with time zone,
  completed_at timestamp with time zone,
  primary key (user_id, skill_id)
);

-- Create a table for Classes
CREATE TABLE public.classes (
  id text primary key,
  name text not null,
  tier integer default 1,
  parent_class text references public.classes(id),
  evolution_path text not null,
  required_skills jsonb not null default '[]'::jsonb,
  required_progression integer default 0,
  dominant_domains jsonb not null default '[]'::jsonb,
  passive_bonuses jsonb not null default '[]'::jsonb,
  visual_theme text not null
);

-- Create a table for Titles
CREATE TABLE public.titles (
  id text primary key,
  name text not null,
  description text not null,
  rarity text check (rarity in ('Common', 'Rare', 'Epic', 'Legendary')),
  hidden boolean default false,
  unlock_conditions jsonb not null default '{}'::jsonb,
  progression_style text not null,
  visual_theme text not null,
  aura_effect text not null,
  badge_style text not null,
  lore_text text not null
);

-- Create a table for UserClasses
CREATE TABLE public.user_classes (
  user_id uuid references public.users(id) on delete cascade not null,
  class_id text references public.classes(id) on delete cascade not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, class_id)
);

-- Create a table for UserTitles
CREATE TABLE public.user_titles (
  user_id uuid references public.users(id) on delete cascade not null,
  title_id text references public.titles(id) on delete cascade not null,
  unlocked_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, title_id)
);

-- Create a table for Tests
CREATE TABLE public.tests (
  id uuid default gen_random_uuid() primary key,
  skill_id text references public.skills(id) on delete cascade not null,
  question text not null,
  options jsonb not null, -- Expected format: ["Option 1", "Option 2", "Option 3", "Option 4"]
  correct_answer text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.titles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_titles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connected_platforms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_verifications ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Anyone can read domains" ON public.domains FOR SELECT USING (true);
CREATE POLICY "Anyone can read roles" ON public.roles FOR SELECT USING (true);
CREATE POLICY "Anyone can read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Anyone can read role_skills" ON public.role_skills FOR SELECT USING (true);
CREATE POLICY "Anyone can read tests" ON public.tests FOR SELECT USING (true);

CREATE POLICY "Users can view their own profile" ON public.users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can read own skills" ON public.user_skills FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own skills" ON public.user_skills FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own skills" ON public.user_skills FOR UPDATE USING (auth.uid() = user_id);

-- Create a table for Connected Platforms
CREATE TABLE public.connected_platforms (
  user_id uuid references public.users(id) on delete cascade not null,
  platform_name text not null, -- 'github', 'leetcode', etc.
  platform_username text not null,
  synced_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, platform_name)
);

-- Create a table for User Verifications
CREATE TABLE public.user_verifications (
  user_id uuid references public.users(id) on delete cascade not null,
  skill_id text references public.skills(id) on delete cascade not null,
  verification_level integer default 1 check (verification_level between 1 and 3),
  verified_by text not null,
  evidence_type text not null,
  evidence_links jsonb not null default '[]'::jsonb,
  confidence_score integer default 0 check (confidence_score between 0 and 100),
  verified_at timestamp with time zone default timezone('utc'::text, now()) not null,
  manual_review_required boolean default false,
  public_visibility boolean default true,
  primary key (user_id, skill_id)
);

-- Setup auth trigger
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, username, xp, level)
  VALUES (new.id, new.raw_user_meta_data->>'username', 0, 1);
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
