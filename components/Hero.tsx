"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import { useTranslation } from "@/lib/i18n";
import iaTourismeLogo from "@/public/images/iatourisme-logo.png";
import type { AssemblyController, RotationDirection } from "@/lib/hero-assembly";
import { CHARACTER_MS, READING_PAUSE_MS, createHeroStory, type HeroStory, type StoryLine } from "@/lib/hero-story";
import "./HeroAnimation.css";

function useTerminalClock(story: HeroStory, root: RefObject<HTMLElement | null>) {
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
  }, [story, root]);
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

function ControlIcon({ name }: { name: RotationDirection }) {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "left" && <path d="M20 12H4m7-7-7 7 7 7" />}
    {name === "right" && <path d="M4 12h16m-7-7 7 7-7 7" />}
    {name === "up" && <path d="M12 20V4m-7 7 7-7 7 7" />}
    {name === "down" && <path d="M12 4v16m-7-7 7 7 7-7" />}
  </svg>;
}

export default function Hero() {
  const { t, locale } = useTranslation();
  const english = locale === "en";
  const root = useRef<HTMLElement>(null);
  const canvasHost = useRef<HTMLDivElement>(null);
  const controller = useRef<AssemblyController | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const copyKey = [1, 2].map((index) => t(`hero.line${index}`)).join("\n");
  const story = useMemo(() => createHeroStory(copyKey.split("\n")), [copyKey]);
  const { lines } = story;
  const time = useTerminalClock(story, root);
  const rotationLabels: Record<RotationDirection, string> = english
    ? { left: "Rotate left", right: "Rotate right", up: "Rotate up", down: "Rotate down" }
    : { left: "Tourner vers la gauche", right: "Tourner vers la droite", up: "Tourner vers le haut", down: "Tourner vers le bas" };

  useEffect(() => {
    let cancelled = false;
    let instance: AssemblyController | undefined;
    import("@/lib/hero-assembly").then(({ mountAssembly }) => {
      if (cancelled || !canvasHost.current) return;
      instance = mountAssembly(canvasHost.current);
      controller.current = instance;
      setReady(true);
    }).catch((error: unknown) => {
      if (cancelled) return;
      console.error("Hero 3D could not initialize", error);
      setFailed(true);
    });
    return () => { cancelled = true; instance?.dispose(); controller.current = null; };
  }, []);

  return <section id="hero" className="hero micho-hero" ref={root}>
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
        <div id="hero-model" className="micho-webgl" ref={canvasHost} tabIndex={ready ? 0 : -1} role="region" aria-roledescription={english ? "Interactive 3D model" : "Modèle 3D interactif"} aria-label={english ? "Five interlocking pieces. The front shows websites and charts; the back reveals a detailed backend diagram. Drag in any direction or use all four arrow keys to rotate. Home resets the view." : "Cinq pièces imbriquées. La façade montre des sites web et des graphiques ; le dos révèle un schéma détaillé du backend. Glissez dans toutes les directions ou utilisez les quatre flèches pour tourner. La touche Début recentre la vue."} />
        {failed && <div className="micho-scene-loading" role="status">{english ? "The 3D scene could not load. Reload with WebGL enabled." : "La scène 3D n’a pas pu charger. Rechargez avec WebGL activé."}</div>}
        {ready && <div className="micho-rotation-controls" role="group" aria-label={english ? "Rotate the 3D model" : "Faire tourner le modèle 3D"}>
          {(["left", "up", "down", "right"] as const).map((direction) => <button key={direction} type="button" onClick={() => controller.current?.rotate(direction)} aria-label={rotationLabels[direction]} aria-controls="hero-model" title={rotationLabels[direction]}><ControlIcon name={direction} /></button>)}
        </div>}
      </div>
    </div>
    <div className="micho-hero-bottom">
      <a className="micho-scroll-arrow" href="#projets" aria-label={english ? "Discover the projects" : "Découvrir les projets"}><ControlIcon name="down" /></a>
      <a className="micho-iatourisme-badge" href="https://iatourisme.com/" target="_blank" rel="noopener noreferrer">
        <span>{t("hero.iatourisme")}</span>
        <Image src={iaTourismeLogo} alt="IA Tourisme" />
      </a>
    </div>
  </section>;
}
