var fs=require('fs');
var oracledb=require('oracledb');
var filename= './fstest.json';
var dbconfig= require("./dbconfig.js");

/*
//get array from sql and turn to json in array
function getmanager(){
    var sql="Select * from manager";
    oracledb.getConnection(
        dbconfig,function(err,connection){
            if(err){
                console.log(err.message);
                return;
            }
            connection.execute(
                sql,function(err,result){
                    if (err) {
                        console.error(err.message);
                        doRelease(connection);
                        return;
                    }
                    var data=result.rows;
                    var manager=[];
                    for(var i=0; i<data.length; i++){
                        var mid=data[i][0];
                        var account=data[i][1];
                        var password=data[i][2];
                        var newmanager={
                            "m_id":mid,
                            "account":account,
                            "password":password
                        };
                        manager.push(newmanager);
                    }
                    obj=JSON.stringify(manager,null,2);
                    fs.writeFile(filename,obj);
                    console.log(obj);
                }
            )
        }
    )
}
*/
//getmanager();
var datasync=fs.readFileSync(filename);
var obj=JSON.parse(datasync);
for(var i=0; i<obj.length; i++){
    if(obj[i].m_id=="M000020"){
        console.log("account: "+obj[i].account);
        obj[i].account="YeeStar";
    }
}
fs.writeFileSync(filename,JSON.stringify(obj,null,"\t"));

/*
var data=fs.readFile(filename,function(err,data){
    var obj=JSON.parse(data);
    console.log(obj.manager.length);
    
    for(var i=0; i<obj.manager.length; i++){
        if(obj.manager[i].M_ID=="00001"){
            obj.manager[i].pw="new_answer01";
        }
        console.log(obj.manager[i].pw);
    }
    
    var data=JSON.stringify(obj,null,2);
    fs.writeFile(filename,data);
});
*/

//json=JSON.stringify(obj,null,"\t");

//fs.writeFile(filename,json);