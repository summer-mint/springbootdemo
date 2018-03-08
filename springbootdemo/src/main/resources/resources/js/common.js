/**
 * Created by wc on 2015/5/17.
 */
var hci = {
    base :  'http://'+window.location.host+'/admin',
    //imageService: "http://101.201.145.44:8080/image-service",
    imageService: "http://192.168.1.37:8006/image-service",
/*    base :  "http://101.201.145.44:8084/admin",
    imageService: "http://101.201.145.44:8080/image-service",*/
};

//正则
//1-13位数字
var regularNumber = /^\d{1,13}$/;
//正则
//1-2位数字
var regularNumber2 = /^\d{1,2}$/;
//6位数字
var regularAreaCode = /^\d{6}$/;
//20位数字
var regularnumber20 = /^\d{1,20}$/;
//身份证验证
var regularIdCard = /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
//邮箱验证
var regularEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//非空字符
var regularName = /^((\s.*)|(.*\s))$/;
//
var regularText =/^[1-20]*$/;
//手机号验证
var regularTel = /^1[3|4|5|7|8][0-9]\d{4,8}$/;

/*var regularUsername = /[a-zA-Z_][a-zA-Z0-9_]*!/;*/

var regularUsername = /^[a-zA-Z_]{1}[0-9a-zA-Z_]{3,19}$/;

var regularCompanyCode = /^[a-zA-Z_]{4}$/;

var regularCompanyPhone =/^[\d-]*$/;

var regularPositiveInteger  = /^[0-9]*[1-9][0-9]*$/;

$.validator.addMethod("username",function(value,element,params){
    var checkUsername = regularUsername;
    return this.optional(element)||(checkUsername.test(value));
},"只能输入英文,数字,下划线,字符长度4-20！");


//银行卡号验证
function bank(bankCard) {
    if (bankCard == null || bankCard == "") {
        return false;
    }
    var bankName = ''
    $.get(hci.base+"/resources/json/bankData.json", {}, function (data) {
        var bankBin = 0;
        bankBin = bankCard.substring(0, 6);
        $.each(data, function (i, item) {
            if (item.bin == bankBin) {
                bankName = item.bankName;
            }
        });
        console.log(";:::::::::::::"+bankName)
        if (bankName == null || bankName == '') {
            console.log("进来了")
          return false;
        }else {
            console.log("进来true了")
            return true;
        }

    });
}


//判断值是否为空
function getvalue(val){
    if(val==undefined){
        val='--';
        return val ;
    }else{
        return val;
    }
}
//(function($){
//    $.fn.UI = function(options){
//        var defaults = {
//            iconClass    :    'darkorange',
//            ButtonClass    :    'yellow'
//        };
//
//        $.extend(defaults,options);
//
//        $("i").removeClass("darkorange");
//        $("i").addClass(options.iconClass);
//    }
//})(jQuery);

jQuery.bar = function(options) {
    var defaults = {
        iconClass    :    'darkorange',
        ButtonClass    :    'yellow'
    };

    $.extend(defaults,options);

    $("i").removeClass("darkorange");
    $("i").addClass(options.iconClass);

    $(".btn").removeClass("btn-success");
    $(".btn").addClass(options.ButtonClass);

};
//jQuery.bar = function(param) {
//    alert('This function takes a parameter, which is "' + param + '".');
//};
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
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
		//val=val.time;
		var myDate = new Date(val);
		 return myDate.format("yyyy-MM-dd hh:mm:ss");
	}else{
		return '--';
	}
}
//判断是否为整数
function isInt(num) {
    var type = /^[0-9]*[0-9][0-9]*$/;
    var re = new RegExp(type);
    if (num.match(re) == null) {
      return true;
    }
    return false;
}
//$(document).ajaxComplete(function(event, request, settings) {
//	//console.log(request);
//	try{
//		var demo=JSON.parse(request.responseText);
//		if(demo.flag !=0){
//			if(demo.code==401){
//				location.href = '../login.jsp';
//				//Notify(demo.msg, 'top-right', '500', 'danger', 'fa-desktop', true);
//			}else if(demo.code!=0 && demo.msg != ""){
//				Notify(demo.msg, 'top-right', '500', 'danger', 'fa-desktop', true);
//			}
//		}else{
//			if(demo.code!=0){
//				Notify(demo.msg, 'top-right', '500', 'danger', 'fa-desktop', true);
//			}
//
//		}
//	}catch(e){
//		return;
//	}
//
//	//flag:请求成功失败  0,1
//	//code:操作成功失败  0,1
//})

