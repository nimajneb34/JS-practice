var test=(str)=>{
    console.log("this is test");
   return Promise.resolve(str);
}

var test1=(str)=>{
    console.log("test1",str);
    return Promise.resolve("test1 done");
}

var test2=(str)=>{
    console.log("test2",str);
    return "test2 done";
}
test("second").then(test1).then(test2).then((str)=>{
    console.log(str);
});

var promisetest=new Promise();
