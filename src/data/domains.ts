export type Domain = {
  id: string;
  title: string;
  description: string;
  iconType: string;
  isComingSoon?: boolean;
  roles?: string[];
} & Record<string, unknown>;

export const DOMAINS: Domain[] = [
  {
    id: "web-development",
    title: "Web Development",
    description: "Master the foundational languages and frameworks of the open web. From pixels to microservices.",
    iconType: "Globe",
    roles: [
      "Frontend Engineer", "Backend Developer", "Full Stack Developer", "Next.js Expert",
      "API Architect", "Web Performance Engineer", "TypeScript Developer", "Jamstack Architect"
    ],
  },
  {
    id: "ai-ml",
    title: "AI / Future Tech",
    description: "Train neural networks, understand LLMs, and build the intelligent systems of tomorrow.",
    iconType: "BrainCircuit",
    isComingSoon: true,
    roles: ["AI Product Engineer", "Generative AI Developer", "AI UX Engineer", "AI Interface Designer"],
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    description: "Learn ethical hacking, secure coding, and protect systems from external threats.",
    iconType: "ShieldAlert",
    isComingSoon: true,
    roles: ["Security Engineer", "Ethical Hacker", "AppSec Specialist", "Network Security"],
  },
  {
    id: "devops",
    title: "Infrastructure & DevOps",
    description: "Automate deployments, manage cloud infrastructure, and build resilient CI/CD pipelines.",
    iconType: "Server",
    isComingSoon: true,
    roles: ["DevOps Engineer", "Cloud Architect", "SRE", "Platform Engineer"],
  },
  {
    id: "ui-ux",
    title: "Design & Experience",
    description: "Design intuitive interfaces, user journeys, and high-fidelity prototypes.",
    iconType: "Pencil",
    isComingSoon: true,
    roles: ["Product Designer", "Interaction Designer", "Motion Designer", "Design Systems"],
  },
  {
    id: "game-development",
    title: "Game & Interactive",
    description: "Create immersive worlds, browser games, and WebXR experiences.",
    iconType: "Gamepad2",
    isComingSoon: true,
    roles: ["Browser Game Developer", "WebXR Developer", "Metaverse Engineer"],
  },
  {
    id: "leadership",
    title: "Management & Leadership",
    description: "Scale teams, define technical strategy, and lead engineering organizations.",
    iconType: "Users",
    isComingSoon: true,
    roles: ["Engineering Manager", "Tech Lead", "VP of Engineering", "CTO"],
  },
  {
    id: "business",
    title: "Business & Growth",
    description: "Build SaaS products, launch agencies, and master the art of technical entrepreneurship.",
    iconType: "Trophy",
    isComingSoon: true,
    roles: ["Technical Founder", "SaaS Developer", "Freelance Consultant", "Agency Owner"],
  },
  {
    id: "content",
    title: "Content & Education",
    description: "Teach code, build community, and contribute to the global open source ecosystem.",
    iconType: "LayoutDashboard",
    isComingSoon: true,
    roles: ["Developer Advocate", "Technical Writer", "Instructor", "OSS Maintainer"],
  },
];
