var async = require('async');
var http = require('http');     // TODO: 引入http模組
var url = require('url');       // TODO: 引入url模組
var qs = require('querystring');    // TODO: 引入querystring模組
var dbConfig = require('./dbconfig.js');
var oracledb = require('oracledb');

var doconnect = function(cb) {
  oracledb.getConnection(dbConfig, cb);
};

var doRelease = function(conn) {
  conn.close(function (err) {
    if (err)
      console.error(err.message);
  });
};

var managerobj={}
var key="Manager";
managerobj[key]=[];

var doselect = function(conn,cb){
    conn.execute(
        "Select * from Manager",
        function(err,result){
            if(err){
                console.log(err.message);
                return cb(err,conn);
            }
            else{
                var meta1=result.metaData[1];
                var res1=result.rows[0][0];
                var data={
                    meta1: res1
                };
                managerobj[key].push(data);
            }
        }
    )    
};



http.createServer(function(req, res){
    res.writeHead(200,{"Content-Type":"text/html"});
    login();
    //doconnect;
    //doselect;
    res.end(JSON.stringify(managerobj));
}).listen(6868);

function login(){
    oracledb.getConnection(
    {
        user          : dbConfig.user,
        password      : dbConfig.password,
        connectString : dbConfig.connectString
    },
    function(err, connection)
    {
        if (err) {
        console.error(err.message);
        return;
        }

        connection.execute(
            "Select * from Manager",
            function(err,result)
            {
                if (err) {
                  console.error(err.message);
                  doRelease(connection);
                  return;
                }
                var meta1=result.metaData[0].name;
                var res1=result.rows[0][0];
                var data={
                    MID : res1
                };
                managerobj[key].push(data);
                doRelease(connection);
            }
        )
    });
}

