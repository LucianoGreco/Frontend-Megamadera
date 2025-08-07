// URL base de la API. Se toma del .env, o usa localhost por defecto.
// export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';
export const API_BASE = import.meta.env.VITE_API_BASE || 'https://backend-megamadera.onrender.com/api';



// Construye un query string desde un objeto de parámetros (ej: {q: 'placares'} → "?q=placares")
export function buildQuery(params = {}) {
  const query = new URLSearchParams(params);               // Crea el query
  return query.toString() ? `?${query.toString()}` : '';   // Devuelve "?..." si hay params, si no, cadena vacía
}

// Hace una request HTTP y devuelve la respuesta parseada como JSON
export async function requestJSON(url, opts = {}) {
  const res = await fetch(url, opts);                      // Llama al endpoint con fetch
  if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`); // Si falla, lanza error con status

  const json = await res.json();                           // Parsea la respuesta
  return json.products || json;                            // Si hay una clave "products", la devuelve; si no, todo
}
