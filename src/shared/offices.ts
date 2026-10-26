// Directory of offices and their heads, used to fill letter recipients and
// endorsers. Kept in code until an admin settings page exists (U03–U05).
// Letters keep a copy of the names used, so updating a head here never
// changes letters already prepared.

export type OfficeHead = {
  name: string; // as printed in the address/signature block
  title: string;
  salutation: string; // used in "Dear …:"
  acting?: boolean; // officer-in-charge or acting head
};

export type Office = {
  id: string;
  name: string;
  heads: readonly OfficeHead[];
};

// Confirmed current by the user on 2026-10-27.
export const OFFICES = {
  ovrf: {
    id: "ovrf",
    name: "Office of the Vice-Rector for Finance",
    heads: [
      {
        name: "REV. FR. ROBERTO L. LUANZON, JR., OP",
        title: "Vice-Rector for Finance",
        salutation: "Rev. Fr. Luanzon",
      },
    ],
  },
  rcnas: {
    id: "rcnas",
    name: "RCNAS",
    heads: [
      {
        name: "Prof. Bernard John V. Tongol, Ph.D.",
        title: "Director – RCNAS",
        salutation: "Prof. Tongol",
      },
    ],
  },
  ovrri: {
    id: "ovrri",
    name: "Office of the Vice-Rector for Research and Innovation",
    heads: [
      {
        name: "Rev. Fr. Jannel N. Abogado, O.P., DThScPat",
        title: "Vice-Rector for Research and Innovation",
        salutation: "Rev. Fr. Abogado",
      },
    ],
  },
  rector: {
    id: "rector",
    name: "Office of the Rector",
    heads: [
      {
        name: "Very Rev. Fr. Richard G. Ang, O.P., Ph.D.",
        title: "Rector",
        salutation: "Very Rev. Fr. Ang",
      },
    ],
  },
} as const satisfies Record<string, Office>;

export type OfficeId = keyof typeof OFFICES;

export function headLabel(head: OfficeHead): string {
  return head.acting ? `${head.name} (acting)` : head.name;
}
