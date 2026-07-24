# BND.STUDIO — Full-Page Visual Gap Audit

**Stage:** 10  
**Baseline:** Stage 9 runtime, HEAD `8243504ac614ce99dfc80545aa987d47116bf492`  
**Status:** analytical; no implementation changes.

## 1. Full-page evidence

- Desktop full page: 1440 × 6374.
- Mobile full page: 390 × 15365.
- Desktop section sum: 6158 px.
- Mobile section sum: 15183 px.
- Stage 8 interaction feel remains UNCONFIRMED until live review.

## 2. Section gap matrix

| Section | Current strength | Main visual gap | Reference principle | Required adaptation | Priority |
|---|---|---|---|---|---|
| Hero | Strong H1 structure, correct dark/cyan direction, replaceable media contract | Core has insufficient perceived mass; HUD and strip distribute attention too evenly | Heavy physical focal object balanced by dominant heading | Integrate Blender asset, concentrate light and reduce tertiary border intensity | P0 |
| Problem Explorer | Clear diagnosis → system → outcome structure; functional states | Central Core and routes lack the reference's depth and authority | Routing hub is visually dominant over modules | Increase Core local contrast/occlusion and create 3-level route hierarchy | P0 |
| Product Assembler | Four directions, octagonal core and stack/principles logic read correctly | Left proposition zone is weaker; center/right carry most visual weight | Asymmetric but balanced product-assembly scene | Strengthen left anchor with verified content or compact architecture summary; avoid fake metrics | P1 |
| Configurator | Column proportions closely match reference; semantics and disabled foundation are honest | Selected state and preview are understated; long mobile height | Task area is primary, orientation and preview support it | Increase current-step hierarchy; simplify mobile sequence/progressive disclosure later | P0 |
| Projects | Honest pending state and differentiated large panel | Six category cards create familiar grid rhythm; no visual proof asset yet | Evidence section should change page tempo | Replace with real cases/media when available; keep one featured system panel | P1 |
| Workflow | Readable five-step sequence and artifacts | 700px section is sparse; equal columns and long quiet areas reduce tension | Narrative route with one active/accent stage | Compress desktop height or add meaningful progression evidence; do not add filler | P1 |
| Technologies and Principles | Correct separation of stack and principles | Outer geometry resembles Projects; principle text is small and low contrast | System map and ruleset must be distinct visual families | Increase hierarchy contrast and use different internal framing for principles | P1 |
| Contact | Clear next step; honest disabled state and privacy treatment | Large disabled form becomes a low-energy 763px scene | Final conversion area must regain focus after dense systems | Rebuild around real contact/form data; reduce pending dead space | P0 |
| Footer | Clean technical closure and honest statuses | Could be more tightly integrated with Contact transition | Lower-density system closure | Share one transition rail/status band with Contact without merging semantics | P2 |

## 3. Density and rhythm matrix

| Section | Reference density | Current density | Rhythm problem | Adaptation rule | Priority |
|---|---|---|---|---|---|
| Hero | high right / medium left | medium-high, but proxy is visually light | focal energy is spread across Core, cards and strips | concentrate visual energy around H1 + Blender Core | P0 |
| Problem Explorer | high center/right | high and evenly outlined | too many surfaces share similar border intensity | reduce inactive surfaces; strengthen Core and active route | P0 |
| Product Assembler | high center / medium sides | high center/right, low left | left side loses counterweight | add verified architectural value, not decorative filler | P1 |
| Configurator | high center / medium sides | high | mobile becomes excessively long | preserve desktop ratio; redesign mobile disclosure later | P0 |
| Projects | medium-high with media/evidence | medium grid | another card field after Configurator | use one featured evidence object plus fewer supporting categories | P1 |
| Workflow | medium linear | low-medium | section height exceeds information density | compress or increase meaningful artifact visibility | P1 |
| Technologies | medium-high split | medium | visually similar to Projects framing | differentiate system map and ruleset surfaces | P1 |
| Contact | medium focused CTA | medium-low | disabled form produces a long energy drop | once production data exists, create one decisive primary action | P0 |
| Footer | low | low | acceptable | integrate transition from Contact | P2 |

## 4. Measured vertical rhythm

### Desktop

| Section | Height | Page share |
|---|---:|---:|
| Hero | 965px | 15.1% |
| Problem Explorer | 500px | 7.8% |
| Product Assembler | 514px | 8.1% |
| Configurator | 941px | 14.8% |
| Projects | 700px | 11.0% |
| Workflow | 700px | 11.0% |
| Technologies | 720px | 11.3% |
| Contact | 763px | 12.0% |
| Footer | 355px | 5.6% |

