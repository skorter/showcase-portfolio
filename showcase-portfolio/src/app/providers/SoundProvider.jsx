"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const SoundContext = createContext(null);

export function SoundProvider({ children }) {
    const [soundOn, setSoundOn] = useState(false);

    const clickRef = useRef(null);
    const soundOnRef = useRef(false);

    useEffect(() => {
        const saved = localStorage.getItem("soundOn") === "true";
        setSoundOn(saved);
        soundOnRef.current = saved;
    }, []);

    useEffect(() => {
        localStorage.setItem("soundOn", String(soundOn));
        soundOnRef.current = soundOn;
    }, [soundOn]);

    useEffect(() => {
        clickRef.current = new Audio("/sounds/click.mp3");
    }, []);

    function toggleSound() {
        setSoundOn((prev) => {
            const newState = !prev;

            soundOnRef.current = newState;

            if (newState) {
                const audio = clickRef.current;
                if (audio) {
                    audio.currentTime = 0;
                    audio.play().catch(() => {});
                }
            } else {
                const audio = clickRef.current;
                if (audio) {
                    audio.pause();
                    audio.currentTime = 0;
                }
            }

            return newState;
        });
    }

    useEffect(() => {
        function playClick() {
            if (!soundOnRef.current) return;
            const audio = clickRef.current;
            if (!audio) return;

            audio.currentTime = 0;
            audio.play().catch(() => {});
        }

        window.addEventListener("mousedown", playClick);
        return () => window.removeEventListener("mousedown", playClick);
    }, []);

    const value = useMemo(() => ({ soundOn, toggleSound }), [soundOn]);

    return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
}

export function useSound() {
    const ctx = useContext(SoundContext);
    if (!ctx) throw new Error("useSound must be used inside <SoundProvider>");
    return ctx;
}