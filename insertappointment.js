var dbconfig= require("./dbconfig.js");
var oracledb = require('oracledb');

checktablenull();

function checktablenull(){
    var sql = `select count(*) from appointment`;

    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql,function(err,result){
                if(err){
                    console.log(err.message);
                    doRelease(connection);
                    return;
                }
                doRelease(connection);
                //console.log(result.rows);
                if(result.rows.length>0){
                    console.log("current rows: "+result.rows[0][0]);
                    if(result.rows[0][0]==0){
                        count();
                    }else{
                        selectlast();
                    }
                }
            })
        }
    );

}

function selectlast(){
    var sql = "select max(A_ID) from appointment";
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql,function(err,result){
                if(err){
                    console.log(err.message);
                    doRelease(connection);
                    return;
                }
                doRelease(connection);
                //console.log(result.rows);
                if(result.rows.length>0){
                    console.log(result.rows[0][0]);
                    insertlast(result.rows[0][0]);
                }
            })
        }
    );
}

function count(){
    var sql = "select count(*) from appointment";
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql,function(err,result){
                if(err){
                    console.log(err.message);
                    doRelease(connection);
                    return;
                }
                doRelease(connection);
                //console.log(result.rows);
                if(result.rows.length>0){
                    console.log("current rows count: "+result.rows[0][0]);
                    insertfirst();
                }
            })
        }
    );
}

function insertfirst(){
    var sql="insert into appointment (A_ID, status, C_ID, D_ID, Time, location, destination) values(:A_ID, :Status, :C_ID, :D_ID, to_date(:TIME,'YYYY-MM-DD HH24:mi'), :Location, :destination )";
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql,["A000001",3,"C000001","D000001","2018-01-15 15:30","新北市淡水區北新路182巷32號","新北市淡水區英專路151號"],{autoCommit:true},function(err,result){
                if(err){
                    console.log(err.message);
                    doRelease(connection);
                    return;
                }
                doRelease(connection);
                //console.log(result.rows);
                if(result.rowsAffected){
                    console.log("Rows Inserted: "+result.rowsAffected);
                }
            })
        }
    );
}

function insertlast(Old_AID){
    var sql="insert into appointment (A_ID, status, C_ID, D_ID, Time, location, destination) values(:A_ID, :Status, :C_ID, :D_ID, to_date(:TIME,'YYYY-MM-DD HH24:mi'), :Location, :destination )";
    var New_AID=Number(Old_AID.slice(1))+1;
    New_AID="00000"+New_AID;
    New_AID="A"+New_AID.slice(-6);
    console.log("new A_ID: "+New_AID);
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql,[New_AID,3,"C000002","D000002","2018-01-16 15:30","新北市淡水區北新路182巷32號","新北市淡水區英專路151號"],{autoCommit:true},function(err,result){
                if(err){
                    console.log(err.message);
                    doRelease(connection);
                    return;
                }
                doRelease(connection);
                //console.log(result.rows);
                if(result.rowsAffected){
                    console.log("Rows Inserted: "+result.rowsAffected);
                }
            })
        }
    );
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
