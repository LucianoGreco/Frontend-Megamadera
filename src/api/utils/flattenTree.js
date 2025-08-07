// src/utils/flattenTree.js

// Convierte un árbol en una lista lineal con el path completo de cada nodo
export function flattenTree(node, path = []) {
  let result = []; // Lista donde se acumulan los nodos
  const currentPath = [...path, node.nombre]; // Path actual (padres + este nodo)

  // Agrega el nodo actual con su path
  result.push({ ...node, path: currentPath });

  // Si tiene hijos, aplana cada uno y los concatena al resultado
  if (node.children && node.children.length > 0) {
    for (const child of node.children) {
      result = result.concat(flattenTree(child, currentPath));
    }
  }

  return result; // Devuelve la lista final
}
