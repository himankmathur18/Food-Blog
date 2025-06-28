const express = require("express");
const {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload
} = require("../controller/recipe");
const verifyToken = require("../middleware/auth")
const router = express.Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/",upload.single('file'),verifyToken,addRecipe);
router.put("/:id", editRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;