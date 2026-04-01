import React, { useState } from "react";
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
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden fixed bottom-4 right-4 z-50 p-3 bg-[#1E1E1E] border border-[#333] rounded-sm hover:bg-[#2E2E2E] transition-colors"
        aria-label="Toggle navigation"
      >
        <img
          src="https://git-scm.com/favicon.ico"
          alt="Menu"
          className="w-6 h-6 opacity-80"
          onError={(e) => (e.currentTarget.style.display = "none")}
        />
      </button>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Navigation */}
      <div
        className={`flex flex-col ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 fixed md:relative bottom-0 left-0 w-full md:w-[35%] h-[100vh] md:h-full bg-term-bg border border-[#333] rounded-sm overflow-hidden z-40 md:z-10`}
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
          <div className="flex items-center gap-4 text-[#888]">
            {/* ...window controls... */}
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
