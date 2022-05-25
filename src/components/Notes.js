import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";
import Addnote from "./Addnote";
import Noteitem from "./Noteitem";

function Notes(props) {
  const { showAlert } = props;
  const context = useContext(noteContext);
  const { notes, getnotes, editnote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      getnotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line 
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    editedtitle: "",
    editeddescription: "",
    editedtag: "",
  });

  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      editedtitle: currentNote.title,
      editeddescription: currentNote.description,
      editedtag: currentNote.tag,
    });
  };

  const handleClick = (e) => {
    refClose.current.click();
    editnote(note.id, note.editedtitle, note.editeddescription, note.editedtag);
    showAlert("Note Updated", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Addnote showAlert={showAlert} />

      <button
        style={{ display: "none" }}
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        ref={ref}
      ></button>

      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="container">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedtitle"
                    name="editedtitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.editedtitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editeddescription"
                    name="editeddescription"
                    onChange={onChange}
                    value={note.editeddescription}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedtag"
                    name="editedtag"
                    value={note.editedtag}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                disabled={note.editedtitle.length === 0}
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <h2>Your Notes</h2>
        <div className="container text-center">
          <h5 className="mt-5">
            {notes.length === 0 && "Start writing your notes.."}
          </h5>
        </div>

        {notes.map((note) => {
          return (
            <Noteitem
              note={note}
              key={note._id}
              updatenote={updatenote}
              showAlert={showAlert}
            />
          );
        })}
      </div>
    </>
  );
}

export default Notes;
