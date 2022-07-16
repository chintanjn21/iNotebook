import React, { useContext, useEffect, useRef, useState } from "react";
import User from "./User"

function Notes(props) {
  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      {/* <Addnote showAlert={showAlert} /> */}
      <User/>

      <button
        style={{ display: "none" }}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        ref={ref}
      ></button>
    </>
  );
}

export default Notes;
