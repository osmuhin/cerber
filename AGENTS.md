# Cerber — Agent Instructions

Canonical project rules for AI coding agents. Read this file before making changes.

## Stack

- Backend: PHP 8.5, Laravel 13
- Frontend: Nuxt (see `client/`), Vue 3, Pinia, Tailwind 4
- Infra: Docker Compose local (nginx, php, mariadb, redis, phpMyAdmin)

## Repository Map

- `app/` — Laravel app code and bootstrap entrypoints
- `app/app.php` — framework bootstrap and routing registration
- `app/api.php` / `app/web.php` / `app/console.php` — routes (do **not** use `routes/` or `bootstrap/`)
- `client/` — Nuxt frontend app
- `.docker/docker-compose.local.yml` — local development services
- `docs/superpowers/` — design specs and implementation plans

## Plans & Specs — Project Only

Design specs and implementation plans must live **inside this repository** at `docs/superpowers/specs/` and `docs/superpowers/plans/`.

Never write plan/spec files outside the project workspace.

## Docker Wrapper — MANDATORY

Never run `php artisan`, `php vendor/bin/phpunit`, or any PHP CLI command directly on the host.

Always use the `./corn` wrapper:

```bash
./corn artisan migrate
./corn artisan make:controller UserController
./corn php vendor/bin/phpunit
```

Use `--dry-run` to preview the resolved Docker command without executing it.

Only `APP_ENV=local` is supported in this cycle.

## Git — Do Not Touch Without Explicit Approval

Git operations are **strictly prohibited** unless the user explicitly requests them.

Read-only git commands (`git status`, `git log`, `git diff`) are allowed for inspection only.

## Code Conventions

- Default: `protected`, without `final`
- Tabs for indentation in PHP
- Explicit return types and type hints on all methods
- Prefer truthy/falsy checks over verbose null/empty comparisons when semantics match
- No defensive casts/fallbacks without a concrete reason
- Named parameters for multiline calls

## Change Workflow

### Backend Changes

1. Update PHP code in `app/`, `config/`, `database/`
2. Run `./corn artisan test --compact` (or `./corn test`)

### API

- Add endpoints in `app/api.php`
- Use Eloquent API Resources where applicable
