-- Создаем таблицу profiles
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  telegram_id text,
  is_premium boolean default false,
  marzban_username text,
  subscription_end_date timestamptz,
  created_at timestamptz default now()
);

-- Настраиваем безопасность RLS (чтобы пользователь видел только свой профиль)
alter table public.profiles enable row level security;

create policy "Users can view their own profile."
  on profiles for select
  using ( auth.uid() = id );

create policy "Users can update their own profile."
  on profiles for update
  using ( auth.uid() = id );

-- Создаем функцию для автоматического создания профиля при регистрации
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

-- Триггер: вызывать функцию каждый раз при добавлении юзера в auth.users
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
