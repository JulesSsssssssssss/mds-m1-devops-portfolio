import { cache } from "react";
import { prisma } from "@/lib/prisma";
import type { Post } from "@/generated/prisma/client";

export type { Post };

/** Tous les articles publiés, du plus récent au plus ancien. */
export const getPosts = cache(async (): Promise<Post[]> => {
  try {
    return await prisma.post.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
    });
  } catch (error) {
    console.error("[posts] getPosts:", error);
    return [];
  }
});

/** Les derniers articles publiés (pour la page d'accueil). */
export const getLatestPosts = cache(async (limit = 3): Promise<Post[]> => {
  const posts = await getPosts();
  return posts.slice(0, limit);
});

/** Un article par son slug (publié uniquement). */
export const getPostBySlug = cache(
  async (slug: string): Promise<Post | null> => {
    try {
      return await prisma.post.findFirst({
        where: { slug, published: true },
      });
    } catch (error) {
      console.error("[posts] getPostBySlug:", error);
      return null;
    }
  },
);
