<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
pageContext.setAttribute("base", basePath);
%>
<title>订单列表页</title>

<link href="${base }css/jquery-ui-1.10.4.custom.min.css" rel="stylesheet" type="text/css" />
<!-- ajax layout which only needs content area -->
<style>
    .ui-jqgrid-sortable {
        text-align: center;
    }

    .center {
        text-align: center;
    }
    th{
    	text-align: center;
    }

</style>


        

<div class="row">
    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <div class="b_page-main-contant sousuo col-xs-12">

            <div class="col-lg-4 col-xs-5 lui-pdf0"><input type="text" class="col-lg-12 col-xs-12 pull-right b_input_lb"
                                                           id="b_grid_input1" placeholder="关键字：管理员账号，管理员真实姓名"></div>
            <div>


                <a type="button" class="btn btn-primary  no-border jg-ss-but" onclick="searchorder()">

                    <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
                </a>

            </div>


            

        </div>
        <div class="b_grid_line  col-lg-12"></div>

	<table id="users" class="ui-widget ui-widget-content" width=100%; style="text-align:center;">
 
    <thead>
		<tr>
			<th colspan="1" style="text-align:left">
		<input type="button" value="店主" class="btn btn-sm btn-primary" onclick="searchclass('boss')">
        <input type="button" value="管理员" class="btn btn-sm btn-primary" onclick="searchclass('putong')">
			</th>
		</tr>
 		<tr class="ui-widget-header ">
      	<th>#</th>
        <th>管理员账号</th>
        <th>管理员真实姓名</th>
        <th>管理员权限</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
    <c:forEach items="${requestScope.page.list}" var="stu" varStatus="status">
      <tr>
      	<td>
      	<c:out value="${status.count + (requestScope.page.pageNumber -1) * 10}"></c:out>
      	<c:if test="${stu.adminqx != 'boss' }">
      	<input type="checkbox" name="check" value="${stu.id}" autocomplete="off">
      	</c:if>
      	</td>
        <td>${stu.ausername }</td>
        <td>
        	${stu.adminname }
        </td>
        <td>
        <c:if test="${stu.adminqx == 'boss'}">
        	店主
        </c:if> 
        <c:if test="${stu.adminqx != 'boss' }">
        	管理员
        </c:if> 
        </td>
        <td width=200;>
        <input type="button" value="修改" onclick="updateadmin(this)" class="updatebutton btn btn-sm btn-grey"   myvalue="${stu.id}" username="${stu.ausername }" adminpassword="${stu.adminpassword }" adminname="${stu.adminname }" pagenum = "${requestScope.page.pageNumber}">
        <input type="button" value="删除" class="deletebutton btn btn-sm"  onclick="deleteadmin(this)" style="cursor:pointer"  myvalue="${stu.id}" adminqx="${stu.adminqx }" pagenum = "${requestScope.page.pageNumber}">
        </td>
      </tr>
    </c:forEach>
      <tr>
      	<td colspan="2" style="text-align:left;">
      	    <input type="button" value="新增" class="btn btn-sm btn-primary" onClick="addadmin()">
        	<input type="button" value="全选" class="btn btn-sm btn-primary" onClick="checkall()">
            <input type="button" value="反选" onClick="checkthese()" class="btn btn-sm btn-primary">
            <input type="button" value="批量删除" onclick="deleteall(this)" id="deletebyids" class="btn btn-sm btn-primary"  pagenum = "${requestScope.page.pageNumber}">
          </td>
      <td >
       		<input type="button" value="上一页" class="btn btn-sm btn-primary" onclick="uppage('${requestScope.page.pageNumber}')"/> 
        	<input type="button" value="下一页" class="btn btn-sm btn-primary" onclick="downpage('${requestScope.page.pageNumber}','${requestScope.page.sumpage }')"/> 	  
        	<span class=" toshow" style="color: #666; ">共${requestScope.page.sumcount}条记录</span>
        	<span class=" toshow" style="color: #666; ">跳转到：</span>
        	<select id="pagechange" onchange="pagechange()">
        			<option value ="${requestScope.page.pageNumber }">${requestScope.page.pageNumber }</option>
        		<c:forEach begin="1" end="${requestScope.page.sumpage }" var="i">
        			<option value="${i }">${i }</option>
        		</c:forEach>
        	</select>
        </td>
        <td colspan="2">
        	<c:forEach begin="1" end="${requestScope.page.sumpage }" var="i">
        		<c:if test="${requestScope.page.pageNumber == i}">
        			<span class="btn-primary btn" style="color: #666; ">${i }</span>
        		</c:if>
        		<c:if test="${requestScope.page.pageNumber-1 == i}">
        		<a href="javascript:void;" onclick="javascript:changepage('${i}')" style="color: #666; "   class="btn btn-primary">${i }</a>
        		</c:if>
        		 <c:if test="${requestScope.page.pageNumber-2 == i}">
        		<a href="javascript:void;" onclick="javascript:changepage('${i}')" style="color: #666; "   class="btn btn-primary">${i }</a>
        		</c:if>
        		 <c:if test="${requestScope.page.pageNumber+1 == i}">
        		<a href="javascript:void;" onclick="javascript:changepage('${i}')" style="color: #666; "   class="btn btn-primary">${i }</a>
        		</c:if>
        		<c:if test="${requestScope.page.pageNumber+2 == i}">
        		<a href="javascript:void;" onclick="javascript:changepage('${i}')" style="color: #666; "   class="btn btn-primary">${i }</a>
        		</c:if>
        	</c:forEach>
        </td>
      </tr>
    </tbody>
  </table>


    




        <!-- PAGE CONTENT ENDS -->
    </div>
    <!-- /.col -->
