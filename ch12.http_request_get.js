import { stringify } from 'querystring';

/**
 * Created by king on 15-6-16.
 *
 * ch12.http_request_get.js
 */
console.info("------   http - client get   ------");
console.info();
var https = require('https');     // TODO: 引入http模組
/**
 * 發送 HTTP GET 請求
 */
https.get("https://api.thingspeak.com/channels/374268/feeds.json?api_key=4KE1MJLYOBRM20KN&results=5",
    /**
     * GET 回調函數
     * @param res
     */
    function(res) {
        console.log('STATUS: ' + res.statusCode);   // TODO: 列印輸出Status_Codes響應狀態碼
        console.info();
        res.setEncoding('utf8');
        /**
         * 監聽"data"事件處理函數
         */
        res.on('data', function (chunk) {
            console.log('BODY: ' + JSON.stringify(chunk) );  // TODO: 列印輸出服務器回寫內容
            console.info();
        });
        console.info();
}).on('error',
    /**
     * “error”事件回調函數
     * @param e
     */
    function(e) {
        console.log("Got error: " + e.message); // TODO: 列印輸出“error”訊息
        console.info();
});