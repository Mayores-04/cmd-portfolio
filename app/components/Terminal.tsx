"use client";

import React, { useEffect, useState, useRef } from "react";
import TerminalNav from "./TerminalNav";
import TerminalOutput from "./TerminalOutput";
import NavigationButtons from "./NavigationButtons";
import HelpPanel from "./HelpPanel";
import FirstTimeGuide from "./FirstTimeGuide";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of left terminal
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history, isBooting]);

  // Keep input focused (desktop only)
  useEffect(() => {
    // Check if device is touch device (mobile)
    const isTouchDevice = () => {
      return (
        (typeof window !== "undefined" &&
          ("ontouchstart" in window ||
            (navigator as any).maxTouchPoints > 0)) ||
        false
      );
    };

    const focusInput = (e?: MouseEvent) => {
      // Only focus if click is NOT inside an input or textarea
      // AND not on mobile/touch device
      if (
        !isBooting &&
        inputRef.current &&
        !isTouchDevice() &&
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
    // Don't auto-focus on mount for mobile
    if (!isTouchDevice()) {
      focusInput();
    }
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

    // Close mobile menu when help command is executed
    if (
      trimmedCmd.toLowerCase() === "help" ||
      trimmedCmd.toLowerCase() === "0" ||
      trimmedCmd.toLowerCase() === "menu"
    ) {
      setMobileMenuOpen(false);
    }

    const newPath = getPathForCommand(trimmedCmd, path);
    const { type } = getTerminalOutputType(trimmedCmd, path);
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
    if (path !== currentPath) {
      return false;
    }

    // Keep home highlighted when user is at root (~).
    if (currentPath === "~") {
      return ["0", "home"].includes(cmd.toLowerCase());
    }

    return true;
  };

  return (
    <div className="flex flex-col w-full h-screen bg-black overflow-hidden relative font-mono text-sm sm:text-base">
      {/* Subtle CRT Scanline Overlay */}
      <div className="absolute inset-0 scanline z-50 pointer-events-none opacity-50"></div>

      {/* Navigation Buttons */}
      <NavigationButtons
        currentPath={path}
        executeCommand={executeCommand}
        isBooting={isBooting}
      />

      {/* Help Panel */}
      <HelpPanel />

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row flex-1 gap-1 p-1 overflow-hidden">
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
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <TerminalOutput
          isBooting={isBooting}
          currentOutput={currentOutput}
          path={path}
          executeCommand={executeCommand}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      </div>

      {/* First Time Guide */}
      <FirstTimeGuide executeCommand={executeCommand} />
    </div>
  );
}
