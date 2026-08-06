# Niani Designs — Image Generation Manifest

> Decision (2026-08-06): **generated imagery across the site for now**, real photography
> swapped in as projects are shot.
>
> This file is the execution list. Every image the site needs: exact filename, exact
> output size, and the subject line to generate it from. ~103 images across 9 batches.
>
> Pair with `IMAGE-BRIEF.md` (slot rationale + specs) and `ARCHITECTURE.md` (page structure).

---

## How to build each prompt

```
FINAL PROMPT = BASE + SUBJECT + NEGATIVE
```

**BASE** — prepend to every image:

```
Editorial interior photography, Indian residential context, calm and restrained.
Warm cream background tone (#fafaed), deep burgundy accents (#50030C),
walnut wood (#866042), brushed brass (#e1b66f), natural linen and stone textures.
Soft diffused natural daylight from a side window, gentle shadows, no harsh contrast.
Muted, slightly desaturated colour grading. Shot on 35mm, shallow depth of field.
No people, no text, no logos, no watermarks. Clean composition, generous negative space.
```

**NEGATIVE** — append to every image:

```
text, watermark, logo, signature, people, faces, cluttered, oversaturated, HDR,
fisheye, distorted perspective, warped furniture, extra limbs, melted geometry,
cartoon, 3d render look, fake plants, stock-photo styling
```

**Generate at 2x the listed size, then downscale** — AI output is softer than it appears
at native resolution.

**Reject and regenerate if:** cabinetry lines bow, chair/table legs are malformed, window
frames don't align, or reflections contradict the light source. Interiors fail on geometry
first — it's the tell that reads as fake even to people who can't name why.

---

## One labelling decision before launch

Generated portfolio images shouldn't be captioned as completed Niani projects — a
prospective client who asks to visit one has nowhere to go, and that's the single worst
conversation to have mid-sale.

The standard fix costs nothing and is normal practice in the industry: present them as
**concept work**. Label the three case studies "Design study" or "Concept — [typology]"
instead of naming a client and location. You get a full-looking portfolio, launch now, and
nothing on the page is a false claim. When real shoots land, relabel and swap.

Same applies to the three testimonials: keep the existing "Sample client 01 / SAMPLE
REVIEW" wording. That disclosure is what makes them honest — don't strip it to make them
read as real reviews.

---

## Batch 1 — Home floating fragments (11 images)

**Size:** 400×300 · **Ratio:** 4:3 · **Path:** `public/atmosphere/`

These render at 66–98px, rotated and parallaxed. Tight abstract crops, not full rooms.

Add to each subject: `Extreme close-up detail crop, abstract, unrecognisable as a full room. Tight framing.`

| # | Filename | Replaces (`scene-`) | Subject |
|---|---|---|---|
| 1 | `fragment-suite.webp` | scene-1 | Corner of a linen-upholstered headboard meeting a walnut side table |
| 2 | `fragment-living.webp` | scene-2 | Edge of a cream boucle sofa arm with soft window light falling across it |
| 3 | `fragment-mood.webp` | scene-3 | Layered fabric swatches fanned on a stone surface |
| 4 | `fragment-dining.webp` | scene-4 | Rim of a walnut dining table with a brass-handled drawer behind |
| 5 | `fragment-seat.webp` | scene-7 | Close detail of a chair joint, wood grain and stitched leather |
| 6 | `fragment-shelf.webp` | scene-9 | Corner of an open shelf with two ceramic vessels, shallow focus |
| 7 | `fragment-gallery.webp` | scene-10 | Two framed edges on a cream wall, raking light |
| 8 | `fragment-evening.webp` | scene-12 | Warm brass lamp glow against a dark burgundy wall |
| 9 | `fragment-kitchen.webp` | scene-13 | Corner of a stone countertop meeting a matte cabinet front |
| 10 | `fragment-table.webp` | scene-15 | Table edge with a linen runner falling out of frame |
| 11 | `fragment-oak.webp` | scene-17 | Smoked oak veneer grain filling the frame at an angle |

`scene-5, 6, 8, 11, 14, 16` are CSS gradients — **generate nothing**.

---

## Batch 2 — Home think cards (3 images)

**Size:** 1000×1250 · **Ratio:** 4:5 · **Path:** `public/atmosphere/`

Add to each: `Vertical 4:5 composition, single considered vignette, editorial magazine feel.`

| Filename | Card title | Subject |
|---|---|---|
| `think-material-palette.webp` | "By material palette" | Flat-lay of walnut, brass, linen and stone samples arranged on cream paper |
| `think-visual-similarity.webp` | "by visual similarity" | Styled shelf vignette — books, ceramic, small brass object, soft shadow |
| `think-without-noise.webp` | "and without noise." | Empty reading nook, one chair, one lamp, cream wall, deep negative space |

---

## Batch 3 — Home world strip (9 images)

**Size:** 1200×800 · **Ratio:** 3:2 · **Path:** `public/atmosphere/`

Three keyword slides, three images each.

