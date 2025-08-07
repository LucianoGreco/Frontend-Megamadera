// Importación de React para poder usar JSX
import React from "react";

// Importa `Link` para crear enlaces de navegación y `useLocation` para conocer la URL actual
import { Link, useLocation } from "react-router-dom";

// Importa styled-components para crear componentes con estilos encapsulados (CSS-in-JS)
import styled from "styled-components";

// Importa los datos de las secciones desde un archivo de configuración o mock de datos
import data from "@/data/pages/home";


// 📌 Componente estilizado del contenedor del navbar
const NavbarContainer = styled.nav`
  display: flex;        // Muestra los elementos en fila (horizontal)
  gap: 1rem;            // Espaciado entre cada enlace

  // Estilos aplicados a todos los <a> hijos del contenedor
  a {
    font-size: 0.95rem;          // Tamaño de letra
    font-weight: 500;            // Grosor medio
    text-transform: capitalize;  // Capitaliza el texto (primera letra mayúscula)
    letter-spacing: 0.3px;       // Espaciado entre letras
    padding: 6px 10px;           // Espaciado interno (vertical, horizontal)
    border-radius: 4px;          // Bordes redondeados
    transition: background 0.3s ease, color 0.3s ease; // Animaciones suaves al pasar el mouse
    color: #333;                 // Color de texto
    text-decoration: none;       // Quita subrayado de enlaces

    &:hover {
      background-color: #f0f0f0; // Cambia el fondo al pasar el mouse
    }

    &.active {
      // Si el enlace es el activo (la URL coincide), se le aplican estos estilos
      color: #0066cc;
      font-weight: 600;
      border-bottom: 2px solid #0066cc;
      background: transparent;
    }
  }

  // 💡 Media query para ocultar el navbar en pantallas pequeñas
  @media (max-width: 768px) {
    display: none;
  }
`;


// 🧠 Componente funcional que representa el Navbar
const Navbar = () => {
  // Hook de React Router que devuelve la ruta actual
  const location = useLocation(); // Ejemplo de retorno: { pathname: "/muebles", ... }

  // Extrae las secciones desde el archivo de datos como array (Object.values de un objeto)
  const secciones = Object.values(data.secciones);

  return (
    // Renderiza el contenedor del navbar con los enlaces
    <NavbarContainer>
      {secciones.map((sec) => (
        <Link
          key={sec.id}                      // 🔑 Clave única por accesibilidad y performance
          to={sec.page}                     // Ruta destino del link (ej: "/melaminas")
          className={location.pathname === sec.page ? "active" : ""} 
          // Se le aplica la clase "active" si la ruta actual coincide con la del link
        >
          {sec.name}                    
        </Link>
      ))}
    </NavbarContainer>
  );
};

// Exporta el componente para poder usarlo en cualquier parte del proyecto
export default Navbar;
