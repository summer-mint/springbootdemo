$(function() {
	$('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                account: {
                    required: true
                },
                password: {
                    required: true
                }
            },

            messages: {
            	account: {
                    required: "用户名不能为空."
                },
                password: {
                    required: "密码不能为空."
                }
            },

            invalidHandler: function (event, validator) { //display error alert on form submit   
                $('.alert-danger').hide();
            },

            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function (error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            submitHandler: function (form) {
                //form.submit();
            	loginSubmit();
            	
            	return false;
            }
        });

        $('.login-form input').keypress(function (e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    //$('.login-form').submit();
                	
                	loginSubmit();
                }
                return false;
            }
        });
        
        function loginSubmit() {
            Metronic.blockUI({
                target: ".content"
            });
            var pwd = $.md5($("#password").val());
            $.ajax({
                type: "POST",
                url: getRootPath() + "/web/adminUser/login",
                data: {
                	account:$("#account").val(),
                	password:pwd
                },
                error: function(request) {
                	Metronic.unblockUI(".content");
                },
                success: function(data) {
                	Metronic.unblockUI(".content");
                	console.log(data);
                	if (data.code == 0) {
                		window.location.href = getRootPath()+"/main";
                    }
                    else {
                    	$("#inputError").html(data.msg);
                    	$('.alert-danger').show();
                    }
                }
            });

        }
});

