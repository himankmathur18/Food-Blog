const Recipe = require("../model/recipe");

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    return res.json(recipes);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error fetching recipes", error: err.message });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    res.json(recipe);
  } catch (err) {
    return res.status(500).json({ message: "Error fetching recipe", error: err.message });
  }
};

const addRecipe = async (req, res) => {
  const { title, ingredients, instructions, time, coverImage } = req.body;

  if (!title || !ingredients || !instructions) {
    return res
      .status(400)
      .json({ message: "Required fields must not be empty!" });
  }

  const newRecipe = await Recipe.create({
    title,
    ingredients,
    instructions,
    time,
    coverImage,
  });

  return res.status(201).json(newRecipe);
};

const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time, coverImage } = req.body;
  try {
    let recipe = await Recipe.findById(req.params.id);
    if (recipe) {
      const updatedRecipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        { title, ingredients, instructions, time, coverImage },
        { new: true }
      );
      return res.json(updatedRecipe);
    } else {
      return res.status(404).json({ message: "Recipe not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Error updating recipe", error: err.message });
  }
};

// You need to define deleteRecipe or remove it from exports if not implemented
const deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    return res.json({ message: "Recipe deleted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Error deleting recipe", error: err.message });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  editRecipe,
  deleteRecipe,
};