"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "@/assets/rotate-animation.json";
import styles from "./Rotater.module.css";

export default function Rotater() {
  return (
    <motion.div
      className={styles.rotater}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ width: 250 }}
      />
    </motion.div>
  );
}
