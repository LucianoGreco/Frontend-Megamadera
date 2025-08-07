import styled from "styled-components";

const Footer = () => {
  return (
    <Container>                    {/* Fondo oscuro con padding */}
      <Content>                    {/* Contenedor centrado con spacing vertical */}
        <Logo>Mega Madera</Logo>   {/* Título grande de la marca */}

        <Columns>                  {/* Tres columnas con info institucional */}
          <Column>
            <Title>Dirección</Title>
            <Item>Av. Moreno 1455</Item>
            <Item>San Rafael, Mendoza, Argentina</Item>
          </Column>

          <Column>
            <Title>Contacto</Title>
            <Item>Tel: +54 260422505</Item>
            <Item>Email: contacto@megamadera.com</Item>
          </Column>

          <Column>
            <Title>Horario</Title>
            <Item>Lunes a Viernes: 8:00 a 12:30 / 16:00 a 20:30</Item>
            <Item>Sábados: 8:00 a 13:00</Item>
          </Column>
        </Columns>

        <Copy>
          &copy; {new Date().getFullYear()} Mega Madera · Todos los derechos reservados.
        </Copy>
      </Content>
    </Container>
  );
};

export default Footer;

// Pie de página con fondo oscuro y texto claro
const Container = styled.footer`
  background: #121212;
  color: #eee;
  padding: 3rem 1.5rem;
`;

// Contenido centrado con separación vertical entre bloques
const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
`;

// Logo destacado con tipografía grande y color amarillo
const Logo = styled.h1`
  font-size: 2.8rem;
  font-weight: 700;
  color: #f5c518;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

// Contenedor de las columnas (direccion, contacto, horario)
const Columns = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  text-align: left;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }
`;

// Columna individual con ancho máximo
const Column = styled.div`
  max-width: 300px;
`;

// Título de cada columna
const Title = styled.h4`
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: #f5c518;
  font-weight: 600;
`;

// Ítems dentro de cada columna
const Item = styled.p`
  font-size: 1rem;
  margin: 0.25rem 0;
  color: #ccc;
  line-height: 1.6;

  &:last-child {
    margin-bottom: 0;
  }
`;

// Texto legal del pie de página
const Copy = styled.div`
  font-size: 0.95rem;
  color: #888;
  text-align: center;
`;
