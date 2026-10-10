import localFont from "next/font/local";
import { Martian_Mono } from "next/font/google";

export const display = localFont({
  src: [
    { path: "../public/fonts/cabinet-grotesk/CabinetGrotesk-Variable.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});

export const body = localFont({
  src: [
    { path: "../public/fonts/switzer/Switzer-Variable.woff2", weight: "100 900", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

export const mono = Martian_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});
