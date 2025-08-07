// src/api/resources/productsApi.js

import { API_BASE, requestJSON } from '../apiClient'; // base URL y función para fetch con JSON
import { flattenTree } from '../utils/flattenTree';   // aplana árbol de productos
import { validatePath } from '../utils/validatePath'; // valida path en árbol

const BASE_URL = `${API_BASE}/products`;

// GET de productos por categoría
export async function getByCategory(category) {
  // Arma la URL codificando la categoría por si tiene caracteres especiales
  const url = `${BASE_URL}/${encodeURIComponent(category)}`;
  // Hace el request y espera el resultado en JSON
  const data = await requestJSON(url);
  // Devuelve los datos
  return data;
}

// Categorías predefinidas (shortcuts para no repetir strings)
export async function getHerrajes() {
  return getByCategory('herrajes');
}

export async function getMelaminas() {
  return getByCategory('melaminas');
}

export async function getRevestimientos() {
  return getByCategory('revestimientos');
}

export async function getMuebles() {
  return getByCategory('muebles');
}

export async function getVinilos() {
  return getByCategory('vinilos');
}

// Busca un nodo dentro del árbol usando un path como ['placares', 'moderno']
export async function getByPath(category, pathArray = []) {
  // Obtiene el árbol completo de la categoría
  const tree = await getByCategory(category);

  // Valida si el path es válido dentro del árbol
  if (!validatePath(tree, pathArray)) {
    throw new Error(`Path inválido: ${pathArray.join('/')}`);
  }

  // Navega el árbol según los segmentos del path
  let node = tree;
  for (const segment of pathArray) {
    // Busca el hijo que tenga el nombre igual al segmento
    node = node.children?.find(child => child.nombre === segment);
    if (!node) throw new Error(`Segmento no encontrado: ${segment}`);
  }

  // Devuelve el nodo encontrado
  return node;
}

// Devuelve todos los nodos del árbol como una lista aplanada
export async function listFlattened(category) {
  // Obtiene el árbol completo
  const tree = await getByCategory(category);
  // Lo aplana en una lista de nodos con path incluido
  return flattenTree(tree);
}

// Busca productos por nombre o código dentro de una categoría
export async function searchProducts(category, query) {
  // Aplana todo el árbol de productos
  const flat = await listFlattened(category);
  // Convierte la búsqueda a minúsculas
  const q = query.toLowerCase();
  // Filtra los productos cuyo nombre o código incluyan el texto
  return flat.filter(
    (item) =>
      item.nombre.toLowerCase().includes(q) ||
      item.codigo?.toLowerCase().includes(q)
  );
}

// 🔍 Buscar un producto o nodo por path completo (ej: "placard/sara/blanco")
export async function getByFullPath(category, path) {
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const url = `${BASE_URL}/${category}/${encodedPath}`;
  return requestJSON(url);
}
