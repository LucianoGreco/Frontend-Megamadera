import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Contenedor principal de la página de privacidad
const Container = styled.div`
  padding: 30px;
  max-width: 900px;
  margin: 40px auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  font-family: 'Montserrat', sans-serif;
  color: var(--text-color);
  line-height: 1.6;
  backdrop-filter: blur(10px);
`;

// Título de la página
const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: var(--text-color);
  text-align: center;
  text-shadow: var(--shadow);
`;

// Estilo para las secciones de contenido
const Section = styled.section`
  margin-bottom: 40px;

  h2 {
    font-size: 1.6rem;
    color: var(--text-color);
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
  backdrop-filter: blur(10px);

  &:hover {
    background-color: #fff;
    color: #000;
    transform: scale(1.05);
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

// Componente de Política de Privacidad
const Privacidad = () => (
  <Container>
    <Title>Política de Privacidad</Title>
    
    <Section>
      <h2>1. Información que Recopilamos</h2>
      <p>
        Recopilamos información personal que usted nos proporciona al usar nuestro sitio web, como nombre y correo electrónico.
      </p>

      <h2>2. Cómo Usamos su Información</h2>
      <p>
        Usamos su información para mejorar nuestros servicios y comunicarnos sobre actualizaciones.
      </p>

      <h2>3. Seguridad</h2>
      <p>
        Implementamos medidas de seguridad para proteger su información, aunque no podemos garantizar seguridad absoluta.
      </p>

      <h2>4. Modificaciones</h2>
      <p>
        Podemos actualizar esta política en cualquier momento. Los cambios se publicarán en esta página.
      </p>
      <p>Última actualización: [Fecha]</p>
    </Section>

    <BackButton to="/">Volver a la página principal</BackButton>

    <NavLinks>
      <Link to="/terminos">Términos y Condiciones</Link> | 
      <Link to="/cookies">Política de Cookies</Link>
    </NavLinks>
  </Container>
);

export default Privacidad;
