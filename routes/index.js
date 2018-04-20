var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var session = require('express-session');
var web3 = require('web3');
var web3 =require('web3');
var myweb=new web3(new web3.providers.HttpProvider('http://localhost:8545'));
var abi=[ { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowed", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_initialAmount", "type": "uint256" }, { "name": "_tokenName", "type": "string" }, { "name": "_decimalUnits", "type": "uint8" }, { "name": "_tokenSymbol", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];
// var addr="0x8931024ed383b00154a9f7ce13aa889b96c5806f";
var addr="0x21d874d519f4277a7d46fd91616cc4f6238f8d93";
var coinbase = "0x8c28785217433c45e0de9d18add7084146d3e48f";
// var coinbase="0x7747747e72f7fe63c79157de2132f98ad2083107";
  var myContract= new myweb.eth.Contract(abi,addr);

//console.log(web3);
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
var refM=database.ref('menu');

//console.log(myContract);

router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/home',function(req,res,next){
  res.render('home');
});
router.get('/menu',function(req,res,next){
  res.render('menu');
});
router.get('/successU',function(req,res,next){
  res.render('successU');
});
router.get('/add',function(req,res,next){
  res.render('add');
});
router.get('/delete',function(req,res,next){
  res.render('delete');
});
router.get('/update',function(req,res,next){
  res.render('update');
});

//console.log(myContract);

router.get('/wallet',function(req,res,next){
  myContract.methods.balanceOf("0x8c28785217433c45e0de9d18add7084146d3e48f").call({from:"0x8c28785217433c45e0de9d18add7084146d3e48f"},function(err,res){
    console.log(res);
  });

});

  var sess;

Ref.on('value',function(snapshot){
router.post('/',function(req,res,next){
  var shop_det= snapshot.val();
  var keys=Object.keys(shop_det);
  sess=req.session;
  for(i=0 ;i<keys.length;i++){
    var k=keys[i];
  if(req.body.id==shop_det[k].id && req.body.password==shop_det[k].password){

      var send={
        name : shop_det[k].sname,
        id : shop_det[k].id
      };
      res.render('home',{bal :send});
      sess.name= shop_det[k].sname;
      sess.id=shop_det[k].id;

}


   }

});
});

router.post('/add',function(req,res,next){
  refM.child(sess.id).update({
    item: req.body.item,

  });
  refM.child(sess.id).child(req.body.item).update({foodie: req.body.foodie,});
});

refM.child(sess.id).on('value',function(snapshot){
router.post('/delete',function(req,res,next){
  var menu=snapshot.val();
  var keys=Object.keys(menu);
  for(var i=0;i<keys.length;i++){
    var k=keys[i];
    if(req.body.Item==k){
      refM.child(sess.id).child(req.body.item).remove();
    }
  }
});
});

router.post('/update',function(snapshot){
  refM.child(sess.id).update({
    item : req.body.Item,
  });
  refM.child(sess.id).child(req.body.Item).update({foodie: req.body.Foodie,});
});

router.post('/wallet',function(req,res,next){
   myContract.methods.transfer(myweb.eth.coinbase,myweb.eth.getBalance(snapshot.address),{from:snapshot.address});

});

module.exports = router;
