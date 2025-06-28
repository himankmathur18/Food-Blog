// import React from "react";
import { useState } from "react";
import { Recipeitems } from "../component/Recipeitems";
import { useNavigate } from "react-router-dom";
import Modal from '../component/Modal'
import InputForm from "../component/InputForm";

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState();
  const addRecipe = () => {
    let token = localStorage.getItem("token");
    if (token) navigate("/addRecipe");
    else {
      setIsOpen(true);
    }
  };
  return (
    <>
      <section className="Home">
        <div className="left">
          <h1>Food recipe</h1>
          <p>
            Welcome to our food haven! Today, we’re diving into a cozy bowl of
            creamy garlic mushroom pasta a quick, satisfying, and perfect for
            weeknight dinners. Made with fresh mushrooms, butter, garlic, cream,
            and parmesan, this dish is a hug in a bowl. For dessert, we whipped
            up lava mug cakes in just 2 minutes using a microwave - gooey,
            chocolatey bliss with every bite. Stay tuned as we explore more
            easy-to-make recipes using everyday ingredients that bring joy to
            your table.
          </p>
          <button onClick={addRecipe}>Share your recipe</button>
        </div>
        <div className="right">
          <img
            src="https://imgs.search.brave.com/DNiTvy2EXkrAN639aRedkAXaqJyrb1WH3nNAKLB_RBI/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2xhcmdlLXByZXZp/ZXdzLzY5Ni9kZWxp/Y2lvdXMtZmVzdGl2/ZS1mZWFzdC0wNDEw/LTU3MDI2MTIuanBn/P2ZtdA"
            alt=""
            width="320px"
            height="300px"
          />
        </div>
      </section>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm setIsOpen={() => setIsOpen(false)} />
        </Modal>
      )}
      <div className="recipe">
        <Recipeitems />
      </div>
    </>
  );
}
