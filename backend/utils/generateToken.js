const JWT= require('jsonwebtoken');
const secret= require('./secrets');
const generateToken = (userId) => {
return  JWT.sign({id:userId}, secret,{
     expiresIn: '10d',
 });

};
module.exports= generateToken;