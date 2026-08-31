# FD — Portfolio

Personal portfolio of **FD**, DevOps Intern & Cybersecurity Enthusiast.
Linux, containers, Kubernetes and networking during the day; wireless, Android and network security labs on personal hardware the rest of the time.

**Live:** https://fd-portfolio.site

## What's inside

The site is a single editorial-style page, structured as:

| Section | Content |
| --- | --- |
| Hero | Identity, direction, terminal snippet |
| About | Interests, how I learn, what I'm working on |
| Work | Projects written as case studies: context → problem → decisions → what broke → result → what I'd change |
| Labs | Smaller experiments (NetHunter, CCNA, wireless security) |
| Skills | Infrastructure, tooling, security, languages |
| Experience | Ongoing DevOps / IT internship |
| Contact | Links + contact form |

## Tech stack

- **React 18 + TypeScript**, **Vite**
- **Tailwind CSS** with a semantic token design system (IBM Plex, ink + off-white, light/dark)
- **shadcn/ui** + Radix primitives, **lucide-react** icons
- **react-helmet-async** for per-page metadata
- **Supabase Edge Function** (Deno) for the contact form
- **Web3Forms** + **hCaptcha** for email delivery and spam protection

## Design principles

- Technical/editorial minimal: no gradients, no glow, no neon, no skill percentages
- Content lives in one place: `src/lib/profile.ts`
- Colors, spacing and shadows are CSS variables in `src/index.css` — never hardcoded in components
- Accessible: semantic landmarks, single H1, labelled controls, 44px tap targets

## Local development

Requires Node.js 18+.

```bash
npm install
npm run dev      # http://localhost:8080
```

Other scripts:

```bash
npm run build    # production build
npm run preview  # preview the build
npm run lint     # lint
```

## Project structure

```
src/
├── components/
│   ├── site/          # Section, EntryItem primitives
│   ├── ui/            # shadcn components
│   ├── Hero.tsx  About.tsx  Work.tsx  Labs.tsx
│   ├── Skills.tsx  Experience.tsx  Contact.tsx
│   └── Navigation.tsx  Footer.tsx
├── lib/profile.ts     # all site content (single source of truth)
├── pages/             # Index, NotFound
└── index.css          # design tokens and global styles
supabase/functions/contact-submit/   # contact form edge function
```

To edit any text on the site, change `src/lib/profile.ts` — components read from it.

## Contact form

The form posts to the `contact-submit` edge function, which:

1. Rate-limits per IP (in-memory window)
2. Validates and sanitizes input
3. Verifies the sender's email domain via DNS (MX with A-record fallback)
4. Requires a valid hCaptcha token
5. Forwards the message through Web3Forms

No credentials are stored in the repository. Server-side values (`WEB3FORMS_ACCESS_KEY`) live in backend secrets; the only client-side keys committed are public/publishable ones.

## Security notes

- Content-Security-Policy, `X-Content-Type-Options` and `Permissions-Policy` set in `index.html`
- Input validated with Zod client-side and re-validated server-side
- Client rate limiting is UX-only; the authoritative limit is in the edge function
- No admin area, no analytics, no cookies, no tracking

## Contact

- Email: fd_cybernet@proton.me
- GitHub: [@FedeContri](https://github.com/FedeContri)
- LinkedIn: [Profile](https://www.linkedin.com/in/federico-contrino-78a647395)

## License

Personal project, no open source license.
