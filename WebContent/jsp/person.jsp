
<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
pageContext.setAttribute("base", basePath);
%>
<!DOCTYPE HTML>
<!--
	个人 1.0 
-->
<html>
	<head>
<title>个人中心</title>
<meta name="description" content="" />
<meta name="keywords" content="" />
<script src="${base }js/jquery-1.10.2.js"></script>
<script src="${base }css/personal/5grid/init.js?use=mobile,desktop"></script>
<script src="${base }js/personal/jquery.formerize-1.1.js"></script>
<script src="${base }js/personal/init.js"></script>
<script src="${base }js/jquery-ui-1.10.4.custom.js"></script>
  <script type="text/javascript" src="${base }js/highslide-with-gallery.js"></script>
<script src="${base }js/trip.min.js"></script>
<link rel="stylesheet" href="${base }css/button.css">
<link rel="stylesheet" href="${base }css/trip.min.css" />
<link rel="stylesheet" href="${base }css/bootstrap.min.css" />
<link rel="stylesheet"
	href="${base }css/font-awesome/4.1.0/css/font-awesome.min.css" />
<link rel="stylesheet" href="${base }css/ace.min.css" />
<link rel="stylesheet" href="${base }css/ace-rtl.min.css" />
<link rel="stylesheet"
	href="${base }css/jquery-ui-1.10.4.custom.min.css">
	<link rel="stylesheet" type="text/css" href="${base }css/highslide.css" />
<noscript>
	<link rel="stylesheet" href="${base }css/personal/5grid/core.css" />
	<link rel="stylesheet" href="${base }css/personal/5grid/core-desktop.css" />
	<link rel="stylesheet" href="${base }css/personal/5grid/core-1200px.css" />
	<link rel="stylesheet" href="${base }css/personal/5grid/core-noscript.css" />
	<link rel="stylesheet" href="${base }css/personal/style.css" />
	<link rel="stylesheet" href="${base }css/personal/style-desktop.css" />
	<link rel="stylesheet" href="${base }css/personal/noscript.css" />
