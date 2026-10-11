"use client";

import { useState, useEffect, useRef } from "react";
import { lofiAudio } from "./LofiAudio";

const TYPING_SNIPPETS = [
  "const agent = new RAGPipeline({ model: 'gemini-2.5', store: 'pinecone' });",
  "def loss_function(y_true, y_pred): return torch.mean((y_true - y_pred) ** 2)",
  "import { LangChain, VectorStore } from '@langchain/core';",
  "neuva.train(data, epochs=50, loss='custom_regressor')",
];

export function ArcadeCard() {
  const [activeTab, setActiveTab] = useState<"typing" | "reflex" | "lofi">("typing");

  // Typing Game State
  const [snippetIdx, setSnippetIdx] = useState(0);
  const targetSnippet = TYPING_SNIPPETS[snippetIdx]!;
  const [inputVal, setInputVal] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState<number | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  // Reflex Game State
  const [reflexState, setReflexState] = useState<"idle" | "waiting" | "ready" | "result">("idle");
  const [reflexTime, setReflexTime] = useState<number | null>(null);
  const reflexTimerRef = useRef<NodeJS.Timeout | null>(null);
  const reflexStartRef = useRef<number>(0);

  // Lofi State
  const [isPlayingLofi, setIsPlayingLofi] = useState(false);

  // Handle typing test
  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!startTime && val.length === 1) {
      setStartTime(Date.now());
    }
    setInputVal(val);

    if (val === targetSnippet) {
      const elapsedMinutes = (Date.now() - (startTime || Date.now())) / 60000;
      const words = targetSnippet.length / 5;
      const calculatedWpm = Math.round(words / Math.max(elapsedMinutes, 0.05));
      setWpm(calculatedWpm);
      setIsFinished(true);
    }
  };

  const resetTyping = () => {
    setInputVal("");
    setStartTime(null);
    setWpm(null);
    setIsFinished(false);
    setSnippetIdx((prev) => (prev + 1) % TYPING_SNIPPETS.length);
  };

  // Handle Reflex test
  const startReflex = () => {
    setReflexState("waiting");
    const delay = 1500 + Math.random() * 2500;
    reflexTimerRef.current = setTimeout(() => {
      setReflexState("ready");
      reflexStartRef.current = Date.now();
    }, delay);
  };

  const handleReflexClick = () => {
    if (reflexState === "waiting") {
      if (reflexTimerRef.current) clearTimeout(reflexTimerRef.current);
      setReflexState("idle");
      alert("Too early! Wait for the signal to turn GREEN.");
    } else if (reflexState === "ready") {
      const ms = Date.now() - reflexStartRef.current;
      setReflexTime(ms);
      setReflexState("result");
    } else if (reflexState === "result" || reflexState === "idle") {
      startReflex();
    }
  };

  const toggleLofi = () => {
    const state = lofiAudio.toggle();
    setIsPlayingLofi(state);
  };

  useEffect(() => {
    return () => {
      if (reflexTimerRef.current) clearTimeout(reflexTimerRef.current);
    };
  }, []);

  return (
    <div className="p-4 sm:p-5 flex flex-col gap-4 font-sans text-xs">
      <div className="flex items-center justify-between border-b border-black/10 pb-3">
        <p className="font-mono text-xs font-semibold text-black/70">
          Four small things to do instead of reading a résumé.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setActiveTab("typing")}
          className={`rounded-md border-2 border-black px-3 py-1 font-mono text-[11px] font-bold uppercase transition-all ${
            activeTab === "typing"
              ? "bg-[#ffe600] shadow-[2px_2px_0px_#000]"
              : "bg-white text-black/70 hover:bg-black/5"
          }`}
        >
          ⌨️ Typing Test
        </button>
        <button
          onClick={() => setActiveTab("reflex")}
          className={`rounded-md border-2 border-black px-3 py-1 font-mono text-[11px] font-bold uppercase transition-all ${
            activeTab === "reflex"
              ? "bg-[#a6ff00] shadow-[2px_2px_0px_#000]"
              : "bg-white text-black/70 hover:bg-black/5"
          }`}
        >
          ⚡ Latency Benchmark
        </button>
        <button
          onClick={() => setActiveTab("lofi")}
          className={`rounded-md border-2 border-black px-3 py-1 font-mono text-[11px] font-bold uppercase transition-all ${
            activeTab === "lofi"
              ? "bg-[#ff66c4] shadow-[2px_2px_0px_#000]"
              : "bg-white text-black/70 hover:bg-black/5"
          }`}
        >
          🎵 Lofi Ambient
        </button>
      </div>

      {/* 1. Typing Game Content */}
      {activeTab === "typing" && (
        <div className="flex flex-col gap-3 rounded-lg border-2 border-black bg-[#faf8f5] p-3.5 shadow-[2px_2px_0px_#000]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] font-black uppercase text-black/50">
              Type the code snippet:
            </span>
            {wpm !== null && (
              <span className="rounded border border-black bg-[#a6ff00] px-2 py-0.5 font-mono text-[10px] font-black text-black">
                {wpm} WPM 🔥
              </span>
            )}
          </div>

          <div className="font-mono text-[11px] bg-white p-2.5 rounded border border-black/20 text-black select-none tracking-tight">
            {targetSnippet}
          </div>

          <input
            type="text"
            value={inputVal}
            onChange={handleTypingChange}
            disabled={isFinished}
            placeholder="Start typing here..."
            className="w-full rounded border-2 border-black bg-white px-3 py-1.5 font-mono text-xs text-black outline-none focus:ring-2 focus:ring-[#ffe600]"
          />

          {isFinished && (
            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-xs font-bold text-green-700">
                ✓ Perfect! You hit {wpm} Words Per Minute!
              </span>
              <button
                onClick={resetTyping}
                className="rounded border border-black bg-[#ffe600] px-2.5 py-1 font-mono text-[10px] font-black uppercase shadow-[1px_1px_0px_#000] hover:bg-yellow-400"
              >
                Next Snippet &rarr;
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Reflex Game Content */}
      {activeTab === "reflex" && (
        <div className="flex flex-col gap-3">
          <div
            onClick={handleReflexClick}
            className={`flex h-32 cursor-pointer flex-col items-center justify-center rounded-lg border-3 border-black text-center transition-all ${
              reflexState === "idle"
                ? "bg-white hover:bg-gray-50 shadow-[3px_3px_0px_#000]"
                : reflexState === "waiting"
                ? "bg-[#ff5964] text-white shadow-[3px_3px_0px_#000]"
                : reflexState === "ready"
                ? "bg-[#a6ff00] text-black shadow-[4px_4px_0px_#000] scale-102"
                : "bg-[#ffe600] text-black shadow-[3px_3px_0px_#000]"
            }`}
          >
            {reflexState === "idle" && (
              <>
                <span className="font-display text-base font-black uppercase">
                  Click to Test Reaction
                </span>
                <span className="font-mono text-[10px] text-black/60">
                  Click, then click again when the box turns GREEN!
                </span>
              </>
            )}
            {reflexState === "waiting" && (
              <span className="font-mono text-sm font-black uppercase animate-pulse">
                Wait for green...
              </span>
            )}
            {reflexState === "ready" && (
              <span className="font-display text-2xl font-black uppercase">
                CLICK NOW!!
              </span>
            )}
            {reflexState === "result" && reflexTime && (
              <>
                <span className="font-display text-2xl font-black">
                  {reflexTime} ms
                </span>
                <span className="font-mono text-[10px] font-bold">
                  {reflexTime < 220
                    ? "🚀 Sub-token latency! Faster than GPT-4o!"
                    : reflexTime < 320
                    ? "⚡ Fast human reflexes!"
                    : "🐢 Slower than a cold LLM start. Try again!"}
                </span>
                <span className="mt-1 font-mono text-[9px] underline">Click to test again</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* 3. Lofi Ambient Content */}
      {activeTab === "lofi" && (
        <div className="flex flex-col gap-3 rounded-lg border-2 border-black bg-[#faf8f5] p-4 shadow-[2px_2px_0px_#000]">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase text-black">
              Procedural Lofi Synthesizer
            </span>
            <span className="rounded-full border border-black bg-white px-2 py-0.5 font-mono text-[9px] font-bold text-black/70">
              Web Audio API
            </span>
          </div>
          <p className="font-mono text-[11px] text-black/70 leading-relaxed">
            Generates relaxing minor 7th jazz chords dynamically in your browser. Zero external mp3s or trackers.
          </p>

          <button
            onClick={toggleLofi}
            className={`flex items-center justify-center gap-2 rounded-lg border-2 border-black px-4 py-2.5 font-mono text-xs font-black uppercase transition-all shadow-[2px_2px_0px_#000] ${
              isPlayingLofi
                ? "bg-[#a6ff00] hover:bg-lime-400"
                : "bg-[#ffe600] hover:bg-yellow-400"
            }`}
          >
            {isPlayingLofi ? "⏸️ Pause Lofi Beats" : "▶️ Play Ambient Lofi Chords"}
          </button>
        </div>
      )}
    </div>
  );
}
