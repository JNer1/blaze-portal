# Salary request — first MVP slice

Status: Inception refinement, 2026-10-22. User-confirmed business requirements are distinguished from proposed behavior. Construction remains unapproved.

## Confirmed scope and routing

- Salary Request is the first expense scenario.
- All expense/finance categories in the supplied workbook route up to the Office of the Vice-Rector for Finance (OVRF).
- Salary requires one consolidated request letter addressed to OVRF, following the supplied salary example. No additional cover letter to RCNAS or OVRF is required. This supersedes the earlier two-cover-letter interpretation.
- OVRRI and the Rector are not additional steps in this confirmed finance route. The organization diagram alone must not override the user's explicit routing clarification.
- One request letter covers all selected research staff, with supporting documents attached separately. Staff count does not multiply the number of letters.
- The salary MVP generates the request letter only. It does not generate supporting forms or documents.
- The application helps staff check completeness, but checklist items are advisory. Missing, unchecked, or inapplicable supporting items must not block preparing the letters.
- Every letter contains an LE tracking number at the top, obtained from RCNAS. The application does not allocate or infer official LE numbers.
- Each individual letter has its own LE number, even when several letters concern the same request or different offices. Salary therefore requires one LE number for its single request letter. RCNAS issues the number; this does not require an RCNAS cover letter.

The all-category OVRF destination is confirmed. Exact templates/signature details for other expense categories remain outside this salary slice and need review when introduced.

## Source references and observations

