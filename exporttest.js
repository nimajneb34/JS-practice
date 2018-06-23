var dbconfig= require("./dbconfig.js");
var oracledb = require('oracledb');
module.exports = {
    select: function(sql){
        oracledb.getConnection(
            dbconfig,function(err,connection){
                if(err){
                    console.log(err.message);
                    return;
                }
                connection.execute(
                    sql,function(err,result){
                        if(err){
                            console.log("error: "+err.message);
                            doRelease(connection);
                            return;
                        }
                        if(result.rows.length>0){
                            //console.log(result.rows);
                            return result.rows;
                        }
                    }
                )
            }
        )
    },
    selectp: function(sql,params){
        oracledb.getConnection(
            dbconfig,function(err,connection){
                if(err){
                    console.log(err.message);
                    return;
                }
                connection.execute(
                    sql,params,function(err,result){
                        if(err){
                            console.log("error: "+err.message);
                            doRelease(connection);
                        }
                        if(result.rows.length>0){
                            return result.rows;
                        }

                    }
                )
            }
        )
    }
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