</div><!-- /.row -->

<!-- page specific plugin scripts -->
<script type="text/javascript">

var scripts = [null,null]
ace.load_ajax_scripts(scripts, function () {
 	//选择页数修改
   if("${page}" == "" || "${page}" == null){
	   url = "${base}searchadminall.action";
	   $(".page-content-area").load(url);
   }
});

function changepage(i){
	  	$(function(){
	  
	var url="${base}searchadminall.action?pagenum="+i;
	 $(".page-content-area").load(url);
	  		
	  	})
	}
	//上一页
	function uppage(page){
		if(page <= 1){
	  		//page = maxpage-1;
	  		toalert("这已是首页")
	  	}else{
	  
		var url="${base}searchadminall.action?pagenum="+(Number(page)-1);
		 $(".page-content-area").load(url);
	  	}
	}
	//下啦页数选择
	
	function pagechange(){
		var pagenum = $("#pagechange").children("option:selected").val();
		var url="${base}searchadminall.action?pagenum="+pagenum;
		 $(".page-content-area").load(url);
	}
	function updateadmin(obj){
		 var id = $(obj).attr("myvalue");
		 var ausername = $(obj).attr("username");
		 var adminpassword = $(obj).attr("adminpassword");
		 var adminname = $(obj).attr("adminname");
		 var pagenum = $(obj).attr("pagenum");
		 $("#ausername").attr("readonly","readonly");
		 alertSelect(id,ausername,adminpassword,adminname,pagenum);
	}
	function deleteadmin(obj){
		var id = $(obj).attr("myvalue");
		var adminqx = $(obj).attr("adminqx");
		var pagenum = $(obj).attr("pagenum");
		if(adminqx == "boss"){
			toalert("admin账号无法删除！")
			return false;
		}
		confrim(id,pagenum,adminqx);
	}
	//下一页
	function downpage(page,maxpage){
	  	if(page>=maxpage){
	  		//page = maxpage-1;
	  		toalert("这已是最后一页")
	  	}
	  	else{
	  
		var url="${base}searchadminall.action?pagenum="+(Number(page)+1);
	 $(".page-content-area").load(url);
	  	}
	}
	//全选
	function checkall(){
		var checkboxs = document.getElementsByName("check");
		for(var i=0;i<checkboxs.length;i++){
			checkboxs[i].checked=true;
		}	
}
	
	//反选
