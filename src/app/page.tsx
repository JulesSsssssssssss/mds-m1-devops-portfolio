import { getFeaturedProjects } from "@/lib/projects";
import { getLatestPosts } from "@/lib/posts";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { LatestPosts } from "@/components/sections/latest-posts";
import { Contact } from "@/components/sections/contact";

// Le contenu vient de la base : on rend à la demande pour refléter les
// changements immédiatement (après un seed ou un ajout).
export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, posts] = await Promise.all([
    getFeaturedProjects(),
    getLatestPosts(3),
  ]);

  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects projects={projects} />
      <Experience />
      <LatestPosts posts={posts} />
      <Contact />
    </>
  );
}
