# Review decisions and clarification register

Updated: 2026-10-22, incorporating the latest correction. Salary Request generates one consolidated request letter addressed to OVRF, without additional RCNAS/OVRF cover letters. Per-staff checklists are advisory. Each individual letter has its own RCNAS-issued LE number, so salary needs one. All workbook expense categories route to OVRF. Google account model answered 2026-10-26 (D05, part of D04). Other decisions remain pending; no Construction or architecture approval is inferred.

## Decisions requested for the next checkpoint

**D01 — MVP boundary.** User confirmed Salary Request as the first slice: one consolidated multi-staff request letter, no additional cover letters, advisory supporting checks, and one official LE number. Broader category release coverage remains pending. Access control, provenance, recovery, and operating safeguards remain proposed minimum support. Keep financial, inventory, procurement, and reporting implementation in later releases. Construction still requires the requested review checkpoint.

**D02 — Technical direction.** Recommendation: retain the proposed stack, using one Hono Worker, D1, and same-origin frontend assets, subject to U01 feasibility. Approving an experiment does not approve a production architecture. Major subsequent changes require explicit approval.

**D03 — Lifecycle and next unit.** Recommendation: continue Inception with U00, then review a bounded U01 experiment plan before implementation. Confirm whether the package is accepted as a draft baseline or requires revision. No full-backlog approval is requested.

## Clarifications needed before the first Construction plan

1. ~~Which salary fields/calculation rules are required?~~ Answered 2026-10-26 (whole months, app calculates totals, TIN shown and stored on profiles). Still open: do revisions/reissues of the same letter retain its LE? One LE per distinct letter is confirmed, and an RCNAS cover-letter template is no longer needed. See [the remaining salary questions](08-salary-request.md).
2. Is the pilot for one project? Approximately how many users and documents per week, including peak days?
3. ~~Do staff use personal Google accounts, university Google Workspace accounts, or both?~~ Answered 2026-10-26: no Google Workspace. The team manages its own standalone project Google account, which holds the shared files. Staff sign in with personal Google accounts. See D05.
4. Who will own the product decisions and who can maintain the application and Google/Cloudflare accounts?

These answers refine scope and feasibility without requiring institutional financial or approval rules to be invented.

## Decisions to resolve before affected units

**D04 — Roles and access (before U04–U05).** Partly answered 2026-10-26: staff sign in with their personal Google accounts, and an administrator assigns each person's role. Login alone grants no access. Administrators answered 2026-10-26:

- **First administrator:** Javier Neri, signing in with a personal Google account. This account is set up as the starting administrator through deployment configuration, not hard-coded or self-registered.
- **Second administrator:** the project Google account. Because several people can use it, its actions are logged as "project account" rather than as an individual. Proposed use: backup/recovery administrator when no individual administrator is available, not day-to-day work.
- **Standby administrator:** the most senior staff member, appointed by an existing administrator when needed.
- Proposed: only an existing administrator can appoint or remove administrators, and the app never allows removal of the last remaining administrator.

- **Record keeping:** the administrative aide primarily maintains staff records (including TIN). Paid staff do not need app accounts.

Still open: initial staff members, the aide's role and permitted actions per role, and removal/expiry expectations. Proposed roles are administrator, staff, and optional viewer.

**D05 — Google ownership and authorization (before integration implementation).** Direction answered 2026-10-26:

- The team's standalone **project Google account** (not under the university subscription, managed by the team) owns master templates and generated letters. The app generates documents as that account. Staff mainly work with files in that account.
- **Staff sign in with personal Google accounts** for identity only. The app requests no Drive/Docs access from staff accounts.
- A **separate test Google account with synthetic data only** is approved for U01 and early development.

Still to settle from U01 evidence: exact scopes (proposed `drive.file` only), how the app gains access to the template, OAuth publishing status, encrypted token storage and reconnection, Drive folder and sharing rules, and who holds the project account's credentials and recovery options. Broad scopes are not pre-approved.

