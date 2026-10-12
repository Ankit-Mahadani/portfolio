"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArcadeCard } from "./ArcadeCard";
import { AboutCard } from "./AboutCard";
import { WorkCard } from "./WorkCard";
import { ToolboxCard } from "./ToolboxCard";
import { ContactCard } from "./ContactCard";
import { ContributionsCard } from "./ContributionsCard";
import { StatsCard } from "./StatsCard";
import { lofiAudio } from "./LofiAudio";
import { CanvasTipsAndTutorial } from "./CanvasTipsAndTutorial";

export type CardData = {
  id: string;
  title: string;
  headerColor: string;
  x: number;
  y: number;
  width: number;
  isOpen: boolean;
  isMinimized: boolean;
  zIndex: number;
};

// All cards start CLOSED so the canvas is completely clean and empty first!
const INITIAL_CARDS: CardData[] = [
  {
    id: "about",
    title: "About",
    headerColor: "bg-[#ffe600]",
    x: 180,
    y: -100,
    width: 360,
    isOpen: false,
    isMinimized: false,
    zIndex: 10,
  },
  {
    id: "work",
    title: "Work",
    headerColor: "bg-[#a6ff00]",
    x: -360,
    y: -100,
    width: 380,
    isOpen: false,
    isMinimized: false,
    zIndex: 11,
  },
  {
    id: "toolbox",
    title: "Toolbox",
    headerColor: "bg-[#00f0ff]",
    x: -160,
    y: -260,
    width: 440,
    isOpen: false,
    isMinimized: false,
    zIndex: 9,
  },
  {
    id: "arcade",
    title: "Arcade",
    headerColor: "bg-[#a6ff00]",
    x: -190,
    y: -120,
    width: 380,
    isOpen: false,
    isMinimized: false,
    zIndex: 15,
  },
  {
    id: "contact",
    title: "Contact",
    headerColor: "bg-[#93c5fd]",
    x: 80,
    y: -140,
    width: 320,
    isOpen: false,
    isMinimized: false,
    zIndex: 12,
  },
  {
    id: "contributions",
    title: "Contributions",
    headerColor: "bg-[#86efac]",
    x: -190,
    y: 120,
    width: 380,
    isOpen: false,
    isMinimized: false,
    zIndex: 8,
  },
  {
    id: "stats",
    title: "Stats",
    headerColor: "bg-[#c084fc]",
    x: 160,
    y: 120,
    width: 340,
    isOpen: false,
    isMinimized: false,
    zIndex: 7,
  },
];

