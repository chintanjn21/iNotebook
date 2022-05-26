import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const port = process.env.PORT || 5000;
const Login = (props) => {
  const {showAlert} = props;

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //API Call
    let url = process.env.REACT_APP_LOGINUSER_URL;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    
    if (json.success === true) {
      //Save the authtoken and redirect
      localStorage.setItem("token", json.authToken);
      showAlert("Loggedin successfully", "success");
      navigate("/");
    } else {
      showAlert("Invalid credentials", "danger");
    }
  };
  return (
    <>
      <div
        className="d-flex justify-content-center"
        style={{ height: "90vh", alignItems: "center" }}
      >
        <form onSubmit={handleSubmit}>
          <div
            className="text-center mb-2"
            style={{ color: "rebeccapurple", fontSize: "2.7rem" }}
          >
            <i className="fa-solid fa-book-bookmark" /> iNotebook
          </div>
          <div
            className="font-weight-bold"
            style={{
              backgroundColor: "black",
              width: "6rem",
              height: "0.1rem",
              margin: "0 auto",
            }}
          ></div>
          <div className="mb-3 mt-5">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              style={{ fontSize: "x-large", fontWeight: "500", color: "brown" }}
            >
              <i
                className="fa-solid fa-envelope mx-2"
                style={{ color: "#484747" }}
              />
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              aria-describedby="emailHelp"
              style={{ borderColor: "black", width: "25vw" }}
              onChange={onChange}
            />
            <div
              id="emailHelp"
              className="form-text"
              style={{ color: "black" }}
            >
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              style={{ fontSize: "x-large", fontWeight: "500", color: "brown" }}
            >
              <i
                className="fa-solid fa-key mx-2"
                style={{ color: "#484747" }}
              />
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentials.password}
              style={{ borderColor: "black", width: "25vw" }}
              onChange={onChange}
            />
          </div>
          <button
            type="submit"
            className="btn"
            style={{
              color: "black",
              backgroundColor: "mediumpurple",
              borderColor: "black",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
