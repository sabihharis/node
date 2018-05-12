const express = require('express')
const router = express.Router();

const Data = require('../model/imageSchema')
const multer = require('multer')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')

    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})



const storageimage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/img')

    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const storagevideo = multer.diskStorage({
    destination: function (req, files, cb) {
        cb(null, './uploads/Video')

    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


var video = ''
const storagevideoimage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", file)
        if (file.mimetype == 'image/jpg') {
            console.log('image')
            cb(null, './uploads/img')
        }
        else {
            if (file.mimetype == 'video/mp4')
                {console.log("video")
                cb(null, './uploads/Video')}
            else{
                console.log('error')
            }    
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})


const upload = multer({ storage: storage })

const uploadimage = multer({ storage: storageimage })
const uploadvideo = multer({ storage: storagevideo })
const uploadall = multer({ storage: storagevideoimage })



router.get('/image', function (req, res, next) {
    Data.find({}).then(function (data) {
        res.send(data)
    })
})


router.post('/image', uploadimage.single('photo'), function (req, res, next) {
    console.log(req.file)
    console.log("Hellow", req)
    var dd = {
        email:req.body.email,
        name: req.body.name,
        msg: req.body.msg,
        lat: req.body.lat,
        long: req.body.long,
        place: req.body.place,
        date: req.body.date,
        videoname: '-',
        videopath: '-',
        imagepath: "http://10.2.150.152:4000/" + req.file.path,
        imagename: req.file.originalname

        //path:"http://localhost:4000/"+ req.file.path
    }

    Data.create(dd).then(function (data) {
        console.log(dd)
        res.send(data)
    }).catch(next)
})


router.post('/video', uploadvideo.single('video'), function (req, res, next) {
    console.log(req.file)
    console.log("Hellow", req)

    var dd = {
        email:req.body.email,
        name: req.body.name,
        msg: req.body.msg,
        lat: req.body.lat,
        long: req.body.long,
        place: req.body.place,
        date: req.body.date,
        videoname: req.file.originalname,
        videopath: "http://10.2.150.152:4000/" + req.file.path,
        imagepath: '-',
        imagename: '-'
        //path:"http://localhost:4000/"+ req.file.path
    }

    Data.create(dd).then(function (data) {
        console.log(dd)
        res.send(data)
    }).catch(next)
})


router.post('/data1', function (req, res, next) {
    console.log(req.file)
    console.log("Hellow", req)
    var dd = {
        email:req.body.email,
        name: req.body.name,
        msg: req.body.msg,
        lat: req.body.lat,
        long: req.body.long,
        place: req.body.place,
        date: req.body.date,
        videopath: '-',
        videoname: '-',
        imagename: '-',
        imagepath: '-',
        //path:"http://localhost:4000/"+ req.file.path
    }

    Data.create(dd).then(function (data) {
        console.log(dd)
        res.send(data)
    }).catch(next)
})

router.post('/videoimages', uploadall.array(['photovideo']), function (req, res, next) {
    console.log(req.file)
    video = req.files[1]
    console.log("Hellow", req)
    var dd = {
        email:req.body.email,
        name: req.body.name,

        msg: req.body.msg,
        lat: req.body.lat,
        long: req.body.long,
        place: req.body.place,
        date: req.body.date,
        videoname: req.files[1].originalname,
        videopath: "http://10.2.150.152:4000/" + req.files[1].path,
        imagepath: "http://10.2.150.152:4000/" + req.files[0].path,
        imagename: req.files[0].originalname,
        //path:"http://localhost:4000/"+ req.file.path
    }

    Data.create(dd).then(function (data) {
        console.log(dd)
        res.send(data)
    }).catch(next)
})


module.exports = router




