# Review decisions and clarification register

Updated: 2026-10-22, incorporating the latest correction. Salary Request generates one consolidated request letter addressed to OVRF, without additional RCNAS/OVRF cover letters. Per-staff checklists are advisory. Each individual letter has its own RCNAS-issued LE number, so salary needs one. All workbook expense categories route to OVRF. Other decisions remain pending; no Construction or architecture approval is inferred.

## Decisions requested for the next checkpoint

**D01 — MVP boundary.** User confirmed Salary Request as the first slice: one consolidated multi-staff request letter, no additional cover letters, advisory supporting checks, and one official LE number. Broader category release coverage remains pending. Access control, provenance, recovery, and operating safeguards remain proposed minimum support. Keep financial, inventory, procurement, and reporting implementation in later releases. Construction still requires the requested review checkpoint.

**D02 — Technical direction.** Recommendation: retain the proposed stack, using one Hono Worker, D1, and same-origin frontend assets, subject to U01 feasibility. Approving an experiment does not approve a production architecture. Major subsequent changes require explicit approval.

**D03 — Lifecycle and next unit.** Recommendation: continue Inception with U00, then review a bounded U01 experiment plan before implementation. Confirm whether the package is accepted as a draft baseline or requires revision. No full-backlog approval is requested.

## Clarifications needed before the first Construction plan

1. Which salary fields/calculation rules are required, and do revisions/reissues of the same letter retain its LE? One LE per distinct letter is confirmed, and an RCNAS cover-letter template is no longer needed. See [the remaining salary questions](08-salary-request.md).
2. Is the pilot for one project? Approximately how many users and documents per week, including peak days?
3. Do staff use personal Google accounts, university Google Workspace accounts, or both? Is a Shared Drive or institution-managed account available, and who can authorize integration/test resources?
4. Who will own the product decisions and who can maintain the application and Google/Cloudflare accounts?

These answers refine scope and feasibility without requiring institutional financial or approval rules to be invented.

## Decisions to resolve before affected units

**D04 — Roles and access (before U04–U05).** Confirm initial members, who appoints administrators, permitted actions, identity restrictions, and removal/expiry expectations. Proposed roles are administrator, staff, and optional viewer.

**D05 — Google ownership and authorization (before integration implementation).** Choose the credential owner, template/output locations, sharing rules, required scopes, consent approach, and account-departure handling based on U01 evidence. Broad scopes or domain-wide delegation are not pre-approved.

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

Current outcome: Inception artifacts refined; user review requested; Construction paused at the requested checkpoint.
