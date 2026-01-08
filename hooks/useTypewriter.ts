import { useEffect, useState } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  showCursor?: boolean;
  permanentCursor?: boolean;
}

export const useTypewriter = ({
  text,
  speed = 30,
  delay = 0,
  onComplete,
  showCursor = true,
  permanentCursor = false,
}: UseTypewriterOptions) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    let currentIndex = 0;
    let currentHTML = "";
    let inTag = false;
    let tagBuffer = "";

    const startTyping = () => {
      setIsTyping(true);

      const type = () => {
        if (currentIndex < text.length) {
          const char = text[currentIndex];

          if (char === "<") {
            inTag = true;
            tagBuffer = "<";
          } else if (char === ">" && inTag) {
            inTag = false;
            tagBuffer += ">";
            currentHTML += tagBuffer;
            tagBuffer = "";
          } else if (inTag) {
            tagBuffer += char;
          } else {
            currentHTML += char;
          }

          if (showCursor && !permanentCursor) {
            setDisplayedText(
              currentHTML + '<span class="cursor-blink"></span>',
            );
          } else {
            setDisplayedText(currentHTML);
          }

          currentIndex++;
        } else {
          clearInterval(intervalId);
          setIsTyping(false);
          setIsComplete(true);

          if (permanentCursor) {
            setDisplayedText(
              currentHTML + ' <span class="cursor-blink">▮</span>',
            );
          } else {
            setDisplayedText(currentHTML);
          }

          if (onComplete) {
            onComplete();
          }
        }
      };

      intervalId = setInterval(type, speed);
    };

    const timeoutId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(intervalId);
    };
  }, [text, speed, delay, onComplete, showCursor, permanentCursor]);

  return { displayedText, isTyping, isComplete };
};
