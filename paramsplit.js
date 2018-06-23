var all="yee,help,yes,";
console.log(all.length);
if(all.slice(-1)==",") all=all.slice(0,all.length-1);
//all.slice(-1);
console.log(all);
var ids = all.split(',').join('\',\'');
console.log(ids);