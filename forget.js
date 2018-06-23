//Login ./routes/login
var http = require('http');
var request = require('request');

request.post({
     url: "http://localhost:9797/forget",
     headers: {
        "Content-Type": "application/json"
     },
     body: {
       usermail:"daniel71631@yahoo.com.tw"
     },
     json:true
}, function(error, response, body){
   //console.log(error);
   //console.log(JSON.stringify(response));
   //console.log(body.status);
   console.log("success: "+body.success);
   if(body.success){
     console.log("已經寄信");
   }else{
     console.log("查無信箱");
   }
});