const mongoose=require('mongoose')
const Schema= mongoose.Schema;

/// create data schema
const user=new Schema({
  email:{
    type:String,
    required:true,
      match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password:{
    type:String,
    required:true
  }
})

const U_model=mongoose.model('user', user)
module.exports=U_model;