| Filename | Keyword | Subject |
|---|---|---|
| `strip-kitchen-01.webp` | modular kitchen | Modern Indian modular kitchen, matte cabinets, stone counter, brass pulls |
| `strip-kitchen-02.webp` | modular kitchen | Tall pantry unit with integrated handles, walnut and cream |
| `strip-kitchen-03.webp` | modular kitchen | Kitchen island with pendant lights, morning light from the left |
| `strip-renovation-01.webp` | renovation | Living room mid-transformation, clean new joinery against old wall |
| `strip-renovation-02.webp` | renovation | Newly finished dining area, walnut table, cane chairs |
| `strip-renovation-03.webp` | renovation | Restored balcony corner with stone flooring and planters |
| `strip-pooja-01.webp` | pooja room | Compact pooja room, carved wooden mandir, brass diya, warm light |
| `strip-pooja-02.webp` | pooja room | Pooja niche integrated into joinery, marble base, soft uplight |
| `strip-pooja-03.webp` | pooja room | Traditional mandir with jali screen detail, cream and teak |

---

## Batch 4 — Work index cards (3 images)

**Size:** 1600×1200 · **Ratio:** 4:3 · **Path:** `public/projects/<slug>/card.webp`

| Slug | Subject |
|---|---|
| `concept-apartment-bengaluru` | Wide living room of a modern Bengaluru 3BHK, cream walls, walnut joinery |
| `concept-kitchen-study` | Full modular kitchen, wide establishing shot, natural side light |
| `concept-villa-interior` | Double-height villa living space, stone feature wall, brass accents |

Label these **"Design study"** on the card, not a client name.

---

## Batch 5 — Case study galleries (33 images)

**Path:** `public/projects/<slug>/`

Per project: 1 hero + 10 gallery. Repeat for all 3 slugs above.

| File | Size | Ratio | Subject |
|---|---|---|---|
| `hero.webp` | 2400×1350 | 16:9 | Wide establishing shot of the main living space |
| `gallery-01.webp` | 2400×1600 | 3:2 | Living area from the opposite corner |
| `gallery-02.webp` | 1600×2000 | 4:5 | Vertical — joinery detail, full height |
| `gallery-03.webp` | 2400×1600 | 3:2 | Dining area with pendant lighting |
| `gallery-04.webp` | 1600×2000 | 4:5 | Vertical — kitchen tall units |
| `gallery-05.webp` | 2400×1600 | 3:2 | Master bedroom, wide |
| `gallery-06.webp` | 1600×2000 | 4:5 | Vertical — wardrobe interior detail |
| `gallery-07.webp` | 2400×1600 | 3:2 | Bathroom, stone and brass |
| `gallery-08.webp` | 1600×2000 | 4:5 | Vertical — corner styling vignette |
| `gallery-09.webp` | 2400×1600 | 3:2 | Balcony or transitional space |
| `gallery-10.webp` | 2400×1600 | 3:2 | Final wide shot, evening light |

Keep every image in one project visually consistent — same palette, same light direction,
same time of day. Inconsistency across a single "project" is the fastest giveaway.

---

## Batch 6 — Service pages (20 images)

**Path:** `public/services/<slug>/`
**Hero:** 2000×1125 (16:9) · **Details:** 1200×900 (4:3), 3 per service

| Slug | Hero subject | Detail subjects |
|---|---|---|
| `residential-interiors` | Wide finished living room, warm and lived-in | Bedroom · Study corner · Entry foyer |
| `modular-kitchen` | Full modular kitchen, wide, island in focus | Drawer organisation · Tall unit · Counter detail |
| `commercial-interiors` | Modern office reception, cream and walnut | Meeting room · Workstation cluster · Breakout area |
| `turnkey-execution` | Finished space with subtle signs of handover | Site coordination detail · Joinery install · Final styling |
| `interior-styling-consultation` | Styled vignette, layered textures | Fabric layering · Accessory grouping · Colour palette flat-lay |

---

## Batch 7 — Process illustrations (5 images)

**Size:** 600×600 · **Ratio:** 1:1 · **Path:** `public/atmosphere/process/`

Use a different style — **not** the photographic BASE:

```
Minimal line illustration, single deep burgundy (#50030C) stroke on warm cream (#fafaed).
Geometric, flat, no shading, no gradient, generous white space. Icon-like.
```

| Filename | Step | Subject |
|---|---|---|
| `step-01-consult.webp` | Consult | Two simple chairs facing each other across a small table |
| `step-02-design.webp` | Design | A floor plan outline with a drafting compass |
| `step-03-materials.webp` | Materials | Three stacked material swatch squares |
| `step-04-execute.webp` | Execute | A simple crane/pulley or ladder against a wall outline |
| `step-05-handover.webp` | Handover | A key and an open door outline |

---

## Batch 8 — Textures (6 images)

**Size:** 300×300 · **Ratio:** 1:1 · **Path:** `public/atmosphere/textures/`

Add: `Flat-lay material sample, top-down, filling the entire frame, even light.`

`texture-walnut.webp` · `texture-linen.webp` · `texture-stone.webp` ·
`texture-brass.webp` · `texture-marble.webp` · `texture-cane.webp`

---

## Batch 9 — Global / system (13 images)

