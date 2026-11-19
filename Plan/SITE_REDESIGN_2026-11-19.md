# Portfolio redesign: colour system, typography, motion

Status: **PHASE 1 BUILT, NOT PUSHED. PHASES 2 AND 3 PROPOSED ONLY, NOTHING BUILT.**
Date: 2026-11-19
Brief (verbatim): "not much colors on my site design something new with claude skills something professional too"
plus "3JS And Famous Front end librbrises idk what the names but they make dynamic scrolls"

## 1. What is wrong with the current site

The current design is the generic AI-portfolio default, and that is the real cause of the
"not much colors" complaint. It is near-black (#0a0b0f) with exactly one accent (#6e8bff),
so every section looks the same and nothing is distinguishable at a glance.

Five specific tells, all present today:

| Tell | Where |
| --- | --- |
| Numbered section markers (01 / 02 / 03) on content that is not a sequence | every `sec-num` |
| Tracked-out ALL-CAPS eyebrow above every heading | `.eyebrow`, `.kicker` |
| Monospace face used for all small labels | Space Mono throughout |
| Meta strings joined with middle dots | "01 · Overview" |
| Arrow glyph appended to every link | "GitHub ↗", "VERIFY CREDENTIAL ↗" |

Three of those (the `09 · Certifications` marker, the mono label, the arrow on the verify
link) I added on 2026-11-19 when building the certifications section. They are mine to undo.

## 2. The idea: colour that encodes domain

The page should not add colour as decoration. It should use colour to tell a reader which
of four domains a thing belongs to, so the breadth of the work is legible without reading.

Source for a multi-hue palette: a **spectrogram**, which is what the flagship call-analytics
system actually looks at, and which is inherently multi-hue (cool for low intensity, hot for
high). That gives a principled reason for four hues instead of one accent.

| Domain | Hue | Applied to |
| --- | --- | --- |
| Speech & AI | cyan | flagship AI section, ML/LLM tags, the ML certification |
| Data & Pipelines | green | Data-Layer work, BigQuery/SQL tags, the analytics certification |
| Voice & Telephony | amber | VoIP section, Asterisk/SIP/PJSIP tags |
| Platform & Infra | violet | Kubernetes section, Argo/Docker/Traefik tags |

## 3. Tokens

All values below are measured, not estimated. Every one clears WCAG AA (4.5:1) for small
text on both its backgrounds. Figures are contrast ratio against the raised surface, the
tighter of the two grounds.

### Dark (default)

    --bg        #0A1020   deep navy ink, not tinted near-black
    --surface   #111A2E   raised
    --ink       #EAF0FA   15.15
    --muted     #94A3C0    6.82
    --faint     #7D8CAB    5.13
    --signal    #5CC8FF    9.22   Speech & AI
    --data      #3DDC97    9.81   Data & Pipelines
    --voice     #FFC14D   10.72   Voice & Telephony
    --platform  #B98CFF    6.82   Platform & Infra

### Light

    --bg        #F6F8FC
    --surface   #FFFFFF
    --ink       #0B1222   18.69
    --muted     #4A5670    7.35
    --faint     #626E87    5.12
    --signal    #0B6FA4    5.49
    --data      #0B7A5E    5.30
    --voice     #9A5500    5.72
    --platform  #6D3BCF    6.61

### Type

Out: Space Grotesk + Inter + Space Mono. Space Grotesk with Space Mono is the single most
common pairing on generated portfolios, so it works against the goal.

In:
- **Archivo** for display. Engineered, slightly condensed, carries weight at large sizes.
- **IBM Plex Sans** for body and UI. Genuine engineering provenance, highly legible.
- **IBM Plex Mono** only where the content is genuinely tabular data: credential IDs,
  dates, measured figures. Not for decorative labels.

Both families are on Google Fonts, so the existing preconnect stays.

## 4. Structural changes (phase 1, no dependencies)

- Remove the 01..10 section numbers. The sections are not a sequence. A domain colour and
  the section name carry the same wayfinding with none of the false ordering.
- Remove the ALL-CAPS tracked eyebrows where they are decorative. Keep a label only where
  it states something a reader cannot infer.
- Remove the trailing arrow glyphs from link text.
- Drop the blanket fade-up on every section. Scattered identical entrances are the thing
  that reads as machine-made. See phase 3 for what replaces it.

## 5. Phase 2 (PROPOSED, NOT BUILT): the hero

Concept: **a call becoming data.** The flagship system listens to thousands of phone calls
and turns sound into structured analysis. In three.js that is a waveform ribbon that
resolves, as the hero is scrolled, from continuous signal into discrete analysis fields
(sentiment, intent, outcome, duration). One orchestrated moment, at the top, then the page
behaves normally.

This is the one place to spend boldness. Nobody else's portfolio hero is sound becoming
meaning, and it is a true statement about the work rather than an abstract particle field.

## 6. Phase 3 (PROPOSED, NOT BUILT): scroll choreography

Scope it to the hero pin and the waveform progress only. Not a reveal on every section.

## 7. Dependencies (REQUIRE APPROVAL per the 2026-11-06 vetted-dependencies policy)

Measured from the npm registry and jsDelivr on 2026-11-19.

| Package | Latest | Released | Downloads/wk | Licence | Maintainers | Size (gz) |
| --- | --- | --- | --- | --- | --- | --- |
| three | 0.187.0 | 2026-10-30 | 37,314,532 | MIT | mrdoob, mugen87 | 87 KB |
| gsap | 3.15.1 | 2026-11-04 | 8,427,368 | "No charge" standard | greensock | 27 KB |
| gsap ScrollTrigger | (in gsap) | 2026-11-04 | (in gsap) | "No charge" standard | greensock | 17 KB |
| lenis | 1.3.27 | 2026-10-15 | 2,738,477 | MIT | clementroche, feledori | 5 KB |

### Recommendation

- **three**: yes. Carries the hero.
- **gsap + ScrollTrigger**: yes. ScrollTrigger stopped being a paid Club plugin and now
  ships inside the free package. Note the licence is NOT MIT, it is GreenSock's "no charge"
  standard licence: free for commercial and non-commercial use as long as end users are not
  charged to access the product. A portfolio qualifies cleanly. Flagging it because it is
  proprietary-but-free, not open source, which is a different vetting answer from MIT.
- **lenis**: **no.** Smooth-scroll hijacking overrides the native scroll the reader's OS and
  trackpad already tuned, it fights screen readers and keyboard paging, and it is the single
  most common complaint about agency portfolio sites. The hero effect does not need it.
- **locomotive-scroll**: no. 23,721 downloads/wk against lenis's 2.7m, same job, and lenis
  is the one the ecosystem moved to.
- **aos**: no. Last release 2018-10-03, unmaintained for 8 years, and it only does the
  blanket fade-up that section 4 removes on purpose.

### Cost

The page ships almost no JavaScript today. three + gsap + ScrollTrigger is about **131 KB
gzipped**, which is the entire budget of this redesign and more than every image on the
homepage combined. Mitigation, required if phase 2 proceeds:

- Load three.js only after first paint, only above a desktop breakpoint, and only when
  `prefers-reduced-motion` is not set.
- Ship a static first frame so the hero is never empty or broken on a phone or a slow link.
- Pin exact versions on the CDN. No floating ranges.

## 8. Phasing

Phases are independent so they do not disturb each other.

1. **Colour, type, structure.** No dependencies. Reversible with one `git revert`.
2. **three.js hero.** Needs the dependency decision above.
3. **Scroll choreography.** Needs the dependency decision above.

## 9. Open questions

- Does the dark ground stay the default, with light as the toggle? Phase 1 assumes yes.
- Is the "call becoming data" hero the right bet, or should the hero stay typographic?
