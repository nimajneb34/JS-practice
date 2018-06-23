var https=require('https');
https.get("https://api.thingspeak.com/channels/374268/feeds.json?api_key=4KE1MJLYOBRM20KN&results=5&timezone=Asia/Taipei&",
    function(res){
        res.setEncoding('utf8');
        res.on('data',function(rawdata){
            data=JSON.parse(rawdata);
            var day=data.feeds[4].created_at;
            var new_day=day.slice(0,10)+" "+day.slice(11,18);
            console.log(new_day);
            var date = new Date(new_day);
            console.log(
                "Date: "+date+" \n "+date.getFullYear()+"年"+date.getMonth()
                +"月"+date.getDate()+"日\n時間："
                +date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()
            )
            //console.log(data);
            /*
            for(var i=0; i<data.length; i++){
                console.log("No. "+i+" record, time: "+ data[i].created_at)
            }
            */
        });
    }
)
