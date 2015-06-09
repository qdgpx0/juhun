<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
pageContext.setAttribute("base", basePath);
%>
	<table id="users" class="ui-widget ui-widget-content" width=100%; style="text-align:center;font-size: 15px;">
 
    <thead>
 		<tr class="ui-widget-header ">
      	<th>#</th>
        <th>订单编号</th>
        <th>游戏类型</th>
        <th>订单价格</th>
        <th>角色名称</th>
        <th>下单时间</th>
        <th>批复管理</th>
        <th>订单状态</th>
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
        	<c:if test="${stu.projectclass == '1' }">暗黑三</c:if>
        </td>
        <td><fmt:formatNumber pattern="#0.00" value="${stu.orderprice }"></fmt:formatNumber> </td>
        <td>${stu.wowname }</td>
        <td>
        	 <fmt:formatDate pattern="yyyy-MM-dd HH:mm:ss" value="${stu.createtime }" type="both"/>
        </td>
        <td>${stu.orderadmin }</td>
        <td>
      
        <c:if test="${stu.orderzhuangtai == 0}">刚下单</c:if>
        <c:if test="${stu.orderzhuangtai == 1}">已安排</c:if>
        <c:if test="${stu.orderzhuangtai == 2}">代练中</c:if>
        <c:if test="${stu.orderzhuangtai == 3}">已完成</c:if>
        </td>
      </tr>
    </c:forEach>
      <tr>
        <td colspan="3">
       		<input type="button" value="上一页" class="btn btn-sm btn-primary" onclick="uppage('${requestScope.page.pageNumber}')"/> 
        	<input type="button" value="下一页" class="btn btn-sm btn-primary" onclick="downpage('${requestScope.page.pageNumber}','${requestScope.page.sumpage }')"/> 	  
        </td>
        <td>
        	<span class=" toshow" style="color: #666; ">共${requestScope.page.sumcount}条记录</span>
        </td>
        <td colspan="3">
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
  </table>