const mongoose =require('mongoose');

const BookSchema = new mongoose.Schema(
{
    category : {
        type: String,
        required: ['true','Book cat always required'],
    },
    author:
    {
        type: String,
        required: true,
    },
    title: {
        type:String,
        required: true,
    },
    madeBy:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }, 
},
{    timpestamps: true  }
);
const Book =mongoose.model('Book',BookSchema);
module.exports=Book;