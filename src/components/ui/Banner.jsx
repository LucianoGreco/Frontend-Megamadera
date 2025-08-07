// Componente que muestra un banner rotativo con imágenes, texto y botón de acción
import React, { useState, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import data from "@/data/pages/home"; // Datos de secciones para el banner
import { breakpoints } from "@/styles/breakpoints"; // Breakpoints para responsive
import Buscador from "@/components/ui/Buscador";

const Banner = () => {
  // Estado para saber qué sección está activa
  const [currentIndex, setCurrentIndex] = useState(0);

  // Memoiza las secciones una vez (para que no se recalculen en cada render)
  const sections = useMemo(() => Object.values(data.secciones), []);

  // Efecto que cambia el slide automáticamente cada 6 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Cambia al siguiente índice. Vuelve a 0 al final.
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
    }, 6000);

    // Limpia el intervalo cuando se desmonta el componente
    return () => clearInterval(intervalId);
  }, [sections.length]);

  // Sección actual que se está mostrando
  const currentSection = sections[currentIndex];

  return (
    <BannerContainer>
      <ImageWrapper>
        {/* Renderiza todas las imágenes del slider, pero solo una es visible */}
        {sections.map((section, idx) => (
          <BannerImage
            key={idx}
            src={section.background} // Imagen de fondo
            alt={section.name}
            $active={idx === currentIndex} // Solo se muestra la activa
            loading="lazy" // Lazy load para performance
          />
        ))}
        {/* Capa de degradado oscuro encima de la imagen */}
        <Overlay />
        <BuscadorWrapper>
          <Buscador />
        </BuscadorWrapper>
      </ImageWrapper>

      {/* Contenido textual y botón */}
      <Content>
        {/* Nombre de la sección */}
        <Title>{currentSection.name}</Title>

        {/* Descripción (usa una por defecto si está vacía) */}
        <Description>
          {currentSection.description?.trim()
            ? currentSection.description
            : `Descubre lo mejor de nuestra colección en ${currentSection.name}. Explora ahora y transforma tus espacios.`}
        </Description>

        {/* Botón que lleva a la página de la sección */}
        <StyledButton
          to={currentSection.page}
          aria-label={`Ir a ${currentSection.name}`}
        >
          Explorar {currentSection.name}
        </StyledButton>
      </Content>
    </BannerContainer>
  );
};

export default Banner;

// Nuevo contenedor del buscador en Banner.jsx
const BuscadorWrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 5;
  width: 90%;
  max-width: 600px;
  padding: 1rem;
  border-radius: 12px;

  // Quitamos fondo y borde: que sea el input quien defina la estética
  background: none;
  border: none;
`;

// Contenedor general del banner (divide imagen y contenido en desktop)
const BannerContainer = styled.section`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 90vh;
  overflow: hidden;

  // En tablet o menos, se apila vertical
  @media (max-width: ${breakpoints.tablet}) {
    flex-direction: column;
    height: auto;
  }
`;

// Contenedor que agrupa todas las imágenes
const ImageWrapper = styled.div`
  position: relative;
  flex: 2;
  overflow: hidden;
  min-height: 300px;
`;

// Cada imagen del banner. Se superponen todas, pero solo una tiene opacity 1
const BannerImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  opacity: 0; // Oculta por defecto
  transition: opacity 1s ease-in-out;

  // Solo la imagen activa es visible
  ${({ $active }) =>
    $active &&
    css`
      opacity: 1;
    `}
`;

// Capa de sombreado para mejorar la legibilidad del texto
const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.5) 10%,
    rgba(0, 0, 0, 0.2) 50%,
    rgba(0, 0, 0, 0) 90%
  );
  z-index: 1;
`;

// Zona donde se muestra el título, descripción y botón
const Content = styled.div`
  flex: 1;
  z-index: 2;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #f9f9f9;

  @media (max-width: ${breakpoints.tablet}) {
    padding: 2rem;
  }
`;

// Título principal del banner
const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #222;
  margin: 0 0 1rem 0;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.5rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

// Texto descriptivo opcional
const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  max-width: 600px;
  margin-bottom: 2rem;

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 1rem;
  }
`;

// Botón de acción con estilo sólido
const StyledButton = styled(Link)`
  display: inline-block;
  width: fit-content;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background-color: #222;
  border-radius: 4px;
  text-decoration: none;
  transition: background 0.3s ease;

  &:hover {
    background-color: #444;
  }
`;
