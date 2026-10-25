# Vision, scope, and stakeholders

Status: Draft. Scope and roles below are proposals unless marked confirmed.

## Vision and problem

**Confirmed:** Build an internal system for administrative operations of university-based, DOST-funded research projects in the Philippines. Reduce repeated preparation and manual transcription while improving accuracy, traceability, and maintainability.

Current Google Docs and Sheets workflows expose master templates to accidental changes, introduce copy-and-edit errors, fragment financial and inventory records, consume staff time, and obscure document history and approval status.

**Confirmed MVP direction (2026-10-22):** Prepare expense-related letters and the cover letters needed for signatures, using the expense-category checklists and endorsements from all applicable lower university levels. See [the workflow refinement](06-expense-letter-workflow.md).

**Confirmed first slice:** One Salary Request letter addressed to OVRF, consolidated across selected staff, without additional RCNAS or OVRF cover letters. All workbook expense categories route to OVRF. Supporting checklists are advisory and per staff; salary generates only the request letter. Each individual letter has its own RCNAS-issued LE number, so this slice needs one. See [the Salary Request specification](08-salary-request.md).

**Proposed first outcome:** Staff review a consolidated salary request and per-person supporting-document status, enter one RCNAS-issued LE number, and generate the traceable request letter. Human endorsement/signature collection remains external.

Success measures to baseline during workflow discovery: preparation time per document, corrections needed before submission, accidental template changes, and proportion of generated documents with complete provenance. Numerical improvement targets remain unknown.

## Preliminary scope

### MVP — proposed smallest useful release

- One pilot research project (proposed) and the confirmed Salary Request slice: one request letter covering all selected staff, with individualized salary rows and advisory checklists.
- Source-backed, nonblocking per-staff checklist guidance and OVRF as the salary addressee. Generate the request letter only; supporting documents are attached outside the application.
- A separate RCNAS-issued LE tracking number at the top of each individual letter; Salary Request uses one. Revision/reissue rules remain open.
- Google sign-in, an explicit authorized-user list, and server-enforced project access.
- Minimal reusable project information, with exact fields confirmed from the pilot workflow.
- Registered template versions for the salary request letter with defined placeholder/input contracts. Generate a copy; never write to the master template during generation.
- Validate required inputs and show a review step before generation.
- Save generated files in an approved Google Drive location with restricted access.
- Track generation attempts, output links, template version, input snapshot, actor, and timestamps, subject to an approved retention policy.
- Track preparation states: draft, generating, generated, or failed. These are technical preparation states, not institutional approval states.
- View document history and explicitly retry recoverable failures without silently creating duplicates.
- Minimal audit trail, backup and restore procedure, and operating instructions necessary to support this workflow.

### Later releases — proposed, order subject to discovery

- Additional expense scenarios/document types beyond the agreed first slice, controlled template replacement, and reusable personnel/contact information. Broad MVP category coverage remains to be agreed.
- Confirmed review and approval status tracking, including actor authority and correction rules. Recording a status must not imply legal approval or a signature.
- Financial tracking with agreed accounting boundaries, monetary rules, supporting records, reconciliation, and correction history.
- Inventory and custody tracking with agreed item identification, transfers, and reconciliation.
- Procurement tracking based on the institution's actual process.
- Project reports built from agreed source records and validated reporting definitions.
- Multiple projects, more granular permissions, and reviewed import/export tools.

### Out of scope for the initial product — proposed

- Acting as the university's authoritative accounting, payroll, banking, or procurement platform.
- Moving funds, submitting official reports automatically, or signing documents electronically.
- Determining DOST or university policy, certifying compliance, or inventing approval chains.
- Public access, external vendor portals, research participant data, and scientific data management.
- AI-generated official content or autonomous administrative approvals. AI-DLC describes the development process; runtime AI is not a confirmed requirement.

These boundaries can be revisited through an explicit scope decision.

## Stakeholders and proposed roles

Stakeholders to identify: project lead/principal investigator, research and administrative staff, finance/accounting representatives, procurement personnel, inventory/property custodians, university IT/security or privacy contacts, and the future system maintainer. DOST reporting recipients and university approving officers are workflow stakeholders; application accounts for them are not assumed.

Proposed application roles:

- **Project administrator:** manage authorized membership and approved project settings/template registration within assigned projects. This role grants no institutional signing authority.
- **Project staff:** prepare documents and view permitted project records.
- **Project viewer:** read permitted records without editing, if a separate read-only role is needed.

One person may hold several responsibilities. Reviewer, finance, procurement, and custodian application roles should be added only after their permissions are understood. Technical operators do not automatically receive business approval authority. The role matrix, who appoints administrators, and membership removal process remain unknown.

## Working assumptions to validate

- A single pilot project can demonstrate value before broader rollout.
- Salary Request and its single request-letter output are confirmed; template details, LE revision/reissue behavior, and salary field/calculation rules still need review.
- Confirmed 2026-10-26: staff sign in with personal Google accounts; a team-managed project Google account (outside the university subscription) owns templates and generated letters. No institutional Google administrator approval is needed for this model; whether the institution has policies on where such records may be stored remains open (D07).
- The initial template uses manageable placeholders; complex tables, signatures, and attachments may change feasibility.
- Users remain connected to the internet, and manual Google Docs editing after generation is acceptable. Whether edited outputs need to be synchronized or frozen is unresolved.
