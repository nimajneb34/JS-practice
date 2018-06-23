//Regist Customer ./routes/c_register
var http = require('http')
var request = require('request');

request.post({
    url: "http://localhost:9797/c_register",
     headers: {
        "Content-Type": "application/json"
     },
     body: {
         part:2,
         usermail:"Yee@gmail.com",
         pw:"Surprise",
         username:"Aria",
         userphone:963313808,
     },
     json:true
},function(error, response, body){
    //console.log(error);
    console.log("Is repeat: "+body.isrepeat);
    console.log("random number is: "+body.random);
    console.log("success: "+body.success);
});