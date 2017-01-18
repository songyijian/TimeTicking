# 倒计时组件第一次GitHub 更新

## TimeTicking.2.0.0

###API
 
** 配置 **

```
new TimeTicking({
    stopdata:"Jun 14, 2018 0:0:01", 	//* 距离时间	// January、February、March、April、May、June、 July、August、September、October、November、December 
    type:'date',						// date：目标日期(年月日);	long：多长时间内; site：次数 （默认 date类型）
    setIntervalData:1000, 				//倒计时刷新频率(毫秒)，不填不刷新
    initFn:function(_this){	},			//初始化回调
    timeFn:function(_this){	},			//倒计时进程回调 o === this
    timeOverFn:function(_this){	}		//倒计时结束回调 
})
```

** ATTR **
```
    long || site类型：
        longPast	//long类型，已经过去多长时间
        pastnumber	//多少次

    date类型：
        this.tdate.t  	//天
        this.tdate.s	//小时
        this.tdate.f	//分钟
        this.tdate.m	//秒
    
```



## TimeTicking.1.0.0

* 1.0.0 只对 "某年某月某分" 的倒计时做了封装

```
/*

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
```

