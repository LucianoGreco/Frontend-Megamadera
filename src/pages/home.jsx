import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  getHerrajes,
  getMelaminas,
  getRevestimientos,
  getMuebles,
  getVinilos,
} from "@/api/resources/productsApi";

import Banner from "@/components/ui/Banner";
import CardHome from "@/components/cards/CardHome";
import Slider from "@/components/ui/Slider";
import ProductoDestacado from "@/components/ProductoDestacado";

import data from "@/data/pages/home";
import { normalizarDatos } from "@/api/utils/normalizeTree";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [todosHerrajes, setTodosHerrajes] = useState([]);
  const [todosMelaminas, setTodosMelaminas] = useState([]);
  const [todosRevestimientos, setTodosRevestimientos] = useState([]);
  const [todosMuebles, setTodosMuebles] = useState([]);
  const [todosVinilos, setTodosVinilos] = useState([]);

  const location = useLocation();
  const productoDestacado = location.state?.producto || null;

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const [mel, her, rev, mub, vin] = await Promise.all([
          getMelaminas(),
          getHerrajes(),
          getRevestimientos(),
          getMuebles(),
          getVinilos(),
        ]);

        const melNorm = normalizarDatos(mel);
        const herNorm = normalizarDatos(her);
        const revNorm = normalizarDatos(rev);
        const mubNorm = normalizarDatos(mub);
        const vinNorm = normalizarDatos(vin);

        const todosFlat = [
          ...flatten(melNorm),
          ...flatten(herNorm),
          ...flatten(revNorm),
          ...flatten(mubNorm),
          ...flatten(vinNorm),
        ];

        setTodos(todosFlat);
        setTodosMelaminas(flatten(melNorm));
        setTodosHerrajes(flatten(herNorm));
        setTodosRevestimientos(flatten(revNorm));
        setTodosMuebles(flatten(mubNorm));
        setTodosVinilos(flatten(vinNorm));
      } catch (err) {
        console.error("❌ Error al cargar productos:", err);
      }
    };

    cargarProductos();
  }, []);

  return (
    <HomeSection>
      <Banner />

      {productoDestacado && (
        <ContentWrapper>
          <ProductoDestacado producto={productoDestacado} />
        </ContentWrapper>
      )}

      {/* 🧱 Sección: Todos los productos */}
      <ContentWrapper>
        <SectionTitle>Todos los productos</SectionTitle>
        <Subtitle>
          Melaminas | Revestimientos | Herrajes | Muebles | Vinilos
        </Subtitle>
        <Slider data={todos} categoria="productos" />
      </ContentWrapper>

      {/* 🎯 CardHome: Simulador */}
      <ContentWrapper>
        <CardHome {...data.secciones.simulador} />
      </ContentWrapper>

      {/* 📦 Otras secciones */}
      <ContentWrapper>
        <SectionTitle>Herrajes</SectionTitle>
        <CardHome {...data.secciones.herrajes}>
          <Slider data={todosHerrajes} categoria="herrajes" />
        </CardHome>
      </ContentWrapper>

      <ContentWrapper>
        <SectionTitle>Melaminas</SectionTitle>
        <CardHome {...data.secciones.melaminas}>
          <Slider data={todosMelaminas} categoria="melaminas" />
        </CardHome>
      </ContentWrapper>

      <ContentWrapper>
        <SectionTitle>Revestimientos</SectionTitle>
        <CardHome {...data.secciones.revestimiento}>
          <Slider data={todosRevestimientos} categoria="revestimientos" />
        </CardHome>
      </ContentWrapper>

      <ContentWrapper>
        <SectionTitle>Muebles</SectionTitle>
        <CardHome {...data.secciones.muebles}>
          <Slider data={todosMuebles} categoria="muebles" />
        </CardHome>
      </ContentWrapper>

      <ContentWrapper>
        <SectionTitle>Vinilos</SectionTitle>
        <CardHome {...data.secciones.vinilos}>
          <Slider data={todosVinilos} categoria="vinilos" />
        </CardHome>
      </ContentWrapper>
    </HomeSection>
  );
};

export default Home;

// 🔁 Aplanador de productos hoja
const flatten = (nodos, currentPath = []) => {
  const hojas = [];

  const rec = (nodo, path) => {
    const nuevaRuta = [...path, nodo.nombre];

    if (!nodo.children || nodo.children.length === 0) {
      const imagen = nodo.imagenes?.[0] ?? "placeholder.jpg";
      const productoPlano = {
        ...nodo,
        imagen,
        ruta: nuevaRuta.join("/"),      // 👈 opcional, por si querés mostrarlo como texto
        pathArray: nuevaRuta,           // ✅ lo que realmente necesita el Slider
      };
      hojas.push(productoPlano);
    } else {
      nodo.children.forEach((child) => rec(child, nuevaRuta));
    }
  };

  nodos.forEach((n) => rec(n, currentPath));
  return hojas;
};


// 🎨 Estilos
const HomeSection = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const ContentWrapper = styled.section`
  width: 100%;
  margin: 0 auto 1rem;
  padding: 0 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
`;

const Subtitle = styled.p`
  font-size: 0.85rem;
  color: #666;
`;
