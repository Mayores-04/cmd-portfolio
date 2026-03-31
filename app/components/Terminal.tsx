"use client";

import React, { useEffect, useState, useRef } from "react";
import TerminalNav from "./TerminalNav";
import TerminalOutput from "./TerminalOutput";
import {
  getPathForCommand,
  getTerminalOutputType,
} from "@/services/terminalService";
import { generateOutput } from "./shared/generateOutput";

interface HistoryItem {
  id: string;
  command?: string;
  path: string;
}

export default function Terminal() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [path, setPath] = useState("~");
  const [isBooting, setIsBooting] = useState(true);
  const [currentOutput, setCurrentOutput] = useState<React.ReactNode>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of left terminal
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history, isBooting]);

  // Keep input focused
  useEffect(() => {
    const focusInput = (e?: MouseEvent) => {
      // Only focus if click is NOT inside an input or textarea
      if (
        !isBooting &&
        inputRef.current &&
        (!e ||
          !(
            e.target instanceof HTMLElement &&
            (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
          ))
      ) {
        inputRef.current.focus();
      }
    };
    document.addEventListener("click", focusInput);
    focusInput();
    return () => document.removeEventListener("click", focusInput);
  }, [isBooting]);

  // Boot sequence
  useEffect(() => {
    const bootSequence = async () => {
      const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
      setHistory([
        {
          id: "boot-1",
          path: "~",
        },
      ]);
      await sleep(600);
      setHistory((prev) => [
        ...prev,
        {
          id: "boot-2",
          path: "~",
        },
      ]);
      await sleep(400);
      setHistory((prev) => [
        ...prev,
        {
          id: "boot-3",
          path: "~",
        },
      ]);
      await sleep(500);
      setIsBooting(false);
      setCurrentOutput(
        generateOutput("home", (c: string) => executeCommand(c)),
      );
    };
    bootSequence();
    // eslint-disable-next-line
    // react-hooks/exhaustive-deps
  }, []);

  const executeCommand = (cmd: string, silent = false) => {
    const trimmedCmd = cmd.trim();
    if (trimmedCmd.toLowerCase() === "clear") {
      setHistory([]);
      return;
    }
    const newPath = getPathForCommand(trimmedCmd, path);
    const { type } = getTerminalOutputType(trimmedCmd);
    const output = generateOutput(type, (c: string) => executeCommand(c));
    if (output) {
      setCurrentOutput(output);
      setPath(newPath);
    }
    setHistory((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: silent ? undefined : trimmedCmd,
        path: "~",
      },
    ]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        executeCommand(input);
      } else {
        setHistory((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            command: "",
            path: "~",
          },
        ]);
      }
      setInput("");
    }
  };

  const isCmdActive = (cmd: string) => {
    const currentPath = getPathForCommand(cmd, "~");
    return path === currentPath && path !== "~";
  };

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-black overflow-hidden relative font-mono text-sm sm:text-base gap-1 p-1">
      {/* Subtle CRT Scanline Overlay */}
      <div className="absolute inset-0 scanline z-50 pointer-events-none opacity-50"></div>
      <TerminalNav
        isBooting={isBooting}
        history={history}
        executeCommand={executeCommand}
        isCmdActive={isCmdActive}
        input={input}
        setInput={setInput}
        inputRef={inputRef}
        handleKeyDown={handleKeyDown}
        bottomRef={bottomRef}
      />
      <TerminalOutput
        isBooting={isBooting}
        currentOutput={currentOutput}
        path={path}
      />
    </div>
  );
}
