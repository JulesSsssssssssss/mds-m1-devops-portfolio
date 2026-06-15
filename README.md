# Portfolio développeur — Template

Un template de portfolio moderne, **entièrement personnalisable via des variables
d'environnement**, avec un **blog et des projets stockés en PostgreSQL**.
Conçu pour être cloné et lancé en quelques minutes.

## ✨ Stack

- **[Next.js 16](https://nextjs.org)** (App Router, React Server Components)
- **[Tailwind CSS v4](https://tailwindcss.com)** + composants **[Magic UI](https://magicui.design/)**
- **[PostgreSQL](https://www.postgresql.org/)** + **[Prisma 7](https://www.prisma.io/)** (blog & projets)
- Thème clair/sombre, animations, design responsive
- Scripts CLI pour ajouter du contenu sans toucher au code

---

## 🚀 Démarrage rapide

### 1. Installer les dépendances

```bash
npm install
```

### 2. Configurer l'environnement

```bash
cp .env.example .env
```

Puis ouvrez `.env` et remplacez les valeurs par vos informations (nom, email,
réseaux sociaux…). Voir la section [Personnalisation](#-personnalisation).

### 3. Démarrer la base de données

**Option A — Docker (recommandé en local)** :

```bash
docker compose up -d
```

**Option B — Base hébergée** (Neon, Supabase, Railway…) : créez une base et
collez son URL de connexion dans `DATABASE_URL` (`.env`).

### 4. Créer le schéma et insérer des exemples

```bash
npm run db:push   # crée les tables à partir du schéma Prisma
npm run db:seed   # ajoute 3 projets + 3 articles d'exemple
```

### 5. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000). 🎉

---

## 🎨 Personnalisation

### Informations personnelles → `.env`

Toutes vos infos se règlent dans le fichier `.env` (préfixe `NEXT_PUBLIC_`) :

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_FIRST_NAME` / `NEXT_PUBLIC_LAST_NAME` | Prénom / nom |
| `NEXT_PUBLIC_ROLE` | Intitulé de poste (ex. « Développeur Full-Stack ») |
| `NEXT_PUBLIC_TAGLINE` | Accroche affichée dans le hero |
| `NEXT_PUBLIC_BIO` | Texte de la section « À propos » |
| `NEXT_PUBLIC_LOCATION` | Localisation |
| `NEXT_PUBLIC_AVATAR_URL` | Photo de profil (URL ou `/fichier` dans `public/`) |
| `NEXT_PUBLIC_RESUME_URL` | CV PDF (laisser vide pour masquer le bouton) |
| `NEXT_PUBLIC_EMAIL` / `NEXT_PUBLIC_PHONE` | Contact |
| `NEXT_PUBLIC_GITHUB_URL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_TWITTER_URL`, `NEXT_PUBLIC_WEBSITE_URL` | Réseaux (vides = masqués) |
| `NEXT_PUBLIC_SITE_URL` | URL publique du site (SEO) |
| `DATABASE_URL` | Connexion PostgreSQL (jamais exposée au client) |

> ⚠️ Les variables `NEXT_PUBLIC_*` sont injectées **au build**. Après les avoir
> modifiées, relancez `npm run dev` (ou reconstruisez en production).

### Compétences & parcours → `src/config/content.ts`

Les compétences et la timeline (formation / expériences) s'éditent dans
[`src/config/content.ts`](src/config/content.ts) — de simples tableaux à modifier.

---

## ✍️ Ajouter du contenu (blog & projets)

Le blog et les projets vivent en base. Deux scripts interactifs facilitent l'ajout :

```bash
npm run post:add      # ajouter un article de blog
npm run project:add   # ajouter un projet
```

Vous pouvez aussi visualiser/éditer les données dans une interface :

```bash
npm run db:studio     # ouvre Prisma Studio
```

---

## 📜 Scripts disponibles

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` / `npm run start` | Build et démarrage en production |
| `npm run lint` | Analyse ESLint |
| `npm run db:push` | Applique le schéma Prisma à la base (sans migration) |
| `npm run db:migrate` | Crée et applique une migration |
| `npm run db:seed` | Insère les données d'exemple |
| `npm run db:reset` | Réinitialise la base (⚠️ supprime les données) |
| `npm run db:studio` | Interface d'administration des données |
| `npm run post:add` / `npm run project:add` | Ajout interactif de contenu |

---

## 📁 Structure du projet

```
prisma/
  schema.prisma        # modèles Project & Post
  seed.ts              # données d'exemple (3 projets + 3 articles)
scripts/
  add-post.ts          # CLI d'ajout d'article
  add-project.ts       # CLI d'ajout de projet
src/
  app/                 # pages (home, /blog, /projets, …)
  components/
    sections/          # sections de la home (hero, about, skills, …)
    ui/                # composants Magic UI / shadcn
  config/
    site.ts            # infos perso (depuis les variables d'env)
    content.ts         # compétences & parcours (éditable)
  lib/
    prisma.ts          # client Prisma (adapter pg)
    posts.ts / projects.ts  # accès aux données
```

---

## 🚢 Déploiement

L'application est une app Next.js standard. Pour la mettre en production :

1. Provisionnez une base PostgreSQL et renseignez `DATABASE_URL`.
2. Définissez les variables `NEXT_PUBLIC_*`.
3. Appliquez le schéma : `npm run db:deploy` (ou `db:push`).
4. `npm run build` puis `npm run start`.

> Les composants Magic UI sont installés depuis leur registre public via
> `npx shadcn@latest add "https://magicui.design/r/<composant>.json"`.

---

## 📄 Licence

Libre d'utilisation pour votre portfolio personnel.
