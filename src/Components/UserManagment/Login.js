import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import validation from "./LoginValidation";

function Login({ onAuthenticate }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validation(values));
    if (errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:3000/login", values)
        .then((res) => {
          if (res.data === "Success") {
            onAuthenticate();
            navigate("/Home"); // navigate to Menu2 component
          } else {
            alert("No record existed");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-25 shadow">
        <h1 className="text-center font-weight-bold">Login</h1>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Please enter your email"
              name="email"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Please enter your password"
              name="password"
              onChange={handleInput}
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger">{errors.password}</span>
            )}
          </div>

          <button type="submit" className="btn btn-success w-100">
            <strong>Login</strong>
          </button>

          <button
            className="btn btn-default border w-100"
            onClick={handleSignup}
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
