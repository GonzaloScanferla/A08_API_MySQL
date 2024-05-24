const Posts = require("../models/posts.model");

const { checkCategoria } = require ('../common/utils')

/**
 * Obtiene todos los posts de la base de datos.
 *
 * @function getAllPosts
 * @param {Object} req - El objeto de solicitud HTTP.
 *
 * @returns {Array<object>} - Devuelve un JSON con un array que contiene todos los posts.
 */
const getAllPosts = async (req, res, next) => {
  try {
    const [result] = await Posts.selectAll();

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un post por su ID de la base de datos.
 *
 * @function getPostById
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {number} req.params.post_id - El ID del post a buscar en los parámetros de la solicitud.
 * @returns {Object} - Devuelve un JSON que contiene el post solicitado.
 */
const getPostById = async (req, res, next) => {
  try {
    const [result] = await Posts.selectById(req.params.post_id);

    if (result.length === 0) {
      return res.status(404).json({ error: "Id de post inexistente" });
    }

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Crea un nuevo post en la base de datos.
 *
 * @function createPost
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} req.body - El cuerpo de la solicitud, que contiene los datos del post.
 * @returns {Object} - Devuelve un JSON que contiene el nuevo post.
 */
const createPost = async (req, res, next) => {

  const { categoria } = req.body
  
  try {
    await checkCategoria(categoria)
    res.send("Todo bien")
  } catch (error) {
    res.status(400).send(error.message)
  }
  // if ( !response ) {
  //   return res.status(400).json({ error:  message})
  // }

  // try {
  //   const [result] = await Posts.insertNew(req.body);

  //   if (result.affectedRows === 0) {
  //     return res
  //       .status(500)
  //       .json({ error: "Ha ocurrido un error inesperado durante la creación" });
  //   }
  //   const [[newUser]] = await Posts.selectById(result.insertId);
  //   return res.json(newUser);
  // } catch (error) {
  //   // Gestión de error en caso de entrada duplicada
  //   if (error.errno === 1062) {
  //     console.log(error);
  //     return res
  //       .status(409)
  //       .json({ error: "El correo electrónico ya está en uso." });
  //   }
  //   next(error);
  // }
};

/**
 * Actualiza un post por su ID en la base de datos.
 *
 * @function updatePostById
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {number} req.params.post_id - El ID del post a actualizar en los parámetros de la solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud, que contiene los nuevos datos del post.
 * @returns {Object} - Devuelve un JSON que contiene el post actualizado.
 */
const updatePostById = async (req, res, next) => {
  try {
    const { post_id } = req.params.post_id;

    const [result] = await Posts.updateById(post_id, req.body);

    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ error: "Se ha producido un error al actualizar" });
    }

    const [[updatedUser]] = await Posts.selectById(req.params.post_id);
    return res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Elimina un post por su ID de la base de datos.
 *
 * @function deletePostById
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {number} req.params.post_id - El ID del post a actualizar en los parámetros de la solicitud.
 * @returns {Object} - Devuelve un JSON que contiene un mensaje de éxito o un error.
 */
const deletePostById = async (req, res, next) => {
  try {
    const { post_id } = req.params.post_id;

    const [result] = await Posts.deleteById(post_id);

    if (result.affectedRows === 1) {
      return res.json({ message: `Post ${post_id} borrado correctamente` });
    }

    return res.status(404).json({ error: "Id de post inexistente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
};
