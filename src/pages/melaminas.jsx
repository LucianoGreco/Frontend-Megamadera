import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getMelaminas } from "@/api/resources/productsApi";
import Slider from "@/components/ui/Slider";
import Loader from "@/components/ui/Loader";
import ProductoDestacado from "@/components/ProductoDestacado";
import { normalizarDatos } from "@/api/utils/normalizeTree";

const Melaminas = () => {
  const [melaminas, setMelaminas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await getMelaminas();
        const normalizados = normalizarDatos(datos);
        const planos = flatten(normalizados);
        setMelaminas(planos);
      } catch (err) {
        console.error("❌ Error al cargar melaminas:", err);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  if (loading) return <Loader />;

  return (
    <Wrapper>
      <Titulo>Melaminas</Titulo>

      <Slider
        title="Melaminas destacadas"
        data={melaminas}
        categoria="melaminas"
        mostrarRutaCompleta
      />

      <Grid>
        {melaminas.map((item) => {
          const imageSrc = item.imagen?.startsWith("http")
            ? item.imagen
            : `http://localhost:4000/products/${item.imagen}`;
          return (
            <Card key={item.id} onClick={() => setSelected(item)}>
              <CardImage src={imageSrc} alt={item.nombre} loading="lazy" />
              <CardContent>
                <Title>{item.nombre}</Title>
              </CardContent>
            </Card>
          );
        })}
      </Grid>

      {selected && (
        <Overlay onClick={() => setSelected(null)}>
          <Modal onClick={(e) => e.stopPropagation()}>
            <ProductoDestacado producto={selected} categoria="melaminas" />
          </Modal>
        </Overlay>
      )}
    </Wrapper>
  );
};

export default Melaminas;

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

// 🎨 Estilos
const Wrapper = styled.div`
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
  background: rgba(255, 255, 255, 0.85);
  border-top-right-radius: 4px;
  border: 2px solid #006400;
  border-left: none;
  border-bottom: none;
`;

const Title = styled.p`
  margin: 0;
  font-weight: 700;
  font-size: 0.95rem;
  color: #006400;
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 1rem;
`;

const Modal = styled.div`
  background: white;
  border-radius: 8px;
  max-width: 600px;
  width: 100%;
  overflow: auto;
  max-height: 90vh;
  padding: 1rem;
`;
