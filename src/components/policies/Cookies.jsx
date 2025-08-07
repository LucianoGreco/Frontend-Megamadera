import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Contenedor principal de la página
const Container = styled.div`
  padding: 30px;
  max-width: 900px;
  margin: 40px auto;
  background: rgba(0, 0, 0, 0.7); /* Fondo oscuro y semi-translúcido */
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5); /* Sombra sutil */
  font-family: 'Montserrat', sans-serif; /* Fuente global */
  color: var(--text-color);
  line-height: 1.6;
  backdrop-filter: blur(10px); /* Efecto de desenfoque */
`;

// Título de la política de cookies
const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--text-color); /* Color global */
  text-align: center;
  text-shadow: var(--shadow); /* Sombra global */
`;

// Estilos para cada sección de la política de cookies
const Section = styled.section`
  margin-bottom: 40px;

  h2 {
    font-size: 1.5rem;
    color: var(--text-color); /* Color global */
    margin-bottom: 10px;
  }

  p {
    font-size: 1rem;
    color: var(--text-color);
    margin-bottom: 15px;
  }
`;

// Botón de regreso a la página principal
const BackButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  margin-top: 30px;
  background-color: #000;
  color: #fff;
  text-decoration: none;
  border-radius: var(--border-radius);
  font-size: 1rem;
  font-weight: bold;
  text-align: center;
  transition: background-color 0.3s ease, transform 0.2s ease;
  backdrop-filter: blur(10px); /* Desenfoque para dar un toque sutil */

  &:hover {
    background-color: #fff;
    color: #000;
    transform: scale(1.05); /* Efecto de escala en hover */
  }
`;

// Enlaces adicionales a otras políticas
const NavLinks = styled.nav`
  margin-top: 30px;
  text-align: center;

  a {
    color: var(--text-color);
    text-decoration: none;
    font-size: 1rem;
    margin: 0 15px;
    transition: color 0.3s ease;

    &:hover {
      color: var(--hover-text-color);
    }
  }
`;

// Componente de Política de Cookies
const Cookies = () => {
  return (
    <Container>
      <Title>Política de Cookies</Title>
      
      <Section>
        <h2>1. ¿Qué son las Cookies?</h2>
        <p>
          Las cookies son pequeños archivos de texto que se colocan en su dispositivo cuando visita nuestro sitio web. Se utilizan para mejorar su experiencia en el sitio.
        </p>
        
        <h2>2. Tipos de Cookies que Utilizamos</h2>
        <p>
          Utilizamos cookies para recordar sus preferencias, analizar el tráfico del sitio y mejorar la funcionalidad del sitio web. Esto incluye cookies de sesión y cookies persistentes.
        </p>
        
        <h2>3. Cómo Puede Controlar las Cookies</h2>
        <p>
          Puede controlar y gestionar las cookies a través de la configuración de su navegador. Sin embargo, tenga en cuenta que deshabilitar las cookies puede afectar la funcionalidad del sitio web.
        </p>
        
        <h2>4. Modificaciones</h2>
        <p>
          Podemos actualizar esta política de cookies en cualquier momento. Los cambios se publicarán en esta página.
        </p>
        <p>Última actualización: [Fecha]</p>
      </Section>
      
      <BackButton to="/">Volver a la página principal</BackButton>
      
      <NavLinks>
        <Link to="/terminos">Términos y Condiciones</Link> | 
        <Link to="/privacidad">Política de Privacidad</Link>
      </NavLinks>
    </Container>
  );
};

export default Cookies;
