"use client";

import React, { useEffect, useState, useRef } from "react";
import { TerminalPrompt } from "./TerminalPrompt";
import { generateOutput, getPathForCommand } from "@/utils/commands";
import { Minus, Square, X } from "lucide-react";
import { motion } from "framer-motion";
interface HistoryItem {
  id: string;
  command?: string;
  path: string;
}
const ClickableCmd = ({
  cmdText,
  label,
  runCommand,
  isActive,
}: {
  cmdText: string;
  label: string;
  runCommand: (cmd: string) => void;
  isActive?: boolean;
}) => (
  <span
    className={`cursor-pointer transition-colors ${isActive ? "text-term-green font-bold underline" : "text-term-cyan hover:text-white hover:underline"}`}
    onClick={() => runCommand(cmdText)}
  >
    {label}
  </span>
);
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
    const focusInput = () => {
      if (!isBooting && inputRef.current) {
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
      // Initial output state
      setCurrentOutput(
        generateOutput("home", (c: string) => executeCommand(c)),
      );
    };
    bootSequence();
  }, []);
  const executeCommand = (cmd: string, silent = false) => {
    const trimmedCmd = cmd.trim();
    if (trimmedCmd.toLowerCase() === "clear") {
      setHistory([]);
      return;
    }
    const newPath = getPathForCommand(trimmedCmd, path);
    // Only update output if it's a valid command that returns something
    const output = generateOutput(trimmedCmd, (c: string) => executeCommand(c));
    if (output) {
      setCurrentOutput(output);
      setPath(newPath);
    }
    setHistory((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        command: silent ? undefined : trimmedCmd,
        path: "~", // Left terminal always stays at ~
      },
    ]);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (input.trim()) {
        executeCommand(input);
      } else {
        // Just add an empty prompt line
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

      {/* LEFT TERMINAL (Navigation) */}
      <div className="flex flex-col w-full md:w-[35%] h-[40%] md:h-full bg-term-bg border border-[#333] rounded-sm overflow-hidden z-10">
        {/* Window Chrome */}
        <div className="flex items-center justify-between bg-[#1E1E1E] px-4 py-2 border-b border-[#333] select-none">
          <div className="flex items-center gap-2">
            <img
              src="https://git-scm.com/favicon.ico"
              alt="Git"
              className="w-4 h-4 opacity-80"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="text-term-text text-xs sm:text-sm truncate">
              MINGW64:/~jake/nav
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#888]">
            <Minus
              size={14}
              className="hover:text-white cursor-pointer transition-colors"
            />
            <Square
              size={12}
              className="hover:text-white cursor-pointer transition-colors"
            />
            <X
              size={14}
              className="hover:text-term-red cursor-pointer transition-colors"
            />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide flex flex-col">
          {/* Static Navigation Menu */}
          <div className="flex flex-col gap-1 mb-6">
            <div className="text-term-green whitespace-pre font-bold hidden xl:block text-xs">
              {`  ╔══════════════════════════════════════╗
  ║   Hello! I'm Jake Mayores            ║
  ║   Front-end Web Developer            ║
  ╚══════════════════════════════════════╝`}
            </div>
            <div className="text-term-green font-bold xl:hidden border border-term-green p-2 mb-2 inline-block text-xs">
              Hello! I'm Jake Mayores
              <br />
              Front-end Web Developer
            </div>

            <div className="mt-2 mb-2 text-term-text">
              Select a destination:
            </div>

            <div className="flex gap-4">
              <span className="w-8 text-term-yellow">[1]</span>
              <ClickableCmd
                cmdText="1"
                label="about"
                runCommand={executeCommand}
                isActive={isCmdActive("1")}
              />
            </div>
            <div className="flex gap-4">
              <span className="w-8 text-term-yellow">[2]</span>
              <ClickableCmd
                cmdText="2"
                label="projects"
                runCommand={executeCommand}
                isActive={isCmdActive("2")}
              />
            </div>
            <div className="flex gap-4">
              <span className="w-8 text-term-yellow">[3]</span>
              <ClickableCmd
                cmdText="3"
                label="contact"
                runCommand={executeCommand}
                isActive={isCmdActive("3")}
              />
            </div>
            <div className="flex gap-4">
              <span className="w-8 text-term-yellow">[4]</span>
              <ClickableCmd
                cmdText="4"
                label="socials"
                runCommand={executeCommand}
                isActive={isCmdActive("4")}
              />
            </div>
            <div className="flex gap-4">
              <span className="w-8 text-term-yellow">[5]</span>
              <ClickableCmd
                cmdText="5"
                label="resume"
                runCommand={executeCommand}
                isActive={isCmdActive("5")}
              />
            </div>
          </div>

          {/* History */}
          {isBooting ? (
            <div className="flex flex-col gap-1">
              {history.map((item, i) => (
                <div key={item.id} className="text-term-gray">
                  {i === 0 && "Starting portfolio environment..."}
                  {i === 1 && "Loading modules: [OK]"}
                  {i === 2 && "Mounting file system: [OK]"}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col gap-1">
              {history.map((item) => (
                <div key={item.id} className="flex flex-col">
                  {item.command !== undefined && (
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <TerminalPrompt path={item.path} />
                      <span className="text-term-text break-all">
                        $ {item.command}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Current Input Line */}
          {!isBooting && (
            <div className="flex flex-wrap items-center gap-2 mt-2 relative">
              <TerminalPrompt path="~" />
              <div className="flex items-center flex-1 min-w-[100px] relative">
                <span className="text-term-text mr-2">$</span>
                <span className="text-term-text whitespace-pre">{input}</span>
                <span className="animate-blink text-term-text ml-[1px]">█</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="absolute inset-0 opacity-0 cursor-text w-full h-full"
                  spellCheck={false}
                  autoComplete="off"
                  autoFocus
                />
              </div>
            </div>
          )}

          <div className="mt-auto pt-4 text-term-gray text-xs">
            Hint: Type{" "}
            <ClickableCmd
              cmdText="help"
              label="'help'"
              runCommand={executeCommand}
            />{" "}
            or{" "}
            <ClickableCmd
              cmdText="clear"
              label="'clear'"
              runCommand={executeCommand}
            />
          </div>
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>

      {/* RIGHT TERMINAL (Output) */}
      <div className="flex flex-col w-full md:w-[65%] h-[60%] md:h-full bg-term-bg border border-[#333] rounded-sm overflow-hidden z-10">
        {/* Window Chrome */}
        <div className="flex items-center justify-between bg-[#1E1E1E] px-4 py-2 border-b border-[#333] select-none">
          <div className="flex items-center gap-2">
            <img
              src="https://git-scm.com/favicon.ico"
              alt="Git"
              className="w-4 h-4 opacity-80"
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <span className="text-term-text text-xs sm:text-sm truncate">
              MINGW64:/~jake/output{path !== "~" ? path.replace("~", "") : ""}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[#888]">
            <Minus
              size={14}
              className="hover:text-white cursor-pointer transition-colors"
            />
            <Square
              size={12}
              className="hover:text-white cursor-pointer transition-colors"
            />
            <X
              size={14}
              className="hover:text-term-red cursor-pointer transition-colors"
            />
          </div>
        </div>

        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 scrollbar-hide relative">
          {!isBooting && currentOutput && (
            <motion.div
              key={path} // Force re-render/animation on path change
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.3,
              }}
              className="h-full"
            >
              {currentOutput}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
