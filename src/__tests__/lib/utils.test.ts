import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("fusionne plusieurs noms de classes", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("ignore les valeurs falsy (false, null, undefined, chaîne vide)", () => {
    expect(
      cn("foo", false as unknown as string, null as unknown as string, undefined, "")
    ).toBe("foo");
  });

  it("résout les conflits de padding Tailwind — la dernière classe l'emporte", () => {
    expect(cn("p-4", "p-2")).toBe("p-2");
  });

  it("résout les conflits de couleur de texte Tailwind", () => {
    expect(cn("text-red-500", "text-blue-600")).toBe("text-blue-600");
  });
});
