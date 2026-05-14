export type Domain = {
  id: string;
  title: string;
  description: string;
  iconType: string;
  isComingSoon?: boolean;
} & Record<string, unknown>;

export const DOMAINS: Domain[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Master the languages and frameworks of the open web. Build interactive experiences and scalable backend services.",
    iconType: "Globe",
  },
  {
    id: "ai-ml",
    title: "AI / Machine Learning",
    description: "Train neural networks, understand LLMs, and build the intelligent systems of tomorrow.",
    iconType: "BrainCircuit",
    isComingSoon: true,
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Learn ethical hacking, secure coding, and protect systems from external threats.",
    iconType: "ShieldAlert",
    isComingSoon: true,
  },
  {
    id: "devops",
    title: "DevOps",
    description: "Automate deployments, manage cloud infrastructure, and build resilient CI/CD pipelines.",
    iconType: "Server",
    isComingSoon: true,
  },
  {
    id: "game-development",
    title: "Game Development",
    description: "Create immersive worlds, physics engines, and interactive multiplayer experiences.",
    iconType: "Gamepad2",
    isComingSoon: true,
  },
];
