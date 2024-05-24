const Posts = require("../models/posts.model");

/**
 * Verifica si la categoría es válida consultando las categorías permitidas en la base de datos.
 * 
 * @async
 * @function checkCategoria
 * @param {string} categoria - La categoría a verificar.
 * @returns {Promise<void>} - Devuelve una promesa que se resuelve si la categoría es válida o lanza un error si no lo es.
 * @throws {Error} - Lanza un error si la categoría no existe en la base de datos.
 */
const checkCategoria = async (categoria) => {

  const [[{ COLUMN_TYPE: categorias_str }]] = await Posts.selectSetCategorias();
  // Convierte el string devuelto por la BBDD en un array de categorías 
  const categorias = categorias_str.slice(5, -2).split("','");

  if (!categorias.includes(categoria)) {
    throw new Error(`La categoría no existe en BBDD. Las categorías admitidas son ${categorias}`)
  }
  
};

module.exports = {
  checkCategoria,
};
