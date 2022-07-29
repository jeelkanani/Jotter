const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');
const user = require('../models/User');

const JWT_SECRET="mynameisjeel";
//res.body no use karvo hoy to middleware use karvo pade tena mate app.use no use karvo pade.
//🤩🤷‍♀️ create user

router.post('/createuser' ,
            [
             body('name','please enter valid name').isLength({min:3}), 
             body('email','please enter valid email').isEmail(), 
             body('password','please enter valid password').isLength({min:6}) , 
            ],
            async (req,res)=>{
                      let success=false;
                        const errors = validationResult(req);
                        if (!errors.isEmpty()) {
                          return res.status(400).json({ success,errors: errors.array() });
                        }
       
        // console.log(req.body);
        // const user = User(req.body);
        // user.save();
        // res.send(req.body);

        //🤩🤷‍♀️aapne je user enter karyo te already register chhe te jova mate
        //await karvu pade e dhyan rakhvu
        let user =  await User.findOne({email : req.body.email})
        if(user)
        {
                return res.json({success,error:'soory user exist'})
        }
  
        const salt= await bcrypt.genSalt(10);
        const secPass= await bcrypt.hash(req.body.password,salt);

       //create user
        user= await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
              })

        const data={
                user:{
                        id:user.id,
                }
        }
        const authtoken=jwt.sign(data,JWT_SECRET);
        success=true;
        res.json({success,authtoken});
        
        // console.log(authtoken);


        //       .then(user => res.json(user))
        //       .catch(
        //               (err) => {
        //                  console.log(err)
        //                  res.json({err:'this email already exist.'})
        //               }
        //       );
           })


// 🤩🤷‍♀️Login user

           router.post(
                "/login",
                [
                  body("email", "Enter a valid email").isEmail(),
                  body("password", "Password can't be blank").exists(),
                ],
                async (req, res) => {
                  let success=false;
                  const errors = validationResult(req);
                  if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                  }
                  const{email,password}=req.body;
                  try {
                      const user=await User.findOne({email});
                      if(!user)
                      {
                        success=false;
                          return res.status(400).json({success,error: "Enter the correct credentials"});
                      }
                      const passwordComapre=await bcrypt.compare(password,user.password);
                      if(!passwordComapre)
                      {
                        success=false;
                          return res.status(400).json({success,error: "Enter the correct credentials"});
                      }
              
                      const data = {
                          user: {
                            id: user.id,
                          },
                        };
                        const Authtoken = jwt.sign(data, JWT_SECRET);
                        success=true;
                        res.json({success,Authtoken})
                  } catch (err) {
                      console.error(err.message);
                      res.status(500).send("Internal server error occured");
                  }
                }
              );



              //🤷‍♀️🤩 get user details login requried


              router.post(
                "/getuser",
                 fetchuser, //middlware : jaya login ni requried hoy
                async (req, res) => {
                        try {
                          userId=req.user.id;
                          const user = await User.findById(userId).select("-password");
                          res.json(user);      
                        } 
                        catch (error) {
                                console.error(err.message);
                                res.status(500).send("Internal server error occured");
                        }
                })


module.exports = router;