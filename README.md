# Coach Forge

Coach Forge is a static Vite + React site that presents a culture operating system for healthy, high-performing teams. It preserves the original Figma visual language while adding lightweight editing for the three content areas that need week-to-week maintenance:

- Practical Tools
- Standards Library
- Coach Playbook

Public visitors can browse the site normally. Authorized editors can sign in with Supabase Auth and enable Edit Mode to update content in place.

## Stack

- Vite
- React
- React Router
- Tailwind CSS v4
- Supabase JavaScript client
- Radix UI primitives

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create a local env file from the example:

```bash
cp .env.example .env
```

3. Add your Supabase client credentials to `.env`:

```bash
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Start the dev server:

```bash
npm run dev
```

5. Create a production build:

```bash
npm run build
```

## Supabase Setup

The schema and seed data live in [`supabase/schema.sql`](/Volumes/My Passport for Mac/Eastern Washington University/Projects/CoachForgeFinal/supabase/schema.sql).

Apply that SQL in your Supabase project to create:

- `editor_users`
- `practical_tools`
- `standards_families`
- `standards_items`
- `coaches`
- RLS policies for public read + editor-only writes
- the `is_editor()` helper function
- starter content for the editable sections

To grant edit access, insert the editor's email into `public.editor_users`.

## Editing Model

- Public users can read all content.
- Signed-in whitelisted users can enable Edit Mode.
- On desktop, signed-in editor status and controls are shown in the navbar beneath the main nav tabs.
- Editing is handled entirely from the client through Supabase Auth + RLS.
- No service-role keys or custom backend runtime are used.

## Editor UX Notes

- Practical Tools, Standards Library, and Coach Playbook can be updated in place through lightweight modal dialogs.
- The coach add/edit dialog uses an internal scroll area so long coach entries remain usable on smaller screens and laptops.
- Route changes automatically reset scroll position to the top of the page.

## Routing and GitHub Pages

This site is configured for static hosting.

- [`vite.config.ts`](/Volumes/My Passport for Mac/Eastern Washington University/Projects/CoachForgeFinal/vite.config.ts) uses `base: "/CoachForgeFinal/"` for GitHub Pages deployment.
- Routing uses a hash-based router so deep links and refreshes work reliably on GitHub Pages without server-side rewrites.

If the repository name changes, update the `base` value in [`vite.config.ts`](/Volumes/My Passport for Mac/Eastern Washington University/Projects/CoachForgeFinal/vite.config.ts).

## Project Structure

```text
src/
  app/
    components/
      editor/
    pages/
    App.tsx
    routes.tsx
  lib/
    auth.ts
    coaches.ts
    content.ts
    practical-tools.ts
    standards.ts
    supabase.ts
  styles/
  types/
public/
  coachforge-logo.png
supabase/
  schema.sql
```

## Notes

- The committed `.env.example` shows the required client-side variables.
- Your local `.env` should remain uncommitted.
- The built site output goes to `dist/`.
