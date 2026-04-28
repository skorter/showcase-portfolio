"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./SearchBar.module.css";
import { Search } from "lucide-react";
import Typewriter from "@/components/Type Writer/Typewriter";
import { searchIndex } from "@/data/searchIndex";
import Fuse from "fuse.js";
import AboutContent from "../About Page Content/AboutContent";
import ProjectsContent from "../Projects Page Content/ProjectsContent";
import ContactContent from "../Contact Page Content/ContactContent";
import { createPortal } from "react-dom";

const fuse = new Fuse(searchIndex, {
  keys: ["page", "section", "content"],
  threshold: 0.3,
  minMatchCharLength: 3,
  ignoreLocation: true,
  useExtendedSearch: true,
});

const pageContentMap = {
  About: <AboutContent />,
  Projects: <ProjectsContent />,
  Contact: <ContactContent />,
};

function getSnippet(content, query, maxLen = 90) {
  if (!content) return "";
  const lower = content.toLowerCase();
  const idx = lower.indexOf(query.toLowerCase());
  if (idx === -1) {
    const trimmed = content.trim();
    return trimmed.slice(0, maxLen) + (trimmed.length > maxLen ? "…" : "");
  }
  const start = Math.max(0, idx - 24);
  const end = Math.min(content.length, idx + query.length + 48);
  return (
    (start > 0 ? "…" : "") +
    content.slice(start, end).trim() +
    (end < content.length ? "…" : "")
  );
}

export default function SearchBar({ requestModalChange, modalOpen }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [dropdownRect, setDropdownRect] = useState(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const wrapperRef = useRef(null);

  const updateRect = useCallback(() => {
    if (wrapperRef.current) {
      setDropdownRect(wrapperRef.current.getBoundingClientRect());
    }
  }, []);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    setActiveIndex(-1);
    if (value.trim() === "") {
      setResults([]);
    } else {
      setResults(fuse.search(`'${value}`).map((result) => result.item));
      updateRect();
    }
  }

  function selectResult(result) {
    requestModalChange({
      title: result.page,
      content: pageContentMap[result.page],
    });
    setQuery("");
    setResults([]);
  }

  useEffect(() => {
    function onPointerDown(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setResults([]);
        setQuery("");
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  useEffect(() => {
    if (!results.length) return;
    window.addEventListener("resize", updateRect);
    window.addEventListener("scroll", updateRect, true);
    return () => {
      window.removeEventListener("resize", updateRect);
      window.removeEventListener("scroll", updateRect, true);
    };
  }, [results.length, updateRect]);

  useEffect(() => {
    if (!modalOpen) {
      setResults([]);
      setQuery("");
    }
  }, [modalOpen]);

  return (
    <label className={styles.search} ref={wrapperRef}>
      <Search className={styles.searchIcon} />
      <div className={styles.searchInputWrapper}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder=" "
          value={query}
          onChange={handleChange}
          autoComplete="off"
        />
        <div className={styles.fakeSearchInputPlaceholder}>
          {query === "" && <Typewriter />}
        </div>
      </div>

      {results.length > 0 &&
        dropdownRect &&
        createPortal(
          <ul
            className={styles.searchResults}
            role="listbox"
            style={{
              position: "fixed",
              top: dropdownRect.bottom + 6,
              left: dropdownRect.left,
              width: dropdownRect.width,
              zIndex: 1000,
            }}
          >
            {results.map((result, i) => (
              <li
                key={result.id}
                role="option"
                aria-selected={i === activeIndex}
                className={`${styles.resultItem} ${i === activeIndex ? styles.resultItemActive : ""}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  selectResult(result);
                }}
              >
                <span className={styles.resultBody}>
                  <span className={styles.resultSection}>{result.section}</span>
                  <span className={styles.resultSnippet}>
                    {getSnippet(result.content, query)}
                  </span>
                </span>
                <span className={styles.resultPage}>{result.page} Page</span>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </label>
  );
}
