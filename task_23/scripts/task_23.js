/**
 * Created by Administrator on 2016/8/3.
 */


function render(nodeList, target){
    var list = nodeList.slice(0);
    var lastNode = null,
        currNode = null,
        marked = false;

    // cleat matched style to rematch new target value
    if(document.getElementsByClassName("matched")[0]){
        document.getElementsByClassName("matched")[0].removeAttribute("class");
    }
    clearInterval(this.timer);  // To clean last timer

    this.timer = setInterval(function(){

        // render exit
        if(nodeList.length == 0){
            lastNode.style.background = "#fff";
            clearInterval(this.timer);
            if(!marked){
                alert("Can't find it!");    // when there are no matched value
            }
            return;
        }
        currNode = nodeList.shift();

        // nodeValue contain some useless empty char, split them.
        if(currNode.firstChild.nodeValue.split(/\s+/)[0] == target){
            currNode.className = "matched";
            marked = true;
            currNode.style.background = "#ff6666";
        } else {
            currNode.style.background = "#66ff99";
        }

        if(lastNode != null){
            lastNode.style.background = "#fff";
        }
        lastNode = currNode;
    }, 500)
}

// 前序遍历
function preOrder(node, target){
    var nodeList = [];

    function inner(node){
        if(node != null){

            nodeList.push(node);
            for(var i = 0, len = node.children.length; i < len; i++){
                inner(node.children[i]);
            }
        }
    }
    inner(node);
    return nodeList;
}
// 后序遍历
function postOrder(node, target){
    var nodeList = [];

    function inner(node){
        if(node != null){
            for(var i = 0, len = node.children.length; i < len; i++){
                inner(node.children[i]);
            }

            nodeList.push(node);
        }
    }
    inner(node);
    return nodeList;
}



function init(){
    var binTree = document.getElementsByClassName("binTree")[0],
        preNode = document.getElementsByName("preOrder")[0],
        postNode = document.getElementsByName("postOrder")[0],
        find = document.getElementsByName("find")[0];

    preNode.addEventListener("click", function(){
        var list = preOrder(binTree);
        render(list, find.value);
    })

    postNode.addEventListener("click", function(){
        var list = postOrder(binTree);
        render(list, find.value);
    })

}

init();
