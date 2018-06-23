var oracledb=require('oracledb');
var dbconfig= require("./dbconfig.js");
var like="00,01,02,";
if(like.slice(-1)==",") like=like.slice(0,like.length-1);
var like_arr=like.split(",");
like="";
for(var i=0; i<like_arr.length; i++){
    like+="number_area like '%"+like_arr[i]+"%'"
    if(i+1<like_arr.length){
        like=like+" or ";
    }
}

var sql="select D_ID from business_range where "+like;
selectlike();

function selectlike(){
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql,{},{autoCommit:true},function(err,result){
                if(err){
                    console.log(err.message);
                    doRelease(connection);
                    return;
                }
                doRelease(connection);
                console.log("date: "+result.rows);
                //console.log(result.rowsAffected);
            })
        }
    )
}

function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}