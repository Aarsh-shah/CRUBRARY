const mongoose=require('mongoose');
const bcrypt= require('bcryptjs');
const UserSchema = new mongoose.Schema(
    {
        name: {
                type:String,
                required:true,
              },
        email: {
                type:String,
                unique:true,
                required:true,
               },  
        password:
        {
             type:String,
             required:true,
        },
    });
UserSchema.virtual('books',{
ref:'Book',
foreignField:'madeBy',
localField: '_id',
});
UserSchema.set('toJSON',{virtuals:true});
UserSchema.pre('save',async function (next) {
    const salt= await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password, salt);
    next();
})
UserSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

  
const User=mongoose.model('User',UserSchema);
module.exports=User;