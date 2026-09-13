# Webzoka V7 review log

**Purpose:** Living record of Webzoka V7 Public Web decisions, evidence, unresolved dependencies, and the next Chat Review Gate.
**Rule:** A historical evidence reference is not a fresh validation claim. Revalidate routes, visual behavior, proof, and commercial terms before launch.

## 2026-09-10 — Audit of `information.webzoka.com`

**Status:** Completed; historical discovery input.

**Decision:** Preserve the strongest SMB-facing ideas — pain-led language, `Rp600k` starting anchor, qualified `3–5 hari` launch promise, calculator and renewal transparency, Website + Portal bundles, practical FAQ, WhatsApp consultation, live portfolio proof, and the working Stock demo. Separate the ecosystem into Public Web, Store, and Hub.

**Evidence / reference:** Audit summary in Chat task `Rebuild Landing Page` (`6aa0c113-7078-83ec-b670-3e7541f16780`); synthesized in the historical blueprint at `C:\Users\61140\Documents\Codex\2026-09-10\webzoka-v7-public-homepage-visual-blueprint\outputs\webzoka-v7-public-homepage-visual-blueprint.md`.

**Unresolved:** LMS, Clinic, Pharmacy, Travel/Rental, and Laundry demo/root routes were reported as unavailable; several portfolio custom domains were reported broken; testimonials, logos, metrics, Hub route, and renewal source were not ready. Mobile sticky-CTA overlap risk and repeated CTA density required validation.

**Next review gate:** Use the audit only as discovery input. Lock a V7 blueprint before implementation and validate any route before giving it Live status.

## 2026-09-10 — Initial Webzoka V7 visual blueprint

**Status:** Completed; historical blueprint, superseded in one key decision.

**Decision:** Adopt warm editorial utility, outcome-led hero, post-hero pain statement, Website / Portal / Bundle story, one dark front-door-to-daily-operations moment, honest Live/Preview/Case study treatment, qualified pricing, explicit proof placeholders, and 390px mobile rules.

**Evidence / reference:** `C:\Users\61140\Documents\Codex\2026-09-10\webzoka-v7-public-homepage-visual-blueprint\outputs\webzoka-v7-public-homepage-visual-blueprint.md`.

**Unresolved:** Exact V6 labels/flows, route health, Stock validation, approved proof, renewal source, font choice, WhatsApp operations, and Hub destination still required confirmation.

**Next review gate:** Build the first V7 implementation against the blueprint, then review a real preview at desktop and mobile sizes.

## 2026-09-10 — First V7 implementation

**Status:** Implemented as a preview candidate; not launch-complete.

**Decision:** Implement the V7 public homepage in the correct `ja-corp-landing` V7 worktree. Keep the primary positioning, post-hero pain statement, product split, signature section, pricing/trust/FAQ/footer structure, route honesty, and mobile/accessibility behavior. Do not merge or deploy production.

**Evidence / reference:** Worktree `D:\Project\Website JapanArena\JapanArena SaaS\.wt-webzoka-v7-public-homepage`; implementation files `app\page.tsx`, `app\globals.css`, `app\layout.tsx`; implementation handoff recorded in Chat task `6aa0c113-7078-83ec-b670-3e7541f16780`.

**Unresolved:** Hub route remained 404/pending; proof remained placeholder; renewal terms lacked one approved source; visual approval and remote preview were still pending at this milestone.

**Next review gate:** Create a preview deployment and run fresh visual UAT at `1440 × 900` and `390 × 844` before deciding on visual polish.

## 2026-09-10 — First preview deployment and visual UAT

**Status:** Preview Ready; visual UAT passed with P1/P2 polish items.

**Decision:** No structural rebuild required. Proceed only to a focused visual-polish round after Chat review. Keep Stock as the current validated operational proof candidate and keep unsupported demos/proof out of Live/public claims.

**Evidence / reference:** `C:\Users\61140\Documents\Codex\2026-09-10\referenced-chatgpt-conversation-this-is-an-5\outputs\webzoka-v7-preview-visual-review.md`; Preview URL `https://ja-landingpage-platform-n6w2ragaq-rigi26s-projects.vercel.app`; deployment `dpl_GbgrKBmLqwgx6o9X4xdP4SmrChR7`.

**Unresolved:** P1 mobile offer order currently puts Bundle first; fixed WhatsApp CTA is visually dominant/repetitive on mobile. P2 items: duplicate Stock action, pending-Hub prominence, mixed-language microcopy. Hub route, proof attribution, and renewal source remain deferred.

**Next review gate:** Chat decides whether to approve the focused polish scope. No merge or production deployment is authorized by this entry.

## 2026-09-10 — Latest Chat decision: preserve left navigation, enrich content

