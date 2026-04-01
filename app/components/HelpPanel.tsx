"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const HelpPanel: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const helpCommands = [
    { cmd: "about", desc: "Learn about Jake - background, skills, values" },
    { cmd: "projects", desc: "View projects and tech stack" },
    { cmd: "contact", desc: "Get in touch - contact information" },
    { cmd: "socials", desc: "Social media profiles and links" },
    { cmd: "resume", desc: "Download resume or view summary" },
    { cmd: "ls", desc: "List all available commands" },
    { cmd: "clear", desc: "Clear command history" },
  ];

  return (
    <motion.div
      className="hidden w-full bg-[#0a0a0a] border-b border-[#222] px-4 py-2 overflow-hidden"
      initial={{ height: 0, opacity: 0 }}
      animate={{
        height: isExpanded ? "auto" : 48,
        opacity: 1,
      }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between text-xs text-term-gray hover:text-term-green transition-colors py-2"
        aria-expanded={isExpanded}
        aria-label="Toggle help panel"
      >
        <span>ℹ️ Quick Help & Commands</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-2 mt-3 pb-3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {helpCommands.map((item) => (
                <div
                  key={item.cmd}
                  className="bg-[#1E1E1E] border border-[#333] rounded px-3 py-2 hover:border-term-green transition-colors"
                >
                  <div className="text-term-green font-mono">$ {item.cmd}</div>
                  <div className="text-term-gray text-[11px] mt-1">
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-[#1a1a2e] border border-[#2d3561] rounded px-3 py-2 text-xs">
              <p className="text-term-cyan font-bold mb-1">💡 Tip:</p>
              <p className="text-term-gray">
                You can click the buttons above{" "}
                <span className="text-term-green">or</span> type commands in the
                terminal. Both work!
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HelpPanel;
