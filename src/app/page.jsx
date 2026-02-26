import styles from "./page.module.css";

import SearchBar from "@/components/Search Bar/SearchBar";
import InteractiveBackground from "@/components/Interactive Background/InteractiveBackground";

export default function Home() {
    
    return (
        <main className={styles.main}>

            <section className={styles.interactiveBackground}>
                    <InteractiveBackground />
            </section>

            <section className={styles.hero}>
                <div className={styles.intro}>
                    <h1 className={styles.title}>hi, i am sylvio makni</h1>
                    <h1 className={styles.subtitle}>welcome to my digital playground</h1>
                </div>

                <div className={styles.searchBar}>
                    <SearchBar />
                </div>
            </section>
        </main>
    );
}