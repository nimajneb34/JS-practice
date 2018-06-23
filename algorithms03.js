var fs=require('fs');   //讀取檔案套件匯入
//=====algorithm=====
//=====1.使用動態規劃求二項式係數=====
//二項式係數(動態規劃版)
function bindp(n,k) {   //input n,k & n>=k
    //建立[n+1][k]二維陣列
    var B=new Array(n+1);
    for(var i=0; i<=n; i++){
        B[i]=new Array(k);
    }
    //檢查B[i][j]是否為首末項是則設1；否則設為上一列中同項與前項之和
    for(var i=0; i<=n; i++){
        for(var j=0;j<=Math.min(i,k-1);j++){
            if(j==0||j==i){
                B[i][j]=1;
            }else{
                B[i][j]=B[i-1][j-1]+B[i-1][j];
            }
        }
    }
    //逐行印出
    for(var i=0; i<=n; i++){
        var str="";
        for(var j=0; j<k; j++){
            if(B[i][j]){
                B[i][j]=("             "+B[i][j]).slice(-13);//每個數字佔13位數
                str+=B[i][j];
            }
        }
        console.log(str);
    }
    // console.log(B);
}

//=====.使用動態規劃求=====
//2-1 分割資料
function datasplit(data){
    //將輸入資料 每行分割為一個陣列
    var lines=data.split("\n"); 
    //將分割的陣列推入arr陣列，使arr陣列中每格為一個陣列
    var arr=new Array();
    lines.forEach((line) => {
        arr.push(line);
    });
    //將arr陣列第0格設為n值 表示圖有n個頂點
    var n=arr[0];
    //設arrW陣列為arr陣列但不包含第0格 因為那格為n值
    var arrW=arr.slice(1,arr.length);
    //清空arr陣列
    arr=[];
    //此時arrW陣列應為[["1  2  5"],["1  3  6"]] 的狀態
    //將arrW陣列中每個陣列以每 空兩格 字元切割後產生的數字陣列放入arr陣列
    arrW.forEach((line) => {
        //split(條件)會依據 條件 將字串切割成陣列
        //map(function)會將陣列中每個欄位做 function 後變成新的陣列
        arr.push(line.split("  ").map(Number)); 
    });
    //輸出n值 和 圖形資料的陣列arr
    return [n,arr];
}

//2-2建立相鄰矩陣
function buildarrW(n,data){ 
    // 建立空白相鄰矩陣arrW並全部填0
    var arrW=new Array(Number(n));
    for(var i=0; i<arrW.length;i++){
        arrW[i]=new Array(Number(n));
        for(var j=0; j<arrW[i].length; j++){
            arrW[i][j]=0;
        }
    }
    //將 圖/檔案 之陣列填入相鄰矩陣 ex:("1 2 5") arrW[1-1][2-1]=5
    for(var i=0; i<data.length;i++){
        if(data[i][2]){
            arrW[data[i][0]-1][data[i][1]-1]=data[i][2];
        }
    }
    //將剩餘空位填入Infinity
    for(var i=0; i<n; i++){
        for(j=0; j<n; j++){
            if(arrW[i][j]==0&&i!=j){
                arrW[i][j]=Infinity;
            }
        }
    }
    //輸出相鄰陣列arrW
    return arrW;
}

//2-3.1佛洛伊德最短路徑演算法
function floydD(n,arrW){
    //將相鄰陣列arrW複製到陣列arrD
    var arrD=arrW.map(function(arr){
        return arr.slice();
    });
    // arrD陣列的新值為比較 原位置arrD[i][j] 和 arrD[i][k-1]+arrD[k-1][j]的值大小 新值為較小者
    for(var k=1; k<n; k++){
        for(var i=0; i<n;i++){
            for(var j=0; j<n;j++){
                arrD[i][j]=Math.min(arrD[i][j],arrD[i][k-1]+arrD[k-1][j]);
            }
        }
    }
    //傳出最終陣列arrD
    return arrD;
}

