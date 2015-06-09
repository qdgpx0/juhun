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
<link href="${base }css/wow.css" rel="stylesheet" type="text/css" />
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
        background:url(${base}images/chaxun.jpg) top center no-repeat; 
        }
     #yanshitab td{
     text-align: center;
     }   

</style>
<script src="${base }js/jquery-1.10.2.js" type="text/javascript"></script>
<script src="${base }js/jquery-ui-1.10.4.custom.js" type="text/javascript"></script>
</head>
<body>
    <form name="form1" method="post" action="${base }searchorderuser.action" id="form1">
    <div class="page">
        <div class="header">
            <div class="title">
                    <h1>
                        聚魂游戏代练管理系统
                    </h1>
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
            <table style="width: 100%;" cellpadding="2" cellspacing="1" class="border">
                <tr>
                    <td class="tdbg">
                        <table cellspacing="0" cellpadding="0" width="100%"  border="0">
                            <tr>

                                 <td align="left" colspan="2">
										<div style="width:150px;float:left;height:46px;"></div>
											<input type="button" value="魔兽代练" onclick="window.location.href='${base}jsp/wowadd.jsp'" class="button gray" />
                                            <input type="button" value="暗黑代练" onclick="window.location.href='${base}jsp/dorderadd.jsp'" class="button gray" />
                                            <input type="button" value="进度查询" onclick="window.location.href='${base}jsp/jinduchaxun.jsp'" class="button gray" />
                                        </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <table>
                                        <tr>
                                            <td style=" padding-left:100px;">
                                                订单编号或角色名或旺旺名输入任意一个查询代练进度！
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style=" padding-left:100px;">
                                                <input name="dname" type="text" id="dname" style="height:25px;width:410px;font: 16px;" />
                                                <input type="submit" name="btnSelect" value="查询" id="btnSelect" class="button green" />
                                            </td>
                                        </tr>
                                        <tr id="yanshitab">
                                            <td colspan="2" align="center" style=" padding-left:60px;">
                                        
                                             <c:if test="${orderlist != null }">
                                                <div style="border: 1px solid #EBEBEB; width: 600px;">
                                                    <br>
                                                    <h4>  代练进度信息</h4>
                                                    <br>
                                                    <table style="width: 100%;" border="0">
                                                        <tbody><tr>
                                                        	 <td style="background: #BCEE68; text-align:center;">
                                                                	代练订单
                                                            </td>
                                                            <td style="background: #BCEE68; text-align:center;">
                                                                	提交时间
                                                            </td>
                                                            <td style="background: #BCEE68; text-align:center;">
                                                          		      批复时间
                                                            </td>
                                                            <td style="background: #BCEE68 ;text-align:center;">
                                                        		        代练中
                                                            </td>
                                                            <td style="background: #BCEE68 ;text-align:center;">
                                                            	    代练完成
                                                            </td>
                                                        </tr>
                                                       <c:forEach items="${orderlist }" var="ol">
                                                        <tr>
                                                       
                                                            <td style=" text-align:center;">
                                                               ${ol.ordercount }
                                                            </td>
                                                            <c:if test="${ol.orderzhuangtai == 1 }">
                                                            <td style=" text-align:center;">
                                                             <fmt:formatDate pattern="yyyy-MM-dd" value="${ol.createtime }" type="both"/>
                                                               
                                                            </td>
                                                            <td>
                                                            <fmt:formatDate pattern="yyyy-MM-dd" value="${ol.pifutime }" type="both"/>
                                                                
                                                            </td>
                                                            <td>
                                                               	 已安排	
                                                            </td>
                                                            <td>
                                                                
                                                            </td>
                                                            </c:if>
                                                             <c:if test="${ol.orderzhuangtai == 2 }">
                                                            <td style=" text-align:center;">
                                                             <fmt:formatDate pattern="yyyy-MM-dd" value="${ol.createtime }" type="both"/>
                                                            </td>
                                                            <td>
                                                              <fmt:formatDate pattern="yyyy-MM-dd" value="${ol.pifutime }" type="both"/>
                                                               
                                                            </td>
                                                            <td>
                                                               	正在代练中	
                                                            </td>
                                                            <td>
                                                                
                                                            </td>
                                                            </c:if>
                                                            <c:if test="${ol.orderzhuangtai == 3 }">
                                                            <td style=" text-align:center;">
                                                             <fmt:formatDate pattern="yyyy-MM-dd" value="${ol.createtime }" type="both"/>
                                                            </td>
                                                            <td>
                                                             <fmt:formatDate pattern="yyyy-MM-dd" value="${ol.pifutime }" type="both"/>
                                                                
                                                            </td>
                                                            <td>
                                                               		
                                                            </td>
                                                            <td>
                                                                	已完成
                                                            </td>
                                                            </c:if>
                                                             <c:if test="${ol.orderzhuangtai == 4 }">
                                                            <td style=" text-align:center;">
                                                             <fmt:formatDate pattern="yyyy-MM-dd" value="${ol.createtime }" type="both"/>
                                                            </td>
                                                            <td>
                                                             <fmt:formatDate pattern="yyyy-MM-dd" value="${ol.pifutime }" type="both"/>
                                                                
                                                            </td>
                                                            <td>
                                                               		
                                                            </td>
                                                            <td>
                                                                	已退单
                                                            </td>
                                                            </c:if>
                                                             <c:if test="${ol.orderzhuangtai != 1 && ol.orderzhuangtai != 2 && ol.orderzhuangtai != 3 && ol.orderzhuangtai != 4}">
                                                            <td style=" text-align:center;">
                                                             <fmt:formatDate pattern="yyyy-MM-dd" value="${ol.createtime }" type="both"/>
                                                            </td>
                                                            <td>
                                                               
                                                            </td>
                                                            <td>
                                                               		
                                                            </td>
                                                            <td>
                                                                	正抓紧时间给你安排代练中
                                                            </td>
                                                            </c:if>
                                                        </tr>
                                                        </c:forEach>
                                                        <tr>
                                                            <td colspan="5" style="height: 10px;">
                                                            </td>
                                                        </tr>
                                                       
                                                    </tbody></table>
                                                </div>
											</c:if>
                                                
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style=" height:50px;"></td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
        <div class="clear">
        </div>
    </div>
    <div class="footer">
    </div>
    </form>
    <script >
  //添加订单返回函数
	if("${message}" == "success"){
	setTimeout(function(){
		
	},50);	
	}else if("${message}" == "wu"){
		setTimeout(function(){
			toalert("未查到结果！");
		},50);	
	}else if("${message}" == "cha"){
		setTimeout(function(){
			toalert("查询条件不能为空！");
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
    </script>
        <div id="alertwindow" style="display: none;">
	<div id="alertdiv"></div>
</div>
</body>
</html>
