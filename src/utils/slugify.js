// 📦 src/utils/slugify.js

// 🔧 Función utilitaria que transforma cualquier texto en un "slug" amigable para URLs
// Ejemplo: "Mármol Blanco 60x60" → "marmol-blanco-60x60"
export function slugify(text) {
  return text
    .toString() // Asegura que el input sea una cadena de texto (por si viene un número, null, etc.)

    .toLowerCase() // Convierte todo el texto a minúsculas
    // Ej: "Mármol Blanco" → "mármol blanco"

    .normalize("NFD") // Descompone caracteres acentuados (Ñ → N + ~), necesario para quitar tildes
    // Ej: "mármol" → "mármol" (la "á" se convierte en "a" + acento)

    .replace(/[\u0300-\u036f]/g, "") // Elimina cualquier marca de acento (diacríticos Unicode)
    // Ej: "mármol" → "marmol"

    .replace(/\s+/g, "-") // Reemplaza todos los espacios (y tabs) por guiones medios
    // Ej: "marmol blanco" → "marmol-blanco"

    .replace(/[^\w\-]+/g, "") // Elimina cualquier caracter que no sea alfanumérico o guión
    // Ej: "marmol-blanco@" → "marmol-blanco"

    .replace(/\-\-+/g, "-") // Reemplaza múltiples guiones seguidos por uno solo
    // Ej: "marmol--blanco" → "marmol-blanco"

    .replace(/^-+|-+$/g, ""); // Elimina guiones al principio o al final de la cadena
    // Ej: "-marmol-blanco-" → "marmol-blanco"
}
