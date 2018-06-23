/**
 * Created by king on 15-6-14.
 *
 * ch12.http_response_get.js
 */
console.info("------   http - server get   ------");
console.info();
var http = require('http');     // TODO: 引入http模組
var url = require('url');       // TODO: 引入url模組
var qs = require('querystring');    // TODO: 引入querystring模組
/**
 * 使用http.createServer()函數方法建立服務器
 */
http.createServer(function(req, res) {
    /**
     * 通過res.writeHeader()函數方法寫HTTP檔案頭
     */
    res.writeHead(200, {'Content-type' : 'text/plain'});
    /**
     * 通過url.parse()函數方法取得查詢字段
     */
    var query = url.parse(req.url).query;
    console.info(query);
    console.info();
    /**
     * 通過res.end()函數方法發送響應狀態碼,並通知服務器訊息完成
     */
    var qs_parse = qs.parse(query);
    console.info(qs_parse);
    console.info();
    res.end(JSON.stringify(qs_parse));
}).listen(6868);    // TODO: 監聽6868端口號