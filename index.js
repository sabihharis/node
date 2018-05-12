const express= require('express')
const app=express();
const bodyParser=require('body-parser')
const mongoose=require('mongoose')
//const http=require('http').Server(app)
///http.listen(4000,'10.2.150.152')

const user_R= require('./routes/User')

mongoose.connect('mongodb://localhost/Appdata')
mongoose.Promise=global.Promise;

// accept json body
app.use(bodyParser.json());

// initialise route
app.use('/api',require('./routes/api2'))

app.use('/api',require('./routes/imageapi'))
app.use('/api', user_R)
// error handling

app.use('/uploads',express.static('uploads'))
app.use(function(err, req, res, next){

  console.log(err)
  res.status(522).send({error:err.message})


})


app.listen(process.env.port||4000,function(){
  console.log("Listen!!!!!!!!!!")
})





app.use(bodyParser.json());
app.use('/api',require('./routes/api'))



var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://taha:taha123@ds215388.mlab.com:15388/tahadb";





app.get('/api', function(req,res){

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").find({}).toArray(function(err, result) {
          if (err) throw err;
            res.send({name:"Taha"})
          console.log(result);
          db.close();
        });
      })

    console.log('Get Request')
   // res.send({Name:"Taha"});
})


app.listen( process.env.port||4000, function(){
    console.log("Now listen")
})
