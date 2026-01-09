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
    let timeoutId: NodeJS.Timeout;
    let currentIndex = 0;
    let currentHTML = "";
    let inTag = false;
    let tagBuffer = "";
    let justClosedGradientTag = false;

    const startTyping = () => {
      setIsTyping(true);

      const type = () => {
        if (currentIndex < text.length) {
          const char = text[currentIndex];

          // Handle HTML tags
          if (char === "<") {
            inTag = true;
            tagBuffer = "<";
          } else if (char === ">" && inTag) {
            inTag = false;
            tagBuffer += ">";
            currentHTML += tagBuffer;

            // Check if we just closed a gradient span
            if (tagBuffer === "</span>") {
              justClosedGradientTag = true;
            }

            tagBuffer = "";
          } else if (inTag) {
            tagBuffer += char;
          } else {
            currentHTML += char;
          }

          // Update display with cursor
          if (showCursor && !permanentCursor) {
            setDisplayedText(
              currentHTML + '<span class="cursor-blink">▮</span>',
            );
          } else {
            setDisplayedText(currentHTML);
          }

          currentIndex++;

          // VARIABLE SPEED - Make it feel human!
          let nextDelay = speed;

          if (!inTag && char !== "<" && char !== ">") {
            // Just closed a gradient text span - dramatic pause
            if (justClosedGradientTag) {
              nextDelay = 180;
              justClosedGradientTag = false;
            }
            // Space - slight pause between words
            else if (char === " ") {
              nextDelay = Math.random() * 30 + 50; // 50-80ms
            }
            // Punctuation - longer pause
            else if (
              char === "." ||
              char === "," ||
              char === "!" ||
              char === "?"
            ) {
              nextDelay = Math.random() * 50 + 100; // 100-150ms
            }
            // Normal character - variable speed
            else {
              nextDelay = Math.random() * 20 + 20; // 20-40ms
            }

            // Random burst - 8% chance to type very fast
            if (Math.random() < 0.08) {
              nextDelay = 12; // super fast burst
            }
          } else {
            // Inside tag - instant
            nextDelay = 0;
          }

          timeoutId = setTimeout(type, nextDelay);
        } else {
          // Finished typing
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

      timeoutId = setTimeout(type, 0);
    };

    const initialTimeoutId = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialTimeoutId);
      clearTimeout(timeoutId);
    };
  }, [text, speed, delay, onComplete, showCursor, permanentCursor]);

  return { displayedText, isTyping, isComplete };
};
