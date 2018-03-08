/*$("#mobile").select2({
	language: "zh-CN",
    placeholder: "请选择所属酒店",
    allowClear: true,
});
*/
$(function() {
	
	var dataForm = $('#dataForm');
	var error = $('.alert-danger', dataForm);
	dataForm.validate({
        errorElement: 'span', //default input error message container
        errorClass: 'help-block help-block-error', // default input error message class
        ignore: "", 
        rules: {
            realName: {
                required: true,
            },
        },
        messages:{
        	realName:{
        		required: "请输入真实姓名",
        	},
        },  
        highlight: function (element) {
            $(element).closest('.inline-form').addClass('has-error');
            error.hide();
        },
        unhighlight: function (element) {
            $(element).closest('.inline-form').removeClass('has-error');
            error.hide();
        },
        success: function (label) {
            label.closest('.inline-form').removeClass('has-error');
            error.hide();
        },
        submitHandler: function (form) {
        	formSubmit();
        	return false;
        }
    });

	//表单提交
	function formSubmit() {
		alert("提交");
    }

});

