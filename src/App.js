import "./App.css";
import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Notestate from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
// import User from "./components/User";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, type) => {
    setAlert({
      msg: msg,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
      <Notestate>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert}/>} />
              <Route excat path="/about" element={<About />} />
              <Route excat path="/login" element={<Login showAlert={showAlert}/>} />
              <Route excat path="/signup" element={<Signup showAlert={showAlert}/>} />
              {/* <Route excat path="/user" element={<User/>} /> */}
            </Routes>
          </div>
        </Router>
      </Notestate>
    </>
  );
}

export default App;