//去掉尾部空格
function trimStr(str){
	return str.replace(/(^\s*)|(\s*$)/g,"");
}
//是否大于当前时间，大于返回false；
function nowDate(reviewDate){
    var d1 = new Date(reviewDate.replace(/\-/g, "\/"));
    var myDate = new Date();
    var d2 = myDate.format("yyyy-MM-dd ");
    var today = new Date(d2.replace(/-/g, "/"));
    if (d1 > today) {
      return false;
    }
return true;
}
/**
 * 一个日期加上一个时间
 * @param date 日期
 * @param time 时间
 */
function judgFailTime(date,time) {
    var date = new Date(date.replace("-","/"));

    date.setMinutes(date.getMinutes() + time, date.getSeconds(), 0);
    return date;
}

function inverseOr(val){
    var returnarr = new Array;
    var max = 0;
    var min = 0;
    var arr =[1,2,4,8];
    var len = arr.length;
    for(var i=0;i<len;i++){
        max += arr[i];
    }

    if(val<min || val > max){
        return null;
    }

    while (val>0){
        for (var j = len - 1; j >= 0; i --) {
            if (arr[j] > val) {
                continue;
            }
            val = val ^ arr[j];
            returnarr.push(arr[j]);
        }
    }
    return returnarr;
}

//扩展数组方法:获取是否包含
Array.prototype.indexOf = function(val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == val) return i;
    }
    return -1;
};

//扩展数组方法:删除指定元素
Array.prototype.remove = function(index) {
    if (isNaN(index) || index > this.length) {
        return false;
    }
    this.splice(index, 1);
};

/*function getBankName(bankCard){
    if (bankCard == null || bankCard == "") {
        return "";
    }
    var bankName = '';
    $.ajax({
        url:hci.base+"/resources/json/bankData.json",
        async : false,  //同步请求
        success:function(data){
            var bankBin = 0;
            var isFind = false;
            for (var key = 10; key >= 2; key--) {
                bankBin = bankCard.substring(0, key);
                $.each(data, function (i, item) {
                    if (item.bin == bankBin) {
                        isFind = true;
                      /!*  console.log(item.bankName)*!/
                        bankName = item.bankName;
                        return bankName;
                    }
                });

               /!* if (isFind) {
                    break;
                }*!/
            }

            if (!isFind) {
                return "未知发卡银行";
            }
        }
})
    return bankName;
}*/

// 根据银行卡号获取发卡行名称
getBankName = function (bankCard) {
    if (bankCard == null || bankCard == "") {
        return "";
    }

    $.get(hci.base+"/resources/json/bankData.json", {}, function (data) {
        var bankBin = 0;
        var isFind = false;
        for (var key = 10; key >= 2; key--) {
            bankBin = bankCard.substring(0, key);
            $.each(data, function (i, item) {
                if (item.bin == bankBin) {
                    isFind = true;
                    console.log(item.bankName)
                    return item.bankName;
                }
            });

            if (isFind) {
                break;
            }
        }

        if (!isFind) {
            return "未知发卡银行";
        }
    });
};

