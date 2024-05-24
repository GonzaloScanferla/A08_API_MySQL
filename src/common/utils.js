const Posts = require("../models/posts.model");

const checkCategoria = async (categoria) => {
  const [[categorias_obj]] = await Posts.selectSetCategorias();
  const categorias_str = categorias_obj["COLUMN_TYPE"];
  const categorias = categorias_str.slice(5, -2).split("','");
  if (!categorias.includes(categoria)) {
    throw new Error(`La categoría no existe en BBDD. Las categorías admitidas son ${categorias}`)
  }
};

module.exports = {
  checkCategoria,
};
