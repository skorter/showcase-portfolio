import styles from "./LegendContent.module.css";

import legendData from "../../data/legend.json";

export default function LegendContent() {
  return (
    <main className={styles.legendPageContent}>
      <section className={styles.section}>
        <h2>{legendData.pages.heading}</h2>
        {legendData.pages.items.map((item) => (
          <div key={item.label} className={styles.item}>
            <h3>{item.label}</h3>
            <p>{item.description}</p>
            <div className={styles.stickers}>
              {item.stickers.map((src) => (
                <img key={src} src={src} alt={item.label} />
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2>{legendData.navigation.heading}</h2>
        <p>{legendData.navigation.description}</p>
      </section>

      <section className={styles.section}>
        <h2>{legendData.pinned.heading}</h2>
        <p>{legendData.pinned.description}</p>
        <div className={styles.stickers}>
          {legendData.pinned.stickers.map((src) => (
            <img key={src} src={src} alt="pinned sticker" />
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>{legendData.toggles.heading}</h2>
        {legendData.toggles.items.map((item) => (
          <div key={item.label} className={styles.item}>
            <h3>{item.label}</h3>
            <p>{item.description}</p>
            <div className={styles.stickers}>
              {item.stickers.map((src) => (
                <img key={src} src={src} alt={item.label} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
