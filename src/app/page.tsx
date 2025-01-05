// src/app/page.tsx
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Leetcode from "@/components/home/Leetcode";
import ProjectList from "@/components/home/ProjectList";
import Contact from "@/components/home/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <ProjectList />
      {/* <Leetcode /> */}
      <Contact />
    </main>
  );
}
