const mongoose=require('mongoose')
const Schema1=mongoose.Schema


const imageSchema=new Schema1({
    email:{
        type: String,
    },
    
    name:{
        type: String,
    },


    msg:{
        type:String,
        required:true
    },
    lat:{
        type:String,
        required:true
    },
    long:{
        type: String,
        required:true
    },
    place:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
    videoname:{
        type: String,
        required:true
    },
    videopath:{
        type: String,
        required:true

    },
    imagename:{
        type: String,
        required:true
    },
    imagepath:{
        type: String,
        required:true
    },
})


const DI_modal=mongoose.model('alldata', imageSchema )
module.exports=DI_modal 