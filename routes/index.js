var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/usersDB', {useMongoClient:true});

var usersSchema = mongoose.Schema({
  Username:String,
  Password:String
});

var User = mongoose.model('User',usersSchema);
var db = mongoose.connection;
db.on('error',console.error.bind(console,'connection error'));
db.once('open',function(){
  console.log("connected");
});

router.get('/fake',function(req,res,next){
   console.log("fake");
  var fakelist = [{Name:"jim",Password:"hi"}];
  res.json(fakelist);
});

router.get('/user',function(req,res,next) {
  console.log("User Get");
  
//   var obj = JSON.parse(req.body); // this is how you parse a string into JSON 
//   document.body.innerHTML += obj.hello;
//   console.log(obj);
  
  var myCursor = User.find({"Username": "Rory"}, {"Password" : "123" });

  console.log(myCursor);
//   var myDocument = myCursor.next();
//   var myDocument = myCursor.hasNext() ? myCursor.next() : null;

//   if (myCursor !== null) {
//     var myName = myDocument.name;
//     print (tojson(myName));
//     res.send(true);
//   }
//   else{
//     res.send(false);
//   }
  
//   res.send(User.find({"Username": "Rory"}, {"Password" : "123" }));
  
//   User.find(function(err,userList) {
//     if(err) return console.error(err);
//     else{
//       console.log('returning here');
//       res.send(true);
// //       res.json(userList);
//     }
//   });
});

router.get('/usersAll',function(req,res,next) {
  console.log("User Get");
  User.find(function(err,userList) {
    if(err) return console.error(err);
    else{
//       console.log('returning here');
//       res.send(true);
      res.json(userList);
    }
  });
});

router.post('/user',function(req,res,next){
  console.log("User Post");
  console.log(req.body);
  var newUser = new User(req.body);
  newUser.save(function(err,post) {
    if(err) return console.error(err);
    console.log(post);
    res.sendStatus(200);
  });
});

router.delete('/user',function(req,res,next) {
  console.log("delete user");
  var delUser = new User(req.body);
  var userId = 0;
  userId = delUser.id;
  console.log(req.body.Username);
  //User.find({_id: req.body.id}).remove().exec();
  /*User.remove({"Username": req.body.Username }, function(err) {
    if (!err) {
            console.log("boooo!");
    }
    else {
            console.log("yay?");
    }
});*/
  var obj = JSON.parse(req.body); // this is how you parse a string into JSON 
//   document.body.innerHTML += obj.hello;
  
  User.find({"Username": "obj.Username"}, {"Password" : "obj.Password" }).remove();
  console.log(obj.UserName);
  /*User.remove(function(err) {
    if(err) return console.error(err);
    else {
      console.log("Success");
      res.sendStatus(200);
    }
    });*/
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
                           
