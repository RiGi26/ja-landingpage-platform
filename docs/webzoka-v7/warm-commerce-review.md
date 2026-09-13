# Webzoka Store V2 — Warm Commerce prototype review

**Date:** 2026-09-11
**Status:** `Preview` — ready for Chat visual approval, not a Live Store product.
**Scope boundary:** one Warm Commerce template, its Store entry/detail, and a truthful rendered preview. No checkout, customer account, payment, Hub, full configurator, CMS, or additional templates were built.

## Product and route decision

The existing `/seluruh-layanan` route remains the legacy package/configuration flow. It was not repurposed because that would preserve a `Service → Package → Buy` mental model. Store V2 now begins with the template/business fit:

```text
Template → Preview → consultation for customization
```

New routes:

- `/store`
- `/store/template/warm-commerce`
- `/store/template/warm-commerce/preview`

The Public V7 left rail remains intact. Store uses a related but separate Store rail. The preview intentionally removes Webzoka shell chrome and becomes the fictional Dapur Rona business website. Store and detail metadata are `noindex`; the visible status remains `Preview` until a later product decision authorizes a Live claim.

## Experience delivered

- Store entry gives one honest, large Warm Commerce card with **Katalog**, **WhatsApp**, and **Lokasi**; it intentionally does not repeat a service-price claim.
- Detail page has breadcrumb, fit, capabilities, included foundation, optional growth areas, Website → Portal education, FAQ, and an honest WhatsApp consultation CTA. It says self-serve customization is not yet available.
- Preview uses Dapur Rona, an explicitly fictional Indonesian F&B demo. It is warm editorial/product-led: `#F7F1E7` paper, cocoa text, terracotta actions, olive/honey accents, Newsreader display type, and Plus Jakarta body text.
- The business flow is hero → featured discovery → catalog filters → curated package offer → fictional-story disclosure → four-step WhatsApp order process → example location → final WhatsApp CTA.
- Generated original food visuals are optimized WebP assets under `public/images/store/warm-commerce/`. Prompt set: warm editorial Indonesian food photography for Dapur Rona—pempek, pastel, nasi ayam kemangi, and a shared food spread; no people, logos, text, watermark, or borrowed customer material.
- `data/warm-commerce.ts` centralizes brand, catalog, navigation, optional-growth, and contact data so later templates can reuse a small 70/30 foundation without prematurely creating a full template engine.

## Validation evidence

- `npx tsc --noEmit`: exit 0.
- `npm run build`: exit 0; 17 static routes generated. Store `/store` is 2.67 kB, detail 2.95 kB, preview 5.8 kB (first-load shared JS 87.5 kB).
- `git diff --check`: exit 0 before code commit.
- `npm run lint`: not run as a pass/fail test because the repository opens its interactive ESLint setup prompt. It was cancelled; no lint configuration was added.
- New Vercel Preview: https://ja-landingpage-platform-krvlzqqqh-rigi26s-projects.vercel.app
- Deployment: `dpl_5ALpkhk4n1UhJbbXsPRgYyiN6xg4`, Preview target, `READY`; remote build created 17 static pages.
- Fresh route checks returned HTTP 200: `/`, `/store/`, `/store/template/warm-commerce/`, `/store/template/warm-commerce/preview/`, `/seluruh-layanan/`, `/pricing/`, `/kebijakan-privasi/`, `/syarat-ketentuan/`.

## Browser UAT

### Desktop — 1440 × 900

- Public still has a 244px rail and content beginning at x=244; **Webzoka Store** points to `/store`.
- Store and detail have the 232px Store rail and an honest preview/detail path; no Public-shell redesign occurs inside the preview.
- Preview has one `h1`, correct narrative order, no horizontal overflow, no missing image `alt`, visible desktop navigation, hidden mobile trigger, and a reduced-motion rule.
- Captured console errors/warnings: zero across Public, Store, detail, and preview.

### Mobile — 390 × 844

- Preview stacks copy before food imagery; its menu trigger is 44 × 44px, primary actions are 48px high, catalog remains readable at one column, and final CTA is visible without fixed-CTA overlap.
- Dapur Rona menu opens, every navigation item is 48px high, Escape closes it and restores focus to the trigger. The `Camilan` filter isolates **Pastel Ayam Rempah**.
- Store rail hides; Store card is 343.2px wide, the menu trigger is 44 × 44px, all drawer links are 44px high, and Escape restores focus to the trigger.
- Detail has one `h1`, no horizontal overflow, 44px menu trigger, and full-width 48px preview CTA.
- No missing `alt`, no console errors/warnings, and reduced motion is respected.

## Remaining and deferred

**P0:** none.
**P1:** none in this approved prototype scope.
**P2:** none in this approved prototype scope.

Deferred by design: full Store catalog, template comparison/recommendation, self-serve Customize/configurator, checkout/payment/accounts, operational Portal features, order/stock/customer systems, production SEO indexing decision, real customer content/assets, and the other five template concepts. Do not begin another template without a separately authorized round.

## Source and handoff

Code commit: `d666f6c feat: add Warm Commerce Store prototype`
Branch: `codex/webzoka-v7-public-homepage`
No merge and no production deployment occurred.

**Decision needed from Chat:** approve Warm Commerce as the reference visual/technical standard for a future, separately authorized template round; or identify a concrete visual/content issue for one bounded Warm Commerce revision. The status stays `Preview` in either case.