//2-3.2佛洛伊德最短路徑演算法(變異)
function floydP(n,arrW){    
    //將相鄰陣列arrW複製到陣列arrD
    var arrD=arrW.map(function(arr){
        return arr.slice();
    });
    //建立 二維陣列P 並將值設為0
    var arrP=new Array(Number(n));
    for(var i=0; i<arrP.length;i++){
        arrP[i]=new Array(Number(n));
        for(var j=0; j<arrP[i].length; j++){
            arrP[i][j]=0;
        }
    }
    // arrD陣列的新值為比較 原位置arrD[i][j] 和 arrD[i][k-1]+arrD[k-1][j]的值大小 新值為較小者
    // arrP陣列的值為arrD陣列值變化時 紀錄k值
    for(var k=1; k<n; k++){
        for(var i=0; i<n;i++){
            for(var j=0; j<n;j++){
                if(arrD[i][k-1]+arrD[k-1][j]<arrD[i][j]){
                    arrP[i][j]=k;
                    arrD[i][j]=arrD[i][k-1]+arrD[k-1][j];
                }
            }
        }
    }
    //傳出arrD,arrP兩陣列
    return [arrD,arrP];
}

//2-4印出最短路徑
function printpath(arrP,q,r){
    if(arrP[q-1][r-1]!=0){
        printpath(arrP,q,arrP[q-1][r-1]);
        console.log("經頂點 "+arrP[q-1][r-1]);
        printpath(arrP,arrP[q-1][r-1],r);
    }
}

//=====3.序列對齊演算法=====
// 3-1 分割字串轉陣列
function seqAlignParseStr(strX,strY){
    //將輸入的兩字串 strX, strY 每個字元分割後存入陣列 arrX, arrY
    var arrX=strX.split("");
    var arrY=strY.split("");
    // console.log("arrX: %s arrY: %s",arrX,arrY);
    // 以Json格式傳出 arrX 和 arrY
    return{arrX:arrX,arrY:arrY}
}

// 3-2 初始化序列對齊陣列
function seqAlignInit(arrX, arrY){
    //陣列長度需為gap保留一格 長度為原陣列長度+1
    var arrXY = new Array(Number(arrX.length+1));
    for(let i=0;i<arrXY.length;i++){
        arrXY[i] = new Array(Number(arrY.length+1));
    }
    return arrXY;
}

// 3-3 序列對齊
var seqAlignTable=(arrX,arrY,arrXY,penalty, gap)=>{
    //設m,n為陣列長寬
    var m=arrX.length,n=arrY.length;
    //由最右下角開始算 i,j 從陣列尾端開始向 0,0 方向計算
    for(let i=m; i>=0; i--){
        for(let j=n; j>=0; j--){
            //若在底邊則值為 2*(n-j)
            if(i==m){
                arrXY[i][j]=2*(n-j);
            //若在最右側則值為 2*(m-i)
            }else if(j==n){
                arrXY[i][j]=2*(m-i);
            //設值為 (右下方格子的值+penalty) 或 (右方格子的值+gap) 或 (下方格子的值+gap) 最小者
            }else{
                //檢查目前序列位置兩字是否相同 若相同penalty值 為0 否則為原設定的值
                var checkpen=()=>{
                    if(arrX[i]==arrY[j]){
                        return 0;
                    }else {
                        return penalty;
                    }
                }
                arrXY[i][j]=Math.min(arrXY[i+1][j+1] + checkpen() ,arrXY[i+1][j]+gap, arrXY[i][j+1]+gap);
            }
        }
    }
    //傳出序列對齊後的陣列
    return arrXY;
}

