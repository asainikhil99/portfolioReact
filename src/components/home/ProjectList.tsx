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

// Define interfaces
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  category: string;
}

interface Category {
  id: string;
  label: string;
}

// Projects data
const projects: Project[] = [
  // Your existing projects data...
];

// Categories data
const categories: Category[] = [
  { id: "all", label: "All Projects" },
  { id: "frontend", label: "Frontend" },
  { id: "python", label: "Python" },
  { id: "fullstack", label: "Full Stack" },
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  return (
    // Your existing JSX remains the same, TypeScript now knows about the types
    <section
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      id="projects"
    >
      {/* Rest of your code... */}
    </section>
  );
}
