# Niani Designs — Site Architecture & Flow Spec

> Migration spec for turning the current single-page brochure into a portfolio-and-lead
> engine. Written against the real codebase as of 2026-08-06: React 19 + Vite 8,
> GSAP + Lenis, 36 reel videos, `base: '/niani/'`, single-page scroll, no routing,
> no lead capture.
>
> Each phase in §10 is independently shippable and has its own acceptance criteria.

---

## 1. The core problem with the current structure

The site today is a beautifully animated **single-page brochure**. An interior design
studio needs a **portfolio-and-lead engine**. Three structural gaps:

| Gap | Consequence |
|---|---|
| One URL for everything | Nothing to rank for. "interior designers in [city]", "modular kitchen design [city]" have no page to land on |
| No project case studies | The single highest-converting asset for a design studio doesn't exist |
| No lead capture | All 3 CTAs point to a footer with no form, email, or phone (verified in QA) |

Everything below fixes those three things while keeping the visual language and motion
work already built.

---

## 2. Site map / URL architecture

```
/                          Home
/work                      Project index (filterable)
/work/:slug                Project case study        <- the money pages
/services                  Services overview
/services/:slug            Service detail (5 pages)
/process                   How we work
/about                     Studio, team, philosophy
/films                     Reel gallery (existing 36)
/journal                   Blog index (SEO)
/journal/:slug             Article
/contact                   Quote form + WhatsApp + phone + map
/privacy  /terms  /cookies Legal
```

**Service slugs** (each has real search demand):
`residential-interiors`, `modular-kitchen`, `commercial-interiors`,
`turnkey-execution`, `interior-styling-consultation`

**Primary nav:** Work · Services · Process · About · Films · [Get a Quote]

**Mobile nav:** same, plus click-to-call and WhatsApp pinned at the bottom of the drawer.

---

## 3. User flow

```
Entry (Instagram bio / Google / referral)
   |
   |-> Home ---------> Featured Work ---> /work/:slug (case study)
   |                                          |
   |-> Google "modular kitchen [city]" -> /services/modular-kitchen
   |                                          |
   |-> Instagram reel link --------------> /films
   |                                          |
   +----------------------------------------> v
                              TRUST BUILT (proof + process + price band)
                                              |
                                              v
                              QUALIFY  -> multi-step quote form
                                              |
                          +-------------------+-------------------+
                          v                   v                   v
                    Form submit          WhatsApp           Click-to-call
                          |
                          v
                  Thank-you page + auto-reply email
```

**Design principle:** every page ends in a CTA block. A visitor should never hit a dead
end — the exact failure the QA pass found.

---

## 4. Page blueprints

Section order is the conversion sequence — keep it.

### Home

1. **Hero** — one-line value proposition (not "Your space for interior inspiration" —
   say what the studio does, and where), primary CTA + secondary "View our work".
   Keep the spiral canvas.
2. **Trust bar** — `X projects delivered · Y years · Cities served · Google rating`
3. **Featured work** — 6 project cards -> `/work`
4. **Services grid** — 5 cards -> `/services/:slug`
5. **Process** — 5 numbered steps, condensed
6. **Films strip** — existing reel carousel -> `/films`
7. **Testimonials** — real ones, with project name and photo
8. **Brands / materials** — existing brand marquee
9. **FAQ** — 6–8 questions (cost, timeline, turnkey vs design-only, cities).
   Doubles as SEO surface.
10. **Final CTA** — form or big button
11. **Footer** — real links, address, phone, email, service areas

### Project case study (`/work/:slug`) — most important template

```
Hero image (full-bleed) + project title
Meta strip: Location · Typology · Area (sqft) · Duration · Scope
The brief          (2-3 sentences: what the client wanted)
The challenge      (constraint solved - this is what builds trust)
The response       (design decisions)
Material palette   (swatch row - swatch styling already exists)
Gallery            (8-15 images, before/after where possible)
Client testimonial (tied to this project)
Related projects   (3 cards)
CTA block          ("Planning something similar?")
```

### Service detail (`/services/:slug`)

Hero -> what's included (bullets) -> process for this service -> 3 relevant projects ->
price band (`Starting from Rs X/sqft` or a range — a major trust signal, most studios
hide it) -> FAQ -> CTA.

### Contact (`/contact`)

Multi-step form (§7) · WhatsApp button · phone · email · studio address + map ·
working hours · "what happens next" (sets expectation: *we reply within 24 hours*).

---

## 5. Content data model

