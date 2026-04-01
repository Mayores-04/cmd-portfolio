import React, { ReactNode } from "react";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  children: ReactNode;
  delay?: number;
  stagger?: boolean;
}

/**
 * Wraps content with progressive reveal animation
 * Perfect for terminal output that should appear gradually
 */
export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  stagger = true,
}) => {
  const variantContainer = stagger
    ? {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.08,
            delayChildren: delay,
          },
        },
      }
    : {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { delay, duration: 0.3 },
        },
      };

  const variantItem = {
    hidden: { opacity: 0, y: 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.15 },
    },
  };

  return (
    <motion.div
      variants={variantContainer}
      initial="hidden"
      animate="show"
      className="w-full"
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={stagger ? variantItem : undefined}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
