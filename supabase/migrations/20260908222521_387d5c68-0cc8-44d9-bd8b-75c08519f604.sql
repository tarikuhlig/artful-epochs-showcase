ALTER TABLE public.profiles
  ADD COLUMN username text,
  ADD COLUMN avatar_url text,
  ADD COLUMN featured_work_ids text[] NOT NULL DEFAULT '{}';

ALTER TABLE public.profiles
  ADD CONSTRAINT profiles_username_format CHECK (username IS NULL OR username ~ '^[a-zA-Z0-9_.-]{3,24}$'),
  ADD CONSTRAINT profiles_featured_work_limit CHECK (cardinality(featured_work_ids) <= 3);

CREATE UNIQUE INDEX profiles_username_unique ON public.profiles (lower(username)) WHERE username IS NOT NULL;