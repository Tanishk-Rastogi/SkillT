export interface Role {
  id: string;
  domainId: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  estimatedTime: string;
  careerOutcomes: string[];
}

export const ROLES: Role[] = [
  {
    id: "frontend",
    domainId: "web-development",
    title: "Frontend Developer",
    description: "Focus on the visual layout, user interface, and interactive elements of web applications.",
    difficulty: "Beginner",
    estimatedTime: "3-6 months",
    careerOutcomes: ["UI Engineer", "Frontend Developer", "Web Designer"],
  },
  {
    id: "backend",
    domainId: "web-development",
    title: "Backend Developer",
    description: "Architect the server-side logic, databases, and APIs that power modern web applications.",
    difficulty: "Intermediate",
    estimatedTime: "4-8 months",
    careerOutcomes: ["Backend Engineer", "API Developer", "Database Administrator"],
  },
  {
    id: "fullstack",
    domainId: "web-development",
    title: "Fullstack Developer",
    description: "Master both frontend and backend technologies to build complete end-to-end web solutions.",
    difficulty: "Advanced",
    estimatedTime: "6-12 months",
    careerOutcomes: ["Fullstack Engineer", "Technical Lead", "Software Architect"],
  },
];
