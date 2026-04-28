"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "@/assets/loader-animation.json";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <motion.div
      className={styles.loader}
      exit={{ opacity: 1, scale: 2, y: "-400%" }}
      transition={{
        duration: 1.5,
        ease: [0.76, 0, 0.24, 1],
        scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
        y: { duration: 1.5, ease: [0.76, 0, 0.24, 1] },
      }}
      // exit={{ opacity: 1, scale: 10, y: "-800%" }}
      // transition={{
      //   duration: 1.5,
      //   ease: [0.76, 0, 0.24, 1],
      //   scale: { duration: 1, ease: [0.16, 1, 0.3, 1] },
      //   y: { duration: 1, ease: [0.76, 0, 0.24, 1] },
      // }}
    >
      <Lottie
        animationData={animationData}
        loop={false}
        style={{ width: 600 }}
      />
    </motion.div>
  );
}
