/**
 * Created by Administrator on 2016/8/6.
 */

var Ship = function(){
    this.id = id;
    this.x = 100;
    this.y = 0;
    this.power = 100;
    this.state = "stop";
}

Ship.prototype = {
    chargePower: function(po){
        this.power += po;
        this.power = this.power < 100? this.power: 100;
    },
    expendPower: function(po){
        this.power -= po;
        this.power = this.power > 0? this.power: 0;
    },
    receiveMsg: function(msg){
        
    }
}

var ShipsManager = function(){
    
}