function checkthese(){
	var checkboxs = document.getElementsByName("check");
	for(var i=0;i<checkboxs.length;i++){
		if(checkboxs[i].checked){checkboxs[i].checked = false;}else{checkboxs[i].checked = true;}
		}	
}
//提示js
function toalert(str){
	$("#tishi").text(str)
	$(function(){
	$("#alerts").modal({
		 keyboard: true,
		 backdrop:false
			 });		   
	})

}
//下拉模态框初始化
function alertSelect(id,ausername,adminpassword,adminname,pagenum){
	$("#updateid").text(id);
	$("#ausername").val(ausername);
	$("#adminpassword").val(adminpassword);
	$("#relpassword").val(adminpassword);
	$("#adminname").val(adminname);
	$("#updatepage").text(pagenum);
		$("#updatezhuang").modal({
			 keyboard: true,
			 backdrop:false
				 });		   
}
function confrim(id,adminpagenum,adminquanxian){
	$("#adminid").text(id);
	$("#adminpagenum").text(adminpagenum);
	$("#adminquanxian").text(adminquanxian);
	$("#comfirm").modal({
		 keyboard: true,
		 backdrop:false
			 });
}
function adminsubmit(){
var id = $("#adminid").text();
var pagenum = $("#adminpagenum").text();
var adminquanxian = $("#adminquanxian").text();
if(adminquanxian != "批量"){
var url="${base}deleteadmin.action?id="+id+"&pagenum="+pagenum;
$.post(url,{},function(data){
	if(data.message == "success"){
		
		toalert("操作成功！");
	}else if(data.message == "error"){
		toalert("操作失败！");
	};
});}else{

$.post("${base}deletealls.action",{pagenum:pagenum,id:id},function(data){
	if(data.message == "success"){
		
		toalert("操作成功！");
	}else if(data.message == "error"){
		toalert("操作失败！");
	};
		});
}
}
//提交状态
function updateorder(){
var id = $("#updateid").text();
var pagenum = $("#updatepage").text();
var ausername = $("#ausername").val();
var adminpassword = $("#adminpassword").val();
var relpassword = $("#relpassword").val();
var adminname = $("#adminname").val();
if(ausername == ""){
	toalert("账号不能为空");
	return;
}else if(adminpassword == ""){
	toalert("密码不能为空");
}else if(adminpassword != relpassword){
	toalert("俩次密码不一致");
}else{
	$("#updatezhuang").modal('hide');
}
var url="${base}updateadmin.action?id="+id+"&pagenum="+pagenum;
$.post(url,{ausername:ausername,adminpassword:adminpassword,adminname:adminname},function(data){
	if(data.message == "success"){
		
		toalert("操作成功！");
	}else if(data.message == "error"){
		toalert("操作失败！");
	}else if(data.message == "chongfu"){
		toalert("账号重复！");
	};
});

}
function searchorder(){
	var keyword =  $("#b_grid_input1").val();
	var url="${base}searchadminall.action?keyword="+keyword;
	 $(".page-content-area").load(url);
}
function EnterPress(e){ //传入 event 
	var e = e || window.event; 
	if(e.keyCode == 13){ 
		searchorder();//搜索方法
	} 
}
function searchclass(st){
	var url="${base}searchadminall.action?adminqx="+st;
	 $(".page-content-area").load(url);
}
function xiaochu(){
	if($("#tishi").text() == "操作成功！"){
		var pagenum = $("#updatepage").text();
		var url="${base}searchadminall.action?pagenum="+pagenum;
		$(".page-content-area").load(url);
	}
}
function qingkongshuju(){
	$("#adminpassword").val("");
	$("#relpassword").val("");
	$("#adminname").val("");
}
function addadmin(){
	$("#ausername").attr("readonly",false);
	 alertSelect("","","","",1);
}
	//批量删除方法