// 3-4 檢查最匹配的配對
var seqAlignCheck = (arrX, arrY, arrXY, penalty, gap)=>{
    var m=arrX.length-1,n=arrY.length-1;
    let i=0,j=0,pentotal=0,dnaX=arrX[0],dnaY=arrY[0];
    //從最左上角向右下角檢查最匹配的配對
    while(i<m||j<n){
        //若目前數值符合右側數值+gap則 右側為路徑移動方向
        //在序列X寫入GAP 序列Y寫入此處陣列Y的值
        if(Number(arrXY[i][j])==Number(arrXY[i][j+1])+gap){
            j++;
            if(arrY[j]){
                dnaX+="-";
                dnaY+=arrY[j];
            }
            pentotal+=gap;
        //若目前數值符合下方數值+gap則 下方為路徑移動方向
        //在序列Y寫入GAP 序列X寫入此處陣列X的值
        }else if(Number(arrXY[i][j])==Number(arrXY[i+1][j])+gap){
            i++;
            if(arrX[i]){
                dnaX+=arrX[i];
                dnaY+="-";
            }
            pentotal+=gap;
        //若皆非則右下方為路徑移動方向
        }else{
            i++;j++;
            if(arrX[i]){
                dnaX+=arrX[i];
            }else{
                dnaX+="-";
            }
            if(arrY[j]){
                dnaY+=arrY[j];
            }else{
                dnaY+="-";
            }
            if(arrX[i]!=arrY[j]){pentotal+=penalty;}
        }
        // console.log("DnaX: "+dnaX+" DnaY: "+dnaY+" pentotal: "+pentotal+" i= "+i+" j ="+j);
    }
    return {dnaX:dnaX, dnaY:dnaY, pentotal:pentotal};
}


//execute
//基本

//BinDP
function BinDPTest(){
    console.log("BinDP(30,12)");
    bindp(30,12);
    console.log("\nBinDP(50,12)");
    bindp(50,12);
}

//Floyd
function floydDTestEasy(){

    var data=
        "6\n"+
        "1  4  1\n"+
        "1  5  5\n"+
        "1  6  2\n"+
        "2  1  9\n"+
        "2  3  3\n"+
        "2  4  2\n"+
        "3  4  4\n"+
        "4  3  2\n"+
        "4  5  3\n"+
        "5  1  3\n"+
        "6  2  1";

    var arr = datasplit(data);
    var arrW = buildarrW(arr[0],arr[1]);
    var arrDP=floydP(arr[0],arrW);
    console.log("Floyd Test Basic\nV5 -> V3");
    printpath(arrDP[1],5,3);

}

//加分

function floydDTestHard(){

    var filename="./data500.txt";
    var floydfile = read(filename,(data)=>{
        var arr = datasplit(data);
        var arrW = buildarrW(arr[0],arr[1]);
        var arrDP=floydP(arr[0],arrW);
        console.log("Floyd Test Advanced");
        console.log("V400 -> V11");
        printpath(arrDP[1],400,11);
        console.log("V248 -> V400");
        printpath(arrDP[1],248,400);
    });
}

//=====進階=====

var seqAlign=(strX,strY,penalty,gap)=>{
    console.log("StrX: %s StrY: %s",strX,strY);
    var arr=seqAlignParseStr(strX,strY);
    var arrX=arr.arrX;
    var arrY=arr.arrY;
    var arrXY=seqAlignInit(arrX,arrY);
    arrXY=seqAlignTable(arrX,arrY,arrXY,penalty,gap);
    var result = seqAlignCheck(arrX,arrY,arrXY,penalty,gap);
    var dnaX=result.dnaX;
    var dnaY=result.dnaY;
    var pentotal=result.pentotal;
    console.log("StrX: "+dnaX+" StrY: "+dnaY+" pentotal: "+pentotal);
    return result;
}

var multiseqAlignCompare=(compare,arrStr,penalty,gap)=>{
    var result=[];
    for(let i=0; i<arrStr.length; i++){
        result.push(seqAlign(compare,arrStr[i],penalty,gap));
    }
    // console.log(result);
}


//Test
//基本
//BinDPTest();
// floydDTestEasy();

//加分
// floydDTestHard();

//進階
seqAlign("GTACCCCAT","TGACCGCA",1,2);
multiseqAlignCompare("學問是資管系",["資管系有帥哥","資管界美女","淡江大學有很好的資管系"],3,2);





//fs read
function read(file, callback){
    fs.readFile(file, 'utf8', function(err,data){
        if (err){
            console.log(err);
        }
        callback(data);
    });
}