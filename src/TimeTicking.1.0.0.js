/*
	TimeTicking 1.0.0 倒计时组件（距离一个时间点的方法）
	作者：songyijian 
	发布：2016.10.20
	
	API
		new TimeTicking({
			nextTime:"Jun 14, 2018 0:0:01", 	//* 距离时间	// January、February、March、April、May、June、 July、August、September、October、November、December 
			setIntervalData:1000, 				//倒计时刷新频率(毫秒)，不填不刷新
			timeFn:function(_this){	},			//倒计时进程回调 o === this
			timeOverFn:function(_this){	}		//倒计时结束回调 
		})
		
		ATTR 
			this.tdate.t  	//天
			this.tdate.s	//小时
			this.tdate.f	//分钟
			this.tdate.m	//秒
*/

!function(){
	function TimeTicking(obj){
		if(!obj.nextTime){
			console.error(' nextTime 没有填写')
			return false;
		};
		this.data={
			nextTime:obj.nextTime,		//"Jun 23, 2017 00:00:01"
			setIntervalData:  obj.setIntervalData && typeof obj.setIntervalData === "number" ? obj.setIntervalData : false,	//不小于1000（1秒）
			timeOverFn:obj.timeOverFn || function(o){},
			timeFn:obj.timeFn || function(o){}
		};
		this.tdate={t:null,s:null,f:null,m:null};
		this.futureT;
		this.minusT;
		this.interval = true;
		this.ntimego;
		
		this.init();
	};
	
	TimeTicking.prototype.init=function(){
		this.futureT = new Date(this.data.nextTime).getTime();
		this.timeTrade();
		var _this=this;
		
		if(this.data.setIntervalData && this.interval){
	   		clearInterval(this.ntimego)
	   		this.ntimego=setInterval(function(){
	   			_this.timeTrade();
	   		},this.data.setIntervalData);
		};
		
	}
	
	TimeTicking.prototype.timeTrade=function(){
		//转成秒 这个很重要
		this.minusT=(this.futureT - new Date().getTime())/1000;
		
		if(this.minusT <= 0 || this.minusT*1000 < this.data.setIntervalData){
			this.tdate.t=this.tdate.s=this.tdate.f=this.tdate.m=0;
			this.data.timeFn(this);
			this.data.timeOverFn(this)
			clearInterval(this.ntimego);
			this.interval = false;
			return;
		}
		
		this.tdate.t=Math.floor(this.minusT/86400);
		this.tdate.s=Math.floor(this.minusT%86400/3600);
		this.tdate.f=Math.floor(this.minusT%86400%3600/60);
		this.tdate.m=Math.floor(this.minusT%60);
		
		this.data.timeFn(this);
	};

    window.TimeTicking=TimeTicking;

}();
if (typeof(module) !== 'undefined'){
    exports = window.TimeTicking;
}else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.TimeTicking;
    });
};