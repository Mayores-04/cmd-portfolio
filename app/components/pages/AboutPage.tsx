import React, { useState } from "react";
import { motion } from "framer-motion";

const values = [
  "Creativity   | Bringing unique and innovative ideas to every project",
  "Passion      | Putting heart into every work",
  "Excellence   | Committed to high-quality output",
  "Innovation   | Always exploring better techniques and workflows",
];

const profileImageUrl =
  "https://jake-mayores-portfolio.vercel.app/images/image.png";

const AboutPage = () => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.05 }}
      className="text-term-text font-mono"
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

      <p className="text-term-cyan">$ cat about.md</p>

      <div className="mt-3 border border-[#2b2b2b] rounded-sm bg-black/40 p-3 sm:p-4 space-y-3 text-sm leading-relaxed">
        <p>
          Hi, I&apos;m{" "}
          <span className="text-term-green font-bold">Jake Mayores</span>, a
          3rd-year Computer Science student specializing in web development.
        </p>
        <p>
          I&apos;m a passionate Fullstack Developer with a strong CS foundation.
          My stack includes React, Next.js, HTML5, CSS3, JavaScript, TypeScript,
          Node.js, Express, Tailwind CSS, MongoDB, and MSSQL. I also build
          mobile apps with React Native and Expo.
        </p>
        <p>
          I&apos;ve gained hands-on experience through freelance web projects
          and as a fullstack developer in our school organization.
        </p>

        <div className="pt-1">
          <p className="text-term-cyan">$ echo $PROFILE_IMAGE_URL</p>
          <div
            className="mt-2 inline-flex max-w-full flex-col"
            onMouseLeave={hidePreview}
          >
            <a
              href={profileImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-term-blue break-all hover:text-term-cyan hover:underline underline-offset-4"
              onMouseEnter={(e) => showPreview(e.clientX, e.clientY)}
              onMouseMove={(e) => showPreview(e.clientX, e.clientY)}
              onFocus={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                showPreview(rect.left, rect.bottom);
              }}
              onBlur={hidePreview}
            >
              {profileImageUrl}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 border border-[#2b2b2b] rounded-sm bg-black/40 p-3 sm:p-4">
        <p className="text-term-cyan">$ ls values/</p>
        <div className="mt-2 space-y-1 text-sm">
          {values.map((value) => (
            <p key={value}>
              <span className="text-term-yellow">-</span> {value}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AboutPage;
