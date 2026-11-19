export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  github: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: "Single Page Application",
    title: "Arik",
    description: "Single page application of a web designer and developer.",
    image: "/projects/arik.png",
    technologies: ["Vue", "SCSS"],
    link: "https://arik-template.netlify.app",
    github: "https://github.com/Khmelev7koiOleh/_arik.git",
  },
  {
    id: "Landing Page",
    title: "Debonaire",
    description: "Landing page for a hair salon.",

    image: "/projects/debonaire.png",
    technologies: ["Vue", "SCSS"],
    link: "https://debonaire-landing.netlify.app",
    github: "https://github.com/Khmelev7koiOleh/debonaire.git",
  },
  {
    id: "Landing Page",
    title: "Gronberg",
    description: "Landing page for a photographer.",
    image: "/projects/gronberg.png",
    technologies: ["Vue", "SCSS"],
    link: "https://gronberg-prj.netlify.app",
    github: "https://github.com/Khmelev7koiOleh/gronberg.git",
  },
];
