import { describe, it, expect } from "vitest";
import { slugify, formatDate, readingMinutes } from "@/lib/format";

// ─── slugify ─────────────────────────────────────────────────────────────────

describe("slugify", () => {
  it("convertit un texte basique en slug", () => {
    expect(slugify("Mon Super Projet")).toBe("mon-super-projet");
  });

  it("supprime les accents français", () => {
    expect(slugify("café créatif")).toBe("cafe-creatif");
  });

  it("normalise une chaîne d'accents éàü", () => {
    expect(slugify("éàü")).toBe("eau");
  });

  it("supprime les caractères spéciaux et la ponctuation", () => {
    expect(slugify("Hello, World!")).toBe("hello-world");
  });

  it("supprime la ponctuation : ! ? :", () => {
    expect(slugify("Titre : sous-titre!")).toBe("titre-sous-titre");
  });

  it("supprime les tirets en début et fin de chaîne", () => {
    expect(slugify("  -foo-  ")).toBe("foo");
  });

  it("fusionne les séparateurs multiples consécutifs", () => {
    expect(slugify("foo   bar---baz")).toBe("foo-bar-baz");
  });

  it("conserve les chiffres dans le slug", () => {
    expect(slugify("Projet 42")).toBe("projet-42");
  });

  it("laisse intact un slug déjà valide", () => {
    expect(slugify("already-a-slug")).toBe("already-a-slug");
  });

  it("retourne une chaîne vide pour une entrée vide", () => {
    expect(slugify("")).toBe("");
  });

  it("retourne une chaîne vide pour une entrée uniquement composée d'espaces", () => {
    expect(slugify("   ")).toBe("");
  });
});

// ─── formatDate ──────────────────────────────────────────────────────────────

describe("formatDate", () => {
  it("retourne une chaîne vide pour null", () => {
    expect(formatDate(null)).toBe("");
  });

  it("retourne une chaîne vide pour undefined", () => {
    expect(formatDate(undefined)).toBe("");
  });

  it("retourne une chaîne vide pour la chaîne vide ''", () => {
    expect(formatDate("")).toBe("");
  });

  it("formate un objet Date en français — mois long", () => {
    const result = formatDate(new Date("2024-06-15T12:00:00Z"));
    expect(result).toContain("juin");
    expect(result).toContain("2024");
  });

  it("formate une date passée en string ISO", () => {
    const result = formatDate("2024-01-15T12:00:00Z");
    expect(result).toContain("janvier");
    expect(result).toContain("2024");
  });

  it("retourne le bon mois — mars", () => {
    const result = formatDate("2025-03-15T12:00:00Z");
    expect(result).toMatch(/mars/);
    expect(result).toContain("15");
  });

  it("inclut le jour et l'année pour une date locale connue", () => {
    const result = formatDate(new Date(2026, 5, 15));
    expect(result).toContain("15");
    expect(result).toContain("juin");
    expect(result).toContain("2026");
  });
});

// ─── readingMinutes ───────────────────────────────────────────────────────────

describe("readingMinutes", () => {
  it("retourne 1 minimum pour une chaîne vide", () => {
    expect(readingMinutes("")).toBe(1);
  });

  it("retourne 1 pour un mot unique", () => {
    expect(readingMinutes("hello")).toBe(1);
  });

  it("retourne 1 pour un texte très court", () => {
    expect(readingMinutes("bonjour monde")).toBe(1);
  });

  it("ne compte pas les espaces superflus comme des mots", () => {
    expect(readingMinutes("  un   mot  ")).toBe(1);
  });

  it("retourne 1 pour exactement 200 mots", () => {
    const text = new Array(200).fill("mot").join(" ");
    expect(readingMinutes(text)).toBe(1);
  });

  it("arrondit à 2 min pour 300 mots (300 / 200 = 1.5 → 2)", () => {
    const text = new Array(300).fill("mot").join(" ");
    expect(readingMinutes(text)).toBe(2);
  });

  it("calcule correctement pour 400 mots (2 min)", () => {
    const text = new Array(400).fill("mot").join(" ");
    expect(readingMinutes(text)).toBe(2);
  });

  it("retourne 3 min pour 600 mots", () => {
    const text = new Array(600).fill("mot").join(" ");
    expect(readingMinutes(text)).toBe(3);
  });
});
