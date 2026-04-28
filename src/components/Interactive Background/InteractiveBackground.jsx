"use client";

import { motion, useAnimation } from "framer-motion";
import {
  use,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useSound } from "@/app/providers/SoundProvider";
import styles from "./InteractiveBackground.module.css";
import AboutContent from "../About Page Content/AboutContent";
import ProjectsContent from "../Projects Page Content/ProjectsContent";
import ContactContent from "../Contact Page Content/ContactContent";
import LegendContent from "../Legend Page Content/LegendContent";
import { toast } from "sonner";

const GRID = 40;

function snap(n, grid) {
  return Math.round(n / grid) * grid;
}

export default function StickerBoard({
  requestModalChange,
  modalOpen,
  requestLegendChange,
  legendOpen,
}) {
  const boardRef = useRef(null);
  const isPausedRef = useRef(false);
  const [boardSize, setBoardSize] = useState({ w: 0, h: 0 });
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { toggleSound, soundOn } = useSound();
  const router = useRouter();
  const [questionPressed, setQuestionPressed] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    window.blinkInterval = setInterval(() => {
      setQuestionPressed((prev) => !prev);
    }, 500);
    return () => clearInterval(window.blinkInterval);
  }, []);

  useEffect(() => {
    if (!legendOpen) {
      isPausedRef.current = false;
      clearInterval(window.blinkInterval);
      window.blinkInterval = setInterval(() => {
        setQuestionPressed((prev) => !prev);
      }, 500);
    }
  }, [legendOpen]);

  // Replace these with your own sticker images in /public/stickers/
  const [stickers, setStickers] = useState(() => [
    {
      id: "s1",
      src: "/stickers/1.png",
      alt: "Rainbow",
      cx: -620,
      cy: -340,
      w: 220,
      h: 220,
      z: 1,
    },
    {
      id: "s2",
      src: "/stickers/2.png",
      alt: "Frieren",
      cx: -370,
      cy: -280,
      w: 170,
      h: 170,
      z: 2,
    },
    {
      id: "s3",
      src: "/stickers/3.png",
      alt: "Ice Coffee",
      cx: -510,
      cy: -90,
      w: 210,
      h: 210,
      z: 3,
    },
    {
      id: "s4",
      src: "/stickers/4.png",
      alt: "Cat With Headphones",
      cx: 530,
      cy: 340,
      w: 170,
      h: 170,
      z: 4,
    },
    {
      id: "s5",
      src: "/stickers/5.png",
      alt: "Absolute Vodka",
      cx: 375,
      cy: 280,
      w: 150,
      h: 150,
      z: 5,
    },
    {
      id: "s6",
      src: "/stickers/6.png",
      alt: "Rave Girl",
      cx: -480,
      cy: 300,
      w: 160,
      h: 160,
      z: 6,
    },
    {
      id: "s7",
      src: "/stickers/7.png",
      alt: "White Tote Bag",
      cx: -300,
      cy: 250,
      w: 190,
      h: 190,
      z: 7,
    },
    // { id: "s8", src: "/stickers/8.png", alt: "Black Tote Bag", cx: -300, cy: 250, w: 190, h: 190, z: 8 },
    {
      id: "s9",
      src: "/stickers/9.png",
      alt: "Annabelle",
      cx: -700,
      cy: -10,
      w: 150,
      h: 150,
      z: 9,
    },
    {
      id: "s10",
      src: "/stickers/10.png",
      alt: "Sylvio 1",
      href: "/about",
      cx: -350,
      cy: -5,
      w: 280,
      h: 280,
      z: 10,
    },
    {
      id: "s11",
      src: "/stickers/11.png",
      alt: "D.va Overwatch",
      cx: -90,
      cy: 300,
      w: 190,
      h: 190,
      z: 11,
    },
    {
      id: "s12",
      src: "/stickers/12.png",
      alt: "Mona Lisa",
      cx: 360,
      cy: 30,
      w: 140,
      h: 140,
      z: 12,
    },
    {
      id: "s13",
      src: "/stickers/13.png",
      alt: "Tarot Cards",
      cx: 190,
      cy: -270,
      w: 200,
      h: 200,
      z: 13,
    },
    {
      id: "s14",
      src: "/stickers/14.png",
      alt: "Airplane",
      cx: 660,
      cy: -260,
      w: 220,
      h: 220,
      z: 14,
    },
    {
      id: "s15",
      src: "/stickers/15.png",
      alt: "First Rule Of Programming",
      href: "/projects",
      cx: 160,
      cy: 270,
      w: 210,
      h: 210,
      z: 15,
    },
    {
      id: "s16",
      src: "/stickers/16.png",
      alt: "I hate Programming",
      href: "/projects",
      cx: -520,
      cy: 115,
      w: 170,
      h: 170,
      z: 16,
    },
    {
      id: "s17",
      src: "/stickers/17.png",
      alt: "Sylvio 2",
      href: "/about",
      cx: -690,
      cy: 250,
      w: 300,
      h: 300,
      z: 17,
    },
    {
      id: "s18",
      src: "/stickers/18.png",
      alt: "Sylvio 3",
      href: "/about",
      cx: 690,
      cy: 290,
      w: 280,
      h: 280,
      z: 18,
    },
    {
      id: "s19",
      src: "/stickers/19.png",
      alt: "Sylvio 4",
      href: "/about",
      cx: 440,
      cy: -210,
      w: 250,
      h: 250,
      z: 19,
    },
    {
      id: "s20",
      src: "/stickers/20.png",
      alt: "Lenovo Laptop",
      href: "/contact",
      cx: 520,
      cy: 140,
      w: 210,
      h: 210,
      z: 20,
    },
    {
      id: "s21",
      src: "/stickers/21.png",
      alt: "Rubics Cube",
      cx: 720,
      cy: 60,
      w: 100,
      h: 100,
      z: 21,
    },
    {
      id: "s22",
      src: "/stickers/22.png",
      alt: "Cat",
      cx: -100,
      cy: -340,
      w: 270,
      h: 270,
      z: 22,
    },
    {
      id: "s23",
      src: "/stickers/23.png",
      alt: "Diva",
      href: "/projects",
      cx: 540,
      cy: -5,
      w: 160,
      h: 160,
      z: 23,
    },
    {
      id: "s24",
      src: "/stickers/24.png",
      alt: "Git It Girl",
      href: "/projects",
      cx: -100,
      cy: -210,
      w: 160,
      h: 160,
      z: 24,
    },
    {
      id: "s25",
      src: "/stickers/25.png",
      alt: "Sun",
      cx: 660,
      cy: -110,
      w: 120,
      h: 120,
      z: 25,
    },
    // { id: "s26", src: "/stickers/26.png", alt: "Moon", cx: 660, cy: -130, w: 120, h: 120, z: 26 },
    {
      id: "s27",
      src: "/stickers/27.png",
      alt: "Phone",
      href: "/contact",
      cx: -670,
      cy: -185,
      w: 150,
      h: 150,
      z: 26,
    },
    {
      id: "s30",
      src: "/stickers/30.png",
      alt: "Question Key",
      cx: 580,
      cy: -355,
      w: 110,
      h: 110,
      z: 30,
    },
    // { id: "s31", src: "/stickers/31.png", alt: "Question Key Pressed", cx: 580, cy: -355, w: 110, h: 110, z: 31 },
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

  const maxZ = useMemo(
    () => Math.max(...stickers.map((s) => s.z), 1),
    [stickers],
  );

  function bringToFront(id) {
    setStickers((prev) =>
      prev.map((s) => (s.id === id ? { ...s, z: maxZ + 1 } : s)),
    );
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

          if (s.id === "s30") {
            displaySticker = {
              ...s,
              src: questionPressed ? "/stickers/31.png" : "/stickers/30.png",
            };
          }

          return (
            <Sticker
              key={s.id}
              sticker={displaySticker}
              grid={GRID}
              onBringToFront={() => bringToFront(displaySticker.id)}
              clampHalfOffscreen={(x, y) => clampHalfOffscreen(x, y, s)}
              toPixelsFromCenter={() => toPixelsFromCenter(s)}
              toCenterOffsets={(x, y) => toCenterOffsets(s, x, y)}
              onCommitCenter={(cx, cy) =>
                setStickers((prev) =>
                  prev.map((it) => (it.id === s.id ? { ...it, cx, cy } : it)),
                )
              }
              overrideZ={modalOpen && PIN_STICKERS.has(s.id) ? 200 : undefined}
              onClick={() => {
                if (s.id === "s25" || s.id === "s7") {
                  if (theme === "dark") {
                    toast("☀️ really? light mode? seriously?", {
                      size: "large",
                      action: {
                        label: "yea, i'm brave",
                        onClick: () => setTheme("light"),
                      },
                    });
                  } else {
                    setTheme("dark");
                    toast("🌙 ah, back where you belong");
                  }
                  return;
                }

                if (s.id === "s30") {
                  if (isPausedRef.current) {
                    isPausedRef.current = false;
                    requestLegendChange(null);
                    window.blinkInterval = setInterval(() => {
                      setQuestionPressed((prev) => !prev);
                    }, 500);
                  } else {
                    isPausedRef.current = true;
                    clearInterval(window.blinkInterval);
                    setQuestionPressed(true);
                    requestLegendChange({
                      title: "Legend",
                      content: <LegendContent />,
                    });
                  }
                  return;
                }

                if (
                  s.id === "s10" ||
                  s.id === "s17" ||
                  s.id === "s18" ||
                  s.id === "s19"
                ) {
                  requestModalChange({
                    title: "About",
                    content: <AboutContent />,
                  });
                  return;
                }

                if (
                  s.id === "s15" ||
                  s.id === "s16" ||
                  s.id === "s23" ||
                  s.id === "s24"
                ) {
                  requestModalChange({
                    title: "Projects",
                    content: <ProjectsContent />,
                  });
                  return;
                }

                if (s.id === "s20" || s.id === "s27") {
                  requestModalChange({
                    title: "Contact",
                    content: <ContactContent />,
                  });
                  return;
                }

                if (s.href) {
                  router.push(s.href);
                }

                if (s.id === "s4") {
                  toggleSound();
                  toast(soundOn ? "🔇 ..." : "🎵 click click click...");
                  return;
                }
              }}
            />
          );
        })}
    </div>
  );
}

const PIN_STICKERS = new Set(["s1", "s4", "s25"]);

function Sticker({
  sticker,
  grid,
  onBringToFront,
  clampHalfOffscreen,
  toPixelsFromCenter,
  toCenterOffsets,
  onCommitCenter,
  onClick,
  overrideZ,
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
      style={{
        width: sticker.w,
        height: sticker.h,
        zIndex: overrideZ ?? sticker.z,
      }}
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
      <img src={sticker.src} alt={sticker.alt} draggable={false} />
    </motion.button>
  );
}
