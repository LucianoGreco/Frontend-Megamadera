// ✅ todosLosProductos.jsx (grilla de productos con links reales)
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import useTodosLosProductos from "@/hooks/useTodosLosProductos";

const TodosLosProductos = () => {
  const { productos, loading, error } = useTodosLosProductos();

  if (loading) return <div>Cargando todos los productos…</div>;
  if (error) return <div>{error}</div>;

  return (
    <Grid>
      {productos.map((p) => (
        <Link
          key={`${p.id}-${p.categoria}`}
          to={`/producto/${p.categoria}/${p.pathArray.map(encodeURIComponent).join("/")}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card>
            <img src={p.imagenes?.[0] || ""} alt={p.nombre} />
            <div>
              <strong>{p.nombre}</strong>
              <p>{p.categoria}</p>
            </div>
          </Card>
        </Link>
      ))}
    </Grid>
  );
};

export default TodosLosProductos;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  padding: 1rem;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  text-align: center;

  img {
    width: 100%;
    height: 120px;
    object-fit: contain;
    background: #f7f7f7;
  }

  div {
    padding: 0.5rem;
  }
`;