function deleteall(obj){
	var checkboxs = document.getElementsByName("check");
	var ids = "";
	for(var i=0;i<checkboxs.length;i++){
			if(checkboxs[i].checked == true){
				ids = ids + checkboxs[i].value+",";
			}
		}
		if(ids == ""){
			toalert("最少选中一项");
			return false;
		}  	
	var pagenum = $(obj).attr("pagenum");//获取当前页
	confrim(ids,pagenum,"批量");
};
</script>
          <!----单选提示按钮--->
      		 <div id="alerts"   tabindex="-1" class="modal fade" role="dialog"  aria-labelledby="myModalLabel"  aria-hidden="true" style="z-index: 999" >
                  <div class="modal-dialog  my-dialog-1" >
                     <div class="modal-content">
                             <div class="my-dialog-header-1" id="alertshead">
									<i class="ace-icon fa fa-check"></i>
									提示
									 <button type="button" class="close   my-close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i><!--<span aria-hidden="true">x</span>--></button>
                             </div>
                             <div class="modal-body  my-dialog-body-2 ">
					                
											 <i class="ace-icon fa fa-hand-o-right blue bigger-120"></i> <span id="tishi"></span>
								   
                            </div>
                           <div class="modal-footer my-dialog-footer">
                             	<a  class="btn btn-success" data-dismiss="modal" onclick="xiaochu()">确认</a>
                           </div>
                  </div>
        </div>
  </div>
          <!----状态下拉菜单--->
      		 <div id="updatezhuang"   tabindex="-1" class="modal fade" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true" style="z-index: 99">
                  <div class="modal-dialog  my-dialog-4" >
                     <div class="modal-content">
                     <form>
                             <div class="my-dialog-header-1" id="alertshead">
									<i class="ace-icon fa fa-check"></i>
									提示
									 <button type="button" class="close   my-close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i><!--<span aria-hidden="true">x</span>--></button>
                             </div>
                             <div class="modal-body  my-dialog-body-2 ">
                             	<br />
       						
							<div class="col-xs-12 col-sm-12">
        					  <div class="form-group">
         						   <label class="col-sm-3 control-label no-padding-right" for="ausername">账号</label>
           							<div class="col-sm-9">
           								   <input class="col-xs-12 col-sm-9" type="text" id="ausername" placeholder="请输入账号"  />
            						</div>
          					</div>
        					</div>
        					<br />
        					<br />
        					<br />
        					<div class="col-xs-12 col-sm-12">
        					  <div class="form-group">
         						   <label class="col-sm-3 control-label no-padding-right" for="adminpassword">密码</label>
           							<div class="col-sm-9">
           								   <input class="col-xs-12 col-sm-9" type="password" id="adminpassword" placeholder="请输入密码" />
            						</div>
          					</div>
        					</div>
        					<br />
        					<br />
        				
        					<br />
        					<div class="col-xs-12 col-sm-12">
        					  <div class="form-group">
         						   <label class="col-sm-3 control-label no-padding-right" for="relpassword">确认密码</label>
           							<div class="col-sm-9">
           								   <input class="col-xs-12 col-sm-9" type="password" id="relpassword" placeholder="请再次输入密码" />
            						</div>
          					</div>
        					</div>
        					<br />
        					<br />
        					<br />
        					<div class="col-xs-12 col-sm-12">
        					  <div class="form-group">
         						   <label class="col-sm-3 control-label no-padding-right" for="adminname">真实姓名</label>
           							<div class="col-sm-9">
           								   <input class="col-xs-12 col-sm-9" type="text" id="adminname" placeholder="请输入真实姓名" />
            						</div>
          					</div>
        					</div>
								<span id="updateid" style="display: none;"></span>  
								<span id="updatepage" style="display: none;"></span> 
                            </div>
                            <br />
        					<br />
        					
                           <div class="modal-footer my-dialog-footer">
                             	<a  class="btn btn-success"  onclick="updateorder()">确认</a>
                             	<a type="reset" class="btn btn-primary"  onclick="qingkongshuju()">清空</a>
                           </div>
                           </form>
                  </div>
        </div>
  </div>
  
<div id="comfirm"   tabindex="-1" class="modal  fade" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
        
  <div class="modal-dialog    my-dialog-1">
    <div class="modal-content">
           <div class="my-dialog-header-1"><!--modal-header alert alert-block--> 							
                    <i class="ace-icon fa fa-exclamation-triangle red"></i>
                     确定保存
				    <button type="button" class="close   my-close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i><!--<span aria-hidden="true">x</span>--></button>
          </div><!-- my-dialog-header-1  end-->
          
          <div class="modal-body  my-dialog-body-2" data-spy="scroll">
               
               

                    <i class="ace-icon fa fa-hand-o-right blue bigger-120"></i>  你确定要删除吗？
                 <div id="adminid" style="display: none;"></div>  
				 <div id="adminpagenum" style="display: none;" ></div> 
				 <div id="adminquanxian" style="display: none;" ></div> 



          </div><!-- my-dialog-body   end-->
          
          <div class="modal-footer   my-dialog-footer">
                  <button type="button" class="btn btn-primary"  data-dismiss="modal" onclick="adminsubmit()">确认</button>
               
       			  <button type="button" class="btn " data-dismiss="modal">取消</button>
                  
              
       </div> <!--my-dialog-footer   end-->
     
    </div><!--my-dialog-1   end-->
  </div>
  
 </div>
