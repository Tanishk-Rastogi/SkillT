export type SkillStatus = 'Locked' | 'Available' | 'Completed';
export type SkillDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type SkillRarity = 'Common' | 'Rare' | 'Epic' | 'Legendary';
export type SkillVisualType = 'Core' | 'Utility' | 'Theory' | 'Tool';
export type { MasteryTier } from '@/data/challenges';

export type ResourceItem = {
  title: string;
  url: string;
  description?: string;
};

export type LearningResources = {
  freeCourses: ResourceItem[];
  paidCourses: ResourceItem[];
  youtube: ResourceItem[];
  articles: ResourceItem[];
};

export type Skill = {
  id: string;
  title: string;
  description: string;
  whyItExists: string;
  whyItMatters: string;
  realWorldUsage: string;
  usedIn: string[];
  difficulty: SkillDifficulty;
  domainsUsedIn: string[];
  rolesUsedIn: string[];
  unlocks: string[];
  prerequisites: string[];
  relatedSkills: string[];
  xpValue: number;
  estimatedLearningTime: string;
  recommendedProjects: string[];
  learningResources: LearningResources;
  practicePlatforms: ResourceItem[];
  documentationLinks: ResourceItem[];
  githubRepos: ResourceItem[];
  tags: string[];
  rarity: SkillRarity;
  visualType: SkillVisualType;
  category: string;
  universalSkill: boolean;
  status: SkillStatus;
  masteryTier?: import('@/data/challenges').MasteryTier;
  challengeIds?: string[];
} & Record<string, unknown>;

