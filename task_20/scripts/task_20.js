/**
 * Created by Administrator on 2016/8/1.
 */

function insertHandler(str){
    arr = str.split(/[,，、\s+]/);
    render(arr);
}

function matchHandler(s){
    var maArr = arr.slice(0);
    
    for(i = 0, len = maArr.length; i < len; i++) {
        if(maArr[i] !== ""){
            var tmp = maArr[i].split(s);
            maArr[i] = "";
            
            // Split matched elements and wrapped with span tag
            for(var j = 0; j < tmp.length - 1; j++){
                maArr[i] += tmp[j] + "<span>" + s + "</span>";
            }
            maArr[i] += tmp[tmp.length - 1];
        }
    }
    render(maArr);
}

function render(arr){
    var dip = document.getElementsByClassName("show")[0],
        html = "",
        i, len;

    for(i = 0, len = arr.length; i < len; i++){
        if(arr[i] !== ""){
            html += "<div>" + arr[i] + "</div>";
        }
    }
    dip.innerHTML = html;
}

function init(){
    var insert = document.getElementsByName("insert")[0],
        match = document.getElementsByName("match")[0],
        matchInput = document.getElementsByName("matchInput")[0],
        txt = document.getElementsByName("txt")[0],
        show = document.getElementsByClassName("show")[0];
    
    insert.addEventListener("click", function(){
        insertHandler(txt.value);
    })
    
    match.addEventListener("click", function(){
        matchHandler(matchInput.value);
    })
}

var arr = [];  
init();