import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProviders from "./providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Showcase Portfolio - Sylvio Makni",
  description:
    "Hi, I'm Sylvio, a frontend developer and ICT studynt at Fontys. Explore my interactive sticker board portfolio, projects and story.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppProviders>
          {children}
          <Toaster toastOptions={{ style: { maxWidth: "400px" } }} />
        </AppProviders>
      </body>
    </html>
  );
}