**D06 — Document semantics (before U06–U08).** Approve the field contract, template version strategy, duplicate/retry behavior, and whether staff may edit generated outputs. Decide whether external edits need tracking or whether original generation provenance is sufficient. Institutional approval statuses remain deferred unless explicitly defined.

**D07 — Data and retention (before persistent private data).** Confirm allowed data categories and cloud locations with the responsible institution contact; choose retention for inputs, documents, audits, sessions, logs, and backups. Determine who may delete or correct records. No retention duration or compliance claim is assumed.

**D08 — Backup and operating targets (before U10).** Approve or revise proposed 24-hour RPO and one-working-day RTO, backup destination/retention, operator ownership, and recovery-test schedule. Confirm feasibility within the cost target.

**D09 — Cost interpretation (before infrastructure choices).** Confirm zero incremental hosting cost, existing Google resources, expected demand, and handling when free limits are reached. Recommendation: bounded pilot usage and explicit approval for any paid upgrade.

**D10 — Schema and migrations (before U03 and each subsequent migration).** Review concrete schema, integrity constraints, migration effects, backup, and recovery plan. Inception review does not authorize migrations.

**D11 — Production readiness (after U11).** Approve actual production deployment only after tests, capacity evidence, access/sharing review, backup restoration, operating ownership, and known limitations are presented. No production deployment is currently authorized.

**D12 — Financial and institutional rules (before deferred modules).** Obtain actual definitions, responsible stakeholders, approval authority, and accepted synthetic examples. The user supplied the general endorsement rule, organization screenshot, and expense workbook. OVRF is the confirmed expense destination; the latest salary exception requires only its request letter, with no additional cover letters. Checklists are advisory, not generation gates. Each distinct letter has its own LE. Same-letter revision/reissue rules, non-finance routing, other-category templates, and source-policy applicability remain unresolved. No additional accounting, procurement, approval, or retention rule is assumed.

## Approval record

For each reviewed decision, append its identifier, outcome (approved/revised/deferred/rejected), exact scope, conditions, approver, and date. Link any resulting architecture decision record and affected specification/backlog units. Unresolved decisions stay pending and block only the work that depends on them.

2026-10-22 requirement update: the latest user correction supersedes the earlier two-cover-letter salary interpretation. Salary generates one consolidated request letter only, with advisory per-staff checks and one RCNAS-issued LE. Every distinct letter, even for the same request, has its own LE. Template/calculation details and same-letter revision/reissue behavior remain pending. This records business requirements, not approval to start Construction.

2026-10-26 — D02: approved by the user. Keep the proposed stack (React/Vite/TypeScript, Hono on one Cloudflare Worker, D1 with Drizzle, same-origin assets), subject to U01 feasibility. Does not approve production deployment or migrations.

2026-10-26 — D03: approved by the user. Start Construction with U02 (development foundation) plus a local salary request form, calculations, and letter preview that need no Google access; run U01 on the synthetic test account in parallel. Each unit still gets a plan and acceptance review before implementation.

2026-10-26 — Salary calculations confirmed: whole-month payments, multi-month and advance requests allowed, app calculates per-staff and grand totals, TIN shown and stored on user profiles. See [Salary Request](08-salary-request.md).

2026-10-26 — Salary follow-up: no grand total (per-staff totals only). Not all paid staff sign in; the administrative aide keeps staff records, so staff records are separate from user accounts.

2026-10-26 — D05: direction approved by the user (project Google account owns templates and outputs; staff use personal Google accounts for sign-in; test account with synthetic data approved for early development). Scopes, token handling, and sharing rules remain subject to U01 evidence. D04: partly answered (personal-account sign-in; administrator assigns roles; Javier Neri is first administrator, project account is second, senior staff member is standby). See [architecture](02-architecture.md#identity-and-google-authorization).

Current outcome: Inception artifacts refined; user review requested; Construction paused at the requested checkpoint.
