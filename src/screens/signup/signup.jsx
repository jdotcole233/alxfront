import React, { useRef } from "react";
import "./signup.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const { register, errors, handleSubmit, watch } = useForm();
  const { setUser } = useAuth();
  const password = useRef();
  const history = useHistory();
  password.current = watch("password", "");

  const onSubmit = (values) => {
    const name = `${values.first_name} ${values.last_name}`;
    delete values.first_name;
    delete values.last_name;
    const data = { ...values, name };
    axios
      .post("/registration", { ...data })
      .then((res) => {
        setUser(res.data.user);
        history.push({ pathname: "/home" });
      })
      .catch((err) => {
        alert("Error");
      });
  };

  return (
    <div className="signup_screen">
      <p>Sign Up</p>
      <div className="row">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="first_name"
              ref={register({ required: "Required" })}
              placeholder="First Name"
            />
            {errors.first_name && <p>{errors.first_name.message}</p>}
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="text"
              name="last_name"
              ref={register({ required: "Required" })}
              placeholder="Last Name"
            />
            {errors.last_name && <p>{errors.last_name.message}</p>}
          </div>

          <div className="form-group">
            <input
              className="form-control"
              type="Password"
              name="password"
              ref={register({ required: "Required" })}
              placeholder="Enter Password"
            />
            {errors.password && <p>{errors.password.message}</p>}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              name="password_confirmation"
              ref={register({
                required: "Required",
                validate: (value) => {
                  return value === password.current || "Passwords do not match";
                },
              })}
              placeholder="Confirm Password"
            />
            {errors.password_confirmation && (
              <p>{errors.password_confirmation.message}</p>
            )}
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="Email"
              name="email"
              ref={register({ required: "Required" })}
              placeholder="Email Address"
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div className="submt form-group">
            <input
              className=" form-control text-white "
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>
      </div>
      <p>Click on Sign In if you already have an account</p>
    </div>
  );
}

export default Signup;
