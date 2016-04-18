var express = require('express');
var router = express.Router();
var User = require('../Schemas/User');
var UserBabyInfo = require('../Schemas/UserBabyInfo');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Baby Monitoring' });
});

router.post('/login', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    
    User.findOne({username: username, password: password}, function(err, user){
        if(err){
            console.log(err);
            res.status(500).send({response: false, message: "Internal Error"});
        }
        if(!user){
            res.status(200).send({response: false, message: "Invalid user name or password"});
        }
        else{
            res.status(200).send({response: true, message: "Logged in!"});
        }
    });
});

router.post('/register', function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var age = req.body.age;
    
    var myDate = Date();
    var newBabyInfo = new UserBabyInfo({ 
    name             : name,
    age              : age,
    cryDetected      : false,
    movementDetected : false,
    temperature      : 37,
    heartRate        : { timestamp: myDate, metric: 0 },
    respirationRate  : { timestamp: myDate, metric: 0 } });
    newBabyInfo.save(function(err, savedBabyInfo){
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            console.log(savedBabyInfo.name);
            console.log(savedBabyInfo.age);
            console.log(savedBabyInfo.cryDetected);
            console.log(savedBabyInfo.movementDetected);
            console.log(savedBabyInfo.temperature);
            res.send(savedBabyInfo);
        }
    });

    var newuser = new User({ username:username, password:password, babyInfo:newBabyInfo._id });
    newuser.save(function(err, savedUser){
        if(err){
            console.log(err);
            res.status(500).send();
        }else{
            console.log(savedUser.username);
            console.log(savedUser.password);
            console.log(savedUser.babyInfo);
        }
        res.status(200).send(); 
    });
})

module.exports = router;