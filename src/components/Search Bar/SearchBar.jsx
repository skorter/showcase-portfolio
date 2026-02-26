"use client"

import styles from "./SearchBar.module.css";
import { Search } from "lucide-react";
import Typewriter from "@/components/Type Writer/Typewriter";


export default function SearchBar() {
    return (
        <label className={styles.search}>
            <Search className={styles.searchIcon}/>
            <div className={styles.searchInputWrapper}>
                <input className={styles.searchInput} type="search" placeholder=" "/>
                <div className={styles.fakeSearchInputPlaceholder}><Typewriter/></div>
            </div>
        </label>
    );
}