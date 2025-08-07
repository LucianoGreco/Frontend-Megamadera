import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductoDestacado from "@/components/ProductoDestacado";
import {
  getHerrajes,
  getMelaminas,
  getMuebles,
  getRevestimientos,
  getVinilos,
  getByFullPath,
} from "@/api/resources/productsApi";
import { normalizarDatos } from "@/api/utils/normalizeTree";
import styled from "styled-components";

const APIS = {
  melaminas: getMelaminas,
  herrajes: getHerrajes,
  revestimientos: getRevestimientos,
  muebles: getMuebles,
  vinilos: getVinilos,
};

export default function ProductoCategoria() {
  const { "*": pathCompleta } = useParams();
  const segmentos = pathCompleta?.split("/") || [];
  const pathResto = segmentos.join("/");
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [metodo, setMetodo] = useState("ninguno");
  const [categoriaDetectada, setCategoriaDetectada] = useState("");

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      setMetodo("ninguno");
      setProducto(null);

      for (const categoria of Object.keys(APIS)) {
        try {
          const res = await getByFullPath(categoria, pathResto);
          if (res?.nombre) {
            console.log("✅ Encontrado por path completo en:", categoria);
            setProducto(res);
            setMetodo("pathCompleto");
            setCategoriaDetectada(categoria);
            return;
          }
        } catch (_) {}
      }

      try {
        const slugBuscado = slugify(decodeURIComponent(segmentos.at(-1)));

        for (const [categoria, getFn] of Object.entries(APIS)) {
          const data = await getFn();
          const plano = flatten(normalizarDatos(data));
          const match = plano.find((item) => slugify(item.nombre) === slugBuscado);
          if (match) {
            console.log("✅ Encontrado por slug en:", categoria);
            setProducto(match);
            setMetodo("fallbackSlug");
            setCategoriaDetectada(categoria);
            return;
          }
        }
      } catch (err) {
        console.error("❌ Error buscando por slug:", err);
      }

      setProducto(null);
    };

    cargar().finally(() => setLoading(false));
  }, [pathCompleta]);

  if (loading) return <Estado>Cargando producto…</Estado>;
  if (!producto) return <Estado>Producto no encontrado.</Estado>;

  const handleBack = () => {
    window.history.back();
  };

  return (
    <ContenedorProducto>
      <MetaInfo>
        (Método: <strong>{metodo}</strong> | Categoría: <strong>{categoriaDetectada}</strong>)
      </MetaInfo>
      <BackButton onClick={handleBack}>⬅ Volver</BackButton>
      <ProductoDestacado producto={producto} categoria={categoriaDetectada} />
    </ContenedorProducto>
  );
}

const flatten = (nodos, currentPath = []) => {
  const hojas = [];
  const rec = (nodo, path) => {
    const nuevaRuta = [...path, nodo.nombre];
    if (!nodo.children?.length) {
      hojas.push({
        ...nodo,
        ruta: nuevaRuta.join("/"),
        pathArray: nuevaRuta,
        imagen: nodo.imagenes?.[0],
      });
    } else {
      nodo.children.forEach((child) => rec(child, nuevaRuta));
    }
  };
  nodos.forEach((n) => rec(n, currentPath));
  return hojas;
};

const slugify = (str = "") =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const ContenedorProducto = styled.div`
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin: 1rem auto;
  max-width: 960px;
`;

const MetaInfo = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
`;

const Estado = styled.div`
  padding: 2rem;
  font-size: 1rem;
  color: #555;
  text-align: center;
`;

const BackButton = styled.button`
  margin-bottom: 1rem;
  background: #ddd;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: #ccc;
  }
`;