(function($) {
    $.message = function() {
        var message = {};
        if ($.isPlainObject(arguments[0])) {
            message.content = arguments[0];
        } else if (typeof arguments[0] === "number" && typeof arguments[1] === "string") {
            message.flag = arguments[0];
            message.content = arguments[1];
        } else if (typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string") {
            message.flag = arguments[0];
            message.code = arguments[1];
            message.content = arguments[2];
        } else {
            return false;
        }
        Notify(message.content, 'top-right', '5000', 'warn', 'fa-desktop', true);
    };
    $.fn.extend({
        browser : function (options) {
            var $this = $(this);
            var settings = {
                type: "other",
                title: "文件上传",
                isUpload: true,
                showPreview : false,
                showRemove: true,
                maxFileSize: 10240,
                allowedFileExtensions: ["jpg", "png", "jpeg","txt","xlsx","docx","rtf","doc","xls","ppt","html","htm","wpd","pdf","pptx","bmp"],
                uploadUrl: hci.imageService + "/upload/submit",
                initialCaption: "请选择文件",
                maxCount: 1,
                data: [],
                callback: null
            };

            $.extend(settings, options);

            return this.each(function() {
                var $browserButton = $(this);

                $browserButton.click(function () {
                    var $dialog = bootbox.dialog({
                        message: content,
                        title: settings.title,
                        className: "modal-darkorange",

                        buttons: {
                            success: {
                                label: "确定",
                                className: "btn-blue",
                                callback: function () {
                                    if (settings.data.length == 0) {
                                        Notify("还没有上传完成哦!", 'top-right', '5000', 'warn', 'fa-desktop', true);
                                        return false;
                                    }
                                    if (settings.showPreview) {
                                        if ($this.attr("type") == "text") {
                                            $this.val(settings.data[0].url);
                                        }
                                        var $view = $this.next();
                                        if ($view.hasClass("filePreview")) {
                                            $view.attr("href", hci.imageService + settings.data[0].url);
                                        } else {
                                            var $view = $("<a class='filePreview' style='position:relative;float: right; margin-top: -25px; margin-right: -30px;' target='_blank' href='" + hci.imageService + settings.data[0].url + "'>查看</a>")
                                            $view.insertAfter($this);

                                        }
                                    }
                                    if (settings.callback != null && typeof settings.callback == "function") {
                                        settings.callback(settings.data);
                                    }
                                }
                            },
                            "取消": {
                                className: "btn-danger",
                                callback: function () { }
                            }
                        }
                    });
                    $dialog.on("hidden.bs.modal", function () {
                        $.extend(settings, options);
                        settings.data = [];
                    });

                });

            });
            function content(){
                var html = '    <div class="row">'
                            + '<div class="col-md-12">'
                            +   '<div class="form-group">'
                            +       '<input type="file" name="file" id="uploadFile" class="form-control" placeholder="To" required="">'
                            +   '</div>'

                            +   '</div>'
                            + '</div>';
                html += '<div class="row">'
                        +   '<div class="col-md-12" id="fileContainer"></div>'
                     +  '</div>';
                // html = '<div style="width: 620px !important;">' + html + '</div>';
                var object = $('<div/>').html(html).contents();

                $upload = object.find('#uploadFile');
                var $fileContainer = object.find('#fileContainer');
                $upload.fileinput({
                    language:'zh',
                    uploadUrl: hci.imageService + "/upload/submit?type=" + settings.type, // 图片上传接口
                    showPreview : false,
                    showRemove: false,
                    maxFileSize : 10240,  //上传图片的最大限制  50KB
                    allowedFileExtensions: settings.allowedFileExtensions,
                    initialCaption: settings.initialCaption
                });
                $upload.on("fileuploaded", function (event, data, previewId, index) {
                    if (settings.data.length >= settings.maxCount) {
                        alert("达到最大限制, 无法上传");
                        return false;
                    }

                    if (null != data) {
                        console.log(data);
                        var fileType = data.files[0].type;
                        var fileName = data.files[0].name;
                        var file = data.response.data[0];
                        file.fileType = fileType;
                        file.fileName = fileName;
                        settings.data.push(file);

                        if (fileType.indexOf("image") >= 0) {
                            // $fileContainer.append("<img title='" + fileName + "' src='" + hci.imageService + file.smallPath + "'>")

                            var priviewPath = file.url  + "?" + new Date().getTime();
                            if (file.smallPath) {
                                priviewPath = file.smallPath + "?" + new Date().getMilliseconds();
                            }
                            var imageHtml = '<div class="file-preview-item file-preview-frame file-preview-success" id="" data-fileindex="0" style="width: 110px;">'
                                + '<img src="' + hci.imageService + priviewPath + '" class="file-preview-image" style="width: 110px; height: 140px;">'
                                + '<div style=>'
                                +    '<span style="float: left;width: 80px;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">' + fileName +　'</span>'
                                +    '<button type="button" style="float: right" class="kv-file-remove btn btn-xs btn-default" title="删除文件"><i class="glyphicon glyphicon-trash text-danger"></i></button>'
                                + '</div>'
                                + '  </div>';
                            $fileContainer.append(imageHtml)
                        } else {
                            // $fileContainer.append('<span title="' + fileName + '" class="file-icon-4x"><i class="glyphicon glyphicon-file"></i></span>');
                            var otherHtml = '<div class="file-preview-item file-preview-frame"  style="width: 110px;">' +
                                '<div  style="width: 110px; height: 140px;">' +
                                '<span class="file-icon-4x" style="position: relative;top: 40px;">' +
                                '<i class="glyphicon glyphicon-file"></i>' +
                                '</span> ' +
                                '</div>'
                                + '<div style=>'
                                +    '<span style="float: left">' + fileName +　'</span>'
                                +    '<button type="button" style="float: right" class="kv-file-remove btn btn-xs btn-default" title="删除文件"><i class="glyphicon glyphicon-trash text-danger"></i></button>'
                                + '</div>'

                            '</div>';
                            $fileContainer.append(otherHtml);
                        }

                        $(".file-preview-item .kv-file-remove").unbind().click();
                        $(".file-preview-item .kv-file-remove").on("click", function () {
                            var $item = $(this).parents(".file-preview-item");
                            var index = $item.index();
                            $item.remove();

                            settings.data.remove(index);
                            console.log(settings.data);
                        });

                    } else {
                        Notify("上传图片失败", 'top-right', '5000', 'danger', 'fa-desktop', true);
                    }

                });
                return object
            }

        }

    });
})(jQuery);

