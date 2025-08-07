// 📁 src/hooks/useBuscador.js

import { useMemo } from "react";
import useTodosLosProductos from "./useTodosLosProductos";

// 🧠 Hook para buscar productos con query + sugerencias
export default function useBuscador(query) {
  const { productos, loading } = useTodosLosProductos();
  const q = query.trim().toLowerCase();

  // 🔍 Resultado principal
  const resultados = useMemo(() => {
    if (!q || productos.length === 0) return [];

    return productos.filter((p) => {
      return (
        p.nombre?.toLowerCase().includes(q) ||
        p.descripcion?.toLowerCase().includes(q) ||
        p.categoria?.toLowerCase().includes(q) ||
        p.path?.join("/").toLowerCase().includes(q) ||
        (Array.isArray(p.tags) && p.tags.some((tag) => tag.includes(q)))
      );
    });
  }, [q, productos]);

  // 💡 Sugerencias automáticas (autocomplete)
  const sugerencias = useMemo(() => {
    if (!q || productos.length === 0) return [];

    const pool = new Set();

    productos.forEach((p) => {
      if (p.tags) {
        p.tags.forEach((tag) => {
          if (tag.includes(q)) pool.add(tag);
        });
      }
    });

    return [...pool].slice(0, 6);
  }, [q, productos]);

  return { resultados, sugerencias, loading };
}
