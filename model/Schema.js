const mongoose=require('mongoose')
const Schema= mongoose.Schema;





/// create data schema
const dataschema=new Schema({
  name:{
    type:String,
    required:[true,"Name Field Is Require"]
  },
  rank:{
    type:String,
  },
  available:{
    type:Boolean,
    default:false
  }
})



const D_model=mongoose.model('data', dataschema)
module.exports=D_model;
