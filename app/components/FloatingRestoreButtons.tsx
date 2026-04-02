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
  return (
    <div className="hidden md:flex fixed bottom-4 right-4 flex-col gap-2 z-30">
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
