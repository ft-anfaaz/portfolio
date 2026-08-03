# Portfolio

A personal portfolio site for a senior software engineer, built with React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, and lucide-react.

## Install

```bash
npm install
```

## Scripts

| Command           | Description                              |
| ------------------ | ----------------------------------------- |
| `npm run dev`      | Start the Vite dev server with HMR        |
| `npm run build`     | Type-check with `tsc -b` and build for production into `dist/` |
| `npm run preview`   | Serve the production build locally        |
| `npm run lint`      | Run oxlint over the project               |

## Project structure

```
src/
  components/
    Navbar.tsx              site header, nav links, mobile menu
    SocialLinks.tsx         icon-pill row, hides links with an empty value
    HeroSection.tsx         full-viewport intro (id="home")
    AboutSection.tsx        bio (id="about") + skills grid (id="skills")
    ExperienceSection.tsx   numbered work history rows
    EducationSection.tsx    numbered education rows (id="education")
    CertificationsSection.tsx image-card grid of certifications (id="certifications")
    ServicesSection.tsx     numbered service rows
    ProjectsSection.tsx     sorts and renders ProjectCard list
    ProjectCard.tsx         sticky project card
    TestimonialsSection.tsx CSS marquee of testimonial cards
    Footer.tsx               3-column footer (id="contact")
  data/
    portfolio.json          all editable site content
  hooks/
    usePortfolio.ts         typed accessor for portfolio.json
  types/
    portfolio.ts             TypeScript types for portfolio.json
  App.tsx                    assembles sections in page order
  index.css                  Tailwind import, theme tokens, gradient/marquee CSS
```

## Editing content

All site content lives in [`src/data/portfolio.json`](src/data/portfolio.json) and is typed by [`src/types/portfolio.ts`](src/types/portfolio.ts). Every section component reads from it through [`usePortfolio()`](src/hooks/usePortfolio.ts) — none of them hardcode names, dates, or copy. Edit the JSON directly; no component changes are needed for content updates.

- **profile** — name, tagline, bio, avatar, and `social` links. The Hero avatar prefers `avatarImage` (a path into `public/`, e.g. `/avatar.png`) and falls back to the `avatarSvg` initials mark when `avatarImage` is `""`. Any `social` field left as an empty string (`""`) is automatically hidden from the social icon row and the footer.
- **skills.categories[]** — each entry renders as a card in the Skills grid (`{ name, items[] }`).
- **experience[]** — rendered in array order as numbered rows. Only the first 3 entries of each `highlights[]` array are shown.
- **services[]** — rendered in array order as numbered rows (`{ title, description }`), same layout as Experience.
- **projects[]** — rendered with `highlight: true` projects sorted first. Leave `link` as `""` to hide the "LIVE PROJECT" button, and leave `image` as `""` to fall back to a gradient placeholder with the project title.
- **education[]** — rendered in array order as numbered rows (`{ institution, degree, period, location, detail }`), same layout as Experience. The section hides itself entirely when the array is empty.
- **certifications[]** — rendered as an image-card grid (`{ id, title, issuer, date, image, link }`). `image` is a path into `public/` (certificate images live in `public/certificates/`); leave `link` as `""` to render a plain (non-clickable) card instead of a link to the credential. The section hides itself entirely when the array is empty.
- **testimonials[]** — each renders as a marquee card; `avatarColor` sets the initial-avatar background color.

## Notes

- `lucide-react` is pinned to `0.577.0` because `1.x` removed brand icons (GitHub, Instagram, LinkedIn) that `SocialLinks.tsx` depends on.
- Tailwind CSS v4 is configured via the `@tailwindcss/vite` plugin (see `vite.config.ts`) and the `@theme` block in `src/index.css` — there is no `tailwind.config.js`. Avoid custom `--color-*` theme tokens named after Tailwind's reserved scale keys (e.g. `base`, `sm`, `lg`) — they silently override the built-in utility of the same name (this happened once with `--color-base` clobbering `text-base`'s font-size).
- The Kanit font is loaded from Google Fonts in `index.html`.
