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

// All cards start CLOSED so the canvas is completely empty first!
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
  const [showTip, setShowTip] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  const [gridTheme, setGridTheme] = useState<"dots" | "grid" | "blueprint">("dots");

  // Dragging Card State
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const cardDragStartRef = useRef({ mouseX: 0, mouseY: 0, cardX: 0, cardY: 0 });

  // Center on card or on (0, 0)
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

  // Spawn or toggle card from bottom dock
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

        // Subtle random offset so sequential cards don't overlap exactly
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
        // If already open, close it (or bring to front if not currently top)
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
      bringToFront(id);
      centerOn(card.x + card.width / 2, card.y + 100, 1.0);
    },
    [cards, centerOn]
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
        setShowTip(true);
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

  // Top Toolbar actions
  const handleFitAll = () => {
    if (typeof window === "undefined") return;
    setPan({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    setZoom(0.85);
  };

  const handleMinimiseAll = () => {
    const openCards = cards.filter((c) => c.isOpen);
    const allMin = openCards.every((c) => c.isMinimized);
    setCards((prev) =>
      prev.map((c) => (c.isOpen ? { ...c, isMinimized: !allMin } : c))
    );
  };

  const handleClearAll = () => {
    setCards((prev) => prev.map((c) => ({ ...c, isOpen: false })));
  };

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
  };

  const toggleSound = () => {
    const s = lofiAudio.toggle();
    setIsSoundPlaying(s);
  };

  const anyCardsOpen = cards.some((c) => c.isOpen);

  return (
    <div
      onMouseDown={handleCanvasMouseDown}
      className={`fixed inset-0 overflow-hidden select-none bg-[#f6f5f0] ${
        isPanning ? "cursor-grabbing" : "cursor-grab"
      }`}
    >
      {/* Interactive Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            gridTheme === "dots"
              ? "radial-gradient(rgba(0, 0, 0, 0.14) 1.5px, transparent 1.5px)"
              : "linear-gradient(to right, rgba(0, 0, 0, 0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.08) 1px, transparent 1px)",
          backgroundSize: `${32 * zoom}px ${32 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      />

      {/* TOP FLOATING CONTROLS DOCK */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1 sm:gap-2 rounded-2xl border-2 border-black bg-white/95 px-3 py-1.5 shadow-[4px_4px_0px_#000] backdrop-blur-md">
          <button
            onClick={handleFitAll}
            className="rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold text-black hover:bg-black/5 active:bg-black/10 transition-colors"
          >
            Fit all
          </button>

          {anyCardsOpen && (
            <>
              <button
                onClick={handleMinimiseAll}
                className="rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold text-black hover:bg-black/5 active:bg-black/10 transition-colors hidden sm:block"
              >
                Minimise all
              </button>
              <button
                onClick={handleArrangeGrid}
                className="rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold text-black hover:bg-black/5 transition-colors"
              >
                Arrange
              </button>
              <button
                onClick={handleClearAll}
                className="rounded-lg px-2.5 py-1 font-mono text-[11px] font-bold text-red-600 hover:bg-red-50 transition-colors"
                title="Clear all cards from canvas"
              >
                Clear
              </button>
              <div className="h-4 w-px bg-black/15" />
            </>
          )}

          {/* Theme switcher */}
          <button
            onClick={() => setGridTheme((t) => (t === "dots" ? "grid" : "dots"))}
            className="rounded-lg px-2 py-1 font-mono text-[11px] font-bold text-black hover:bg-black/5"
            title="Toggle canvas grid"
          >
            ☼ Theme
          </button>

          {/* Back to main site */}
          <Link
            href="/"
            className="rounded-lg border-2 border-black bg-[#ffe600] px-3 py-1 font-mono text-[11px] font-black uppercase text-black shadow-[1px_1px_0px_#000] hover:bg-yellow-400 transition-colors"
          >
            The site &rarr;
          </Link>

          {/* Sound / Lofi Toggle */}
          <button
            onClick={toggleSound}
            className={`rounded-lg px-2 py-1 font-mono text-[11px] font-bold transition-colors ${
              isSoundPlaying
                ? "bg-[#a6ff00] text-black border border-black"
                : "text-black/70 hover:bg-black/5"
            }`}
          >
            {isSoundPlaying ? "🔊 Sound On" : "🔇 Sound"}
          </button>
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

        {/* FLOATING TIP CARD */}
        {showTip && anyCardsOpen && (
          <div
            className="absolute pointer-events-auto rounded-xl border-3 border-black bg-white p-4 shadow-[6px_6px_0px_#000] select-none"
            style={{ left: -140, top: 440, width: 340, zIndex: 30 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="rounded border border-black bg-[#ffe600] px-2 py-0.5 font-mono text-[10px] font-black uppercase text-black">
                TIP
              </span>
              <button
                onClick={() => setShowTip(false)}
                className="font-mono text-[10px] font-bold text-black/50 hover:text-black underline"
              >
                Dismiss
              </button>
            </div>
            <h4 className="font-display text-sm font-black text-black">Drag &amp; Move</h4>
            <p className="mt-1 font-sans text-xs text-black/75 leading-relaxed">
              Drag any card by its header to position it. Pan the canvas by dragging the background!
            </p>
          </div>
        )}
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
    </div>
  );
}
