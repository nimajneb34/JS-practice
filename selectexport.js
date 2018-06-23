var oracledb=require('oracledb');
var dbconfig=require("./dbconfig.js");

module.exports = {
    select: (sql,cb)=>{
        oracledb.getConnection(
            dbconfig,(err,connection)=>{
                if(err){console.error(err.message);return;}
                connection.execute(sql,(err,result)=>{
                    dorelease(connection);
                    if(result.rows.length>0){
                        cb(result.rows);
                    }
                })
            }
        )
    },

    selectp: (sql,params,cb)=>{
        oracledb.getConnection(
            dbconfig,(err,connection)=>{
                if(err){console.error(err.message);return;}
                connection.execute(sql,params,(err,result)=>{
                    dorelease(connection);
                    if(result.rows.length>0){
                        cb(result.rows);
                    }
                })
            }
        )
    }
}

var dorelease = (connection)=>{
    connection.close((err)=>{
        if(err){console.error(err.message);}
    });
}