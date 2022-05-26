import React, { useState } from "react";
import NoteContext from "./noteContext";

function Notestate(props) {
    const InitialNotes = []
    const [notes, setNotes] = useState(InitialNotes);
    let name, email;
    const port = process.env.PORT || 5000;

    //Get all notes.
    const getnotes = async ()=>{
      //API Call
      let url = process.env.REACT_APP_GETNOTE_URL;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });
        const json =  await response.json();

      //Logic add all notes to the array of notes(InitialNotes)
      setNotes(json);
    }

    //Add a Note
    const addnote = async (title, description, tag)=>{
      //API Call
      let url = process.env.REACT_APP_ADDNOTE_URL;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });
        const note =  response.json();

      //Logic to add a note
      setNotes(notes.concat(note));
    }

    //Delete a Note
    const deletenote = async (id)=>{
      //API Call
      let url = `${process.env.REACT_APP_DELETENOTE_URL}/${id}`;
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
        });

        const json = response.json();
        //Logic to delete a note
      const newNotes = notes.filter((note)=>{return note._id !== id});
      setNotes(newNotes);
    }

    //Edit a Note
    const editnote = async (id, title, description, tag)=>{
      //API Call
        let url = `${process.env.REACT_APP_UPDATENOTE_URL}/${id}`;
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, description, tag})
        });

        const json =  response.json();

        const newNotes = JSON.parse(JSON.stringify(notes));
      //Logic to edit a note
      for (let index = 0; index < newNotes.length; index++) {
        if(newNotes[index]._id === id){
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tag = tag;
          break;
        }   
      }
      setNotes(newNotes);
    }

    const getuser = async ()=>{
      //API Call
      let url = process.env.REACT_APP_GETUSER_URL;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        },
      });
      const json = await response.json();
      localStorage.setItem('name',json.name);
      localStorage.setItem('email',json.email);
      console.log(localStorage.getItem('name'));
      // name = await json.name;
      // email = await json.email;

    }
  return (
    <NoteContext.Provider value={{notes, addnote, deletenote, editnote, getnotes, getuser, name, email }}>{props.children}</NoteContext.Provider>
  );
}
export default Notestate;
