/**
 * Selecciona todos los posts de la base de datos.
 *
 * @function selectAll
 * @returns {Promise<Object[]>} - Una promesa que resuelve con una lista de todos los posts.
 */
const selectAll = () => {
  return db.query("select * from posts");
};

/**
 * Selecciona un post por su ID de la base de datos.
 *
 * @function selectById
 * @param {number} post_id - El ID del post a buscar.
 * @returns {Promise<Object[]>} - Una promesa que resuelve con el post correspondiente al ID.
 */
const selectById = (post_id) => {
  return db.query("select * from posts where id = ?", [post_id]);
};

const selectSetCategorias = () => {
  return db.query(`
    SELECT COLUMN_TYPE
    FROM information_schema.COLUMNS
    WHERE TABLE_NAME = 'posts'
    AND COLUMN_NAME = 'categoria';`)
}

/**
 * Inserta un nuevo post en la base de datos.
 *
 * @function insertNew
 * @param {Object} post - El objeto que contiene los datos del post.
 * @param {string} post.titulo - El nombre del post.
 * @param {string} post.descripcion - El correo electrónico del post.
 * @param {string} post.categoria - La categoria del post.
 * @param {number} post.autores_id - El id del autor.
 * @returns {Promise<Object>} - Una promesa que resuelve con el resultado de la inserción.
 */
const insertNew = ({ nombre, email, imagen }) => {
  return db.query("insert into posts (nombre, email, imagen) values(?,?,?)", [
    nombre,
    email,
    imagen,
  ]);
};

/**
 * Actualiza un post por su ID en la base de datos.
 *
 * @function updateById
 * @param {number} post_id - El ID del post a actualizar.
 * @param {Object} post - El objeto que contiene los nuevos datos del post.
 * @param {string} post.nombre - El nuevo nombre del post.
 * @param {string} post.email - El nuevo correo electrónico del post.
 * @param {string} post.imagen - La nueva URL de la imagen del post.
 * @returns {Promise<Object>} - Una promesa que resuelve con el resultado de la actualización.
 */
const updateById = (post_id, { nombre, email, imagen }) => {
  return db.query(
    "update posts set nombre = ?, email = ?, imagen = ? where id = ?",
    [nombre, email, imagen, post_id]
  );
};

/**
 * Elimina un post por su ID de la base de datos.
 *
 * @function deleteById
 * @param {number} post_id - El ID del post a eliminar.
 * @returns {Promise<Object>} - Una promesa que resuelve con el resultado de la eliminación.
 */
const deleteById = (post_id) => {
  return db.query("delete from posts where id = ?", [post_id]);
};

module.exports = {
  selectAll,
  selectById,
  selectSetCategorias,
  insertNew,
  updateById,
  deleteById
};
