// 📁 src/hooks/useTodosLosProductos.js

import { useEffect, useState } from "react";
import {
  getHerrajes,
  getMelaminas,
  getRevestimientos,
  getMuebles,
  getVinilos,
} from "@/api/resources/productsApi";

import { normalizarArbol } from "@/api/utils/normalizeTree";

// 🔁 Aplana recursivamente un árbol a una lista plana de productos
const flattenTree = (arbol) => {
  const resultado = [];
  const recorrer = (nodo) => {
    resultado.push(nodo);
    if (Array.isArray(nodo.children)) {
      nodo.children.forEach(recorrer);
    }
  };
  Array.isArray(arbol) ? arbol.forEach(recorrer) : recorrer(arbol);
  return resultado;
};

// 🧠 Genera tags a partir de nombre, descripción, categoría y path
const generarTags = (producto) => {
  const base = [
    producto.nombre,
    producto.descripcion,
    producto.categoria,
    ...(producto.path || []),
  ]
    .join(" ")
    .toLowerCase();

  return base
    .split(/[\s,/.-]+/)
    .filter(Boolean)
    .filter((v, i, a) => a.indexOf(v) === i); // sin duplicados
};

// 🧠 Hook personalizado que centraliza y normaliza todos los productos del sistema
const useTodosLosProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargar = async () => {
      setLoading(true);
      try {
        const [mel, her, rev, mub, vin] = await Promise.all([
          getMelaminas(),
          getHerrajes(),
          getRevestimientos(),
          getMuebles(),
          getVinilos(),
        ]);

        const todos = [
          ...flattenTree(normalizarArbol(mel)).map((p) => ({
            ...p,
            categoria: "melaminas",
            tags: generarTags(p),
          })),
          ...flattenTree(normalizarArbol(her)).map((p) => ({
            ...p,
            categoria: "herrajes",
            tags: generarTags(p),
          })),
          ...flattenTree(normalizarArbol(rev)).map((p) => ({
            ...p,
            categoria: "revestimientos",
            tags: generarTags(p),
          })),
          ...flattenTree(normalizarArbol(mub)).map((p) => ({
            ...p,
            categoria: "muebles",
            tags: generarTags(p),
          })),
          ...flattenTree(normalizarArbol(vin)).map((p) => ({
            ...p,
            categoria: "vinilos",
            tags: generarTags(p),
          })),
        ];

        setProductos(todos);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Error al cargar los productos");
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  return { productos, loading, error };
};

export default useTodosLosProductos;
