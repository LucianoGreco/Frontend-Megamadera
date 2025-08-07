import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useProductos from "@/hooks/useProductos";
import { getVinilos } from "@/api";
import Slider from "@/components/ui/Slider";
import ProductoDestacado from "@/components/ProductoDestacado";
import { normalizarDatos } from "@/api/utils/normalizeTree";

const API_PUBLIC_BASE = "http://localhost:4000";

export default function VinilosPage() {
  const { data: rawItems, loading, error } = useProductos(getVinilos);
  const [destacados, setDestacados] = useState([]);
  const [path, setPath] = useState([]);
  const [selectedLeaf, setSelectedLeaf] = useState(null);

  useEffect(() => {
    if (rawItems && rawItems.length > 0) {
      const normalizados = normalizarDatos(rawItems);
      const planos = flatten(normalizados);
      setDestacados(planos);
    }
  }, [rawItems]);

  if (loading) return <Container>Cargando vinilos…</Container>;
  if (error) return <Container>❌ Error al cargar vinilos</Container>;

  const items = normalizarVinilos(rawItems);

  const currentItems = path.reduce(
    (acc, id) => acc.find((x) => x.id === id)?.children || [],
    items
  );

  const handleClick = (item) => {
    if (item.children && item.children.length > 0) {
      setPath([...path, item.id]);
    } else {
      setSelectedLeaf(item);
    }
  };

  const handleBack = () => {
    if (selectedLeaf) {
      setSelectedLeaf(null);
    } else {
      setPath(path.slice(0, -1));
    }
  };

  return (
    <Container>
      {selectedLeaf ? (
        <>
          <BackButton onClick={handleBack}>⬅ Volver</BackButton>
          <ProductoDestacado producto={selectedLeaf} categoria="vinilos" modal />
        </>
      ) : (
        <>
          <Titulo>Vinilos</Titulo>

          <Slider
            title="Vinilos destacados"
            data={destacados}
            categoria="vinilos"
            mostrarRutaCompleta
          />

          {(path.length > 0 || selectedLeaf) && (
            <BackButton onClick={handleBack}>⬅ Volver</BackButton>
          )}

          <Grid>
            {currentItems.map((item) => (
              <Card key={item.id} onClick={() => handleClick(item)}>
                <CardImage src={item.imagen} alt={item.nombre} />
                <CardContent>
                  <Title>{item.nombre}</Title>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}

const flatten = (nodos, currentPath = []) => {
  const hojas = [];
  const rec = (nodo, path) => {
    const nuevaRuta = [...path, nodo.nombre];
    if (!nodo.children || nodo.children.length === 0) {
      hojas.push({
        ...nodo,
        imagen: `${API_PUBLIC_BASE}/products/${nodo.imagenes?.[0] ?? "placeholder.jpg"}`,
        ruta: nuevaRuta.join("/"),
        pathArray: nuevaRuta,
      });
    } else {
      nodo.children.forEach((child) => rec(child, nuevaRuta));
    }
  };
  nodos.forEach((n) => rec(n, currentPath));
  return hojas;
};

const normalizarVinilos = (productos) =>
  productos.map((item) => ({
    ...item,
    imagen: `${API_PUBLIC_BASE}/products/${item.imagenes?.[0] ?? "placeholder.jpg"}`,
    children: normalizarVinilos(item.children || []),
  }));

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Titulo = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: bold;
  color: #222;
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  &:hover {
    transform: translateY(-3px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 160px;
  object-fit: contain;
  background: #f9f9f9;
`;

const CardContent = styled.div`
  padding: 0.5rem;
`;

const Title = styled.p`
  font-weight: 600;
  font-size: 1rem;
  margin: 0;
`;
