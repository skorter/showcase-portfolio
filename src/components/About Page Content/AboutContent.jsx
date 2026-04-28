import styles from "./AboutContent.module.css";
import aboutData from "../../data/about.json";

export default function AboutContent() {
  return (
    <main className={styles.aboutPageContent}>
      <section className={styles.image}>
        <img src="/images/sylvio2.png" alt="Sylvio" />
      </section>

      <section className={styles.introduction}>
        <h2>About Me</h2>
        <p>{aboutData.about.introduction}</p>
      </section>

      <section className={styles.interests}>
        <h2>Interests</h2>
        <p>{aboutData.about.interests}</p>
      </section>

      <section className={styles.skills}>
        <h2>Skills</h2>
        <div className={styles.skillsContainer}>
          {aboutData.skills.map((group) => (
            <article key={group.label}>
              <h3>{group.label}</h3>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.facts}>
        <h2>Facts</h2>
        <div className={styles.factsContainer}>
          {aboutData.facts.map((fact) => (
            <article key={fact.label}>
              <h3>{fact.label}</h3>
              {fact.items ? (
                <ul>
                  {fact.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{fact.value}</p>
              )}
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
