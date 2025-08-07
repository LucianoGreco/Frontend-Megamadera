import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getMuebles } from "@/api/resources/productsApi";
import useProductos from "@/hooks/useProductos";
import Slider from "@/components/ui/Slider";
import ProductoDestacado from "@/components/ProductoDestacado";
import { normalizarDatos } from "@/api/utils/normalizeTree";

const API_PUBLIC_BASE = "http://localhost:4000";

const Muebles = () => {
  const { data: rawItems, loading, error } = useProductos(getMuebles);
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

  if (loading) return <Container>Cargando muebles…</Container>;
  if (error) return <Container>❌ Error al cargar los muebles</Container>;

  const items = normalizarMuebles(rawItems);

  const currentItems = path.reduce(
    (acc, current) => acc.find((x) => x.id === current)?.children || [],
    items
  );

  const handleClick = (item) => {
    if (item.children && item.children.length > 0) {
      setPath([...path, item.id]);
    } else {
      setSelectedLeaf(item);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (selectedLeaf) {
      setSelectedLeaf(null);
    } else {
      setPath(path.slice(0, -1));
    }
  };

  const handleProductoDestacadoClick = (producto) => {
    setSelectedLeaf(producto);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container>
      {selectedLeaf ? (
        <>
          <BackButton onClick={handleBack}>⬅ Volver</BackButton>
          <ProductoDestacado
            producto={selectedLeaf}
            categoria="muebles"
            modal
            onBack={handleBack}
          />
        </>
      ) : (
        <>
          <Titulo>Muebles</Titulo>
          <Slider
            title="Muebles destacados"
            data={destacados}
            categoria="muebles"
            mostrarRutaCompleta
            onProductoClick={handleProductoDestacadoClick}
            onBack={handleBack}
          />

          {path.length > 0 && (
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
};

export default Muebles;

const flatten = (nodos, currentPath = []) => {
  const hojas = [];
  const rec = (nodo, path) => {
    const nuevaRuta = [...path, nodo.nombre];
    if (!nodo.children || nodo.children.length === 0) {
      const imagen = nodo.imagenes?.[0] ?? "placeholder.jpg";
      hojas.push({
        ...nodo,
        imagen,
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

const normalizarMuebles = (productos) => {
  return productos.map((item) => ({
    ...item,
    imagen: `${API_PUBLIC_BASE}/products/${item.imagenes?.[0] ?? "placeholder.jpg"}`,
    children: normalizarMuebles(item.children || []),
  }));
};

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
