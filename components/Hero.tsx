"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import iaTourismeLogo from "@/public/images/iatourisme-logo.png";
import type { AssemblyController, AssemblyFrame } from "@/lib/hero-assembly";
import { CHARACTER_MS, READING_PAUSE_MS, createHeroStory, type HeroStory, type StoryLine } from "@/lib/hero-story";
import "./HeroAnimation.css";

function useTerminalClock(story: HeroStory, replay: number, root: RefObject<HTMLElement | null>) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let previous = 0;
    let elapsed = 0;
    let visible = true;
    let bucket = -1;
    function tick(now: number) {
      if (media.matches) elapsed = story.copyEnd + 1;
      else if (previous) elapsed += Math.min(now - previous, 80);
      previous = now;
      const current = Math.min(elapsed, story.copyEnd + 1);
      const next = Math.floor(current / CHARACTER_MS);
      if (next !== bucket || current === story.copyEnd + 1) { bucket = next; setTime(current); }
      if (current < story.copyEnd + 1 && visible && !document.hidden) frame = requestAnimationFrame(tick);
    }
    function resume() {
      cancelAnimationFrame(frame);
      previous = 0;
      if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; resume(); });
    if (root.current) observer.observe(root.current);
    document.addEventListener("visibilitychange", resume);
    media.addEventListener("change", resume);
    resume();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener("visibilitychange", resume);
      media.removeEventListener("change", resume);
    };
  }, [story, replay, root]);
  return time;
}

function TypedLine({ line, time, last }: { line: StoryLine; time: number; last: boolean }) {
  const count = Math.max(0, Math.floor((time - line.start) / CHARACTER_MS));
  const active = time >= line.start && (time < line.end + READING_PAUSE_MS || last);
  return <div className="micho-terminal-line">
    <span className="micho-prompt" style={{ opacity: time >= line.start ? 1 : 0.2 }}>{">"}</span>
    <div className="micho-line-content"><span className="micho-line-reserve">{line.segments.map((segment, index) => <span className={segment.accent ? "gradient-text" : undefined} key={index}>{segment.text}</span>)}</span><span className="micho-line-typed">
      {line.segments.map((segment, index) => <span className={segment.accent ? "gradient-text" : undefined} key={index}>{segment.text.slice(0, Math.max(0, count - segment.offset))}</span>)}
      {active && <span className="micho-caret" />}
    </span></div>
  </div>;
}

function ControlIcon({ name }: { name: "replay" | "pause" | "play" | "down" }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "replay" && <path d="M3 10a9 9 0 1 1 2 8M3 4v6h6" />}
    {name === "pause" && <path d="M8 5v14M16 5v14" />}
    {name === "play" && <path d="m8 4 12 8-12 8Z" />}
    {name === "down" && <path d="M12 4v16m-7-7 7 7 7-7" />}
  </svg>;
}

export default function Hero() {
  const { t, locale } = useTranslation();
  const english = locale === "en";
  const root = useRef<HTMLElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const controller = useRef<AssemblyController | null>(null);
  const pausedRef = useRef(false);
  const [paused, setPaused] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [textReplay, setTextReplay] = useState(0);
  const [reduced, setReduced] = useState(false);
  const copyKey = [1, 2].map((index) => t(`hero.line${index}`)).join("\n");
  const story = useMemo(() => createHeroStory(copyKey.split("\n")), [copyKey]);
  const { lines } = story;
  const time = useTerminalClock(story, textReplay, root);
  const onFrame = useCallback(({ reduced }: AssemblyFrame) => {
    setReduced(reduced);
  }, []);

  useEffect(() => {
    let cancelled = false;
    let instance: AssemblyController | undefined;
    import("@/lib/hero-assembly").then(({ mountAssembly }) => {
      if (cancelled || !canvasHost.current) return;
      instance = mountAssembly(canvasHost.current, onFrame);
      controller.current = instance;
      instance.pause(pausedRef.current);
      setReady(true);
    }).catch((error: unknown) => {
      if (cancelled) return;
      console.error("Hero 3D could not initialize", error);
      setFailed(true);
    });
    return () => { cancelled = true; instance?.dispose(); controller.current = null; };
  }, [onFrame]);

  function togglePause() {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
    controller.current?.pause(pausedRef.current);
  }
  function replay() {
    setTextReplay((value) => value + 1);
    pausedRef.current = false;
    setPaused(false);
    controller.current?.replay();
  }

  return <section id="hero" className="hero micho-hero" ref={root} data-paused={paused} data-reduced={reduced}>
    <div className="micho-hero-bubbles" aria-hidden="true">
      <span className="micho-hero-bubble micho-hero-bubble-blue" />
      <span className="micho-hero-bubble micho-hero-bubble-violet" />
    </div>
    <div className="micho-assembly-stage">
      <div className="micho-terminal">
        <h1 className="micho-sr-only">{lines.map((line) => line.text).join(" ")}</h1>
        <div className="micho-terminal-copy" aria-hidden="true">{lines.map((line, index) => <TypedLine key={index} line={line} time={time} last={index === lines.length - 1} />)}</div>
      </div>
      <div className="micho-assembly-viewport">
        <div className="micho-webgl" ref={canvasHost} tabIndex={ready ? 0 : -1} role="region" aria-roledescription={english ? "Interactive 3D model" : "Modèle 3D interactif"} aria-label={english ? "Five interlocking pieces. The front shows interfaces; the back reveals a detailed backend diagram. Drag or use the arrow keys to rotate through 360 degrees. Home resets the view." : "Cinq pièces imbriquées. La façade montre des interfaces ; le dos révèle un schéma détaillé du backend. Glissez ou utilisez les flèches pour tourner à 360 degrés. La touche Début recentre la vue."} />
        {!ready && <div className="micho-scene-loading" role="status">{failed ? (english ? "The 3D scene could not load. Reload with WebGL enabled." : "La scène 3D n’a pas pu charger. Rechargez avec WebGL activé.") : (english ? "Preparing the scene…" : "La scène prend forme…")}</div>}
        {ready && <div className="micho-rotate-hint"><span>↔</span>{english ? "Drag to explore" : "Glissez pour explorer"}</div>}
      </div>
    </div>
    <div className="micho-hero-bottom">
      <a className="micho-scroll-arrow" href="#projets" aria-label={english ? "Discover the projects" : "Découvrir les projets"}><ControlIcon name="down" /></a>
      <a className="micho-iatourisme-badge" href="https://iatourisme.com/" target="_blank" rel="noopener noreferrer">
        <span>{t("hero.iatourisme")}</span>
        <Image src={iaTourismeLogo} alt="IA Tourisme" />
      </a>
    </div>
    <div className="micho-playback-bar">
      <div className="micho-playback-controls"><button onClick={replay} disabled={!ready} aria-label={english ? "Replay animation" : "Rejouer l’animation"}><ControlIcon name="replay" /><span>{english ? "Replay" : "Rejouer"}</span></button><button onClick={togglePause} disabled={!ready} aria-label={paused ? (english ? "Resume 3D animation" : "Reprendre l’animation 3D") : (english ? "Pause 3D animation" : "Mettre l’animation 3D en pause")} aria-pressed={paused}><ControlIcon name={paused ? "play" : "pause"} /></button></div>
    </div>
  </section>;
}
