/**
 * Created by Administrator on 2016/7/30.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = document.getElementById("aqi-city-input").value,
        index = document.getElementById("aqi-value-input").value,
        patt =  /[\u4e00-\u9fa5a-zA-Z]+/g,   // 匹配中英文字符
        patt2 = /[1-9]\d*$/     // 匹配正整数
    
    if(patt.test(city) === false){
        alert("城市名称包含非法字符！");
    } else if ( patt2.test(index) === false ){
        alert("空气质量指数必须为正整数！");
    } else {
        aqiData[city] = index;
        renderAqiList();
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var table = document.getElementById("aqi-table"),
        html = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>",
        i, len;
    for(city in aqiData){
        html += "<tr> <td>" + city + "</td><td>" + aqiData[city] + "</td><td><button>删除</button></td></tr>";
    }
    table.innerHTML = html;
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {
    var btn = document.getElementById("add-btn"),
        table = document.getElementById("aqi-table");
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    btn.addEventListener("click", function(){
        addAqiData();
    })
    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    table.addEventListener("click", function(event){
        var target = event.target,
            city = "";
        if(target.nodeName === "BUTTON" ){
            
            // target为button节点，父节点为td节点，父父元素为tr节点
            // tr第一个子节点为空文本节点，第二个节点想要的城市名所在节点 
            city = target.parentNode.parentNode.childNodes[1].innerText;
            delBtnHandle(city);
        }
    })
}
window.onload = function(){
    init();
}
