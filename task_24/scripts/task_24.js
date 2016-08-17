/**
 * Created by Administrator on 2016/8/3.
 */

function addClassName(obj, name){
    var cls = obj.className;
    if(cls.indexOf(name) == -1){
        obj.className =cls + " " + name;
    }
}

function removerClassName(obj, name){
    var cls = obj.className;
    if(cls.indexOf(name) > -1){
        var tmp = cls.split(/\s+/);
        for(var i = 0, len = tmp.length; i < len; i++){
            if(tmp[i] == name){
                tmp.splice(i,1);
            }
        }
        obj.className = tmp.join(" ");
    }
}

function render(nodeList, target){
    var list = nodeList.slice(0);
    var lastNode = null,
        currNode = null,
        marked = false;

    // cleat matched style to rematch new target value
    var matched = document.getElementsByClassName("matched")[0];
    if(matched){
        removerClassName(matched, "matched");
    }
    clearInterval(this.timer);  // To clean last timer

    this.timer = setInterval(function(){

        // render exit
        if(nodeList.length == 0){
            removerClassName(lastNode, "traveling");
            clearInterval(this.timer);
            if(!marked){
                alert("Can't find it!");    // when there are no matched value
            }
            return;
        }
        currNode = nodeList.shift();

        // nodeValue contain some useless empty char, split them.
        if(currNode.firstChild.nodeValue.split(/\s+/)[0] == target){
            addClassName(currNode, "matched");      // if node's value matched target value, then add "matched" style
            marked = true;
        } else {
            addClassName(currNode, "traveling");       // when program have travel to the node, add "traveling' style
        }

        if(lastNode != null){
            removerClassName(lastNode, "traveling")
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
        find = document.getElementsByName("find")[0],
        addNode = document.getElementsByName("addNode")[0],
        delNode = document.getElementsByName("delNode")[0];

    // previous order traverse btn
    preNode.addEventListener("click", function(){
        var list = preOrder(binTree);
        render(list, find.value);
    })

    // post order traverse btn
    postNode.addEventListener("click", function(){
        var list = postOrder(binTree);
        render(list, find.value);
    })

    // add tree nodes' hover style
    binTree.addEventListener("mouseover", function(even){
        var target = event.target;
        addClassName(target, "mouseOn");
    })

    binTree.addEventListener("mouseout", function(even){
        var target = event.target;
        removerClassName(target, "mouseOn");
    })

    // Let a clicked tree node be selected state
    binTree.addEventListener("click", function(even){
        var target = event.target,
            selected = document.getElementsByClassName("selected")[0];
        if(selected){
            removerClassName(selected, "selected");
        }
        addClassName(target, "selected");
    })

    // delete selected node and its child nodes
    delNode.addEventListener("click", function(){
        var selectedNode = document.getElementsByClassName("selected")[0];
        if(selectedNode){
            selectedNode.parentNode.removeChild(selectedNode);
        } else {
            alert("请选中一个节点！");
        }

    })

    // add a node to last of selected node's child nodes
    addNode.addEventListener("click", function(){
        var addTxtNode = document.getElementsByName("addTxt")[0],
            selectedNode = document.getElementsByClassName("selected")[0],
            divNode = document.createElement("div"),
            txtNode = document.createTextNode(addTxtNode.value);
        divNode.appendChild(txtNode);
        if(selectedNode){
            selectedNode.appendChild(divNode);
        } else {
            alert("请选中一个节点！");
        }

    })

    // click outside to cancel node's selected state
    document.addEventListener("click", function(event){
        var selectedNode = document.getElementsByClassName("selected")[0],
            target = event.target;
        if(target.nodeName != "DIV" && target.nodeName != "INPUT"){
            if(selectedNode){
                removerClassName(selectedNode, "selected");
            }
        }
    })

}

// main entry
init();
