// Normaliza un nodo del árbol: asegura estructura consistente y recursiva
function normalizeNode(node) {
  return {
    id: node.id,                 // Mantiene el ID
    nombre: node.nombre,         // Mantiene el nombre
    imagenes: node.imagenes,     // Mantiene las imágenes (si las tiene)
    children: Array.isArray(node.children)
      ? node.children.map(normalizeNode) // Normaliza recursivamente los hijos
      : [],                               // Si no hay hijos, deja array vacío
  };
}

// Normaliza un árbol completo (puede ser raíz única o un array de raíces)
export function normalizeTree(tree) {
  if (!tree) return []; // Si no hay árbol, devuelve array vacío

  // Si es un array de nodos, los normaliza todos; si es uno solo, lo normaliza directo
  return Array.isArray(tree) ? tree.map(normalizeNode) : normalizeNode(tree);
}

// Aliases con nombres en español para compatibilidad o legibilidad
export const normalizarArbol = normalizeTree;
export const normalizarDatos = normalizeTree;
