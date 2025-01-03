"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Github, ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "Modern portfolio with dark mode and animations",
    longDescription:
      "A responsive personal portfolio website built with Next.js and TailwindCSS, featuring dark mode, smooth animations, and dynamic content loading.",
    image: "/images/projects/PortfolioImage.png",
    tags: ["Next.js", "React", "TailwindCSS", "TypeScript"],
    github: "https://github.com/asainikhil99/portfolio",
    demo: "https://portfolio.com",
    category: "frontend",
  },
  {
    id: 2,
    title: "Task Management API",
    description: "RESTful API for task and project management",
    longDescription:
      "A robust REST API built with FastAPI and PostgreSQL for managing tasks and projects, featuring JWT authentication and comprehensive documentation.",
    image: "/api/placeholder/800/400",
    tags: ["Python", "FastAPI", "PostgreSQL", "JWT"],
    github: "https://github.com/yourusername/task-api",
    demo: "https://api-docs.com",
    category: "python",
  },
  {
    id: 3,
    title: "E-commerce Dashboard",
    description: "Admin dashboard for online store management",
    longDescription:
      "A comprehensive admin dashboard for managing online store inventory, orders, and analytics. Built with React and Node.js.",
    image: "/api/placeholder/800/400",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/yourusername/ecommerce-dashboard",
    demo: "https://dashboard.com",
    category: "fullstack",
  },
];

const categories = [
  { id: "all", label: "All Projects" },
  { id: "frontend", label: "Frontend" },
  { id: "python", label: "Python" },
  { id: "fullstack", label: "Full Stack" },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    <section
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      id="projects"
    >
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            A selection of my recent work and experiments
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              onClick={() => setActiveCategory(category.id)}
              className="transition-all dark:text-white"
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col hover:shadow-lg transition-all duration-300 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
            >
              <div className="relative w-full h-48">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-t-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={project.id === 1}
                />
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="mt-auto pt-6">
                <div className="flex gap-4 w-full">
                  <Button
                    variant="outline"
                    className="flex-1 dark:text-white dark:hover:bg-gray-700"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button
                    className="flex-1 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                    onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl dark:bg-gray-800">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-gray-900 dark:text-white">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-300">
                    {selectedProject.longDescription}
                  </DialogDescription>
                </DialogHeader>
                <div className="relative w-full h-64">
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 1200px) 100vw, 75vw"
                  />
                </div>
                <div className="grid gap-4">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-gray-900 dark:text-white">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      asChild
                      variant="outline"
                      className="dark:text-white dark:hover:bg-gray-700"
                    >
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="h-4 w-4" />
                        View Code
                      </a>
                    </Button>
                    <Button
                      asChild
                      className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100"
                    >
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
