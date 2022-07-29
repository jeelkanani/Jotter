import React from 'react';
import NoteContext from '../context/notes/NoteContext';
import { useContext } from 'react';


const NoteItems = (props) => {
        const context = useContext(NoteContext);
        const {deletenotes} =context;
        const { note,updateNote } = props;
        return (
                <div className='col-md-3'>

                <div className="card my-3">
                        <div className="card-body">
                               
                                <h5 className="card-title">{note.title}</h5>
                               
                        
                                {/* <i className="fa-solid fa-up-right-and-down-left-from-center"></i> */}
                                <p className="card-text">{note.description}</p>
                                
                                <i className="fa-solid fa-trash-can " onClick={()=>{deletenotes(note._id) ; props.showAlert("Deleted Successfully","success")}} ></i> 
                                <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                                <i className="fa-solid fa-maximize fa-pull-right" ></i>
                                
                                
                                
                        </div>
                </div>
        </div>
        )
}

export default NoteItems
