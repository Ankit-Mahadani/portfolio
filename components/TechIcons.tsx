import type { ReactNode } from "react";

export function TechIcon({ name }: { name: string }): ReactNode {
  const key = name.toLowerCase().replace(/[\s\-_.]/g, "");

  switch (key) {
    case "python":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.92 2C6.98 2 7.25 4.14 7.25 4.14V6.38H12.1V7.15H4.27C4.27 7.15 2 6.89 2 11.83C2 16.77 3.98 16.53 3.98 16.53H5.32V14.54C5.32 14.54 5.25 12.18 7.66 12.18H12.44C12.44 12.18 14.71 12.24 14.71 10.03V4.28C14.71 4.28 15.09 2 11.92 2ZM9.5 3.38C9.91 3.38 10.25 3.72 10.25 4.13C10.25 4.54 9.91 4.88 9.5 4.88C9.09 4.88 8.75 4.54 8.75 4.13C8.75 3.72 9.09 3.38 9.5 3.38Z"
            fill="#3776AB"
          />
          <path
            d="M12.08 22C17.02 22 16.75 19.86 16.75 19.86V17.62H11.9V16.85H19.73C19.73 16.85 22 17.11 22 12.17C22 7.23 20.02 7.47 20.02 7.47H18.68V9.46C18.68 9.46 18.75 11.82 16.34 11.82H11.56C11.56 11.82 9.29 11.76 9.29 13.97V19.72C9.29 19.72 8.91 22 12.08 22ZM14.5 20.62C14.09 20.62 13.75 20.28 13.75 19.87C13.75 19.46 14.09 19.12 14.5 19.12C14.91 19.12 15.25 19.46 15.25 19.87C15.25 20.28 14.91 20.62 14.5 20.62Z"
            fill="#FFD43B"
          />
        </svg>
      );

    case "typescript":
    case "ts":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-[#3178C6] text-[8px] font-black text-white">
          TS
        </span>
      );

    case "javascript":
    case "js":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-[#F7DF1E] text-[8px] font-black text-black">
          JS
        </span>
      );

    case "react":
      return (
        <svg className="h-4 w-4 shrink-0 text-[#61DAFB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="currentColor" />
        </svg>
      );

    case "nextjs":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-black text-[9px] font-black text-white">
          N
        </span>
      );

    case "nodejs":
    case "node":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#339933">
          <path d="M12 2L3 7.2v9.6l9 5.2 9-5.2V7.2L12 2zm0 2.3l6.9 4v7.4L12 19.7l-6.9-4V8.3L12 4.3z" />
        </svg>
      );

    case "express":
    case "expressjs":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border border-black/30 bg-black/5 text-[8px] font-black text-black">
          eX
        </span>
      );

    case "fastapi":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#05998B] text-[9px] font-black text-white">
          ⚡
        </span>
      );

    case "pytorch":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#EE4C2C">
          <path d="M13.5 2.5a.5.5 0 0 0-.8.4v3.2a6 6 0 1 0 5.4 3.4.5.5 0 0 0-.9-.4 5 5 0 1 1-4.5-2.8V3a.5.5 0 0 0-.2-.5z" />
          <circle cx="16" cy="5" r="1.5" />
        </svg>
      );

    case "postgresql":
    case "postgres":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#336791">
          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 16.5h-2v-4.5h2v4.5zm2.5-6.5h-7c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5h7c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z" />
        </svg>
      );

    case "mysql":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#00758F">
          <path d="M12 3c-4.5 0-8 3-8 7 0 2.5 1.5 5 4 6.5L10 20l3.5-2c3.5-.5 6.5-3 6.5-6 0-4-3.5-7-8-7z" />
        </svg>
      );

    case "redis":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-[#DC382D] text-[9px] font-black text-white">
          ⬡
        </span>
      );

    case "dynamodb":
      return (
        <span className="flex h-3.5 px-1 shrink-0 items-center justify-center rounded-[2px] bg-[#232F3E] text-[7px] font-black text-[#FF9900]">
          aws
        </span>
      );

    case "prisma":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#2D3748">
          <path d="M12 2L3 21h18L12 2zm0 4.5l5.5 11.5H6.5L12 6.5z" />
        </svg>
      );

    case "aws":
      return (
        <span className="flex h-3.5 px-1 shrink-0 items-center justify-center rounded-[2px] bg-[#232F3E] text-[7px] font-black text-[#FF9900]">
          aws
        </span>
      );

    case "s3":
      return (
        <span className="flex h-3.5 px-1 shrink-0 items-center justify-center rounded-[2px] bg-[#232F3E] text-[7px] font-black text-[#FF9900]">
          aws
        </span>
      );

    case "docker":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#2496ED">
          <path d="M22 12c-.5-1-1.5-1.5-3-1.5h-1V9h-2V7h-2V5h-2v2H8V5H6v4H4v1.5H2C1 12 1 14 3 16c3 3 8 3 13 2 4-.8 6-3 6-6zm-7-1.5h1.5v1.5H15v-1.5zm-3 0h1.5v1.5H12v-1.5zm-3 0h1.5v1.5H9v-1.5zm-3 0h1.5v1.5H6v-1.5z" />
        </svg>
      );

    case "git":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#F05032">
          <path d="M21.7 10.7l-8.4-8.4c-.4-.4-1.1-.4-1.5 0L9.4 4.7l2.8 2.8c.4-.1.8 0 1.1.3.4.4.4 1 0 1.4-.4.4-1 .4-1.4 0-.3-.3-.4-.7-.3-1.1L8.8 5.3 2.3 11.8c-.4.4-.4 1.1 0 1.5l8.4 8.4c.4.4 1.1.4 1.5 0l9.5-9.5c.4-.4.4-1.1 0-1.5z" />
        </svg>
      );

    case "githubactions":
    case "github":
      return (
        <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="#181717">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.4-3.4-1.4-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.7-1.4-2.2-.2-4.6-1.1-4.6-4.9 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1 .8-.2 1.7-.3 2.5-.3.8 0 1.7.1 2.5.3 1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.8-2.4 4.7-4.6 4.9.4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5 4-1.3 6.8-5.1 6.8-9.5 0-5.5-4.5-10-10-10z" />
        </svg>
      );

    case "jest":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-[#C21325]/15 text-[11px]">
          🃏
        </span>
      );

    case "vitest":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#FCC72B]/20 text-[10px] font-black text-[#729B1B]">
          ⚡
        </span>
      );

    case "pytest":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#0A9EDC]/20 text-[9px] font-black text-[#0A9EDC]">
          ✓
        </span>
      );

    case "cpp":
    case "c++":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-[#00599C] text-[8px] font-black text-white">
          C++
        </span>
      );

    case "java":
      return (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] bg-[#ED8B00] text-[8px] font-black text-white">
          ☕
        </span>
      );

    case "sql":
    case "sqlite":
      return (
        <svg className="h-4 w-4 shrink-0 text-[#003B57]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
      );

    default:
      return null;
  }
}
