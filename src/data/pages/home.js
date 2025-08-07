// 📄 src/data/pages/home.js

// 🖼️ Importamos las imágenes procesadas para las secciones desde el gestor
import { CardHomeImage, bannerPageImage } from "@/data/image/gestorImage.js";

// 🔧 Función utilitaria para construir un objeto de sección con una estructura uniforme
const buildSection = ({ id, name, image, page, description = "" }) => {
  const key = name.toLowerCase(); // Usamos el nombre en minúsculas para acceder al fondo correspondiente
  return {
    id,                  // Identificador numérico único
    name,                // Nombre visible de la sección (ej: "Melaminas")
    description,         // Descripción de la sección (puede estar vacía por defecto)
    image,               // Imagen de portada (card principal)
    page,                // Ruta a la que redirige (ej: "/melaminas")
    background: bannerPageImage[key] || null, // Fondo asociado, si existe
  };
};

// 📦 Objeto principal con todas las secciones del home
const data = {
  secciones: {
    // 🔩 Herrajes
    herrajes: buildSection({
      id: 1,
      name: "Herrajes",
      image: CardHomeImage.herrajes,
      page: "/herrajes",
      description:
        "La mejor selección de herrajes para muebles y construcción, con diseños modernos y alta calidad para todos tus proyectos."
    }),

    // 🟫 Melaminas
    melaminas: buildSection({
      id: 2,
      name: "Melaminas",
      image: CardHomeImage.melaminas,
      page: "/melaminas",
      description:
        "Amplia variedad de melaminas en distintos colores y texturas para dar estilo y durabilidad a tus muebles."
    }),

    // 🪑 Muebles
    muebles: buildSection({
      id: 3,
      name: "Muebles",
      image: CardHomeImage.muebles,
      page: "/muebles",
      description:
        "Diseños exclusivos de muebles funcionales y estéticos para cada ambiente de tu hogar u oficina."
    }),

    // 🧱 Revestimientos
    revestimiento: buildSection({
      id: 4,
      name: "Revestimientos",
      image: CardHomeImage.revestimientos,
      page: "/revestimientos",
      description:
        "Revestimientos de pared y pisos que combinan belleza y resistencia para transformar tus espacios."
    }),

    // 🖥️ Simulador
    simulador: buildSection({
      id: 6,
      name: "Simulador",
      image: CardHomeImage.simulador,
      page: "/simulador",
      description:
        "Visualiza cómo quedarán tus ambientes antes de comenzar tu proyecto con nuestro simulador interactivo."
    }),

    // 🧲 Vinilos
    vinilos: buildSection({
      id: 8,
      name: "Vinilos",
      image: CardHomeImage.vinilos,
      page: "/vinilos",
      description:
        "Vinilos decorativos y funcionales para vidrios, que aportan privacidad y un toque elegante a tus ambientes."
    }),

    // ☎️ Contacto
    contacto: buildSection({
      id: 9,
      name: "Contactos",
      image: CardHomeImage.contactos,
      page: "/contactos",
      description:
        "Contáctanos para asesoramiento personalizado y resolver todas tus consultas sobre nuestros productos y servicios."
    }),
  },
};

// 📤 Exportamos el objeto `data` con todas las secciones para su uso en otras partes del sitio (ej: Home, Navbar, Banner)
export default data;
