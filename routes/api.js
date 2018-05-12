
const express=require('express')
const router=express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";







// get List of Data
router.get('/data', function(req, res){
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("data");
        dbo.collection("datas").find({}).toArray(function(err, result) {
          if (err) throw err;
          //res.statusCode
          res.send(result)
          console.log(result);
          db.close();
        });
      });
})





// create new data
router.post('/data', function(req, res){
    console.log(req.body);
    res.send({
        type:'POST',
        name:req.body.name,
        last:req.body.Last_name
    })
    
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { name: req.body.name, last: req.body.Last_name };
        dbo.collection("customers").insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      }); 
      







})

// update data
router.put('/data/:id', function(req, res){
    res.send({type:'PUT'})
})


// delete data
router.delete('/data/:id', function(req, res){
    res.send({type:'DELETE'})
})


module.exports=router;