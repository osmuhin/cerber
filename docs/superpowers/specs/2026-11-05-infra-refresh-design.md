# Cerber infra refresh & stack upgrade — Design Spec

**Date:** 2026-11-05  
**Status:** Approved  
**Branch:** `laravel-update`  
**Fresh skeleton source:** official Laravel 13 (`laravel/laravel`) for clean configs and stock comments  

---

## Goal

Restore Cerber for local development: modern local infra and coding standards, current stack versions, and a **modern Laravel application structure** with **clean official skeleton configs/comments**, using a compact entry layout (**no `bootstrap/`, no `routes/`**).

Product feature work (nodes, etc.) is out of scope except keeping domain code working on the new skeleton.

## Scope

### In

- Scaffold official Laravel 13 in a **temporary directory**, then reshape entrypoints and port Cerber-specific code into the repo on `laravel-update`
- Local Docker + `./corn`; `.runtime/` → `storage/`
- PHP 8.5, Laravel 13, PHPUnit / rector / php-cs-fixer, Cerber `AGENTS.md`
- Nuxt 4 + `client/app/` layout; packages to latest
- Layered work; **commits only when the user explicitly asks**

### Out

- staging / production Compose, deploy CLI
- Filament, Typesense
- Auto-commits by the agent
- Unrelated product WIP polish; leave uncommitted `AuthService.php` alone unless asked

## Target application shape

| Concern | Choice |
|---|---|
| Config files, default comments, stock middleware/providers style | From **official Laravel 13** skeleton |
| App bootstrap & routing files | `app/app.php`, `app/api.php`, `app/web.php`, `app/console.php` — **no** `bootstrap/`, **no** `routes/` |
| Http `Kernel.php` | Remove; middleware via `Application::configure` / `withMiddleware` |
| Domain code | Port from current Cerber: Models, Services, Controllers, Auth, migrations, tests, client |
| Infra / agent rules | `./corn`, storage paths, rector → cs-fixer, `AGENTS.md` |

## Approach — layered

### Layer 0 — Fresh skeleton + reshape (foundation)

1. In a temp dir (e.g. `/tmp/cerber-laravel13`): `composer create-project laravel/laravel` on Laravel 13 / PHP 8.5 constraints.
2. Reshape skeleton:
   - Move `bootstrap/app.php` responsibilities → `app/app.php` (including `putenv` bootstrap cache under `storage/framework/bootstrap`).
   - Move `routes/web.php`, `routes/api.php`, `routes/console.php` → `app/web.php`, `app/api.php`, `app/console.php`.
   - Point `artisan` / `public/index.php` at the new bootstrap path.
   - Delete `bootstrap/` and `routes/` once wiring works.
3. Keep skeleton **config/** and stock comments as close to upstream as practical; only change paths Cerber requires (logging, cache, view, filesystems → `storage/…`).

### Layer 1 — Local infra

- `.docker/docker-compose.local.yml` (php 8.5, nginx, mariadb, phpmyadmin, redis; nodejs if needed for yarn-in-docker).
- `corn` for **local-only** (`APP_ENV=local` → local compose; non-local → clear error).
- `.runtime` → `storage` mapping; update `.yarnrc.yml`, `.gitignore`, `.env.example`.

### Layer 2 — Port Cerber backend

- Copy/adapt: `app/Models`, `Services`, `Http/Controllers`, middleware that still applies, `Providers` (trimmed), `database/`, `tests/`, Cerber composer deps (`lcobucci/jwt`, `osmuhin/html-meta`, etc.).
- Register routes in `app/api.php` / `app/web.php` from former `routes/*`.
- CSRF: `PreventRequestForgery` per Laravel 13 guide.
- Add rector, php-cs-fixer, custom fixers; composer scripts `rector` / `csfix`.
- Write `AGENTS.md` (document `app/*.php` layout, corn, no host PHP, no auto-git).

### Layer 3 — Nuxt 4

- Upgrade client; move sources to `client/app/`; build must succeed.

## `.runtime` → `storage`

| Was | Becomes |
|---|---|
| `.runtime/logs/` | `storage/logs/` |
| `.runtime/cache/data` | `storage/framework/cache/data` |
| bootstrap caches (`APP_*_CACHE`) | `storage/framework/bootstrap/` via `putenv` in `app/app.php` |
| `.runtime/cache/composer` | `storage/composer` |
| yarn paths | `storage/yarn/…` |
| `.runtime/mariadb` | `storage/mariadb` |
| `.runtime/views` | `storage/framework/views` |
| `.runtime/sessions` | `storage/framework/sessions` |
| `.runtime/temp` | `storage/tmp` |

## Stack targets

| Area | Target |
|---|---|
| PHP | 8.5 (Docker) |
| Laravel | 13 |
| PHPUnit | ^13.x |
| Nuxt | 4 latest |
| Compose (this cycle) | `docker-compose.local.yml` only |

## Migration method (temp project)

1. Scaffold + reshape in **temp directory** until `artisan --version` and a trivial route work.
2. Bring Cerber domain into that tree (or overlay reshaped skeleton files into the Cerber repo).
3. Prefer **in-repo replacement** on `laravel-update` as the durable result; temp dir is a workbench only.

## Commits

- Agent **does not** commit unless the user explicitly requests a commit.
- Natural checkpoints (for when the user asks): (1) skeleton+reshape+infra local, (2) Cerber backend ported + tests green, (3) Nuxt 4 client.

## Success criteria

1. No `bootstrap/` or `routes/` directories; entry via `app/app.php` + `app/{api,web,console}.php`.
2. Configs feel like a fresh Laravel 13 app (clean comments), with only intentional Cerber path deltas.
3. `./corn artisan` works on PHP 8.5; no `.runtime` references in tracked code/config.
4. Backend tests pass (or fixed for the port); Nuxt 4 client builds.
5. `AGENTS.md` accurate; rector → csfix workflow documented.

## Risks

- Porting old Kernel middleware stack into `withMiddleware` may miss aliases.
- Official skeleton vs custom `artisan`/`public/index.php` differences need careful wiring.
- MariaDB data: move `.runtime/mariadb` → `storage/mariadb` once if needed.
- Large WIP on `laravel-update` — port carefully; don’t drop domain code.
