// src/utils/validatePath.js

// Verifica si un path (array de nombres) existe dentro del árbol
export function validatePath(tree, pathArray) {
  let node = tree; // Empieza desde la raíz del árbol

  for (const segment of pathArray) {
    // Si el nodo actual no tiene hijos, el path es inválido
    if (!node.children) return false;

    // Busca el hijo cuyo nombre coincida con el segmento actual
    node = node.children.find(child => child.nombre === segment);

    // Si no lo encuentra, el path es inválido
    if (!node) return false;
  }

  // Si recorre todos los segmentos sin fallar, el path es válido
  return true;
}
