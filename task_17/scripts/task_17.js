/**
 * Created by Administrator on 2016/7/30.
 */
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: -1,
    nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
    var chart = document.getElementsByClassName("aqi-chart-wrap")[0],
        html = "",
        weekData = 0,
        chartArr = [],
        count = 0,
        i, len;
    for(date in chartData){
        chartArr.push( [date, chartData[date]] );
    }
    switch (pageState.nowGraTime){
        case "day":
            for(i = 0, len = chartArr.length; i < len; i++){
                var color = "rgba(255," + Math.ceil(30 + Math.random() * 120) + "," + Math.ceil(30 + Math.random() * 120) + ",1)"
                html += "<div class='day' title='" + chartArr[i][0] + "\n" + chartArr[i][1] + "' style='height:" + chartArr[i][1] + "px;background:" + color + "'></div>"
            };
            break;

        case "week":

            var startDay = chartArr[0][0];
            var dat = new Date(chartArr[0][0]);
            for(i = 0, len = chartArr.length; i < len; i++){
                dat = new Date(chartArr[i][0]);
                var day = dat.getDay();
                weekData += chartArr[i][1];
                count++;
                if(day == 0){
                    startDay = chartArr[i][0];
                }
                if(day == 6 || i == len - 1){
                    var avg = Math.round(weekData / count);
                    var color = "rgba(255," + Math.ceil(30 + Math.random() * 120) + "," + Math.ceil(30 + Math.random() * 120) + ",1)"
                    html += "<div class='week' title='" + startDay + "至" + chartArr[i][0] + "\n" + avg + "' " + "style='height:" + avg + "px;background:" + color + "'></div>"
                    count = 0;
                    weekData = 0;
                }
            };
            break;

        case "month":
            var currMonth = -1;
            var monthData = 0;
            var dat = new Date(chartArr[0][0]);
            for(i = 0, len = chartArr.length; i < len; i++){
                dat = new Date(chartArr[i][0]);
                var mon = dat.getMonth();
                if(mon !== currMonth && currMonth !== -1){
                    var avg = Math.round(monthData / count);
                    var color = "rgba(255," + Math.ceil(30 + Math.random() * 120) + "," + Math.ceil(30 + Math.random() * 120) + ",1)"
                    html += "<div class='month' title='" + (currMonth + 1) + "月\n" + avg + "' style='height:" + avg + "px;background:" + color + "'></div>"
                    count = 0;
                    monthData = 0;
                }
                monthData += chartArr[i][1];
                count++;
                currMonth = mon;
                if( i === len - 1){
                    var avg = Math.round(monthData / count);
                    var color = "rgba(255," + Math.ceil(30 + Math.random() * 120) + "," + Math.ceil(30 + Math.random() * 120) + ",1)"
                    html += "<div class='month' title='" + (currMonth + 1) + "月\n" + avg + "' style='height:" + avg + "px;background:" + color + "'></div>"
                }
            };
            break;
    }
    chart.innerHTML = html;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    var radios = document.getElementsByName("gra-time"),
        i, len;
    for(i = 0, len = radios.length; i < len; i++){
        // 确定是否选项发生了变化
        if(radios[i].checked){

            // 设置对应数据
            pageState.nowGraTime = radios[i].value;
            break;
        }
    }

    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    var cityBox = document.getElementById("city-select"),
        selectedIndex = cityBox.selectedIndex,
        selectedCity = cityBox.options[selectedIndex].value;
    // 确定是否选项发生了变化
    if(selectedCity !== pageState.nowSelectCity ){
        pageState.nowSelectCity = selectedCity;
        // 设置对应数据
        chartData = aqiSourceData[selectedCity];
        // 调用图表渲染函数
        renderChart();
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var graTime = document.getElementById("form-gra-time");
    graTime.addEventListener("click", function(){
        graTimeChange();
    })
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    var cityBox = document.getElementById("city-select"),
        html = "";
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    for(city in aqiSourceData){
        html += "<option valu" + city + ">" + city + "</option>";
    }
    cityBox.innerHTML = html;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    cityBox.addEventListener("change", function(){
        citySelectChange();
    })
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    chartData = aqiSourceData["北京"];
    renderChart();
}

/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();

