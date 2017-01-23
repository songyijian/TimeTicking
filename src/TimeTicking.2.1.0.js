/*
	TimeTicking 2.1.0 倒计时组件（指定年月日 || 指定多长时间后 || 指定多少次 ）
	作者：songyijian 
	发布：2016.10.20
			2017.1.16
	
	API
		new TimeTicking({
			stopdata:"Jun 14, 2018 0:0:01", 	//* 距离时间	// January、February、March、April、May、June、 July、August、September、October、November、December 
			type:'date',						//date:目标日期(年月日);	long:多长时间内; site 次数 
			setIntervalData:1000, 				//倒计时刷新频率(毫秒)，不填不刷新
			initFn:function(_this){	},			//初始化回调
			timeFn:function(_this){	},			//倒计时进程回调 o === this
			timeOverFn:function(_this){	}		//倒计时结束回调 
		})
		
		ATTR 
			date类型：
				this.tdate.t  	//天
				this.tdate.s	//小时
				this.tdate.f	//分钟
				this.tdate.m	//秒
			
			long || site类型：
				longPast	//long类型，已经过去多长时间
				pastnumber	//多少次
*/

!function(){
	function TimeTicking(obj){
		if(!obj.stopdata){
			console.error(' stopdata 没有填写')
			return false;
		};
		this.data={
			type:obj.type || 'date',	//date:目标日期;	long:多长时间后自动结束；site 次数 
			stopdata:obj.stopdata,		//"Jun 23, 2017 00:00:01"
			setIntervalData:  obj.setIntervalData && typeof obj.setIntervalData === "number" ? obj.setIntervalData : false,	//不小于1000（1秒）
			initFn:obj.initFn || function(o){},
			timeOverFn:obj.timeOverFn || function(o){},
			timeFn:obj.timeFn || function(o){}
		};
		this.tdate={t:null,s:null,f:null,m:null};
		this.longPast;
		this.pastnumber;
		this.futureT;
		this.minusT;
		this.interval = true;
		this.ntimego;
		
		this.init();
	};
	
	TimeTicking.prototype.init=function(){
		var _this=this;
		this.longPast = 0;
		this.pastnumber = 0;
		this.data.initFn(this)
		//long
		if(this.data.type ==='long'){
			if(typeof this.data.stopdata !== 'number'){
				console.error('stopdata 不是number 类型  ' )
				return;
			}
			clearInterval(this.ntimego)
	   		this.ntimego=setInterval(function(){
	   			_this.longTrade();
	   		},this.data.setIntervalData);
			return;
		}
		
		//site
		if(this.data.type ==='site'){
			if(typeof this.data.stopdata !== 'number'){
				console.error('stopdata 不是number 类型  ' )
				return;
			}
			clearInterval(this.ntimego)
	   		this.ntimego=setInterval(function(){
	   			_this.siteTrade();
	   		},this.data.setIntervalData);
			return;
		}
		
		//date
		this.futureT = new Date(this.data.stopdata).getTime();
		this.timeTrade();
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
	
	TimeTicking.prototype.longTrade=function(){
		this.longPast+=this.data.setIntervalData;
		this.pastnumber++;
		if(this.longPast >= this.data.stopdata){
			this.data.timeOverFn(this)
			clearInterval(this.ntimego)
			return;
		}
		this.data.timeFn(this);
	};
	
	TimeTicking.prototype.siteTrade=function(){
		this.longPast+=this.data.setIntervalData;
		this.pastnumber++;
		if(this.pastnumber >= this.data.stopdata){
			this.data.timeOverFn(this)
			clearInterval(this.ntimego)
			return;
		}
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