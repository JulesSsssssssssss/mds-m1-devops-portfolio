import { describe, it, expect, vi } from "vitest";

vi.mock("lucide-react", () => ({
  Code2: null,
  Server: null,
  Database: null,
  Cloud: null,
  Wrench: null,
  Palette: null,
}));

import { navItems, skillGroups, allSkills, timeline } from "@/config/content";

// ─── navItems ─────────────────────────────────────────────────────────────────

describe("navItems", () => {
  it("contient exactement 6 entrées de navigation", () => {
    expect(navItems).toHaveLength(6);
  });

  it("chaque entrée possède un label string et un href string", () => {
    for (const item of navItems) {
      expect(typeof item.label).toBe("string");
      expect(item.label.length).toBeGreaterThan(0);
      expect(typeof item.href).toBe("string");
      expect(item.href.length).toBeGreaterThan(0);
    }
  });
});

// ─── skillGroups ──────────────────────────────────────────────────────────────

describe("skillGroups", () => {
  it("contient exactement 6 catégories de compétences", () => {
    expect(skillGroups).toHaveLength(6);
  });

  it("chaque groupe a un titre, une icône et un tableau de skills non vide", () => {
    for (const group of skillGroups) {
      expect(typeof group.title).toBe("string");
      expect(group.title.length).toBeGreaterThan(0);
      expect(group).toHaveProperty("icon");
      expect(Array.isArray(group.skills)).toBe(true);
      expect(group.skills.length).toBeGreaterThan(0);
    }
  });
});

// ─── allSkills ────────────────────────────────────────────────────────────────

describe("allSkills", () => {
  it("est un tableau plat de chaînes sans doublons", () => {
    const unique = new Set(allSkills);
    expect(unique.size).toBe(allSkills.length);
  });

  it("contient au moins toutes les compétences de chaque groupe", () => {
    const grouped = skillGroups.flatMap((g) => g.skills);
    for (const skill of grouped) {
      expect(allSkills).toContain(skill);
    }
  });
});

// ─── timeline ────────────────────────────────────────────────────────────────

describe("timeline", () => {
  it("chaque entrée a les champs obligatoires et un type valide", () => {
    for (const item of timeline) {
      expect(typeof item.period).toBe("string");
      expect(typeof item.title).toBe("string");
      expect(typeof item.organization).toBe("string");
      expect(typeof item.description).toBe("string");
      expect(["education", "work"]).toContain(item.type);
    }
  });
});
