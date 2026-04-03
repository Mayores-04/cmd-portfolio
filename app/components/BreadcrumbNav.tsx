"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import {
  breadcrumbCommandMap,
  breadcrumbLabelMap,
} from "@/data/navigationData";

interface BreadcrumbNavProps {
  currentPath: string;
  executeCommand: (cmd: string) => void;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({
  currentPath,
  executeCommand,
}) => {
  const getBreadcrumbs = () => {
    const pathParts = currentPath === "~" ? ["~"] : ["~", currentPath];
    return pathParts;
  };

  const breadcrumbs = getBreadcrumbs();

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -5 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="flex items-center gap-1 text-xs sm:text-sm text-term-gray px-4 py-2 bg-[#0f0f0f] border-b border-[#222]"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {breadcrumbs.map((path, index) => (
        <React.Fragment key={path}>
          <motion.button
            variants={itemVariants}
            onClick={() => executeCommand(breadcrumbCommandMap[path] || "home")}
            className={`px-2 py-1 rounded transition-colors ${
              path === currentPath
                ? "text-term-green font-bold cursor-default"
                : "hover:text-term-green hover:bg-[#1a1a1a]"
            }`}
            aria-current={path === currentPath ? "page" : undefined}
          >
            {breadcrumbLabelMap[path] || path}
          </motion.button>
          {index < breadcrumbs.length - 1 && (
            <motion.span variants={itemVariants}>
              <ChevronRight size={14} className="text-[#444]" />
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default BreadcrumbNav;
