const router = require('express').Router();

const {
  getAllAutores,
  getAutorById,
  createAutor,
  updateAutorById,
  deleteAutorById
} = require("../../controllers/autores.controller");

router.get ("/", getAllAutores)
router.get ("/:autor_id", getAutorById)
router.post ("/", createAutor)
router.put ("/:autor_id", updateAutorById)
router.delete ("/:autor_id", deleteAutorById)

module.exports = router;