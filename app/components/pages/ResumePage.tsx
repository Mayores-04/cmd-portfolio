import React from "react";
import { motion } from "framer-motion";

const ResumePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="text-term-text font-mono"
    >
      <p className="text-term-cyan">$ cat resume.md</p>

      <div className="mt-3 border border-[#2b2b2b] rounded-sm bg-black/40 p-3 sm:p-4 text-sm space-y-2">
        <p>
          <span className="text-term-yellow">name:</span> Jake Mayores
        </p>
        <p>
          <span className="text-term-yellow">track:</span> Fullstack Developer
        </p>
        <p>
          <span className="text-term-yellow">current focus:</span> Next.js,
          component architecture, and polished interactive UI
        </p>
        <p>
          <span className="text-term-yellow">availability:</span>{" "}
          <span className="text-term-green">
            Open to freelance and remote work
          </span>
        </p>
      </div>

      <div className="mt-4 text-sm">
        <a
          href="https://jake-mayores-portfolio.vercel.app/Mayores_Jake_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-term-cyan hover:text-[#7ffcff] hover:underline"
        >
          $ wget Mayores_Jake_Resume.pdf
        </a>
      </div>
    </motion.div>
  );
};

export default ResumePage;