function   DateAdd(interval,number,date)
{
    /*
     *   功能:实现VBScript的DateAdd功能.
     *   参数:interval,字符串表达式，表示要添加的时间间隔.
     *   参数:number,数值表达式，表示要添加的时间间隔的个数.
     *   参数:date,时间对象.
     *   返回:新的时间对象.
     *   var   now   =   new   Date();
     *   var   newDate   =   DateAdd( "d ",5,now);
     *---------------   DateAdd(interval,number,date)   -----------------
     *
     * Example
             var   now   =   new   Date();
             //加五天.
             var   newDate   =   DateAdd( "d ",5,now);
             alert(newDate.toLocaleDateString())
             //加两个月.
             newDate   =   DateAdd( "m ",2,now);
             alert(newDate.toLocaleDateString())
             //加一年
             newDate   =   DateAdd( "y ",1,now);
             alert(newDate.toLocaleDateString())
     *
     */
    switch(interval)
    {
        case   "y "   :   {
            date.setFullYear(date.getFullYear()+number);
            return   date;
            break;
        }
        case   "q "   :   {
            date.setMonth(date.getMonth()+number*3);
            return   date;
            break;
        }
        case   "m "   :   {
            date.setMonth(date.getMonth()+number);
            return   date;
            break;
        }
        case   "w "   :   {
            date.setDate(date.getDate()+number*7);
            return   date;
            break;
        }
        case   "d "   :   {
            date.setDate(date.getDate()+number);
            return   date;
            break;
        }
        case   "h "   :   {
            date.setHours(date.getHours()+number);
            return   date;
            break;
        }
        case   "m "   :   {
            date.setMinutes(date.getMinutes()+number);
            return   date;
            break;
        }
        case   "s "   :   {
            date.setSeconds(date.getSeconds()+number);
            return   date;
            break;
        }
        default   :   {
            date.setDate(d.getDate()+number);
            return   date;
            break;
        }
    }
}
var formatDate = function (date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d;
};

/** 公共上传图片接口 */
function sendFile(files, editor, $editable) {
    /*debugger;*/
    var data = new FormData();
    data.append("file", files[0]);
    $.ajax({
        data : data,
        type : "POST",
        url : hci.imageService + "/upload/submit", //图片上传出来的url，返回的是图片上传后的路径，http格式
        cache : false,
        contentType : false,
        processData : false,
        dataType : "json",
        success: function(data) {//data是返回的hash,key之类的值，key是定义的文件名
            if (data.code == 0) {
                editor.insertImage($editable, hci.imageService + data.data[0].url);
            }
        },
        error:function(){
            layer.msg("上传失败");
        }
    });
}

/***
 * 图片放大
 */
$(function (){
    $(".enlarge").css("cursor", "pointer");
    $(".enlarge").click(function (){
        layer.open({
            type: 1,
            title: false,
            closeBtn: 1,
            skin: 'yourclass',
            shadeClose: true,
            shade: 0.5,
            area:['800px' , '500px'],
            content: "<img src='" + $(this).attr("src") + "'/>"
        });
    });
});
String.prototype.format = function()
{
    if(arguments.length==0) return this;
    for(var s=this, i=0; i<arguments.length; i++)
        s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);
    return s;
};
