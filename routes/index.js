var express = require('express');
var router = express.Router();
var firebase = require('firebase');
var session = require('express-session');
var web3 = require('web3');
var myweb=new web3(new web3.providers.HttpProvider('http://localhost:8545'));
var abi=[ { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [ { "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [ { "name": "", "type": "uint8" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" } ], "name": "balances", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "name": "balance", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "", "type": "address" }, { "name": "", "type": "address" } ], "name": "allowed", "outputs": [ { "name": "", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "name": "_owner", "type": "address" }, { "name": "_spender", "type": "address" } ], "name": "allowance", "outputs": [ { "name": "remaining", "type": "uint256" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_owner", "type": "address" }, { "indexed": true, "name": "_spender", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "name": "_from", "type": "address" }, { "indexed": true, "name": "_to", "type": "address" }, { "indexed": false, "name": "_value", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "constant": false, "inputs": [ { "name": "_spender", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "approve", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transfer", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "name": "_from", "type": "address" }, { "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" } ], "name": "transferFrom", "outputs": [ { "name": "success", "type": "bool" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "name": "_initialAmount", "type": "uint256" }, { "name": "_tokenName", "type": "string" }, { "name": "_decimalUnits", "type": "uint8" }, { "name": "_tokenSymbol", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "constructor" } ];

var addr="0x8931024ed383b00154a9f7ce13aa889b96c5806f";
var coinbase="0x7747747e72f7fe63c79157de2132f98ad2083107";
var myContract=  myweb.eth.contract(abi,addr);


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


router.get('/', function(req, res, next) {
  res.render('login');
});
router.get('/index',function(req,res,next){
  res.render('index');
});
router.get('/menu',function(req,res,next){
  res.render('menu');
});
router.get('/successU',function(req,res,next){
  res.render('successU');
});


router.get('/wallet',function(req,res,next){
   myContract.methods.balanceOf(coinbase).call({from:coinbase},function(err,result){
   var

     console.log(result);
     var total={
       bal:result,

};
  res.render('wallet',{tot :total});

  });

  res.render('wallet');
});

Ref.on('value',function(snapshot){
router.post('/login',function(req,res,next){
  var shop_det= snapshot.val();
  var keys=Object.keys(shop_det);
  console.log('aaaaaa');
  for(i=0 ;i<keys.length;i++){
    var k=keys[i];
  if(req.body.id==shop_det[k].id && req.body.password==shop_det[k].password){

      var send={
        name : shop_det[k].sname,
        id : shop_det[k].id
      };
      res.render('home',{bal :send});
}


   }

});
});

router.post('/menu',function(req,res,next){
  res.redirect('/home/jatin/final/shop/shopkeeper/views/successU');
});
router.post('/wallet',function(req,res,next){
   myContract.methods.transfer(myweb.eth.coinbase,myweb.eth.getBalance(snapshot.address),{from:snapshot.address});

});

module.exports = router;
