// src/api/utils/slugify.js

const slugify = (str) =>
  str
    .toString()
    .toLowerCase()
    .normalize("NFD") // quita tildes
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-") // espacios → guiones
    .replace(/[^\w-]+/g, "") // remueve caracteres raros
    .replace(/--+/g, "-") // guiones dobles
    .replace(/^-+|-+$/g, ""); // guiones al principio o fin

export default slugify;
