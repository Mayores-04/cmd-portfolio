"use client";

import React from "react";
import { motion } from "framer-motion";

interface NavigationButtonsProps {
  currentPath: string;
  executeCommand: (cmd: string) => void;
  isBooting: boolean;
}

const navItems = [
  { label: "Home", command: "home", icon: "🏠" },
  { label: "About", command: "about", icon: "👤" },
  { label: "Projects", command: "projects", icon: "💼" },
  { label: "Contact", command: "contact", icon: "✉️" },
  { label: "Socials", command: "socials", icon: "🔗" },
  { label: "Resume", command: "resume", icon: "📄" },
];

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentPath,
  executeCommand,
  isBooting,
}) => {
  const getPathForCommand = (cmd: string): string => {
    const pathMap: { [key: string]: string } = {
      home: "~",
      about: "~/about",
      projects: "~/projects",
      contact: "~/contact",
      socials: "~/socials",
      resume: "~/resume",
    };
    return pathMap[cmd] || "~";
  };

  const isActive = (cmd: string) => {
    return getPathForCommand(cmd) === currentPath;
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.2 },
    },
    hover: { scale: 1.05 },
  };

  return (
    <motion.div
      className="hidden w-full bg-[#1E1E1E] border-b border-[#333] px-4 py-3"
      variants={containerVariants}
      initial="hidden"
      animate={!isBooting ? "show" : "hidden"}
    >
      <div className="flex flex-wrap gap-2 justify-start items-center">
        <span className="text-term-gray text-xs mr-2">Navigation:</span>
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <motion.button
              key={item.command}
              variants={buttonVariants}
              whileHover="hover"
              onClick={() => executeCommand(item.command)}
              className={`px-3 py-1.5 text-xs sm:text-sm rounded border transition-all ${
                isActive(item.command)
                  ? "border-term-green bg-[#0a3c0a] text-term-green font-bold shadow-[0_0_10px_rgba(0,255,65,0.3)]"
                  : "border-term-gray text-term-gray hover:border-term-green hover:text-term-green"
              }`}
              title={`Go to ${item.label}`}
              aria-label={`Navigate to ${item.label}`}
            >
              <span className="hidden sm:inline">{item.icon} </span>
              {item.label}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default NavigationButtons;
