var oracledb=require('oracledb');
var dbconfig= require("./dbconfig.js");
var did="D000005,";
if(did.slice(-1)==",") did=did.slice(0,did.length-1);
did="'"+did.split(',').join('\',\'')+"'";

selectin();

function selectin(){
    var sql="select D_ID,NAME,Sexuality,to_CHAR(birthday,'YYYY'),KIND,M_YEAR,COLOR,brand from driver NATURAL JOIN vehicle where T_COPSE is not null and Sexuality=:sex and D_ID IN  ("+did+")";
    
    console.log("sql",sql);
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql,{sex:"男"
            },{autoCommit:true},function(err,result){
                if(err){
                    console.log(err.message);
                    doRelease(connection);
                    return;
                }
                doRelease(connection);
                console.log("name: "+JSON.stringify(result.rows));
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