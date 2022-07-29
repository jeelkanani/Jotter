import React from 'react'
import { Link } from "react-router-dom";
// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';  //bitton active and inactive karva mate  👨   OLD VERSION
import {useNavigate} from 'react-router-dom';


const Navbar = () => { 
  let Navigate= useNavigate();

  const handlelogout =()=>{
    localStorage.removeItem('token')
    Navigate("/login")
  }
  
  let location = useNavigate();
  // useEffect(() => {
      
  // }, [location]);

   
  return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">CNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/contact" ? "active" : ""}`} to="/contact">Contact Us</Link>
              </li>
        
            </ul>
           {!localStorage.getItem('token') ? <form className="d-flex" role="search">
              <Link className="btn btn-dark mx-1" to="/login" role="button">Login</Link>
              <Link className="btn btn-dark mx-1" to="/signup" role="button">Sign Up</Link>
              </form>
             : <button onClick={handlelogout} className="btn btn-dark">Logout</button>}
            

          </div>
        </div>
      </nav>
  )
}

export default Navbar