export function InteractiveCanvas() {
  const searchParams = useSearchParams();
  const requestedCard = searchParams.get("card");

  // Pan & Zoom state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.85);
  const [isPanning, setIsPanning] = useState(false);
  const panStartRef = useRef({ x: 0, y: 0 });

  // Cards State
  const [cards, setCards] = useState<CardData[]>(INITIAL_CARDS);
  const [topZ, setTopZ] = useState(25);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [gridTheme, setGridTheme] = useState<"cream" | "grid" | "blueprint" | "dark">("cream");

  // Active Top Bar Dropdown
  const [openDropdown, setOpenDropdown] = useState<"goto" | "arrange" | "theme" | "sound" | null>(null);

  // Dragging Card State
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const cardDragStartRef = useRef({ mouseX: 0, mouseY: 0, cardX: 0, cardY: 0 });

  // Dismiss open dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".top-bar-dropdown")) {
        setOpenDropdown(null);
      }
    };
    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Center on card or coordinate
  const centerOn = useCallback(
    (targetX: number, targetY: number, newZoom = 0.9) => {
      if (typeof window === "undefined") return;
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPan({
        x: cx - targetX * newZoom,
        y: cy - targetY * newZoom,
      });
      setZoom(newZoom);
    },
    []
  );

  // Bring card to front
  const bringToFront = (id: string) => {
    setTopZ((prev) => prev + 1);
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, zIndex: topZ + 1, isOpen: true } : c))
    );
  };

  // Toggle card minimize
  const toggleMinimize = (id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isMinimized: !c.isMinimized } : c))
    );
  };

  // Close card
  const closeCard = (id: string) => {
    setCards((prev) => prev.map((c) => (c.id === id ? { ...c, isOpen: false } : c)));
  };

  // Spawn or toggle card from bottom dock / Go to menu
  const spawnOrToggleCard = (id: string) => {
    setCards((prev) => {
      const card = prev.find((c) => c.id === id);
      if (!card) return prev;

      if (!card.isOpen) {
        // Calculate viewport center in canvas coordinates so card spawns right in front of the user!
        const viewCenterX = typeof window !== "undefined"
          ? (-pan.x + window.innerWidth / 2) / zoom - card.width / 2
          : 0;
        const viewCenterY = typeof window !== "undefined"
          ? (-pan.y + window.innerHeight / 2) / zoom - 140
          : 0;

        const jitterX = (Math.random() - 0.5) * 60;
        const jitterY = (Math.random() - 0.5) * 60;

        const nextZ = topZ + 1;
        setTopZ(nextZ);

        return prev.map((c) =>
          c.id === id
            ? {
                ...c,
                isOpen: true,
                isMinimized: false,
                x: Math.round(viewCenterX + jitterX),
                y: Math.round(viewCenterY + jitterY),
                zIndex: nextZ,
              }
            : c
        );
      } else {
        // If already open and top, toggle close; else bring to front
        if (card.zIndex === topZ) {
          return prev.map((c) => (c.id === id ? { ...c, isOpen: false } : c));
        } else {
          const nextZ = topZ + 1;
          setTopZ(nextZ);
          return prev.map((c) => (c.id === id ? { ...c, zIndex: nextZ, isMinimized: false } : c));
        }
      }
    });
  };

  // Focus specific card
  const focusCard = useCallback(
    (id: string) => {
      const card = cards.find((c) => c.id === id);
      if (!card) return;
      spawnOrToggleCard(id);
      centerOn(card.x + card.width / 2, card.y + 100, 1.0);
    },
    [cards, centerOn, spawnOrToggleCard]
  );

  // Initial load: if user specified ?card=arcade, only open the arcade card centered!
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setPan({ x: cx, y: cy });

      if (requestedCard === "arcade") {
        setCards((prev) =>
          prev.map((c) =>
            c.id === "arcade"
              ? { ...c, isOpen: true, isMinimized: false, x: -190, y: -140, zIndex: 30 }
              : { ...c, isOpen: false }
          )
        );
      }
    }
  }, [requestedCard]);

  // Handle Mouse Wheel for Zoom
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if ((e.target as HTMLElement)?.closest?.(".no-canvas-wheel")) return;
      e.preventDefault();
      const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
      setZoom((z) => Math.min(1.5, Math.max(0.35, z * zoomFactor)));
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Canvas Pan Handlers
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(".canvas-card")) return;
    setIsPanning(true);
    panStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  // Card Drag Handlers
  const handleCardHeaderMouseDown = (e: React.MouseEvent, card: CardData) => {
    e.stopPropagation();
    bringToFront(card.id);
    setDraggingCardId(card.id);
    cardDragStartRef.current = {
      mouseX: e.clientX,
      mouseY: e.clientY,
      cardX: card.x,
      cardY: card.y,
    };
  };

  // Global Mouse Move & Up
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        setPan({
          x: e.clientX - panStartRef.current.x,
          y: e.clientY - panStartRef.current.y,
        });
      } else if (draggingCardId) {
        const dx = (e.clientX - cardDragStartRef.current.mouseX) / zoom;
        const dy = (e.clientY - cardDragStartRef.current.mouseY) / zoom;
        setCards((prev) =>
          prev.map((c) =>
            c.id === draggingCardId
              ? {
                  ...c,
                  x: Math.round(cardDragStartRef.current.cardX + dx),
                  y: Math.round(cardDragStartRef.current.cardY + dy),
                }
              : c
          )
        );
      }
    };

    const onMouseUp = () => {
      setIsPanning(false);
      setDraggingCardId(null);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isPanning, draggingCardId, zoom]);

  // Top Toolbar actions: Fit All
  const handleFitAll = () => {
    if (typeof window === "undefined") return;
    setPan({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setZoom(0.85);
    setOpenDropdown(null);
  };

  // Minimise all
  const handleMinimiseAll = () => {
    const openCards = cards.filter((c) => c.isOpen);
    const allMin = openCards.every((c) => c.isMinimized);
    setCards((prev) =>
      prev.map((c) => (c.isOpen ? { ...c, isMinimized: !allMin } : c))
    );
    setOpenDropdown(null);
  };

  // Randomize cards positions
  const handleRandomize = () => {
    setCards((prev) =>
      prev.map((c) =>
        c.isOpen
          ? {
              ...c,
              x: Math.round((Math.random() - 0.5) * 800),
              y: Math.round((Math.random() - 0.5) * 600),
            }
          : c
      )
    );
    setOpenDropdown(null);
  };

  // Arrange: Grid
  const handleArrangeGrid = () => {
    const openCards = cards.filter((c) => c.isOpen);
    if (openCards.length === 0) return;

    const cols = Math.min(3, openCards.length);
    const spacingX = 400;
    const spacingY = 320;

    let index = 0;
    setCards((prev) =>
      prev.map((c) => {
        if (!c.isOpen) return c;
        const cardX = (index % cols - (cols - 1) / 2) * spacingX;
        const cardY = (Math.floor(index / cols) - 0.5) * spacingY;
        index++;
        return {
          ...c,
          x: Math.round(cardX),
          y: Math.round(cardY),
          isMinimized: false,
        };
      })
    );
    setOpenDropdown(null);
  };

  // Arrange: Radial Orbit
  const handleArrangeOrbit = () => {
    const openCards = cards.filter((c) => c.isOpen);
    if (openCards.length === 0) return;

    const total = openCards.length;
    let index = 0;
    setCards((prev) =>
      prev.map((c) => {
        if (!c.isOpen) return c;
        const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
        index++;
        return {
          ...c,
          x: Math.round(Math.cos(angle) * 380 - c.width / 2),
          y: Math.round(Math.sin(angle) * 280 - 100),
          isMinimized: false,
        };
      })
    );
    setOpenDropdown(null);
  };

  // Arrange: Deal All Cards
  const handleDealAll = () => {
    const cols = 3;
    const spacingX = 400;
    const spacingY = 320;

    let nextZ = topZ;
    setCards((prev) =>
      prev.map((c, idx) => {
        nextZ++;
        const cardX = (idx % cols - 1) * spacingX - 30;
        const cardY = (Math.floor(idx / cols) - 1) * spacingY;
        return {
          ...c,
          isOpen: true,
          isMinimized: false,
          x: cardX,
          y: cardY,
          zIndex: nextZ,
        };
      })
    );
    setTopZ(nextZ);
    handleFitAll();
  };

  // Toggle Sound
  const toggleSound = () => {
    const s = lofiAudio.toggle();
    setIsSoundPlaying(s);
  };

  const anyCardsOpen = cards.some((c) => c.isOpen);

  // Background style based on theme
  const getCanvasBg = () => {
    switch (gridTheme) {
      case "grid":
        return {
          bgColor: "bg-[#faf8f5]",
          bgImage:
            "linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
          bgSize: `${36 * zoom}px ${36 * zoom}px`,
          opacity: "opacity-60",
        };
      case "blueprint":
        return {
          bgColor: "bg-[#101b2b]",
          bgImage:
            "linear-gradient(to right, rgba(0, 240, 255, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 240, 255, 0.12) 1px, transparent 1px)",
          bgSize: `${40 * zoom}px ${40 * zoom}px`,
          opacity: "opacity-85",
        };
      case "dark":
        return {
          bgColor: "bg-[#141416]",
          bgImage: "radial-gradient(rgba(255, 255, 255, 0.15) 1.5px, transparent 1.5px)",
          bgSize: `${32 * zoom}px ${32 * zoom}px`,
          opacity: "opacity-60",
        };
      default:
        // Warm cream dots (reference default)
        return {
          bgColor: "bg-[#f6f5f0]",
          bgImage: "radial-gradient(rgba(0, 0, 0, 0.15) 1.5px, transparent 1.5px)",
          bgSize: `${32 * zoom}px ${32 * zoom}px`,
          opacity: "opacity-60",
        };
    }
  };

  const currentBg = getCanvasBg();

  return (
    <div
      onMouseDown={handleCanvasMouseDown}
      className={`fixed inset-0 overflow-hidden select-none ${currentBg.bgColor} ${
        isPanning ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Interactive Background Grid */}
      <div
        className={`pointer-events-none absolute inset-0 ${currentBg.opacity}`}
        style={{
          backgroundImage: currentBg.bgImage,
          backgroundSize: currentBg.bgSize,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      />

      {/* TOP FLOATING CONTROLS DOCK (Matching Reference Image) */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="top-bar-dropdown pointer-events-auto flex items-center rounded-full border border-black/15 bg-white/95 px-4 py-1.5 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md">
          {/* 1. Fit all */}
          <button
            onClick={handleFitAll}
            className="rounded-full px-3 py-1 font-sans text-[13px] font-medium text-black/85 hover:text-black hover:bg-black/5 transition-colors"
          >
            Fit all
          </button>

          {/* 2. Minimise all */}
          <button
            onClick={handleMinimiseAll}
            className="rounded-full px-3 py-1 font-sans text-[13px] font-medium text-black/85 hover:text-black hover:bg-black/5 transition-colors"
          >
            Minimise all
          </button>

          {/* 3. Go to ▾ Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown((cur) => (cur === "goto" ? null : "goto"))}
              className={`rounded-full px-3 py-1 font-sans text-[13px] font-medium transition-colors flex items-center gap-1.5 ${
                openDropdown === "goto" ? "bg-black/10 text-black" : "text-black/85 hover:text-black hover:bg-black/5"
              }`}
            >
              <span>Go to</span>
              <span className="text-[10px] text-black/50">▾</span>
            </button>

            {openDropdown === "goto" && (
              <div className="absolute left-0 top-full mt-2 w-48 rounded-2xl border border-black/15 bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] z-[100] flex flex-col gap-0.5">
                {cards.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      focusCard(c.id);
                      setOpenDropdown(null);
                    }}
                    className="flex items-center justify-between rounded-xl px-3 py-1.5 text-xs font-medium text-black/80 hover:bg-black/5 hover:text-black text-left transition-colors"
                  >
                    <span>{c.title}</span>
                    {c.isOpen && <span className="h-1.5 w-1.5 rounded-full bg-black/40" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Random */}
          <button
            onClick={handleRandomize}
            className="rounded-full px-3 py-1 font-sans text-[13px] font-medium text-black/85 hover:text-black hover:bg-black/5 transition-colors"
          >
            Random
          </button>

          {/* 5. Arrange ▾ Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown((cur) => (cur === "arrange" ? null : "arrange"))}
              className={`rounded-full px-3 py-1 font-sans text-[13px] font-medium transition-colors flex items-center gap-1.5 ${
                openDropdown === "arrange" ? "bg-black/10 text-black" : "text-black/85 hover:text-black hover:bg-black/5"
              }`}
            >
              <span>Arrange</span>
              <span className="text-[10px] text-black/50">▾</span>
            </button>

            {openDropdown === "arrange" && (
              <div className="absolute left-0 top-full mt-2 w-44 rounded-2xl border border-black/15 bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] z-[100] flex flex-col gap-0.5">
                <button
                  onClick={handleArrangeGrid}
                  className="rounded-xl px-3 py-1.5 text-xs font-medium text-black/80 hover:bg-black/5 hover:text-black text-left transition-colors"
                >
                  ▦ Grid Layout
                </button>
                <button
                  onClick={handleArrangeOrbit}
                  className="rounded-xl px-3 py-1.5 text-xs font-medium text-black/80 hover:bg-black/5 hover:text-black text-left transition-colors"
                >
                  ⭕ Radial Orbit
                </button>
                <button
                  onClick={handleDealAll}
                  className="rounded-xl px-3 py-1.5 text-xs font-medium text-black/80 hover:bg-black/5 hover:text-black text-left transition-colors"
                >
                  🎲 Deal All Cards
                </button>
              </div>
            )}
          </div>

          {/* Hairline Divider Rule */}
          <div className="h-4 w-px bg-black/15 mx-1" />

          {/* 6. ☼ Theme ▾ Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown((cur) => (cur === "theme" ? null : "theme"))}
              className={`rounded-full px-3 py-1 font-sans text-[13px] font-medium transition-colors flex items-center gap-1.5 ${
                openDropdown === "theme" ? "bg-black/10 text-black" : "text-black/85 hover:text-black hover:bg-black/5"
              }`}
            >
              <span>☼ Theme</span>
              <span className="text-[10px] text-black/50">▾</span>
            </button>

            {openDropdown === "theme" && (
              <div className="absolute left-0 top-full mt-2 w-40 rounded-2xl border border-black/15 bg-white p-1.5 shadow-[0_12px_32px_rgba(0,0,0,0.12)] z-[100] flex flex-col gap-0.5">
                <button
                  onClick={() => {
                    setGridTheme("cream");
                    setOpenDropdown(null);
                  }}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                    gridTheme === "cream" ? "bg-black/10 font-bold" : "text-black/80 hover:bg-black/5"
                  }`}
                >
                  ⚪ Warm Cream
                </button>
                <button
                  onClick={() => {
                    setGridTheme("grid");
                    setOpenDropdown(null);
                  }}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                    gridTheme === "grid" ? "bg-black/10 font-bold" : "text-black/80 hover:bg-black/5"
                  }`}
                >
                  ▦ Technical Grid
                </button>
                <button
                  onClick={() => {
                    setGridTheme("blueprint");
                    setOpenDropdown(null);
                  }}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                    gridTheme === "blueprint" ? "bg-black/10 font-bold" : "text-black/80 hover:bg-black/5"
                  }`}
                >
                  🔷 Blueprint Blue
                </button>
                <button
                  onClick={() => {
                    setGridTheme("dark");
                    setOpenDropdown(null);
                  }}
                  className={`rounded-xl px-3 py-1.5 text-xs font-medium text-left transition-colors ${
                    gridTheme === "dark" ? "bg-black/10 font-bold" : "text-black/80 hover:bg-black/5"
                  }`}
                >
                  ⬛ Midnight Dark
                </button>
              </div>
            )}
          </div>

          {/* 7. The site */}
          <Link
            href="/"
            className="rounded-full px-3 py-1 font-sans text-[13px] font-medium text-black/85 hover:text-black hover:bg-black/5 transition-colors"
          >
            The site
          </Link>

          {/* 8. 🔈 Sound ▾ Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenDropdown((cur) => (cur === "sound" ? null : "sound"))}
              className={`rounded-full px-3 py-1 font-sans text-[13px] font-medium transition-colors flex items-center gap-1.5 ${
                openDropdown === "sound" || isSoundPlaying
                  ? "bg-black/10 text-black font-semibold"
                  : "text-black/85 hover:text-black hover:bg-black/5"
              }`}
            >
              <span>{isSoundPlaying ? "🔊 Sound" : "🔈 Sound"}</span>
              <span className="text-[10px] text-black/50">▾</span>
            </button>

            {openDropdown === "sound" && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-2xl border border-black/15 bg-white p-2 shadow-[0_12px_32px_rgba(0,0,0,0.12)] z-[100] flex flex-col gap-1.5">
                <div className="px-2 py-1 text-[11px] font-mono text-black/50 uppercase">
                  Generative Lofi Synth
                </div>
                <button
                  onClick={toggleSound}
                  className={`w-full rounded-xl px-3 py-2 text-xs font-bold text-center border-2 border-black transition-all shadow-[2px_2px_0px_#000] ${
                    isSoundPlaying ? "bg-[#a6ff00] text-black" : "bg-[#ffe600] text-black"
                  }`}
                >
                  {isSoundPlaying ? "⏸️ Pause Music" : "▶️ Play Ambient Lofi"}
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* TRANSFORMABLE CANVAS CONTAINER */}
      <div
        className="absolute inset-0 origin-top-left pointer-events-none"
        style={{
          transform: `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
          willChange: "transform",
        }}
      >
        {/* CENTER AVATAR / BRAND NODE */}
        <div
          className="absolute pointer-events-auto flex flex-col items-center justify-center text-center -translate-x-1/2 -translate-y-1/2 select-none"
          style={{ left: 0, top: 0 }}
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full border-3 border-black bg-[#ffe600] shadow-[3px_3px_0px_#000]">
            <span className="font-display text-lg font-black text-black">AM</span>
          </div>
          <h1 className="mt-2 font-display text-2xl font-black uppercase tracking-tight text-black">
            Ankit Mahadani
          </h1>
          <p className="font-mono text-xs font-bold text-black/60">
            Full stack engineer, <span className="bg-[#ffe600] px-1 text-black">AI retrieval &amp; agents</span>
          </p>
          <span className="mt-1 font-mono text-[10px] font-semibold text-black/40 uppercase tracking-widest">
            DURGAPUR, INDIA
          </span>

          {/* Clean Invitation Hint when canvas is empty */}
          {!anyCardsOpen && (
            <div className="mt-6 flex flex-col items-center gap-2">
              <span className="rounded-full border-2 border-black bg-white px-4 py-1.5 font-mono text-xs font-bold text-black shadow-[3px_3px_0px_#000] animate-bounce">
                👇 Click any tab in the bottom dock to insert cards
              </span>
            </div>
          )}
        </div>

        {/* DRAGGABLE CARDS (Only rendered when open!) */}
        {cards
          .filter((c) => c.isOpen)
          .map((card) => (
            <div
              key={card.id}
              className="canvas-card absolute pointer-events-auto rounded-xl border-3 border-black bg-white shadow-[6px_6px_0px_#000] transition-shadow hover:shadow-[8px_8px_0px_#000]"
              style={{
                left: `${card.x}px`,
                top: `${card.y}px`,
                width: `${card.width}px`,
                zIndex: card.zIndex,
              }}
              onMouseDown={() => bringToFront(card.id)}
            >
              {/* Card Titlebar (Drag Handle) */}
              <div
                onMouseDown={(e) => handleCardHeaderMouseDown(e, card)}
                className={`flex cursor-move items-center justify-between border-b-3 border-black ${card.headerColor} px-3.5 py-2 select-none`}
              >
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full border border-black bg-black/40" />
                  <span className="font-mono text-xs font-black uppercase text-black">
                    {card.title}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Minimize button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMinimize(card.id);
                    }}
                    className="flex h-5 w-5 items-center justify-center rounded border border-black bg-white font-mono text-xs font-bold text-black hover:bg-gray-100"
                    title={card.isMinimized ? "Expand" : "Minimize"}
                  >
                    {card.isMinimized ? "+" : "−"}
                  </button>
                  {/* Close button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeCard(card.id);
                    }}
                    className="flex h-5 w-5 items-center justify-center rounded border border-black bg-white font-mono text-xs font-bold text-black hover:bg-[#ff5964] hover:text-white"
                    title="Remove from canvas"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Card Body */}
              {!card.isMinimized && (
                <div className="no-canvas-wheel cursor-default">
                  {card.id === "arcade" && <ArcadeCard />}
                  {card.id === "about" && <AboutCard />}
                  {card.id === "work" && <WorkCard />}
                  {card.id === "toolbox" && <ToolboxCard />}
                  {card.id === "contact" && <ContactCard />}
                  {card.id === "contributions" && <ContributionsCard />}
                  {card.id === "stats" && <StatsCard />}
                </div>
              )}
            </div>
          ))}
      </div>

      {/* BOTTOM FLOATING DOCK TOOLBAR */}
      <footer className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2 rounded-2xl border-3 border-black bg-white/95 p-2 shadow-[6px_6px_0px_#000] backdrop-blur-md">
          {/* Card Icon Toggles */}
          <button
            onClick={() => spawnOrToggleCard("about")}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#ffe600] shadow-[1px_1px_0px_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all ${
              cards.find((c) => c.id === "about")?.isOpen ? "ring-2 ring-black" : ""
            }`}
            title="Insert About Card"
          >
            👤
            {cards.find((c) => c.id === "about")?.isOpen && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-black" />
            )}
          </button>

          <button
            onClick={() => spawnOrToggleCard("work")}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#a6ff00] shadow-[1px_1px_0px_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all ${
              cards.find((c) => c.id === "work")?.isOpen ? "ring-2 ring-black" : ""
            }`}
            title="Insert Work Card"
          >
            💼
            {cards.find((c) => c.id === "work")?.isOpen && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-black" />
            )}
          </button>

          <button
            onClick={() => spawnOrToggleCard("toolbox")}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#00f0ff] shadow-[1px_1px_0px_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all ${
              cards.find((c) => c.id === "toolbox")?.isOpen ? "ring-2 ring-black" : ""
            }`}
            title="Insert Toolbox Card"
          >
            🛠️
            {cards.find((c) => c.id === "toolbox")?.isOpen && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-black" />
            )}
          </button>

          <button
            onClick={() => spawnOrToggleCard("contact")}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#93c5fd] shadow-[1px_1px_0px_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all ${
              cards.find((c) => c.id === "contact")?.isOpen ? "ring-2 ring-black" : ""
            }`}
            title="Insert Contact Card"
          >
            ✉️
            {cards.find((c) => c.id === "contact")?.isOpen && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-black" />
            )}
          </button>

          <button
            onClick={() => spawnOrToggleCard("contributions")}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#86efac] shadow-[1px_1px_0px_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all ${
              cards.find((c) => c.id === "contributions")?.isOpen ? "ring-2 ring-black" : ""
            }`}
            title="Insert GitHub Contributions Card"
          >
            🟩
            {cards.find((c) => c.id === "contributions")?.isOpen && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-black" />
            )}
          </button>

          <button
            onClick={() => spawnOrToggleCard("arcade")}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#ffe600] shadow-[1px_1px_0px_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all ${
              cards.find((c) => c.id === "arcade")?.isOpen ? "ring-2 ring-black" : ""
            }`}
            title="Insert 🕹️ Arcade Games Card"
          >
            🕹️
            {cards.find((c) => c.id === "arcade")?.isOpen && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-black" />
            )}
          </button>

          <button
            onClick={() => spawnOrToggleCard("stats")}
            className={`relative flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-[#c084fc] shadow-[1px_1px_0px_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all ${
              cards.find((c) => c.id === "stats")?.isOpen ? "ring-2 ring-black" : ""
            }`}
            title="Insert Stats Card"
          >
            📊
            {cards.find((c) => c.id === "stats")?.isOpen && (
              <span className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-black" />
            )}
          </button>

          <button
            onClick={toggleSound}
            className={`flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black shadow-[1px_1px_0px_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all ${
              isSoundPlaying ? "bg-[#ff66c4]" : "bg-white"
            }`}
            title="Lofi Ambient"
          >
            🎵
          </button>

          <div className="h-6 w-px bg-black/20" />

          {/* Socials */}
          <a
            href="https://github.com/Ankit-Mahadani"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white shadow-[1px_1px_0px_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all font-mono text-xs font-black"
            title="GitHub Profile"
          >
            GH
          </a>

          <a
            href="https://linkedin.com/in/ankitmahadani"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-10 w-10 items-center justify-center rounded-xl border-2 border-black bg-white shadow-[1px_1px_0px_#000] hover:-translate-y-1 hover:shadow-[3px_3px_0px_#000] transition-all font-mono text-xs font-black text-[#0077b5]"
            title="LinkedIn Profile"
          >
            in
          </a>
        </div>
      </footer>

      {/* BOTTOM RIGHT ZOOM CONTROLS */}
      <aside className="fixed bottom-6 right-6 z-50 flex items-center gap-1.5 rounded-xl border-2 border-black bg-white px-2.5 py-1.5 shadow-[4px_4px_0px_#000]">
        <button
          onClick={() => setZoom((z) => Math.max(0.35, z - 0.1))}
          className="flex h-6 w-6 items-center justify-center rounded border border-black font-mono text-xs font-bold text-black hover:bg-black/5"
          title="Zoom out"
        >
          −
        </button>
        <span className="w-12 text-center font-mono text-xs font-bold text-black">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom((z) => Math.min(1.5, z + 0.1))}
          className="flex h-6 w-6 items-center justify-center rounded border border-black font-mono text-xs font-bold text-black hover:bg-black/5"
          title="Zoom in"
        >
          +
        </button>
      </aside>

      {/* CONTINUOUS ROTATING TIPS & FIRST-SESSION TUTORIAL */}
      <CanvasTipsAndTutorial onSpawnCard={spawnOrToggleCard} />
    </div>
  );
}
