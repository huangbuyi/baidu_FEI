/**
 * Created by Administrator on 2016/8/2.
 */

function render(arr, target){
    var html = "",
        i, len;
    for(i = arr.length - 1, len = arr.length; i >= 0; i--){
        html += "<div data-index=" + i + ">" + arr[i] + "</div>";
    }
    target.innerHTML = html;
}

function tagHandler(){
    var tagInput = document.getElementsByName("tag")[0],
        tagValue = tagInput.value,
        html = "";

    // Make sure tag is not empty and repeat
    if(tagValue != "" && tags.indexOf(tagValue) == -1){
        tags.push(tagValue);

        // Make sure counts of tags less than ten
        if(tags.length > 10){
            tags.shift();
        }
    }
    tagInput.value = "";
}

function delTagsHandler(arr, pos){

    // delete a element from array
    arr.splice(pos, 1);
}

function hobbyHandler(){
    var hobby = document.getElementsByName("hobby")[0],
        hobbyValue =hobby.value,
        hobbyArr =[],
        i, len;

    // Split hobbies from a string by some punctuations.
    hobbyArr = hobbyValue.split(/[,，、\s+]/);
    for(i = 0, len = hobbyArr.length; i < len; i++){
        var tmp =hobbyArr[i];
        if(tmp != "" && hobbies.indexOf(tmp) == -1){
            hobbies.push(tmp);
            if(hobbies.length > 10){
                hobbies.shift();
            }
        }
    }
}

function init(){
    var tag = document.getElementsByName("tag")[0],
        btn = document.getElementsByName("btn")[0],
        showTags = document.getElementsByClassName("showTags")[0],
        showHobbies = document.getElementsByClassName("showHobbies")[0];
    
    // Show default tags and hobbies
    render(tags, showTags);
    render(hobbies,showHobbies)

    // Bind tag input's keydown event 
    tag.addEventListener("keydown", function(event){

        // match Space, Enter and Tab
        if(event.keyCode == 9 || event.keyCode == 13 || event.keyCode == 32){
            event.preventDefault();
            tagHandler();
            render(tags, showTags);
        }
    })
    
    // Bind tags' mouseover and mouseout event 
    showTags.addEventListener("mouseover", function(event){
        var target = event.target;
        if(typeof target.getAttribute("data-index") == "string"){
            target.className = "selected";
        }
    })
    
    showTags.addEventListener("mouseout", function(event){
        var target = event.target;
        if(typeof target.getAttribute("data-index") == "string") {
            document.getElementsByClassName("selected")[0].removeAttribute("class");
        }
    })
    
    // Bind tags' click delete event
    showTags.addEventListener("click", function(event){
        var target = event.target,
            index = target.getAttribute("data-index");
        if(typeof index == "string"){
            delTagsHandler(tags, index);
            render(tags, showTags);
        }
    })
    
    // Bind hobby textarea submit event
    btn.addEventListener("click", function(){
        hobbyHandler();
        render(hobbies,showHobbies);
    })
}

var tags = ["HTML5", "JavaScript", "CSS"];
var hobbies = ["游泳", "瑜伽", "摄影"];
init();