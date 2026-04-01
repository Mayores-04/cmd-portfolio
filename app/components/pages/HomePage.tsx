import React from "react";
import { motion } from "framer-motion";

const quickCommands = [
  "1 | about | cat about.md        # About me, values, and developer background",
  "2 | projects | ls projects/     # Project index and tech stack",
  "3 | contact | cat contact.txt   # Contact channels and quick links",
  "4 | socials | cat socials.txt   # Social media profiles",
  "5 | resume                      # Resume summary and download link",
  "0 | home | menu | help | cd ~  # Return to home/help screen",
  "clear                          # Clear left terminal command history",
  "sudo                           # Demo command (shows Permission Denied)",
];

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="text-term-text font-mono"
    >
      <p className="text-term-green text-lg sm:text-xl font-bold">
        Jake Mayores
      </p>
      <p className="text-term-yellow mt-1">
        Computer Science | Fullstack Developer
      </p>

      <div className="mt-4 border border-[#2b2b2b] rounded-sm bg-black/40 p-3 sm:p-4">
        <p className="text-term-cyan">$ neofetch --profile jake</p>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-6 text-sm">
          <p>
            <span className="text-term-blue">role:</span>{" "}
            <span className="text-term-text">Fullstack Developer</span>
          </p>
          <p>
            <span className="text-term-blue">focus:</span>{" "}
            <span className="text-term-text">Next.js</span>
          </p>
          <p>
            <span className="text-term-blue">location:</span>{" "}
            <span className="text-term-text">Cainta, Rizal, Philippines</span>
          </p>
          <p>
            <span className="text-term-blue">status:</span>{" "}
            <span className="text-term-green">Open to remote work</span>
          </p>
        </div>
      </div>

      <div className="mt-4 border border-[#2b2b2b] rounded-sm bg-black/40 p-3 sm:p-4">
        <p className="text-term-cyan">$ help</p>
        <p className="mt-1 text-term-gray text-xs">
          Tip: You can use either numbers or command aliases.
        </p>
        <div className="mt-2 space-y-1 text-sm">
          {quickCommands.map((item) => (
            <p key={item} className="text-term-text">
              <span className="text-term-yellow">-</span> {item}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HomePage;
