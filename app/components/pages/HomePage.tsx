import React, { useState } from "react";
import { motion } from "framer-motion";

const quickCommands = [
  "1 | about | cat about.md        # About me, values, and developer background",
  "2 | projects | ls projects/     # Project index and tech stack",
  "3 | contact | cat contact.txt   # Contact channels and quick links",
  "4 | socials | cat socials.txt   # Social media profiles",
  "5 | resume                      # Resume summary and download link",
  "cd about|projects|contact|socials|resume  # Navigate directly to a section",
  "cd .. | cd ~ | cd / | cd       # Return to home",
  "ls | ls -l                      # List all available pages",
  "0 | home | menu | help          # Return to home/help screen",
  "clear                          # Clear left terminal command history",
  "sudo                           # Demo command (shows Permission Denied)",
];

const profileImageUrl =
  "https://my-cmd-portfolio.vercel.app/images/profile_pic.png";

const HomePage = () => {
  const [previewPos, setPreviewPos] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const showPreview = (x: number, y: number) => {
    const cardWidth = 280;
    const cardHeight = 240;
    const safeMargin = 8;
    const maxLeft = window.innerWidth - cardWidth - safeMargin;
    const maxTop = window.innerHeight - cardHeight - safeMargin;

    setPreviewPos({
      left: Math.max(safeMargin, Math.min(x, maxLeft)),
      top: Math.max(safeMargin, Math.min(y + 12, maxTop)),
    });
  };

  const hidePreview = () => setPreviewPos(null);

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

  return (
    <motion.div
      className="text-term-text font-mono"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {previewPos && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none fixed z-[120] w-[280px] max-w-[85vw]"
          style={{ top: previewPos.top, left: previewPos.left }}
        >
          <div className="overflow-hidden rounded-md border border-[#38523f] bg-[#0a130d] shadow-[0_0_24px_rgba(0,255,65,0.14)]">
            <img
              src={profileImageUrl}
              alt="Jake Mayores profile"
              className="h-48 w-full object-cover"
              loading="lazy"
            />
            <div className="border-t border-[#1f2e23] px-3 py-2 text-xs">
              <p className="text-term-green font-semibold">Jake Mayores</p>
              <p className="text-term-gray">Fullstack Developer</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.p
        className="text-term-green text-lg sm:text-xl font-bold"
        variants={itemVariants}
      >
        Jake Mayores
      </motion.p>
      <motion.p className="text-term-yellow mt-1" variants={itemVariants}>
        Computer Science | Fullstack Developer
      </motion.p>

      <motion.div
        className="mt-4 border border-[#2b2b2b] rounded-sm bg-black/40 p-3 sm:p-4"
        variants={itemVariants}
      >
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
          <p className="sm:col-span-2">
            <span className="text-term-blue">profile:</span>{" "}
            <a
              href={profileImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-term-cyan break-all hover:underline"
              onMouseEnter={(e) => showPreview(e.clientX, e.clientY)}
              onMouseMove={(e) => showPreview(e.clientX, e.clientY)}
              onMouseLeave={hidePreview}
              onFocus={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                showPreview(rect.left, rect.bottom);
              }}
              onBlur={hidePreview}
            >
              {profileImageUrl}
            </a>
          </p>
        </div>
      </motion.div>

      <motion.div
        className="mt-4 border border-[#2b2b2b] rounded-sm bg-black/40 p-3 sm:p-4"
        variants={itemVariants}
      >
        <p className="text-term-cyan">$ help</p>
        <p className="mt-1 text-term-gray text-xs">
          Tip: You can use either numbers or command aliases.
        </p>
        <div className="mt-2 space-y-1 text-sm">
          {quickCommands.map((item) => (
            <motion.p
              key={item}
              className="text-term-text"
              variants={itemVariants}
            >
              <span className="text-term-yellow">-</span> {item}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
