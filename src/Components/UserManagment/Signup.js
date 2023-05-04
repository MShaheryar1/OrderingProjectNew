import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import validation from "./SignupValidation";
import axios from "axios";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors(validation(values));
  }, [values]);

  const HandleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (errors.name === "" && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:3000/signup", values)
        .then((response) => {
          if (response.data.error) {
            console.log(response.data);
            // handle error here
          } else {
            console.log(response.data);
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleLoginClick = () => {
    console.log("login clicked");
    navigate("/login");
  };

  return (
    <div
      className="d-flex justify-content-center-align-items-center bg-priamry vh-100"
      style={{ marginTop: "100px", marginLeft: "300px" }}
    >
      <div className="bg- white p-3 rounded w-25">
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              {" "}
              <strong>Name</strong>
            </label>
            <input
              type="name"
              placeholder="Please enter your name"
              name="name"
              onChange={HandleInput}
              className="form-control rounded-0"
            />

            {errors.name && <span className="text-danger">{errors.name}</span>}
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              {" "}
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Please enter your email"
              name="email"
              onChange={HandleInput}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              {" "}
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Please enter your password"
              name="password"
              onChange={HandleInput}
              className="form-control rounded-0"
            />

            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100">
            <strong>Signup</strong>
          </button>

          <button
            className="btn btn-default border w-100"
            onClick={handleLoginClick}
          >
            Login here
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
