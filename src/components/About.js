import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="container d-flex row justify-content-around" style={{height:'90vh'}}>
    <div
      className="text-center container"
      style={{ color: "rebeccapurple", fontSize: "6vw" }}
    >
      <i className="fa-solid fa-book-bookmark" /> iNotebook
    </div>
    <div className="container p-4" style={{backgroundColor: 'mediumpurple', borderRadius:'10px', boxShadow: '0 5px 10px'}}>
      <h3 className="mb-4 text-center">|| Welcome to iNotebook ||</h3>
      <h4>iNotebook is a web based cloud notebook which will take your notes and save them for you. This is the best and secure place to save all your notes & daily activities. You can edit or delete your notes wherever and whenever you want. Without the id and password even you also won't be able to access your notes.</h4>
      <h5 className="text-center">{!localStorage.getItem("token") ? (<div><Link to="/signup" style={{color:'#212529'}}>Signup </Link> right now & become a member of the iNotebooks growing Community.</div>) : ('Thank You! For being a member of iNotebook Community.' )}</h5>
    </div>
    <div style={{fontSize:'1.5vw', fontWeight:'bolder'}} className="text-center align-self-end p-2">Copyright © iNotebook.tk || All copyrights are reserved by iNotebook</div>
    </div>
  );
};

export default About;
