import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;
    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipeData);
    try {
      await axios
        .post("http://localhost:5000/recipe", recipeData, {
          headers: {
            "Content-Type": "multipart/form-data", 
            authorization: "bearer " + localStorage.getItem("token"),
          },
        })
        .then(() => navigate("/"));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <form className="form" onSubmit={onHandleSubmit}>
          <div className="form-control">
            <input
              type="text"
              className="input"
              placeholder="title"
              name="title"
              value={recipeData.title}
              onChange={onHandleChange}
            ></input>
          </div>
          <div className="form-control">
            <input
              type="text"
              className="input"
              placeholder="time"
              name="time"
              value={recipeData.time}
              onChange={onHandleChange}
            ></input>
          </div>
          <div className="form-control">
            <textarea
              type="text"
              className="input-textarea"
              placeholder="ingredients"
              name="ingredients"
              value={recipeData.ingredients}
              rows="5"
              onChange={onHandleChange}
            ></textarea>
          </div>
          <div className="form-control">
            <textarea
              type="text"
              className="input-textarea"
              placeholder="instructions"
              name="instructions"
              value={recipeData.instructions}
              rows="5"
              onChange={onHandleChange}
            ></textarea>
          </div>
          <div className="form-control">
            <label>Recipe Image</label>
            <input
              type="file"
              className="input"
              name="file"
              onChange={onHandleChange}
            ></input>
          </div>
          <button type="submit">Add Recipe</button>
        </form>
      </div>
    </>
  );
}
