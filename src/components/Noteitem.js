import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";

function Noteitem(props) {
  const { note, updatenote, showAlert } = props;
  const context = useContext(noteContext);
  const { deletenote } = context;

  return (
    <div className="card col-md-3">
      <div className="card-body">
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.description}</p>
        <p className="card-text">{note.tag}</p>
        <i
          className="fa-solid fa-trash-can mx-2"
          onClick={() => {
            deletenote(note._id);
            showAlert("Note Deleted", "success")
            
          }}
        ></i>
        <i
          className="fa-solid fa-pen-to-square mx-2"
          onClick={() => {
            updatenote(note);
          }}
        ></i>
      </div>
    </div>
  );
}

export default Noteitem;
