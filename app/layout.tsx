import type { Metadata } from "next";
import { display, body, mono } from "@/lib/fonts";
import { site } from "@/content/site";
import { StatusBar } from "@/components/StatusBar";
import { Grain } from "@/components/Grain";
import { SmoothScroll } from "@/components/SmoothScroll";
import { BootSequence } from "@/components/BootSequence";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed left-2 top-2 z-50 -translate-y-20 border-2 border-black bg-[#ffe600] px-3.5 py-2 font-mono text-xs font-black uppercase text-black shadow-[3px_3px_0px_#000] transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <BootSequence />
        <StatusBar />
        <CustomCursor />
        <Grain />
        <SmoothScroll />
        <main id="main" className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
