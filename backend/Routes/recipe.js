const express = require("express");
const {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  editRecipe,
  deleteRecipe,
} = require("../controller/recipe");
const router = express.Router();

router.get("/", getAllRecipes);
router.get("/:id", getRecipeById);
router.post("/", addRecipe);
router.put("/:id", editRecipe);
router.delete("/:id", deleteRecipe);

module.exports = router;
