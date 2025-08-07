import { useEffect, useState } from "react";
import { getByFullPath } from "@/api/resources/productsApi";

export default function useProductoPorRuta(categoria, path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!categoria || !path) return;

    setLoading(true);
    setError(null);

    getByFullPath(categoria, path)
      .then((res) => setData(res))
      .catch((err) => {
        console.error("Error buscando producto por ruta:", err);
        setError("No se encontró el producto");
      })
      .finally(() => setLoading(false));
  }, [categoria, path]);

  return { data, loading, error };
}
