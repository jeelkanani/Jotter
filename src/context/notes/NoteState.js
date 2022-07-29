// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./NoteContext";
//1.context api ma first function banvi do.
//2. tema je provide karva mango chho te react ni andar nakhi do.
//3. pacchi notecontext valu syntex lakhi devanu jethi notestate ne jaya pn wrap karvi taya teni andar na badha childern ma te access kari shakay.


// const NoteState = (props)=>{
// const s1 ={
//         "name":"jeel",
//         "class":"5b"
// }
// const [state,setstate]= useState(s1);
// const update =()=>{
//    setTimeout(()=>{
//         setstate({
//                 "name":"jeelss",
//                 "class":"10b"
//         })
//    },1000)
// }
//         return (
//                 <NoteContext.Provider value={{state,update}}>
//                         {props.children}
//                 </NoteContext.Provider>
//         )




const NoteState = (props)=>{
   const host="http://localhost:5000"
      const notesInitial =[]; 

      const [notes,setNotes]=useState(notesInitial);

      //🤩🤩 GET ALL NOTES
      const getnotes = async ()=>{
        //api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
         method: 'GET',
         headers: {
           'Content-Type': 'application/json',
           "auth-token":localStorage.getItem('token')

         },
        
       });
       

       const json= await response.json();
       console.log(json);
       setNotes(json)
      }


       //🤩🤩 ADD NOTE
         const addnotes = async (title,description,tag)=>{
           //api call
           const response = await fetch(`${host}/api/notes/addnotes`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')

            },
            body: JSON.stringify({title,description,tag}) 
          });
          const note=await response.json();
          setNotes(notes.concat(note))
          
         }

       //🤩🤩 DELETE NOTE

       const deletenotes =async(id)=>{
 //API CALL 
 
           const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
          
            },
});
const json= response.json(); 
console.log(json);
//logic

                 const newNotes = notes.filter((note)=>{return note._id!==id})
                 setNotes(newNotes);
        }

       //🤩🤩 UPDATE NOTE
       const editNote =async (id,title,description,tag)=>{
         //API CALL 
 
                      const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
                        method: 'PUT',
                        headers: {
                          'Content-Type': 'application/json',
                          'auth-token':localStorage.getItem('token')

                        },
                        body: JSON.stringify({title,description,tag}) 
                      });
                      const json= response.json(); 
                      console.log(json); 
               


            let newNotes=JSON.parse(JSON.stringify(notes))
        //LOGIC TO EDIT NOTE
              for (let index = 0; index < newNotes.length; index++) {
                const element = newNotes[index];
                if(element._id === id){
                  newNotes[index].title =title;
                  newNotes[index].description =description;
                  newNotes[index].tag =tag;

                  break;
                }
                
              }
              setNotes(newNotes);   
       } 
      
      

                return (
                        <NoteContext.Provider value={{notes,addnotes,editNote,deletenotes,setNotes,getnotes}}>
                                {props.children}
                        </NoteContext.Provider>
                )
}

export default NoteState;
