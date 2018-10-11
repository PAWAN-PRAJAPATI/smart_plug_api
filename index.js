
const express = require('express')
const bodyParser = require('body-parser')
const appMongo = require("./appMongo")
const app = express()
var plug = new appMongo("user64","plug")
var ObjectID = require('mongodb').ObjectID
var status_id = new ObjectID("5bbf54c341359815f2d88ea8")

//5bbf54c341359815f2d88ea8

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());


app.get('/on',(req,res,next)=>{
    console.log("onn")
    plug.updateOne({_id:status_id},{status:1},()=>{res.send({status:"on"})},req,res,next)
    //res.send({status:"on"})
})

app.get('/off',(req,res,next)=>{
    plug.updateOne({_id:status_id},{status:0},()=>{res.send({status:"off"})},req,res,next)
})

app.get('/status',(req,res,next)=>{
    plug.findOne({_id:status_id},(result)=>{res.send(result)},req,res,next)
})
var port = 5000
app.listen(port , () => console.log('Example app listening on port ' + port))