**Status:** Adopted as the current blueprint direction; awaiting project-home approval before the next Work round.

**Decision:** Preserve the V6-style left-navigation shell because it is an explicit stakeholder request. Do not convert Public to top-nav-only. Make `Beranda` the default Public page; let Public, Store, and Hub share a calm shell family while keeping their canvases distinct. Enrich Public with editorial storytelling, larger hierarchy, real evidence, generous whitespace, and the single dark signature moment. Preserve the Website → Portal → Bundle order on mobile. Keep `Berhenti Jadi Admin di Bisnis Kamu Sendiri.` after the hero. Do not implement UI changes in this documentation checkpoint.

**Conflict resolution:** The historical blueprint’s top-navigation-only recommendation is overridden only for the navigation shell. Its positioning, section architecture, trust rules, tokens, status vocabulary, and mobile safeguards remain useful and are carried forward where they do not conflict.

**Evidence / reference:** Latest user decision in the referenced Chat task `6aa0c113-7078-83ec-b670-3e7541f16780`; supplied task brief; preview report listed above.

**Unresolved:** P1/P2 polish remains pending approval; Hub URL, testimonials/logos/metrics, renewal terms, and unvalidated demo routes remain open. Existing worktree UI edits remain outside this documentation task and were not changed here.

**Next review gate:** Review this project home in Chat. If approved, create a separate Work round for the focused visual polish, require fresh Preview/UAT evidence, and stop at the next Review Packet.

## 2026-09-10 — Focused visual-polish round

**Status:** Implemented, validated on a new Preview, and ready for Chat visual approval. No merge or production deployment performed.

**Scope completed:** Restored mobile offer order to Website → Portal → Bundle; reduced the fixed mobile WhatsApp CTA to a centered `Chat WhatsApp` action with a 44px touch target; removed the duplicate Stock action from the signature operations frame; quieted pending Hub treatment to `Segera`; and localized the flagged buyer-facing mixed-language microcopy. Main section order and the existing shell were preserved.

**Source changes:** `app/page.tsx`, `app/globals.css`, and `app/layout.tsx`. This round did not structurally convert the current header shell into a left rail; that remains a separate structural decision if Chat requires shell parity with the documented V6 sidebar direction.

**Fresh validation evidence:**

- Local `npx tsc --noEmit`: exit 0.
- Local `npm run build`: exit 0; all static routes prerendered.
- `git diff --check`: exit 0.
- `npm run lint`: unavailable because `next lint` opens the repository's interactive ESLint setup prompt; no lint policy was added.
- New Preview: `https://ja-landingpage-platform-d4r0hiye9-rigi26s-projects.vercel.app`.
- Fresh HTTP checks on Preview: `/`, `/seluruh-layanan`, `/pricing/`, `/kebijakan-privasi`, and `/syarat-ketentuan` returned 200.
- Fresh external Stock check: `https://stock.webzoka.com/demo` returned 200; Stock remains the only operational demo labelled Live.
- Desktop browser UAT at `1440 × 900`: meaningful render, one `h1`, no horizontal overflow, zero captured console errors/warnings, no missing image `alt`, quiet Hub text, and exactly one `Lihat demo Stock` CTA inside the signature section.
- Mobile browser UAT at `390 × 844`: no horizontal overflow; DOM and visual order Website → Portal → Bundle; menu target 44px; drawer links 48px; FAQ expands with answer visible; sticky CTA is `Chat WhatsApp`, 192×44px, and hidden near the final CTA; skip-link focus works; reduced-motion CSS rule is present; zero captured console errors/warnings; no missing image `alt`.

**Remaining:** No P0/P1/P2 items remain within the approved polish scope. Deferred dependencies remain Hub route approval, attributable proof, renewal/commercial source approval, and route-by-route validation for unsupported demos. The documented left-navigation shell parity is deferred because implementing it would be a structural round outside this polish scope.

**Next review gate:** Chat visual approval of this polish round, plus an explicit decision on whether the existing shell should receive a separate structural left-rail round. No merge or production deployment is authorized by this entry.

## 2026-09-10 — Structural left-navigation shell round

**Status:** Implemented, validated on a new Preview, and ready for Chat visual approval. No merge or production deployment performed.

**Decision:** Replace the V7 public homepage's desktop top-navigation shell with the approved V6-style left-navigation concept while preserving the richer editorial content canvas. Use a persistent 244px rail at desktop, keep Beranda as the active Public default, group navigation into Jelajahi and Pelajari, keep Webzoka Hub pending without a fake URL, and keep WhatsApp consultation visually subordinate in the rail. At mobile sizes, use only a compact brand/menu bar and an accessible drawer.

