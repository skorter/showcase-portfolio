"use client";

import styles from "./page.module.css";
import { GlassCard } from "@developer-hub/liquid-glass";
import SearchBar from "@/components/Search Bar/SearchBar";
import InteractiveBackground from "@/components/Interactive Background/InteractiveBackground";
import PageModal from "@/components/Page Modal/PageModal";
import LegendModal from "@/components/Legend Modal/LegendModal";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import { AnimatePresence } from "framer-motion";

export default function Home() {
  const [modalContent, setModalContent] = useState(null);
  const [legendContent, setLegendContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const BASE_WIDTH = 1610;

  useEffect(() => {
    let loaded = false;
    let timerDone = false;

    function checkIfReady() {
      if (loaded && timerDone) {
        setIsLoading(false);
      }
    }

    if (document.readyState === "complete") {
      loaded = true;
      checkIfReady();
    } else {
      window.addEventListener("load", () => {
        loaded = true;
        checkIfReady();
      });
    }

    setTimeout(() => {
      timerDone = true;
      checkIfReady();
    }, 2000);

    return () => {
      window.removeEventListener("load", checkIfReady);
    };
  }, []);

  useEffect(() => {
    function updateScale() {
      const ratio = window.innerWidth / BASE_WIDTH;
      setScale(ratio);
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  function closeModal() {
    setModalContent(null);
  }

  function closeLegend() {
    setLegendContent(null);
  }

  return (
    <>
      <AnimatePresence>{isLoading && <Loader />}</AnimatePresence>

      <main
        className={styles.main}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${BASE_WIDTH}px`,
          height: `${100 / scale}vh`,
        }}
      >
        <section className={styles.interactiveBackground}>
          <InteractiveBackground
            requestModalChange={setModalContent}
            modalOpen={!!modalContent}
            requestLegendChange={setLegendContent}
            legendOpen={!!legendContent}
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
          <PageModal
            modalContent={modalContent}
            requestModalChange={setModalContent}
            closeModal={closeModal}
          />
        </section>

        <section className={styles.legendModal}>
          {legendContent && <div className={styles.legendBackdrop}></div>}
          <LegendModal
            legendContent={legendContent}
            closeLegend={closeLegend}
          />
        </section>
      </main>
    </>
  );
}
