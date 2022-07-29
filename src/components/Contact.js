// import React from 'react'
// import { useContext  } from 'react'    //context ne use karva mate
// import noteContext from '../context/notes/NoteContext'

// const About = () => {
//   const a=useContext(noteContext);

//   useEffect(()=>{
//     a.update();
//     // eslint-disable-next-line 
//   },[])


//   return (
//     <div>
//       this is About {a.state.name} and {a.state.class}
//     </div>
//   )
// }


import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Contactcontext from '../context/Contact/Contactcontext';
import { useContext } from 'react';



const Contact = (props) => 
{
  const context = useContext(Contactcontext);
  const {contact} = context;
  const [details,setdetails]=useState({name:"",email:"",message:""})

  let Navigate= useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('token')){
      Navigate("/login");
    }
    // eslint-disable-next-line
  }, [])


  const handleSubmit = async(e)=>{
    // console.log("hi");
    e.preventDefault();
    // const {name,email,message}=details;
    contact(details.name,details.email,details.message)
    setdetails({name:"",email:"",message:""})
    props.showAlert("Submitted Successfully","success")



}


  const onchange = (e)=>{
    setdetails({...details,[e.target.name]:e.target.value})
   }

  return (
    <div className='container my-4'>
     
      <div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            minLength={3}
            onChange={onchange}
            value={details.name}
            placeholder="Enter Your Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={onchange}
            value={details.email}
            placeholder="Enter your Email Address"
          />
        </div>
       
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            minLength={5}
            onChange={onchange}
            value={details.message}
            rows="4"
            placeholder="Your message here..."
          ></textarea>
        </div>
        
        <button disabled={details.name.length<3 || details.message.length<7} type="submit" className="btn btn-success" onClick={handleSubmit}>
            Send
          </button>
          
        
      </div>
      
    </div>
  );
};

export default Contact

