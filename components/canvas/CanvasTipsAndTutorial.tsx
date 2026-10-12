"use client";

import { useState, useEffect } from "react";

const TIPS = [
  {
    title: "Getting crowded",
    body: "Try Arrange in the top bar — five ways to tidy the desk, or deal it again.",
  },
  {
    title: "Infinite workspace",
    body: "Drag on any empty area of the canvas to pan, or scroll your wheel to zoom in and out.",
  },
  {
    title: "Play the Arcade",
    body: "Open the 🕹️ Arcade card to test your typing speed on code snippets and benchmark your latency.",
  },
  {
    title: "Ambient Lofi",
    body: "Click Sound in the top bar to enable generative jazz chords while exploring the desk.",
  },
  {
    title: "Quick Navigation",
    body: "Use Go to in the top bar to instantly focus and center on any card.",
  },
];

const TUTORIAL_STEPS = [
  {
    step: "1 / 3",
    badge: "WELCOME",
    title: "Welcome to the Canvas Playground 🕹️",
    desc: "The main portfolio is finished. This is the interactive, less serious half — an infinite desktop canvas built for exploring.",
  },
  {
    step: "2 / 3",
    badge: "WORKFLOW",
    title: "Insert & Drag Cards 📂",
    desc: "The canvas starts clean. Click any tab in the bottom dock (Arcade, Work, About, Toolbox, Contributions) to insert cards, then drag them anywhere by their headers.",
  },
  {
    step: "3 / 3",
    badge: "CONTROLS",
    title: "Pan, Zoom & Mini-Games ⚡",
    desc: "Drag the background to pan. Scroll your wheel or use +/- to zoom. Check out the Arcade for typing speed and reflex tests!",
  },
];

export function CanvasTipsAndTutorial({
  onSpawnCard,
}: {
  onSpawnCard?: (id: string) => void;
}) {
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);

  const [showTip, setShowTip] = useState(false);
  const [currentTipIdx, setCurrentTipIdx] = useState(0);

  // Check first-time visit in this session
  useEffect(() => {
    try {
      const hasSeenTutorial = sessionStorage.getItem("canvas_tutorial_seen_v1");
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      } else {
        setShowTip(true);
      }
    } catch {
      setShowTip(true);
    }
  }, []);

  const handleFinishTutorial = () => {
    try {
      sessionStorage.setItem("canvas_tutorial_seen_v1", "true");
    } catch {
      // ignore
    }
    setShowTutorial(false);
    setShowTip(true);
    // Optionally spawn arcade or about card to get user started
    if (onSpawnCard) {
      onSpawnCard("arcade");
    }
  };

  const handleNextTutorial = () => {
    if (tutorialStep < TUTORIAL_STEPS.length - 1) {
      setTutorialStep((prev) => prev + 1);
    } else {
      handleFinishTutorial();
    }
  };

  const handleNextTip = () => {
    setCurrentTipIdx((prev) => (prev + 1) % TIPS.length);
  };

  const handleDismissTip = () => {
    setShowTip(false);
    // Re-surface next tip after 45 seconds so it keeps giving tips!
    setTimeout(() => {
      setCurrentTipIdx((prev) => (prev + 1) % TIPS.length);
      setShowTip(true);
    }, 45000);
  };

  const currentTip = TIPS[currentTipIdx]!;
  const currentStep = TUTORIAL_STEPS[tutorialStep]!;

  return (
    <>
      {/* 1. FIRST-TIME SESSION TUTORIAL MODAL */}
      {showTutorial && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm animate-fade-in select-none">
          <div className="relative w-full max-w-md rounded-2xl border-3 border-black bg-white p-6 sm:p-7 shadow-[8px_8px_0px_#000]">
            {/* Header step counter */}
            <div className="flex items-center justify-between border-b-2 border-black/10 pb-3">
              <span className="rounded-full border border-black bg-[#ffe600] px-3 py-0.5 font-mono text-[11px] font-black uppercase text-black">
                {currentStep.badge}{" // "}{currentStep.step}
              </span>
              <button
                onClick={handleFinishTutorial}
                className="font-mono text-xs font-bold text-black/50 hover:text-black underline"
              >
                Skip Tutorial
              </button>
            </div>

            {/* Content */}
            <div className="mt-5">
              <h3 className="font-display text-xl sm:text-2xl font-black text-black tracking-tight leading-snug">
                {currentStep.title}
              </h3>
              <p className="mt-3 font-sans text-xs sm:text-sm text-black/75 leading-relaxed font-medium">
                {currentStep.desc}
              </p>
            </div>

            {/* Step Indicators & Actions */}
            <div className="mt-7 flex items-center justify-between pt-4 border-t-2 border-black/10">
              <div className="flex items-center gap-1.5">
                {TUTORIAL_STEPS.map((_, idx) => (
                  <span
                    key={idx}
                    className={`h-2 rounded-full transition-all ${
                      idx === tutorialStep
                        ? "w-6 bg-black"
                        : "w-2 bg-black/20"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                {tutorialStep > 0 && (
                  <button
                    onClick={() => setTutorialStep((prev) => prev - 1)}
                    className="rounded-xl border-2 border-black bg-white px-3.5 py-1.5 font-mono text-xs font-bold uppercase text-black hover:bg-black/5"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNextTutorial}
                  className="rounded-xl border-2 border-black bg-[#ffe600] px-4 py-1.5 font-mono text-xs font-black uppercase text-black shadow-[2px_2px_0px_#000] hover:bg-yellow-400 active:translate-y-0.5"
                >
                  {tutorialStep === TUTORIAL_STEPS.length - 1
                    ? "Start Exploring &rarr;"
                    : "Next &rarr;"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. ROTATING TIPS FLOATING CARD (Matches reference image pixel-for-pixel) */}
      {showTip && !showTutorial && (
        <aside
          aria-label="Interactive Canvas Tip"
          className="fixed bottom-24 left-6 z-40 w-[310px] sm:w-[330px] rounded-2xl border-2 border-black bg-white p-4 sm:p-5 shadow-[6px_6px_0px_#000] select-none pointer-events-auto transition-all animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Top Row: TIP badge on left, Dismiss button on right */}
          <div className="flex items-center justify-between">
            <span className="rounded-full border border-black bg-[#ffe600] px-3 py-0.5 font-mono text-[10px] font-black uppercase text-black shadow-[1px_1px_0px_rgba(0,0,0,0.15)]">
              TIP
            </span>
            <div className="flex items-center gap-2.5">
              <button
                onClick={handleNextTip}
                className="font-mono text-[10px] font-bold text-black/50 hover:text-black hover:underline"
                title="Next tip"
              >
                Next &rarr;
              </button>
              <button
                onClick={handleDismissTip}
                className="font-sans text-xs text-black/60 hover:text-black underline cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>

          {/* Bold Title */}
          <h4 className="mt-2.5 font-sans text-sm font-bold text-black">
            {currentTip.title}
          </h4>

          {/* Description */}
          <p className="mt-1 font-sans text-xs sm:text-[13px] text-black/60 leading-relaxed">
            {currentTip.body}
          </p>
        </aside>
      )}
    </>
  );
}
