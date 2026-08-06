# Niani Designs — Image Slot Inventory & Generation Brief

> Every image slot on the site: where the file goes, what size it must be, and whether it
> can be AI-generated or has to be real photography.
>
> Counted against the live codebase (post Phase-1 routing). Current state: **27 hotlinked
> Pexels images** (24 in `routes/Home.jsx`, 3 in `routes/Work.jsx`), 36 local reel
> thumbnails, 3 local testimonial headshots, 1 logo.

---

## 1. The one rule that matters

**Anything presented as work Niani has built must be real photography of work Niani has
built.** Project heroes, case-study galleries, before/afters, the team, and client
headshots are all claims about reality. An AI-generated "completed project" is a claim
that a home exists when it doesn't — and it collapses the moment a prospective client
asks to visit, or compares the site to the actual handover. For a studio whose entire
sale is "we will build this for you", that is the most expensive kind of trust to lose.

**Everything that is decorative, atmospheric, textural, or explicitly a mood reference is
fair game for AI**, and that covers a genuinely large share of the site — 20+ slots below.

Each slot in §3 is tagged:

| Tag | Meaning |
|---|---|
| **REAL** | Must be real photography. Never ship AI here. |
| **AI-OK** | AI-generated is appropriate permanently. Decorative/atmospheric/textural. |
| **AI-TEMP** | AI is fine as scaffolding during build, must be swapped before public launch. Track these. |

### Current decision (2026-08-06)

**Generated imagery is in use across all slots**, including REAL ones, until real
photography is shot. See `IMAGE-GENERATION-MANIFEST.md` for the execution list.

This works without misleading anyone as long as generated portfolio pieces are labelled
**"Design study" / "Concept"** rather than named as completed client projects, and the
testimonials keep their existing "Sample client / SAMPLE REVIEW" wording. Concept work is
normal to publish; a fabricated *completed* project is what causes the problem. Every
generated image carries `data-ai-placeholder` so the swap list stays greppable.

---

## 2. Directory structure

```
public/
  projects/<project-slug>/
    hero.webp
    gallery-01.webp ... gallery-15.webp
    before-01.webp  after-01.webp
    palette/<material>.webp
  services/<service-slug>/
    hero.webp
    detail-01.webp ... detail-03.webp
  atmosphere/          decorative fragments, textures, gradients   [AI-OK]
    fragment-01.webp ... fragment-11.webp
    texture-linen.webp  texture-stone.webp  texture-walnut.webp
  about/
    studio-01.webp  team-<name>.webp
  journal/<article-slug>/
    header.webp  inline-01.webp
  testimonials/
    <client-slug>.webp
  share/
    og-default.webp  og-<route>.webp
  reel-thumbnails/     36 existing, keep
  reels/               36 existing, keep
```

Replace the flat `public/review-clients/` with `public/testimonials/` when real reviews
land.

---

## 3. Slot inventory

### 3.1 Home — `src/routes/Home.jsx`

| Slot | Count | Export size | Ratio | Source |
|---|---|---|---|---|
| Floating fragments (`floatingObjects`, `type: 'image'`) | **11** | 400×300 | 4:3 | **AI-OK** |
| Material swatches (`type: 'swatch'`) | 4 | — CSS gradients, no files | — | none needed |
| Textures (`type: 'texture'`) | 2 | — CSS gradients, no files | — | none needed |
| Think cards (`thinkCards`) | **3** | 1000×1250 | 4:5 | **AI-OK** |
| World strip slides (`worldStripSlides`: modular kitchen / renovation / pooja room) | **9** (3 slides × 3) | 1200×800 | 3:2 | **AI-TEMP** → REAL |
| Testimonial headshots | **3** | 400×400 | 1:1 | **REAL** |
| Spiral hero canvas (`SpiralWhirlCanvas`) | reuses fragments | 400×300 | 4:3 | **AI-OK** |

The 11 fragments render at 66–98px wide and are rotated, blurred, and parallaxed. They
read as atmosphere, not portfolio — the clearest AI-OK slots on the site. 400×300 covers
4x DPR.

