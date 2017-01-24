# TimeTicking     倒计（时定）组件

### 版本更新说明：2.2.0
* 增加了一个play配置属性，和两个配置回调函数 playFn（） stopFn（） 
* 暴露两个方法 .play(fn) .stop(fn) 两个方法，用来控制倒计时



## API TimeTicking.2.2.0 

```
new TimeTicking({
	stopdata:"Jun 14, 2018 0:0:01", 	//* 距离时间	// January、February、March、April、May、June、 July、August、September、October、November、December 
	type:'date',						//date:目标日期(年月日);	long:多长时间内; site 次数 
	play:true,							//Boolean 创建后就开始自动倒数计时  默认初始化便开始
	setIntervalData:1000, 				//倒计时刷新频率(毫秒)，不填不刷新
	initFn:function(_this){	},			//函数初始化回调
	playFn:function(_this){},			//倒计时开始回调
	stopFn:function(_this){},			//暂停回调
	timeFn:function(_this){	},			//倒计时进程回调 o === this
	timeOverFn:function(_this){	}		//倒计时结束回调 
})

FN:	
	.play(fn)		//开始倒计时 【可传入一个函数，将覆盖配置的 playFn】 只是一个花式写法
	.stop(fn)		//暂停  【可传入一个函数，将覆盖配置的 stopFn】
			
	**其实上面 两个方法对于 long、site 类型更 有意义
	

ATTR 
	date类型：
		this.tdate.t  	//天
		this.tdate.s	//小时
		this.tdate.f	//分钟
		this.tdate.m	//秒
	
	long || site类型：
		longPast	//long类型，已经过去多长时间
		pastnumber	//多少次
		
```



## API TimeTicking.2.1.0 
 

```
new TimeTicking({
    stopdata:"Jun 14, 2018 0:0:01", 	//* 距离时间	// January、February、March、April、May、June、 July、August、September、October、November、December 
    type:'date',						// date：目标日期(年月日);	long：多长时间内; site：次数 （默认 date类型）
    setIntervalData:1000, 				//倒计时刷新频率(毫秒)，不填不刷新
    initFn:function(_this){	},			//初始化回调
    timeFn:function(_this){	},			//倒计时进程回调 o === this
    timeOverFn:function(_this){	}		//倒计时结束回调 
})


ATTR 

long || site类型：
    longPast	//long类型，已经过去多长时间
    pastnumber	//多少次

date类型：
    this.tdate.t  	//天
    this.tdate.s	//小时
    this.tdate.f	//分钟
    this.tdate.m	//秒

```



## API TimeTicking.1.0.0 

#### 1.0.0 只对 "某年某月某分" 的倒计时做了封装

```
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

```