</noscript>
</head>
	<body class="homepage">
		<c:if test="${empty sessionScope.users }"><script type="text/javascript">location = "${base}jsp/login.jsp"</script> </c:if>
		<!-- Wrapper-->
			<div id="wrapper">
				
				<!-- Nav -->
					<nav id="nav">
						<a href="#me" class="fa fa-user active" style="text-decoration: none"><span>个人资料</span></a>
						<a href="#coll" class="fa fa-folder" style="text-decoration: none" ><span>订单列表</span></a>
					</nav>

				<!-- Main -->
					<div id="main">
						
						<!-- 个人资料 -->
							<article id="me" class="panel" style="background: transparent">
							<!--style="background: url('../css/personal/images/bgk2.jpg');"
							style="background: linear-gradient(#FFF,RGB(218,165,147))"
							-->
								<header>
									<h1 id="boxtrip">亲爱的 <font  style="color: red;">${users.username }</font>用户，你的个人资料：</h1>
									<span class="byline" id="gukeziliao">
									<i class="fa fa-user"></i>	姓名：${users.relname }<br />
									<i class="fa fa-phone"></i>	手机号码：${users.userphone }<br />
									<i class="fa fa-home"></i>	家庭住址：${users.address }<br />
									</span>	
								<button class="anniubtn zisepr" style="margin-left: 0px; margin-top: 350px;color:#FFF;" onclick="javascript:updatepassword()">修改密码</button>
								<button class="anniubtn huisepr" style="margin-left: 50px; margin-top: 350px;color:#FFF;" onclick="javascript:opentishi()">填写修改个人信息</button>
																
								</header>
							
								<a href="#coll" class="jumplink pic">
									<span class="jumplink arrow icon icon-right"><span>查看订单列表</span></span>
								</a>
							</article>

						<!-- 收藏夹 --> 
							<article id="coll" class="panel" style="background:#FFF">
								<div id="timeline-2" >
									<div class="row">
										<div class="col-xs-12 col-sm-10 col-sm-offset-1" id="loadcoll">
											
										</div>
									</div>
								</div>
										
								
							</article>

						<!-- 充值 -->
						

					</div>
		
				<!-- Footer -->
					<div id="footer">
						<ul class="links">
							<li>&copy;聚魂代练</li>
							<li>口号 : 你的满意，我们的宗旨</li>
							<li>顾客是上帝</li>
						</ul>
					</div>
		
			</div>
	<script type="text/javascript">
	$(function(){
		$("#loadcoll").load("${base}orderbyuser.action");
	})
	//打开修改或填写个人资料弹框
	function opentishi() {
		var str =""
		if("${users.relname}" != "" && "${users.relname}" != null){
			str="编辑个人资料";
		}else{
			str="填写个人资料";
		}
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
									$.post("${base}toupdateguke.action",{relname:gukename,address:gukeaddress,userphone:gukephone},function(json){
										if(json.message == "success"){
											//提示登录成功并跳转主页
											new Trip([ {
												sel : $("#boxtrip"),
												content : str+"成功!",
												position : "n"
											} ], {
												delay : 3000,
												//提示成功后 回调函数 动态改变html 而不刷新页面
												onStart : function() {
													$("#gukeziliao").html("")
													$("#gukeziliao").html(
														"<i class='fa fa-user'></i>	姓名："+gukename+"<br />"+
														"<i class='fa fa-phone'></i> 手机号码："+gukephone+"<br />"+
														"<i class='fa fa-home'></i>	家庭住址："+gukeaddress+"<br />"	
													);
												  }
											}).start();
										}else{
											
										}
									});
									
									$(this).dialog("close");

								},
								"重置" : function() {
									$("#gukename").val("");
									$("#gukeaddress").val("");
									$("#gukephone").val("");
								}
							},
							close : function() {
								$(this).dialog("close");
							}
						});
	}
	//修改密码
	function updatepassword() {
		$("#checkpass")
				.dialog(
						{
							title : "修改密码",
							show : "clip",
							hide : "blind",
							autoOpen : true,
							height : 300,
							width : 350,
							modal : false,
							buttons : {
								"确定" : function() {
									//获取顾客姓名
									var repassword = $("#repassword").val();
									if (repassword == "") {
										//创建tirp 做出提示
										new Trip([ {
											sel : $("#repassword"),
											content : "原密码不能为空!",
											position : "e"
										} ], {
											delay : 3000
										}).start();
										$("#repassword").focus();
										return;
									}else{
										var flag = "";
										$.ajax({

								             type: "post",

								             url: "${base}checkpassword.action",
								             async:false,
								             data: {password:repassword},

								             dataType: "json",

								             success: function(data){
								            	 if(data.message == "error"){
								 					//创建tirp 做出提示//判断用户名是否为空
								 						new Trip([ {
								 							sel : $("#repassword"),
								 							content : "对不起，旧密码输入错误，请重新输入!",
								 							position : "e" //显示位置
								 						} ], {
								 							delay : 3000  //时间
								 						}).start();
								 						flag = "error";
								 						$("#repassword").focus();
														
								 				}

								                      }

								         });
											}
									if(flag == "error"){
										return;
									}
									//获取密码
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
									$.post("${base}toupdateguke.action",{password:password},function(json){
										if(json.message == "success"){
											//提示登录成功并跳转主页
											new Trip([ {
												sel : $("#boxtrip"),
												content : "修改密码成功!",
												position : "n"
											} ], {
												delay : 3000,
											}).start();
											
										}
									});
									$("#repassword").val("");
									$("#gukepassword").val("");
									$("#querenpassword").val("");
									$(this).dialog("close");

								},
								"重置" : function() {
									$("#repassword").val("");
									$("#gukepassword").val("");
									$("#querenpassword").val("");
								}
							},
							close : function() {
								$(this).dialog("close");
							}
						});
	}
	
	 //hs 显示的title
    hs.lang={
    		number: '图片 第%1张 共 %2张',
    		loadingTitle:'读取中',
    		closeTitle:'关闭',
    		fullExpandTitle:'原始尺寸',
    		nextTitle:'下一张',
    		moveTitle:'移动',
    		restoreTItle:'关闭图片',
    		previousTitle:'上一张',
    		playTitle:'播放',
    		pauseTitle:'暂停'
    };
    //按钮路径
    hs.graphicsDir = '${base}css/graphics/';
    hs.align = 'center';
    hs.transitions = ['expand', 'crossfade'];
    hs.outlineType = 'rounded-white';
    hs.fadeInOut = true;
    hs.numberPosition = 'caption';
    hs.dimmingOpacity = 0.75;
    hs.showCredits=false;
    // Add the controlbar
    if (hs.addSlideshow) hs.addSlideshow({
    	//slideshowGroup: 'group1',
    	interval: 5000,
    	repeat: false,
    	useControls: true,
    	fixedControls: 'fit',
    	overlayOptions: {
    		opacity: .75,
    		position: 'bottom center',
    		hideOnMouseOut: true
    	}
    });
    
  //上一页
	function uppage(page){
		if(page <= 1){
	  		//page = maxpage-1;
	  		toalert("这已是首页")
	  	}else{
	  
		var url="${base}orderbyuser.action?pagenum="+(Number(page)-1);
		 $("#loadcoll").load(url);
	  	}
	}
	//下啦页数选择
	
	function pagechange(){
		var pagenum = $("#pagechange").children("option:selected").val();
		var url="${base}orderbyuser.action?pagenum="+pagenum;
		 $("#loadcoll").load(url);
	}
	//下一页
	function downpage(page,maxpage){
	  	if(page>=maxpage){
	  		//page = maxpage-1;
	  		toalert("这已是最后一页")
	  	}
	  	else{
		var url="${base}orderbyuser.action?pagenum="+(Number(page)+1);
		 $("#loadcoll").load(url);
	  	}
	}
	function changepage(i){
	  	$(function(){
	  
	var url="${base}orderbyuser.action?pagenum="+i;
	 $("#loadcoll").load(url);
	  		
	  	})
	}
	
	//提示js
	function toalert(str){
		$("#alertdiv").text(str);
		$(function(){
			$("#alertwindow").dialog({
				 title:"提示",           
				 show:"fold",
 				 hide:"scale",
			     autoOpen: true,
     			 height: 150,
      			 width: 200,
         		 modal: false,
      			 buttons: {
      			 	"确定":function(){
						$("#alertdiv").text("");
						 $( this ).dialog( "close" );
      			 	 
      			 	}
      			 },
      			 close:function(){
					 $("#alertdiv").text("");
      				//$.post("/Student/remove.action");
      			 }
      			 });
		})
	}
	</script>
	</body>
	<!-- 修改个人资料div -->
	<div id="updatewindow" style="display: none;">
