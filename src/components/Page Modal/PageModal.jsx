"use client";
import { Minimize } from "lucide-react";
import styles from "./PageModal.module.css";

export default function PageModal({ modalContent, closeModal }) {
  const title = modalContent?.title;
  const content = modalContent?.content;

  function className() {
    let className;
    if (modalContent) {
      className = styles.pageModal + " " + styles.open;
    } else {
      className = styles.pageModal;
    }
    return className;
  }

  return (
    <div className={className()}>
      <div className={styles.modalHeader}>
        <p className={styles.modalTitle}>{title}</p>
        <button onClick={closeModal} className={styles.close}>
          <Minimize size={22} strokeWidth={3} />
        </button>
      </div>
      <div className={styles.modalContent}>{content}</div>
    </div>
  );
}
