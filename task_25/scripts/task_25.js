/**
 * Created by Administrator on 2016/8/3.
 */

function addClassName(obj, name){
    var cls = obj.className;
    if(cls.indexOf(name) == -1){
        obj.className =cls + " " + name;
    }
}

function removeClassName(obj, name){
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

// hide or show object
function toggle(obj){
    if(obj.nodeType == 1){
        var style = obj.style;
        if(style.display == "none"){
            style.display = "";
        } else {
            style.display = "none";
        }
    }
}

function initTree(){
    var tree = document.getElementsByClassName("fileTree")[0],
        search = document.getElementsByName("4bin-tree-search")[0];

    search.addEventListener("keyup", function(){
        var tree = document.getElementsByClassName("fileTree")[0],
            value = this.value,
            ul = tree.getElementsByTagName("ul")[0];

        function match(li){
            var aTag = li.getElementsByTagName("a")[0],
                aTxt = aTag.innerText;
            if(aTxt.indexOf(value) > -1){
                var arr = aTxt.split(value);
                aTxt = arr.join("<strong>" + value + "</strong>");

            }
            aTag.innerHTML = "<span></span><i></i>" + aTxt;
        }
        match(ul.firstElementChild);
    })

    tree.addEventListener("click", function(event){
        var target = event.target,
            selected = this.getElementsByClassName("selected")[0];

        // 点击I标签相当于点击其父节点A标签
        if(target.nodeName == "I" && target.parentNode){
            target = target.parentNode;
        }
        if(target.nodeName == "A"){

            if(selected){
                removeClassName(selected, "selected");
            }
            addClassName(target, "selected");
        }
        
        // 单击三角形图片（span标签）展开文件夹
        if(target.nodeName == "SPAN" && target.parentNode){
            var ul = target.parentNode.parentNode.getElementsByTagName("ul")[0];
            if( ul ){

                // 改变三角形图标（span标签）样式，向下为展开，向右为收起
                if(target.className.indexOf("show") > -1){
                    removeClassName(target, "show")
                } else {
                    addClassName(target,"show")
                }

                // 展开/收起文件（显示/隐藏的ul标签）
                toggle(ul);
            }
        }
    })

    tree.addEventListener("dblclick", function(event){
        var target = event.target;

        // 点击I标签相当于点击其父节点A标签
        if(target.nodeName == "I" && target.parentNode){
            target = target.parentNode;
        }

        // 双击A标签展开文件夹（显示隐藏的ul标签）
        if(target.nodeName == "A" && target.parentNode){
            var ul = target.parentNode.getElementsByTagName("ul")[0];

            if( ul ){
                var span = target.getElementsByTagName("span")[0];

                // 改变三角形图标（span标签）样式，向下为展开，向右为收起
                if(span.className.indexOf("show") > -1){
                    removeClassName(span, "show")
                } else {
                    addClassName(span,"show")
                }

                // 展开/收起文件（显示/隐藏的ul标签）
                toggle(ul);
            }
        }
    })

    // 添加自定义上下文菜单事件
    tree.addEventListener("contextmenu", function(event){
        var target = event.target,
            context = document.getElementsByClassName("contextMenu")[0];

        // 右击打开上下文菜单，触发点击选中效果
        if(target.nodeName == "A"){
            target.click();
        }

        // 在鼠标右击位置显示自定义上下文菜单
        context.style.left = event.clientX + "px";
        context.style.top = event.clientY + "px";
        context.style.display = "";

        // 阻止默认上下文菜单
        event.preventDefault();

        // 点击界面隐藏自定义菜单
        document.addEventListener("click", function(){
            var show = context.getElementsByClassName("show")[0],
                selected = context.getElementsByClassName("selected")[0];
            if(selected){
                removeClassName(selected, "selected");
            }
            if(show){
                removeClassName(show, "show");
            }

            context.style.display = "none";
            document.onclick = null;
        })
    })
}

function initContext() {
    var context = document.getElementsByClassName("contextMenu")[0];
    
    context.addEventListener("mouseover", function(event){
        var target = event.target,
            show = target.parentNode.getElementsByClassName("show")[0],
            selected = null;

        if(target.nodeName == "LI"){

            // 添加选中样式
            selected = target.parentNode.getElementsByClassName("selected")[0];
            if(selected){
                removeClassName(selected, "selected");
            }
            addClassName(target, "selected");

            // 关闭已打开的子菜单
            if(show){
                removeClassName(show, "show");
            }

            // 打开此项的子菜单
            if(target.firstElementChild && target.firstElementChild.nodeName.toLowerCase() == "ul"){
                addClassName(target.firstElementChild, "show")
            }
        }
    })

    context.addEventListener("mouseout", function(){
        var target = event.target,
            selected = null;

        // 鼠标移出菜单，取消菜单中项目的选中状态，但如果移出的是含有子菜单的项目，则不执行
        // 对于最外部的子菜单，鼠标移出时取消菜单中的选中状态，子菜单对应父菜单选中仍要保持选中状态
        if (target.nodeName == "LI" && !target.firstElementChild) {

            selected = target.parentNode.getElementsByClassName("selected")[0];
            if (selected) {
                removeClassName(selected, "selected");
            }
        }
    });

    // 阻止自定义菜单栏的默认上下文菜单事件
    context.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    })
}

