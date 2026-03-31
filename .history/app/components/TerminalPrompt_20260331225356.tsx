"use client";

import React from "react";
interface TerminalPromptProps {
  path?: string;
}
export default function TerminalPrompt({ path = "~" }: TerminalPromptProps) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 text-sm sm:text-base select-none">
      <span className="text-term-green font-bold">jake@portfolio</span>
      <span className="text-term-purple font-bold">MINGW64</span>
      <span className="text-term-yellow font-bold">{path}</span>
    </div>
  );
}
