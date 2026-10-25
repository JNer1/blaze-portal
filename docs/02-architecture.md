# Initial architecture proposal

Status: Proposed; no architecture decision has been approved. The stack below follows the user's initial technical direction. Compatibility, permissions, and operating limits require validation.

## Expense-letter refinement — 2026-10-22

The user has corrected Salary Request to generate one consolidated request letter addressed to OVRF, with no additional cover letters. It includes per-staff advisory supporting checks and one externally issued LE number. Use the existing single-document generation model for this slice, preserving template/input/officeholder/LE snapshots and recovery state. Multi-letter grouping is deferred until another reviewed workflow requires it.

Office identity is separate from officeholder identity and application role. Salary uses the OVRF request-letter template; retain its sample signature layout as a proposal for review. Other category templates require review. Proposed data additions include per-staff request rows/checklist states and a letter's externally issued LE value. Each distinct letter requires its own LE, even for the same request; numbering scope and same-letter revision/reissue rules remain unresolved. Never generate official LE numbers or substitute internal attempt IDs. Checklist completeness is advisory and separate from technical generation state. Preserve source references and unresolved applicability. These design proposals require review before schema approval; the correction does not authorize a migration. See [Salary Request](08-salary-request.md).

## Components and boundaries

1. **Browser:** React, Vite, TypeScript, Tailwind CSS, and shadcn/ui provide forms, review screens, and document history. Zod supports client feedback; the server independently validates every request. The browser holds no Google refresh token or application secret.
2. **Application boundary:** A Hono API on Cloudflare Workers serves authenticated requests. Proposed deployment serves the built frontend through Workers static assets on the same origin, reducing session and cross-origin complexity. Verify current Free-plan support and limits before choosing configuration.
3. **Structured persistence:** Cloudflare D1 with Drizzle ORM stores project membership, project metadata, registered template versions, document inputs and generation state, sessions, and audit events. It stores Drive identifiers rather than file binaries.
4. **Google identity:** Google OAuth/OpenID Connect establishes identity. The server validates identity tokens and issues its own opaque session cookie backed by server-side session records. Login alone does not grant application access.
5. **Google documents and storage:** Drive creates and stores document copies; Docs replaces validated placeholders in the copy. Master templates and generated outputs live in approved Drive locations. Google permissions are a second access boundary: application authorization cannot prevent access already granted directly in Drive.

Use a modular monolith: one application/API and one database, with clear code boundaries for access, documents, and integrations. No microservices, queue service, or additional paid infrastructure is proposed at this stage.

## Identity and Google authorization

Use an exact redirect URI, OAuth state validation, nonce where applicable, and PKCE where supported. Sessions use Secure, HttpOnly, appropriately configured SameSite cookies, expiry, logout invalidation, and CSRF protection for state-changing operations. Check active membership and project authorization server-side on each protected action.

Keep sign-in authorization distinct from permission to edit Docs or access Drive. Choose the narrowest Google scopes that support the approved workflow. Validate whether `drive.file` plus explicit file selection/app-created files covers the required templates and folders before requesting broader access.

**Account model (user direction, 2026-10-26; details pending U01):** the team uses no Google Workspace. A standalone project Google account, managed by the team, owns templates and outputs. That makes two separate Google connections:

1. **Staff sign-in:** each person uses a personal Google account with only `openid email profile`. The app identifies members by Google's stable account ID (`sub`), not by email alone. An administrator invites a person and assigns the role; signing in without an assigned role gives no access.
2. **Document generation:** an administrator connects the project account once. The server stores its refresh token encrypted, never sends it to the browser, and uses it to copy templates and fill letters. Proposed scope: `drive.file` only, so the app can reach only files it created or was explicitly given. U01 must confirm the Docs API works under that scope and how the template is granted (uploaded through the app or chosen once with Google Picker).

To verify in U01: publishing status and whether Google requires verification for these scopes (apps left in "Testing" can have short-lived refresh tokens), the project account's Drive storage limit, and a reconnection procedure for revoked access or credential changes. Staff remain able to open files shared with them directly in Drive; that sharing sits outside the app's access control.

## Document generation and recovery

1. Authorize the actor/project and validate inputs against the registered template contract. Reject missing or unsupported fields before creating a file.
2. Persist a generation attempt and stable request identifier with the input snapshot and selected template version. Use uniqueness constraints to guard repeated submissions.
3. Copy the registered template into the approved output location. Record the new file identifier and apply replacements to that copy only.
4. Confirm required placeholders are resolved, then record completion and an audit event. Expose the output link after successful completion.
5. On timeout or failure, preserve enough state to reconcile the attempt. Before repeating external creation, check for an existing associated output. Record retry outcomes and support explicit recovery from partial files.

D1 and Google APIs do not share a transaction. A lost response after a successful Drive copy can leave an orphan or duplicate. Validate a recoverable association between attempt and Drive file, retry behavior, and permission to inspect/clean up partial outputs in the feasibility unit. Exactly-once creation is not assumed. Do not share incomplete outputs as successful documents.

Register template versions using an explicit snapshot/copy or another verified version-preservation mechanism. A mutable file ID alone is not a version. The application never edits a master during generation; actual protection also requires appropriate Drive permissions. Identify administrators who can still change or delete files outside the application.

## Data and audit boundaries

Proposed records: user identity, project, project membership, template version/field contract, document request, generation attempt, output reference, session, and audit event. Define the actual schema and retention periods only in approved Construction work.

- All project-owned records carry a project identifier; API authorization derives access from active membership rather than client-supplied role claims.
- Use foreign keys, uniqueness constraints, and D1-supported atomic operations for related local updates. Verify Drizzle/D1 transaction and migration behavior before relying on it.
- Audit events identify actor, project, action, target, time, and relevant change metadata. Write critical local record changes and their audit events atomically where supported; otherwise establish an explicit recovery invariant before implementation.
- Audit history is append-only through normal application routes. Database operators can still alter data; this is not a tamper-proof archive or a digital signature.
- Drive remains the document content store. External edits, sharing changes, or deletion may not appear in the application audit trail. The UI must not claim generated content still matches its original snapshot after untracked edits.
- Future financial records require explicit currency, exact arithmetic, agreed rounding and correction rules, and reconciliation. Avoid floating-point money calculations; no financial schema is approved yet.

## Environments and operations

Use synthetic local/test records and isolated test Google files. Separate development/test and production data, credentials, and output locations. Store secrets using platform secret facilities; if refresh tokens are stored in D1, encrypt them with a separately managed key and plan key rotation/recovery. Do not log tokens or document contents by default.

Version code and migration files; require explicit migration approval, a current backup, validation, and a rollback/forward-recovery plan. Proposed production hosting is Workers Free with D1 Free; capacity and restore requirements may invalidate this choice. See [risks and quality requirements](03-quality-and-risks.md).
