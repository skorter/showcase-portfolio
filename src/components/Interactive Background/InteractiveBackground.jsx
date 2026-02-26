"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSound } from "@/app/providers/SoundProvider";
import styles from "./InteractiveBackground.module.css";

const GRID = 40;

function snap(n, grid) {
    return Math.round(n / grid) * grid;
}

export default function StickerBoard() {
    const boardRef = useRef(null);
    const [boardSize, setBoardSize] = useState({ w: 0, h: 0 });
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();
    const { toggleSound } = useSound();
    const router = useRouter();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: "", content: "" });

    useEffect(() => {
        setMounted(true);
    }, []);

    // Replace these with your own sticker images in /public/stickers/
    const [stickers, setStickers] = useState(() => [
        { id: "s1", src: "/stickers/1.png", alt: "Rainbow", cx: -620, cy: -320, w: 210, h: 210, z: 1 },
        { id: "s2", src: "/stickers/2.png", alt: "Frieren", cx: -370, cy: -280, w: 170, h: 170, z: 2 },
        { id: "s3", src: "/stickers/3.png", alt: "Ice Coffee", cx: -500, cy: -90, w: 210, h: 210, z: 3 },
        { id: "s4", src: "/stickers/4.png", alt: "Cat With Headphones", cx: 375, cy: 280, w: 170, h: 170, z: 4 },
        { id: "s5", src: "/stickers/5.png", alt: "Absolute Vodka", cx: 520, cy: 320, w: 150, h: 150, z: 5 },
        { id: "s6", src: "/stickers/6.png", alt: "Rave Girl", cx: -480, cy: 300, w: 160, h: 160, z: 6 },
        { id: "s7", src: "/stickers/7.png", alt: "White Tote Bag", cx: 360, cy: 30, w: 180, h: 180, z: 7 },
        // { id: "s8", src: "/stickers/8.png", alt: "Black Tote Bag", cx: 360, cy: 300, w: 180, h: 180, z: 8 },
        { id: "s9", src: "/stickers/9.png", alt: "Annabelle", cx: -690, cy: 0, w: 150, h: 150, z: 9 },
        { id: "s10", src: "/stickers/10.png", alt: "Sylvio 1", href: "/about", cx: -355, cy: 0, w: 280, h: 280, z: 10 },
        { id: "s11", src: "/stickers/11.png", alt: "D.va Overwatch", cx: -80, cy: 310, w: 190, h: 190, z: 11 },
        { id: "s12", src: "/stickers/12.png", alt: "Mona Lisa", cx: -290, cy: 260, w: 140, h: 140, z: 12 },
        { id: "s13", src: "/stickers/13.png", alt: "Tarot Cards", cx: 180, cy: -270, w: 200, h: 200, z: 13 },
        { id: "s14", src: "/stickers/14.png", alt: "Airplane", cx: 640, cy: -300, w: 230, h: 230, z: 14 },
        { id: "s15", src: "/stickers/15.png", alt: "First Rule Of Programming", href: "/projects", cx: 160, cy: 300, w: 210, h: 210, z: 15 },
        { id: "s16", src: "/stickers/16.png", alt: "I hate Programming", href: "/projects", cx: -500, cy: 115, w: 170, h: 170, z: 16 },
        { id: "s17", src: "/stickers/17.png", alt: "Sylvio 2", href: "/about", cx: -680, cy: 270, w: 300, h: 300, z: 17 },
        { id: "s18", src: "/stickers/18.png", alt: "Sylvio 3", href: "/about", cx: 680, cy: 290, w: 280, h: 280, z: 18 },
        { id: "s19", src: "/stickers/19.png", alt: "Sylvio 4", href: "/about", cx: 430, cy: -210, w: 250, h: 250, z: 19 },
        { id: "s20", src: "/stickers/20.png", alt: "Lenovo Laptop", href: "/contact", cx: 525, cy: 120, w: 210, h: 210, z: 20 },
        { id: "s21", src: "/stickers/21.png", alt: "Rubics Cube", cx: 700, cy: 50, w: 100, h: 100, z: 21 },
        { id: "s22", src: "/stickers/22.png", alt: "Cat", cx: -110, cy: -340, w: 270, h: 270, z: 22 },
        { id: "s23", src: "/stickers/23.png", alt: "Diva", href: "/projects", cx: 550, cy: -20, w: 160, h: 160, z: 23 },
        { id: "s24", src: "/stickers/24.png", alt: "Git It Girl", href: "/projects", cx: -100, cy: -210, w: 160, h: 160, z: 24 },
        { id: "s25", src: "/stickers/25.png", alt: "Sun", cx: 650, cy: -140, w: 120, h: 120, z: 25 },
        // { id: "s26", src: "/stickers/26.png", alt: "Moon", cx: 660, cy: -130, w: 120, h: 120, z: 26 },
        { id: "s27", src: "/stickers/27.png", alt: "Phone", href: "/contact", cx: -640, cy: -165, w: 120, h: 120, z: 26 },
    ]);

    // Keep board size updated (for constraints)
    useLayoutEffect(() => {
        if (!boardRef.current) return;

        const ro = new ResizeObserver(([entry]) => {
        const cr = entry.contentRect;
        setBoardSize({ w: cr.width, h: cr.height });
        });

        ro.observe(boardRef.current);
        return () => ro.disconnect();
    }, []);

    const maxZ = useMemo(() => Math.max(...stickers.map((s) => s.z), 1), [stickers]);

    function bringToFront(id) {
        setStickers((prev) => prev.map((s) => (s.id === id ? { ...s, z: maxZ + 1 } : s)));
    }

    // Center-relative -> top-left pixel coords
    function toPixelsFromCenter(sticker) {
        const centerX = boardSize.w / 2;
        const centerY = boardSize.h / 2;

        return {
            x: centerX + sticker.cx - sticker.w / 2,
            y: centerY + sticker.cy - sticker.h / 2,
        };
    }

    // top-left pixel coords -> center-relative
    function toCenterOffsets(sticker, x, y) {
        const centerX = boardSize.w / 2;
        const centerY = boardSize.h / 2;

        return {
            cx: x - centerX + sticker.w / 2,
            cy: y - centerY + sticker.h / 2,
        };
    }

    function clampHalfOffscreen(x, y, s) {
        // allow half off-screen: x in [-w/2, boardW - w/2]
        const minX = -s.w / 2;
        const minY = -s.h / 2;
        const maxX = boardSize.w - s.w / 2;
        const maxY = boardSize.h - s.h / 2;

        return {
            x: Math.min(Math.max(x, minX), maxX),
            y: Math.min(Math.max(y, minY), maxY),
        };
    }

    return (
        <div ref={boardRef} className={styles.board}>
            {stickers
                .slice()
                .sort((a, b) => a.z - b.z)
                .map((s) => {
                    let displaySticker = s;

                    if (mounted) {
                        if (s.id === "s25") {
                            if (theme === "dark") {
                                displaySticker = { ...s, src: "/stickers/25.png" };
                            } else {
                                displaySticker = { ...s, src: "/stickers/26.png" };
                            }
                        }
                        if (s.id === "s7") {
                            if (theme === "dark") {
                                displaySticker = { ...s, src: "/stickers/7.png" };
                            } else {
                                displaySticker = { ...s, src: "/stickers/8.png" };
                            }
                        }
                    }
                    return (
                        <Sticker
                            key={s.id}
                            sticker={ displaySticker }
                            grid={GRID}
                            onBringToFront={() => bringToFront(displaySticker.id)}
                            clampHalfOffscreen={(x, y) => clampHalfOffscreen(x, y, s)}
                            toPixelsFromCenter={() => toPixelsFromCenter(s)}
                            toCenterOffsets={(x, y) => toCenterOffsets(s, x, y)}
                            onCommitCenter={(cx, cy) =>
                            setStickers((prev) =>
                                prev.map((it) => (it.id === s.id ? { ...it, cx, cy } : it))
                            )}
                            onClick={() => {
                                if (s.id === "s25" || s.id === "s7") {
                                    setTheme(theme === "dark" ? "light" : "dark");
                                    return;
                                }

                                if (s.href) {
                                    router.push(s.href);
                                }
                            }}
                            onMouseDown={() => {
                                if (s.id === "s4") {
                                    toggleSound();
                                    return;
                                }
                            }}
                        />
                    )
                })
            }
        </div>
    );
}

    function Sticker({
        sticker,
        grid,
        onBringToFront,
        clampHalfOffscreen,
        toPixelsFromCenter,
        toCenterOffsets,
        onCommitCenter,
        onClick,
        onMouseDown,
    }) {
        const controls = useAnimation();
        const router = useRouter();
        const didDragRef = useRef(false);

    // We drive position via framer "animate" so snap can spring nicely
    useEffect(() => {
        const { x, y } = toPixelsFromCenter();
        controls.set({ x, y });
    }, [controls, toPixelsFromCenter]);

    return (
        <motion.button
            type="button"
            className={styles.sticker}
            style={{ width: sticker.w, height: sticker.h, zIndex: sticker.z }}
            initial={false}
            animate={controls}
            drag
            dragMomentum={false}
            dragElastic={0.15}
            onPointerDown={() => {
                didDragRef.current = false;
            }}
            onDragStart={() => {
                onBringToFront();
                didDragRef.current = true;
            }}
            onTap={() => {
                if (didDragRef.current) {
                    return;
                }

                if (onClick) {
                    onClick();
                    return;
                }

                if (sticker.href) {
                    router.push(sticker.href);
                }
            }}
            onMouseDown={() => {
                if (onMouseDown) {
                    onMouseDown();
                }
            }}
            onDragEnd={(_, info) => {
                const start = toPixelsFromCenter();
                const rawX = start.x + info.offset.x;
                const rawY = start.y + info.offset.y;

                const snappedX = snap(rawX, grid);
                const snappedY = snap(rawY, grid);

                const clamped = clampHalfOffscreen(snappedX, snappedY);

                controls.start({
                    x: clamped.x,
                    y: clamped.y,
                    transition: { type: "spring", stiffness: 520, damping: 28 },
                });

                const nextCenter = toCenterOffsets(clamped.x, clamped.y);
                onCommitCenter(nextCenter.cx, nextCenter.cy);
            }}
            aria-label={sticker.alt}
            >
            <img src={sticker.src} alt={sticker.alt} draggable={false}/>
        </motion.button>
    );
}