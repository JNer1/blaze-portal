import { titleSegments, type Project } from "@/shared/projects";

export function ProjectTitle({ project }: { project: Project }) {
  return (
    <>
      {titleSegments(project).map((s, i) => (s.italic ? <em key={i}>{s.text}</em> : <span key={i}>{s.text}</span>))}
    </>
  );
}
