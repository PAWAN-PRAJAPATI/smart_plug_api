//var MongoClient = require('mongodb').MongoClient;


class appMongo{
    constructor(db,collection){
        this.db = db
        this.collection = collection
        //this.url = 'mongodb://vishwesh1010:vishwesh101025@ds163530.mlab.com:63530/driving'
        this.url = 'mongodb://pawan64:feelsgood64@ds263590.mlab.com:63590/user64'
        //this.url = "mongodb://localhost:27017/local"
        this.MongoClient = require('mongodb').MongoClient;
        console.log("Initialize")
    }
  

    findOne(query,callback,req,res,next){
        var db_name = this.db
        var db_collection  = this.collection
        const MongoClient = this.MongoClient
        var url = this.url

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(db_name);
            dbo.collection(db_collection).findOne(query,function(err, result) {
                callback(result,req,res,next,err)
                db.close();
            });
        });
    }

    updateOne(query,value,callback,req,res,next){
        var db_name = this.db
        var db_collection  = this.collection
        const MongoClient = this.MongoClient
        var url = this.url


        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(db_name);
            //var myquery = { event: "stop" };
            //var newvalues = { $set: {event: "faltu", address: "Canyon 123" } };
            dbo.collection(db_collection).replaceOne(query, value, function(err, result) {
            if (err) throw err;
            console.log("1 document updated");
            db.close();
            callback("data",req,res,next,err)
            });
        });
    }


    connect(callback,req,res,next){

        var db_name = this.db
        var db_collection  = this.collection
        const MongoClient = this.MongoClient
        var url = this.url

        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            var dbo = db.db(db_name);
            var collection = dbo.collection(db_collection)
            callback(collection,db,req,res,next,err)

        })

    }


}
module.exports = appMongo