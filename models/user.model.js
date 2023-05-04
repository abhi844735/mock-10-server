const mongoose=require("mongoose");
let userSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,},
    password:{type:String,required:true},
  

})
let Usermodel=mongoose.model("users",userSchema)
module.exports={
    Usermodel
}