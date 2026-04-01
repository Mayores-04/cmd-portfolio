import React from "react";
import { motion } from "framer-motion";

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
      {[
        { key: "0", label: "home", desc: "Home page" },
        { key: "1", label: "about", desc: "profile and values" },
        { key: "2", label: "projects", desc: "work and stack" },
        { key: "3", label: "contact", desc: "reach me directly" },
        { key: "4", label: "socials", desc: "social accounts" },
        { key: "5", label: "resume", desc: "download and summary" },
      ].map((item) => (
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