The world-strip slides sit under literal search keywords ("modular kitchen"), which frames
them as example work. AI is acceptable while building, but these should become real
project photography — they're doing portfolio duty.

### 3.2 Work — `src/routes/Work.jsx` and `/work/:slug`

| Slot | Count | Export size | Ratio | Source |
|---|---|---|---|---|
| Project index cards | 1 per project (**3 today**) | 1600×1200 | 4:3 | **REAL** |
| Case study hero | 1 per project | 2400×1350 | 16:9 | **REAL** |
| Gallery — landscape | 5–9 per project | 2400×1600 | 3:2 | **REAL** |
| Gallery — portrait | 3–6 per project | 1600×2000 | 4:5 | **REAL** |
| Before / after pairs | 1–3 per project | 1600×1200 each | 4:3 | **REAL** |
| Material palette swatches | 4–6 per project | 300×300 | 1:1 | **AI-OK** if abstract material texture; **REAL** if photographed from the actual spec |

This entire section is the portfolio. It is the reason someone hires you. All REAL.

### 3.3 Services — `/services/:slug` (5 pages)

| Slot | Count | Export size | Ratio | Source |
|---|---|---|---|---|
| Service hero | 5 (one per slug) | 2000×1125 | 16:9 | **AI-TEMP** → REAL |
| Supporting details | 3 × 5 = **15** | 1200×900 | 4:3 | **AI-TEMP** → REAL |
| Process step icons/illustrations | 5 | 600×600 | 1:1 | **AI-OK** |

Slugs: `residential-interiors`, `modular-kitchen`, `commercial-interiors`,
`turnkey-execution`, `interior-styling-consultation`.

### 3.4 About — `/about`

| Slot | Count | Export size | Ratio | Source |
|---|---|---|---|---|
| Studio / workspace | 2–3 | 2000×1333 | 3:2 | **REAL** |
| Team portraits | 1 per person | 1200×1500 | 4:5 | **REAL** |
| Behind-the-scenes / site visits | 3–5 | 1600×1067 | 3:2 | **REAL** |

### 3.5 Journal — `/journal/:slug`

| Slot | Count | Export size | Ratio | Source |
|---|---|---|---|---|
| Article header | 1 per article | 1600×900 | 16:9 | **AI-OK** |
| Inline illustrations / diagrams | 1–3 per article | 1200×800 | 3:2 | **AI-OK** |
| Mood boards | as needed | 1600×1200 | 4:3 | **AI-OK** — label as reference |

Journal images illustrate ideas rather than claim built work. Generate freely. If an
article discusses a real Niani project, that project's photos must be real.

### 3.6 Global / system

| Slot | Count | Export size | Ratio | Source |
|---|---|---|---|---|
| OG share card — default | 1 | 1200×630 | 1.91:1 | **AI-OK** (brand composition) |
| OG share cards — per route | ~8 | 1200×630 | 1.91:1 | **AI-OK**, or real project crop |
| 404 page art | 1 | 1200×900 | 4:3 | **AI-OK** |
| Contact page map / studio exterior | 1 | 1600×900 | 16:9 | **REAL** |
| Nav logo (`niani-logo.jpeg`) | exists | — | — | keep |
| Splash mark (`niani-mark.png`) | exists, 6.6 KB | — | — | keep |
| Reel thumbnails | 36 exist | 1080×1920 | 9:16 | **REAL** — frames from your reels |

---

## 4. Totals

| Category | Slots | Can be AI |
|---|---|---|
| AI-OK (permanent) | ~28 | yes |
| AI-TEMP (scaffold, swap before launch) | ~29 | yes, temporarily |
| REAL (never AI) | ~40+ and grows per project | no |

The practical read: **AI can carry roughly half the site indefinitely and most of the rest
through the build**, but the portfolio has to be shot.

---

## 5. Base prompt block for AI-OK slots

Prepend this to every generation so output is brand-consistent:

