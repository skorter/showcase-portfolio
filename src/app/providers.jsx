"use client";

import { ThemeProvider } from "next-themes";
import { SoundProvider } from "./providers/SoundProvider";

export default function AppProviders({ children }) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
        >
        <SoundProvider>
            {children}
        </SoundProvider>
        </ThemeProvider>
    );
}