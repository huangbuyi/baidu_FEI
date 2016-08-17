/**
 * Created by Administrator on 2016/7/31.
 */

// JavaScript native Array object contains some queue functions.
// Use constructor to construct object's private attribute, use prototype to construct object's public functions.
var Queue = function(){
    this.q = [77,10,30,20,55,67];
}

Queue.prototype = {
    push_front: function (a) {
        this.q.unshift(a);
    },
    push_back: function (a) {
        this.q.push(a);
    },
    pop_front: function () {
        return this.q.shift();
    },
    pop_back: function () {
        return this.q.pop();
    },
    erase: function (pos) {
        this.q.splice(pos, 1);
    },
    is_empty: function () {
        return this.q.length === 0;
    }
}
function bubbleSort() {
     var arr = queue.q,
     len = arr.length;
    
    // javascript没有sleep，通过延时函数循环调用代替for循环。 
    function xxx(i, j) {
        var delay = 0;
        if(arr[j + 1] < arr[j]){
            var tmp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = tmp;
            delay = 1000;
            render();
        }
        j++;
        
        // 循环终止条件
        if(j == len - 1 - i){
            i++;
            j = 0
            if (i == len - 1) {
                return;
            }
        }
        
        // 闭包传递参数
        setTimeout((function () {
            return function () {
                xxx(i, j)
            }
        })(i, j), delay);
    }
    xxx(0, 0);
}

// show queue data in page 
function render(){
    var dip = document.getElementsByClassName("aqi-display")[0],
        html = "",
        i, len;
    
    for(i = 0, len = queue.q.length; i < len; i++){
        
        // Data-index save position in queue of the Div;
        html += "<div data-index=" + i + " style='height:" + queue.q[i] + "px'></div>";
    }
    dip.innerHTML = html;
}

// When if queue is empty, you can't click button delete element form queue.
function disableOut(){
    var lout = document.getElementsByName("leftOut")[0],
        rout =  document.getElementsByName("rightOut")[0];
    
    if(queue.is_empty()){
        lout.disabled = true;
        rout.disabled = true;
    } else {
        lout.disabled = false;
        rout.disabled = false;
    }
}
function buttonHandler(name){
    var partn = /-?[0-9]\d*$/,
        input = document.getElementById("aqi-input"),
        inVal = input.value;

    if(partn.test(inVal) &&　inVal >= 10 && inVal <= 100 && queue.q.length <= 60){
        switch(name){
            case "leftIn":
                queue.push_front(inVal);
                break;
            case "rightIn":
                queue.push_back(inVal);
                break;
            case "leftOut":
                alert( queue.pop_front() );
                break;
            case "rightOut":
                alert( queue.pop_back() );
                break;
        };
        disableOut();
        render();
    } else {
        if(queue.q.length > 60){
            input.value = "队列元素不能超过60个";
        } else {
            input.value = "请输入10-100范围内的数字";
        }
       
    }
}

function delHandler(index){

    if(typeof index === "string"){
        queue.erase(index);
        disableOut();
        render();
    }
}

function init(){
    var form = document.getElementById("aqi-opera"),
        disp = document.getElementsByClassName("aqi-display")[0],
        sort = document.getElementById("aqi-sort");
    queue = new Queue();
    disableOut();
    render();

    form.addEventListener("click", function(event){
        var target = event.target;

        if(target.nodeName == "BUTTON"){
            buttonHandler(target.name);
        };
    })

    disp.addEventListener("click", function(event){
        var target = event.target,
            index =  target.getAttribute("data-index");
        delHandler(index);
    })

    sort.addEventListener("click", function(event){
        var target = event.target;
        if(target.nodeName == "BUTTON"){
            if(target.name === "bubble"){
                bubbleSort();
                render();
            }
        };
    })


}

// Make sure there is a global queue variable;
var queue = null;   
init();
