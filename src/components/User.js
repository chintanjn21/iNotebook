import React, { useEffect, useContext, useState,  } from "react";
import noteContext from "../context/notes/noteContext";

const User = () => {
  const context = useContext(noteContext);
  const { getuser } = context;

  useEffect(()=>{
    getuser();
    // eslint-disable-next-line
  },[]);

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{
        height: "100vh",
        fontFamily: "Poppins, sans-serif",
        fonWeight: "300",
      }}
    >
      <div
        className="card"
        style={{
          width: "380px",
          borderWidth: "2px",
          borderRadius: "15px",
          padding: "8px",
          backgroundColor: "#fff",
          position: "relative",
        }}
      >
        <div className="upper" style={{ height: "100px" }}>
        </div>

        <div className="user text-center" style={{ position: "relative" }}>
          <div
            className="profile"
            style={{
              position: "absolute",
              top: "-50px",
              left: "38%",
              height: "90px",
              width: "90px",
              border: "3px solid #fff",
              borderRadius: "50%",
            }}
          >
            <img
              src="https://icon-library.com/images/user-icon-jpg/user-icon-jpg-5.jpg"
              className="rounded-circle"
              width="80"
              style={{ height: "80px", width: "80px", MarginTop: "2px" }}
              alt="Profile"
            />
          </div>
        </div>
        <div className="mt-5 text-center">
          <h4 className="mb-0">{localStorage.getItem('name')}</h4>
          {console.log(localStorage.getItem('name'))}
          {console.log(localStorage.getItem('name'))}
          <span className="text-muted d-block mb-2">{localStorage.getItem('email')}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
