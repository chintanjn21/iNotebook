import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

function Addnote(props) {
  const context = useContext(noteContext);
  const { addnote } = context;

  const{showAlert} = props;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note Added", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <h2 className="container my-3">Add a note</h2>
      <form className="container">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={note.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={onChange}
          />
        </div>
        <button
          disabled={note.title.length === 0}
          type="submit"
          className="btn btn-primary"
          onClick={handleClick}
          style={{color:'black', backgroundColor:'mediumpurple', border:'none'}}
        >
          Add this note
        </button>
      </form>
    </div>
  );
}

export default Addnote;
