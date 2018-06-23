var json={
    test1:"yee",
    test2:"no"
}

console.log(JSON.stringify(json));
delete json.test3;
console.log(JSON.stringify(json));