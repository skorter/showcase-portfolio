"use client";
import { Minimize, ChevronLast, ChevronFirst } from "lucide-react";
import styles from "./PageModal.module.css";
import AboutContent from "../About Page Content/AboutContent";
import ProjectsContent from "../Projects Page Content/ProjectsContent";
import ContactContent from "../Contact Page Content/ContactContent";

const pageContentMap = {
  About: <AboutContent />,
  Projects: <ProjectsContent />,
  Contact: <ContactContent />,
};

export default function PageModal({
  modalContent,
  closeModal,
  requestModalChange,
}) {
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

  function handleNext() {
    const pageTitles = Object.keys(pageContentMap);
    const currentIndex = pageTitles.indexOf(title);
    const nextIndex = (currentIndex + 1) % pageTitles.length;
    const nextTitle = pageTitles[nextIndex];
    requestModalChange({
      title: nextTitle,
      content: pageContentMap[nextTitle],
    });
  }

  function handlePrevious() {
    const pageTitles = Object.keys(pageContentMap);
    const currentIndex = pageTitles.indexOf(title);
    const previousIndex =
      (currentIndex - 1 + pageTitles.length) % pageTitles.length;
    const previousTitle = pageTitles[previousIndex];
    requestModalChange({
      title: previousTitle,
      content: pageContentMap[previousTitle],
    });
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
      <button className={styles.next} onClick={handleNext}>
        <ChevronLast size={22} strokeWidth={3} />
      </button>
      <button className={styles.previous} onClick={handlePrevious}>
        <ChevronFirst size={22} strokeWidth={3} />
      </button>
    </div>
  );
}
