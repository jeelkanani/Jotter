const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Contact = require('../models/Contact')
const { body, validationResult } = require('express-validator');



router.post('/contacts' ,fetchuser,
[
        body('name','please enter valid name').isLength({min:3}), 
        body('message','at least 5 charactor').isLength({min:5}),  
], 
async (req,res)=>{
        try {
         const{name,email,message}=req.body;
        const errors = validationResult(req);
         if (!errors.isEmpty()) {
           return res.status(400).json({ errors: errors.array() });
         }
         
         const contact =new Contact({
                 name,email,message,user:req.user.id
         })
         const saveNote = await contact.save();
         // const notes= await Notes.find({user: req.user.id});
         res.json(saveNote);
         
         
        } 
        
        catch (error) {
         console.error(err.message);
         res.status(500).send("Internal server error occured");
        }


})

module.exports = router; 