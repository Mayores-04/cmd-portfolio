import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  getPreviewImage,
  projectsData,
  type Project,
} from "@/data/projectsData";

const ProjectsPage: React.FC<{ executeCommand?: (cmd: string) => void }> = ({
  executeCommand,
}) => {
  const [activePreview, setActivePreview] = useState<{
    project: Project;
    top: number;
    left: number;
  } | null>(null);

  const showPreview = (project: Project, x: number, y: number) => {
    const cardWidth = 320;
    const cardHeight = 210;
    const safeMargin = 8;
    const maxLeft = window.innerWidth - cardWidth - safeMargin;
    const maxTop = window.innerHeight - cardHeight - safeMargin;
    const left = Math.max(safeMargin, Math.min(x, maxLeft));
    const top = Math.max(safeMargin, Math.min(y + 12, maxTop));

    setActivePreview({
      project,
      top,
      left,
    });
  };

  const hidePreview = () => setActivePreview(null);
  const renderedProjects = Array.from(
    new Map(projectsData.map((project) => [project.url, project])).values(),
  );

  useEffect(() => {
    // Warm the browser cache so hover previews appear instantly.
    renderedProjects.forEach((project) => {
      const preloadImg = new Image();
      preloadImg.src = getPreviewImage(project);
      preloadImg.fetchPriority = "high";
      preloadImg.loading = "eager";
    });
  }, [renderedProjects]);

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
    hidden: { opacity: 0, y: 5 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  const rowContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const rowItemVariants = {
    hidden: { opacity: 0, x: -10 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.22 },
    },
  };

  return (
    <motion.div
      className="w-full h-full text-term-text font-mono p-0 select-none"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {activePreview && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none fixed z-[120] w-[320px] max-w-[90vw]"
          style={{ top: activePreview.top, left: activePreview.left }}
        >
          <div className="overflow-hidden rounded-md border border-[#38523f] bg-[#0a130d] shadow-[0_0_24px_rgba(0,255,65,0.14)]">
            <img
              src={getPreviewImage(activePreview.project)}
              alt={`${activePreview.project.name} preview`}
              className="h-40 w-full object-cover"
              loading="eager"
              fetchPriority="high"
            />
            <div className="border-t border-[#1f2e23] px-3 py-2 text-xs">
              <p className="text-term-green font-semibold">
                {activePreview.project.name}
              </p>
              <p className="text-term-gray">
                {activePreview.project.url.replace("https://", "")}
              </p>
              <p className="text-term-text mt-1 leading-relaxed">
                {activePreview.project.description}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div className="text-term-cyan text-sm" variants={itemVariants}>
        $ ls -lah projects/
      </motion.div>
      <motion.div
        className="text-term-blue text-sm mt-1"
        variants={itemVariants}
      >
        total {renderedProjects.length}
      </motion.div>
      <motion.div className="mt-2 overflow-x-auto" variants={itemVariants}>
        <table className="min-w-[720px] w-full border-separate border-spacing-y-0.5 text-sm">
          <thead>
            <tr>
              <th className="text-term-yellow font-normal border-b border-[#3b3b3b] bg-transparent py-1 text-left">
                Permissions
              </th>
              <th className="text-term-yellow font-normal border-b border-[#3b3b3b] bg-transparent px-2 py-1 text-left">
                Size
              </th>
              <th className="text-term-yellow font-normal border-b border-[#3b3b3b] bg-transparent px-2 py-1 text-left">
                Date
              </th>
              <th className="text-term-yellow font-normal border-b border-[#3b3b3b] bg-transparent px-2 py-1 text-left">
                Project Name
              </th>
              <th className="text-term-yellow font-normal border-b border-[#3b3b3b] bg-transparent px-2 py-1 text-left">
                URL
              </th>
              <th className="text-term-yellow font-normal border-b border-[#3b3b3b] bg-transparent px-2 py-1 text-left">
                Tech Stack
              </th>
            </tr>
          </thead>
          <motion.tbody
            variants={rowContainerVariants}
            initial="hidden"
            animate="show"
          >
            {renderedProjects.map((proj) => (
              <motion.tr
                key={`${proj.name}-${proj.url}`}
                className="border-b border-[#232323] last:border-b-0"
                variants={rowItemVariants}
                onMouseEnter={(e) => showPreview(proj, e.clientX, e.clientY)}
                onMouseMove={(e) => showPreview(proj, e.clientX, e.clientY)}
                onMouseLeave={hidePreview}
              >
                <td className="py-1 text-[#c8ba78] whitespace-nowrap">
                  {proj.permissions}
                </td>
                <td className="px-2 py-1 text-term-green whitespace-nowrap">
                  {proj.size}
                </td>
                <td className="px-2 py-1 text-term-blue whitespace-nowrap">
                  {proj.date}
                </td>
                <td className="px-2 py-1 font-bold whitespace-nowrap">
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-term-cyan hover:underline hover:text-[#7ffcff] transition-colors duration-100"
                  >
                    {proj.name}
                  </a>
                </td>
                <td className="px-2 py-1 text-term-blue align-top">
                  <div className="inline-flex max-w-[260px] flex-col">
                    <a
                      href={proj.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate block hover:text-term-cyan hover:underline underline-offset-4"
                      onFocus={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        showPreview(proj, rect.left, rect.bottom);
                      }}
                      onBlur={hidePreview}
                    >
                      {proj.url.replace("https://", "")}
                    </a>
                  </div>
                </td>
                <td className="px-2 py-1 text-[#d4a3df] whitespace-nowrap">
                  {proj.tech}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default ProjectsPage;
