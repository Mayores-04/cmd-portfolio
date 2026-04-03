import React from "react";
import { motion } from "framer-motion";
import { terminalMenuItems } from "@/data/navigationData";

const ListingPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      className="text-term-text font-mono text-sm"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {terminalMenuItems.map((item) => (
        <motion.p key={item.key} variants={itemVariants}>
          <span className="text-term-yellow">[{item.key}]</span>{" "}
          <span className="text-term-cyan">{item.label}</span>{" "}
          <span className="text-term-gray">#{" " + item.desc}</span>
        </motion.p>
      ))}
    </motion.div>
  );
};

export default ListingPage;
