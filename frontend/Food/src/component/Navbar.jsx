import { useState, useEffect } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(!token);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    setIsLogin(!localStorage.getItem("token"));
  }, []);

  const checkLogin = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <header>
        <h2>Food Blog</h2>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink
              to={!isLogin ? "/Recipe" : "#"}
              onClick={(e) => {
                if (isLogin) {
                  e.preventDefault();
                  setIsOpen(true);
                }
              }}
            >
              Recipes
            </NavLink>
          </li>
          <li>
            <NavLink
              to={!isLogin ? "/favRecipe" : "#"}
              onClick={(e) => {
                if (isLogin) {
                  e.preventDefault();
                  setIsOpen(true);
                }
              }}
            >
              Favorite
            </NavLink>
          </li>
          <li>
            <button onClick={checkLogin} className="login">
              {isLogin ? "Login" : "Logout"} {user?.email ? user?.email :""}
            </button>
          </li>
        </ul>
      </header>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <InputForm />
        </Modal>
      )}
    </>
  );
}
