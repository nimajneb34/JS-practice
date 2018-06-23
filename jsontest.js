var json={};
var test="yee";
json[test]="no";
console.log("json[\"yee\"]: "+json["yee"]);
console.log(JSON.stringify(json));
json.yee="yes";
console.log("  json.yee: "+json.yee);
console.log(JSON.stringify(json));
var yee2={yee:"yeeee"};

console.log(JSON.stringify(yee2));