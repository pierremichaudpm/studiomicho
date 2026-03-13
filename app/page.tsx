"use client";

import React, { useState } from "react";
import { I18nProvider } from "@/lib/i18n";
import Navigation from "@/components/Navigation";
import VerticalBrand from "@/components/VerticalBrand";
import LanguageToggle from "@/components/LanguageToggle";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Modal from "@/components/Modal";
import Advantage from "@/components/Advantage";
import Comment from "@/components/Comment";
import Pitch from "@/components/Pitch";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <I18nProvider>
      <Navigation />
      <VerticalBrand />
      <LanguageToggle />
      <Hero />
      <div id="services">
        <Services />
      </div>
      <div id="projets">
        <Portfolio onOpenModal={openModal} />
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
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </I18nProvider>
  );
}
