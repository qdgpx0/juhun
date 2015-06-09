<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
pageContext.setAttribute("base", basePath);
%>
<title>订单详情</title>

<link rel="stylesheet" type="text/css" href="${base }css/highslide.css" />
<style>
select { margin-left: -12px; }
.tjy_a{font-size: 17px;display: block;}
</style>
<div class="row">
	<div class="col-xs-12">
		<form class="form-horizontal">
			<div class="tabbable">
				<h4 class="header blue bolder smaller">订单基本信息<a href="#faq-1-2" data-parent="#faq-list-1" data-toggle="collapse"> <i class="ace-icon fa fa-chevron-down pull-right"   data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-up"></i></a> <!--Social --></h4>
				<div class="row panel-collapse collapse in"  id="faq-1-2">
					<div class="col-xs-12 col-sm-12">
						<div class="col-xs-12 col-sm-6">
							<div class="form-group">
								<label class="col-sm-3 control-label no-padding-right" for="form-field-username">订单编号：</label>
								<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
									<div class="input-group col-sm-9">
										<label  class="b_info">${woworder.ordercount }</label>
									</div>
									
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6">
							<div class="form-group">
								<label class="col-sm-3 control-label no-padding-right" for="form-field-username">订单状态：</label>
								<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
									<div class="input-group col-sm-9">
										<label  class="b_info">${woworder.orderzhuangtai }</label>
									</div>
									
								</div>
							</div>
						</div>
					</div><!--end col-xs-12 col-sm-12-->
					<div class="vspace-12-sm"></div>
					<div class="col-xs-12 col-sm-12">
						<div class="col-xs-12 col-sm-6">
							<div class="form-group">
								<label class="col-sm-3 control-label no-padding-right" for="form-field-username">订单类型：</label>
								<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
									<div class="input-group col-sm-9">
										<label  class="b_info">${woworder.projectclass }</label>
									</div>
									
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6">
							<div class="form-group">
								<label class="col-sm-3 control-label no-padding-right" for="form-field-username">下单时间：</label>
								<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
									<div class="input-group col-sm-9">
										<label  class="b_info">${woworder.createtime }</label>
									</div>
									
								</div>
							</div>
						</div>
					</div><!--end col-xs-12 col-sm-12-->
					<div class="vspace-12-sm"></div>
					<div class="col-xs-12 col-sm-12">
						<div class="col-xs-12 col-sm-6">
							<div class="form-group">
								<label class="col-sm-3 control-label no-padding-right" for="form-field-first">客户电话：</label>
								<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
									<div class="input-group col-sm-9">
										<label  class="b_info">${woworder.mobliephone }</label>
									</div>
									
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6">
							<div class="form-group">
								<label class="col-sm-3 control-label no-padding-right" for="form-field-username">订单价格：</label>
								<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
									<div class="input-group col-sm-9">
										<label  class="b_info">${woworder.orderprice }</label>
									</div>
									
								</div>
							</div>
						</div>
					</div><!--end col-xs-12 col-sm-12-->
					<div class="col-xs-12 col-sm-12">
						<div class="col-xs-12 col-sm-6">
							<div class="form-group">
								<label class="col-sm-3 control-label no-padding-right" for="form-field-username">汪汪昵称：</label>
								<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
									<div class="input-group col-sm-9">
										<label  class="b_info">${woworder.wangwang }</label>
									</div>
									
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-6">
							<div class="form-group">
								<label class="col-sm-3 control-label no-padding-right" for="form-field-username">代练项目：</label>
								<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
									<div class="input-group col-sm-9">
										<label  class="b_info">${woworder.orderproject }</label>
									</div>
									
								</div>
							</div>
						</div>
					</div>
				</div><!--end col-xs-12 col-sm-12-->
				<div class="vspace-12-sm"></div>
				<div class="col-xs-12 col-sm-12">
						<div class="col-xs-12 col-sm-6">
							<div class="form-group">
								<label class="col-sm-3 control-label no-padding-right" for="form-field-username">所属客户：</label>
								<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
									<div class="input-group col-sm-9">
										<label  class="b_info">${woworder.username }</label>
									</div>
									
								</div>
							</div>
						</div>
					</div><!--end col-xs-12 col-sm-12-->
			</div><!--end row panel-collapse-->
			<h4 class="header blue bolder smaller">游戏信息<a href="#faq-1-3" data-parent="#faq-list-1" data-toggle="collapse"> <i class="ace-icon fa fa-chevron-down pull-right"   data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-up"></i></a> </h4>
			<div class="row panel-collapse collapse in"  id="faq-1-3">
				<div class="col-xs-12 col-sm-12">
					<div class="col-xs-12 col-sm-6">
						<div class="form-group">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-username">角色名称：</label>
							<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
								<div class="input-group col-sm-9">
									<label  class="b_info">${woworder.wowname }</label>
								</div>
								
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6">
						<div class="form-group">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-username">职业：</label>
							<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
								<div class="input-group col-sm-9">
									<label  class="b_info">${woworder.zhiye }</label>
								</div>
								
							</div>
						</div>
					</div>
				</div><!--end col-xs-12 col-sm-12-->
				<div class="vspace-12-sm"></div>
				<div class="col-xs-12 col-sm-12">
					<div class="col-xs-12 col-sm-6">
						<div class="form-group">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-username">阵营：</label>
							<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
								<div class="input-group col-sm-9">
									<label  class="b_info">${woworder.zhenying }</label>
								</div>
								
							</div>
						</div>
					</div>
				</div><!--end col-xs-12 col-sm-12-->
			
				
				
				<div class="vspace-12-sm"></div>
				
			</div><!--end row panel-collapse-->
			<h4 class="header blue bolder smaller">管理信息 <a href="#faq-1-4" data-parent="#faq-list-1" data-toggle="collapse"> <i class="ace-icon fa fa-chevron-down pull-right"   data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-up"></i></a> <!--Social --></h4>
			<div class="row panel-collapse collapse in"  id="faq-1-4">
				<div class="col-xs-12 col-sm-12">
					<div class="col-xs-12 col-sm-6">
						<div class="form-group">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-username">批复管理员：</label>
							<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
								<div class="input-group col-sm-9">
									<label  class="b_info">${woworder.orderadmin }</label>
								</div>
								
							</div>
						</div>
					</div>
					<div class="col-xs-12 col-sm-6">
						<div class="form-group">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-username">批复时间：</label>
							<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
								<div class="input-group col-sm-9">
									<label  class="b_info">${woworder.pifutime }</label>
								</div>
								
							</div>
						</div>
					</div>
				</div><!--end col-xs-12 col-sm-12-->
				
				<div class="vspace-12-sm"></div>
			</div><!--end row panel-collapse-->
						<h4 class="header blue bolder smaller accordion-toggle collapsed">大内容<a href="#faq-1-1" data-parent="#faq-list-1" data-toggle="collapse"> <i class="ace-icon fa fa-chevron-down pull-right"   data-icon-hide="ace-icon fa fa-chevron-down" data-icon-show="ace-icon fa fa-chevron-up"></i></a><!--Social --></h4>
			<div class="row panel-collapse collapse in"  id="faq-1-1">
				<div class="col-xs-12 col-sm-12">
					<div class="col-xs-12 col-sm-6">
						<div class="form-group">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-username">订单内容：</label>
							<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
								<div class="input-group col-sm-9">
									<label  class="b_info">${woworder.ordernote }</label>
								</div>
								
							</div>
						</div>
					</div>
				</div><!--end col-xs-12 col-sm-12-->
				<div class="vspace-12-sm"></div>
				<div class="col-xs-12 col-sm-12">
					<div class="col-xs-12 col-sm-6">
						<div class="form-group">
							<label class="col-sm-3 control-label no-padding-right" for="form-field-username">密保卡：</label>
							<div class="col-sm-9 col-xs-12 lui-tj-iconwarn">
								<div class="input-group col-sm-9">
									<label  class="b_info">
									 <a  href="${base }${woworder.mibaoka }" class="highslide" onclick="return hs.expand(this)">
										<img alt="密保卡" src="${base }${woworder.mibaoka }" style="width: 300px;height: 300px;">
									</a>	
									</label>
								</div>
								
							</div>
						</div>
					</div>
				</div><!--end col-xs-12 col-sm-12-->
				<div class="vspace-12-sm"></div>
			</div><!--end row panel-collapse-->
			<div class="clearfix form-actions">
				<div class=" col-md-12 col-xs-12 ">
					<div class=" col-xs-6">
						<button onclick="javascript:fanhui()" class="btn btn-sm btn-info" type="button" style="float:right;"> <i class="ace-icon fa fa-check "></i> 返回 </button>
					</div>
				</div>
			</div>
		</form>
	</div>
  <!-- /.span --> 
  
</div><!-- /.row --> 

<script type="text/javascript">
	var scripts = [null,"LingUI/js/prettify.js", null]
	
	ace.load_ajax_scripts(scripts, function() {
	  //inline scripts related to this page
		 jQuery(function($) {
	
		window.prettyPrint && prettyPrint();
		$('#id-check-horizontal').removeAttr('checked').on('click', function(){
			$('#dt-list-1').toggleClass('dl-horizontal').prev().html(this.checked ? '&lt;dl class="dl-horizontal"&gt;' : '&lt;dl&gt;');
		});
	
	})
	});
	function fanhui(){
		url='${base}searcwoworder.action'
		$(".page-content-area").load(url);
	}
	
</script>