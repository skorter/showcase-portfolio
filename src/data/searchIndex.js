import aboutData from "./about.json";
import projectsData from "./projects.json";
import contactData from "./contact.json";

export const searchIndex = [
  {
    id: "about-intro",
    page: "About Me",
    section: "Introduction",
    content: aboutData.about.introduction,
    href: "/about",
  },
  {
    id: "about-interests",
    page: "About Me",
    section: "Interests",
    content: aboutData.about.interests,
    href: "/about",
  },
  {
    id: "about-skills-core-stack",
    page: "About Me",
    section: "Skills - Core Stack",
    content: aboutData.skills
      .find((skill) => skill.label === "Core Stack")
      .items.join(", "),
    href: "/about",
  },
  {
    id: "about-skills-tools",
    page: "About Me",
    section: "Skills - Tools",
    content: aboutData.skills
      .find((skill) => skill.label === "Tools")
      .items.join(", "),
    href: "/about",
  },
  {
    id: "about-skills-getting-familiar-with",
    page: "About Me",
    section: "Skills - Getting Familiar With",
    content: aboutData.skills
      .find((skill) => skill.label === "Getting Familiar With")
      .items.join(", "),
    href: "/about",
  },
  {
    id: "about-facts-location",
    page: "About Me",
    section: "Facts",
    content: aboutData.facts.find((fact) => fact.label === "Location").value,
    href: "/about",
  },
  {
    id: "about-facts-languages",
    page: "About Me",
    section: "Facts",
    content: aboutData.facts
      .find((fact) => fact.label === "Languages")
      .items.join(", "),
    href: "/about",
  },
  {
    id: "about-facts-education",
    page: "About Me",
    section: "Facts",
    content: aboutData.facts.find((fact) => fact.label === "Education").value,
    href: "/about",
  },
  {
    id: "about-facts-status",
    page: "About Me",
    section: "Facts",
    content: aboutData.facts.find((fact) => fact.label === "Status").value,
    href: "/about",
  },
  ...contactData.map((contact) => ({
    id: `contact-${contact.id}`,
    page: "Contact",
    section: contact.label,
    content: contact.label,
    href: "/contact",
  })),
  ...projectsData.map((project) => ({
    id: `project-${project.projectId}`,
    page: "Projects",
    section: project.projectName,
    content: ` ${project.projectDescription} ${project.projectMeta.role} ${project.projectMeta.scope} ${project.projectTechStack.map((t) => t.name).join(" ")}`,
    href: "/projects",
  })),
];
