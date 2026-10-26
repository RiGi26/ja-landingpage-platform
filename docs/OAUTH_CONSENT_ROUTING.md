# Core OAuth consent routing

## Scope and authority — 26 October 2026

The Owner delegated the stability decision in chat
`01a172d2-5154-7da1-86ba-aed6a7002ee6`: “pilihkan keputusan yang paling tepat untuk kestabilan dan bisa live”.
This continues the approved Core/Stock full-flow UAT. The selected repair is an
exact-path redirect in the corporate website. After the implementation and
Preview evidence were presented, the Owner answered “approved” to the explicit
request for commit, push, PR/CI, merge, and Production deployment of the Corp
redirect only. Core/Stock feature activation and the protected Core approval
artifact remain outside this release authority.

Vercel inspection identifies `www.webzoka.com` with project
`prj_BjUvWyOuoXPu3FQ72xvFGhYI0LWp` (`ja-landingpage-platform`), repository
`RiGi26/ja-landingpage-platform`. The working folder is `ja-corp-landing`.
The isolated worktree starts at `origin/master`,
`74afeb7d2c76cab5a03632359b1fb9ab52c7aee6`.

## Problem and behavior

Real native OAuth returned `https://www.webzoka.com/oauth/consent/` with the managed
authorization request identifier. The corporate static export returned 404.
Core already serves the consent UI at
`https://ja-superadmin-platform.vercel.app/oauth/consent`.

`vercel.json` redirects only `/oauth/consent` and `/oauth/consent/` to that fixed
Core endpoint with temporary HTTP 307. Vercel carries the query string, retaining
the same managed authorization request. The destination does not come from any
query parameter. Existing store/legal redirects and response headers remain
unchanged. The redirect contains an opaque authorization request selector, not
a bearer credential or approval receipt. Core performs the authenticated read.

The first Preview demonstrated that Vercel does not apply configured page headers
to configuration redirects: the response has `public, max-age=0, must-revalidate`
and no Referrer-Policy header. Ineffective scoped header entries were removed.
The temporary 307 is immediately stale and requires revalidation; it does not
cache a consent decision or user details. Do not claim no-store on this redirect.

This preserves Core's global Supabase Site URL, Auth email destinations, OAuth
client registrations, keys, and Stock callback allowlist. The corporate site
neither consumes codes nor approves consent. Core still authenticates the user
and uses managed Auth authorization details/approval.

## Release and verification

Production remains unchanged until an approved release. Preview verification must
prove both slash variants, unchanged `authorization_id`, fixed destination under
an injected `next` parameter, revalidation headers, and unchanged legal/store routes.
Browser checks cover the actual redirect into Core login/consent on desktop and
390×844 mobile. This transport check does not establish a new authenticated
Core/Stock flow or release the disabled E1 feature.

Evidence: `C:/Users/61140/AppData/Local/Temp/Codex/h1-g1-production-uat-20261026/scratchpad/`.
Rollback removes the two new redirects.

### Observed verification

Final Preview `dpl_Fe4fGyWUys4VdowALPcZm4DGspVv` is Ready at
`https://ja-landingpage-platform-p5tr7eean-rigi26s-projects.vercel.app`.
HTTP checks pass 4/4: both consent-path variants return 307 with the exact request
identifier and fixed destination, and existing store/legal redirects still
return 308. The browser reaches Core login with the same consent continuation.
Screenshots cover 1280×800 and 390×844; mobile document width is 390px.
These anonymous routing checks use a synthetic selector. They do not claim
authenticated consent or an uninterrupted Production E1 flow. The corporate
Production deployment remains `dpl_2G9U9qyvtWwzkb1UE5awED5maUTP`.
