-- === FUNCTION ===
create or replace function public.sync_user_from_auth()
returns trigger as $$
begin
  if (TG_OP = 'INSERT' or TG_OP = 'UPDATE') then
    insert into public."User" (
      id,
      email,
      raw_user_meta_data,
      phone,
      role,
      is_super_admin
    )
    values (
      new.id,
      new.email,
      new.raw_user_meta_data,
      new.phone,
      new.role,
      new.is_super_admin
    )
    on conflict (id) do update set
      email = excluded.email,
      raw_user_meta_data = excluded.raw_user_meta_data,
      phone = excluded.phone,
      role = excluded.role,
      is_super_admin = excluded.is_super_admin;

    return new;
  end if;

  if (TG_OP = 'DELETE') then
    delete from public."user" where id = old.id;
    return old;
  end if;

  return null;
end;
$$ language plpgsql security definer;

-- === TRIGGERS ===
-- Les lignes suivantes provoquent l'erreur si le schéma auth n'existe pas dans la shadow database Prisma
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'auth') THEN
    DROP TRIGGER IF EXISTS on_auth_user_insert ON auth.users;
    DROP TRIGGER IF EXISTS on_auth_user_update ON auth.users;
    DROP TRIGGER IF EXISTS on_auth_user_delete ON auth.users;
  END IF;
END $$;

DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_namespace WHERE nspname = 'auth') THEN
    CREATE TRIGGER on_auth_user_insert
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.sync_user_from_auth();
    CREATE TRIGGER on_auth_user_update
      AFTER UPDATE ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.sync_user_from_auth();
    CREATE TRIGGER on_auth_user_delete
      AFTER DELETE ON auth.users
      FOR EACH ROW EXECUTE FUNCTION public.sync_user_from_auth();
  END IF;
END $$;
