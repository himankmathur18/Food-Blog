import React from "react";
import { useLoaderData } from "react-router-dom";
import { FaStopwatch } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
export const Recipeitems = () => {
  const allRecipes = useLoaderData();
  return (
    <>
      <div className="card-container">
        {allRecipes?.map((item, index) => (
          <div key={index} className="card">
            <img
              src={`http://localhost:5000/images/${item.coverImage}`}
              width="120px"
              height="100px"
              alt={item.title}
              className="card-img"
            />
            <div className="card-body">
              <div className="title">{item.title}</div>
              <div className="time">
                {item.time}
                <FaStopwatch />
              </div>
              <FaHeart />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
