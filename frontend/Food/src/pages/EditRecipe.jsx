import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      await axios.get(`http://localhost:5000/recipe/${id}`).then((response) => {
        let res = response.data;
        setRecipeData({
          title: res.title,
          ingredients: res.ingredients.join(","),
          instructions: res.instructions,
          time: res.time,
        });
      });
    };
    getData();
  }, [])

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

  const formData = new FormData();
  formData.append("title", recipeData.title);
  formData.append("ingredients", recipeData.ingredients);
  formData.append("instructions", recipeData.instructions);
  formData.append("time", recipeData.time);
  
  if (recipeData.coverImage) {
    formData.append("file", recipeData.coverImage);
  }

  try {
    await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: "bearer " + localStorage.getItem("token"),
      },
    });
    navigate("/myRecipe");
  } catch (error) {
    console.error(error);
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
          <button type="submit">Edit Recipe</button>
        </form>
      </div>
    </>
  );
}
