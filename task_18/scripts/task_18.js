/**
 * Created by Administrator on 2016/7/31.
 */

// JavaScript native Array object contains some queue functions.
// Use constructor to construct object's private attribute, use prototype to construct object's public functions.
var Queue = function(){
    this.q = [];
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

// show queue data in page 
function render(){
    var dip = document.getElementsByClassName("aqi-display")[0],
        html = "",
        i, len;
    
    for(i = 0, len = queue.q.length; i < len; i++){
        
        // Data-index save position in queue of the Div;
        html += "<div data-index=" + i + ">" + queue.q[i] + "</div>";
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
        lout.disabled = false;;
        rout.disabled = false;
    }
}

function buttonHandler(name){
    var partn = /-?[0-9]\d*$/,
        input = document.getElementById("aqi-input").value;

    if(partn.test(input)){
        switch(name){
            case "leftIn":
                queue.push_front(input);
                break;
            case "rightIn":
                queue.push_back(input);
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
        alert("请输入数字");
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
        disp = document.getElementsByClassName("aqi-display")[0];
    queue = new Queue();
    disableOut();

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

}

// Make sure there is a global queue variable;
var queue = null;   
init();