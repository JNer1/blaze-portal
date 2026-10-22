# Risks, non-functional requirements, and operations

Status: Proposed targets and controls. Institutional policy, capacity, retention, and recovery requirements remain unconfirmed.

## Major risks and unknowns

- **Salary letter completeness:** one consolidated OVRF request letter is confirmed; no additional RCNAS/OVRF cover letters are needed. Distinguish failed letter generation from missing supporting documents: per-staff checklist guidance must never block generation or falsely certify compliance. Template details and salary field rules remain unresolved.
- **Salary data and arithmetic:** the example contains TINs and compensation. Review identifier necessity, protect access, and use synthetic fixtures. Exact monetary arithmetic is needed for salary-letter rows even though ledger/payroll modules remain deferred. Do not infer prorating, deductions, or benefits rules.
- **Official tracking:** each individual letter needs its own RCNAS-issued LE value, including different letters for the same request. Salary uses one. Preserve the value and revision history; confirm numbering scope and same-letter revision/reissue rules rather than deriving them from sample headers.
- **Reference currency:** the supplied workbook has conditional clauses, thresholds, overlapping entries, and some filled fields. Review source applicability before encoding rules; do not use those filled fields as fixtures. Officeholders in the screenshot need confirmation and versioned history before letter generation.

- **Google ownership and continuity:** personal account departure, revoked consent, storage limits, or inaccessible templates can stop generation. Confirm the account model and test transfer/recovery before production.
- **OAuth deployment restrictions:** Google Workspace policies, app audience, consent verification, testing-mode restrictions, and selected scopes may prevent durable use. Verify current requirements against the intended accounts; a successful developer login is insufficient evidence.
- **Free-tier capacity:** Workers requests/CPU, D1 storage/reads/writes, Google API quotas, and Drive storage constrain usage. Exceeding free allowances can block work; scaling at zero cost is not guaranteed. Collect expected users, peak generations, document sizes, and retention, then compare them with current provider documentation.
- **Non-atomic generation:** failure between Drive and D1 updates can leave partial files or duplicate outputs. Prove retry/reconciliation behavior with synthetic failure cases before accepting the workflow.
- **Template fidelity and mutation:** complex formatting, repeated placeholders, headers/footers, tables, or external edits may break output. Test the selected document type and preserve the approved template version.
- **Confidentiality and institutional acceptance:** approved cloud locations, data categories, sharing settings, retention, and cross-border processing are unknown. Ask the responsible institutional contact; this proposal does not assert policy or legal compliance.
- **Incomplete audit coverage:** edits and sharing outside the application bypass its event history. Agree whether provenance alone is sufficient or whether output snapshots/additional controls are needed.
- **Financial ambiguity:** balances, obligations, disbursements, categories, rounding, and correction authority are unspecified. Defer financial implementation until the responsible staff approve worked synthetic examples and reconciliation rules.
- **Recovery and maintenance:** provider restore features may be time-limited, and a free deployment has no assumed availability guarantee. Name an operator and prove database plus Drive recovery before production.

## Proposed non-functional requirements

### Security and access

- Deny unauthenticated, inactive, and unauthorized users by default. Verify project access on every read/write and test direct API calls and cross-project attempts.
- Separate role assignment from ordinary editing; record access changes. Confirm who can grant/revoke membership and how quickly revocation must take effect.
- Protect server-side sessions, OAuth flows, secrets, and state changes as specified in the architecture. Redact sensitive logs and return errors without credentials or private document contents.
- Restrict Drive sharing; never make outputs public by default. Check effective access as part of production readiness.
- Use synthetic fixtures. Real university records, private documents, or credentials require specific authorization before use as fixtures.

### Data integrity and financial correctness

- Validate inputs server-side, enforce referential/uniqueness constraints, and reject invalid state transitions. Preserve the source input and template version used for each successful generation under the approved retention policy.
- Every successful generation has an attributable output and audit history; failed attempts remain distinguishable from completed documents.
- Repeated submissions and retries must not silently produce conflicting records. Test interruptions at external API boundaries and provide a recovery route for unresolved attempts.
- Use unambiguous stored timestamps, displayed in the agreed local timezone (proposed Asia/Manila). Treat calendar dates separately from instants where needed.
- Before financial work: agree currency and precision, use exact arithmetic, reconcile totals against approved examples, and preserve correction history rather than silently overwriting posted values. Institutional posting rules remain unknown.

### Backups and recovery

- Proposed initial targets: at most 24 hours of lost structured data (RPO) and restoration within one working day after an operator begins recovery (RTO). User approval and a feasible no-cost mechanism are required; these are not guarantees.
- Plan a daily logical D1 backup to an approved restricted destination, with alerts or an operator check for failures. Validate provider-native restore capabilities as an additional option; they do not substitute for a tested recovery procedure.
- Back up the approved template versions and account for generated files, Drive identifiers, and permissions. D1 exports do not contain Docs content, and Drive trash/version history alone is not an independent backup.
- Agree backup retention, encryption, access, storage quota, and deletion handling. Keep backup access independent enough to survive the identified account-loss scenario.
- Before production, restore synthetic database and document data into isolation and verify links, permissions, provenance, and consistency. Repeat after recovery-affecting changes and on an agreed schedule, proposed quarterly.

### Performance, usability, and reliability

- Proposed target: ordinary application interactions complete within two seconds under agreed pilot load, excluding Google generation. Establish a reproducible measurement and realistic dataset before treating this as an acceptance threshold.
- Generation must show pending/success/failure clearly, prevent accidental resubmission, and offer an explicit recovery path after timeouts. Set a generation latency target after feasibility measurements.
- Support current Chrome and Edge on the pilot team's devices initially; confirm mobile needs. Forms should support keyboard operation, visible labels/focus, and understandable validation errors.
- No uptime SLA is proposed. Document a manual fallback using existing approved workflows when Google or Cloudflare is unavailable; avoid unsynchronized parallel edits during recovery.

### Maintenance and observability

- Name a business owner and technical maintainer before production. Document account ownership, access revocation, secret rotation, incident handling, and recovery steps.
- Capture request/attempt identifiers, error categories, generation outcomes, and quota usage without unnecessary sensitive payloads. Review integration failures and quotas at least weekly during the pilot; confirm an ongoing schedule.
- Review dependencies and security advisories monthly and respond promptly to material vulnerabilities. Keep lockfiles and operating documentation current.
- Use Vitest for relevant validation, authorization, state/retry behavior, and future monetary rules; use Playwright for the critical user workflow. Integration tests must use isolated synthetic Google resources.
- Each production release requires relevant passing checks, documented known limitations, migration approval when applicable, and production deployment approval.

## Zero-additional-hosting-cost boundary

The target covers incremental application hosting, not developer time, existing internet/Google Workspace subscriptions, extra Drive capacity, domain purchases, or paid backup/monitoring products. Confirm this interpretation with the user.

No current numerical quotas or prices were verified during this documentation-only Inception pass. Before Construction relies on a limit, record the source, retrieval date, applicable account/plan, measured demand, and safety margin. Check [Workers limits](https://developers.cloudflare.com/workers/platform/limits/), [D1 limits](https://developers.cloudflare.com/d1/platform/limits/), [Docs usage limits](https://developers.google.com/workspace/docs/api/limits), and [Drive usage limits](https://developers.google.com/workspace/drive/api/guides/limits).

Keep paid upgrades disabled unless explicitly approved. If capacity is insufficient, present bounded usage, smaller scope, or an approved architecture/budget change. Do not silently add paid services. Backup automation, storage, test environments, and logs must fit the same evaluated budget.
