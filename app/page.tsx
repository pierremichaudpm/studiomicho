"use client";

import React, { useState } from "react";
import VerticalBrand from "@/components/VerticalBrand";
import Hero from "@/components/Hero";
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
    <>
      <VerticalBrand />
      <Hero />
      <Portfolio onOpenModal={openModal} />
      <Advantage />
      <Comment />
      <Pitch />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
