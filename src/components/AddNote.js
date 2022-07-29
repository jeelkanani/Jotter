import React, { useState } from 'react'
import { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

const AddNote = (props) => {
        const context = useContext(NoteContext);
        const {addnotes} = context;
        const [note,setNote]=useState({title:"",description:"",tag:""})

        
        const handleclick = (e)=>{
          
            e.preventDefault();
              //page reload na thay
             addnotes(note.title,note.description,note.tag);
             setNote({title:"",description:"",tag:""})
             props.showAlert("Added Successfully","success")
             
        }

        const onchange = (e)=>{
             setNote({...note,[e.target.name]:e.target.value})
        }

  return (
       <div>
                <div className="container my-3">
        <h2>Add Note</h2>
      </div>
      <form className="my-3">
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title}onChange={onchange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label"> Description</label>
    <textarea type="text" rows={3} className="form-control" id="description" name="description" value={note.description} onChange={onchange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label"> Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onchange} minLength={5} required/>
  </div>
  <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-success" onClick={handleclick}>
            Add Note
          </button>
</form>
       </div>

  )
}

export default AddNote
