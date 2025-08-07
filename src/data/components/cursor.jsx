// Cursor.jsx

// Importa los hooks necesarios y utilidades de styled-components
import { useEffect, useState, useRef } from "react";
import styled, { keyframes, createGlobalStyle, css } from "styled-components";

// Datos de contacto donde está el logo que se usará como cursor
import contactos from "@/data/pages/contactos";


// 🎞️ Definición de la animación de giro para el cursor personalizado
const spin = keyframes`
  from { transform: rotate(0deg); }     // Inicio sin rotación
  to { transform: rotate(360deg); }     // Gira 360°
`;


// 🎨 Estilo del cursor personalizado
const CustomCursor = styled.div`
  position: fixed;                     // Fijo en pantalla
  top: 0;
  left: 0;
  pointer-events: none;               // No interfiere con clics
  z-index: 9999;                      // Siempre por encima de todo
  transform: translate(-50%, -50%);   // Centrado en el punto del mouse
  width: ${({ hovered }) => (hovered ? "32px" : "24px")};  // Tamaño cambia si está sobre link o botón
  height: ${({ hovered }) => (hovered ? "32px" : "24px")};
  transition: width 0.2s ease, height 0.2s ease;           // Transición suave al agrandar/achicar

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;              // Asegura que la imagen no se deforme
    animation: ${({ rotating }) =>    // Aplica o no la animación de giro
      rotating
        ? css`${spin} 1s linear infinite` // Gira continuamente mientras se mueve
        : "none"};
  }
`;


// 🧼 Estilo global que oculta el cursor del sistema en toda la app
const GlobalStyle = createGlobalStyle`
  body, a, button, * {
    cursor: none !important;   // Fuerza a ocultar el cursor estándar
  }
`;


// 🔁 Componente funcional del cursor personalizado
const Cursor = () => {
  // Guarda la posición actual del mouse (x, y)
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Estado para controlar si se debe girar el cursor
  const [rotating, setRotating] = useState(false);

  // Estado para determinar si el cursor está sobre un botón o link
  const [hovered, setHovered] = useState(false);

  // Referencia al timeout que detiene la animación de giro si no hay movimiento
  const stopTimeout = useRef(null);


  // 📌 useEffect para manejar eventos del mouse en el DOM
  useEffect(() => {
    // Cuando se mueve el mouse, actualiza coordenadas y activa la rotación
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setRotating(true);

      // Limpia cualquier timeout anterior
      if (stopTimeout.current) clearTimeout(stopTimeout.current);

      // Programa detener la rotación si no se mueve por 100ms
      stopTimeout.current = setTimeout(() => {
        setRotating(false);
      }, 100);
    };

    // Si el mouse entra en un link o botón, activa el "hover"
    const handleMouseOver = (e) => {
      if (e.target.closest("a, button")) {
        setHovered(true);
      }
    };

    // Si el mouse sale del link o botón, desactiva el "hover"
    const handleMouseOut = (e) => {
      if (e.target.closest("a, button")) {
        setHovered(false);
      }
    };

    // Asigna los listeners globales
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // 🔄 Limpia los listeners y timeouts al desmontar
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      clearTimeout(stopTimeout.current);
    };
  }, []); // Solo se ejecuta una vez al montar


  // Renderiza el cursor en pantalla
  return (
    <>
      {/* Aplica el estilo global que oculta el cursor nativo */}
      <GlobalStyle />

      {/* Cursor visual */}
      <CustomCursor
        style={{ left: `${position.x}px`, top: `${position.y}px` }} // Posición dinámica
        rotating={rotating}  // Controla si se está girando
        hovered={hovered}    // Controla si está sobre un link/botón
      >
        {/* Logo como cursor */}
        <img src={contactos.logo} alt="Logo" />
      </CustomCursor>
    </>
  );
};

export default Cursor;
