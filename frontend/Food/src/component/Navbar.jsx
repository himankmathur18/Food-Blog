import { useState } from "react";
import { useEffect } from "react";
import Modal from "./Modal";
import InputForm from "./InputForm";
import { NavLink } from "react-router-dom";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);

  useEffect(()=>{
setIsLogin(token ? false : true)
  },[token])

  const checkLogin = () => {
    if(token){
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      setIsLogin(true)
    }
    else{
      setIsOpen(true)
    }
  };
  return (
    <>
      <header>
        <h2>Food Blog</h2>
        <ul>
          <a>
            <NavLink to="/">Home</NavLink>
          </a>
          <a onClick={()=>isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? "/Recipe": "/"}>Recipes</NavLink>
          </a>
          <a onClick={()=>isLogin && setIsOpen(true)}>
            <NavLink to={!isLogin ? "/favRecipe" : "/"}>Favorite</NavLink>
          </a>
          <a onClick={checkLogin}>
            <p className="login">{(isLogin)? "Login" : "Logout"}</p>
          </a>
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
