var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var session = require('express-session');
var web3 = require('web3');
var myweb=new web3(new web3.providers.HttpProvider('http://localhost:8545'));



firebase.initializeApp({
  apiKey: "AIzaSyAC6XBMhlV2XFecuXBa03UefrFRx8x_Ynk",
    authDomain: "foodcourtsai.firebaseapp.com",
    databaseURL: "https://foodcourtsai.firebaseio.com",
    projectId: "foodcourtsai",
    storageBucket: "foodcourtsai.appspot.com",
    messagingSenderId: "122258299921"
});
var database = firebase.database();
var Ref=database.ref('shop');
var refS=Ref.child('register');
var refM=database.ref('menu');
//var refMc= refM.child('')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/index',function(req,res,next){
  res.render('index');
});
router.get('/menu',function(req,res,next){
  res.render('menu');
});
router.get('/wallet',function(req,res,next){

  res.render('wallet');
});
});
console.log(express);
console.log(web3);
console.log(firebase);
refS.on('value',function(snapshot){
router.post('/login',function(req,res,next){
  if(req.body.id==snapshot.val().sid && req.body.password==snapshot.val().password){

      console.log(session);
      var send={
        name : snapshot.val().sname,
          //current : myweb.eth.getBalance(snapshot.val().address)

      }
      res.render('index',{bal :send});
}
  else{
    res.redirect('/');
  }
});
});

router.post('/menu',function(req,res,next){
  refS.on('value',function(snappy){
     refM.push({
       id : snappy.val().sid,

     });

});

// refS.on('value',function(snap){
// router.post('/wallet',function(req,res,next){
//   //mycontract.methods.transfer(myweb.eth.coinbase,myweb.eth.getBalance(**address),{from: **address});
//
//   res.render('')
// });
// });
module.exports = router;
