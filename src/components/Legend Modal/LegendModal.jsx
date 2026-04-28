import styles from "./LegendModal.module.css";

import LegendContent from "../Legend Page Content/LegendContent";
import { Minimize } from "lucide-react";

export default function LegendModal({ closeLegend, legendContent }) {
  function className() {
    let className;
    if (legendContent) {
      className = styles.legendModal + " " + styles.open;
    } else {
      className = styles.legendModal;
    }
    return className;
  }

  return (
    <div className={className()}>
      <div className={styles.modalHeader}>
        <p className={styles.modalTitle}>Legend</p>
        <button onClick={closeLegend} className={styles.close}>
          <Minimize size={22} strokeWidth={3} />
        </button>
      </div>
      <LegendContent content={legendContent} />
    </div>
  );
}
