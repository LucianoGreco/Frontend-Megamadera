// ✅ gestorImage.js — Carga y organiza imágenes automáticamente por carpetas y nombres

// 🔁 Carga todos los archivos de la carpeta logo de forma inmediata (eager)
const logos = import.meta.glob('@/assets/logo/*', { eager: true });

// 🔁 Carga todas las imágenes de fondo
const banners = import.meta.glob('@/assets/banner/*', { eager: true });

// 🔁 Carga íconos desde subcarpetas dentro de /icons/
const icons = import.meta.glob('@/assets/icons/*/*.{jpg,jpeg,png}', { eager: true });

// 🔁 Carga imágenes del simulador desde la carpeta /products/simulador/
const simuladorArchivos = import.meta.glob('@/assets/products/simulador/*.{jpg,jpeg,png}', { eager: true });

// 🔁 Carga las imágenes que se usan en las tarjetas del home
const cards = import.meta.glob('@/assets/cardHome/*', { eager: true });


// 🔧 Procesar imágenes del simulador para tener claves amigables como "simulador-1"
const procesadasSimulador = {};

for (const path in simuladorArchivos) {
  // Extrae solo el nombre del archivo sin extensión (ej: "1" de "1.png")
  const fileName = path.split('/').pop().split('.')[0];

  let key = fileName;

  // Si el nombre es numérico puro, lo transforma en "simulador-X"
  if (/^\d+$/.test(fileName)) {
    key = `simulador-${fileName}`;
  }
  // Si no tiene el prefijo "simulador-", lo agrega con guion (ej: "puerta1" → "puerta-1")
  else if (!fileName.includes('simulador-')) {
    key = fileName.replace(/([a-zA-Z]+)(\d+)/, '$1-$2');
  }

  // Asocia la imagen procesada al nombre de clave final
  procesadasSimulador[key] = simuladorArchivos[path].default;
}


// 🃏 Procesar imágenes de las tarjetas del home
const procesadasCards = {};

for (const path in cards) {
  // Usa el nombre del archivo como clave (sin extensión)
  const key = path.split('/').pop().split('.')[0];
  procesadasCards[key] = cards[path].default;
}


// 🌄 Procesar imágenes de fondo para usarlas por nombre
const procesadasBanners = {};

for (const path in banners) {
  const key = path.split('/').pop().split('.')[0];
  procesadasBanners[key] = banners[path].default;
}


// 🚀 Exportar todo lo que se cargó y procesó, con nombres claros

export const imagenLogo = logos;                        // Todos los logos
export const bannerPageImage = procesadasBanners;    // Fondos por clave
export const CardHomeImage = procesadasCards;           // Imágenes para las cards
export const iconosRedes = icons;                       // Íconos de redes o generales
export const imagenesSimulador = procesadasSimulador;   // Imágenes del simulador con claves limpias