**Scope completed:** Added the requested sidebar IA: Beranda; Solusi, Webzoka Store, Karya, Harga; Artikel, FAQ, Komitmen Kami; Webzoka Hub with subtle `Segera`; and a quiet consultation action. Existing homepage section order, buyer-facing positioning, Website → Portal → Bundle order, signature section, proof treatment, pricing, FAQ, final CTA, and mobile sticky-CTA behavior were preserved. Because no Artikel route exists, Artikel is visibly unavailable rather than linked to an invented destination. Komitmen Kami uses an honest anchor to the existing trust section.

**Source changes:** `app/page.tsx` and `app/globals.css`. `app/layout.tsx` and `docs/webzoka-v7/visual-blueprint.md` did not require changes. The blueprint already documents the approved left-shell behavior.

**Fresh validation evidence:**

- Local `npx tsc --noEmit`: exit 0.
- Local `npm run build`: exit 0; all static routes prerendered.
- `git diff --check`: exit 0.
- `npm run lint`: unavailable because `next lint` still opens the repository's interactive ESLint setup prompt; no lint configuration was added.
- New Preview: `https://ja-landingpage-platform-7ooyytzdn-rigi26s-projects.vercel.app`.
- Deployment: `dpl_C7tFnJHAVj76zyyKJyZ7jBQAB7Tb`, target Preview, status READY.
- Fresh HTTP checks: `/`, `/seluruh-layanan`, `/pricing/`, `/kebijakan-privasi`, and `/syarat-ketentuan` returned 200.
- Fresh Stock validation: `https://stock.webzoka.com/demo` returned 200.
- Desktop browser UAT at `1440 × 900`: rail width 244px; content starts at 244px; Beranda is active; mobile top bar is hidden; one `h1`; no horizontal overflow; zero missing image `alt`; exactly one `Lihat demo Stock` action inside the signature section; every sidebar anchor has a real target; pending Artikel and Hub are not fake links; zero captured console errors or warnings.
- Mobile browser UAT at `390 × 844`: compact brand/menu bar; 336px drawer; focus moves to its close control; Escape closes the drawer and restores menu focus; navigation closes the drawer by touch; Store navigation reaches `/seluruh-layanan/`; link and button targets measure 44–48px high; no horizontal overflow; Website → Portal → Bundle order is preserved; FAQ expands with its answer visible; reduced-motion CSS is present; zero missing image `alt`; zero captured console errors or warnings.
- Sticky CTA safety: while the final consultation card is visible, the sticky CTA is hidden with no pointer events and zero overlap.

**Remaining:** No P0, P1, or P2 issue remains inside the approved structural-shell scope. Deferred dependencies remain Hub route approval, Artikel implementation, attributable proof, the final renewal/commercial source, unsupported demo repairs, Store/Hub implementation changes, and any unrelated architecture work.

**Next review gate:** Chat decides whether this left-navigation shell is visually approved or needs another shell round. No merge, production deployment, or automatic next round is authorized by this entry.

## 2026-09-10 — Content and visual richness round, resumed and completed

**Status:** Existing implementation recovered intact, committed, validated on a new Preview, and ready for Chat visual approval. No merge or production deployment performed.

**Resume state:** The worktree was on `codex/webzoka-v7-public-homepage` at the approved structural-shell baseline. Only the expected uncommitted changes in `app/page.tsx` and `app/globals.css` were present. The 244px desktop rail, mobile drawer behavior, honest unavailable states, and approved homepage order were intact. No implementation redo was required.

**Code commit:** `69d3c377e29e90b00183d5864d3daf0e8521a0d6` (`polish: enrich Webzoka V7 public homepage`).

**Scope completed:** Strengthened the hero hierarchy and evidence composition; turned the business-pain section into a morning-to-evening editorial story; presented Website → Portal → Bundle as an explicit business progression with outcome flows; reshaped selected work into one featured proof case plus two clearly labelled previews; clarified the four-step process and qualified launch promise; separated starting price, scope factors, and renewal clarity; replaced empty trust placeholders with verifiable commitments; and gave the final consultation section a stronger closing composition.

**Preserved guardrails:** The approved V6-style left-navigation shell, Beranda default, section order, dark signature moment, mobile drawer accessibility, compact sticky WhatsApp behavior, subdued Hub `Segera` treatment, Website → Portal → Bundle order, and honest Live/Preview labels remain unchanged in intent. No Hub URL, testimonial, logo, metric, unsupported demo, or new commercial term was invented. `docs/webzoka-v7/visual-blueprint.md` did not require clarification.

**Fresh validation evidence:**

