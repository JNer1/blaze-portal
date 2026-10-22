# Research Administration Management System — Inception

Status: Draft for user review. Created: 2026-10-20. Updated: 2026-10-22.

This is the first, documentation-only Inception deliverable. No application implementation, infrastructure provisioning, migration, or deployment is authorized by these documents.

Read in this order:

1. [Vision, scope, and stakeholders](01-project-brief.md)
2. [Proposed architecture](02-architecture.md)
3. [Risks and non-functional requirements](03-quality-and-risks.md)
4. [Prioritized development units](04-backlog.md)
5. [Decisions and clarification questions](05-review-decisions.md)
6. [Expense-letter workflow refinement](06-expense-letter-workflow.md) — latest user requirements
7. [Expense checklist source transcription](07-expense-checklist-source.md) — all 18 supplied categories
8. [Salary Request specification](08-salary-request.md) — current first slice, confirmed finance route, advisory checks, and LE numbers

## Requirement status

- **Confirmed:** explicitly supplied in the initialization brief or subsequent user clarification.
- **Proposed:** recommended for review; not an approved requirement or architecture decision.
- **Unknown:** needs evidence or user clarification. Silence does not approve a proposal.

The brief confirms the problem, intended context, quality priorities, lifecycle, and initial technical direction. The latest Salary Request correction confirms one consolidated request letter addressed to OVRF, with no additional RCNAS/OVRF cover letters, and advisory per-staff checklist checks. Every individual letter has its own RCNAS-issued LE number, so Salary Request needs one. Template/field details, numbering on revision/reissue, user permissions, and other policies remain unresolved. This supersedes the earlier two-letter interpretation; other expense workflows still require their own review.

## AI-DLC checkpoints

1. **Inception:** review this package; resolve the blocking questions in the decision register; record approved scope and constraints. Approval may cover a bounded feasibility unit while leaving other decisions open.
2. **Construction:** before each unit, present its implementation plan, acceptance criteria, dependencies, and applicable unresolved questions. Record user approval before starting the first Construction unit. Obtain explicit approval for major architectural changes and migrations. Use synthetic fixtures unless use of specific private material is authorized.
3. **Unit review:** run relevant checks; record results, limitations, changed specifications, and remaining work. A unit is complete only when its acceptance criteria are met or its scope has explicitly been revised.
4. **Operations readiness:** approve access controls, backup and restore evidence, operational ownership, capacity limits, and rollback procedure. Obtain explicit approval before production deployment.
5. **Operations:** review access, quotas, errors, backups, dependencies, and incidents on the agreed schedule. Feed issues into the backlog.

Maintain approved decisions in [the decision register](05-review-decisions.md). Add a numbered architecture decision record when a significant decision is approved, including context, alternatives, decision, consequences, date, and approver. Keep proposals visibly separate from accepted decisions. Update the backlog and specifications alongside implemented behavior.

Current checkpoint: **Awaiting Inception review. Construction has not begun.**
