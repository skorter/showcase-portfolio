"use client"

import { useEffect, useRef } from "react";
import Typed from "typed.js";

export default function Typewriter() {
    const element = useRef(null);

    useEffect(() => {
        const typed = new Typed(element.current, {
            strings: [
                "Search ...",
                "Search projects", 
                "Search skills", 
                "Search keywords"
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 1500,
            loop: true,
            showCursor: true,
            cursorChar: "|"
        });

        return () => {
            typed.destroy();
        };
    }, []);


    return <span ref={element}></span>;
}