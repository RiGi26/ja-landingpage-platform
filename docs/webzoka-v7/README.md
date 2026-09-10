# Webzoka V7 project home

**Status:** Living project home, documentation-only checkpoint
**Last updated:** 2026-09-10
**Scope:** Public Webzoka V7 direction and review workflow

This directory is the compact source of truth for the Webzoka V7 public surface. It records the approved direction, the current implementation/review state, and the decisions needed before the next Work round. It is intentionally inside the `ja-corp-landing` repo; it is not a new project, repo, or source tree.

## North star

> **Website untuk ditemukan. Sistem untuk operasional jalan.**

Webzoka should help an owner-led Indonesian SMB become easier to find, easier to trust, and easier to run. The public homepage sells confidence to start; detailed product selection, pricing, order, and account management belong in the appropriate surface.

## Target audience and tone

- **Audience:** Owner-led Indonesian small and medium businesses with a credible online-presence need and too much manual operational work.
- **Primary fit:** Booking-based businesses, shops, F&B, clinics, salons, rental businesses, and other owners running work through WhatsApp, notes, and spreadsheets.
- **Tone:** Premium SMB partner — approachable, modern, credible, direct, and confident.
- **Avoid:** Enterprise-heavy SaaS language, generic dashboard chrome, AI-neon or purple-gradient styling, hype, invented proof, and copy that talks down to business owners.

## Public / Store / Hub boundary

| Surface | Buyer question | Owns | Current direction |
|---|---|---|---|
| **Public Web** | “Why should I trust Webzoka?” | Positioning, solutions story, proof, case studies, consultation, FAQ | Public homepage defaults to **Beranda** and uses rich editorial storytelling. |
| **Store** | “What exactly can I buy, see, and price?” | Products, templates, demos, Website / Portal / Bundle detail, calculator, order/trial, maintenance detail | Buying surface; current website handoff is `/seluruh-layanan`. |
| **Hub** | “Where do I manage what I already bought?” | Unified login, projects, systems, billing, support, order tracking | Route is still pending; do not invent or publish a URL. |

Public, Store, and Hub may share a calm left-navigation shell, but their canvases must keep different jobs: **Public = editorial/storytelling/rich; Store = structured/searchable/commercial; Hub = operational/dashboard.**

## Current branch and worktree status

- **Repo:** `ja-corp-landing` (`RiGi26/ja-landingpage-platform`)
- **Worktree:** `D:\Project\Website JapanArena\JapanArena SaaS\.wt-webzoka-v7-public-homepage`
- **Branch:** `codex/webzoka-v7-public-homepage`
- **Base HEAD observed at checkpoint:** `ccb11e8`
- **Production:** No production deployment performed.
- **Merge/push:** Not performed.
- **This checkpoint:** Creates only `docs/webzoka-v7/**`. Existing UI edits in `app/page.tsx`, `app/globals.css`, and `app/layout.tsx` are preserved and are outside this documentation task.

## Source-of-truth map

1. [`visual-blueprint.md`](./visual-blueprint.md) — current living design and content blueprint. Latest Chat decisions override older recommendations when they conflict.
2. [`review-log.md`](./review-log.md) — milestone and decision history, with evidence and the next review gate.
3. Current implementation — `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, and the existing route tree in this worktree.
4. Historical blueprint input — `C:\Users\61140\Documents\Codex\2026-09-10\webzoka-v7-public-homepage-visual-blueprint\outputs\webzoka-v7-public-homepage-visual-blueprint.md`.
5. Latest visual review input — `C:\Users\61140\Documents\Codex\2026-09-10\referenced-chatgpt-conversation-this-is-an-5\outputs\webzoka-v7-preview-visual-review.md`.
6. Product and UI constraints — root `AGENTS.md` / `CLAUDE.md`, repo `CLAUDE.md`, and the project `.claude/` guidance.

## Current implementation and preview state

The current V7 candidate has a Vercel Preview deployment and has passed the reported fresh visual UAT checkpoint:

- **Preview:** [ja-landingpage-platform-n6w2ragaq-rigi26s-projects.vercel.app](https://ja-landingpage-platform-n6w2ragaq-rigi26s-projects.vercel.app)
- **Deployment:** Ready, `dpl_GbgrKBmLqwgx6o9X4xdP4SmrChR7`
- **Viewport evidence:** Desktop `1440 × 900`; mobile `390 × 844`.
- **Reported checks:** 0 console errors, no mobile horizontal overflow, one `h1`, no missing image `alt`, mobile menu and FAQ work, sticky WhatsApp CTA does not cover the final CTA, and internal smoke routes returned HTTP 200.
- **Honest proof state:** Stock is the current validated operational demo candidate. LMS, Clinic, Pharmacy, Travel/Rental, and Laundry routes are not to be labelled Live until separately validated. Testimonials, logos, and metrics remain explicit placeholders.
- **Review verdict:** Ready for a focused visual-polish round; no structural rebuild requested.

This documentation checkpoint does not re-run or change the UI preview. The evidence above is the recorded result from the supplied visual review artifact.

## Deferred and unresolved

- Restore the mobile buying-model order to **Website → Portal → Bundle** while keeping Bundle visually featured.
- Reduce the dominance and repetition of the fixed mobile WhatsApp CTA; preserve safe-area spacing and suppression near the final CTA.
- Remove or demote the duplicate `Lihat demo Stock` action in the signature section.
- Keep the pending Hub entry quiet until an approved route exists; never invent a URL.
- Replace testimonial, customer-logo, and case-study-metric placeholders only after attribution and approval.
- Confirm renewal and maintenance terms in one approved commercial source.
- Revalidate every future `Live` route and portfolio domain before publishing it as proof.
- Polish mixed Indonesian/English microcopy after content/commercial approval.

## Chat Review Gate workflow

```text
Chat Review Gate
  approve direction, scope, and acceptance criteria
        ↓
Work
  implement only the approved round
        ↓
Preview / UAT
  validate fresh evidence at required routes and viewports
        ↓
Review Packet
  changed files, evidence, issues, unresolved items, recommendation
        ↓
Chat Review Gate
  Approve / Revise / Change direction
        ↺
```

Work must stop after the Review Packet. Work may not merge, push, deploy production, or begin the next phase without an explicit approval from the Chat review gate. A new visual-polish round is a separate approved Work scope; this checkpoint does not authorize implementation.

## Working rules

- Keep the source of truth in this repo/worktree; do not create a second Webzoka V7 source tree in the umbrella folder.
- Preserve the left-navigation V6 concept. Improve hierarchy, content depth, and canvas character instead of reverting Public to a top-nav-only shell.
- Treat route status, proof attribution, pricing terms, and Hub availability as factual dependencies, not visual decoration.
- Keep changes scoped to the approved file set. Do not merge or deploy production from a Work round without Chat approval.
