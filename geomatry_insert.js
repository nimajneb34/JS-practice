var oracledb=require('oracledb');
var dbconfig= require("./dbconfig.js");
var array=[23.5,121,23.5,121.1,23.5,121.1];
var sql1_1="update trade_list set polyline= SDO_GEOMETRY(2002,8307,NULL,SDO_ELEM_INFO_ARRAY(1,2,1) , SDO_ORDINATE_ARRAY(";
var sql1_2=")) where Order_no=:id"
var sql2="Select * from table(select t.polyline.sdo_ordinates from trade_list t where Order_NO=:id)";

//insertpolyline();
selectpolyline();
//updatepolyline();

function insertpolyline(){
    var sql_1="insert into polyline (order_NO, latlng) values (:orderno,SDO_GEOMETRY(2002,8307,NULL,SDO_ELEM_INFO_ARRAY(1,2,1) , SDO_ORDINATE_ARRAY(";
    for(var i=0; i<array.length; i++){
        sql_1+=array[i];
        if(i+1!==array.length){
            sql_1+=", ";
        }
    }
    sql_1+=")))";
    console.log(sql_1);
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            console.log("execute");
            connection.execute(sql_1,["O000001"],{autoCommit:true},function(err,result){
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

function selectpolyline(){
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql2,["O000009"],{autoCommit:true},function(err,result){
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

function updatepolyline(){
    var sql1=sql1_1;
    for(var i=0; i<array.length; i++){
        sql1+=array[i];
        if(i+1!==array.length){
            sql1+=",";
        }
    }
    var sql1=sql1+sql1_2;
    console.log(sql1);
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){console.log(err.message);return;}
            connection.execute(sql1,["O000009"],{autoCommit:true},function(err,result){
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


function doRelease(connection)
{
  connection.close(
    function(err) {
      if (err) {
        console.error(err.message);
      }
    });
}