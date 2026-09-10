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
