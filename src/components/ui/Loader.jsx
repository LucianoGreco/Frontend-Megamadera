// Loader.jsx
// Componente visual de carga con animación de giro simple y estilizada

import styled, { keyframes } from 'styled-components'; // Importa estilos y soporte para animaciones

// Animación de giro: rota 360 grados continuamente
const spin = keyframes`
  to { transform: rotate(360deg); } // De 0° a 360°
`;

// Estilo del spinner: círculo con borde superior más oscuro que gira
const Spinner = styled.div`
  margin: 2rem auto;                  // Centrado en su contenedor
  border: 4px solid #eee;             // Borde gris claro (parte fija)
  border-top: 4px solid #333;         // Parte superior (resalta el giro)
  border-radius: 50%;                 // Círculo perfecto
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite; // Aplica animación de giro continuo
`;

// Componente funcional que devuelve el spinner
const Loader = () => <Spinner />;

export default Loader;
