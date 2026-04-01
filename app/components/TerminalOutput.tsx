import React from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import BreadcrumbNav from "./BreadcrumbNav";
import { lineContainer, contentReveal } from "@/utils/animation";

interface TerminalOutputProps {
  isBooting: boolean;
  currentOutput: React.ReactNode;
  path: string;
  executeCommand?: (cmd: string) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (value: boolean) => void;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({
  isBooting,
  currentOutput,
  path,
  executeCommand,
  mobileMenuOpen,
  setMobileMenuOpen,
}) => {
  return (
    // <div className="flex flex-col w-full md:w-[65%] h-[calc(100vh-220px)] md:h-[calc(100vh-100px)] bg-term-bg border border-[#333] rounded-sm overflow-hidden z-10">
    <div className="flex flex-col w-full md:w-[65%] h-full bg-term-bg border border-[#333] rounded-sm overflow-hidden z-10">
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
            jake_portfolio MINGW64:/~jake/output
            {path !== "~" ? path.replace("~", "") : ""}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {/* Mobile Menu Button - aligned in header */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center gap-2 px-3 py-1 text-term-green border border-term-green rounded-sm hover:bg-[#2E2E2E] transition-colors"
            aria-label="Toggle command history"
            title="Show/hide command history"
          >
            {/* <span className="text-xs font-bold">History</span> */}
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
          {/* Desktop: empty space for window controls */}
          <div className="hidden md:flex items-center gap-4 text-[#888]">
            {/* ...window controls... */}
          </div>
        </div>
      </div>

      {/* Breadcrumb Navigation */}
      {!isBooting && executeCommand && (
        <BreadcrumbNav currentPath={path} executeCommand={executeCommand} />
      )}

      {/* Terminal Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-8 scrollbar-hide relative">
        {!isBooting && currentOutput && (
          <motion.div
            key={path}
            variants={contentReveal}
            initial="hidden"
            animate="show"
            className="h-full"
          >
            {currentOutput}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default TerminalOutput;
