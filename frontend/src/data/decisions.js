export const decisions = [
  {
    id: "001",
    projectId: "P001",
    title: "Use PostgreSQL as the primary database",
    description:
      "The team decided to use PostgreSQL as the primary database for the analytics platform.",
    reason:
      "PostgreSQL was selected because the system was expected to handle complex queries and heavy analytical workloads.",
    owner: "Sai Hemanth",
    date: "Sep 24, 2026",
    status: "review",

    assumptions: [
      "The platform will handle heavy analytical queries.",
      "The data model will remain strongly relational.",
      "The team will need advanced SQL capabilities.",
    ],

    alternatives: [
      {
        name: "MongoDB",
        reason: "Flexible schema but less suitable for the expected relational workload.",
      },
      {
        name: "MySQL",
        reason: "Strong relational database but PostgreSQL provided better analytical capabilities for this use case.",
      },
    ],

    evidence: [
      "Initial analytics requirements",
      "Architecture discussion",
      "Database comparison",
    ],

    stakeholders: [
      "Backend Team",
      "Data Team",
      "Project Lead",
    ],

    decayDetected: true,

    decayMessage:
      "Analytics requirements have changed significantly. The original assumption of heavy analytical workloads may no longer hold.",
  },

  {
    id: "002",
    projectId: "P001",
    title: "Use React for the frontend",
    description:
      "The team decided to build the analytics platform interface using React.",
    reason:
      "React provides reusable components and works well for building a dynamic dashboard.",
    owner: "Frontend Team",
    date: "Sep 23, 2026",
    status: "active",

    assumptions: [
      "The application requires a dynamic user interface.",
      "The team can maintain a React codebase.",
    ],

    alternatives: [
      {
        name: "Vue",
        reason: "Considered but the team had more experience with React.",
      },
      {
        name: "Angular",
        reason: "Considered but was heavier for the initial application scope.",
      },
    ],

    evidence: [
      "Frontend architecture discussion",
      "Team technology evaluation",
    ],

    stakeholders: [
      "Frontend Team",
      "Project Lead",
    ],

    decayDetected: false,
    decayMessage: "",
  },

  {
    id: "003",
    projectId: "P004",
    title: "Use AWS for cloud infrastructure",
    description:
      "The team decided to deploy the application infrastructure using AWS.",
    reason:
      "AWS provides the required scalability, deployment options, and managed infrastructure services.",
    owner: "Infrastructure Team",
    date: "Sep 21, 2026",
    status: "active",

    assumptions: [
      "The application may need to scale over time.",
      "Managed cloud services will reduce infrastructure maintenance.",
    ],

    alternatives: [
      {
        name: "Azure",
        reason: "Considered because of its Microsoft ecosystem integration.",
      },
      {
        name: "Google Cloud",
        reason: "Considered for its data and AI services.",
      },
    ],

    evidence: [
      "Cloud architecture review",
      "Infrastructure requirements",
    ],

    stakeholders: [
      "Infrastructure Team",
      "Backend Team",
    ],

    decayDetected: false,
    decayMessage: "",
  },

  {
    id: "004",
    projectId: "P002",
    title: "Use JWT authentication",
    description:
      "The team decided to use JWT-based authentication for the application.",
    reason:
      "JWT provides a lightweight stateless authentication mechanism suitable for the application architecture.",
    owner: "Backend Team",
    date: "Sep 20, 2026",
    status: "active",

    assumptions: [
      "The application will use API-based authentication.",
      "Stateless authentication will simplify scaling.",
    ],

    alternatives: [
      {
        name: "Session-based authentication",
        reason: "Considered but required additional server-side session management.",
      },
    ],

    evidence: [
      "Authentication architecture discussion",
      "API design document",
    ],

    stakeholders: [
      "Backend Team",
      "Security Team",
    ],

    decayDetected: false,
    decayMessage: "",
  },

  {
    id: "005",
    projectId: "P003",
    title: "Use Redis for caching",
    description:
      "The team decided to use Redis to improve application response times.",
    reason:
      "Redis provides fast in-memory access for frequently requested data.",
    owner: "Development Team",
    date: "Sep 18, 2026",
    status: "active",

    assumptions: [
      "Frequently requested data can be cached.",
      "The application will experience repeated reads.",
    ],

    alternatives: [
      {
        name: "Application-level caching",
        reason: "Considered but harder to maintain consistently.",
      },
    ],

    evidence: [
      "Performance requirements",
      "Caching architecture discussion",
    ],

    stakeholders: [
      "Backend Team",
      "Performance Team",
    ],

    decayDetected: false,
    decayMessage: "",
  },
];