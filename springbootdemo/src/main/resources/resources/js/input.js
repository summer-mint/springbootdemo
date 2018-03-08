/**
 * Created by Administrator on 2016/12/13 0013.
 */

jQuery.validator.addMethod("integer", function (value, element) {
    return this.optional(element) || /^-?\d+$/.test(value)
}, "A positive or negative non-decimal number please");
jQuery.validator.addMethod("positive", function (value, element) {
    return this.optional(element) || value > 0;
}, "A positive number please");
jQuery.validator.addMethod("negative", function (value, element) {
    return this.optional(element) || value < 0;
}, "A negative number please");
jQuery.validator.addMethod("decimal", function (value, element, param) {
    return this.optional(element) || new RegExp("^-?\\d{1," + (param.integer != null ? param.integer : "") + "}" + (param.fraction != null ? (param.fraction > 0 ? "(\\.\\d{1," + param.fraction + "})?$" : "$") : "(\\.\\d+)?$")).test(value);
}, "numeric value out of bounds");
jQuery.validator.addMethod("pattern", function (value, element, param) {
    return this.optional(element) || param.test(value);
}, "Invalid format");
jQuery.validator.addMethod("extension", function (value, element, param) {
    return this.optional(element) || ($.trim(param) != "" && new RegExp("^\\S.*\\.(" + param.replace(/,/g, "|") + ")$", "i").test(value));
}, "Invalid extension");
jQuery.validator.addMethod("username", function (value, element, param) {
    return this.optional(element) || ($.trim(param) != "" && regularUsername.test(value));
}, "Invalid username");
jQuery.validator.addMethod("bank", function (value, element, param) {
    return this.optional(element) || ($.trim(param) != "" && bank(value));
}, "Invalid bank");
jQuery.validator.addMethod("companyCode", function (value, element, param) {
    return this.optional(element) || ($.trim(param) != "" && regularCompanyCode.test(value));
}, "Invalid username");
jQuery.validator.addMethod("companyPhone", function (value, element, param) {
    return this.optional(element) || ($.trim(param) != "" && regularCompanyPhone.test(value));
}, "Invalid phone");

/*// 大于现在时间的验证
jQuery.validator.addMethod("laterTime", function(value, element,param) {
    alert(!nowDate(param))
    return this.optional(element) || (!nowDate(param));
}, "请输入大于现在的时间。");*/
$().ready(function() {

    // 验证消息
    if($.validator != null) {
        $.extend($.validator.messages, {
            required: "必填",
            email: "E-mail格式错误",
            url: "网址格式错误",
            date: "日期格式错误",
            dateISO: "日期格式错误",
            pointcard: "信用卡格式错误",
            number: "只允许输入数字",
            digits: "只允许输入零或正整数",
            minlength: $.validator.format("长度不允许小于{0}"),
            maxlength: $.validator.format("长度不允许大于{0}"),
            rangelength: $.validator.format("长度必须在{0}-{1}之间"),
            min: $.validator.format("不允许小于{0}"),
            max: $.validator.format("不允许大于{0}"),
            range: $.validator.format("必须在{0}-{1}之间"),
            accept: "输入后缀错误",
            equalTo: "两次输入不一致",
            remote: "输入错误",
            integer: "只允许输入整数",
            positive: "只允许输入正数",
            negative: "只允许输入负数",
            decimal: "数值超出了允许范围",
            pattern: "格式错误",
            extension: "文件格式错误",
            username:"不能数字开头，只能输入英文，数字，下划线 字符长度 4-20位",
            bank:"银行卡号有误",
            companyCode:"分销商编码只能为4位大写字母"
        });

        $.validator.setDefaults({
            errorClass: "fieldError",
            ignore: ".ignore",
            ignoreTitle: true,
            errorPlacement: function(error, element) {
                var fieldSet = $(element).closest('label .fieldError').addClass('has-error');
                if (fieldSet.size() > 0) {
                    error.appendTo(fieldSet);
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function(form) {
                $(form).find(":submit").prop("disabled", true);
                form.submit();
            }
        });
    }
});