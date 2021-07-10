const mongoose =require('mongoose');


var date = new Date();
date.setDate(date.getDate() + 7);


const UserBookMapSchema = new mongoose.Schema(
    {
       
       
               bookholder:
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        }, 
         bookholded: {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Book',

            required:true,
         },
        expirytime: {
            type:Date,
            default: date,
        }
       
    },
    {    timpestamps: true  }
    );
    const Userbookmap =mongoose.model('Userbookmap',UserBookMapSchema);
    module.exports=Userbookmap;