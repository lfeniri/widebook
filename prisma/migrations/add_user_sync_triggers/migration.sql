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
drop trigger if exists on_auth_user_insert on auth.users;
drop trigger if exists on_auth_user_update on auth.users;
drop trigger if exists on_auth_user_delete on auth.users;


create trigger on_auth_user_insert
after insert on auth.users
for each row execute function public.sync_user_from_auth();

create trigger on_auth_user_update
after update on auth.users
for each row execute function public.sync_user_from_auth();

create trigger on_auth_user_delete
after delete on auth.users
for each row execute function public.sync_user_from_auth();