- [Salary worksheet transcription](07-expense-checklist-source.md#salary) from the supplied checklist workbook.
- [Sample request PDF](../sample-data/BEATS-BlAzE-Y2-Salary-Request%20%28May%202025%20-%20Feb%202026%29.docx.pdf), supplied for requirements discovery. Read-only text extraction was used; no private source values were copied into fixtures.

The PDF includes distinct salary, gratuity/hazard-pay, and honorarium letters addressed to OVRF. Only the salary structure informs the initial slice. It does not provide an RCNAS-addressed example. It shows a tracking header, date, recipient and office, salutation, request narrative, enclosure reference, a multi-person table, funding/charge reference, closing, and Dr. Papa/Dr. Tongol signature blocks.

The salary table contains name, designation, TIN, monthly amount, duration/coverage, and total amount. Coverage can differ between staff within the same request. The sample mentions the approved Line-Item Budget as an enclosure even though that item is not one of the four Salary worksheet rows. Treat enclosure text and checklist guidance as separate concepts; confirm what is actually enclosed before asserting it in a letter.

Some sample LE headers appear incomplete; do not treat them as valid issued identifiers or infer a numbering scheme. Names, TINs, salaries, dates, and project references in the example are source material, not defaults, fixtures, or proof of current settings. No authorization to reuse the PDF as an automated test fixture is inferred.

## Advisory salary checklist

The workbook lists:

1. Disbursement Voucher (D13).
2. Approved Contract of Services, for first payment (D14).
3. Approved Daily Time Record (D15).
4. Accomplishment Report/Certificate of Services Rendered, duly approved by the Project Leader (D16).

User clarification: requirements relate individually to research staff even though the request is consolidated. Proposed interface: one checklist per included staff member with states **not reviewed**, **available**, **missing**, or **not applicable**, plus optional notes. Do not automatically mark a document available or approved. The first-payment condition can be displayed as guidance; do not require staff to prove applicability to generate letters.

Proposed summary: show counts by status and identify each person's unreviewed/missing items. Say “marked available by staff,” not “verified complete” or “compliant.” A staff-marked not-applicable item does not establish an institutional waiver. No mandatory upload, signature verification, or document-content inspection is proposed for MVP; confirm if links/notes are sufficient.

Missing supporting items are different from an incomplete generation attempt: the salary request letter may be generated while supporting documents remain missing. Such a request should show **letter generated** and its separate checklist summary; it must not be labeled fully approved or ready for submission solely because generation succeeded.

## Proposed inputs and review

- Shared request: project/display name, funding/charge reference, request date, purpose/wording, actual enclosures, selected staff, and officeholder/template versions.
- Per staff: name, designation, required identifier fields, coverage dates or month/year range, monthly PHP amount, payable duration, requested total, and advisory checklist states/notes.
- Per letter: destination, LE number as issued, reviewed recipient/title, body/template, and prescribed signature blocks.

Confirm whether TIN is required and how it should be displayed; minimize collection and exclude it from routine logs. A staff directory is optional future convenience, not a dependency for preparing the first letter. Supporting-file uploads are not required by the confirmed scope.

For whole-month amounts, propose exact decimal/integer-centavo arithmetic with displayed per-staff calculations. Review entered totals against monthly amount times explicit payable months, and avoid binary floating-point calculations. Do not derive months by blindly subtracting dates. Partial-month treatment, rounding, deductions, and corrections are unresolved: flag unsupported calculations rather than inventing payroll rules. This is salary-request preparation, not payroll processing or an accounting ledger. No gratuity, hazard-pay, or honorarium calculations are included in this slice.

Review the request letter, including all staff rows, individualized periods, amounts, actual enclosure statements, names/titles, LE placement, and signature blocks. Retain the sample's Dr. Papa and Dr. Tongol blocks as the proposed request-letter layout, subject to template review; the correction changes the number/type of letters, not an explicitly supplied replacement signature layout. Changes to request data must identify previously generated output as based on an earlier revision; regenerated documents preserve prior provenance.

## LE handling — one issued number per individual letter

- Staff enter the RCNAS-issued value; preserve the exact value rather than assuming a fixed pattern or auto-incrementing a previous example.
- Permit saving an internal draft while awaiting LE assignment; distinguish that from a finished letter.
- Proposed finalization rule: require an entered LE value before generating the finished letter. Whether a clearly marked preview without one is useful remains to be confirmed. Advisory supporting-document checks never become finalization gates.
- Keep LE separate from internal request IDs and technical generation-attempt IDs. Record LE changes with document revisions.
- Confirmed: distinct individual letters must have distinct LE numbers, including letters for the same request. Proposed validation prevents assigning an already-recorded LE to another letter within the application's records; confirm institutional numbering scope before defining a database uniqueness constraint. Whether revisions/reissues of the same letter retain its LE remains unresolved. Technical retries must not allocate a new LE automatically.

## Acceptance criteria proposed for the first slice

1. A synthetic request with at least two staff produces exactly one salary request letter addressed to OVRF, containing all selected staff and reviewed request data.
2. The letter follows the reviewed salary template and signature blocks. The app adds no electronic signature or claim of obtained endorsement.
3. No additional RCNAS, OVRF, OVRRI, or Rector cover letter is produced. Staff count does not multiply the number of letters.
4. Different staff coverage/duration and exact PHP amounts are rendered correctly under the agreed calculation rules. Unsupported prorating is visibly unresolved.
5. Unreviewed, missing, and not-applicable checklist items remain visible per staff and do not prevent generation. No supporting document is fabricated or required to be uploaded.
6. The finalized request letter shows its single entered, RCNAS-issued LE value at the top. Saving an incomplete draft does not allocate a number. Distinct letters must not share an LE number, even within the same request.
7. Enclosure wording reflects user-reviewed enclosures; an unchecked checklist does not silently produce a false statement that all requirements are attached.
8. The output retains template/input/officeholder/LE snapshots. Failed or uncertain generation remains distinguishable from success, and recovery does not silently create a duplicate letter or assign a new LE.
9. Tests use synthetic people, identifiers, amounts, and project references. Existing authentication, project-access, audit, and template-protection criteria continue to apply.

## Questions needed to finish the workflow example

1. Do revisions/reissues of the same letter retain its LE number? Per-individual-letter allocation is confirmed and no longer an open question.
2. Are salary requests always whole-month payments? Confirm whether TIN, individual totals, and a grand total are required, and whether the app calculates them or staff supply approved figures.

Latest user correction: Salary Request generates one request letter only; separate RCNAS/OVRF cover letters are removed. Each individual letter has its own RCNAS-issued LE number. Earlier two-letter requirements are superseded.

Still needed before Construction: reviewed synthetic letter/packet example and field contract, technical/account decisions, and approval of the bounded implementation plan. The user has confirmed business scope, not authorized migrations or deployment.
