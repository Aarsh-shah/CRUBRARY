const express=require('express');
var ObjectId = require('mongodb').ObjectId; 
const usersRoute= express.Router();
const User=require('../models/User');
const generateToken=require('../utils/generateToken');
const asyncHandler = require('express-async-handler');
const authMiddleware = require('../middleware/authMiddleware');
const Userbookmap = require('../models/UserBookMapping');
const Book = require('../models/Book');
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
    const userCreated = await User.findOne({email: email});
  
    if(userCreated && (await userCreated.isPasswordMatch(password)))
    {
        res.status(201);
        res.status(200);
      res.json({
        _id: userCreated._id,
        name: userCreated.name,
        password: userCreated.password,
        email: userCreated.email,
        token: generateToken(userCreated._id),
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
usersRoute.put(
    '/profile/update',
    authMiddleware,
    asyncHandler(async (req, res) => {
      //Find the login user by ID
      const user = await User.findById(req.user._id);
  
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = req.body.password || user.password;
        }
  
        const updatedUser = await user.save();
  
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: generateToken(updatedUser._id),
        });
      }
    })
  );
//Delete User
usersRoute.delete('/:id',(req,res) =>
{
    res.send('Got a Delete req');
});
//Fetch all Users
usersRoute.get('/',asyncHandler(async (req,res ) => 
{
try {
const user= await User.find()
res.status(200);
res.json({user});
} catch (error) {
    res.send(error);
}
})
);
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

usersRoute.post('/issue/:id',authMiddleware,asyncHandler(async (req, res) => {
try
{
    console.log(req.user);

const userId=req.user._id;

 

console.log(userId);
const bookholder1= await Userbookmap.findOneAndDelete({bookholder:req.user._id });
 const BookHolded1 =await Userbookmap.findOne({bookholded: req.params.id});
     

console.log(BookHolded1);
console.log(bookholder1);
 if(BookHolded1)
{
    res.status(500);
    res.json({'error':'Duplicate Error'});

}
else
{ 
    const UserBookMapData = await Userbookmap.create({bookholder:userId,bookholded:req.params.id});
res.json({UserBookMapData});
// res.send(UserBookMapData);
res.status(200);
}
}
catch(error)
{
res.json({error});
res.status(500);
}

})
);
usersRoute.post('/issue',asyncHandler(async (req, res) => {
    try
    {
        console.log('in the route');
    var availableBooks=[];
    const allBooks =await Book.find();
    const issuedBooks = await Userbookmap.find();
     const availSet = new Map();
    for(let i=0;i<allBooks.length ;i++)
    availSet.set(i,1);
    for(let i=0;i<allBooks.length;i++)
        {
            
            for(let j=0;j<issuedBooks.length;j++)
            {
                console.log(i,j,allBooks[i]._id,issuedBooks[j].bookholded);
                if(allBooks[i]._id===issuedBooks[j].bookholded)
                availSet.set(i,0);
            }
        }
        console.log(availSet);

    for(let i=0;i<allBooks.length;i++)
    {
        console.log(i,availSet.get(i));
        if(availSet.get(i)===1)
        availableBooks.push(allBooks[i]);
        console.log(i,availSet.get(i));
    }

       
    
   
    console.log(availableBooks);
    
    res.json({availableBooks});
    res.status(200);
    }
    catch(error)
    {
    res.send(error);
    res.status(500);
    }
    
    })
    );
usersRoute.get('/myissuedbook',authMiddleware,asyncHandler(async (req, res) => {
    try
    {
    
    
    const userId=req.user._id;
    
     
    

    const bookholder1= await Userbookmap.findOne({bookholder:req.user._id });
    console.log(bookholder1);
    if(!bookholder1)
    {
        res.json({});
    } 
    else
    {
    const myBook =await Book.findOne({_id: bookholder1.bookholded});
    res.json({myBook});
    }
    res.status(200);
    }
    
    catch(error)
    {
    res.json({error});
    res.status(500);
    }
    
    })
    );


module.exports=usersRoute;
