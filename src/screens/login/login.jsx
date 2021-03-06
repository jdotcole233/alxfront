import React, { useState } from "react";
import "./login.css";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const history = useHistory();
  const { setUser } = useAuth();
  const { register, handleSubmit } = useForm();
  const [hasErrors, setHasErrors] = useState("");

  const submitFormData = (values) => {
    axios
      .post("/signing_in", { ...values })
      .then((res) => {
        // alert(" Hello success")
        setUser(res.data.user);
        history.push({ pathname: "/home" });
      })
      .catch((err) => {
        if (err && err.response) {
          setHasErrors(err?.response?.data?.message)
        }
      });
  };

  return (
    <div className="login_screen">
      <p>Sign In</p>
      <div>
        <div>{hasErrors && <p>{hasErrors}</p>}</div>
        <form onSubmit={handleSubmit(submitFormData)}>
          <input
            type="text"
            ref={register({ required: "Required" })}
            name="email"
            placeholder="User Name"
          />
          <input
            type="password"
            ref={register({ required: "Required" })}
            name="password"
            placeholder="Enter Password"
          />
          <input type="submit" onClick={submitFormData} value="Sign In" />
        </form>
      </div>
      <p>Click on Sign Up if you don't have an account</p>
    </div>
  );
}

export default Login;
