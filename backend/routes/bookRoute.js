const express=require('express');
const Book =require('../models/Book');
const asyncHandler=require('express-async-handler');
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const bookRoute=express.Router();


//Create A book
bookRoute.post('/',authMiddleware, asyncHandler(async (req,res) =>{
const book = await Book.create(req.body);
if(book)
{
    res.status(200);
    res.json(book);

}
else
{
    res.status(500);    
    throw new Error('Error while creating the book Please try again');
}

})
);
// Get all Books
bookRoute.get(
    '/',
    asyncHandler(async (req, res) => {
      const books = await Book.find({});
      //Compare password
      if (books) {
        res.status(201);
        res.send(books);
      } else {
        res.status(401);
        throw new Error('Server error');
      }
    })
  );
  //Update 
  bookRoute.put(
    '/:id',
    asyncHandler(async (req, res) => {
      const books = await Book.findById(req.params.id);
      //Compare password
      if (books) {
        const newBookData= await Book.findByIdAndUpdate(
            req.params.id,req.body,
            {
                new:true,
                runValidators:true,
            }
        )
            res.status(200);
            res.json(newBookData);
    } else {
        res.status(401);
        throw new Error('Problem Updating the Book error');
      }
    })
  );
  bookRoute.delete(
      '/:id',
      asyncHandler(async (req,res) =>
      {
        try {
            const book= await Book.findByIdAndDelete(req.params.id);
            res.status(200);
                res.send('Deleted the Book Successfully');
        }
        catch (err)
        {
            res.status(500);

            res.send('Delete Failed and Error Not  Failed');
        }

      })
  );

module.exports=bookRoute;