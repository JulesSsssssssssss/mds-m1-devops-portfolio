/**
 * Contenu éditable du portfolio NON stocké en base de données.
 *
 * Le blog et les projets vivent dans PostgreSQL (voir Prisma + `npm run post:add`
 * / `npm run project:add`). Ici on garde le contenu « statique » qui change
 * rarement : compétences, parcours et navigation. Éditez librement ces tableaux.
 */

import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Server,
  Database,
  Cloud,
  Wrench,
  Palette,
} from "lucide-react";

/** Liens de navigation (barre du haut). */
export const navItems = [
  { label: "À propos", href: "/#a-propos" },
  { label: "Compétences", href: "/#competences" },
  { label: "Projets", href: "/#projets" },
  { label: "Parcours", href: "/#parcours" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
] as const;

/** Catégories de compétences. Ajoutez/retirez des entrées à volonté. */
export const skillGroups: { title: string; icon: LucideIcon; skills: string[] }[] =
  [
    {
      title: "Langages",
      icon: Code2,
      skills: ["TypeScript", "JavaScript", "Python", "PHP", "SQL", "Bash"],
    },
    {
      title: "Front-end",
      icon: Palette,
      skills: ["React", "Next.js", "Tailwind CSS", "Vue.js", "HTML/CSS"],
    },
    {
      title: "Back-end",
      icon: Server,
      skills: ["Node.js", "Express", "NestJS", "REST", "GraphQL"],
    },
    {
      title: "Bases de données",
      icon: Database,
      skills: ["PostgreSQL", "MySQL", "MongoDB", "Prisma", "Redis"],
    },
    {
      title: "DevOps & Cloud",
      icon: Cloud,
      skills: ["Docker", "GitHub Actions", "CI/CD", "Linux", "Nginx", "AWS"],
    },
    {
      title: "Outils",
      icon: Wrench,
      skills: ["Git", "VS Code", "Figma", "Jira", "Postman"],
    },
  ];

/** Liste à plat de toutes les technos (pour le bandeau défilant / marquee). */
export const allSkills: string[] = Array.from(
  new Set(skillGroups.flatMap((g) => g.skills)),
);

export type TimelineItem = {
  period: string;
  title: string;
  organization: string;
  description: string;
  type: "education" | "work";
};

/** Parcours (formation + expériences), du plus récent au plus ancien. */
export const timeline: TimelineItem[] = [
  {
    period: "2025 — 2026",
    title: "Mastère 1 DevOps",
    organization: "MyDigitalSchool",
    description:
      "Spécialisation en intégration et déploiement continus, conteneurisation et automatisation de l'infrastructure.",
    type: "education",
  },
  {
    period: "2024 — 2025",
    title: "Développeur Full-Stack — Alternance",
    organization: "Votre Entreprise",
    description:
      "Développement de fonctionnalités web de bout en bout, mise en place de pipelines CI/CD et déploiements conteneurisés.",
    type: "work",
  },
  {
    period: "2021 — 2024",
    title: "Bachelor Développement Web",
    organization: "MyDigitalSchool",
    description:
      "Fondamentaux du développement web, programmation orientée objet, bases de données et gestion de projet agile.",
    type: "education",
  },
];
