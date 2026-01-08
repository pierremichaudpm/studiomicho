'use client';

import React, { useEffect } from 'react';

interface Project {
  name: string;
  title: string;
  description: string;
  tags: string[];
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const projects: Project[] = [
  {
    name: 'EISL',
    title: 'Excellence Industrielle St-Laurent',
    description: 'Transformation numérique communications. Diagnostic organisationnel et restructuration.',
    tags: ['Consulting', 'Stratégie'],
  },
  {
    name: 'CARI',
    title: 'CARI St-Laurent',
    description: 'OBNL services immigrants. Implantation CRM Odoo, refonte site web, workflows IA.',
    tags: ['CRM', 'Site Web', 'En cours'],
  },
  {
    name: 'BBR',
    title: 'Bleu Blanc Rouge',
    description: 'Installation immersive Place des Festivals. Projet artistique Serge Lemoyne & Canadiens.',
    tags: ['Immersif', 'Concept'],
  },
  {
    name: 'JAXA',
    title: 'Jaxa Production',
    description: 'Site corporatif production immersive. Design audacieux avec animations complexes.',
    tags: ['Corporate', 'Bold Design'],
  },
];

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="modal active"
      onClick={handleBackgroundClick}
      style={{
        display: 'flex',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.95)',
        zIndex: 2000,
        overflowY: 'auto',
        padding: '4rem 2rem',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button
        className="modal-close"
        onClick={onClose}
        style={{
          position: 'fixed',
          top: '2rem',
          right: '2rem',
          fontSize: '4rem',
          color: '#4A90E2',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: 900,
          zIndex: 2001,
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#9B59B6';
          e.currentTarget.style.transform = 'rotate(90deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = '#4A90E2';
          e.currentTarget.style.transform = 'rotate(0deg)';
        }}
      >
        ×
      </button>

      <div
        className="modal-content"
        style={{
          maxWidth: '1400px',
          width: '100%',
          position: 'relative',
          animation: 'modalSlideIn 0.5s ease-out',
        }}
      >
        <h2
          className="modal-header"
          style={{
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            fontWeight: 900,
            marginBottom: '4rem',
            textAlign: 'center',
            background: 'linear-gradient(90deg, #4A90E2, #9B59B6, #F39C12)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Autres projets
        </h2>

        <div
          className="projects-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
            gap: '3rem',
          }}
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card"
              style={{
                background: 'rgba(20, 20, 20, 0.8)',
                border: '2px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '1rem',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = '#4A90E2';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 245, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="project-card-image"
                style={{
                  height: '200px',
                  background: 'linear-gradient(135deg, rgba(0, 245, 255, 0.2), rgba(255, 0, 255, 0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  fontWeight: 900,
                  color: 'rgba(255, 255, 255, 0.3)',
                }}
              >
                {project.name}
              </div>
              <div
                className="project-card-content"
                style={{
                  padding: '2rem',
                }}
              >
                <div
                  className="project-card-title"
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    marginBottom: '1rem',
                    color: '#4A90E2',
                  }}
                >
                  {project.title}
                </div>
                <div
                  className="project-card-desc"
                  style={{
                    color: 'var(--gray)',
                    marginBottom: '1rem',
                    fontSize: '1rem',
                  }}
                >
                  {project.description}
                </div>
                <div
                  className="project-card-tags"
                  style={{
                    display: 'flex',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="project-card-tag"
                      style={{
                        background: 'rgba(0, 245, 255, 0.1)',
                        border: '1px solid #4A90E2',
                        color: '#4A90E2',
                        padding: '0.25rem 0.75rem',
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
