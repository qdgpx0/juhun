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
    	text-align: left;
    }

</style>


        

<div class="row">
    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <div class="b_page-main-contant sousuo col-xs-12">

            <div class="col-lg-4 col-xs-5 lui-pdf0"><input type="text" class="col-lg-12 col-xs-12 pull-right b_input_lb"
                                                           id="b_grid_input1" placeholder="关键字：订单编号、角色名称、旺旺名称"></div>
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
			<th colspan="3">
		<input type="button" value="魔兽世界" class="btn btn-sm btn-primary" onclick="searchclass(0)">
        <input type="button" value="暗黑3" class="btn btn-sm btn-primary" onclick="searchclass(1)">
			</th>
			<th colspan="8" style="text-align:right">
		<input type="button" value="已下单" class="btn btn-sm btn-primary" onclick="searchzhuang(0)">
        <input type="button" value="已安排" class="btn btn-sm btn-primary" onclick="searchzhuang(1)" >
        <input type="button" value="代练中" class="btn btn-sm btn-primary" onclick="searchzhuang(2)" >
        <input type="button" value="已完成" class="btn btn-sm btn-primary" onclick="searchzhuang(3)">
        <input type="button" value="已退单" class="btn btn-sm btn-primary" onclick="searchzhuang(4)">
			</th>
		</tr>
 		<tr class="ui-widget-header ">
      	<th>#</th>
        <th>订单编号</th>
        <th>游戏类型</th>
        <th>订单价格</th>
        <th>角色名称</th>
        <th>旺旺名称</th>
        <th>客户电话</th>
        <th>下单时间</th>
        <th>批复管理</th>
        <th>订单状态</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
    <c:forEach items="${requestScope.page.list}" var="stu" varStatus="status">
      <tr>
      	<td>
      	<c:out value="${status.count + (requestScope.page.pageNumber -1) * 10}"></c:out>
      	<input type="checkbox" name="check" value="${stu.id}" autocomplete="off">
      	</td>
        <td>${stu.ordercount }</td>
        <td>
        	<c:if test="${stu.projectclass == '0' }">魔兽世界</c:if>
        	<c:if test="${stu.projectclass == '1' }">暗黑3</c:if>
        </td>
        <td><fmt:formatNumber pattern="#0.00" value="${stu.orderprice }"></fmt:formatNumber> </td>
        <td>${stu.wowname }</td>
        <td>${stu.wangwang }</td>
         <td>${stu.mobliephone }</td>
        <td>
        	 <fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${stu.createtime }" type="both"/>
        </td>
        <td>${stu.orderadmin }</td>
        <td>
      
        <c:if test="${stu.orderzhuangtai == 0}">已下单</c:if>
        <c:if test="${stu.orderzhuangtai == 1}">已安排</c:if>
        <c:if test="${stu.orderzhuangtai == 2}">代练中</c:if>
        <c:if test="${stu.orderzhuangtai == 3}">已完成</c:if>
        </td>
        <td width=200;>

        <input type="button" value="查看" onclick="chakanorder(this)" class="btn btn-sm btn-warning"   myvalue="${stu.id}" pagenum = "${requestScope.page.pageNumber}">
        <input type="button" value="修改状态" onclick="updatezhuang(this)" class="updatebutton btn btn-sm btn-success"  zhuang = "${stu.orderzhuangtai }"  myvalue="${stu.id}" pagenum = "${requestScope.page.pageNumber}">
        <input type="button" value="删除" class="deletebutton btn btn-sm btn-danger" onclick="deleteorder(this)" style="cursor:pointer"  myvalue="${stu.id}" pagenum = "${requestScope.page.pageNumber}">
        </td>
      </tr>
    </c:forEach>
      <tr>
      	<td colspan="3" style="text-align:left">
        	<input type="button" value="全选" class="btn btn-sm btn-primary" onClick="checkall()">
            <input type="button" value="反选" onClick="checkthese()" class="btn btn-sm btn-primary">
            <input type="button" value="批量删除" id="deletebyids" onclick="deleteorders(this)" class="btn btn-sm btn-primary"  pagenum = "${requestScope.page.pageNumber}">
          
        </td>
        <td colspan="2">
       		<input type="button" value="上一页" class="btn btn-sm btn-primary" onclick="uppage('${requestScope.page.pageNumber}')"/> 
        	<input type="button" value="下一页" class="btn btn-sm btn-primary" onclick="downpage('${requestScope.page.pageNumber}','${requestScope.page.sumpage }')"/> 	  
        </td>
        <td>
        	<span class=" toshow" style="color: #666; ">共${requestScope.page.sumcount}条记录</span>
        </td>
        <td colspan="2">
        	<span class=" toshow" style="color: #666; ">跳转到：</span>
        	<select id="pagechange" onchange="pagechange()">
        			<option value ="${requestScope.page.pageNumber }">${requestScope.page.pageNumber }</option>
        		<c:forEach begin="1" end="${requestScope.page.sumpage }" var="i">
        			<option value="${i }">${i }</option>
        		</c:forEach>
        	</select>
        </td>
        <td colspan="3">
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
    <tfoot>
    	<tr>
    		<td align="center" colspan="7">
    		   
    		</td>
    	</tr>
    </tfoot>
  </table>


    




        <!-- PAGE CONTENT ENDS -->
    </div>
    <!-- /.col -->
</div><!-- /.row -->

