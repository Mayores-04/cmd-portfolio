import React, { useRef, useState, useEffect } from "react";
import TerminalNav from "./TerminalNav";
import TerminalOutput from "./TerminalOutput";

interface DesktopLayoutProps {
  layout: "input-left" | "input-right" | "input-full" | "output-full";
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
  inputMinimized: boolean;
  outputMinimized: boolean;
  inputWidth: number;
  setInputWidth: (width: number) => void;
  setInputMinimized: (minimized: boolean) => void;
  setOutputMinimized: (minimized: boolean) => void;
  onInputLayoutClick: () => void;
  onOutputLayoutClick: () => void;
  bottomRef: React.RefObject<HTMLDivElement | null>;
}

export default function DesktopLayout({
  layout,
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
  inputMinimized,
  outputMinimized,
  inputWidth,
  setInputWidth,
  setInputMinimized,
  setOutputMinimized,
  onInputLayoutClick,
  onOutputLayoutClick,
  bottomRef,
}: DesktopLayoutProps) {
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
  }, [isResizing, setInputWidth]);

  return (
    <div
      className="hidden md:flex flex-row flex-1 gap-1 p-1 overflow-hidden"
      ref={containerRef}
    >
      {/* Layout: Input Left (default) */}
      {layout === "input-left" && (
        <>
          {!inputMinimized && (
            <>
              <div
                className="flex flex-col bg-term-bg border border-[#333] rounded-sm overflow-hidden"
                style={{
                  width: outputMinimized ? "100%" : `${inputWidth}%`,
                }}
              >
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
                  mobileMenuOpen={false}
                  setMobileMenuOpen={() => {}}
                  onMinimize={() => setInputMinimized(true)}
                  isDesktopOnly={true}
                  onLayoutClick={onInputLayoutClick}
                />
              </div>

              {!outputMinimized && (
                <div
                  className="w-1 bg-[#2b2b2b] cursor-col-resize hover:bg-term-green/50 transition-colors"
                  onMouseDown={() => setIsResizing(true)}
                />
              )}
            </>
          )}

          {!outputMinimized && (
            <div
              className="flex flex-col bg-term-bg border border-[#333] rounded-sm overflow-hidden"
              style={{
                width: inputMinimized ? "100%" : `${100 - inputWidth}%`,
              }}
            >
              <TerminalOutput
                isBooting={isBooting}
                currentOutput={currentOutput}
                path={path}
                executeCommand={executeCommand}
                mobileMenuOpen={false}
                setMobileMenuOpen={() => {}}
                onMinimize={() => setOutputMinimized(true)}
                onLayoutClick={onOutputLayoutClick}
                currentLayout={layout}
              />
            </div>
          )}
        </>
      )}

      {/* Layout: Input Right */}
      {layout === "input-right" && (
        <>
          {!outputMinimized && (
            <>
              <div
                className="flex flex-col bg-term-bg border border-[#333] rounded-sm overflow-hidden"
                style={{
                  width: inputMinimized ? "100%" : `${100 - inputWidth}%`,
                }}
              >
                <TerminalOutput
                  isBooting={isBooting}
                  currentOutput={currentOutput}
                  path={path}
                  executeCommand={executeCommand}
                  mobileMenuOpen={false}
                  setMobileMenuOpen={() => {}}
                  onMinimize={() => setOutputMinimized(true)}
                  onLayoutClick={onOutputLayoutClick}
                  currentLayout={layout}
                />
              </div>

              {!inputMinimized && (
                <div
                  className="w-1 bg-[#2b2b2b] cursor-col-resize hover:bg-term-green/50 transition-colors"
                  onMouseDown={() => setIsResizing(true)}
                />
              )}
            </>
          )}

          {!inputMinimized && (
            <div
              className="flex flex-col bg-term-bg border border-[#333] rounded-sm overflow-hidden"
              style={{
                width: outputMinimized ? "100%" : `${inputWidth}%`,
              }}
            >
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
                mobileMenuOpen={false}
                setMobileMenuOpen={() => {}}
                onMinimize={() => setInputMinimized(true)}
                isDesktopOnly={true}
                onLayoutClick={onInputLayoutClick}
              />
            </div>
          )}
        </>
      )}

      {/* Layout: Input Full */}
      {layout === "input-full" && !inputMinimized && (
        <div className="flex flex-col bg-term-bg border border-[#333] rounded-sm overflow-hidden w-full">
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
            mobileMenuOpen={false}
            setMobileMenuOpen={() => {}}
            onMinimize={() => setInputMinimized(true)}
            isDesktopOnly={true}
            onLayoutClick={onInputLayoutClick}
          />
        </div>
      )}

      {/* Layout: Output Full */}
      {layout === "output-full" && !outputMinimized && (
        <div className="flex flex-col bg-term-bg border border-[#333] rounded-sm overflow-hidden w-full">
          <TerminalOutput
            isBooting={isBooting}
            currentOutput={currentOutput}
            path={path}
            executeCommand={executeCommand}
            mobileMenuOpen={false}
            setMobileMenuOpen={() => {}}
            onMinimize={() => setOutputMinimized(true)}
            onLayoutClick={onOutputLayoutClick}
            currentLayout={layout}
          />
        </div>
      )}
    </div>
  );
}
