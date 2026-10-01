import styles from "./ProjectsContent.module.css";
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
      {projects.map((project) => (
        <article key={project.projectId} className={styles.projectItem}>
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
            <p className={styles.projectImageLink}>
              Image currently unavailable.
            </p>
          )}

          <div className={styles.projectHeader}>
            <div className={styles.projectTitle}>
              <h2>{project.projectName || "Untitled Project"}</h2>
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
            </div>

            <div className={styles.projectDescription}>
              <h3>What it is</h3>
              <p>
                {project.projectDescription ||
                  "Description currently unavailable."}
              </p>
            </div>

            <div className={styles.projectTechStackSection}>
              <h3>Tech Stack</h3>
              <ul className={styles.projectTechStack}>
                {project.projectTechStack
                  ? project.projectTechStack.map((tech) => (
                      <li key={tech.name || "unknown-tech"}>
                        <Image
                          src={tech.path || "/icons/vscode.png"}
                          alt={tech.name || "Unknown Tech"}
                          title={tech.name}
                          width={50}
                          height={50}
                        />
                      </li>
                    ))
                  : "Tech stack currently unavailable."}
              </ul>
            </div>

            <div className={styles.projectLinks}>
              {project.projectCode?.link ? (
                <a
                  href={project.projectCode.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectCodeLink}
                >
                  {project.projectCode.label || "Inspect Code"}
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
                  {project.projectDemo.label || "Live Demo"}
                </a>
              ) : (
                <span>Demo currently unavailable.</span>
              )}
            </div>
          </div>

          <div className={styles.projectDetails}>
            <div className={styles.projectWhy}>
              <h3>Why I built it</h3>
              <ul>
                {project.projectWhy
                  ? project.projectWhy.map((reason, index) => (
                      <li key={index}>{reason}</li>
                    ))
                  : "Reasons currently unavailable."}
              </ul>
            </div>

            <div className={styles.projectLearned}>
              <h3>What I learned</h3>
              <ul>
                {project.projectLearned?.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      ))}
    </main>
  );
}
