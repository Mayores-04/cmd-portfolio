import React, { useState } from "react";
import { motion } from "framer-motion";

const quickCommands = [
  "1 | cat about.md           # About me, values, and developer background",
  "2 | ls projects/           # Project index and tech stack",
  "3 | cat contact.txt        # Contact channels and quick links",
  "4 | cat socials.txt        # Social media profiles",
  "5                          # Resume summary and download link",
  "cd about|projects|contact|socials|resume  # Navigate to a section",
  "cd .. | cd ~ | cd / | cd   # Return to home",
  "ls | ls -l                 # List all available pages",
  "0 | home | menu | help     # Return to home/help screen",
];

const skills = [
  {
    name: "JavaScript",
    url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg",
  },
  {
    name: "Java",
    url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg",
  },
  {
    name: "React",
    url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg",
  },
  {
    name: "CSS3",
    url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg",
  },
  {
    name: "HTML5",
    url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg",
  },
  {
    name: "Tailwind",
    url: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
  },
  { name: "React Native", url: "https://reactnative.dev/img/header_logo.svg" },
  {
    name: "MongoDB",
    url: "https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg",
  },
  {
    name: "MSSQL",
    url: "https://www.svgrepo.com/show/303229/microsoft-sql-server-logo.svg",
  },
  {
    name: "Firebase",
    url: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg",
  },
  {
    name: "Figma",
    url: "https://www.vectorlogo.zone/logos/figma/figma-icon.svg",
  },
  {
    name: "Postman",
    url: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg",
  },
  {
    name: "Next.js",
    url: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg",
  },
  {
    name: "Git",
    url: "https://www.vectorlogo.zone/logos/git-scm/git-scm-icon.svg",
  },
  {
    name: "Arduino",
    url: "https://cdn.worldvectorlogo.com/logos/arduino-1.svg",
  },
];

const profileImageUrl =
  "https://jake-cmd-portfolio.vercel.app/images/profile_pic.png";

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
              loading="eager"
              fetchPriority="high"
            />
            <div className="border-t border-[#1f2e23] px-3 py-2 text-xs">
              <p className="text-term-green font-semibold">Jake Mayores</p>
              <p className="text-term-gray">Fullstack Developer</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.p
        className="text-term-green text-base sm:text-lg md:text-xl font-bold"
        variants={itemVariants}
      >
        Jake Mayores
      </motion.p>
      <motion.p
        className="text-term-yellow mt-1 text-xs sm:text-sm"
        variants={itemVariants}
      >
        Computer Science | Fullstack Developer
      </motion.p>

      <motion.div
        className="mt-4 border border-[#2b2b2b] rounded-sm bg-black/40 p-2 sm:p-4"
        variants={itemVariants}
      >
        <p className="text-term-cyan text-xs sm:text-sm">
          $ neofetch --profile jake
        </p>
        <div className="mt-2 sm:mt-3 grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-3 sm:gap-x-6 text-xs sm:text-sm">
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
        className="mt-4 border border-[#2b2b2b] rounded-sm bg-black/40 p-2 sm:p-4"
        variants={itemVariants}
      >
        <p className="text-term-cyan text-xs sm:text-sm">$ ls -l /skills</p>
        <p className="mt-1 text-term-gray text-xs">
          Languages and tools I use:
        </p>
        <div className="mt-3 flex flex-wrap gap-3 sm:gap-4">
          {skills.map((skill) => (
            <motion.a
              key={skill.name}
              href={skill.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-2 sm:p-3 bg-[#1a1a1a] border border-[#444] rounded hover:border-term-green hover:shadow-[0_0_10px_rgba(0,255,65,0.2)] transition-all"
              title={skill.name}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
            >
              <img
                src={skill.url}
                alt={skill.name}
                width={32}
                height={32}
                loading="eager"
                fetchPriority="high"
                className="w-6 h-6 sm:w-8 sm:h-8"
              />
            </motion.a>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="mt-4 border border-[#2b2b2b] rounded-sm bg-black/40 p-2 sm:p-4"
        variants={itemVariants}
      >
        <p className="text-term-cyan text-xs sm:text-sm">$ help</p>
        <p className="mt-1 text-term-gray text-xs">
          Tip: Use numbers or command aliases.
        </p>
        <div className="mt-2 space-y-1 text-xs sm:text-sm">
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
