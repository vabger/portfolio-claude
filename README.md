# Portfolio

A responsive single-page portfolio built with **Next.js (App Router) + TypeScript**: an animated reeded-glass background, glowing neon headings, a pill nav that follows your scroll, a live clock, expanding project cards and an animated "Tools I Use" folder.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Editing content

Everything you'll want to change lives in **`data/site.ts`**:

- `profile`: name, site title, email (used by "Get in Touch"), headline, tagline
- `projects`: title, type, year, plus an optional `video` and `href`
- `tools`: name, category, description, card glow colour, and where its chip lands when the folder opens
- `socials`: Discord / X / Instagram links

### Adding project videos

Put an `.mp4` in `public/videos/` and set `video: "/videos/your-file.mp4"` on the project. Videos play on hover on desktop and while in view on phones and tablets. Projects without a video show an animated placeholder poster.

## Structure

```
app/
  layout.tsx       metadata + font
  page.tsx         page composition
  globals.css      all styles (theme tokens at the top)
components/        Background, Topbar (clock), Nav, Hero, Projects, Tools, Contact…
data/site.ts       site content
```

## Responsive behaviour

- **Desktop (>1024px):** cards expand on hover; the tools folder slides left and stays put while the tool cards scroll past.
- **Tablet (641–1024px):** projects become a swipeable carousel with the info always shown.
- **Phone (≤640px):** the nav moves to the bottom of the screen, the folder and cards stack in one column, and the contact buttons stack.

Animations respect `prefers-reduced-motion`.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new). No configuration needed.
