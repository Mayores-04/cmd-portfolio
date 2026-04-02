import { motion } from "framer-motion";

interface LayoutSwitcherProps {
  isOpen: boolean;
  onClose: () => void;
  currentLayout: "input-left" | "input-right" | "input-full" | "output-full";
  activeTerminal: "input" | "output";
  fullLayoutTarget: "input" | "output";
  onLayoutSelect: (
    layout: "input-left" | "input-right" | "input-full" | "output-full",
  ) => void;
}

export default function LayoutSwitcher({
  isOpen,
  onClose,
  currentLayout,
  activeTerminal,
  fullLayoutTarget,
  onLayoutSelect,
}: LayoutSwitcherProps) {
  if (!isOpen) return null;

  type SplitLayout = "input-left" | "input-right";
  type Side = "left" | "right";

  const splitLayoutBySide = {
    input: { left: "input-left", right: "input-right" },
    output: { left: "input-right", right: "input-left" },
  } as const;

  const sideBySplitLayout = {
    "input-left": { input: "left", output: "right" },
    "input-right": { input: "right", output: "left" },
  } as const;

  const fullLayoutByTarget = {
    input: "input-full",
    output: "output-full",
  } as const;

  const splitOptions: Array<{
    side: Side;
    tooltip: string;
    previewClass: string;
    accentClass: string;
  }> = [
    {
      side: "left",
      tooltip: "Terminal on left side",
      previewClass: "flex-shrink-0 w-4 rounded bg-term-green",
      accentClass: "flex-1 rounded bg-term-green/10",
    },
    {
      side: "right",
      tooltip: "Terminal on right side",
      previewClass: "flex-shrink-0 w-4 rounded bg-term-green",
      accentClass: "flex-1 rounded bg-term-green/10",
    },
  ];

  const isSplitLayout =
    currentLayout === "input-left" || currentLayout === "input-right";
  const selectedSide = isSplitLayout
    ? sideBySplitLayout[currentLayout as SplitLayout][activeTerminal]
    : null;
  const fullLayout = fullLayoutByTarget[fullLayoutTarget];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="hidden md:flex fixed inset-0 bg-black/40 z-50 items-start justify-center pt-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: -20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-[#1E1E1E] border border-[#444] rounded-sm shadow-2xl flex gap-3 p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border border-[#444] rounded-sm shadow-xl flex gap-2 p-2">
          {splitOptions.map((option) => {
            const nextLayout = splitLayoutBySide[activeTerminal][option.side];
            const isActive = selectedSide === option.side;

            return (
              <button
                key={option.side}
                onClick={() => {
                  onLayoutSelect(nextLayout);
                  onClose();
                }}
                className={`p-3 border rounded transition-all ${
                  isActive
                    ? "border-term-green bg-[#2b2b2b]"
                    : "border-[#444] hover:border-term-green"
                }`}
                title={option.tooltip}
              >
                <div className="flex gap-1 h-16 w-12">
                  {option.side === "left" ? (
                    <>
                      <div className={option.previewClass}></div>
                      <div className={option.accentClass}></div>
                    </>
                  ) : (
                    <>
                      <div className={option.accentClass}></div>
                      <div className={option.previewClass}></div>
                    </>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        <div className="border border-[#444] rounded-sm shadow-xl flex gap-2 p-2">
          <button
            onClick={() => {
              onLayoutSelect(fullLayout);
              onClose();
            }}
            className={`p-3 border rounded transition-all ${
              currentLayout === "input-full" || currentLayout === "output-full"
                ? "border-term-green bg-[#2b2b2b]"
                : "border-[#444] hover:border-term-green"
            }`}
            title={
              fullLayoutTarget === "output"
                ? "Full Output - Output terminal takes full width"
                : "Full Input - Command terminal takes full width"
            }
          >
            <div
              className={`h-16 w-24 rounded ${
                currentLayout === "input-full" ||
                currentLayout === "output-full"
                  ? "bg-term-green"
                  : "bg-term-green/30"
              }`}
            ></div>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