export const INITIAL_SKILLS: Skill[] = [
  // --- UNIVERSAL SKILLS ---
  {
    id: 'git-version-control',
    title: 'Git Version Control',
    description: 'Track changes, collaborate with others, and manage code versions.',
    whyItExists: 'Before version control, developers copied files (e.g., index_v2_final.html) to save history. Git was created by Linus Torvalds to allow thousands of developers to work on the Linux kernel simultaneously without overwriting each other\'s code.',
    whyItMatters: 'Git is the universal language of code collaboration. Without it, modern team development is impossible.',
    realWorldUsage: 'Every professional software team uses Git to manage their codebase, review code via Pull Requests, and trigger automated deployments.',
    usedIn: [
      'Open Source Projects',
      'Corporate Codebases',
      'Continuous Integration Pipelines',
      'Agile Team Collaboration'
    ],
    difficulty: 'Beginner',
    domainsUsedIn: ['Web Development', 'AI / Machine Learning', 'Cybersecurity', 'DevOps', 'Game Development'],
    rolesUsedIn: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer', 'Cloud Engineer'],
    unlocks: ['ci-cd', 'advanced-git'],
    prerequisites: [],
    relatedSkills: ['github', 'linux-basics'],
    xpValue: 150,
    estimatedLearningTime: '10-15 Hours',
    recommendedProjects: [
      'Create a personal repository and push a basic HTML site.',
      'Simulate a merge conflict and resolve it locally.',
      'Contribute to a beginner-friendly open-source project.'
    ],
    learningResources: {
      freeCourses: [
        { title: 'Git & GitHub Crash Course for Beginners', url: '#' }
      ],
      paidCourses: [
        { title: 'The Complete Git Guide: Understand and master Git and GitHub', url: '#' }
      ],
      youtube: [
        { title: 'Git Tutorial for Beginners: Learn Git in 1 Hour', url: '#' }
      ],
      articles: [
        { title: 'A successful Git branching model', url: '#' }
      ]
    },
    practicePlatforms: [
      { title: 'Learn Git Branching (Interactive Sandbox)', url: '#' }
    ],
    documentationLinks: [
      { title: 'Official Git Documentation', url: '#' }
    ],
    githubRepos: [
      { title: 'First Contributions', url: '#' }
    ],
    tags: ['Version Control', 'Collaboration', 'Terminal', 'CLI'],
    rarity: 'Legendary',
    visualType: 'Core',
    category: 'Tooling',
    universalSkill: true,
    status: 'Available',
  },
  {
    id: 'apis-rest',
    title: 'RESTful APIs',
    description: 'Understand how systems communicate over HTTP using REST principles.',
    whyItExists: 'As applications grew, they needed a standardized way to request and send data across the internet. REST was introduced as a scalable, stateless architecture for web services.',
    whyItMatters: 'APIs are the connective tissue of the modern web. Every time you log in, fetch a weather forecast, or send a message, an API is doing the heavy lifting.',
    realWorldUsage: 'Fetching user data from a database, processing Stripe payments, getting real-time stock quotes, or integrating Google Maps.',
    usedIn: [
      'Mobile App Backends',
      'Microservices Architecture',
      'Third-party Integrations (Stripe, Twilio)',
      'Single Page Applications (SPAs)'
    ],
    difficulty: 'Intermediate',
    domainsUsedIn: ['Web Development', 'AI / Machine Learning', 'Mobile Development'],
    rolesUsedIn: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
    unlocks: ['graphql', 'microservices'],
    prerequisites: ['js-basics'],
    relatedSkills: ['authentication', 'databases-sql'],
    xpValue: 200,
    estimatedLearningTime: '20-30 Hours',
    recommendedProjects: [
      'Weather App using the OpenWeather API',
      'Movie Database explorer using TMDB API',
      'Build your own simple REST API with Node.js and Express'
    ],
    learningResources: {
      freeCourses: [
        { title: 'Postman API Fundamentals Student Expert', url: '#' }
      ],
      paidCourses: [
        { title: 'REST API Design, Development & Management', url: '#' }
      ],
      youtube: [
        { title: 'What is an API? (REST, GraphQL, gRPC)', url: '#' }
      ],
      articles: [
        { title: 'Best Practices for Designing a Pragmatic RESTful API', url: '#' }
      ]
    },
    practicePlatforms: [
      { title: 'JSONPlaceholder (Fake REST API for testing)', url: '#' }
    ],
    documentationLinks: [
      { title: 'MDN Web Docs: HTTP API', url: '#' }
    ],
    githubRepos: [
      { title: 'Public APIs Directory', url: '#' }
    ],
    tags: ['Architecture', 'HTTP', 'Backend', 'Data Fetching'],
    rarity: 'Epic',
    visualType: 'Core',
    category: 'Architecture',
    universalSkill: true,
    status: 'Locked',
  },
  // STUBBED DATA FOR REMAINING SKILLS
  {
    id: 'authentication',
    title: 'Authentication & JWT',
    description: 'Secure applications by verifying user identities.',
    whyItExists: 'To verify who a user is and ensure they only access data they are authorized to see.',
    whyItMatters: 'Security is paramount. Knowing how to protect routes and user data is a non-negotiable skill.',
    realWorldUsage: 'Login systems, protected dashboards, OAuth with Google.',
    usedIn: ['SaaS Platforms', 'E-commerce', 'Social Media'],
    difficulty: 'Advanced',
    domainsUsedIn: ['Web Development', 'Cybersecurity'],
    rolesUsedIn: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
    unlocks: ['oauth', 'sso'],
    prerequisites: ['apis-rest'],
    relatedSkills: ['cybersecurity-basics'],
    xpValue: 250,
    estimatedLearningTime: '25 Hours',
    recommendedProjects: ['Build a custom login system with JWT'],
    learningResources: { freeCourses: [], paidCourses: [], youtube: [], articles: [] },
    practicePlatforms: [],
    documentationLinks: [],
    githubRepos: [],
    tags: ['Security', 'JWT', 'Sessions'],
    rarity: 'Epic',
    visualType: 'Theory',
    category: 'Security',
    universalSkill: true,
    status: 'Locked',
  },
  {
    id: 'databases-sql',
    title: 'SQL Databases',
    description: 'Store, query, and manage relational data.',
    whyItExists: 'To store structured data durably and query it efficiently.',
    whyItMatters: 'Data is the core of any application. SQL is the industry standard for reliable data management.',
    realWorldUsage: 'Storing user accounts, product inventories, and financial records.',
    usedIn: ['Enterprise Software', 'Banking Systems', 'Content Management Systems'],
    difficulty: 'Intermediate',
    domainsUsedIn: ['Web Development', 'Data Science', 'Backend Engineering'],
    rolesUsedIn: ['Backend Developer', 'Fullstack Developer'],
    unlocks: ['advanced-sql', 'orm-prisma'],
    prerequisites: ['node-basics'],
    relatedSkills: ['nosql', 'caching'],
    xpValue: 200,
    estimatedLearningTime: '40 Hours',
    recommendedProjects: ['Design a schema for an e-commerce store'],
    learningResources: { freeCourses: [], paidCourses: [], youtube: [], articles: [] },
    practicePlatforms: [],
    documentationLinks: [],
    githubRepos: [],
    tags: ['Data', 'Storage', 'Relational'],
    rarity: 'Epic',
    visualType: 'Core',
    category: 'Database',
    universalSkill: true,
    status: 'Locked',
  },

  // --- ROLE-SPECIFIC SKILLS ---
  {
    id: 'html-basics',
    title: 'HTML Basics',
    description: 'Learn the foundational building blocks of the web.',
    whyItExists: 'To provide semantic structure to documents shared over the internet.',
    whyItMatters: 'Every website starts with HTML. It provides the semantic structure for all web content.',
    realWorldUsage: 'Building the skeleton of any website or web application.',
    usedIn: ['All Websites', 'Emails', 'Web Apps'],
    difficulty: 'Beginner',
    domainsUsedIn: ['Web Development'],
    rolesUsedIn: ['Frontend Developer', 'Fullstack Developer'],
    unlocks: ['css-basics', 'js-basics'],
    prerequisites: [],
    relatedSkills: ['accessibility'],
    xpValue: 50,
    estimatedLearningTime: '5 Hours',
    recommendedProjects: ['Build a semantic personal portfolio page'],
    learningResources: { freeCourses: [], paidCourses: [], youtube: [], articles: [] },
    practicePlatforms: [],
    documentationLinks: [],
    githubRepos: [],
    tags: ['Markup', 'Web', 'Structure'],
    rarity: 'Common',
    visualType: 'Core',
    category: 'HTML',
    universalSkill: false,
    status: 'Available',
  },
  {
    id: 'css-basics',
    title: 'CSS Fundamentals',
    description: 'Style your HTML with colors, fonts, and layouts.',
    whyItExists: 'To separate the visual presentation of a document from its structural HTML content.',
    whyItMatters: 'CSS turns boring documents into beautiful, engaging user experiences.',
    realWorldUsage: 'Styling buttons, creating grid layouts, and implementing dark mode.',
    usedIn: ['Web Interfaces', 'Mobile Web Views', 'UI Component Libraries'],
    difficulty: 'Beginner',
    domainsUsedIn: ['Web Development'],
    rolesUsedIn: ['Frontend Developer', 'Fullstack Developer'],
    unlocks: ['responsive-design'],
    prerequisites: ['html-basics'],
    relatedSkills: ['ui-ux'],
    xpValue: 50,
    estimatedLearningTime: '15 Hours',
    recommendedProjects: ['Style your portfolio with Flexbox and CSS Grid'],
    learningResources: { freeCourses: [], paidCourses: [], youtube: [], articles: [] },
    practicePlatforms: [],
    documentationLinks: [],
    githubRepos: [],
    tags: ['Styling', 'Design', 'Layout'],
    rarity: 'Common',
    visualType: 'Core',
    category: 'CSS',
    universalSkill: false,
    status: 'Locked',
  },
  {
    id: 'js-basics',
    title: 'JavaScript Basics',
    description: 'Add interactivity and logic to your web pages.',
    whyItExists: 'To make static HTML pages dynamic and interactive directly in the browser.',
    whyItMatters: 'JS is the only programming language native to web browsers. It powers all frontend logic.',
    realWorldUsage: 'Handling button clicks, validating forms, and fetching data from APIs.',
    usedIn: ['Interactive Web Apps', 'Browser Extensions', 'Web Games'],
    difficulty: 'Beginner',
    domainsUsedIn: ['Web Development'],
    rolesUsedIn: ['Frontend Developer', 'Backend Developer', 'Fullstack Developer'],
    unlocks: ['dom-manipulation', 'apis-rest', 'node-basics'],
    prerequisites: ['html-basics'],
    relatedSkills: ['typescript'],
    xpValue: 100,
    estimatedLearningTime: '30 Hours',
    recommendedProjects: ['Build a Todo List application'],
    learningResources: { freeCourses: [], paidCourses: [], youtube: [], articles: [] },
    practicePlatforms: [],
    documentationLinks: [],
    githubRepos: [],
    tags: ['Programming', 'Logic', 'Web'],
    rarity: 'Common',
    visualType: 'Core',
    category: 'JavaScript',
    universalSkill: false,
    status: 'Locked',
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design',
    description: 'Make your websites look great on any device.',
    whyItExists: 'Because users access the web from thousands of different device sizes, from smartwatches to 4K monitors.',
    whyItMatters: 'Most web traffic is mobile. Sites must adapt to screens of all sizes.',
    realWorldUsage: 'Creating fluid layouts with media queries that stack columns on mobile.',
    usedIn: ['Mobile Web', 'Dashboards', 'Landing Pages'],
    difficulty: 'Intermediate',
    domainsUsedIn: ['Web Development'],
    rolesUsedIn: ['Frontend Developer', 'Fullstack Developer'],
    unlocks: ['tailwind-css'],
    prerequisites: ['css-basics'],
    relatedSkills: ['mobile-first'],
    xpValue: 75,
    estimatedLearningTime: '10 Hours',
    recommendedProjects: ['Make your portfolio fully responsive'],
    learningResources: { freeCourses: [], paidCourses: [], youtube: [], articles: [] },
    practicePlatforms: [],
    documentationLinks: [],
    githubRepos: [],
    tags: ['CSS', 'Mobile-First', 'UX'],
    rarity: 'Rare',
    visualType: 'Utility',
    category: 'CSS',
    universalSkill: false,
    status: 'Locked',
  },
  {
    id: 'react-basics',
    title: 'React Fundamentals',
    description: 'Learn component-based architecture with React.',
    whyItExists: 'Created by Facebook to solve the problem of managing complex UI state at scale using declarative components.',
    whyItMatters: 'React is the industry standard for building scalable, complex frontend applications.',
    realWorldUsage: 'Building single-page applications like Facebook, Netflix, and Airbnb.',
    usedIn: ['SPAs', 'Admin Panels', 'Cross-platform Mobile (React Native)'],
    difficulty: 'Intermediate',
    domainsUsedIn: ['Web Development'],
    rolesUsedIn: ['Frontend Developer', 'Fullstack Developer'],
    unlocks: ['state-management'],
    prerequisites: ['js-basics', 'dom-manipulation'],
    relatedSkills: ['nextjs'],
    xpValue: 150,
    estimatedLearningTime: '40 Hours',
    recommendedProjects: ['Build a movie search app using the TMDB API and React'],
    learningResources: { freeCourses: [], paidCourses: [], youtube: [], articles: [] },
    practicePlatforms: [],
    documentationLinks: [],
    githubRepos: [],
    tags: ['Framework', 'Components', 'UI'],
    rarity: 'Epic',
    visualType: 'Core',
    category: 'React',
    universalSkill: false,
    status: 'Locked',
  },
  {
    id: 'dom-manipulation',
    title: 'DOM Manipulation',
    description: 'Interact with the HTML document using JavaScript.',
    whyItExists: 'To allow JavaScript to read, change, add, or delete HTML elements and attributes dynamically.',
    whyItMatters: 'Understanding the DOM is essential before moving to abstractions like React.',
    realWorldUsage: 'Creating custom dropdowns, sliders, or modal windows without frameworks.',
    usedIn: ['Vanilla JS Apps', 'Legacy Codebases', 'Performance-critical animations'],
    difficulty: 'Intermediate',
    domainsUsedIn: ['Web Development'],
    rolesUsedIn: ['Frontend Developer'],
    unlocks: ['react-basics'],
    prerequisites: ['js-basics'],
    relatedSkills: ['browser-apis'],
    xpValue: 100,
    estimatedLearningTime: '15 Hours',
    recommendedProjects: ['Build an interactive image carousel'],
    learningResources: { freeCourses: [], paidCourses: [], youtube: [], articles: [] },
    practicePlatforms: [],
    documentationLinks: [],
    githubRepos: [],
    tags: ['JavaScript', 'Browser', 'API'],
    rarity: 'Rare',
    visualType: 'Theory',
    category: 'JavaScript',
    universalSkill: false,
    status: 'Locked',
  },
  {
    id: 'node-basics',
    title: 'Node.js Basics',
    description: 'Run JavaScript on the server.',
    whyItExists: 'Created to build scalable network applications by taking the V8 JS engine out of the browser.',
    whyItMatters: 'Node enables fullstack JS development, allowing frontend devs to build backends easily.',
    realWorldUsage: 'Building REST APIs, real-time chat servers, and command-line tools.',
    usedIn: ['Backend Servers', 'Microservices', 'CLI Tools'],
    difficulty: 'Intermediate',
    domainsUsedIn: ['Web Development'],
    rolesUsedIn: ['Backend Developer', 'Fullstack Developer'],
    unlocks: ['databases-sql'],
    prerequisites: ['js-basics'],
    relatedSkills: ['express', 'npm'],
    xpValue: 150,
    estimatedLearningTime: '25 Hours',
    recommendedProjects: ['Build a basic Express REST API'],
    learningResources: { freeCourses: [], paidCourses: [], youtube: [], articles: [] },
    practicePlatforms: [],
    documentationLinks: [],
    githubRepos: [],
    tags: ['Backend', 'Server', 'JavaScript'],
    rarity: 'Rare',
    visualType: 'Core',
    category: 'Backend',
    universalSkill: false,
    status: 'Locked',
  }
];

