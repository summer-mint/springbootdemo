<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>


<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>


<!DOCTYPE html>
<html lang="en">
<head>
    <script>
        var b_name = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        var trim_version = version[1].replace(/[ ]/g, "");
        if (b_name == "Microsoft Internet Explorer") {

            if (trim_version == "MSIE8.0" || trim_version == "MSIE7.0" || trim_version == "MSIE6.0") {
                if (confirm("您的浏览器版本过低，点击确认下载谷歌浏览器")) {
                    location.href="http://sw.bos.baidu.com/sw-search-sp/software/2e9dc429bad14/ChromeStandalone_59.0.3071.104_Setup.exe";
                }


            }
        }
    </script>
    <meta charset="UTF-8">
    <title style="margin-left: 500px">青少年毒品预防教育平台</title>

    <link rel="stylesheet" href="<%=path%>/resources/assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="<%=path%>/resources/css/login.css" type="text/css">

    <script src="<%=path%>/resources/js/jquery-2.1.0.js"></script>
    <script src="<%=path%>/resources/assets/js/bootstrap.min.js"></script>
    <%--<script src="../../js/backstage.js"></script>--%>
    <link rel="stylesheet" href="<%=path%>/resources/assets/css/font-awesome.min.css">
    <script pe="text/javascript" src="<%=path%>/resources/assets/js/bootbox/bootbox.js"></script>


</head>
<body>
<div class="con">
    <div class="header">

        <span >青少年毒品预防教育平台</span>
    </div>
    <div id="myCarousel" class="carousel slide">
        <!-- 轮播（Carousel）项目 -->
        <div class="carousel-inner">
            <div class="item active carousel-inner1">
            </div>
        </div>
        <div class="registerdiv">
            <h3>后台登录</h3>
            <div class="error" id="errorDiv">
                <img src="<%=path%>/resources/img/login-error.png" alt="">
                <span></span>
            </div>
            <div class="registerbiao">
                <form class="form-horizontal" role="form" action="">
                    <div class="formzh" >
                        <div>
                            <img src="<%=path%>/resources/img/username-icon.png" alt="">
                        </div>
                        <input type="text" class="" id="username" placeholder="用户名" maxlength="20" value="">
                        <%--<div class="cross">--%>
                        <%--<i class="fa fa-close (alias) fa-lg"></i>--%>
                        <%--</div>--%>
                    </div>
                    <div class="formmm">
                        <div>
                            <img src="<%=path%>/resources/img/password-icon.png" alt="">
                        </div>
                        <input type="password" id="password" class="" id="pwd" placeholder="密码" maxlength="20" value="">
                        <%--<div class="cross">--%>
                        <%--<i class="fa fa-close (alias) fa-lg"></i>--%>
                        <%--</div>--%>
                    </div>
                    <div class="registersubmit">
                        <input id="loginBtn" type="button" value="登录">
                    </div>
                </form>

            </div>
        </div>
    </div>


</div>
</body>
<script type="text/javascript">
    if(window.top != window.self){
        window.top.location = window.location;
    }

    $().ready(function() {
        $username = $("#username");
        $password = $("#password");
        $errorDiv = $("#errorDiv");
        $("#loginBtn").click(function() {
            login();
        });

        function showMessage(msg) {
            $errorDiv.find("span").html(msg);
            $errorDiv.fadeIn();
        }

        $password.change(function() {
            $errorDiv.fadeOut();
        });

        function login(){
            if ($username.val() == "") {
                showMessage("用户名不能为空!");
                $username.focus();
                return false;
            }
            if ($password.val() == "") {
                showMessage("密码不能为空!");
                $password.focus();
                return false;
            }

            $.ajax({
                url: '192.168.1.119:8080/login/user',
                data:{username:$username.val(), password:$password.val()},
                success: function(result) {
                  console.log(result);
                }
            })
        }

        document.onkeydown = function(event) {
            var code;
            if (!event) {
                event = window.event; //针对ie浏览器
                code = event.keyCode;
                console.log(code)
                if (code == 13) {
                    login();
                }
            }
            else {
                code = event.keyCode;
                if (code == 13) {
                    login();
                }
            }
        };
    });


</script>
</html>