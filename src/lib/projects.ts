import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Project } from "@/generated/prisma/client";

export type { Project };

/**
 * Toutes les requêtes sont enveloppées dans try/catch : si la base n'est pas
 * joignable (ex. premier clone sans `.env`), le site s'affiche quand même avec
 * des sections vides plutôt que de planter.
 */

/** Tous les projets publiés, mis en avant d'abord puis par ordre manuel. */
export const getProjects = cache(async (): Promise<Project[]> => {
  try {
    return await prisma.project.findMany({
      where: { published: true },
      orderBy: [{ featured: "desc" }, { order: "asc" }, { createdAt: "desc" }],
    });
  } catch (error) {
    console.error("[projects] getProjects:", error);
    return [];
  }
});

/** Les projets mis en avant (pour la page d'accueil). */
export const getFeaturedProjects = cache(
  async (limit = 4): Promise<Project[]> => {
    const projects = await getProjects();
    const featured = projects.filter((p) => p.featured);
    return (featured.length > 0 ? featured : projects).slice(0, limit);
  },
);

/** Un projet par son slug (publié uniquement). */
export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    try {
      return await prisma.project.findFirst({
        where: { slug, published: true },
      });
    } catch (error) {
      console.error("[projects] getProjectBySlug:", error);
      return null;
    }
  },
);
