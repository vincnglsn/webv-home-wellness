-- Avis clients : uniquement des acheteurs reels (numero de commande + e-mail
-- verifies a la soumission). Chaque avis arrive en 'pending' et n'est publie
-- qu'apres moderation manuelle.
create table if not exists reviews (
  id serial primary key,
  product_slug text not null,
  order_id integer not null references orders (id) on delete cascade,
  display_name text not null,
  rating smallint not null check (rating between 1 and 5),
  body text not null,
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  created_at timestamptz not null default now(),
  unique (order_id, product_slug)
);

create index if not exists reviews_product_status_idx on reviews (product_slug, status);

-- Moderation :
--   select id, product_slug, display_name, rating, body from reviews where status = 'pending';
--   update reviews set status = 'published' where id = <id>;
--   update reviews set status = 'rejected' where id = <id>;
