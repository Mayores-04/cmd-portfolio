import { useState, useRef, useEffect } from "react";

interface FloatingRestoreButtonsProps {
  inputMinimized: boolean;
  outputMinimized: boolean;
  onRestoreInput: () => void;
  onRestoreOutput: () => void;
}

export default function FloatingRestoreButtons({
  inputMinimized,
  outputMinimized,
  onRestoreInput,
  onRestoreOutput,
}: FloatingRestoreButtonsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize position on client side
  useEffect(() => {
    setPosition({
      x: window.innerWidth - 120,
      y: window.innerHeight - 55,
    });
  }, []);

  // Strong mouse tracking with document listeners
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;

      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;

      // Keep within window bounds
      const maxX = window.innerWidth - 80; // Slightly left of right edge to keep visible
      const maxY = window.innerHeight - 40; // Slightly above screen edge to keep visible

      setPosition({
        x: Math.max(0, Math.min(newX, maxX)),
        y: Math.max(0, Math.min(newY, maxY)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "auto";
      document.body.style.userSelect = "auto";
    };

    if (isDragging) {
      document.body.style.cursor = "grabbing";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.cursor = "auto";
      document.body.style.userSelect = "auto";
    };
  }, [isDragging, dragStart]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  return (
    <div
      ref={containerRef}
      className={`hidden md:flex fixed flex-col gap-2 z-30 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      {inputMinimized && (
        <button
          onClick={onRestoreInput}
          className="flex items-center gap-2 px-3 py-2 bg-[#1E1E1E] border border-term-green text-term-green rounded hover:bg-[#2E2E2E] transition-colors text-xs"
          title="Restore input terminal"
        >
          <img
            src="https://git-scm.com/favicon.ico"
            alt="Git"
            className="w-3 h-3"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          Input
        </button>
      )}
      {outputMinimized && (
        <button
          onClick={onRestoreOutput}
          className="flex items-center gap-2 px-3 py-2 bg-[#1E1E1E] border border-term-green text-term-green rounded hover:bg-[#2E2E2E] transition-colors text-xs"
          title="Restore output terminal"
        >
          <img
            src="https://git-scm.com/favicon.ico"
            alt="Git"
            className="w-3 h-3"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          Output
        </button>
      )}
    </div>
  );
}
