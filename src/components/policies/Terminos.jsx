import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Contenedor principal de la página de términos
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

// Estilo para cada sección del contenido
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

// Enlaces a otras políticas
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

// Componente de Términos y Condiciones
const Terminos = () => (
  <Container>
    <Title>Términos y Condiciones</Title>
    
    <Section>
      <h2>1. Aceptación de los Términos</h2>
      <p>
        Al utilizar nuestro sitio, acepta estos términos y condiciones en su totalidad.
      </p>

      <h2>2. Uso del Sitio Web</h2>
      <p>
        Debe usar el sitio de acuerdo con la ley y estos términos. No debe dañar el sitio web.
      </p>

      <h2>3. Propiedad Intelectual</h2>
      <p>
        Todo el contenido del sitio web es propiedad de [Su Empresa] y está protegido por leyes de propiedad intelectual.
      </p>

      <h2>4. Limitación de Responsabilidad</h2>
      <p>
        No somos responsables de ningún daño resultante del uso del sitio web.
      </p>

      <h2>5. Modificaciones</h2>
      <p>
        Nos reservamos el derecho de modificar estos términos en cualquier momento.
      </p>
      <p>Última actualización: [Fecha]</p>
    </Section>

    <BackButton to="/">Volver a la página principal</BackButton>

    <NavLinks>
      <Link to="/privacidad">Política de Privacidad</Link> | 
      <Link to="/cookies">Política de Cookies</Link>
    </NavLinks>
  </Container>
);

export default Terminos;
