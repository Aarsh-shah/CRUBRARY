const express=require('express');
const usersRoute= express.Router();
const User=require('../models/User');
const generateToken=require('../utils/generateToken');
const asyncHandler = require('express-async-handler');
const authMiddleware = require('../middleware/authMiddleware');
usersRoute.post('/register',asyncHandler(async (req,res) =>
{
    try{
        const {name,email,password}=req.body;
        const userExists = await User.findOne({email:email});
        if(userExists)
        {
            throw new Error('User Exist');
        }
        const userCreated = await User.create({name,email,password});
      
        res.json({
            _id: userCreated._id,
            name: userCreated.name,
            password: userCreated.password,
            email: userCreated.password,
            token: generateToken(userCreated._id),
          });
        }
        catch(error)
        {

            console.log(error);
        }   
    })       
    );
//Login
usersRoute.post('/login',asyncHandler(async (req,res) =>
{
    const  {email,password}=req.body;
    const user = await User.findOne({email: email});
  
    if(user && (await user.isPasswordMatch(password)))
    {
    res.status(201);
      res.status(200);
      res.json({
        _id: user._id,
        name: user.name,
        password: user.password,
        email: user.email,
        token: generateToken(user._id),
      });
    }
    else
    {
        res.status(401);
        throw new Error('Invalid Login Credentials');
    }  
})
);

//Update
usersRoute.put('/update',(req,res) =>
{
    res.send('Got a Update req');
});
//Delete User
usersRoute.delete('/:id',(req,res) =>
{
    res.send('Got a Delete req');
});
//Fetch all Users
usersRoute.get('/',(req,res) =>
{
    res.send('Got a User Register req');
});
usersRoute.get('/profile',authMiddleware,asyncHandler(async (req,res ) => 
{
try {
const user= await User.findById(req.user._id).populate('books');
res.send(user);
} catch (error) {
    res.send(error);
}
})
);

module.exports=usersRoute;
