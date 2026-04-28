import aboutData from "./about.json";
import projectsData from "./projects.json";
import contactData from "./contact.json";

export const searchIndex = [
  {
    id: "about-intro",
    page: "About",
    section: "Introduction",
    content: aboutData.about.introduction,
    href: "/about",
  },
  {
    id: "about-interests",
    page: "About",
    section: "Interests",
    content: aboutData.about.interests,
    href: "/about",
  },
  {
    id: "about-skills-core-stack",
    page: "About",
    section: "Skills — Core Stack",
    content: aboutData.skills
      .find((skill) => skill.label === "Core Stack")
      .items.join(", "),
    href: "/about",
  },
  {
    id: "about-skills-tools",
    page: "About",
    section: "Skills — Tools",
    content: aboutData.skills
      .find((skill) => skill.label === "Tools")
      .items.join(", "),
    href: "/about",
  },
  {
    id: "about-skills-familiar",
    page: "About",
    section: "Skills — Getting Familiar With",
    content: aboutData.skills
      .find((skill) => skill.label === "Getting Familiar With")
      .items.join(", "),
    href: "/about",
  },
  {
    id: "about-facts-location",
    page: "About",
    section: "Facts — Location",
    content: aboutData.facts.find((fact) => fact.label === "Location").value,
    href: "/about",
  },
  {
    id: "about-facts-languages",
    page: "About",
    section: "Facts — Languages",
    content: aboutData.facts
      .find((fact) => fact.label === "Languages")
      .items.join(", "),
    href: "/about",
  },
  {
    id: "about-facts-education",
    page: "About",
    section: "Facts — Education",
    content: aboutData.facts.find((fact) => fact.label === "Education").value,
    href: "/about",
  },
  {
    id: "about-facts-status",
    page: "About",
    section: "Facts — Status",
    content: aboutData.facts.find((fact) => fact.label === "Status").value,
    href: "/about",
  },
  ...contactData.contactDetails.map((contact) => ({
    id: `contact-${contact.id}`,
    page: "Contact",
    section: `Contact Details — ${contact.label}`,
    content: contact.value ?? contact.label,
    href: "/contact",
  })),
  ...contactData.socials.map((social) => ({
    id: `contact-social-${social.id}`,
    page: "Contact",
    section: `Socials — ${social.label}`,
    content: social.label,
    href: "/contact",
  })),
  ...projectsData.map((project) => ({
    id: `project-${project.projectId}`,
    page: "Projects",
    section: project.projectName,
    content: [
      project.projectDescription,
      project.projectMeta.role,
      project.projectMeta.scope,
      project.projectTechStack.map((tech) => tech.name).join(", "),
    ].join(" — "),
    href: "/projects",
  })),
];
