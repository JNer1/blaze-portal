// Project settings. Kept in code until project records and an admin settings
// page exist (U03–U05); then these move to the database. Every request names
// its project so more projects can be added later without reworking requests.

export type Project = {
  id: string;
  shortName: string;
  title: string;
  // Phrases printed in italics wherever the title appears (e.g. species names).
  titleItalics: readonly string[];
  // FCDU account the expense is charged to, exactly as registered.
  accountName: string;
  // Fixed part of the LE number before the RCNAS-issued value. Overridable per letter.
  lePrefix: string;
  projectLeader: { name: string; title: string };
};

export const PROJECTS = {
  blaze: {
    id: "blaze",
    shortName: "BlAzE Project",
    title:
      "Evaluation of Bacteriolytic Activity of Phage-encoded Endolysins against Staphylococcus aureus",
    titleItalics: ["Staphylococcus aureus"],
    // Spelling ("EVALUTATION") is as registered; do not correct.
    accountName: "FCDU-RCNAS-DOST-NRCP-EVALUTATION OF BACTERIOLYTIC ACTIVITY",
    lePrefix: "S037-00-",
    // As printed in the supplied salary request sample.
    projectLeader: { name: "Prof. Donna May D. Papa, PhD", title: "Project Leader - [BlAzE Project]" },
  },
} as const satisfies Record<string, Project>;

export type ProjectId = keyof typeof PROJECTS;
export const PROJECT_IDS = Object.keys(PROJECTS) as [ProjectId, ...ProjectId[]];

export function getProject(id: ProjectId): Project {
  return PROJECTS[id];
}

// Splits a title into plain and italic segments for rendering.
export function titleSegments(project: Project): { text: string; italic: boolean }[] {
  if (project.titleItalics.length === 0) return [{ text: project.title, italic: false }];
  const escaped = project.titleItalics.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`(${escaped.join("|")})`);
  return project.title
    .split(pattern)
    .filter((text) => text !== "")
    .map((text) => ({ text, italic: project.titleItalics.includes(text) }));
}
