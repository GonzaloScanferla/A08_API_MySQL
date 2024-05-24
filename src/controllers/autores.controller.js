const Autores = require("../models/autores.model");

/**
 * Obtiene todos los autores de la base de datos.
 *
 * @function getAllAutores
 * @param {Object} req - El objeto de solicitud HTTP.
 *
 * @returns {Array<object>} - Devuelve un JSON con un array que contiene todos los autores.
 */
const getAllAutores = async (req, res, next) => {
  try {
    const [result] = await Autores.selectAll();

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Obtiene un autor por su ID de la base de datos.
 *
 * @function getAutorById
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {number} req.params.autor_id - El ID del autor a buscar en los parámetros de la solicitud.
 * @returns {Object} - Devuelve un JSON que contiene el autor solicitado.
 */
const getAutorById = async (req, res, next) => {
  try {
    const [result] = await Autores.selectById(req.params.autor_id);

    if (result.length === 0) {
      return res.status(404).json({ error: "Id de autor inexistente" });
    }

    return res.json(result);
  } catch (error) {
    next(error);
  }
};

/**
 * Crea un nuevo autor en la base de datos.
 *
 * @function createAutor
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {Object} req.body - El cuerpo de la solicitud, que contiene los datos del autor.
 * @returns {Object} - Devuelve un JSON que contiene el nuevo autor.
 */
const createAutor = async (req, res, next) => {
  // Verifica si el email existe en BBDD
  const email = req.body.email;
  const [emailExists] = await Autores.selectByEmail(email);
  if (emailExists.length !== 0)
    return res.status(400).json({
      error:
        "El email seleccionado ya está registrado en nuestra base de datos",
    });

  try {
    const [result] = await Autores.insertNew(req.body);

    if (result.affectedRows === 0) {
      return res
        .status(500)
        .json({ error: "Ha ocurrido un error inesperado durante la creación" });
    }
    const [[newUser]] = await Autores.selectById(result.insertId);
    return res.json(newUser);
  } catch (error) {
    next(error);
  }
};

/**
 * Actualiza un autor por su ID en la base de datos.
 *
 * @function updateAutorById
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {number} req.params.autor_id - El ID del autor a actualizar en los parámetros de la solicitud.
 * @param {Object} req.body - El cuerpo de la solicitud, que contiene los nuevos datos del autor.
 * @returns {Object} - Devuelve un JSON que contiene el autor actualizado.
 */
const updateAutorById = async (req, res, next) => {
  try {
    const autor_id = req.params.autor_id;

    const [result] = await Autores.updateById(autor_id, req.body);

    if (result.affectedRows === 0) {
      return res
        .status(400)
        .json({ error: "Se ha producido un error al actualizar" });
    }

    const [[updatedUser]] = await Autores.selectById(req.params.autor_id);
    return res.json(updatedUser);
  } catch (error) {
    if (error.errno === 1062) return res
      .status(400)
      .json({
        error:
          "El email seleccionado ya está registrado en nuestra base de datos",
      });
    next(error);
  }
};

/**
 * Elimina un autor por su ID de la base de datos.
 *
 * @function deleteAutorById
 * @param {Object} req - El objeto de solicitud HTTP.
 * @param {number} req.params.autor_id - El ID del autor a actualizar en los parámetros de la solicitud.
 * @returns {Object} - Devuelve un JSON que contiene un mensaje de éxito o un error.
 */
const deleteAutorById = async (req, res, next) => {
  try {
    const autor_id = req.params.autor_id;

    const [result] = await Autores.deleteById(autor_id);

    if (result.affectedRows === 1) {
      return res.json({ message: `Autor ${autor_id} borrado correctamente` });
    }

    return res.status(404).json({ error: "Id de autor inexistente" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAutores,
  getAutorById,
  createAutor,
  updateAutorById,
  deleteAutorById,
};
