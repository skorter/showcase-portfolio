"use client";

import styles from "./page.module.css";
import { GlassCard } from "@developer-hub/liquid-glass";
import SearchBar from "@/components/Search Bar/SearchBar";
import InteractiveBackground from "@/components/Interactive Background/InteractiveBackground";
import PageModal from "@/components/Page Modal/PageModal";
import { useState } from "react";

export default function Home() {
  const [modalContent, setModalContent] = useState(null);

  function closeModal() {
    setModalContent(null);
  }

  return (
    <main className={styles.main}>
      <section className={styles.interactiveBackground}>
        <InteractiveBackground
          requestModalChange={setModalContent}
          modalOpen={!!modalContent}
        />
      </section>

      <GlassCard className={styles.glassCard} cornerRadius={16}>
        <section className={styles.hero}>
          <div className={styles.intro}>
            <h1 className={styles.title}>hi, i am sylvio makni</h1>
            <h1 className={styles.subtitle}>
              welcome to my digital playground
            </h1>
          </div>
          <SearchBar
            requestModalChange={setModalContent}
            modalOpen={!!modalContent}
          />
        </section>
      </GlassCard>

      <section className={styles.pageModal}>
        {modalContent && <div className={styles.modalBackdrop}></div>}
        <PageModal modalContent={modalContent} closeModal={closeModal} />
      </section>
    </main>
  );
}
