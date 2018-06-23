var oracledb=require('oracledb');
var dbconfig= require("./dbconfig.js");
var array=[23.5,114,54.5,112];
inserttradelist();

function inserttradelist(){
        var sql = "Insert into Trade_list (D_ID,D_Name,C_ID,C_NAME,ON_TIME,LEFT_TIME,money,polyline) values(:did,:dname,:cid,:cname,TO_TIMESTAMP(:ontime,'YYYY-MM-DD HH24:MI'),TO_TIMESTAMP(:offtime,'YYYY-MM-DD HH24:MI'),:money,SDO_GEOMETRY(2002,8307,NULL,SDO_ELEM_INFO_ARRAY(1,2,1) , SDO_ORDINATE_ARRAY(";
        for(var i=0; i<array.length; i++){
            sql+=array[i];
            if(i+1!==array.length){
                sql+=", ";
            }
        }
        sql+=")))";
        
        console.log(sql);
        oracledb.getConnection(
            dbconfig,function(err,connection){
                if(err){console.log(err.message);return;}
                connection.execute(sql,{
                    did:"D000008",
                    dname:"yee",
                    cid:"C000003",
                    cname:"nooo",
                    ontime:"2017-09-14 13:08",
                    offtime:"2017-09-14 14:08",
                    money:500
                },{autoCommit:true},function(err,result){
                    if(err){
                        console.log(err.message);
                        doRelease(connection);
                        return;
                    }
                    doRelease(connection);
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