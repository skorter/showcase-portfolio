"use client";
import { useState, useRef, useEffect } from "react";
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
});

const pageContentMap = {
  "About Me": <AboutContent />,
  Projects: <ProjectsContent />,
  Contact: <ContactContent />,
};

export default function SearchBar({ requestModalChange, modalOpen }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);

  function handleChange(e) {
    const value = e.target.value;
    setQuery(value);
    if (value.trim() === "") {
      setResults([]);
    } else {
      const searchResults = fuse.search(value).map((result) => result.item);
      setResults(searchResults);
    }
  }

  useEffect(() => {
    if (modalOpen) {
      setResults([]);
      setQuery("");
    }
  }, [modalOpen]);

  return (
    <label className={styles.search} ref={inputRef}>
      <Search className={styles.searchIcon} />
      <div className={styles.searchInputWrapper}>
        <input
          className={styles.searchInput}
          type="search"
          placeholder=" "
          value={query}
          onChange={handleChange}
        />
        <div className={styles.fakeSearchInputPlaceholder}>
          {query === "" && <Typewriter />}
        </div>
      </div>
      {results.length > 0 &&
        createPortal(
          <ul
            className={styles.searchResults}
            style={{
              position: "fixed",
              top: inputRef.current?.getBoundingClientRect().bottom,
              left: inputRef.current?.getBoundingClientRect().left,
              width: inputRef.current?.getBoundingClientRect().width,
            }}
          >
            {results.map((result) => (
              <li
                key={result.id}
                onClick={() => {
                  requestModalChange({
                    title: result.page,
                    content: pageContentMap[result.page],
                  });
                  setQuery("");
                  setResults([]);
                }}
              >
                <span>{result.section}</span>
                <span>{result.page}</span>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </label>
  );
}
