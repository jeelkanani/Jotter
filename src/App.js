import './App.css';

import {
  BrowserRouter as Router,  //Swith te replace thay gay chhe routes thi
  Route,
  Routes
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';
import Login from './components/Login ';
import Signup from './components/Signup';
import { useState } from 'react';
import Contact from './components/Contact';
import ContactState from './context/Contact/ContactState';



function App() {
  const [alert,setAlert]=useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
   <>
   <NoteState>
    <ContactState>
   <Router>
     <Navbar/>
     <Alert alert={alert}/>
     <div className="container">
     <Routes>
       {/* 👨👨👨👨 OLD VERSION */}


          {/* <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About/>
          </Route> */}

      {/* 👨👨👨👨 NEW VERSION */}

         <Route exact path="/" element={<Home showAlert={showAlert}/>} />
         <Route exact path="/contact" element={<Contact showAlert={showAlert} />} />
         <Route exact path="/login" element={<Login showAlert={showAlert} />} />
         <Route exact path="/signup" element={<Signup showAlert={showAlert} />} />

        
          
        </Routes>
        </div>
        </Router>
        </ContactState> 
        </NoteState>
        
        
   </>
  );
}

export default App;