// Mapping of which skills belong to which roles, and their positions on the tree
export interface RoleSkill {
  roleId: string;
  skillId: string;
  position: { x: number; y: number };
}

export const ROLE_SKILLS: RoleSkill[] = [
  // Frontend Developer Tree
  { roleId: 'frontend', skillId: 'git-version-control', position: { x: 400, y: -50 } },
  { roleId: 'frontend', skillId: 'html-basics', position: { x: 400, y: 100 } },
  { roleId: 'frontend', skillId: 'css-basics', position: { x: 250, y: 250 } },
  { roleId: 'frontend', skillId: 'js-basics', position: { x: 550, y: 250 } },
  { roleId: 'frontend', skillId: 'responsive-design', position: { x: 250, y: 400 } },
  { roleId: 'frontend', skillId: 'dom-manipulation', position: { x: 550, y: 400 } },
  { roleId: 'frontend', skillId: 'react-basics', position: { x: 550, y: 550 } },
  { roleId: 'frontend', skillId: 'apis-rest', position: { x: 400, y: 400 } },
  { roleId: 'frontend', skillId: 'authentication', position: { x: 400, y: 550 } },

  // Backend Developer Tree
  { roleId: 'backend', skillId: 'git-version-control', position: { x: 400, y: 100 } },
  { roleId: 'backend', skillId: 'js-basics', position: { x: 400, y: 250 } },
  { roleId: 'backend', skillId: 'node-basics', position: { x: 400, y: 400 } },
  { roleId: 'backend', skillId: 'apis-rest', position: { x: 250, y: 550 } },
  { roleId: 'backend', skillId: 'databases-sql', position: { x: 550, y: 550 } },
  { roleId: 'backend', skillId: 'authentication', position: { x: 250, y: 700 } },

  // Fullstack Developer Tree
  { roleId: 'fullstack', skillId: 'git-version-control', position: { x: 400, y: -50 } },
  { roleId: 'fullstack', skillId: 'html-basics', position: { x: 400, y: 100 } },
  { roleId: 'fullstack', skillId: 'css-basics', position: { x: 250, y: 250 } },
  { roleId: 'fullstack', skillId: 'js-basics', position: { x: 550, y: 250 } },
  { roleId: 'fullstack', skillId: 'react-basics', position: { x: 250, y: 400 } },
  { roleId: 'fullstack', skillId: 'node-basics', position: { x: 550, y: 400 } },
  { roleId: 'fullstack', skillId: 'apis-rest', position: { x: 400, y: 400 } },
  { roleId: 'fullstack', skillId: 'databases-sql', position: { x: 550, y: 550 } },
  { roleId: 'fullstack', skillId: 'authentication', position: { x: 400, y: 550 } },
];