- Local `npx tsc --noEmit`: exit 0.
- Local `npm run build`: exit 0; 14 static pages generated.
- `git diff --check`: exit 0 before staging and after the code commit.
- `npm run lint`: still opens the repository's interactive ESLint setup prompt. The prompt was cancelled and no lint configuration or file change was created.
- New Preview: `https://ja-landingpage-platform-nzixgv6fi-rigi26s-projects.vercel.app`.
- Deployment: `dpl_3L6RRcy2T3JXte5rTzgPfiBf4hKD`, target Preview, status READY.
- Fresh Preview HTTP checks: `/`, `/seluruh-layanan`, `/pricing/`, `/kebijakan-privasi`, and `/syarat-ketentuan` returned 200.
- Fresh external Stock check: `https://stock.webzoka.com/demo` returned 200.

**Desktop browser UAT at `1440 × 900`:** The browser reported the exact requested viewport. The fixed rail measured 244px and the content canvas began at 244px; the mobile header was hidden, so no top-navigation regression appeared. The hero rendered one 75.6px `h1` with stronger split-line hierarchy and a composed evidence frame. The pain section rendered as a two-column editorial story; the offers appeared in Website → Portal → Bundle progression; selected work used one featured case plus two supporting previews; the four-step process, pricing breakdown, and four-entry trust ledger were visibly distinct and readable. The dark signature section contained exactly one `Lihat demo Stock` action. Hub remained a non-link `Segera` entry. The document had one `h1`, no horizontal overflow, no images missing `alt`, and no captured console errors or warnings.

**Mobile browser UAT at `390 × 844`:** The browser reported the exact requested viewport and no horizontal overflow. The desktop rail was hidden and the compact header was visible. The menu target measured 44×44px; the drawer measured 336px; its close control measured 44×44px; navigation links measured 48px high. Opening the drawer moved focus to its close control, Escape closed it and restored focus to the menu button, navigation closed it and released body scroll lock. Editorial layouts stacked to one column. Website → Portal → Bundle remained both DOM and visual order. The hero primary CTA measured 50px high; FAQ summaries measured 64px and the first answer expanded visibly. The sticky WhatsApp action measured 192×44px when active; while the final consultation section was visible it moved fully off-screen, had no pointer events, and had zero overlap. Keyboard Tab exposed a visible skip link with a blue focus outline. Deployed CSS contained the reduced-motion rule that shortens animation/transition duration and removes reveal transforms. No images were missing `alt`, and no captured console errors or warnings remained.

**Remaining severity:** P0 none. P1 none. P2 none within the approved content-and-visual-richness scope.

**Deferred items:** Hub route approval; Artikel implementation; attributable customer proof, permissions, and measurable outcomes; one approved renewal/commercial source; route-by-route repair and validation for unsupported demos; Store/Hub implementation work; final typography licensing/hosting confirmation; and final WhatsApp operating details. These are factual/product dependencies, not authorization for another visual round.

**Next review gate:** Chat decides whether the enriched homepage is visually approved. Exact decision needed: approve this richness round for the next separately authorized integration step, or identify one concrete visual issue that requires a bounded revision. Do not merge, deploy production, or automatically begin another round from this entry.

## 2026-09-11 — Store V2 Warm Commerce prototype round

**Status:** Implemented and validated on a new Preview; ready for Chat visual approval. No merge or production deployment performed.

**Decision:** Keep Public V7's approved left-navigation shell intact. Introduce Store V2 as a separate, template-first browsing experience, with one scoped entry: **Warm Commerce** for owner-led Indonesian F&B businesses. The Store journey is Template → Preview → consultation for customization, not Service → Package → Buy. The prototype remains visibly `Preview` and is not indexed as a Live Store product.

**Scope completed:** `/store`, `/store/template/warm-commerce`, and `/store/template/warm-commerce/preview`; a Store entry card, detail page, fictional Dapur Rona preview, responsive navigation, catalog filter, WhatsApp consultation hooks, original food visuals, and a small reusable template data/component layer. Public Store links now target `/store`; legacy package configuration remains at `/seluruh-layanan`.

**Evidence / reference:** [Focused Warm Commerce review](warm-commerce-review.md). Code commit `d666f6c`; Preview `https://ja-landingpage-platform-krvlzqqqh-rigi26s-projects.vercel.app`; deployment `dpl_5ALpkhk4n1UhJbbXsPRgYyiN6xg4`, target Preview, status READY. Fresh typecheck, production build, diff check, route checks, desktop 1440 × 900 UAT, and mobile 390 × 844 UAT passed. The repository lint command remains interactive setup only and was left unchanged.

**Remaining:** No P0/P1/P2 item within this approved prototype scope. Full Store implementation, Customize/configurator, payment/checkout, accounts, Portal features, real customer assets, production indexing, and all other templates remain deferred.

**Next review gate:** Chat approves Warm Commerce as the reference standard for a future separately authorized template round, or names one concrete Warm Commerce revision. Do not start another template automatically.
