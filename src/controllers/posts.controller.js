const Posts = require("../models/posts.model");
const Autores = require ('../models/autores.model')
const { checkCategoria } = require('../common/utils')

/**
 * Obtiene todos los posts de la base de datos.
 *
 * @function getAllPosts
 * @param {Object} req - El objeto de solicitud HTTP.
 *
 * @returns {Array<array>} - Devuelve un JSON con un array de arrays. Cada elemento contiene la la información del post y del autor.
 */
const getAllPosts = async (req, res, next) => {
  try {
    const [posts] = await Posts.selectAll();

    // Obtiene los autores de cada post y los añade a la respuesta
    const result = []
    for (let post of posts) {
      const autor_id = post.autores_id;
      const [[autor]] = await Autores.selectById(autor_id);
      result.push ([post,autor])
    }

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
 * @returns {Array<object>} - Devuelve un JSON que contiene un array con el post solicitado y el autor.
 */
const getPostById = async (req, res, next) => {
  try {
    const [postResult] = await Posts.selectById(req.params.post_id);

    if (postResult.length === 0) {
      return res.status(404).json({ error: "Id de post inexistente" });
    }
    const post = postResult[0]

    // recupera el autor del post y obtiene su información para añadirla a la respueusta
    const autor_id = postResult[0].autores_id
    const [[autor]] = await Autores.selectById(autor_id)
    
    const result = [post, autor]

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Recupera todos los posts de un autor específico.
 * 
 * @function getPostsByAutorId
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {number} req.params.autor_id - El ID del autor.
 * @returns {Promise<void>} - Devuelve una promesa que resuelve con una respuesta JSON que contiene los posts del autor.
 */
const getPostsByAutorId = async (req, res, next) => {
  try {
    const [result] = await Posts.selectByAutorId(req.params.autor_id)
    if (result.length === 0) return res.status(404).json ({error: "No hay ningún post del autor especificado"})
    res.json (result)
  } catch (error) {
    next (error)
  }
}


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
  
  // verifica que la categoría existe en el set definido en BBDD 
  try {
    await checkCategoria(categoria)
  } catch (error) {
    res.status(400).send(error.message)
  }
  
  try {
    const [result] = await Posts.insertNew(req.body);

    if (result.affectedRows === 0) {
      return res
        .status(500)
        .json({ error: "Ha ocurrido un error inesperado durante la creación" });
    }
    const [[newPost]] = await Posts.selectById(result.insertId);
    return res.json(newPost);
  } catch (error) {
    next(error);
  }
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
    const post_id = req.params.post_id;

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
    const post_id  = req.params.post_id;

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
  getPostsByAutorId,
  createPost,
  updatePostById,
  deletePostById,
};
