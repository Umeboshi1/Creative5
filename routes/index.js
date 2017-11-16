var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/commentDB', {useMongoClient:true});

var commentSchema = mongoose.Schema({
  Name:String,
  Comment:String
});

var Comment = mongoose.model('Comment',commentSchema);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
  console.log("connected");
});

router.get('/fake',function(req,res,next){
   console.log("fake");
  var fakelist = [{Name:"jim",Comment:"hi"}];
  res.json(fakelist);
});

router.get('/comment',function(req,res,next) {
  console.log("Comment Get");
  Comment.find(function(err,commentList) {
    if(err) return console.error(err);
    else{
      res.json(commentList);
    }
  });
});

router.post('/comment',function(req,res,next){
  console.log("Comment Post");
  console.log(req.body);
  var newcomment = new Comment(req.body);
  newcomment.save(function(err,post) {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

router.delete('/comment',function(req,res,next) {
  console.log("delete route");
  Comment.remove(function(err) {
    if(err) return console.error(err);
    else {
      console.log("Success");
      res.sendStatus(200);
    }
    });
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
                           
