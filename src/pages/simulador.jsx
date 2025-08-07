// 📦 Imports principales
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  getMelaminas,
  getHerrajes,
  getRevestimientos,
  getVinilos,
  getMuebles,
} from "@/api";
import { imagenesSimulador } from "@/data/image/gestorImage";
import Slider from "@/components/ui/Slider";
import { normalizarDatos } from "@/api/utils/normalizeTree";

// 🌐 Ruta base para imágenes
const API_PUBLIC_BASE = import.meta.env.VITE_PUBLIC_BASE || "http://localhost:4000";

// 🧠 Componente principal del simulador visual
const Simulador = () => {
  // Estados principales
  const [productos, setProductos] = useState([]);
  const [otros, setOtros] = useState({
    herrajes: [],
    revestimientos: [],
    vinilos: [],
    muebles: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [melaminaSeleccionada, setMelaminaSeleccionada] = useState(null);
  const [muebleSeleccionado, setMuebleSeleccionado] = useState("simulador-1");
  const [escalaMelamina, setEscalaMelamina] = useState(100);

  // 🔁 Efecto para cargar todos los productos al montar
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [melas, herrajes, revestimientos, vinilos, muebles] =
          await Promise.all([
            getMelaminas(),
            getHerrajes(),
            getRevestimientos(),
            getVinilos(),
            getMuebles(),
          ]);

        // Normaliza los árboles y deja solo los productos hoja
        setProductos(flatten(normalizarDatos(melas)));
        setOtros({
          herrajes: flatten(normalizarDatos(herrajes)),
          revestimientos: flatten(normalizarDatos(revestimientos)),
          vinilos: flatten(normalizarDatos(vinilos)),
          muebles: flatten(normalizarDatos(muebles)),
        });
      } catch (err) {
        console.error("❌ Error al cargar productos:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  // 🔍 Filtro de búsqueda
  const productosFiltrados = productos.filter((item) =>
    item.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  // 📸 Imágenes que se renderizan en el simulador
  const imagenFondo = melaminaSeleccionada?.imagen || null;
  const imagenMueble = imagenesSimulador[muebleSeleccionado];

  // 🧾 Mensajes de carga/error
  if (loading) return <SimuladorArea>Cargando productos...</SimuladorArea>;
  if (error) return <SimuladorArea>Error al cargar productos.</SimuladorArea>;

  return (
    <MainContainer>
      <SimuladorWrapper>
        {/* 📋 Panel lateral de selección */}
        <Menu>
          <Busqueda
            placeholder="Buscar melamina..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          {/* ⚙ Controles si hay una melamina seleccionada */}
          {melaminaSeleccionada && (
            <>
              <QuitarBoton
                onClick={() => {
                  setMelaminaSeleccionada(null);
                  setBusqueda("");
                }}
              >
                ✕ Quitar melamina
              </QuitarBoton>

              <SliderLabel>Escala del patrón</SliderLabel>
              <SliderInput
                type="range"
                min="40"
                max="200"
                step="10"
                value={escalaMelamina}
                onChange={(e) => setEscalaMelamina(Number(e.target.value))}
              />
            </>
          )}

          {/* 📁 Listado de melaminas */}
          <TituloMenu>Melaminas</TituloMenu>
          {productosFiltrados.map((producto) => (
            <BotonMenu
              key={producto.nombre}
              onClick={() => setMelaminaSeleccionada(producto)}
              $activo={melaminaSeleccionada?.nombre === producto.nombre}
            >
              <ImageCircle
                src={producto.imagen}
                alt={producto.nombre}
                $activo={melaminaSeleccionada?.nombre === producto.nombre}
              />
              <NombreMelamina>{producto.nombre}</NombreMelamina>
            </BotonMenu>
          ))}

          {/* 🪑 Opciones de muebles */}
          <TituloMenu>Muebles</TituloMenu>
          {["simulador-1", "simulador-2"].map((key, i) => (
            <BotonMenu
              key={key}
              onClick={() => setMuebleSeleccionado(key)}
              $activo={muebleSeleccionado === key}
            >
              Mueble {i + 1}
            </BotonMenu>
          ))}
        </Menu>

        {/* 🖼 Zona de simulación visual */}
        <SimuladorArea>
          <SimuladorContenido id="simulador-export">
            {imagenFondo && (
              <MelaminaWrapper $mueble={muebleSeleccionado}>
                <MelaminaFondo $src={imagenFondo} $size={escalaMelamina} />
              </MelaminaWrapper>
            )}
            {imagenMueble && <ImagenMueble src={imagenMueble} alt="Mueble" />}
            {!imagenFondo && (
              <Instruccion>
                Seleccioná una melamina para ver el simulador
              </Instruccion>
            )}
          </SimuladorContenido>
        </SimuladorArea>
      </SimuladorWrapper>

      {/* 🎠 Carruseles de otras categorías */}
      <Carruseles>
        {/* {Object.entries(otros).map(([categoria, items]) => (
          <Slider
            key={categoria}
            title={categoria.toUpperCase()}
            data={items}
            onSelect={() => {}}
          />
        ))} */}
      </Carruseles>
    </MainContainer>
  );
};

// 🔁 Aplanador de árbol: deja solo productos hoja y agrega la ruta de imagen absoluta
const flatten = (nodos) => {
  const hojas = [];
  const rec = (nodo) => {
    if (!nodo.children || nodo.children.length === 0) {
      hojas.push({
        ...nodo,
        imagen: `${API_PUBLIC_BASE}/products/${nodo.imagenes?.[0] ?? "placeholder.jpg"}`,
      });
    } else {
      nodo.children.forEach(rec);
    }
  };
  nodos.forEach(rec);
  return hojas;
};

export default Simulador;


// 🎨 ESTILOS
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
`;

const SimuladorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: flex-start;
`;

const Menu = styled.aside`
  width: 250px;
  background: #f1f1f1;
  padding: 1rem;
  overflow-y: auto;
  position: sticky;
  top: 0;
  height: 100vh;
`;

const TituloMenu = styled.h2`
  font-size: 1rem;
  margin: 1.5rem 0 0.5rem;
  color: #444;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.25rem;
`;

const BotonMenu = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  background-color: ${({ $activo }) => ($activo ? "#d0eaff" : "white")};
  color: ${({ $activo }) => ($activo ? "#004080" : "#333")};
  border: 1px solid ${({ $activo }) => ($activo ? "#007acc" : "#ccc")};
  border-radius: 6px;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #e0e0e0;
  }
`;

const ImageCircle = styled.img`
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 0.5rem;
  border: 2px solid ${({ $activo }) => ($activo ? "#007acc" : "#aaa")};
`;

const NombreMelamina = styled.span`
  flex: 1;
  text-align: left;
`;

const QuitarBoton = styled.button`
  width: 100%;
  margin: 0.8rem 0 0.6rem;
  padding: 0.5rem;
  background-color: #ffdddd;
  color: #b30000;
  border: 1px solid #b30000;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.2s;
  &:hover {
    background-color: #ffbbbb;
  }
`;

const SliderLabel = styled.label`
  font-size: 0.85rem;
  margin-top: 0.6rem;
  display: block;
`;

const SliderInput = styled.input`
  width: 100%;
  margin: 0.3rem 0 1rem;
`;

const Busqueda = styled.input`
  padding: 0.6rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.9rem;
`;

const SimuladorArea = styled.main`
  flex: 1;
  background: #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto;
  padding: 2rem;
`;

const SimuladorContenido = styled.div`
  position: relative;
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16 / 9;
  background: #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MelaminaWrapper = styled.div`
  position: absolute;
  height: 100%;
  z-index: 1;
  overflow: hidden;
  ${({ $mueble }) => {
    if ($mueble === "simulador-1") return `width: 73%;`;
    if ($mueble === "simulador-2") return `width: 55%;`;
    return `width: 100%;`;
  }}
`;

const MelaminaFondo = styled.div`
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$src});
  background-repeat: repeat;
  background-size: ${(props) => props.$size}px ${(props) => props.$size}px;
  opacity: 0.9;
`;

const ImagenMueble = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 2;
`;

const Instruccion = styled.p`
  position: relative;
  z-index: 3;
  font-size: 1.1rem;
  color: #555;
  background: rgba(255, 255, 255, 0.85);
  padding: 1rem 1.5rem;
  border-radius: 12px;
  text-align: center;
`;

const Carruseles = styled.div`
  width: 100%;
  padding: 2rem 1rem;
  background: #f9f9f9;
  box-sizing: border-box;
`;
