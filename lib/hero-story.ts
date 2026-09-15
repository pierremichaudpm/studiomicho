export const CHARACTER_MS = 31;
export const READING_PAUSE_MS = 450;

export type StorySegment = { text: string; accent: boolean; offset: number };
export type StoryLine = { segments: StorySegment[]; text: string; start: number; end: number };
export type HeroStory = {
  lines: StoryLine[];
  copyEnd: number;
};

/** The typewriter has its own pace, independent of the 3D motion. */
export function createHeroStory(htmlLines: string[]): HeroStory {
  let start = 700;
  const lines = htmlLines.map((html) => {
    let offset = 0;
    const segments = html.replace(/^<span[^>]*>><\/span>\s*/, "")
      .split(/(<span[^>]*>.*?<\/span>)/g).filter(Boolean).map((part) => {
        const text = part.replace(/<[^>]*>/g, "");
        const segment = { text, accent: part.includes("gradient-text"), offset };
        offset += text.length;
        return segment;
      });
    const text = segments.map((segment) => segment.text).join("");
    const line = { segments, text, start, end: start + text.length * CHARACTER_MS };
    start = line.end + READING_PAUSE_MS;
    return line;
  });
  const copyEnd = lines.at(-1)?.end ?? 0;
  return { lines, copyEnd };
}
