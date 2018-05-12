
const express = require('express')
const router = express.Router();
const Data = require('../model/Schema')






// get List of Data
router.get('/data', function (req, res) {
     Data.find({}).then(function(data){
         console.log(data.length)
        for(var i=0; i<data.length;i++){
            console.log(data[i].name)
    }
         res.send(data)
     })

   // res.send({ type: 'GET' })
})



// create new data
router.post('/data', function (req, res, next) {
    Data.create(req.body).then(function (data) {
        res.send(data)
    }).catch(next)

})

// update data
router.put('/data/:id', function (req, res, next) {
    Data.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
        Data.findOne({_id:req.params.id}).then(function(data){
            res.send(data)
        })
    }).catch(next)
})


// delete data
router.delete('/data/:id', function (req, res, next) {
    console.log(req.params.id)
    Data.findByIdAndRemove({ _id: req.params.id }).then(function(data){
        res.send({
            name: data.name,
            type: 'DELETE'
        })    
    }).catch(next)
})



module.exports = router;