"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface FirstTimeGuideProps {
  executeCommand: (cmd: string) => void;
}

const FirstTimeGuide: React.FC<FirstTimeGuideProps> = ({ executeCommand }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the guide before
    const hasSeenGuide = localStorage.getItem("hasSeenFirstTimeGuide");
    if (!hasSeenGuide) {
      // Delay showing guide until after boot sequence
      const timer = setTimeout(() => {
        setIsVisible(true);
        localStorage.setItem("hasSeenFirstTimeGuide", "true");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleStarted = () => {
    setIsVisible(false);
  };

  const handleExplore = (cmd: string) => {
    executeCommand(cmd);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-[200] p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => handleStarted()}
        >
          <motion.div
            className="bg-[#1a1a1a] border-2 border-term-green rounded-sm max-w-md w-full shadow-[0_0_30px_rgba(0,255,65,0.2)]"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#2a2a2a] border-b border-term-green px-4 py-3 flex items-center justify-between">
              <h2 className="text-term-green font-bold text-sm">
                👋 Welcome to Jake's Portfolio
              </h2>
              <button
                onClick={() => handleStarted()}
                className="text-term-gray hover:text-term-green transition-colors p-1"
                aria-label="Close welcome guide"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 space-y-4 text-sm">
              <p className="text-term-text">
                This is a terminal-themed portfolio. You can explore in two
                ways:
              </p>

              {/* Option 1 */}
              <div className="bg-[#0f0f0f] border border-[#333] rounded p-3 space-y-2">
                <p className="text-term-green font-bold">
                  1️⃣ Click the buttons
                </p>
                <p className="text-term-gray text-xs">
                  Use the navigation buttons at the top to explore different
                  sections.
                </p>
              </div>

              {/* Option 2 */}
              <div className="bg-[#0f0f0f] border border-[#333] rounded p-3 space-y-2">
                <p className="text-term-cyan font-bold">2️⃣ Type commands</p>
                <p className="text-term-gray text-xs">
                  Type commands like{" "}
                  <code className="bg-[#1a1a1a] px-1 rounded">about</code>,{" "}
                  <code className="bg-[#1a1a1a] px-1 rounded">projects</code>,
                  or <code className="bg-[#1a1a1a] px-1 rounded">ls</code>
                </p>
              </div>

              {/* Quick Actions */}
              <div className="pt-2 space-y-2">
                <p className="text-term-gray text-xs">Quick start:</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleExplore("about")}
                    className="flex-1 px-3 py-2 bg-term-green text-black font-bold text-xs rounded hover:bg-[#00ff41] transition-colors"
                  >
                    👤 About Me
                  </button>
                  <button
                    onClick={() => handleExplore("projects")}
                    className="flex-1 px-3 py-2 bg-term-green text-black font-bold text-xs rounded hover:bg-[#00ff41] transition-colors"
                  >
                    💼 Projects
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[#0f0f0f] border-t border-[#333] px-4 py-3 flex justify-end">
              <button
                onClick={() => handleStarted()}
                className="px-4 py-2 border border-term-gray text-term-gray hover:border-term-green hover:text-term-green rounded transition-colors text-xs font-bold"
              >
                Got it, Let's Go!
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FirstTimeGuide;
