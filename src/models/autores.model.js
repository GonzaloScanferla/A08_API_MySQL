/**
 * Selecciona todos los autores de la base de datos.
 *
 * @function selectAll
 * @returns {Promise<Object[]>} - Una promesa que resuelve con una lista de todos los autores.
 */
const selectAll = () => {
  return db.query("select * from autores");
};

/**
 * Selecciona un autor por su ID de la base de datos.
 * 
 * @function selectById
 * @param {number} autor_id - El ID del autor a buscar.
 * @returns {Promise<Object[]>} - Una promesa que resuelve con el autor correspondiente al ID.
 */
const selectById = (autor_id) => {
  return db.query("select * from autores where id = ?", [autor_id]);
};


/**
 * Inserta un nuevo autor en la base de datos.
 * 
 * @function insertNew
 * @param {Object} autor - El objeto que contiene los datos del autor.
 * @param {string} autor.nombre - El nombre del autor.
 * @param {string} autor.email - El correo electrónico del autor.
 * @param {string} autor.imagen - La URL de la imagen del autor.
 * @returns {Promise<Object>} - Una promesa que resuelve con el resultado de la inserción.
 */
const insertNew = ({ nombre, email, imagen }) => {
  return db.query("insert into autores (nombre, email, imagen) values(?,?,?)", [
    nombre,
    email,
    imagen,
  ]);
};


/**
 * Actualiza un autor por su ID en la base de datos.
 * 
 * @function updateById
 * @param {number} autor_id - El ID del autor a actualizar.
 * @param {Object} autor - El objeto que contiene los nuevos datos del autor.
 * @param {string} autor.nombre - El nuevo nombre del autor.
 * @param {string} autor.email - El nuevo correo electrónico del autor.
 * @param {string} autor.imagen - La nueva URL de la imagen del autor.
 * @returns {Promise<Object>} - Una promesa que resuelve con el resultado de la actualización.
 */
const updateById = (autor_id, { nombre, email, imagen }) => {
  return db.query(
    "update autores set nombre = ?, email = ?, imagen = ? where id = ?",
    [nombre, email, imagen, autor_id]
  );
};

/**
 * Elimina un autor por su ID de la base de datos.
 * 
 * @function deleteById
 * @param {number} autor_id - El ID del autor a eliminar.
 * @returns {Promise<Object>} - Una promesa que resuelve con el resultado de la eliminación.
 */
const deleteById = (autor_id) => {
  return db.query("delete from autores where id = ?", [autor_id]);
};

module.exports = {
  selectAll,
  selectById,
  insertNew,
  updateById,
  deleteById,
};
