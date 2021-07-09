const mongoose= require('mongoose');
const dbConnect = () =>
{
    const uri='mongodb+srv://aarshshah:abcdefgh1234@cluster0.luqtu.mongodb.net/test'
    //Connect Mongo DB connection
    mongoose.
    connect(uri,{useFindAndModify: true,useUnifiedTopology: true,useCreateIndex: true,useNewUrlParser: true})
    .then(() => console.log('Success connected Mongo'))
    .catch(err => console.log(err))
    
    
    
}
module.exports=dbConnect;