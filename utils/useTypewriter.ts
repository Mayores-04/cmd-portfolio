import { useEffect, useState, useRef } from "react";

interface UseTypewriterOptions {
  speed?: number; // milliseconds between characters
  delay?: number; // initial delay before starting
  enabled?: boolean;
}

export const useTypewriter = (
  text: string,
  options: UseTypewriterOptions = {},
) => {
  const { speed = 30, delay = 0, enabled = true } = options;
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      return;
    }

    setDisplayedText("");
    indexRef.current = 0;

    const startTimer = setTimeout(() => {
      const typeCharacter = () => {
        if (indexRef.current < text.length) {
          setDisplayedText(text.substring(0, indexRef.current + 1));
          indexRef.current++;
          timeoutRef.current = setTimeout(typeCharacter, speed);
        }
      };
      typeCharacter();
    }, delay);

    return () => {
      clearTimeout(startTimer);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [text, speed, delay, enabled]);

  const isComplete = displayedText.length === text.length;

  return { displayedText, isComplete };
};
