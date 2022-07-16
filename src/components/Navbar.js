import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  let location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    navigate("/login");
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {!localStorage.getItem("token") ? (
            <form className="d-flex">
              <Link
                className="btn mx-1"
                to="/login"
                role="button"
                style={{
                  color: "black",
                  backgroundColor: "mediumpurple",
                  border: "none",
                }}
              >
                Login
              </Link>
              <Link
                className="btn mx-1"
                to="/signup"
                role="button"
                style={{
                  color: "black",
                  backgroundColor: "mediumpurple",
                  border: "none",
                }}
              >
                Signup
              </Link>
            </form>
          ) : (
            <form>
              <button
                className="btn mx-1"
                style={{
                  color: "black",
                  backgroundColor: "mediumpurple",
                  border: "none",
                }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </form>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
