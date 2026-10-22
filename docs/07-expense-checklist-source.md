# Expense checklist source transcription

Extracted: 2026-10-22. Source: [supplied workbook](../sample-data/Checklist_Per%20Expense%20Item.xlsx).

This is a requirements reference, not an approved rules engine or a test fixture. Subsequent user clarification confirms all workbook expense categories route to OVRF and all checklist items act as advisory guidance, never mandatory generation gates. Salary is the first implementation slice; see [its specification](08-salary-request.md). Numbered requirements and intervening scenario/conditional text are preserved with cell references; whitespace is normalized. Filled personal/project header and signature fields are omitted. No original requirement has been silently corrected, deduplicated, or validated as current policy.

Source SHA-256: `820cc5de4b65becefe46dc00b244f86f602c9a5c07ac0c5558cf5dd7f2a33f66`.

## Salary

Category label (B11): Salaries Expense

- **D13** — Disbursement Voucher
- **D14** — Approved Contract of Services (for first payment)
- **D15** — Approved Daily Time Record
- **D16** — Accomplishment Report/Certificate of Services Rendered duly approved by the Project Leader

## Honoraria

Category label (B11): Honoraria

- **D13** — Disbursement Voucher
- **D14** — Office Order or Authority to Collect Honoraria
- **D15** — Accomplishment Report / Certificate of Services Rendered and Certificate of Acceptance duly approved by the Project Leader / Immediate Supervisor

## Travel - Local

Category label (B11): Traveling Expense (Local)

