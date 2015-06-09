<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
pageContext.setAttribute("base", basePath);
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head><title>
	聚魂游戏代练管理系统
</title>
<link href="${base }css/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
<link href="${base }css/d3.css" rel="stylesheet" type="text/css" />
    <style type="text/css">
    .button {  
        display: inline-block;  
        zoom: 1; /* zoom and *display = ie7 hack for display:inline-block */  
        *display: inline;  
        vertical-align: baseline;  
        margin: 0 2px;  
        outline: none;  
        cursor: pointer;  
        text-align: center;  
        text-decoration: none;  
        font: 18px/100% Arial, Helvetica, sans-serif;  
        padding: .5em 2em .55em;  
        text-shadow: 0 1px 1px rgba(0,0,0,.3);  
        -webkit-border-radius: .5em;   
        -moz-border-radius: .5em;  
        border-radius: .5em;  
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.2);  
        -moz-box-shadow: 0 1px 2px rgba(0,0,0,.2);  
        box-shadow: 0 1px 2px rgba(0,0,0,.2);  
    }  
    .button:hover {  
        text-decoration: none;  
    }  
    .button:active {  
        position: relative;  
        top: 1px;  
    }  
  
    .bigrounded {  
        -webkit-border-radius: 2em;  
        -moz-border-radius: 2em;  
        border-radius: 2em;  
    }  
    .medium {  
        font-size: 12px;  
        padding: .4em 1.5em .42em;  
    }  
    .small {  
        font-size: 11px;  
        padding: .2em 1em .275em;  
    }  
  
    /* color styles   
    ---------------------------------------------- */  
    
    .green {  
        color: #e8f0de;  
        border: solid 1px #538312;  
        background: #64991e;  
        background: -webkit-gradient(linear, left top, left bottom, from(#7db72f), to(#4e7d0e));  
        background: -moz-linear-gradient(top,  #7db72f,  #4e7d0e);  
        filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#7db72f', endColorstr='#4e7d0e');  
    }  
    .green:hover {  
        background: #538018;  
        background: -webkit-gradient(linear, left top, left bottom, from(#6b9d28), to(#436b0c));  
        background: -moz-linear-gradient(top,  #6b9d28,  #436b0c);  
        filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#6b9d28', endColorstr='#436b0c');  
    }  
    .green:active {  
        color: #a9c08c;  
        background: -webkit-gradient(linear, left top, left bottom, from(#4e7d0e), to(#7db72f));  
        background: -moz-linear-gradient(top,  #4e7d0e,  #7db72f);  
        filter:  progid:DXImageTransform.Microsoft.gradient(startColorstr='#4e7d0e', endColorstr='#7db72f');  
    }  
    
    .gray {
        color: #e9e9e9;
        border: solid 1px #555;
        background: #6e6e6e;
        background: -webkit-gradient(linear, left top, left bottom, from(#888), to(#575757));
        background: -moz-linear-gradient(top, #888, #8B6508);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#8B6508', endColorstr='#8B6508');
        }
        .gray:hover {
        background: #616161;
        background: -webkit-gradient(linear, left top, left bottom, from(#757575), to(#4b4b4b));
        background: -moz-linear-gradient(top, #757575, #4b4b4b);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#757575', endColorstr='#4b4b4b');
        }
        .gray:active {
        color: #afafaf;
        background: -webkit-gradient(linear, left top, left bottom, from(#575757), to(#888));
        background: -moz-linear-gradient(top, #575757, #888);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#575757', endColorstr='#888888');
        } 
    
    td
    {
        padding-top:5px;
    }
    
    body
    {
        background:url(${base}images/xbbg.jpg) top center; 
        background-repeat:no-repeat;
        }

</style>
<script src="${base }js/jquery-1.10.2.js" type="text/javascript"></script>
<script src="${base }js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
</head>
<body>
    <form name="adddorder" method="post" action="${base }adddorder.action" id="form1" enctype="multipart/form-data">
    <div class="page">
        <div class="header">
            <div class="title">
                <span style=" float:left;">
                    <h1>
                        聚魂游戏代练管理系统
                    </h1>
                </span>
                <span style=" float:left; padding:15px;">
                    <font style=" color:white; margin-left:20px; font-size:16px;">亲 请耐心填写下面事项,感谢您的配合</font>
                </span>
            </div>
			<div class="login">
				<c:if test="${users == null }">
				<a class="login_a" href="${base }jsp/login.jsp">注册||登录</a>
				</c:if>
				<c:if test="${users != null }">
				 <span class="login_a"> 欢迎，${users.username } <a href="${base }tologout.action">退出</a></span> <a class="login_a login_reg" href="${base }jsp/login.jsp">个人中心</a>
				</c:if>
			</div>
            <div class="clear hideSkiplink">
                
            </div>
        </div>
        <div class="main">
            
            <div id="UpdatePanel1">
	
                    <table style="width: 100%;" cellpadding="2" cellspacing="1" class="border">
                        <tr>
                            <td class="tdbg">
                                <table cellspacing="0" cellpadding="0" width="100%" border="0">
                                    <tr>
                                        
                                        <td align="left" colspan="2">
										<div style="width:150px;float:left;height:46px;"></div>
											<input type="button" value="魔兽代练" onclick="window.location.href='${base}jsp/wowadd.jsp'" class="button gray" />
                                            <input type="button" value="暗黑代练" onclick="window.location.href='#'" class="button gray" />
                                            <input type="button" value="进度查询" onclick="window.location.href='${base}jsp/jinduchaxun.jsp'" class="button gray" />

                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="25" width="30%" align="right">
                                            <font style="color: Red;">*</font>订单编号：
                                        </td>
                                        <td height="25" width="*" align="left">
                                            <input name="ordercount" type="text" maxlength="50" id="ordercount" />
                                        </td>
                                    </tr>
                                     <tr>
                                        <td height="25" width="30%" align="right">
                                            <font style="color: Red;">*</font>角色名：
                                        </td>
                                        <td height="25" width="*" align="left">
                                            <input name="wowname" type="text" id="wowname" />

                                            
                                        </td>
                                    </tr>

                                     <tr>
                                        <td height="25" width="30%" align="right">
                                            <font style="color: Red;">*</font>旺旺 ：
                                        </td>
                                        <td height="25" width="*" align="left">
                                            <input name="wangwang" type="text" maxlength="100" id="wangwang" />
                                               <font style="color: Red;">*</font>订单价格 ：
                                                <input name="orderprice" type="text" maxlength="4" id="orderprice" onchange ="jineformat()" />元
                                         
                                           
                                        </td>
                                    </tr>

                                    <tr>
                                        <td height="25" width="30%" align="right">
                                             <font style="color: Red; padding-left:25px;">*</font>职业：
                                        </td>
                                        <td height="25" width="*" align="left">
                                             <input id="cbkLianmeng" type="radio" name="zhiye" value="野蛮人" checked="checked" />野蛮人
                                            <input id="cbkBuluo" type="radio" name="zhiye"  value="魔法师" />魔法师
											<input id="cbkLianmeng" type="radio" name="zhiye"  value="猎魔" />猎魔
											<input id="cbkLianmeng" type="radio" name="zhiye"  value="武僧" />武僧
                                            <input id="cbkBuluo" type="radio" name="zhiye"  value="圣骑" />圣骑
											<input id="cbkBuluo" type="radio" name="zhiye"  value="巫医" />巫医
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colspan="2" align="center">
                                            <font style=" color:Red; margin-left:60px;">小贴士：请勾选您付款需求的代练项目,若没有请勾选未分类项目。</font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td height="25" width="30%" align="right">
                                            <font style="color: Red;">*</font>代练项目勾选 ：
                                        </td>
                                        <td height="25" width="*" align="left">

                                   <span id="rblGame">
                                   <input id="rblGame_0" type="checkbox" name="orderproject" value="1-70级" />
                                   <label for="rblGame_0">1-70级</label><input id="rblGame_1" value="小秘境" type="checkbox" name="orderproject" />
                                   <label for="rblGame_1">小秘境</label><input id="rblGame_2" type="checkbox" value="大秘境40层" name="orderproject" />
                                   <label for="rblGame_2">大秘境40层</label><br /><input id="rblGame_3" type="checkbox" value="大秘境50层" name="orderproject" />
                                   <label for="rblGame_3">大秘境50层</label>
                                   <input id="rblGame_4" value="职业套装" type="checkbox" name="orderproject" />
                                   <label for="rblGame_4">职业套装</label>
                                   <input id="rblGame_5" value="订制装备" type="checkbox" name="orderproject" />
                                   <label for="rblGame_5">订制装备</label><br />
                                   <input id="rblGame_6" value="巅峰等级" type="checkbox" name="orderproject" />
                                   <label for="rblGame_6">巅峰等级</label>
                                   <input id="rblGame_7" value="远古装备" type="checkbox" name="orderproject" />
                                   <label for="rblGame_7">远古装备</label>
                                   <input id="rblGame_8" value="天梯排名" type="checkbox" name="orderproject" />
                                   <label for="rblGame_8">天梯排名</label><br />
                                   <input id="rblGame_9" value="地狱火护符" type="checkbox" name="orderproject" />
                                   <label for="rblGame_9">地狱火护符</label>
                                   <input id="rblGame_9" value="虹光" type="checkbox" name="orderproject" />
                                   <label for="rblGame_9">虹光</label>
                                   <input id="rblGame_9" value="灰烬幻化" type="checkbox" name="orderproject" />
                                   <label for="rblGame_9">灰烬幻化</label><br /></span>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td height="25" width="30%" align="right">
                                            <font style="color: Red;">*</font>手机号 ：
                                        </td>
                                        <td height="25" width="*" align="left">
                                           <input name="mobliephone" type="text" maxlength="13" id="mobliephone"  />
                                        </td>
                                    </tr>

                                    <tr>
                                        <td height="25" width="30%" align="right">
                                            代练内容 ：
                                        </td>
                                        <td height="25" width="*" align="left">
                                            <textarea class="xuanxiang" name="ordernote" rows="18" cols="20" id="ordernote" style="height:250px;resize: none;">
服务器：国服
阵营：
游戏角色名字：
性别：
职业：
战网帐号：
密码：
电话：
QQ：
购买项目：
备注：
</textarea>
                                        </td>
                                    </tr>

                                     <tr>
                                        <td height="25" width="30%" align="right">
                                            上传密保卡：
                                        </td>
                                        <td height="25" width="*" align="left">
                                            <input name="photo" type="file" id="photo" style=" width:180px;" /><font style="color:Red; font-size:12px;">(注:将军令保持电话接听)</font>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="height:10px;"></td>
                        </tr>
                        <tr>
                            <td align="center">
                                <table>
                                    <tr>
                                        <td>
                                            <font style=" color:Red; font-size:11px;">温馨提示：代练需知（为了您的账号安全，代练过程愉快，请务必看完）</font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <font style=" color:Red; font-size:11px;">代练前，请绑定密保产品。战网点数，大额金币及贵重物品请使用或转移后再代练。</font>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <font style=" color:Red; font-size:11px;">代练后，请先修改密码再进行游戏。若因我们原因无法完成代练，退款退单并赔付5元</font>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td class="tdbg" align="center" valign="bottom">
                                <button  name="btnSave"  id="btnSave" class="button green"/>确认无误,提交资料 </button>
                            </td>
                        </tr>
                    </table>
                
</div>
        </div>
        <div class="clear">
        </div>
    </div>
    <div class="footer">
    </div>
    </form>

    <script type="text/javascript">
    	$("#btnSave").click(function(){
    		if($("#ordercount").val() == ""){
				toalert("订单名称不能为空！");
				return false;
			}else if($("#wowname").val() == ""){
				toalert("角色名称不能为空！");
				return false;
			}else if($("#wangwang").val() == ""){
				toalert("旺旺名称不能为空！");
				return false;
			}else if($("#zhiye").val() == ""){
				toalert("职业不能为空！");
				return false;
			}else if($("#orderprice").val() == ""){
				toalert("订单价格不能为空！");
				return false;
			}else if($("#mobliephone").val() == ""){
				toalert("手机号码不能为空！");
				return false;
			}else if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test($("#mobliephone").val())) {
				toalert("手机号码格式不正确！")
				return false;
			}
    		var obj=document.getElementsByName('orderproject'); //选择所有name="'test'"的对象，返回数组
    		//取到对象数组后，我们来循环检测它是不是被选中
    		var s='';
    		for(var i=0; i<obj.length; i++){
    		if(obj[i].checked) s+=obj[i].value+','; //如果选中，将value添加到变量s中
    		} 
    		if(s == ""){
    			toalert("代练项目不能为空！");
				return false;
    		}
    		 //获取欲上传的文件路径
			var filepath = document.getElementById("photo").value;
			//为了避免转义反斜杠出问题，这里将对其进行转换
			var re = /(\\+)/g;
			var filename=filepath.replace(re,"#");
			//对路径字符串进行剪切截取
			var one=filename.split("#");
			//获取数组中最后一个，即文件名
			var two=one[one.length-1];
			//再对文件名进行截取，以取得后缀名
			var three=two.split(".");
			 //获取截取的最后一个字符串，即为后缀名
			var last=three[three.length-1];
			//添加需要判断的后缀名类型
			var tp ="jpg,bmp,JPG,BMP,jpeg,JPEG,png,PNG";
			//返回符合条件的后缀名在字符串中的位置
			var rs=tp.indexOf(last);
			//如果返回的结果大于或等于0，说明包含允许上传的文件类型
			if(rs<0){
			 toalert("请上传有效图片！");
			 return false;
			  }
			
    		$("#addwowoform").submit();
    	})

	//添加订单返回函数
	if("${mess}" == "success"){
	setTimeout(function(){
		toalert("添加成功");
	},50);	
	}else if("${mess}" == "error"){
		setTimeout(function(){
			toalert("添加失败，订单编号重复！");
		},50);	
	}else if("${mess}" == "xiugai"){
		setTimeout(function(){
			toalert("修改成功！");
		},50);	
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
         		 modal: true,
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




    //金额格式化
	function jineformat(){
		var jine = $("#orderprice").val();
		var innum = parseInt(jine);
		if(isNaN(innum)){
			$("#orderprice").val(0);
		}else{
			$("#orderprice").val(innum);
		}
	}  
           
    	
    </script>
    <div id="alertwindow" style="display: none;">
	<div id="alertdiv"></div>
</div>
</body>
</html>
