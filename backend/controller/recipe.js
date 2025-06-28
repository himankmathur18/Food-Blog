const Recipe = require("../model/recipe");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const imagePath = path.resolve(__dirname, "..", "public", "images");

if (!fs.existsSync(imagePath)) {
  fs.mkdirSync(imagePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imagePath);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + "-" + file.fieldname;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage });

const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find();
  return res.json(recipes);
};

const getRecipeById = async (req, res) => {
  const recipe = await Recipe.findById(req.params.id);
  res.json(recipe);
};

const addRecipe = async (req, res) => {
  try {
    console.log(req.user);
    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
      res.json({ message: "Required fields can't be empty" });
    }

    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      time,
      coverImage: req.file.filename,
      createdBy: req.user.id,
    });
    return res.json({ newRecipe, message: "recipe created successfully" });
  } catch (error) {
    console.log("add ma error: ", error);
  }
};

const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body;
  let recipe = await Recipes.findById(req.params.id);

  try {
    if (recipe) {
      let coverImage = req.file?.filename
        ? req.file?.filename
        : recipe.coverImage;
      await Recipes.findByIdAndUpdate(
        req.params.id,
        { ...req.body, coverImage },
        { new: true }
      );
      res.json({ title, ingredients, instructions, time });
    }
  } catch (err) {
    return res.status(404).json({ message: err });
  }
};
const deleteRecipe = async (req, res) => {
  try {
    await Recipes.deleteOne({ _id: req.params.id });
    res.json({ status: "ok" });
  } catch (err) {
    return res.status(400).json({ message: "error" });
  }
};

module.exports = {
  getAllRecipes,
  getRecipeById,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload,
};
