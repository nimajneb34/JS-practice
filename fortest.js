var a1=[2,3,4,1];
var a2=[1,2,3,4];

for(var i=0; i<a1.length; i++){
    for(var j=0; j<a2.length; j++){
        if(a1[i]==a2[j]){
            console.log("break");
            break;
        }console.log(a1[i]+"+"+a2[j]);
    }
}