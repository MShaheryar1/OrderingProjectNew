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

  const handleInput = (event) => {
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
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-3 rounded" style={{ maxWidth: "500px" }}>
        <h2 className="text-center mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="name"
              placeholder="Please enter your name"
              name="name"
              value={values.name}
              onChange={handleInput}
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Please enter your email"
              name="email"
              value={values.email}
              onChange={handleInput}
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Please enter your password"
              name="password"
              value={values.password}
              onChange={handleInput}
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100 mb-3">
            Signup
          </button>

          <div className="text-center">
            Already have an account?{" "}
            <button className="btn btn-link p-0" onClick={handleLoginClick}>
              Login here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
