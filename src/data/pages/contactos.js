// 📄 src/data/pages/contactos.js

// 🖼️ Importa el logo principal de la empresa
import imagenLogo from "@/assets/logo/logo.png";

// 📦 Objeto con toda la info de contacto, usado en distintas partes del sitio
const contactos = {
  // 📛 Nombre comercial
  nombreEmpresa: "Mega Madera",

  // 📍 Dirección física
  direccion: {
    calle: "Av. Moreno 1455",
    localidad: "San Rafael",
    provincia: "Mendoza",
    pais: "Argentina",
  },

  // ☎️ Teléfono principal
  telefono: "+54 260422505",

  // 📧 Email de contacto general
  correo: "contacto@megamadera.com",

  // ⏰ Horarios de atención divididos por turno
  horarios: {
    mañana: {
      apertura: "08:00",
      cierre: "13:00",
    },
    tarde: {
      apertura: "16:00",
      cierre: "20:00",
    },
  },

  // 📅 Días hábiles
  dias: ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],

  // 🖼️ Logo a mostrar (objeto importado arriba)
  logo: imagenLogo,

  // 🌐 Redes sociales y otros enlaces de contacto
  redesSociales: {
    facebook: "https://facebook.com/megamadera",
    instagram: "https://instagram.com/mega.madera",
    whatsapp: "https://wa.me/+549260433172",
    correoVentas: "ventas.megamadera@gmail.com",
    GoogleMaps: "https://maps.app.goo.gl/ZKd8QbWgY8aJM6gF9"
  },
};

// 📤 Exportación para que se pueda importar en cualquier componente
export default contactos;
