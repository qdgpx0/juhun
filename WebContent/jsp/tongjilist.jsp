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
#ui-datepicker-div{
width:250px;
}

</style>      

<div class="row">
    <div class="col-xs-12">
        <!-- PAGE CONTENT BEGINS -->
        <div class="b_page-main-contant sousuo col-xs-12">

            <div class="col-lg-4 col-xs-5 lui-pdf0"><input type="text" class="col-lg-12 col-xs-12 pull-right b_input_lb"
                                                           id="b_grid_input1" placeholder="请输入日期，格式为2015-05-07"></div>
            <div>


                <a type="button" class="btn btn-primary  no-border jg-ss-but" onclick="searchtongji()">

                    <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>
                </a>

            </div>


            

        </div>
        <div class="b_grid_line  col-lg-12"></div>

	<table id="users" class="ui-widget ui-widget-content" width=100%; style="text-align:center;">
 
    <thead>
    	<tr>
    	  <input type="text" name="regtimes" id="regtimebegin" value="" class="text ui-widget-content ui-corner-all"  title="请填写时间">
      	  <input type="button" id="regtimebutton" value="下单时间搜索" class="btn btn-primary btn-sm" style="margin-bottom: 3px;" onclick="autosearchtongjiday()"/>
    	</tr>
 		<tr class="ui-widget-header ">
      	<th>统计日期</th>
        <th>下单总价</th>
        <th>退单总价</th>
        <th>差价总计</th>
        <th>下单数量</th>
        <th>退单数量</th>
        <th>订单平均价</th>
      </tr>
    </thead>
    <tbody>
      <tr>

      	<td>${daymap.datetime }</td>
        <td>
        <fmt:formatNumber pattern="#0.00元" value="${daymap.zongjia }"></fmt:formatNumber>
        </td>
        <td>
        	
        	<fmt:formatNumber pattern="#0.00元" value="${daymap.tuidanzong }"></fmt:formatNumber>
        </td>
        <td><fmt:formatNumber pattern="#0.00元" value="${daymap.chajia }"></fmt:formatNumber> </td>
        <td>${daymap.ordercount }</td>
        <td>${daymap.tuidanshu }</td>
        <td>
        <fmt:formatNumber pattern="#0.00元" value="${daymap.pingjunjia }"></fmt:formatNumber>
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
	$( "#regtimebegin" ).datepicker({dateFormat:"yy-mm-dd",showButtonPanel: true}, $.datepicker.regional['zh-CN']);	

 	//选择页数修改
   if("${daymap}" == "" || "${daymap}" == null){
	   url="${base}tongjiday.action";
	   $(".page-content-area").load(url);
   }
});
function searchtongji(){
	var dname =  $("#b_grid_input1").val();
	var url="${base}tongjiday.action?dname="+dname;
	 $(".page-content-area").load(url);
}
function autosearchtongjiday(){
	var dname =  $("#regtimebegin").val();
	var url="${base}tongjiday.action?dname="+dname;
	 $(".page-content-area").load(url);
}
</script>
          