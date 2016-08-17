/**
 * Created by Administrator on 2016/8/2.
 */

function render(nodeList){
    var list = nodeList.slice(0);
    var lastNode = null,
        currNode = null;
    var timer = setInterval(function(){
        if(nodeList.length == 0){
            lastNode.style.background = "#fff";
            clearInterval(timer);
            return;
        }
        currNode = nodeList.shift();
        currNode.style.background = "#66ff99";
        if(lastNode != null){
            lastNode.style.background = "#fff";
        }
        lastNode = currNode;
    },1000)
}

// 前序遍历
function preOrder(node){
    var nodeList = [];
    function inner(node){
        if(node != null){
            nodeList.push(node);
            inner(node.firstElementChild);
            inner(node.lastElementChild);
        }
    }
    inner(node);
    return nodeList;
}


// 中序遍历
function inOrder(node){
    var nodeList = [];
    function inner(node){
        if(node != null){
            inner(node.firstElementChild);
            nodeList.push(node);
            inner(node.lastElementChild);
        }
    }
    inner(node);
    return nodeList;
}

// 后续遍历
function postOrder(node){
    var nodeList = [];
    function inner(node){
        if(node != null){
            inner(node.firstElementChild);
            inner(node.lastElementChild);
            nodeList.push(node);
        }
    }
    inner(node);
    return nodeList;
}

function init(){
    var binTree = document.getElementsByClassName("binTree")[0],
        preNode = document.getElementsByName("preOrder")[0],
        inNode = document.getElementsByName("inOrder")[0],
        postNode = document.getElementsByName("postOrder")[0];

    preNode.addEventListener("click", function(){
        var list = preOrder(binTree);
        render(list);
    })

    inNode.addEventListener("click", function(){
        var list = inOrder(binTree);
        render(list);
    })

    postNode.addEventListener("click", function(){
        var list = postOrder(binTree);
        render(list);
    })
}
init();
