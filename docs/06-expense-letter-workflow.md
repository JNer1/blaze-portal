# Expense letters and endorsement packets

Updated: 2026-10-22. Inception requirements refinement; no Construction authorization.

## Confirmed by the user

- The initial MVP focuses on letter preparation for expenses, including the cover letters needed to obtain signatures on expense requirements.
- Expense categories have different documentary checklists. The supplied workbook is the starting reference.
- The general hierarchy, from highest to lowest, is Rector, Vice Rector, Research Center, Research Group.
- A request for an administrator's signature requires endorsement from all levels below that administrator along the applicable hierarchy. Cover letters are needed for each level beyond the Research Group.
- Vice Rector branches depend on the request domain. All expense/finance categories in the workbook route to OVRF. Salary Request is the first slice, with a confirmed exception to additional cover-letter preparation.
- Latest salary correction: generate one consolidated request letter addressed to OVRF covering all selected staff. No additional RCNAS or OVRF cover letter is needed. Checklists are advisory per staff; supporting documents remain external.
- Each individual letter needs its own RCNAS-issued LE number, including letters for the same request but different offices. Salary therefore needs one LE number.

The salary output is one request letter; the earlier two-cover-letter interpretation is superseded. Detailed template wording, same-letter LE revision/reissue behavior, salary calculations, and other-category templates remain open. [Salary Request](08-salary-request.md) is the current detailed specification.

## Source material and boundaries

1. [Checklist workbook](../sample-data/Checklist_Per%20Expense%20Item.xlsx), supplied for requirements discovery. It contains 18 sheets; [the checklist transcription](07-expense-checklist-source.md) preserves source entries and conditions with cell references.
2. User-supplied organizational screenshot, attachment `image_638e7092-fbf5-40c5-8818-69844c7023e6`, provided on 2026-10-22. Names below are transcribed from that screenshot, not independently verified as current appointments. Confirm exact spelling, titles, honorifics, credentials, and effective dates before using them in generated letters.

The workbook contains some filled project, payee, and staff fields. They have not been copied into fixtures or treated as authoritative project settings. Reading supplied references for discovery does not authorize using private records as tests. Source checklist wording, thresholds, and conditions need applicability/currentness review; they are not independently verified university or DOST policy.

## Offices visible in the screenshot

- Rector's Office — Very Rev. Fr. Richard G. Ang, O.P., PhD.
- Purchasing Office — Rev. Fr. George Phe Mang, O.P.
- Office of the Vice Rector for Finance — Rev. Fr. Roberto L. Luanzon Jr., O.P., SThD, DL.
- Office of the Vice Rector for Research and Innovation (OVRRI) — Rev. fr. Jannel N. Abogado, O.P., DThScPat.
- Facilities Management Office — Rev. Fr. Dexter A. Austria, O.P., SThD.
- Research Center for Natural and Applied Sciences (RCNAS) — Prof. Bernard John V. Tongol, PhD.
- BEATS Research Group — Prof. Donna May D. Papa, PhD.

The diagram places Purchasing, Finance, OVRRI, and Facilities Management below the Rector. It connects RCNAS beneath OVRRI and BEATS beneath RCNAS. Purchasing and Facilities Management are not labeled Vice Rector offices. Do not invent a reporting relationship from RCNAS to those offices or assume that all four offices endorse every request.

Separate stable office identity from the person currently holding office. Proposed letter records preserve the actual name/title used at generation time so changing an officeholder does not rewrite document history. Signatories do not need application accounts merely to appear in letters.

## Proposed smallest useful workflow

1. Create an expense-related preparation request; select an expense category and applicable scenario, such as cash advance versus liquidation for travel.
2. Show its source-backed, advisory checklist and unresolved applicability questions. For salary, track guidance per staff member. Missing or not-applicable supporting items do not block generation. Supporting documents are obtained separately; the salary output is its request letter only.
3. Use the reviewed workflow for the selected category. Salary produces one OVRF-addressed request letter following the reviewed sample template. Enter its single RCNAS-issued LE value; distinct letters always require distinct LE numbers.
4. Let staff review the planned letter's recipient, signatories, purpose, and salary rows before generation (salary letters carry no enclosure list). Add further letters only when another category's reviewed workflow requires them.
5. Populate a protected, approved template using reusable request/project data. Preserve output provenance and preparation state; reconcile failed or uncertain attempts before retrying. No multi-letter packet implementation is needed for salary.
6. Staff obtain endorsements/signatures through the actual institutional process. A generated letter is not evidence of endorsement or signature. Electronic signing, automatic submission, and approval workflow automation remain outside this proposed MVP.

Confirmed first implementation slice: one consolidated Salary Request letter, per-staff advisory checks, and one LE number. No additional cover letters or supporting forms are generated. The all-category finance destination is confirmed; this does not imply all 18 templates/scenarios are approved for the first release.

## Confirmed finance route and remaining boundaries

Finance requests are addressed up to OVRF. The latest salary-specific correction requires just the request letter and removes additional RCNAS/OVRF cover letters. Obtaining an LE number from RCNAS does not imply generating a letter to that office. Other expense categories retain their own workflow discovery; do not infer their letter counts from salary. Non-finance routing is outside the current slice.

The workbook's Implementing Agency, Monitoring Agency, SPD/Project Team, and Accounting of the Source Agency columns/signature blocks are separate source concepts. They are not automatically equivalent to the university hierarchy and do not establish its signature order.

## Acceptance examples and next clarifications

See [Salary Request acceptance criteria and questions](08-salary-request.md). Scenario selection, one-letter salary scope, and distinct LE numbers per letter are resolved. Remaining priorities are salary fields/calculation rules, template review, and LE handling on revision/reissue. Supporting-checklist completeness is independent of successful request-letter generation.

## Requirement record

2026-10-22: user confirmed expense-letter focus and the lower-level endorsement rule, then corrected salary to one request letter only. Additional RCNAS/OVRF salary cover letters are superseded. Nonblocking per-staff checklists and one RCNAS-issued LE per distinct letter are confirmed. Template/calculation details, LE revision/reissue rules, and Construction remain pending. No architecture, migration, or deployment approval is inferred.
