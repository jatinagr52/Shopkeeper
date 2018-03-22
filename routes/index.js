var express = require('express');
var router = express.Router();

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

router.post('/login',function(req,res,next){
  if(req.body.id=="McD" && req.body.password=="123"){
    res.redirect('/index');
}
  else{
    res.redirect('/');
  }
});
router.post('/menu',function(req,res,next){
  res.redirect('/index');
})

module.exports = router;
