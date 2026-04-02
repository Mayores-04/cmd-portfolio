import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage: React.FC<{ executeCommand?: (cmd: string) => void }> = ({
  executeCommand,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="w-full h-full text-term-text font-mono p-0 select-none"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.p className="text-term-cyan mb-3" variants={itemVariants}>
        $ cat contact.txt
      </motion.p>

      <motion.div className="flex flex-col gap-2 mb-3" variants={itemVariants}>
        <div className="flex items-center gap-2 text-term-yellow">
          <Phone size={16} className="inline-block" />
          <span className="text-term-text">0970-127-5112</span>
        </div>
      </motion.div>

      <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
        <div className="flex items-center gap-2 text-term-yellow">
          <Mail size={16} className="inline-block" />
          <a
            href="mailto:jakemayores05@gmail.com"
            className="text-term-text hover:text-term-cyan underline-offset-4 hover:underline"
          >
            jakemayores05@gmail.com
          </a>
        </div>
      </motion.div>

      <motion.div className="flex flex-col gap-2 mb-4" variants={itemVariants}>
        <div className="flex items-center gap-2 text-term-yellow">
          <MapPin size={16} className="inline-block" />
          <span className="text-term-text">
            Cainta, Rizal, Philippines{" "}
            <span className="text-term-gray">(Open to Remote)</span>
          </span>
        </div>
      </motion.div>

      <motion.div
        className="border-t border-[#2b2b2b] my-4"
        variants={itemVariants}
      />

      <motion.div
        className="text-term-blue text-sm mb-2"
        variants={itemVariants}
      >
        --- quick links ---
      </motion.div>

      <motion.div className="text-sm mb-4 space-y-1" variants={itemVariants}>
        <p>
          <span className="text-term-yellow">LinkedIn:</span>{" "}
          <a
            className="text-term-cyan hover:underline"
            href="https://www.linkedin.com/in/jake-mayores-81677530a/"
            target="_blank"
            rel="noopener noreferrer"
          >
            connect here
          </a>
        </p>
        <p>
          <span className="text-term-yellow">Instagram:</span>{" "}
          <a
            className="text-term-cyan hover:underline"
            href="https://www.instagram.com/mayoresjake/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @mayoresjake
          </a>
        </p>
        <p>
          <span className="text-term-yellow">Facebook:</span>{" "}
          <a
            className="text-term-cyan hover:underline"
            href="https://www.facebook.com/jakejmayores"
            target="_blank"
            rel="noopener noreferrer"
          >
            /jakejmayores
          </a>
        </p>
      </motion.div>

      <motion.form
        className="pl-2 border border-[#2b2b2b] rounded-sm bg-black/40 p-3"
        onSubmit={(e) => e.preventDefault()}
        variants={itemVariants}
      >
        <div className="flex flex-col gap-2 max-w-md">
          <label className="text-term-blue text-xs mb-1" htmlFor="name">
            name:
          </label>
          <div className="flex items-center">
            <input
              id="name"
              type="text"
              className="bg-transparent border-none outline-none text-term-text placeholder-[#6d6d6d] text-sm font-mono mb-2"
              placeholder="Press Enter to submit each field."
              autoComplete="off"
            />
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
};

export default ContactPage;
