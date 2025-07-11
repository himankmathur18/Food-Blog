import { useState } from "react";
import axios from "axios";
export default function InputForm({ setIsOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
const [error,setError] = useState("")
  const handleOnSubmit = async (e) => {
    e.preventDefault();
  let endpoint = isSignUp ? "signUp" : "login";
    await axios.post(`http://localhost:5000/${endpoint}`, { email, password })
    .then((res)=>{
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      setIsOpen()
    })
    .catch(data=> setError(data.response?.data?.error))
  };

  return (
    <>
      <form className="form" onSubmit={handleOnSubmit}>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">{isSignUp ? "Sign Up" : "Login"}</button>
        {(error!= "") && <h6 className="error">{error}</h6>}
        <p onClick={() => setIsSignUp((pre) => !pre)}>
          {isSignUp ? "Already have an account" : "Create new account"}
        </p>
      </form>
    </>
  );
}
