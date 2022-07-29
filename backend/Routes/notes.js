const express = require('express')
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes');
const { body, validationResult } = require('express-validator');

//route 1: get all notes .login requried

router.get('/fetchallnotes' ,fetchuser,async (req,res)=>{
        try {
                const notes= await Note.find({user: req.user.id});
                res.json(notes);     
        } catch (error) {
                console.error(err.message);
                res.status(500).send("Internal server error occured"); 
        }
       
})

//route 2: add notes .login requried

router.post('/addnotes' ,fetchuser, 
       [
        body('title','please enter valid title').isLength({min:3}), 
        body('description','at least 5 charactor').isLength({min:5}),  
       ],
       async (req,res)=>{
               try {
                const{ title, description,tag}=req.body;
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                  return res.status(400).json({ errors: errors.array() });
                }
                
                const note =new Note({
                        title,description,tag,user:req.user.id
                })
                const saveNote = await note.save();
                // const notes= await Notes.find({user: req.user.id});
                res.json(saveNote);
                
                
               } 
               
               catch (error) {
                console.error(err.message);
                res.status(500).send("Internal server error occured");
               }

    
})


//route 3: update notes .login requried
//upadate mate most of put no use thay pn  tame post no use pn kari shako

router.put('/updatenotes/:id' ,fetchuser, 
      
       async (req,res)=>{
               try 
               {
               const{ title, description,tag}=req.body;
               
                //create new object
               const newnote ={};
               if(title){{newnote.title=title}};
               if(description){{newnote.description=description}};
               if(tag){{newnote.tag=tag}};

               //je note ne update karvani tene find karo and upadate karo
               let note= await Note.findById(req.params.id);
               if(!note){return res.status(404).send("Not Found")}

               if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed")
               }

               note=await Note.findByIdAndUpdate(req.params.id,{$set:newnote}, {new:this.true})
               res.json({note});
                
                
               } 
               
               catch (error) {
                console.error(err.message);
                res.status(500).send("Internal server error occured");
               }

    
})



//route 4: delete notes .login requried


router.delete('/deletenotes/:id' ,fetchuser, 
      
       async (req,res)=>{
               try 
               {
              
               
               //je note ne delete karvani tene find karo and delete karo
               let note= await Note.findById(req.params.id);
               if(!note){return res.status(404).send("Not Found")}

               if(note.user.toString() !== req.user.id){
                return res.status(401).send("Not Allowed")
               }

               note=await Note.findByIdAndDelete(req.params.id)
               res.json({"success":"Note has been deleted",note:note});
                
                
               } 
               
               catch (error) {
                console.error(err.message);
                res.status(500).send("Internal server error occured");
               }

    
})

module.exports = router; 