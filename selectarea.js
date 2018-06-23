var oracledb=require('oracledb');
var dbconfig=require("./dbconfig.js");
select();
function select(){
    var sql="select D_ID, name from driver where sexuality=:sex and D_ID in(select D_ID from Business_range where number_area like('%02%'))";
    console.log("sql: "+sql);
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql,["女"],function(err,result){
                if(err){
                    console.log(err.message);
                    doRelease(connection);
                    return;
                }
                doRelease(connection);
                console.log(result.rows);
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