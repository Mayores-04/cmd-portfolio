import React, { useState } from "react";
import { X } from "lucide-react";
import ClickableCmd from "./shared/ClickableCmd";
import TerminalPrompt from "./TerminalPrompt";

interface TerminalNavProps {
  isBooting: boolean;
  history: { id: string; command?: string; path: string }[];
  executeCommand: (cmd: string, silent?: boolean) => void;
  isCmdActive: (cmd: string) => boolean;
  input: string;
  setInput: (val: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  onMinimize?: () => void;
  isDesktopOnly?: boolean;
  onLayoutClick?: () => void;
}

const TerminalNav: React.FC<TerminalNavProps> = ({
  isBooting,
  history,
  executeCommand,
  isCmdActive,
  input,
  setInput,
  inputRef,
  handleKeyDown,
  bottomRef,
  mobileMenuOpen,
  setMobileMenuOpen,
  onMinimize,
  isDesktopOnly = false,
  onLayoutClick,
}) => {
  const [touchStart, setTouchStart] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;
    // If swiped left more than 50px, close the menu
    if (distance > 50) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Overlay - only on mobile */}
      {!isDesktopOnly && mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Navigation Container */}
      <div
        onTouchStart={!isDesktopOnly ? handleTouchStart : undefined}
        onTouchEnd={!isDesktopOnly ? handleTouchEnd : undefined}
        className={`flex flex-col ${
          !isDesktopOnly && mobileMenuOpen
            ? "translate-x-0"
            : !isDesktopOnly
              ? "-translate-x-full"
              : ""
        } ${!isDesktopOnly ? "md:translate-x-0 transition-transform duration-300 fixed md:relative bottom-0 left-0 w-full md:w-[25%]" : ""} h-[100vh] md:h-full bg-term-bg border border-[#333] rounded-sm overflow-hidden ${isDesktopOnly ? "" : "z-40 md:z-10"}`}
      >
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
              jake_portfolio MINGW64:/~jake/nav
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* Close button for mobile menu - only on mobile */}
            {!isDesktopOnly && (
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="md:hidden flex items-center justify-center p-1 text-term-gray hover:text-term-green transition-colors"
                aria-label="Close menu"
                title="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Desktop window control buttons (hidden on mobile) */}
            <div className="hidden md:flex items-center gap-2 text-term-gray">
              {/* Minimize button */}
              <button
                onClick={onMinimize}
                className="flex items-center justify-center w-6 h-6 rounded hover:bg-[#444] transition-colors text-xs font-bold"
                aria-label="Minimize"
                title="Minimize"
              >
                −
              </button>
              {/* Maximize/Layout button */}
              <button
                onClick={onLayoutClick}
                className="flex items-center justify-center w-6 h-6 rounded hover:bg-[#444] transition-colors text-xs cursor-pointer"
                aria-label="Layout options"
                title="Change layout"
              >
                □
              </button>
              {/* Close button (visual only on non-mobile) */}
              <button
                className="flex items-center justify-center w-6 h-6 rounded hover:bg-[#444] transition-colors"
                aria-label="Close"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Desktop: empty space for window controls */}
            <div className="hidden md:flex items-center gap-4 text-[#888]">
              {/* ...window controls... */}
            </div>
          </div>
        </div>
        {/* Terminal Body */}
        <div className="flex-1 overflow-y-auto p-4 scrollbar-hide flex flex-col">
          {/* Static Navigation Menu */}
          <div className="flex flex-col gap-1 mb-6">
            <div className="text-term-green whitespace-pre font-bold hidden xl:block text-xs">
              {`  ╔══════════════════════════════════════╗\n  ║   Hello! I'm Jake Mayores            ║\n  ║   Fullstack Web Developer            ║\n  ╚══════════════════════════════════════╝`}
            </div>

            <div className="text-term-green whitespace-pre font-bold hidden xl:block text-xs">
              {`  ╔══════════════════════════════════════╗\n  ║   `}
              <span className="text-white">Select a Destination:</span>
              {`              ║\n  ╚══════════════════════════════════════╝`}
            </div>

            <div className="mt-2 mb-2 flex flex-wrap items-center gap-2">
              <div className="flex flex-wrap items-center gap-x-2 text-sm sm:text-base select-none">
                <span className="text-term-green font-bold">
                  jake_portfolio
                </span>
                <span className="text-term-purple font-bold">MINGW64</span>
              </div>

              <span className="text-term-text">~$</span>
              <span className="text-term-sm">ls -l</span>
            </div>

            {[
              { key: "0", label: "home", desc: "Home page" },
              { key: "1", label: "about", desc: "profile and values" },
              { key: "2", label: "projects", desc: "work and stack" },
              { key: "3", label: "contact", desc: "reach me directly" },
              { key: "4", label: "socials", desc: "social accounts" },
              { key: "5", label: "resume", desc: "download and summary" },
            ].map((item) => (
              <div
                className="flex gap-3 items-baseline text-sm cursor-pointer"
                key={item.key}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="w-8 text-term-yellow">[{item.key}]</span>
                <ClickableCmd
                  cmdText={item.key}
                  label={item.label}
                  runCommand={executeCommand}
                  isActive={isCmdActive(item.key)}
                />
                <span className="text-term-gray text-xs hidden lg:inline">
                  # {item.desc}
                </span>
              </div>
            ))}
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
                  inputMode="none"
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
            for command docs, or{" "}
            <ClickableCmd
              cmdText="clear"
              label="'clear'"
              runCommand={executeCommand}
            />
          </div>
          <div ref={bottomRef} className="h-4" />
        </div>
      </div>
    </>
  );
};

export default TerminalNav;
