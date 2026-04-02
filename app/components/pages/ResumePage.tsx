import React from "react";
import { motion } from "framer-motion";

const ResumePage: React.FC<{ executeCommand?: (cmd: string) => void }> = ({
  executeCommand,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25 },
    },
  };

  const lineContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  };

  return (
    <motion.div
      className="text-term-text font-mono"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.p className="text-term-cyan" variants={itemVariants}>
        $ cat resume.md
      </motion.p>

      <motion.div
        className="mt-3 text-sm space-y-2"
        variants={lineContainerVariants}
      >
        <motion.p variants={itemVariants}>
          <span className="text-term-yellow">name:</span> Jake Mayores
        </motion.p>
        <motion.p variants={itemVariants}>
          <span className="text-term-yellow">track:</span> Fullstack Developer
        </motion.p>
        <motion.p variants={itemVariants}>
          <span className="text-term-yellow">current focus:</span> Next.js,
          component architecture, and polished interactive UI
        </motion.p>
        <motion.p variants={itemVariants}>
          <span className="text-term-yellow">availability:</span>
          <span className="text-term-green">
            Open to freelance and remote work
          </span>
        </motion.p>
      </motion.div>

      <motion.div className="mt-4 text-sm" variants={itemVariants}>
        <a
          href="https://jake-cmd-portfolio.vercel.app/Mayores_Jake_Resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="text-term-cyan hover:text-[#7ffcff] hover:underline"
        >
          $ wget Mayores_Jake_Resume.pdf
        </a>
      </motion.div>
    </motion.div>
  );
};

export default ResumePage;