Content lives as data, not JSX. This is what makes the site maintainable.

`src/content/projects.json`

```json
{
  "slug": "sridevi-residence-bengaluru",
  "title": "Sridevi's Home",
  "location": "Bengaluru, Karnataka",
  "typology": "3BHK Apartment",
  "areaSqft": 1650,
  "durationWeeks": 14,
  "scope": ["Full-home interiors", "Modular kitchen", "Custom joinery"],
  "year": 2025,
  "featured": true,
  "heroImage": "/projects/sridevi/hero.webp",
  "brief": "",
  "challenge": "",
  "response": "",
  "palette": [{ "name": "Walnut", "hex": "#866042" }],
  "gallery": [{ "src": "", "alt": "", "caption": "" }],
  "testimonialId": "sridevi-01",
  "reelCodes": ["DL-HNAyhVzV"],
  "seo": { "title": "", "description": "" }
}
```

- `services.json` — `{ slug, title, summary, includes[], priceBand, faq[], projectSlugs[] }`
- `testimonials.json` — `{ id, quote, name, project, projectSlug, photo, rating, source }`
- `reels.json` — existing 36 codes plus `{ code, title, projectSlug }` so reels link
  into case studies
- `faq.json` — `{ question, answer, scope }`

**Rule:** no hard-coded content in components. Every page maps over these files.

---

## 6. File architecture

```
src/
  main.jsx                 router root
  routes/
    Home.jsx  Work.jsx  Project.jsx  Services.jsx  Service.jsx
    Process.jsx  About.jsx  Films.jsx  Journal.jsx  Article.jsx
    Contact.jsx  ThankYou.jsx  NotFound.jsx  legal/
  components/
    layout/     Nav, Footer, MobileDrawer, WhatsAppFab, Splash
    sections/   Hero, TrustBar, FeaturedWork, ServicesGrid, ProcessSteps,
                Testimonials, BrandMarquee, FAQ, CTABlock
    project/    ProjectCard, ProjectMeta, PaletteRow, Gallery, BeforeAfter
    form/       QuoteForm, Step, Field, Success
    ui/         Button, Eyebrow, Heading, Reveal, Marquee
  content/      projects.json services.json testimonials.json reels.json faq.json
  hooks/        useReveal, useLenis, useInView, useQuoteForm
  lib/          seo.js schema.js analytics.js format.js
  styles/       tokens.css base.css   (split App.css - it is 1500+ lines)
```

**Keep:** `SpiralWhirlCanvas.jsx` (Home hero only), `FilmGallery.jsx` (refactor to read
`reels.json`). Extract the existing GSAP reveal system into a reusable `<Reveal>`
component.

---

## 7. Lead capture spec

Multi-step form — short steps convert far better than one long form.

```
Step 1  What are you planning?   [Full home | Kitchen | Single room | Commercial | Not sure]
Step 2  Where?                   [City + locality]
Step 3  Property                 [Apartment/Villa/Office] + [Area sqft] + [Possession date]
Step 4  Budget range             [<5L | 5-10L | 10-20L | 20L+ | Need guidance]
Step 5  Contact                  [Name | Phone (required) | Email | Notes]
        -> Submit
```

- Phone is the only hard-required field. Everything else is skippable.
- Persist answers to `sessionStorage` so a refresh doesn't lose them.
- **Backend:** Web3Forms or Formspree (no server needed) -> email to studio + auto-reply
  to client. To land leads in a sheet, add a Google Apps Script webhook.
- **WhatsApp fallback:** floating button,
  `https://wa.me/91XXXXXXXXXX?text=Hi Niani, I'd like a quote for...` — prefill from form
  state if partially filled. In the Indian market this will out-convert the form.
- On success -> `/thank-you` (a real URL, so it is trackable as a conversion in GA4 and
  ad pixels).

---

## 8. SEO & metadata

Doubly important if the site will receive paid traffic — ad landing pages need real URLs
and real meta.

- **Per-route meta** via `react-helmet-async`: unique title + description + `og:image` +
  canonical.
- **Prerender — non-negotiable.** A client-rendered SPA ships an empty `#root`;
  WhatsApp/Instagram/LinkedIn scrapers don't run JS, so shared links have no preview
  (QA confirmed: no description, no OG tags today). Use **`vite-react-ssg`** — it keeps
  the current Vite + React setup and emits static HTML per route.
- **JSON-LD:** `LocalBusiness` (name, address, geo, phone, hours, priceRange) on all
  pages; `Article` on journal posts; `ImageObject` on projects.
