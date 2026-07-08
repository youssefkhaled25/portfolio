# Personal Portfolio Website

A professional, production-ready single-page portfolio built with **React 18 + TypeScript + Vite**, styled with **Tailwind CSS** and animated with **Framer Motion**.

## Tech Stack

- React 18 + TypeScript
- Vite 5
- Tailwind CSS 3 (custom dark theme)
- Framer Motion 11
- React Router v6 (hash-based)
- lucide-react icons

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install dependencies

```bash
npm install
```

### Start dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

```bash
npm run build
```

Output goes to `dist/`. Deploy the `dist/` folder to Vercel, Netlify, or any static host.

### Preview production build

```bash
npm run preview
```

## Customize Your Content

All personal content lives in a **single file**:

```
src/data/portfolio.ts
```

Replace every `[BRACKET]` placeholder with your real data:

| Placeholder | What to replace |
|---|---|
| `[YOUR_NAME]` | Your full name |
| `[YOUR_VALUE_PROPOSITION]` | One-line tagline |
| `[YOUR_EMAIL]` | Your email address |
| `[LINKEDIN_URL]` | Your LinkedIn profile URL |
| `[FORM_ACTION_PLACEHOLDER]` | Formspree or Netlify Forms endpoint |
| `[SMART-IT-LAB-REPO]` | GitHub repo name |
| `[CODESHELF-REPO]` | GitHub repo name |
| `[START_DATE] – [END_DATE]` | Employment period |
| `[CERTIFICATE_NAME]` | Certificate title |
| `[ISSUER]` | Issuing organization |
| `[DATE]` | Issue date |
| `[CREDENTIAL_URL]` | Certificate verification URL |

### Add your CV

Drop your CV PDF into `public/assets/cv/` and update `cvUrl` in `HERO_DATA`.

### Add your OG image

Replace `public/og-image.png` with a real 1200×630 PNG for social sharing previews.

## Project Structure

```
src/
├── components/
│   ├── layout/       # Navbar, Footer, SectionWrapper
│   ├── ui/           # Tag, GlowButton, SectionHeader, AnimatedText, ScrollToTop
│   └── sections/     # Hero, About, Skills, Projects, Experience, Certificates, Contact
├── data/
│   └── portfolio.ts  # ← All your content lives here
├── hooks/            # useActiveSection, useScrollY
├── types/
│   └── portfolio.types.ts
└── styles/
    └── globals.css
```

## Deployment

### Vercel

```bash
npm run build
# then drag dist/ to vercel.com, or connect the GitHub repo
```

### Netlify

Add a `netlify.toml` redirect rule for SPA routing:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## License

MIT
