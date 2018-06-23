var oracledb=require('oracledb');
var dbconfig=require("./dbconfig.js");

//select();
function select(){
    var sql="select * from (\
        select D_ID, Name from driver order by DBMS_RANDOM.value\
    ) where rownum <16 order by D_ID";
    console.log("sql: "+sql);
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
                console.log(result.rows);
            })
        }
    )
}
select2();

function select2(){
    
    var cond={
        sexuality:["男","女"],
        kind:["小客車","轎車"],
        color:["黃色","黑色"],
        brand:["Toyota","福特","賓士","寶馬"],
        area:["01","05","03","04","02"]
    }
    var sqlarr=[];
    var sql="select D_ID, name from Driver ";
    if(cond.sexuality.length>0){
        sql+="where sexuality in ('"+cond.sexuality.join("','")+"')";
    }
    if(cond.kind.length>0||cond.color.length>0||cond.brand.length>0){
        sql+="and D_ID in ( Select D_ID from vehicle where ";
    }
    if(cond.kind.length>0){
        sqlarr.push("kind in ('"+cond.kind.join("','")+"')");
    }
    if(cond.color.length>0){
        sqlarr.push("color in ('"+cond.color.join("','")+"')");
    }
    if(cond.brand.length>0){
        sqlarr.push("brand in ('"+cond.brand.join("','")+"'))");
    }
    sql+=sqlarr.join(" and ");
    if(cond.area.length>0){
        sql+="and D_ID in ( Select D_ID from Business_range where number_area like( '%"
        +cond.area.join("%') or number_area like ('%")+"%'))";
    }
    console.log(sql);
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