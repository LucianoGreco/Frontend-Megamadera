import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getRevestimientos } from "@/api/resources/productsApi";
import Slider from "@/components/ui/Slider";
import ProductoDestacado from "@/components/ProductoDestacado";
import Loader from "@/components/ui/Loader";
import { normalizarDatos } from "@/api/utils/normalizeTree";

const API_PUBLIC_BASE = "http://localhost:4000";

export default function RevestimientosPage() {
  const [revestimientos, setRevestimientos] = useState([]);
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await getRevestimientos();
        const normalizados = normalizarDatos(datos);
        const planos = flatten(normalizados);
        setRevestimientos(planos);
      } catch (err) {
        console.error("❌ Error al cargar revestimientos:", err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  if (loading) return <Loader />;

  const handleBack = () => {
    setSelectedLeaf(null);
  };

  return (
    <Container>
      {selectedLeaf ? (
        <>
          <BackButton onClick={handleBack}>⬅ Volver</BackButton>
          <ProductoDestacado producto={selectedLeaf} categoria="revestimientos" modal />
        </>
      ) : (
        <>
          <Titulo>Revestimientos</Titulo>
          <Slider
            title="Revestimientos destacados"
            data={revestimientos}
            categoria="revestimientos"
            mostrarRutaCompleta
          />

          <Grid>
            {revestimientos.map((item) => {
              const imageSrc = item.imagen?.startsWith("http")
                ? item.imagen
                : `${API_PUBLIC_BASE}/products/${item.imagen}`;

              const categoria = formatearRuta(item.ruta);

              return (
                <Card key={item.id} onClick={() => setSelectedLeaf(item)}>
                  <EtiquetaRuta>{categoria}</EtiquetaRuta>
                  <CardImage src={imageSrc} alt={item.nombre} loading="lazy" />
                  <CardContent>
                    <Title>{item.nombre}</Title>
                  </CardContent>
                </Card>
              );
            })}
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

const formatearRuta = (ruta) => {
  return ruta
    .split("/")
    .slice(0, -1)
    .map((segmento) =>
      segmento
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase())
    )
    .join(" > ");
};

const Container = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Titulo = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
  color: #333;
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
  gap: 1.5rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  position: relative;
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
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 30px;
  left: 0;
  padding: 0.3rem 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  border-top-right-radius: 4px;
  border: 2px solid #006400;
  border-left: none;
  border-bottom: none;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 1rem;
  color: #006400;
`;

const EtiquetaRuta = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  color: #555;
  background: #f0f0f0;
  padding: 0.3rem 0.5rem;
  border-bottom: 1px solid #ccc;
  text-align: center;
  text-transform: capitalize;
`;
