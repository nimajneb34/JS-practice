var arrays=[
    {
        sid:"S002",
        distance:988,
        time:1234
    },
    {
        sid:"s003",
        distance:744,
        time:1230
    },
    {
        sid:"s004",
        distance:1022,
        time:2036
    }
];

var json={array:arrays}

function showarray(arrays){
    for(var i=0; i<arrays.length; i++){
        console.log("arrays["+i+"]: "+JSON.stringify(arrays[i]));
    }
}
console.log("json: "+JSON.stringify(json));
showarray(json.array);
json.array.sort(function(a,b){
    return a.distance - b.distance;
});
showarray(json.array);
