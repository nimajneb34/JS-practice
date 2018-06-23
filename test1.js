var oracle = require('./selectexport.js');
sql="select C_ID from customer";
oracle.select(sql,(result)=>{
    console.log(result);
});