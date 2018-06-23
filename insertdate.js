var oracledb=require('oracledb');
var dbconfig= require("./dbconfig.js");

var sql1="Update driver set birthday=to_date(:birthday,'YYYY-MM-DD HH24:mi') where D_ID=:DID";
var sql2="select to_char from driver where D_ID=:did";
var birth="1987-04-21 14:35";

//selectbirth();
//updatebirth();


function updatebirth(){
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql1,[birth,"D000020"],{autoCommit:true},function(err,result){
                if(err){
                    console.log(err.message);
                    doRelease(connection);
                    return;
                }
                doRelease(connection);
                //console.log("date: "+result.rows[0]);
                console.log(result.rowsAffected);
            })
        }
    )
}

function selectbirth(){
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql2,["D000020"],{autoCommit:true},function(err,result){
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