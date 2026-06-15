/**
 * Ajout interactif d'un projet en base.
 *
 *   npm run project:add
 *
 * Pose quelques questions puis insère (ou met à jour) le projet dans PostgreSQL.
 */
import "dotenv/config";
import { input, confirm, number, editor } from "@inquirer/prompts";
import { prisma } from "../src/lib/prisma";
import { slugify } from "../src/lib/format";

async function main() {
  console.log("\n📦 Nouveau projet\n");

  const title = await input({
    message: "Titre du projet :",
    validate: (v) => v.trim().length > 0 || "Le titre est obligatoire.",
  });

  const slug = await input({
    message: "Slug (URL) :",
    default: slugify(title),
    validate: (v) => v.trim().length > 0 || "Le slug est obligatoire.",
  });

  const description = await input({
    message: "Description courte :",
    validate: (v) => v.trim().length > 0 || "La description est obligatoire.",
  });

  const tagsRaw = await input({
    message: "Technos / tags (séparés par des virgules) :",
  });
  const tags = tagsRaw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  const githubUrl = await input({ message: "Lien GitHub (optionnel) :" });
  const demoUrl = await input({ message: "Lien démo (optionnel) :" });
  const coverImage = await input({
    message: "Image de couverture, URL ou /chemin (optionnel) :",
  });

  const featured = await confirm({
    message: "Mettre en avant sur la page d'accueil ?",
    default: false,
  });

  const order =
    (await number({ message: "Ordre d'affichage (0 = en premier) :", default: 0 })) ??
    0;

  const withContent = await confirm({
    message: "Rédiger un contenu détaillé (Markdown) maintenant ?",
    default: false,
  });
  const content = withContent
    ? await editor({
        message: "Contenu Markdown du projet :",
        postfix: ".md",
      })
    : "";

  const published = await confirm({ message: "Publier le projet ?", default: true });

  const data = {
    slug,
    title,
    description,
    content: content || null,
    coverImage: coverImage || null,
    tags,
    githubUrl: githubUrl || null,
    demoUrl: demoUrl || null,
    featured,
    published,
    order,
  };

  const project = await prisma.project.upsert({
    where: { slug },
    update: data,
    create: data,
  });

  console.log(`\n✅ Projet enregistré : « ${project.title} » (/projets/${project.slug})\n`);
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
