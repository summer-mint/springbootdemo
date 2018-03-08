/******************抽取公共方法*********************/

//判断值是否为空
function getvalue(val){
	if(val==undefined){
		val='--';
		return val ;
	}else{
		return val;
	}
}
//日期转换为时间戳
function getTimeStamp(time){
	time=time.replace(/-/g, '/'); 
	 var date=new Date(time);
	return date.getTime(); 
}

//时间戳转换为日期
function getTime(ns){
	var val=getvalue(ns);
	if(val!='--'){
		var myDate = new Date(val);
		 return myDate.format("yyyy-MM-dd hh:mm:ss");
	}else{
		return '--';
	}
}

//四舍五入方法
function decimal(num,v){
	var vv = Math.pow(10,v);
	return Math.round(num*vv)/vv;
}


