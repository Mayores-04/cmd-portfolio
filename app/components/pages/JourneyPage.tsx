import React, { useState } from "react";
import { motion } from "framer-motion";
import { achievementsData } from "@/data/journeyData";

const JourneyPage: React.FC<{ executeCommand?: (cmd: string) => void }> = ({
  executeCommand,
}) => {
  const [previewPos, setPreviewPos] = useState<{
    top: number;
    left: number;
    image: string;
    title: string;
  } | null>(null);

  const showPreview = (image: string, title: string, x: number, y: number) => {
    const cardWidth = 280;
    const cardHeight = 240;
    const safeMargin = 8;
    const maxLeft = window.innerWidth - cardWidth - safeMargin;
    const maxTop = window.innerHeight - cardHeight - safeMargin;

    setPreviewPos({
      image,
      title,
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

  const galleryCardVariants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  const galleryLayoutClasses = (count: number) => {
    if (count >= 5) {
      return "grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
    }

    if (count === 4) {
      return "grid-cols-2 md:grid-cols-4";
    }

    if (count === 3) {
      return "grid-cols-2 md:grid-cols-3";
    }

    return "grid-cols-1 sm:grid-cols-2";
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
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.15 }}
          className="pointer-events-none fixed z-[120] w-[300px] max-w-[90vw]"
          style={{ top: previewPos.top, left: previewPos.left }}
        >
          <div className="overflow-hidden rounded-lg border border-term-green/30 bg-[#0a130d] backdrop-blur-sm shadow-[0_8_32px_rgba(0,255,65,0.2)]">
            <div className="relative h-52 overflow-hidden bg-gradient-to-br from-term-green/5 to-transparent">
              <img
                src={previewPos.image}
                alt={`${previewPos.title} preview`}
                className="h-full w-full object-cover"
                loading="eager"
                fetchPriority="high"
              />
            </div>
            <div className="border-t border-term-green/20 px-4 py-3 bg-[#08100b]/50">
              <p className="text-term-green font-semibold text-sm">
                {previewPos.title}
              </p>
              <p className="text-term-gray text-xs mt-1">Achievement preview</p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div className="mb-12" variants={itemVariants}>
        <motion.p className="text-term-cyan text-sm tracking-wide">
          $ cat journey.md
        </motion.p>
        <div className="mt-8 space-y-3 text-sm leading-relaxed text-term-gray max-w-2xl">
          <p>
            My journey includes organizational involvement, competitions,
            meetups, and client work that keep pushing my technical boundaries.
          </p>
          <p>
            The milestones below highlight experiences I&apos;ve been proudest
            of—the kind of impact I want to keep building.
          </p>
        </div>
      </motion.div>

      <motion.div
        className="grid gap-8 lg:grid-cols-2"
        variants={containerVariants}
      >
        {achievementsData.map((achievement) => (
          <motion.div
            key={`${achievement.period}-${achievement.title}`}
            variants={itemVariants}
            className="group overflow-hidden rounded-lg border border-term-green/20 bg-gradient-to-br from-[#0b0f0c] to-[#08100b] shadow-[0_0_32px_rgba(0,255,65,0.08)] transition-all duration-300 hover:border-term-green/40 hover:shadow-[0_0_48px_rgba(0,255,65,0.15)]"
          >
            {/* Image Gallery Section */}
            <div className="border-b border-term-green/10 bg-gradient-to-b from-[#0f1711] to-[#08100b] p-3">
              <div
                className={`grid gap-2 ${galleryLayoutClasses(achievement.images.length)}`}
              >
                {achievement.images.map((image, index) => (
                  <motion.a
                    key={image + index}
                    variants={galleryCardVariants}
                    href={image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group/img relative overflow-hidden rounded-lg border border-term-green/20 bg-[#0f1711] cursor-pointer transition-all duration-300 hover:border-term-green/50 ${
                      achievement.images.length >= 5 && index === 0
                        ? "md:col-span-2 md:row-span-2"
                        : ""
                    }`}
                    onMouseEnter={(e) =>
                      showPreview(
                        image,
                        achievement.title,
                        e.clientX,
                        e.clientY,
                      )
                    }
                    onMouseMove={(e) =>
                      showPreview(
                        image,
                        achievement.title,
                        e.clientX,
                        e.clientY,
                      )
                    }
                    onMouseLeave={hidePreview}
                    onFocus={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      showPreview(
                        image,
                        achievement.title,
                        rect.left,
                        rect.bottom,
                      );
                    }}
                    onBlur={hidePreview}
                  >
                    <div className="relative h-24 overflow-hidden bg-gradient-to-br from-term-green/10 to-transparent">
                      <img
                        src={image}
                        alt={`${achievement.title} ${index + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-term-green text-xs font-semibold uppercase tracking-widest">
                  {achievement.period}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-term-green/30 to-transparent" />
                <span className="text-term-cyan text-xs font-medium">
                  achievement
                </span>
              </div>

              <h2 className="text-lg font-bold text-term-text mb-4 group-hover:text-term-green transition-colors duration-300">
                {achievement.title}
              </h2>

              <p className="text-sm leading-relaxed text-term-gray mb-5">
                {achievement.summary}
              </p>

              <div className="pt-5 border-t border-term-green/10">
                <p className="text-xs uppercase tracking-widest text-term-yellow mb-2 font-semibold">
                  What I Learned
                </p>
                <p className="text-sm leading-relaxed text-term-cyan">
                  {achievement.impact}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div className="py-6" variants={itemVariants}>
        <div className="p-8 rounded-lg border border-term-green/20 bg-gradient-to-r from-[#0b0f0c] to-[#08100b] shadow-[0_0_24px_rgba(0,255,65,0.06)]">
          <p className="text-term-cyan text-sm mb-4 tracking-wide">
            $ echo next_steps
          </p>
          <p className="text-sm leading-relaxed text-term-gray">
            I&apos;m focused on building sharper products, stronger systems, and
            polished developer experiences that make a real difference.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default JourneyPage;
