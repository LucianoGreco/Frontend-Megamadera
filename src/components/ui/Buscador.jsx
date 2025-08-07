// 📁 src/components/ui/Buscador.jsx

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useBuscador from "@/hooks/useBuscador";
import styled from "styled-components";

const Buscador = ({ onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { resultados, sugerencias } = useBuscador(query);
  const inputRef = useRef();

  const handleSelect = (item) => {
    const slugify = (str = "") =>
      str
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\s+/g, "-")
        .replace(/[^\w-]/g, "");

    const path = item.path?.map(slugify).join("/") || slugify(item.nombre);
    navigate(`/products/${path}`);

    setQuery("");
    if (typeof onClose === "function") onClose();
  };

  // ⛔️ Cierra los resultados al hacer clic fuera del componente
  const wrapperRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Input
        ref={inputRef}
        type="text"
        placeholder="Buscar productos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.length > 1 && sugerencias.length > 0 && (
        <Sugerencias>
          {sugerencias.map((s, i) => (
            <Sugerencia key={i} onClick={() => setQuery(s)}>
              {s}
            </Sugerencia>
          ))}
        </Sugerencias>
      )}

      {query.length > 1 && resultados.length > 0 && (
        <Resultados>
          {resultados.slice(0, 5).map((item) => (
            <Resultado key={item.id} onClick={() => handleSelect(item)}>
              <Miniatura
                src={`http://localhost:4000/products/${item.imagenes?.[0] ?? "placeholder.jpg"}`}
                alt={item.nombre}
              />
              <Info>
                <strong>{item.nombre}</strong>
                <small>{item.path?.join(" / ") || item.categoria}</small>
              </Info>
            </Resultado>
          ))}
        </Resultados>
      )}
    </Wrapper>
  );
};

export default Buscador;

// 🧠 Estilos con styled-components

const Wrapper = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -40%);
  width: 100%;
  max-width: 500px;
  z-index: 20;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1.1rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  backdrop-filter: blur(8px);
  outline: none;
  transition: all 0.3s ease-in-out;

  &::placeholder {
    color: #bbb;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.15);
    border-color: rgba(255, 255, 255, 0.4);
  }
`;

const Sugerencias = styled.div`
  margin-top: 0.5rem;
  background: rgba(30, 30, 30, 0.9);
  border-radius: 10px;
  padding: 0.3rem;
`;

const Sugerencia = styled.div`
  padding: 0.4rem 0.8rem;
  color: #fff;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Resultados = styled.ul`
  position: absolute;
  width: 100%;
  background: rgba(30, 30, 30, 0.95);
  border-radius: 10px;
  list-style: none;
  padding: 0;
  margin-top: 0.5rem;
  max-height: 250px;
  overflow-y: auto;
`;

const Resultado = styled.li`
  display: flex;
  align-items: center;
  padding: 0.6rem 0.8rem;
  cursor: pointer;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }
`;

const Miniatura = styled.img`
  width: 38px;
  height: 38px;
  object-fit: cover;
  margin-right: 0.75rem;
  border-radius: 6px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    font-size: 0.95rem;
  }

  small {
    font-size: 0.75rem;
    color: #aaa;
  }
`;
