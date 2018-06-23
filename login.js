//Login ./routes/login
var http = require('http');
var request = require('request');

request.post({
     url: "http://localhost:9797/d_login",
     headers: {
        "Content-Type": "application/json"
     },
     body: {
       user:"dapppo@gmail.com",
       pw:"ddd9821g",
     },
     json:true
}, function(error, response, body){
   //console.log(error);
   //console.log(JSON.stringify(response));
   //console.log(body.status);
   if(body.did){
     console.log("login success! D_ID is "+body.did);
   }else{
     console.log("login failed :(");
   }
});