<br />
	<label class="block clearfix"> <span
		class="block input-icon input-icon-right"> <input value="${users.relname }"
			type="text" class="form-control" placeholder="请输入你的姓名"
			id="gukename" name="gukename" /> <i
			class="ace-icon fa fa-user"></i>
	</span>
	</label> 
		<label class="block clearfix"> <span
		class="block input-icon input-icon-right"> <input value="${users.userphone }"
			type="text" class="form-control" placeholder="请输入你的手机号码"
			id="gukephone" name="gukephone" /> <i
			class="ace-icon fa fa-phone"></i>
	</span>
	</label>
	<label class="block clearfix"> <span
		class="block input-icon input-icon-right"> <input value="${users.address }"
			type="text" class="form-control" placeholder="请输入你的地址"
			id="gukeaddress" name="gukeaddress" /> <i
			class="ace-icon fa fa-home"></i>
	</span>
	</label> 
	
</div>
<!-- 修改密码弹框 -->
<div id="checkpass" style="display: none">
	<br />
	<label class="block clearfix"> <span
		class="block input-icon input-icon-right"> <input
			type="password" class="form-control" placeholder="请输入原密码"
			id="repassword"  /> <i
			class="ace-icon fa fa-lock"></i>
	</span>
	</label> 
		<label class="block clearfix"> <span
		class="block input-icon input-icon-right"> <input
			type="password" class="form-control" placeholder="请输入新密码"
			id="gukepassword"  /> <i
			class="ace-icon fa fa-lock"></i>
	</span>
	</label>
	<label class="block clearfix"> <span
		class="block input-icon input-icon-right"> <input
			type="password" class="form-control" placeholder="请再次输入密码"
			id="querenpassword"  /> <i
			class="ace-icon fa fa-retweet"></i>
	</span>
	</label>
</div>
<div class="anniubtn zisepr" style="float: left; margin-left: 1100px;" onclick="javascript:location='${base}jsp/wowadd.jsp'">返回</div>
    <div id="alertwindow" style="display: none;">
	<div id="alertdiv" style="font-size: 12px;"></div>
</div>
</html>