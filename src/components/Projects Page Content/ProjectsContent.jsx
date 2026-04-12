import styles from "./ProjectsContent.module.css";
import Masonry from "@mui/lab/Masonry";
import projectsData from "../../data/projects.json";
import Image from "next/image";

export default function ProjectsContent() {
  const projects = [...projectsData].sort((a, b) => {
    const dateA = a.projectMeta?.date?.value || "";
    const dateB = b.projectMeta?.date?.value || "";
    return dateB.localeCompare(dateA);
  });

  return (
    <main className={styles.projectPageContent}>
      <Masonry
        columns={3}
        spacing={2}
        defaultHeight={450}
        defaultColumns={4}
        defaultSpacing={2}
        sequential
      >
        {projects.map((project) => (
          <div key={project.projectId} className={styles.projectItem}>
            {project.projectImage ? (
              <a
                href={project.projectDemo?.link || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.projectImageLink}
              >
                <Image
                  src={project.projectImage}
                  alt={project.projectName || "Project Image"}
                  width={300}
                  height={150}
                />
              </a>
            ) : (
              <p>Image currently unavailable.</p>
            )}

            <h2>{project.projectName || "Untitled Project"}</h2>

            <p>
              {project.projectDescription ||
                "Description currently unavailable."}
            </p>

            <ul className={styles.projectMeta}>
              <li>
                {project.projectMeta?.role || "Role currently unavailable."}
              </li>
              <li>
                {project.projectMeta?.scope || "Scope currently unavailable."}
              </li>
              <li>
                {project.projectMeta?.date ? (
                  <time dateTime={project.projectMeta.date.value}>
                    {project.projectMeta.date.label}
                  </time>
                ) : (
                  "Date currently unavailable."
                )}
              </li>
            </ul>

            <ul className={styles.projectTechStack}>
              {project.projectTechStack
                ? project.projectTechStack.map((tech) => (
                    <li key={tech.name || "unknown-tech"}>
                      <Image
                        src={tech.path || "/icons/vscode.png"}
                        alt={tech.name || "Unknown Tech"}
                        width={50}
                        height={50}
                      />
                    </li>
                  ))
                : "Tech stack currently unavailable."}
            </ul>

            <div className={styles.projectLinks}>
              {project.projectCode?.link ? (
                <a
                  href={project.projectCode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectCodeLink}
                >
                  {project.projectCode.label || "Code currently unavailable."}
                </a>
              ) : (
                <span>Code currently unavailable.</span>
              )}

              {project.projectDemo?.link ? (
                <a
                  href={project.projectDemo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectDemoLink}
                >
                  {project.projectDemo.label || "Demo currently unavailable."}
                </a>
              ) : (
                <span>Demo currently unavailable.</span>
              )}
            </div>
          </div>
        ))}
      </Masonry>
    </main>
  );
}