The three consecutive lower sections are almost equal: Projects 700 px, Workflow 700 px, Technologies 720 px. This is the strongest desktop rhythm repetition.

### Mobile

| Section | Height | Page share |
|---|---:|---:|
| Hero | 1385px | 9.0% |
| Problem Explorer | 1909px | 12.4% |
| Product Assembler | 1521px | 9.9% |
| Configurator | 3249px | 21.1% |
| Projects | 1845px | 12.0% |
| Workflow | 1336px | 8.7% |
| Technologies | 1764px | 11.5% |
| Contact | 1416px | 9.2% |
| Footer | 758px | 4.9% |

Configurator alone occupies 21.1% of the mobile page. Problem Explorer, Projects and Technologies are each long vertical stacks. This is a structural, not typographic, issue.

## 5. Top ten visual gaps

1. **Hero physical mass:** the proxy bbox is acceptable but the object lacks material mass, shadow and local luminous authority.
2. **Hero focal concentration:** H1, HUD cards, capability strip and technology strip compete more evenly than the reference.
3. **Central Core authority:** Problem Explorer's Core does not dominate six module relations strongly enough.
4. **Route hierarchy:** structural, inactive and active lines are too similar in opacity and thickness.
5. **Configurator mobile length:** 3,249 px is disproportionately long and creates the largest mobile scroll cost.
6. **Lower-page cadence:** Projects, Workflow and Technologies repeat similar section height and frame rhythm.
7. **Typography character:** fallback display type is wider and less condensed; microcopy is often too small/dim.
8. **Cyan distribution:** cyan is generally restrained but too uniform, so active state and background structure can merge.
9. **Contact energy:** the pending disabled form is honest but visually becomes a long low-energy endpoint.
10. **Full-page transitions:** section frames are coherent, yet several transitions depend mostly on spacing and border repetition rather than a distinct narrative shift.

## 6. Horizontal architecture audit

| Anchor | Current | Gap | Rule |
|---|---|---|---|
| Global outer frame | consistent | none | retain |
| Primary left text anchor | mostly consistent | small section-specific drift | keep within a 4–7% viewport band |
| Core/scene center | consistent in upper scenes | lower scenes lack comparable focal anchors | each lower scene requires one primary anchor |
| Right evidence rail | strong in Configurator/Central Panels | absent by design in lower sections | do not force; use only when evidence exists |
| Bottom strip baseline | strong in Hero/Product Assembler | inconsistent elsewhere | use transition bands selectively, not everywhere |

## 7. Typography audit

- Hero H1 has correct dominance but the fallback is wider than the reference.
- Problem/Product headings are readable but use more conventional width and less condensed tension.
- Configurator current-step heading is strong; secondary labels are too quiet.
- Workflow and Technologies body copy falls toward low contrast at native size.
- Contact combines strong heading with very weak field/helper text.
- Footer microcopy is intentionally tertiary but should be checked at 200% zoom and 390 px.

## 8. Interface-density estimate

Approximate visual share, based on screenshot inspection:

| Scene | Content | Panels | Decorative system | Free space |
|---|---:|---:|---:|---:|
| Hero reference | 27% | 23% | 30% | 20% |
| Hero current | 29% | 25% | 22% | 24% |
| Problem Explorer current | 31% | 39% | 20% | 10% |
| Product Assembler current | 28% | 37% | 22% | 13% |
| Configurator current | 36% | 44% | 12% | 8% |
| Lower desktop current | 27% | 40% | 11% | 22% |
| Full mobile current | 32% | 42% | 7% | 19% |

These values are **approximate INFERENCE**, used for relative comparison only.

## 9. Current strengths to preserve

- coherent dark foundation;
- honest data and pending states;
- no rasterized controls;
- stable outer-frame language;
- upper-section business logic is understandable;
- desktop Configurator macro proportions are close to reference;
- central objects have distinct conceptual roles;
- mobile has no horizontal overflow;
- accessibility and reduced-motion contracts are established;
- lower sections are not identical in component semantics even when frame rhythm repeats.

## 10. Unconfirmed assumptions

1. Exact display font remains unknown.
2. Blender Cube final silhouette, material and render sequence are not available in this audit.
3. Real project-case count and media format are unknown.
4. Production contact channels and form complexity are unknown.
5. Production copy may significantly alter section heights.
6. Stage 8 live transition speed and focus feel remain unreviewed.
7. Mobile final interaction model for Configurator is not yet defined.
8. Final CMS/localization requirements may alter card and text density.
