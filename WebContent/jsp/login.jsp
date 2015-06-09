<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
pageContext.setAttribute("base", basePath);
%>
<!DOCTYPE html>
<html>
<head>
<title>登录注册页</title>
		<link rel="stylesheet" href="${base }css/bootstrap.min.css" />
		<link rel="stylesheet" href="${base }css/font-awesome/4.1.0/css/font-awesome.min.css" />
		<link rel="stylesheet" href="${base }css/ace.min.css" />
		<link rel="stylesheet" href="${base }css/ace-rtl.min.css" />
		<link rel="stylesheet" href="${base }css/trip.min.css" />
		  <link rel="stylesheet" href="${base }css/jquery-ui-1.10.4.custom.min.css">
		 <script src="${base }js/jquery-1.10.2.js"></script>
		 <script src="${base }js/jquery-ui-1.10.4.custom.js"></script>
		   <script src="${base }js/trip.min.js"></script>
		 
</head>
<body class="login-layout light-login">
<div class="main-container">
			<div class="main-content">
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<div class="login-container">
							<div class="center">
								<h1>
									<i class="ace-icon fa fa-leaf green"></i>
									<span class="red">网上</span>
									<span class="white" id="id-text2">代练</span>
								</h1>
								<h4 class="blue" id="id-company-text">&copy;聚魂</h4>
							</div>

							<div class="space-6"></div>

							<div class="position-relative">
								<div id="login-box" class="login-box visible widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header blue lighter bigger">
												<i class="ace-icon fa fa-coffee green"></i>
												请输入您的信息
											</h4>

											<div class="space-6"></div>

											<form>
												<fieldset>
													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" class="form-control" placeholder="用户名" id="loginusername" />
															<i class="ace-icon fa fa-user"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control" id="loginpassword" placeholder="密码" />
															<i class="ace-icon fa fa-lock"></i>
														</span>
													</label>

													<div class="space"></div>

													<div class="clearfix">
														<label class="inline">
															<input type="checkbox" id="chenckuser"  />
															<span class="lbl"> 管理员登录请选择</span>
														</label>

														<button type="button" onclick="loginuser()" class="width-35 pull-right btn btn-sm btn-primary">
															<i class="ace-icon fa fa-key"></i>
															<span class="bigger-110" >登陆</span>
														</button>
													</div>

													<div class="space-4"></div>
												</fieldset>
											</form>

										</div><!-- /.widget-main -->

										<div class="toolbar clearfix">


											<div>
												<a href="#" data-target="#signup-box" class="user-signup-link">
													注册
													<i class="ace-icon fa fa-arrow-right"></i>
												</a>
											</div>
										</div>
									</div><!-- /.widget-body -->
								</div><!-- /.login-box -->

								

								<div id="signup-box" class="signup-box widget-box no-border">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header green lighter bigger">
												<i class="ace-icon fa fa-users blue"></i>
												新用户注册
											</h4>

											<div class="space-6"></div>
											<p> 输入您要注册用户名和密码: </p>

											<form id="zhuceform">
												<fieldset>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" class="form-control" placeholder="请输入姓名" id="username" name="gukename" onblur="checkusername()" />
															<i class="ace-icon fa fa-user"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control" placeholder="请输入密码" id="gukepassword" name="gukepassword" />
															<i class="ace-icon fa fa-lock"></i>
														</span>
													</label>

													<label class="block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" class="form-control" placeholder="请输入确认密码" id="querenpassword" name="querenpassword"/>
															<i class="ace-icon fa fa-retweet"></i>
														</span>
													</label>
													
													<label class="block">
														<span class="btn btn-pink" onclick="javascript:opentishi('详细信息')">
															填写详细信息
														</span>
													</label>

													<div class="clearfix">
														<button type="reset" class="width-30 pull-left btn btn-sm">
															<i class="ace-icon fa fa-refresh"></i>
															<span class="bigger-110">重置</span>
														</button>

														<button type="button" class="width-65 pull-right btn btn-sm btn-success" onclick="zhucesubmit()">
															<span class="bigger-110">注册</span>

															<i class="ace-icon fa fa-arrow-right icon-on-right"></i>
														</button>
													</div>
												</fieldset>
											</form>
										</div>

										<div class="toolbar center">
											<a href="#" data-target="#login-box" class="back-to-login-link">
												<i class="ace-icon fa fa-arrow-left"></i>
												重新登陆
											</a>
										</div>
									</div><!-- /.widget-body -->
								</div><!-- /.signup-box -->
							</div><!-- /.position-relative -->

							<div class="navbar-fixed-top align-right">
								<br />
								&nbsp;
								<a id="btn-login-dark" href="#">黑色</a>
								&nbsp;
								<span class="blue">/</span>
								&nbsp;
								<a id="btn-login-blur" href="#">蓝色</a>
								&nbsp;
								<span class="blue">/</span>
								&nbsp;
								<a id="btn-login-light" href="#">暖色</a>
								&nbsp; &nbsp; &nbsp;
							</div>
						</div>
					</div><!-- /.col -->
				</div><!-- /.row -->
			</div><!-- /.main-content -->
		</div><!-- /.main-container -->
		<script type="text/javascript">
		//实现登录并判断是否为管理员验证信息是否正确
		function loginuser(){
			var username = $("#loginusername").val();
			var gukepassword = $("#loginpassword").val();//不仅是顾客的密码也是管理员的
			var tocheckbox = $("#chenckuser");
			var isadmin = "";
			if(tocheckbox.is(':checked')){
				isadmin = "admin";
			}else{
				isadmin = "users";
			}
			//提示登录成功并跳转主页
			new Trip([ {
				sel : $("#login-box"),
				content : "后台正在验证信息，请稍候...",
				position : "e"
			} ], {
				delay : 2000,
			}).start();
			$.post("${base}tologin.action",
				   {username:username,
					password:gukepassword,
					isadmin:isadmin
				   },
				   function(json){
					   if(json.message == "success"){
								//提示登录成功并跳转主页
								new Trip([ {
									sel : $("#login-box"),
									content : "验证成功，正在登陆...!",
									position : "n"
								} ], {
									delay : 3000,
									onEnd : function() {
										if(isadmin == "admin"){
										location='${base}jsp/index.jsp';
										}else if(isadmin == "users"){
											location='${base}jsp/wowadd.jsp';
										}
									  }
								}).start();
							
					   }else{
						 //提示验证失败并留在本页
							new Trip([ {
								sel : $("#login-box"),
								content : "对不起的你用户名或密码错误!",
								position : "n"
							} ], {
								delay : 3000,
							}).start();
					   }
				   })
		}
		//用户名失去焦点时 ajax请求后台验证用户名是否重复 
		function checkusername(){
			var username = $("#username").val();
			if(username != ""){
			$.post("${base}checkusername.action",{username:username},function(json){
				if(json.message == "success"){
					//创建tirp 做出提示//判断用户名是否为空
					new Trip([ {
						sel : $("#username"),
						content : "恭喜你用户名可用!",
						position : "e" //显示位置
					} ], {
						delay : 3000  //时间
					}).start();
				}else{
					//创建tirp 做出提示//判断用户名是否为空
					new Trip([ {
						sel : $("#username"),
						content : "对不起，用户名重复，请重新输入!",
						position : "e" //显示位置
					} ], {
						delay : 3000  //时间
					}).start();
					$("#username").focus();
				}
				
			})
			}
		}
		
			jQuery(function($) {      //  用于显示注册页面和 找回密码页面.....
				$('body').attr('class', 'login-layout blur-login');
				$('#id-text2').attr('class', 'white');
				$('#id-company-text').attr('class', 'light-blue');
			 $(document).on('click', '.toolbar a[data-target]', function(e) {
				e.preventDefault();
				var target = $(this).data('target');
				$('.widget-box.visible').removeClass('visible');//hide others    隐藏其他
				$(target).addClass('visible');//show target       显示目标
			 });
			});  
            
			
			
			
			// 仅用于修改背景图片
			jQuery(function($) {
			 $('#btn-login-dark').on('click', function(e) {//黑色调
				$('body').attr('class', 'login-layout');
				$('#id-text2').attr('class', 'white');
				$('#id-company-text').attr('class', 'blue');
				
				e.preventDefault();
			 });
			 $('#btn-login-light').on('click', function(e) { //暖色调
				$('body').attr('class', 'login-layout light-login');
				$('#id-text2').attr('class', 'grey');
				$('#id-company-text').attr('class', 'blue');
				
				e.preventDefault();
			 });
			 $('#btn-login-blur').on('click', function(e) {//蓝色调
				$('body').attr('class', 'login-layout blur-login');
				$('#id-text2').attr('class', 'white');
				$('#id-company-text').attr('class', 'light-blue');
				
				e.preventDefault();
			 });
			 
			});
			//注册
			function zhucesubmit(){
				
			var username = $("#username").val()
				if (username == "") {
					//创建tirp 做出提示//判断用户名是否为空
					new Trip([ {
						sel : $("#username"),
						content : "用户名不能为空!",
						position : "e"
					} ], {
						delay : 3000
					}).start();
					$("#username").focus();
					return;
				}else{
			var flag = "";
			$.ajax({

	             type: "post",

	             url: "${base}checkusername.action",
	             async:false,
	             data: {username:username},

	             dataType: "json",

	             success: function(data){
	            	 if(data.message == "error"){
	 					//创建tirp 做出提示//判断用户名是否为空
	 						new Trip([ {
	 							sel : $("#username"),
	 							content : "对不起，用户名重复，请重新输入!",
	 							position : "e" //显示位置
	 						} ], {
	 							delay : 3000  //时间
	 						}).start();
	 						flag = "error";
	 						$("#username").focus();
							
	 				}

	                      }

	         });
				}
			if(flag == "error"){
				return;
			}
			/*$.post("${base}checkusername.action",{username:username},function(json){
				if(json.message == "error"){
					//创建tirp 做出提示//判断用户名是否为空
						new Trip([ {
							sel : $("#username"),
							content : "对不起，用户名重复，请重新输入!",
							position : "e" //显示位置
						} ], {
							delay : 3000  //时间
						}).start();
						$("#username").focus();
						return
				}
			});*/
			var password = $("#gukepassword").val()
			//判断密码是否为空
			if (password == "") {
				//创建tirp 做出提示
				new Trip([ {
					sel : $("#gukepassword"),
					content : "密码不能为空!",
					position : "e"
				} ], {
					delay : 3000
				}).start();
				$("#gukepassword").focus();
				return;
			}
			var queenpassword = $("#querenpassword").val()
			//判断确认密码是否为空
			if (queenpassword == "") {
				//创建tirp 做出提示
				new Trip([ {
					sel : $("#querenpassword"),
					content : "确认密码不能为空!",
					position : "e"
				} ], {
					delay : 3000
				}).start();
				$("#querenpassword").focus();
				return;
			}else if(queenpassword != password){
				//判断俩次密码是否一致
				new Trip([ {
					sel : $("#querenpassword"),
					content : "倆次密码不一致!",
					position : "e"
				} ], {
					delay : 3000
				}).start();
				$("#querenpassword").focus();
				return;
			}
			var gukename = $("#gukename").val();
			var gukeaddress = $("#gukeaddress").val();
			var gukephone = $("#gukephone").val();
			//回调ajaxpost求情 完成注册并登录
			$.post("${base}registeruser.action",
					{username:username,
					password:password,
					relname:gukename,
					address:gukeaddress,
					userphone:gukephone
					},
					function(json){
						if(json.message == "success"){
							//提示注册成功并登录
							new Trip([ {
								sel : $("#signup-box"),
								content : "恭喜你，注册成功，正在登陆...!",
								position : "n"
							} ], {
								delay : 3000,
								onEnd : function() {
									location='${base}jsp/wowadd.jsp';
								  }
							}).start();
						
						}
			})
			}

			//详细信息弹窗
			function opentishi(str) {
				$("#updatewindow")
						.dialog(
								{
									title : str,
									show : "clip",
									hide : "blind",
									autoOpen : true,
									height : 300,
									width : 350,
									modal : false,
									buttons : {
										"确定" : function() {
											//获取顾客姓名
											var gukename = $("#gukename").val();
											if (gukename == "") {
												//创建tirp 做出提示
												new Trip([ {
													sel : $("#gukename"),
													content : "姓名不能为空!",
													position : "e"
												} ], {
													delay : 3000
												}).start();
												$("#gukename").focus();
												return;
											}
											//获取地址
											var gukeaddress = $("#gukeaddress")
													.val();
											if (gukeaddress == "") {
												new Trip([ {
													sel : $("#gukeaddress"),
													content : "地址不能为空!",
													position : "e"
												} ], {
													delay : 3000
												}).start();
												$("#gukeaddress").focus();
												return;
											}
											//获取手机号码
											var gukephone = $("#gukephone")
													.val();
											if (gukephone == "") {
												new Trip([ {
													sel : $("#gukephone"),
													content : "手机号码不能为空!",
													position : "e"
												} ], {
													delay : 3000
												}).start();
												$("#gukephone").focus();
												return;
											} else if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i
													.test(gukephone)) {
												new Trip([ {
													sel : $("#gukephone"),
													content : "请输入正确的手机号!",
													position : "e"
												} ], {
													delay : 3000
												}).start();
												$("#gukephone").focus();
												return;
											}
											$(this).dialog("close");

										},
										"重置" : function() {
											$("#gukename").val("");
											$("#gukeaddress").val("");
											$("#gukephone").val("");
										}
									},
									close : function() {
										$("#gukename").val("");
										$("#gukeaddress").val("");
										$("#gukephone").val("");
										$(this).dialog("close");
									}
								});
			}
		
		</script>
		${actionMessages[0]}
</body>
<div id="updatewindow" style="display: none;">
<br />
	<label class="block clearfix"> <span
		class="block input-icon input-icon-right"> <input
			type="text" class="form-control" placeholder="请输入你的姓名"
			id="gukename" name="gukename" /> <i
			class="ace-icon fa fa-user"></i>
	</span>
	</label> 
		<label class="block clearfix"> <span
		class="block input-icon input-icon-right"> <input
			type="text" class="form-control" placeholder="请输入你的手机号码"
			id="gukephone" name="gukephone" /> <i
			class="ace-icon fa fa-phone"></i>
	</span>
	</label>
	<label class="block clearfix"> <span
		class="block input-icon input-icon-right"> <input
			type="text" class="form-control" placeholder="请输入你的地址"
			id="gukeaddress" name="gukeaddress" /> <i
			class="ace-icon fa fa-home"></i>
	</span>
	</label> 
</div>
</html>