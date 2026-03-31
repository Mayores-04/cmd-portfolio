import React from "react";
import { motion } from "framer-motion";

interface TerminalOutputProps {
  isBooting: boolean;
  currentOutput: React.ReactNode;
  path: string;
}

const TerminalOutput: React.FC<TerminalOutputProps> = ({
  isBooting,
  currentOutput,
  path,
}) => (
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
        {/* ...window controls... */}
      </div>
    </div>
    {/* Terminal Body */}
    <div className="flex-1 overflow-y-auto p-4 sm:p-8 scrollbar-hide relative">
      {!isBooting && currentOutput && (
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {currentOutput}
        </motion.div>
      )}
    </div>
  </div>
);

export default TerminalOutput;
