import React from 'react'
import { useState } from 'react';
import {  useNavigate } from "react-router-dom";

const Signup = (props) => {


  const [credentials,setcredentials]=useState({name:"",email:"",password:"",cpassword:""})
  let navigator = useNavigate();
  
  const handleSubmit = async(e)=>{
          e.preventDefault();
          const {name,email,password}=credentials;
          const response = await fetch("http://localhost:5000/api/auth/createuser", {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
      
                  },
                  body: JSON.stringify({name,email,password}) 

                });

          const json=await response.json();
          console.log(json);
          console.log("hi");
          if(json.success){
                  //redeirect
                  localStorage.setItem('token',json.authtoken);
                 
                  navigator("/");
                  props.showAlert("Sccessfully Create Account","success")


          }
          else{
                  props.showAlert("Invalid Credentials","danger")
          }
  }

  const onchange = (e)=>{
          setcredentials({...credentials,[e.target.name]:e.target.value})
     }

  return (
    <div className="container">
  <form onSubmit={handleSubmit} >
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name"  onChange={onchange} name="name" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" onChange={onchange} name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  
  <div className="mb-3">
    <label htmlFor="password"  className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onchange} minLength={5} required name="password"/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
    <input type="cpassword" className="form-control" id="cpassword" onChange={onchange} minLength={5} required name="cpassword"/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup
