import { describe, expect, it } from "vitest";
import { PROJECTS, titleSegments } from "./projects";

describe("titleSegments", () => {
  it("italicizes configured phrases", () => {
    expect(titleSegments(PROJECTS.blaze)).toEqual([
      { text: "Evaluation of Bacteriolytic Activity of Phage-encoded Endolysins against ", italic: false },
      { text: "Staphylococcus aureus", italic: true },
    ]);
  });
});