```
Editorial interior photography, Indian residential context, calm and restrained.
Warm cream background tone (#fafaed), deep burgundy accents (#50030C),
walnut wood (#866042), brushed brass (#e1b66f), natural linen and stone textures.
Soft diffused natural daylight from a side window, gentle shadows, no harsh contrast.
Muted, slightly desaturated colour grading. Shot on 35mm, shallow depth of field.
No people, no text, no logos, no watermarks. Clean composition with generous negative space.
```

Per-slot modifiers:

| Slot | Append |
|---|---|
| Floating fragment | `Extreme close-up detail crop — a corner of upholstery, a joinery edge, a brass handle. Abstract, unrecognisable as a full room. Tight framing.` |
| Think card | `Vertical 4:5 composition. A single considered vignette — styled shelf, dining corner, reading nook. Editorial magazine feel.` |
| Texture swatch | `Flat-lay material sample, top-down, filling the frame. [walnut veneer / natural linen weave / honed stone / brushed brass].` |
| Service hero | `Wide establishing shot of a [modular kitchen / living room / office reception] in a modern Indian apartment. Uncluttered, aspirational.` |
| Journal header | `Wide 16:9. Atmospheric and conceptual rather than literal. Room in soft morning light.` |
| Process illustration | `Minimal line illustration, single burgundy stroke on cream, geometric, no shading.` |
| OG share card | `Wide 1.91:1 banner composition with clear empty space in the left third for overlaid text.` |
| 404 art | `An empty room mid-renovation, drop cloths and a single chair. Quiet, slightly wry.` |

**Negative prompt for all:** `text, watermark, logo, signature, people, faces, cluttered,
oversaturated, HDR, fisheye, distorted perspective, warped furniture, extra limbs,
melted geometry, cartoon, 3d render look`

Interior AI images fail most often on **perspective and furniture geometry** — check
straight lines on cabinetry, chair legs, and window frames before accepting an output.

---

## 6. Output specs

- **Format:** WebP primary, AVIF if the pipeline supports it. JPEG fallback only if needed.
- **Widths to emit per slot:** 640 / 1280 / 1920, wired to `srcset` + `sizes`.
- **Quality:** WebP q=82. Target under 150 KB for full-bleed, under 40 KB for cards,
  under 15 KB for fragments.
- **Naming:** lowercase kebab-case, descriptive, no spaces —
  `modular-kitchen-hero.webp`, not `IMG_2043.webp`.
- **Every `<img>` needs:** explicit `width` + `height` (prevents layout shift),
  `loading="lazy"` below the fold, and real `alt` text describing the space —
  `alt="Walnut kitchen island with brass pulls under a linen pendant"`, not `alt="kitchen"`.
- **Generate at 2x the export size, then downscale** — AI output is softer than it looks
  at full resolution.

---

## 7. Priority order

1. **Replace the 27 Pexels hotlinks** — 24 in `routes/Home.jsx`, 3 in `routes/Work.jsx`.
   They're third-party-dependent, uncontrolled, and stock interiors on a studio's own site
   undercut the pitch. The 11 fragments + 3 think cards can go AI immediately; the 9 world-strip
   slides and 3 work cards should be queued for real photography.
2. **Shoot 3 complete projects** — hero + 12 gallery + before/after each. This unblocks
   `/work`, `/work/:slug`, and gives the service pages real supporting imagery.
3. **Replace the 3 sample testimonial headshots** with real clients, or drop the photos
   and run text-only quotes until real ones exist.
4. **Generate the AI-OK set** — fragments, textures, journal headers, OG cards, 404.
5. **Shoot the studio and team** for `/about`.

---

## 8. Tracking AI-TEMP slots

Keep a `data-ai-placeholder` attribute on any `<img>` using AI-TEMP imagery. Before public
launch, run:

```
grep -rn "data-ai-placeholder" src/
```

If it returns anything, the site is not launch-ready. Cheap guardrail, prevents the classic
failure of scaffolding quietly shipping to production.
