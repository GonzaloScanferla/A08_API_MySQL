const router = require('express').Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostById,
  deletePostById,
  getPostsByAutorId,
} = require("../../controllers/posts.controller");

router.get("/", getAllPosts);
router.get("/:post_id", getPostById);
router.get("/autor/:autor_id", getPostsByAutorId);
router.post("/", createPost);
router.put("/:post_id", updatePostById);
router.delete("/:post_id", deletePostById);


module.exports = router;