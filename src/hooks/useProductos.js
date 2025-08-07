// 📄 src/hooks/useProductos.js

// React: hooks de estado y efecto
import { useEffect, useState } from "react";

// 🧹 Utilidad para normalizar árboles de productos (estructura común en la API)
import { normalizarDatos } from "@/api/utils/normalizeTree";

// 🧠 Hook reutilizable para consumir funciones que traen productos desde la API
export default function useProductos(fn) {
  // Estado para guardar los datos procesados
  const [data, setData] = useState([]);

  // Estado para manejar la carga
  const [loading, setLoading] = useState(true);

  // Estado para manejar errores
  const [error, setError] = useState(false);

  // 🌀 useEffect: se ejecuta una vez cuando cambia `fn`
  useEffect(() => {
    let ignore = false; // Flag para ignorar el resultado si el componente se desmonta

    setLoading(true); // Comienza la carga

    // Ejecuta la función recibida (que debe devolver una promesa con datos crudos)
    fn()
      .then((res) => {
        if (!ignore) {
          // Normaliza los datos recibidos (para mantener estructura consistente)
          const normalizado = normalizarDatos(res);

          // Actualiza estado
          setData(normalizado);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Error en useProductos:", err);
        if (!ignore) {
          setError(true);
          setLoading(false);
        }
      });

    // Cleanup: si el componente se desmonta antes de que llegue la respuesta, se ignora el resultado
    return () => {
      ignore = true;
    };
  }, [fn]); // ⚠️ Se vuelve a ejecutar si cambia la función `fn`

  // Retorna el estado actual del hook para usar en cualquier componente
  return { data, loading, error };
}
