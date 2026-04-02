import React from "react";
import TerminalNav from "./TerminalNav";
import TerminalOutput from "./TerminalOutput";

interface MobileLayoutProps {
  isBooting: boolean;
  history: { id: string; command?: string; path: string }[];
  executeCommand: (cmd: string, silent?: boolean) => void;
  isCmdActive: (cmd: string) => boolean;
  input: string;
  setInput: (val: string) => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  currentOutput: React.ReactNode;
  path: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
  onLayoutClick: () => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export default function MobileLayout({
  isBooting,
  history,
  executeCommand,
  isCmdActive,
  input,
  setInput,
  inputRef,
  handleKeyDown,
  currentOutput,
  path,
  mobileMenuOpen,
  setMobileMenuOpen,
  onLayoutClick,
  bottomRef,
}: MobileLayoutProps) {
  return (
    <div className="flex md:hidden flex-col flex-1 gap-1 p-1 overflow-hidden">
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
        onMinimize={() => {}}
        isDesktopOnly={false}
        onLayoutClick={onLayoutClick}
      />
      <TerminalOutput
        isBooting={isBooting}
        currentOutput={currentOutput}
        path={path}
        executeCommand={executeCommand}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onMinimize={() => {}}
      />
    </div>
  );
}
