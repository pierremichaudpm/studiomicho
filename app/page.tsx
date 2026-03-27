"use client";

import React, { useState } from "react";
import { I18nProvider } from "@/lib/i18n";
import Navigation from "@/components/Navigation";
import VerticalBrand from "@/components/VerticalBrand";
import LanguageToggle from "@/components/LanguageToggle";
import Hero from "@/components/Hero";
import TeamDuo from "@/components/TeamDuo";
import Services from "@/components/Services";
import Demos from "@/components/Demos";
import Modal from "@/components/Modal";
import Advantage from "@/components/Advantage";
import Comment from "@/components/Comment";
import Pitch from "@/components/Pitch";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProjectId, setModalProjectId] = useState<string | undefined>();

  const openModal = (projectId?: string) => {
    setModalProjectId(projectId || undefined);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setModalProjectId(undefined);
  };

  return (
    <I18nProvider>
      <Navigation />
      <VerticalBrand onNavigate={closeModal} />
      <LanguageToggle />
      <div id="projets">
        <Hero onOpenModal={openModal} />
      </div>
      <div id="equipe">
        <TeamDuo />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="demos">
        <Demos onOpenModal={() => openModal("")} />
      </div>
      <div id="avantage">
        <Advantage />
      </div>
      <div id="methode">
        <Comment />
      </div>
      <div id="contact">
        <Pitch />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} initialProjectId={modalProjectId} />
    </I18nProvider>
  );
}
