# Prioritized development units

Status: D02/D03 approved 2026-10-26. U02 implemented on branch `u02-foundation`, awaiting user review. Next proposed: local salary request form and preview (part of U07, no Google or persistence), with U01 on the synthetic test account. Other units remain proposals.

Each unit below has a preliminary plan and acceptance criteria. Immediately before execution, present a concrete plan with affected files/components, fixtures, test commands, dependencies, and unresolved questions. Split units further if they cannot be reviewed independently. Acceptance means demonstrated behavior, not merely written code.

## P0 — Inception and feasibility

**U00 — Confirm the pilot workflow (Inception continuation)**

Plan: finish the corrected Salary Request walkthrough: one consolidated request letter addressed to OVRF, no additional cover letters, per-staff nonblocking checklists, one RCNAS-issued LE, reviewed template/enclosures, salary fields/calculations, output destination, and baseline effort. Each distinct letter has its own LE; same-letter revision/reissue rules remain open. See [Salary Request](08-salary-request.md). Use descriptions or synthetic examples; private material needs authorization before use as fixtures.

Acceptance: user approves a worked synthetic input/output example and MVP boundary; unknown institutional rules remain explicitly unresolved. Dependencies: Inception feedback.

**U01 — Validate Google integration and free-plan feasibility (first possible Construction unit)**

Plan: using the approved synthetic-data test Google account (standing in for the project account) plus a separate personal test account for staff sign-in, run a bounded technical experiment for `drive.file` sufficiency, template access, OAuth publishing status, scopes, identity/ownership, template copying/replacement, version preservation, partial-failure recovery, and Workers compatibility. Estimate pilot demand and backup cost against current limits.

Acceptance: one synthetic document generated without master modification; effective access and credential revocation checked; retry risks demonstrated; quota sources dated; ownership, required scopes, runtime feasibility, and blockers documented. No production deployment. Dependencies: U00, approved experiment plan and test-resource authorization.

## P1 — MVP foundation

**U02 — Establish the development foundation**

Plan: scaffold the agreed React/Hono stack, local configuration, validation, and Vitest/Playwright smoke checks; document local operation with synthetic data.

Acceptance: fresh setup instructions work; frontend/API smoke checks pass; secrets are excluded from version control; local/test configuration is isolated. Dependencies: U01 and stack approval.

**U03 — Establish persistence and audit primitives**

Plan: define only the pilot schema, constraints, migration workflow, and atomic audit-write pattern validated for D1.

Acceptance: approved migration applies to a disposable database; invalid relationships and duplicate keys are rejected; critical local changes retain their audit event; recovery procedure is documented. Dependencies: U02 and explicit schema/migration approval.

**U04 — Add Google sign-in and server sessions**

Plan: implement the approved identity flow, session lifecycle, authorized-user admission, and logout.

Acceptance: admitted user signs in; unauthorized identity, invalid callback/state, expired session, and logout reuse are rejected; browser receives no integration refresh token. Dependencies: U03 and approved account/session policy.

**U05 — Enforce project access**

Plan: implement the agreed minimal role matrix and membership checks, using synthetic projects to verify boundaries.

Acceptance: permitted actions succeed; direct API and cross-project access fail; revocation takes effect within the agreed interval; access changes are audited. Dependencies: U04 and role approval.

## P2 — MVP document workflow

**U06 — Register a protected template version**

Plan: store the approved template snapshot/reference and field contract; restrict registration and verify integration access.

Acceptance: staff cannot replace a template; historical generation references remain attributable after a new version is registered; missing/inaccessible templates produce useful errors. Dependencies: U05 and approved template ownership/version approach.

**U06a — Resolve the pilot expense checklist**

Plan: encode the Salary worksheet guidance per selected staff, including the first-payment contract note, with staff-reviewed applicability and optional notes. Generate the salary request letter only; supporting items remain external.

Acceptance: source guidance matches the reviewed synthetic example; per-staff not-reviewed/available/missing/not-applicable states remain visible; missing or inapplicable items never block letter generation; supporting forms are not generated. Dependencies: U06 and approved source interpretation.

**U06b — Configure the salary request letter and LE entry**

Plan: configure one OVRF-addressed salary request letter with reviewed recipient/signature details, enclosures, and one externally issued LE field. Never allocate official LE values. Distinct letters require distinct LE values; do not assume same-letter revision/reissue behavior.

Acceptance: exactly one salary request-letter plan is produced; no extra cover letter is added; LE entry is associated with the letter; historical snapshots survive officeholder changes. Dependencies: U06a and reviewed salary template/LE behavior.

**U07 — Prepare and review a salary request draft**

Plan: build a multi-staff salary draft, per-person periods and exact PHP amounts under agreed rules, one LE entry, and review of one request letter. Supporting checklists remain advisory. Use synthetic examples, not source PDF TINs or compensation.

Acceptance: valid synthetic input round-trips; invalid data is rejected server-side; another project cannot read or edit the draft; review reflects all selected staff, differing coverage, LE values, reviewed amounts, and correct signature blocks; unsupported calculations are flagged without invented payroll rules. Dependencies: U06b and approved field contracts.

**U08 — Generate and reconcile a Google document**

Plan: implement persistent generation attempts, copy-and-replace, output validation, request deduplication, failure states, and recovery.

Acceptance: exactly one synthetic salary request letter is produced with its entered LE; no additional cover letter is produced; master unchanged; unresolved required letter fields prevent success, while supporting-checklist omissions never block generation; repeated requests, revoked permission, quota errors, and lost responses produce accountable states with recovery that avoids silent duplication. Dependencies: U07 and U01 recovery evidence.

**U09 — Expose document history and provenance**

Plan: show attempt state, output link, actor, timestamps, template version, and permitted history.

Acceptance: authorized users can trace a successful output and distinguish failures; external edit/deletion limitations are visible where relevant; unauthorized history access fails. Dependencies: U08.

## P3 — Pilot operations readiness

**U10 — Prove backup and restore**

Plan: implement the approved backup mechanism and restore synthetic database/templates/outputs in isolation; verify storage and account-loss assumptions.

Acceptance: restore evidence meets approved RPO/RTO, references and access are checked, backup failures are detectable, and a named maintainer can follow the runbook. Dependencies: U09 and approved backup destination/retention.

**U11 — Review pilot release readiness**

Plan: test the complete critical workflow and access failures; review quotas, privacy decisions, operating instructions, manual fallback, and rollback.

Acceptance: relevant Vitest/Playwright and integration checks pass; pilot user accepts the worked workflow; remaining risks are recorded; operator and accounts are assigned. Production deployment remains a separate explicit approval. Dependencies: U10 and resolution of production blockers.

## Deferred discovery units

**U12 — Confirm endorsement completion/status workflow:** the lower-level endorsement rule is confirmed for MVP letter preparation. Discover any later in-app recording of actual endorsements, actors, evidence, and transitions; acceptance is an approved workflow and role matrix with synthetic examples. Generation alone must not record approval or signature.

**U13 — Define financial tracking:** identify authoritative sources, calculations, reconciliation, permissions, and corrections; acceptance is finance-owner-approved synthetic examples and a separately prioritized implementation backlog.

**U14 — Define inventory and procurement:** document actual custody/procurement workflows; acceptance is stakeholder-approved field definitions and independently testable units.

**U15 — Define reporting and wider rollout:** agree report definitions, source lineage, exports, and multi-project needs; acceptance is approved report examples and updated capacity/access estimates.

Deferred units require new scope review. Their numbering is a provisional order, not a commitment to implement every module.