- **C13** — In case of Cash advance:
- **D14** — Disbursement Voucher
- **D15** — Travel Order approved by the Authorized Official
- **D16** — Duly Approved Proposed Itinerary of Travel
- **D17** — Quotation of plane fare from at least 3 airline companies or travel agencies (most economical to the government)
- **C18** — In case of Liquidation:
- **D19** — Liquidation Report
- **D20** — Duly Approved Actual Itinerary of Travel
- **D21** — Certificate of Travel Completed
- **D22** — Certificate of Appearance/Attendance, or in the absence thereof, Approved travel report duly noted/approved by the authorized official
- **D23** — E-tickets
- **D24** — Boarding Pass
- **D25** — Actual Receipts for Hotel Accommodation
- **D26** — Quotation of plane fare from at least 3 airline companies or travel agencies (most economicalto the government)
- **D27** — Certification of Traveling Expenses without receipt (i.e. mode of transportation - PUV's) preferably with reimbursement expense receipt.
- **C28** — In case of reimbursement, documentary requirements for liquidation except for the Liquidation Report, will apply.

## Travel - Foreign

Category label (B11): Traveling Expense (Foreign)

- **C13** — In case of Cash Advance:
- **D14** — Disbursement Voucher
- **D15** — Approved travel order coming from Funding/Source Agency
- **D16** — Duly approved proposed itinerary of travel duly approved by the authorized official
- **D17** — Quotation of plane fare from at least 3 airline companies or travel agencies (most economical to the government)
- **D18** — Letter of Invitation from Host/Sponsoring Country
- **D19** — Applicable UNDP rates (covering the period of activity)
- **D20** — BSP Foreign Exchange Conversion Rate
- **C21** — In case of Liquidation:
- **D22** — Liquidation Report
- **D23** — Duly Approved Actual of Travel
- **D24** — Certificate of Travel Completed
- **D25** — Certificate of Appearance/Attendance, or in the absence thereof, Approved travel report duly noted/approved by the authorized official
- **D26** — E-tickets and Boarding Pass
- **D27** — Quotations of plane fare from at least 3 airline companies or travel agencies
- **D28** — Actual Receipts for Hotel Accommodation
- **D29** — Applicable UNDP rates (covering the period of activity)
- **D30** — BSP Foreign Exchange Conversion Rate (covering the date of the activity)
- **C31** — In case of reimbursement, documentary requirements for liquidation, except Liquidation Report, will apply.
- **C32** — Additional documents in case of Seminars/Trainings:
- **D33** — Invitation addressed to the implementing agency inviting participants
- **D34** — Acceptance of the nominees as participants
- **D35** — Approval of foreign seminars/trainings from Funding/Source Agency

## Communication

Category label (B11): Communication Expense

- **D13** — Disbursement Voucher
- **D14** — Official Receipt
- **D15** — Statement of Account/Billing Statement
- **D16** — Contract of Service/Undertaking with the Service Provider
- **C17** — In case of load allowance, payroll duly signed by the recipients.

## Postage and Courier

Category label (B11): Postage and Courier Expense

- **D13** — Disbursement Voucher
- **D14** — Approved Purchase Request
- **D15** — Purchase Order or Contract of Service/Undertaking with the Service Provider (if applicable)
- **D16** — Quotations from at least 3 Suppliers for transactions amounting to P1,000.00 and above (per Invoice)
- **D17** — Abstract of Quotation
- **D18** — Official Receipt

## Repairs and Maintenance

Category label (B11): Repairs and Maintenance Expense

- **D13** — Disbursement Voucher
- **D14** — Approved Pre Repair Evaluation Report / approved detailed plans by the end-user showing sufficient detail the scope of work/extent of repair to be done
- **D15** — Approved Purchase Request
- **D16** — Purchase Order or Contract of Service/Undertaking with the Service Provider (if applicable)
- **D17** — Quotations from at least 3 Suppliers for transactions amounting to P1,000.00 and above (per Invoice)
- **D18** — Abstract of Quotation
- **D19** — Inspection and Acceptance Report duly acknowledge by the end-user
- **D20** — Billing Statement/ Statement of Account
- **D21** — Official Receipt

## Supplies and Materials

Category label (B11): Supplies and Materials Expense

- **D13** — Disbursement Voucher
- **D14** — Purchase Request and/or Purchase Order
- **D15** — Quotations from at least 3 suppliers for transactions involving 1,000.00 and above
- **D16** — Abstract of Quotation
- **D17** — Sales Invoice and Delivery Receipt duly signed
- **D18** — Official Receipt
- **D19** — Inspection and Acceptance Report duly acknowledged
- **D20** — Warranty Certificate for a minimum of 3 months, in case of expendable supplies, or a minimum period of 1 year in the case of semi-/non-expendable supplies, after acceptance by the procuring entity of the delivered supplies
- **D21** — Inventory Custodian Slip (for goods less than P50,000.00)

## Training

Category label (B11): Training Expense

- **D13** — Disbursement Voucher
- **D14** — Approved Office Order or Special Order to attend the Training duly approved by an authorized official of the implementing agency
- **D15** — Certificate of Appearance/ Participation/ Training
- **D16** — Billing Statement/ Statement of Account
- **D17** — Official Receipt
- **D18** — Training Report (highlights of the training/activity) duly approved/ noted by the Project Leader/ Immediate Supervisor

## Utilities

Category label (B11): Utilities Expense

- **D13** — Disbursement Voucher
- **D14** — Official Receipt
- **D15** — Invoice/ Statement of Account/ Billing Statement

## Professional Services

Category label (B11): Professional Services

- **D13** — Disbursement Voucher
- **D14** — Official Receipt
- **D15** — Purchase Request
- **D16** — Quotations from at least 3 Suppliers for transactions amounting to P1,000.00 and above (per Invoice)
- **D17** — Abstract of Quotation
- **D18** — Contract of Service/ Undertaking with the Service provider (if applicable)
- **D19** — Accomplishment Report/ Deliverables duly accepted by the Project Leader

## Representation Expense

Category label (B11): Representation Expense

- **D13** — Disbursement Voucher
- **D14** — Official Receipt
- **D15** — Authority to serve meals/ Purchase Request
- **D16** — Attendance Sheet/ Guests List
- **D17** — Minutes of Meeting
- **D18** — Contract of Service/ Undertaking with the Service Provider (if applicable)

## Taxes, Insurance Premiums and O

Category label (B11): Taxes, Insurance Premiums and Other Fees

- **D13** — Disbursement Voucher
- **D14** — Invoice/ Official Receipt
- **D15** — Insurance Policy covering the listed project personnel (Accident Insurance)

## Printing and Binding

Category label (B11): Printing and Binding Expense

- **D13** — Disbursement Voucher
- **D14** — Purchase Request
- **D15** — Purchase Order or Contract of Service/ Undertaking of the Service Provider (if applicable)
- **D16** — Quotations from at least 3 suppliers (involving P1,000.00 and above)
- **D17** — Abstract of Quotation
- **D18** — Contract of Service/ Undertaking of the Service Provider (if applicable)
- **D19** — Billing / Statement of Account
- **D20** — Official Receipt

## Transportation and Delivery

Category label (B11): Transportation and Delivery Expense

- **D13** — Disbursement Voucher
- **D14** — Purchase Request and/or Purchase Order
- **D15** — Quotations from at least 3 suppliers (involving P1,000.00 and above)
- **D16** — Abstract of Quotation
- **D17** — Contract of Service/ Undertaking of the Service Provider (if applicable)
- **D18** — Billing / Statement of Account
- **D19** — Official Receipt

## Subscription

Category label (B11): Subscription Expense

- **D13** — Disbursement Voucher
- **D14** — Approved Purchase Request and/or Purchase Order
- **D15** — Statement of Account/ Billing
- **D16** — Official Receipt

## Rent Lease

Category label (B11): Rent/ Lease Expense

- **D13** — Disbursement Voucher
- **D14** — Approved Purchase Request and/or Purchase Order
- **D15** — Rental/ Lease Agreement
- **D16** — Statement of Account/ Billing
- **D17** — Official Receipt
- **D18** — Certificate of Services Rendered and acceptance issued by the Project Leader

## Capital Outlay

Category label (B11): Capital Outlay - Equipment Outlay

- **D13** — Disbursement Voucher
- **D14** — Approved Purchase Request and/or Purchase Order
- **D15** — Quotations from at least 3 Suppliers
- **D16** — Contract of Service/ Undertaking of the Service Provider
- **D17** — Sales Invocie/ Delivery Receipt
- **D18** — Inspection and Acceptance Report
- **D19** — Warranty/ Security of equipment purchased
- **D20** — List of Equipment Purchased (DOST-GIA Form 12) and Property Acknowledgement Receipt (PAR)
- **D21** — Official Receipt
- **D22** — Journal Entry Voucher or evidence of the recording of purchased equipment (c/o the Accounting Office of IA)

## Common notes and review blocks

All sheets include the following source notes: SPD/Project Team applies to on-going projects only; original supporting documents are to be submitted with justification when originals cannot be provided; equivalent documents may support disbursement/utilization if necessary COA information is present; COA may require additional post-audit documents. These summarize source wording and do not independently certify applicability.

Each sheet includes columns for Implementing Agency, Monitoring Agency, SPD/Project Team, and Accounting of the Source Agency, with printed name/designation, signature/date, and remarks blocks. These must not be mapped to university endorsement offices without confirmation.

## Source issues requiring review

- The Taxes sheet name is truncated; its B11 category label provides the fuller wording.
- Printing and Binding D15 and D18 overlap on contract/service-provider wording. Preserve both pending clarification.
- Travel - Foreign D23 reads “Duly Approved Actual of Travel”; do not silently infer the exact form title.
- Some sheets contain monetary thresholds, warranty durations, and applicability clauses. Confirm currentness and interpretation before enforcing them.
- Some requirements contain alternatives (“and/or”, “or”, “if applicable”); do not turn every alternative into an unconditional requirement.
- The source contains differing filled project-duration headers; these are not adopted as project configuration.
