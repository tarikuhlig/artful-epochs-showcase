create table public.art_path_resume (
  user_id uuid primary key references auth.users(id) on delete cascade,
  station_index integer not null default 0,
  card_index integer not null default 0,
  updated_at timestamp with time zone not null default now()
);

grant select, insert, update on public.art_path_resume to authenticated;
grant all on public.art_path_resume to service_role;

alter table public.art_path_resume enable row level security;

create policy "Users manage own journey resume"
on public.art_path_resume
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create trigger art_path_resume_updated_at
before update on public.art_path_resume
for each row
execute function public.set_updated_at();