| Filename | Size | Path | Subject |
|---|---|---|---|
| `og-default.webp` | 1200×630 | `public/share/` | Wide banner, living room, **empty left third** for overlaid text |
| `og-work.webp` | 1200×630 | `public/share/` | Wide interior, empty left third |
| `og-services.webp` | 1200×630 | `public/share/` | Modular kitchen wide, empty left third |
| `og-about.webp` | 1200×630 | `public/share/` | Studio desk with material samples, empty left third |
| `og-contact.webp` | 1200×630 | `public/share/` | Warm entry foyer, empty left third |
| `og-films.webp` | 1200×630 | `public/share/` | Interior with cinematic framing, empty left third |
| `og-journal.webp` | 1200×630 | `public/share/` | Open book on a walnut table, empty left third |
| `og-process.webp` | 1200×630 | `public/share/` | Floor plans and swatches on a desk, empty left third |
| `404.webp` | 1200×900 | `public/` | Empty room mid-renovation, drop cloths and one chair — quiet, slightly wry |
| `journal/<slug>/header.webp` × 3 | 1600×900 | `public/journal/` | Atmospheric and conceptual rather than literal |
| `studio-exterior.webp` | 1600×900 | `public/about/` | Building entrance, warm evening light |

---

## Code swap map

Once files exist, replace hotlinks with local paths. Pattern:

```jsx
src: `${import.meta.env.BASE_URL}atmosphere/fragment-suite.webp`
```

### `src/routes/Home.jsx` — 24 replacements

| Pexels photo ID | → local file |
|---|---|
| 1571460 | `atmosphere/fragment-suite.webp` |
| 1454806 | `atmosphere/fragment-living.webp` |
| 1571463 | `atmosphere/fragment-mood.webp` |
| 1643383 (w=700) | `atmosphere/fragment-dining.webp` |
| 2062426 (w=700) | `atmosphere/fragment-seat.webp` |
| 1838554 | `atmosphere/fragment-shelf.webp` |
| 1571458 (w=700) | `atmosphere/fragment-gallery.webp` |
| 2082090 (w=700) | `atmosphere/fragment-evening.webp` |
| 6585754 (w=700) | `atmosphere/fragment-kitchen.webp` |
| 271743 (w=700) | `atmosphere/fragment-table.webp` |
| 1571468 (w=700) | `atmosphere/fragment-oak.webp` |
| 5998031 | `atmosphere/think-material-palette.webp` |
| 1080721 | `atmosphere/think-visual-similarity.webp` |
| 1648768 (w=1000) | `atmosphere/think-without-noise.webp` |
| 1648776 (w=1200) | `atmosphere/strip-kitchen-01.webp` |
| 1571458 (w=1200) | `atmosphere/strip-kitchen-02.webp` |
| 1643383 (w=1200) | `atmosphere/strip-kitchen-03.webp` |
| 1648768 (w=1200) | `atmosphere/strip-renovation-01.webp` |
| 271743 (w=1200) | `atmosphere/strip-renovation-02.webp` |
| 2062426 (w=1200) | `atmosphere/strip-renovation-03.webp` |
| 6585754 (w=1200) | `atmosphere/strip-pooja-01.webp` |
| 2082090 (w=1200) | `atmosphere/strip-pooja-02.webp` |
| 1571468 (w=1200) | `atmosphere/strip-pooja-03.webp` |

Several IDs appear twice at different widths (`w=700` vs `w=1200`) — they map to
**different** local files. Match on width, not just ID.

### `src/routes/Work.jsx` — 3 replacements

| Pexels photo ID | → local file |
|---|---|
| 1571460 | `projects/concept-apartment-bengaluru/card.webp` |
| 1648776 | `projects/concept-kitchen-study/card.webp` |
| 1643383 | `projects/concept-villa-interior/card.webp` |

**Done when:** `grep -rn "pexels.com" src/` returns nothing.

---

## Output specs

- **Format:** WebP q=82 (AVIF too if the pipeline supports it)
- **Widths per slot:** 640 / 1280 / 1920 wired into `srcset` + `sizes`
- **Budget:** full-bleed < 150 KB · cards < 40 KB · fragments < 15 KB
- **Every `<img>`:** explicit `width`/`height`, `loading="lazy"` below the fold, and
  descriptive `alt` — `alt="Walnut kitchen island with brass pulls under a linen pendant"`,
  not `alt="kitchen"`
- **Tag every generated image** with `data-ai-placeholder` so real photography can be
  found and swapped later:

```
grep -rn "data-ai-placeholder" src/     # lists everything still generated
```

---

## Batch order

1. **Batch 1 + 2 + 3** (23 images) — kills 24 of the 27 Pexels hotlinks in one pass
2. **Batch 4** (3) — kills the last 3
3. **Batch 8** (6 textures) — cheap, reusable everywhere
4. **Batch 6** (20) — unblocks the service pages
5. **Batch 5** (33) — the case studies, labelled as design studies
6. **Batch 7 + 9** (18) — process, OG cards, 404

After step 2, `grep -rn "pexels.com" src/` should be clean and the site has zero
third-party image dependencies.
