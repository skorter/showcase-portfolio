import Link from "next/link";
import styles from "./HomeTiles.module.css";

const tiles = [
    {title: "About Me", href: "/about"},
    {title: "Experience", href: "/experience"},
    {title: "Projects", href: "/projects"},
    {title: "Contact", href: "/contact"},
]

export default function HomeTiles() {
    return (
        <div className={styles.tiles}>
            {tiles.map((tile) => (
                <Link className={styles.tileWrapper} key={tile.title} href={tile.href}>
                    <div className={styles.folder}>
                        <div className={styles.folderBack}></div>
                        <div className={styles.inner}>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                            <div className={styles.item}></div>
                        </div>
                        <div className={styles.folderFront}>
                            
                        </div>
                        <div className={`${styles.folderFront} ${styles.right}`}></div>
                    </div>
                    <p className={styles.title}>{tile.title}</p>
                </Link>
                ))}
        </div>
    );
}