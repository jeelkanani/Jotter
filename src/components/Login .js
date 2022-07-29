import React, { useState } from 'react'
import {  useNavigate } from "react-router-dom";


const Login  = (props) => {

        const [credentials,setcredentials]=useState({email:"",password:""})
        let Navigate= useNavigate();
        
        const handleSubmit = async(e)=>{
                e.preventDefault();
              
                const response = await fetch("http://localhost:5000/api/auth/login", {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
            
                        },
                        body: JSON.stringify({email:credentials.email,password: credentials.password}) 

                      });

                const json=await response.json();
                console.log(json);

                if(json.success){
                        //redeirect
                        localStorage.setItem('token',json.Authtoken);
                        props.showAlert(" Login Sccessfully","success")
                        Navigate("/");


                }
                else{
                        alert("invalid");
                        props.showAlert("Invalid Credentials","danger")

                }
        }

        const onchange = (e)=>{
                setcredentials({...credentials,[e.target.name]:e.target.value})
           }


  return (
    <div>
        <form  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onchange} name="email" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" value={credentials.password} className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={onchange} name="password"/>
  </div>
  
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
    </div>
  )
}

export default Login 
