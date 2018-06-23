var json={
    a001:[{cid:1234},{cid:1235}],
    a002:[{cid:2345},{cid:2346},{cid:2347}]
}
for(var k in json){
    for(var i=0; i<json[k].length;i++){
        console.log(json[k][i].cid);
    }
}
delete yee;