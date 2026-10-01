"use client";

import styles from "./page.module.css";
import { GlassCard } from "@developer-hub/liquid-glass";
import SearchBar from "@/components/Search Bar/SearchBar";
import InteractiveBackground from "@/components/Interactive Background/InteractiveBackground";
import PageModal from "@/components/Page Modal/PageModal";
import LegendModal from "@/components/Legend Modal/LegendModal";
import { useState, useEffect } from "react";
import Loader from "@/components/Loader/Loader";
import Rotater from "@/components/Rotater/Rotater";
import { AnimatePresence } from "framer-motion";

const BASE_WIDTH = 1610;
const BASE_HEIGHT = 900;

export default function Home() {
  const [modalContent, setModalContent] = useState(null);
  const [legendContent, setLegendContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);
  const [isPhone, setIsPhone] = useState(null);
  const [isPortrait, setIsPortrait] = useState(false);

  const [viewport, setViewport] = useState({ w: BASE_WIDTH, h: BASE_HEIGHT });

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
      const widthRatio = window.innerWidth / BASE_WIDTH;
      const heightRatio = window.innerHeight / BASE_HEIGHT;
      const newScale = Math.min(widthRatio, heightRatio);

      setScale(newScale);
      setViewport({
        w: window.innerWidth,
        h: window.innerHeight,
      });

      setIsPhone(Math.min(window.innerWidth, window.innerHeight) <= 500);
      setIsPortrait(window.innerHeight > window.innerWidth);
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
      {isPhone === null && <div className={styles.cover}></div>}

      <AnimatePresence>
        {isPhone === false && isLoading && <Loader />}
      </AnimatePresence>

      <AnimatePresence>
        {isPhone === true && isPortrait && <Rotater />}
      </AnimatePresence>

      <main
        className={styles.main}
        style={{
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          width: `${viewport.w / scale}px`,
          height: `${viewport.h / scale}px`,
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
