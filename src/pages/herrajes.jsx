import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getHerrajes } from "@/api";
import useProductos from "@/hooks/useProductos";
import Slider from "@/components/ui/Slider";
import ProductoDestacado from "@/components/ProductoDestacado";
import { normalizarDatos } from "@/api/utils/normalizeTree";

const API_PUBLIC_BASE = "http://localhost:4000";

const Herrajes = () => {
  const { data: rawItems, loading, error } = useProductos(getHerrajes);
  const [path, setPath] = useState([]);
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [destacados, setDestacados] = useState([]);

  useEffect(() => {
    if (rawItems && rawItems.length > 0) {
      const normalizados = normalizarDatos(rawItems);
      const planos = flatten(normalizados);
      setDestacados(planos);
    }
  }, [rawItems]);

  if (loading) return <Container>Cargando herrajes…</Container>;
  if (error) return <Container>❌ Error al cargar los herrajes</Container>;

  const items = normalizarHerrajes(rawItems);

  const currentItems = path.reduce(
    (acc, current) => acc.find((x) => x.id === current)?.children || [],
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
      <Titulo>Herrajes</Titulo>

      <Slider
        title="Herrajes destacados"
        data={destacados}
        categoria="herrajes"
        mostrarRutaCompleta
        onProductoClick={setSelectedLeaf} // 👈 ahora maneja el mismo modal
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

      {selectedLeaf && (
        <ModalOverlay onClick={() => setSelectedLeaf(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setSelectedLeaf(null)}>×</CloseButton>
            <ProductoDestacado producto={selectedLeaf} categoria="herrajes" />
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default Herrajes;

// -------------------- Helpers ------------------------

const flatten = (nodos, currentPath = []) => {
  const hojas = [];

  const rec = (nodo, path) => {
    const nuevaRuta = [...path, nodo.nombre];
    if (!nodo.children || nodo.children.length === 0) {
      const imagen = nodo.imagenes?.[0] ?? "placeholder.jpg";
      const productoPlano = {
        ...nodo,
        imagen,
        ruta: nuevaRuta.join("/"),
        pathArray: nuevaRuta,
      };
      hojas.push(productoPlano);
    } else {
      nodo.children.forEach((child) => rec(child, nuevaRuta));
    }
  };

  nodos.forEach((n) => rec(n, currentPath));
  return hojas;
};

const normalizarHerrajes = (productos) => {
  return productos.map((item) => ({
    ...item,
    imagen: `${API_PUBLIC_BASE}/products/${item.imagenes?.[0] ?? "placeholder.jpg"}`,
    children: normalizarHerrajes(item.children || []),
  }));
};

// -------------------- Styles ------------------------

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Titulo = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
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

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 1rem;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 1rem;
  max-width: 600px;
  width: 100%;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    color: red;
  }
`;
