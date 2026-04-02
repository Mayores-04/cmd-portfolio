"use client";

import React, { useEffect, useState, useRef } from "react";
import TerminalNav from "./TerminalNav";
import TerminalOutput from "./TerminalOutput";
import NavigationButtons from "./NavigationButtons";
import HelpPanel from "./HelpPanel";
import FirstTimeGuide from "./FirstTimeGuide";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";
import LayoutSwitcher from "./LayoutSwitcher";
import FloatingRestoreButtons from "./FloatingRestoreButtons";
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
  const [layoutSource, setLayoutSource] = useState<"input" | "output">("input");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [input, setInput] = useState("");
  const [path, setPath] = useState("~");
  const [isBooting, setIsBooting] = useState(true);
  const [currentOutput, setCurrentOutput] = useState<React.ReactNode>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [inputMinimized, setInputMinimized] = useState(false);
  const [outputMinimized, setOutputMinimized] = useState(false);
  const [inputWidth, setInputWidth] = useState(25); // Default 25% for input terminal
  const [isResizing, setIsResizing] = useState(false);
  const [layout, setLayout] = useState<
    "input-left" | "input-right" | "input-full" | "output-full"
  >("input-left");
  const [showLayoutMenu, setShowLayoutMenu] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of left terminal
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [history, isBooting]);

  // Resize handler for dragging divider
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      const newWidth =
        ((e.clientX - containerRect.left) / containerRect.width) * 100;

      // Minimum 25% for input, maximum 50%
      if (newWidth >= 25 && newWidth <= 50) {
        setInputWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

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

      {/* Desktop Layout */}
      <DesktopLayout
        layout={layout}
        isBooting={isBooting}
        history={history}
        executeCommand={executeCommand}
        isCmdActive={isCmdActive}
        input={input}
        setInput={setInput}
        inputRef={inputRef}
        handleKeyDown={handleKeyDown}
        currentOutput={currentOutput}
        path={path}
        inputMinimized={inputMinimized}
        outputMinimized={outputMinimized}
        inputWidth={inputWidth}
        setInputWidth={setInputWidth}
        setInputMinimized={setInputMinimized}
        setOutputMinimized={setOutputMinimized}
        onInputLayoutClick={() => {
          setLayoutSource("input");
          setShowLayoutMenu(true);
        }}
        onOutputLayoutClick={() => {
          setLayoutSource("output");
          setShowLayoutMenu(true);
        }}
        bottomRef={bottomRef}
      />

      {/* Mobile Layout */}
      <MobileLayout
        isBooting={isBooting}
        history={history}
        executeCommand={executeCommand}
        isCmdActive={isCmdActive}
        input={input}
        setInput={setInput}
        inputRef={inputRef}
        handleKeyDown={handleKeyDown}
        currentOutput={currentOutput}
        path={path}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onLayoutClick={() => setShowLayoutMenu(true)}
        bottomRef={bottomRef}
      />

      {/* Layout Switcher Modal */}
      <LayoutSwitcher
        isOpen={showLayoutMenu}
        onClose={() => setShowLayoutMenu(false)}
        currentLayout={layout}
        activeTerminal={layoutSource}
        fullLayoutTarget={layoutSource}
        onLayoutSelect={(newLayout) => {
          const resolvedLayout =
            newLayout === "input-full" || newLayout === "output-full"
              ? layoutSource === "output"
                ? "output-full"
                : "input-full"
              : newLayout;

          setLayout(resolvedLayout);

          if (resolvedLayout === "input-full") {
            setInputMinimized(false);
            setOutputMinimized(true);
          } else if (resolvedLayout === "output-full") {
            setInputMinimized(true);
            setOutputMinimized(false);
          } else {
            // Split layouts should always restore both terminals.
            setInputMinimized(false);
            setOutputMinimized(false);
          }
        }}
      />

      {/* Floating Restore Buttons */}
      <FloatingRestoreButtons
        inputMinimized={inputMinimized}
        outputMinimized={outputMinimized}
        onRestoreInput={() => {
          setInputMinimized(false);
          setLayout("input-left");
        }}
        onRestoreOutput={() => {
          setOutputMinimized(false);
          setLayout("input-left");
        }}
      />

      {/* First Time Guide */}
      <FirstTimeGuide executeCommand={executeCommand} />
    </div>
  );
}
