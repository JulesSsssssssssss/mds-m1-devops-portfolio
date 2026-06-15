/**
 * Ajout interactif d'un article de blog en base.
 *
 *   npm run post:add
 *
 * Pose quelques questions, ouvre un éditeur pour le corps en Markdown, puis
 * insère (ou met à jour) l'article dans PostgreSQL.
 */
import "dotenv/config";
import { input, confirm, editor } from "@inquirer/prompts";
import { prisma } from "../src/lib/prisma";
import { slugify } from "../src/lib/format";

async function main() {
  console.log("\n📝 Nouvel article de blog\n");

  const title = await input({
    message: "Titre de l'article :",
    validate: (v) => v.trim().length > 0 || "Le titre est obligatoire.",
  });

  const slug = await input({
    message: "Slug (URL) :",
    default: slugify(title),
    validate: (v) => v.trim().length > 0 || "Le slug est obligatoire.",
  });

  const excerpt = await input({
    message: "Résumé (affiché dans la liste) :",
    validate: (v) => v.trim().length > 0 || "Le résumé est obligatoire.",
  });

  const tagsRaw = await input({
    message: "Tags (séparés par des virgules) :",
  });
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const coverImage = await input({
    message: "Image de couverture, URL ou /chemin (optionnel) :",
  });

  const content = await editor({
    message: "Corps de l'article (Markdown) — s'ouvre dans votre éditeur :",
    default: `# ${title}\n\nÉcrivez votre article ici en **Markdown**...\n`,
    postfix: ".md",
  });

  const published = await confirm({
    message: "Publier l'article (sinon brouillon) ?",
    default: true,
  });

  const data = {
    slug,
    title,
    excerpt,
    content,
    coverImage: coverImage || null,
    tags,
    published,
    publishedAt: published ? new Date() : null,
  };

  const post = await prisma.post.upsert({
    where: { slug },
    update: data,
    create: data,
  });

  console.log(
    `\n✅ Article enregistré : « ${post.title} » (/blog/${post.slug})${
      post.published ? "" : " [brouillon]"
    }\n`,
  );
}

main()
  .catch((error) => {
    if (error?.name === "ExitPromptError") {
      console.log("\nAnnulé.");
      return;
    }
    console.error("❌ Erreur :", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