function initMenu(){
    var context = document.getElementsByClassName("contextMenu")[0];

    context.addEventListener("click", function(event){
        var target = event.target,
            clsName = target.className;
        if(target.nodeName == "LI" && clsName){

            if(clsName.indexOf("createDir") > -1) {
                createDir();
            }

            if(clsName.indexOf("createFile") > -1) {
                createFile();
            }

            if(clsName.indexOf("deleteFile") > -1) {
                deleteFile();
            }

            if(clsName.indexOf("copyFile") > -1) {
                copyFile();
            }

            if(clsName.indexOf("pasteFile") > -1) {
                pasteFile();
            }

            if(clsName.indexOf("cutFile") > -1) {
                copyFile();     // todo 剪切的文件在黏贴后才会删除
                deleteFile();
            }

            if(clsName.indexOf("reName") > -1) {
                reName();
            }
        }
    })
}

function createDir(){
    var tree = document.getElementsByClassName("fileTree")[0],
        selected = tree.getElementsByClassName("selected")[0],
        ul = selected.parentNode.getElementsByTagName("ul")[0];
    if(!ul){
        ul = selected.parentNode.parentNode;
    }
    if(ul.nodeName == "UL"){

        setTimeout(function(){
            var name = prompt("请输入新文件夹的名称","新建文件夹");
            if(name){
                if(name && name != ""){
                    removeClassName(selected, "selected");
                    var li = document.createElement("li");
                    li.innerHTML = "<a class='selected' data-type='dir' href='javascript:void(0)'><span></span><i></i>" + name + "</a><ul></ul>"
                    ul.appendChild(li);
                    ul.style.display = "";
                } else {
                    alert("名称不能为空");
                    createDir();
                }
            }
        }, 50)
    }
}

function createFile(){
    var tree = document.getElementsByClassName("fileTree")[0],
        selected = tree.getElementsByClassName("selected")[0],
        ul = selected.parentNode.getElementsByTagName("ul")[0];
    if(!ul){
        ul = selected.parentNode.parentNode;
    }
    if(ul.nodeName == "UL"){

        // 延时对话框弹出的时间，保证自定义菜单消失后确认框再出现
        setTimeout(function(){
            var name = prompt("请输入新文件的名称", "新文件");
            if(name){
                if(name != ""){
                    removeClassName(selected, "selected");
                    var li = document.createElement("li");
                    li.innerHTML = "<a class='selected' data-type='file' href='javascript:void(0)'><span></span><i></i>" + name + "</a>"
                    ul.appendChild(li);
                    ul.style.display = "";
                } else {
                    alert("名称不能为空");
                    createFile();
                }
            }
        }, 50)

    }
}

function deleteFile(){
    var tree = document.getElementsByClassName("fileTree")[0],
        selected = tree.getElementsByClassName("selected")[0],
        li = selected.parentNode;

    if(li && li.nodeName == "LI"){

        // 延时确认框弹出的时间，保证自定义菜单消失后确认框再出现
        setTimeout(function () {
            if(confirm("确定要删除文件吗？")){
                li.parentNode.removeChild(li);
            }
        },50);

    }
}

function copyFile(){
    var tree = document.getElementsByClassName("fileTree")[0],
        selected = tree.getElementsByClassName("selected")[0];
    
    if(selected){
        clipboard.file = selected.parentNode.cloneNode(true);
    }
}

function pasteFile(){
    var tree = document.getElementsByClassName("fileTree")[0],
        selected = tree.getElementsByClassName("selected")[0],
        ul = selected.parentNode.getElementsByTagName("ul")[0];

    if(!ul){
        ul = selected.parentNode.parentNode;
    }
    if(ul.nodeName == "UL" && clipboard.file){
        removeClassName(selected, "selected");
        ul.appendChild(clipboard.file.cloneNode(true));
        addClassName(clipboard.file.firstElementChild, "selected");
        ul.style.display = "";
    }
}

function reName(){
    var tree = document.getElementsByClassName("fileTree")[0],
        selected = tree.getElementsByClassName("selected")[0];
    setTimeout(function(){
        var name = prompt("请输入新的名称","");
        if(name){
            if(name != ""){
                selected.innerHTML = "<span></span><i></i>" + name;
            } else {
                alert("名称不能为空");
                reName();
            }
        }
    },50)

}


function init(){
    initTree();
    initContext();
    initMenu();
}

var  clipboard = {
    file:null
}
init();

// todo：空文件夹 改变样式
// todo：默认文件夹是收起的
// todo：提示窗口，用来输入文件名