- `sitemap.xml` + `robots.txt` generated at build.
- **Move `base: '/niani/'` -> `'/'`** on a custom domain. A studio on a `/niani/` subpath
  of a github.io domain will not rank.

---

## 9. Media pipeline

Fixes the 146 MB payload problem.

- **Drop Pexels.** 23 of 70 first-load requests are hotlinked stock. A design studio
  showing stock interiors undercuts the entire pitch. Replace with own photography.
- **Images:** build script -> WebP + AVIF, 3 widths (640/1280/1920), `srcset` + `sizes`,
  `loading="lazy"` below the fold, explicit `width`/`height` to prevent layout shift.
- **Video:** re-encode reels to H.264 720p CRF 26 (the 23 MB and 17 MB files should land
  near 2-3 MB), generate poster frames, `preload="none"`, mount only on intersection.
- **Target:** first load under 1.5 MB. Currently 2.84 MB, of which 2.67 MB is images.
- Consider moving reels to Cloudflare R2 / Bunny CDN rather than committing 146 MB to
  git (`.git` is already 214 MB and that is permanent).

---

## 10. Build phases

Execute in order. Each phase is independently shippable.

### Phase 1 — Routing foundation
Add `react-router-dom`. Create route shells for all URLs in §2. Extract `Nav`/`Footer`
into `components/layout/`. Move current homepage content into `routes/Home.jsx`.
**Done when:** every URL renders a distinct page and nav links work.

### Phase 2 — Content model
Create `src/content/*.json` per §5. Refactor `FilmGallery` to read `reels.json`.
Seed 3 real projects.
**Done when:** no page has hard-coded copy.

### Phase 3 — Project case studies
Build `Project.jsx` per the §4 template and `Work.jsx` index with typology filters.
**Done when:** `/work/:slug` renders fully from JSON and `/work` filters correctly.

### Phase 4 — Lead capture  ← highest business value; do first if only one phase ships
Multi-step `QuoteForm`, Web3Forms wiring, WhatsApp FAB, `/thank-you`, real footer links,
click-to-call.
**Done when:** a submission arrives in the studio inbox and `/thank-you` loads.

### Phase 5 — Services + Process + About
Five service pages from `services.json`, process timeline, about page.
**Done when:** all §2 routes have real content.

### Phase 6 — SEO
`vite-react-ssg` prerendering, per-route meta, JSON-LD, sitemap, robots, `base: '/'`,
custom domain.
**Done when:** `curl` on any route returns fully-rendered HTML with correct
`<title>` and OG tags.

### Phase 7 — Media optimization
Image pipeline, video re-encode, CDN migration.
**Done when:** first load < 1.5 MB.

### Phase 8 — Analytics
GA4 + Meta Pixel, conversion events on form submit / WhatsApp click / call click,
consent banner.
**Done when:** a test lead appears as a conversion in GA4.

---

## 11. Carry-over fixes from the QA pass (2026-08-06)

Fold these into Phase 1/4 rather than patching separately:

- 3 CTAs ("Get Quote" nav, "Get a quote" hero, mobile menu) point to `#signup`, which has
  no form, email, or phone — **Phase 4**
- 7 inert `<span>`s styled as links: Instagram, Pinterest, Substack, Journal, Privacy
  policy, Terms & conditions, Cookie policy — **Phase 4**
- Nav search accepts input and does nothing — wire it to project/reel filtering or remove
- Sample testimonials with photorealistic headshots — replace with real ones before
  launch — **Phase 2**
- 5-second splash cap fires on throttled connections (`onReady` doesn't win the race) —
  becomes moot once payload drops in **Phase 7**

### Already fixed
- Splash now uses the Niani mark (`public/niani-mark.png`, background keyed out) with a
  continuous spin, replacing the generic dot spinner
- That mark was 161 KB and gated the splash; resized to 384px and palette-quantized to
  **6.6 KB**. Unthrottled cold-load splash went 2278 ms -> 1079 ms
- Removed a dead `prefers-reduced-motion` block that was overridden by the global reset
  in `App.css`

### Verified healthy
Build and ESLint clean · zero console/page errors · no broken images · no horizontal
overflow at 1440px or 390px · all 36 reel codes resolve to both `.mp4` and `.jpg` ·
all in-page anchors resolve · single H1 · all images have `alt` · focus rings present on
keyboard navigation · mobile menu and carousel arrows work · grid videos autoplay in view
