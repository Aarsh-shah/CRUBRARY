const express = require('express');
const mongoose= require('mongoose');    
const app = express();
const asyncHandler= require('express-async-handler'); 
const usersRoute = require('./routes/usersRoute');
const bookRoute = require('./routes/bookRoute');
const error=require('./middleware/errormidhandle');
const authMiddleware =require('./middleware/authMiddleware');
const User = require('./models/User');
// import {React} from 'react';
// import {ReactDOM} from 'react-dom';
// import dbURL from dbURL;
const PORT=process.env.port || 5000;
require('./dbURL')();
//Connection of Mongoose DB

app.use(express.json());

//Routes Registering
// api for register users
app.use('/api/users',usersRoute);
app.use('/api/books',bookRoute);
app.use(error.errormidhandle);

app.listen(PORT, () => {
    console.log("running on port "+PORT);
})