<!-- page specific plugin scripts -->
<script type="text/javascript">
/*if("${updatemess}" == "success"){
		toalert("操作成功！");
	}else if("${updatemess}" == "error"){
		toalert("操作失败！");
	}*/
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
var scripts = [null,null]
ace.load_ajax_scripts(scripts, function () {
 	//选择页数修改
   if("${page}" == "" || "${page}" == null){
	   url = "${base}searcwoworder.action";
	   $(".page-content-area").load(url);
   }
});

function changepage(i){
	  	$(function(){
	  
	var url="${base}searcwoworder.action?pagenum="+i;
	 $(".page-content-area").load(url);
	  		
	  	})
	}
	//上一页
	function uppage(page){
		if(page <= 1){
	  		//page = maxpage-1;
	  		toalert("这已是首页")
	  	}else{
	  
		var url="${base}searcwoworder.action?pagenum="+(Number(page)-1);
		 $(".page-content-area").load(url);
	  	}
	}
	//下啦页数选择
	
	function pagechange(){
		var pagenum = $("#pagechange").children("option:selected").val();
		var url="${base}searcwoworder.action?pagenum="+pagenum;
		 $(".page-content-area").load(url);
	}
	function updatezhuang(obj){
		 var id = $(obj).attr("myvalue");
		 var pagenum = $(obj).attr("pagenum");
		 alertSelect(id,pagenum);
	}
	function chakanorder(obj){
		var id = $(obj).attr("myvalue");
		var url="${base}chakanorder.action?id="+id;
		 $(".page-content-area").load(url);
	}
	//下一页
	function downpage(page,maxpage){
	  	if(page>=maxpage){
	  		//page = maxpage-1;
	  		toalert("这已是最后一页")
	  	}
	  	else{
	  
		var url="${base}searcwoworder.action?pagenum="+(Number(page)+1);
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
function alertSelect(id,pagenum){
	$("#updateid").text(id);
	$("#updatepage").text(pagenum);
		$("#updatezhuang").modal({
			 keyboard: true,
			 backdrop:false
				 });		   
}
//提交状态
function updateorder(){
var id = $("#updateid").text();
var pagenum = $("#updatepage").text();
var orderzhuangtai = $("#ordergaizhuang").children("option:selected").val();
var url="${base}updatezhuang.action?id="+id+"&pagenum="+pagenum+"&orderzhuangtai="+orderzhuangtai;
$.post(url,{},function(data){
	if(data.message == "success"){
		
		toalert("操作成功！");
	}else if(data.message == "error"){
		toalert("操作失败！");
	};
});

}
function searchorder(){
	var dname =  $("#b_grid_input1").val();
	var url="${base}searcwoworder.action?dname="+dname;
	 $(".page-content-area").load(url);
}
function EnterPress(e){ //传入 event 
	var e = e || window.event; 
	if(e.keyCode == 13){ 
		searchorder();//搜索方法
	} 
}
function searchclass(st){
	var url="${base}searcwoworder.action?projectclass="+st;
	 $(".page-content-area").load(url);
}
function searchzhuang(st){
	var url="${base}searcwoworder.action?orderzhuangtai="+st;
	 $(".page-content-area").load(url);
}
function xiaochu(){
	if($("#tishi").text() == "操作成功！"){
		var pagenum = $("#updatepage").text();
		var url="${base}searcwoworder.action?pagenum="+pagenum;
		$(".page-content-area").load(url);
	}
}
function deleteorder(obj){
	var id = $(obj).attr("myvalue");
	var pagenum = $(obj).attr("pagenum");
	confrim(id,pagenum,"dan");
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
if(adminquanxian != "piliang"){
var url="${base}deleteorder.action?id="+id+"&pagenum="+pagenum;
$.post(url,{},function(data){
	if(data.message == "success"){
		
		toalert("操作成功！");
	}else if(data.message == "error"){
		toalert("操作失败！");
	};
});}else{

$.post("${base}deleteorders.action",{pagenum:pagenum,ids:id},function(data){
	if(data.message == "success"){
		
		toalert("操作成功！");
	}else if(data.message == "error"){
		toalert("操作失败！");
	};
		});
}
}
//批量删除方法
function deleteorders(obj){
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
	confrim(ids,pagenum,"piliang");
};
</script>
          <!----单选提示按钮--->
      		 <div id="alerts"   tabindex="-1" class="modal fade" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog  my-dialog-1">
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
      		 <div id="updatezhuang"   tabindex="-1" class="modal fade" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog  my-dialog-1">
                     <div class="modal-content">
                             <div class="my-dialog-header-1" id="alertshead">
									<i class="ace-icon fa fa-check"></i>
									提示
									 <button type="button" class="close   my-close" data-dismiss="modal" aria-label="Close"><i class="fa fa-times"></i><!--<span aria-hidden="true">x</span>--></button>
                             </div>
                             <div class="modal-body  my-dialog-body-2 ">
					                
								<select class="lui-height30 lui-floatl col-md-9 col-xs-9" id="ordergaizhuang" >
                  						<option value="0">刚下单</option>
                  						<option value="1">已安排</option>
                 						<option value="2">代练中</option>
                  						<option value="3">已完成</option>
                  						<option value="4">已退单</option>
                				</select>	
								<span id="updateid" style="display: none;"></span>  
								<span id="updatepage" style="display: none;"></span> 
								</br></br>
                            </div>
                           <div class="modal-footer my-dialog-footer">
                             	<a  class="btn btn-success" data-dismiss="modal" onclick="updateorder()">确认</a>
                           </div>
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
  