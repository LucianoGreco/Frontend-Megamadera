// Define la base pública para las URLs de imágenes (viene del .env o usa localhost por defecto)
const API_PUBLIC_BASE = import.meta.env.VITE_PUBLIC_BASE || "http://localhost:4000";
// const API_PUBLIC_BASE = import.meta.env.VITE_PUBLIC_BASE || "https://backend-megamadera.onrender.com";


// Corrige la ruta de una imagen de producto
export function fixImagePath(img) {
  // Si no hay imagen, usa un placeholder por defecto
  if (!img) return `${API_PUBLIC_BASE}/products/placeholder.jpg`;

  // Si ya es una URL completa (http...), la deja igual
  // Si es una ruta relativa, le agrega el prefijo base
  return img.startsWith("http") ? img : `${API_PUBLIC_BASE}/products/${img}`;
}
