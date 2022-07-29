import React from 'react'
import ContactContext from "./Contactcontext";


const ContactState = (props) => {
  const host="http://localhost:5000"

   const contact = async (name,email,message)=>{
        const response = await fetch(`${host}/api/contact/contacts`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'auth-token':localStorage.getItem('token')
    
                },
                body: JSON.stringify({name,email,message}) 
    
              });
              const json=await response.json();
              console.log(json);

   }

  return (
        <ContactContext.Provider value={{contact}}>
        {props.children}
       </ContactContext.Provider>
  )
}

export default ContactState
