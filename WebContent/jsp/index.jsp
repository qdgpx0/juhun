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
<html lang="en">
<head>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta charset="utf-8"/>
    <title>销售过程管理系统</title>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
    <link rel="stylesheet" href="${base}LingUI/css/jquery-ui.min.css"/>
    <!-- bootstrap & fontawesome -->
    <link rel="stylesheet" href="${base}LingUI/css/bootstrap.min.css"/>
    <link rel="stylesheet" href="${base}LingUI/css/font-awesome.min.css"/>

    <!-- text fonts -->
    <link rel="stylesheet" href="${base}LingUI/css/lui-fonts.css"/>

    <!-- lui styles -->
    <link rel="stylesheet" href="${base}LingUI/css/lui.min.css" id="main-ace-style"/>
    <link rel="stylesheet" href="${base}LingUI/css/lingnet.css"/>
    <link rel="stylesheet" href="${base}LingUI/js/ztree/zTreeStyle.css"/>
    <link rel="stylesheet" href="${base}LingUI/css/datepicker.css"/>
    <!--[if lte IE 9]>
    <link rel="stylesheet" href="${base}LingUI/css/lui-part2.min.css"/>
    <![endif]-->
    <link rel="stylesheet" href="${base}LingUI/css/lui-skins.min.css"/>
    <link rel="stylesheet" href="${base}LingUI/css/lui-rtl.min.css"/>

<link rel="stylesheet" type="text/css" href="${base }css/highslide.css" />
<link rel="stylesheet" href="${base}LingUI/css/jquery.fileupload.css">




    <!--[if lte IE 9]>
    <link rel="stylesheet" href="${base}LingUI/css/lui-ie.min.css"/>
    <![endif]-->

    <!-- lui settings handler -->
    <script src="${base}LingUI/js/lui-extra.min.js"></script>

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->

    <!--[if lte IE 8]>
    <script src="${base}LingUI/js/html5shiv.min.js"></script>
    <script src="${base}LingUI/js/respond.min.js"></script>
    <![endif]-->

    <!--[if ie]>
    <style>
        input.b_input_lb {
            height: 31px;
        }

        #b_grid_input1 {
            height: 31px;
        }
    </style>
    <![endif]-->
</head>
<body class="no-skin">
<div id="navbar" class="navbar navbar-default">
<script type="text/javascript">
    try {
        ace.settings.check('navbar', 'fixed')
    } catch (e) {
    }
</script>

<div class="navbar-container" id="navbar-container">
<button type="button" class="navbar-toggle menu-toggler pull-left" id="menu-toggler">
    <span class="sr-only">切换栏</span>

    <span class="icon-bar"></span>

    <span class="icon-bar"></span>

    <span class="icon-bar"></span>
</button>

<div class="navbar-header pull-left" id="headhead">
    <a href="#" class="navbar-brand">
        <small>
            <i class="fa fa-home"></i>
         	聚魂游戏代练管理系统
        </small>
    </a>
</div>

<div class="navbar-buttons navbar-header pull-right" role="navigation">
<ul class="nav ace-nav" id="step1">




<li class="light-blue">
    <a data-toggle="dropdown" href="#" class="dropdown-toggle">
        <img class="nav-user-photo" src="${base}LingUI/images/user.jpg" alt="Jason's Photo"/>
								<span class="user-info">
									<small>欢迎,</small>
									${admin.adminname }
								</span>

        <i class="ace-icon fa fa-caret-down"></i>
    </a>

    <ul class="user-menu dropdown-menu-right dropdown-menu dropdown-yellow dropdown-caret dropdown-close">
        <li>
            <a >
                <i class="ace-icon fa fa-cog"></i>
                	你好
            </a>
        </li>

        <li class="divider"></li>

        <li>
            <a href="${base }tologout.action">
                <i class="ace-icon fa fa-power-off"></i>
                退出
            </a>
        </li>
    </ul>
</li>
</ul>
</div>
</div>
<!-- /.navbar-container -->
<div class="clearfix"></div>
<div style="background:#EBEBEB;float:left;width:100%;">

</div>
</div>

<!-- /section:basics/navbar.layout -->
<div class="main-container" id="main-container">
<script type="text/javascript">
    try {
        ace.settings.check('main-container', 'fixed')
    } catch (e) {
    }
</script>

<!-- #section:basics/sidebar -->
<div id="sidebar" class="sidebar                  responsive">
<script type="text/javascript">
    try {
        ace.settings.check('sidebar', 'fixed')
    } catch (e) {
    }
</script>


<div class="sidebar-shortcuts" id="sidebar-shortcuts">
    <div class="sidebar-shortcuts-large" id="sidebar-shortcuts-large">
        <a class="btn btn-success btn-xs my-tooltip-link tooltip-primary" 
           >
            <i class="ace-icon fa fa-users bigger-110 icon-only"></i>
        </a>

        <a class="btn btn-info btn-xs my-tooltip-link tooltip-primary" 
           >
            <i class="ace-icon fa fa-pencil  bigger-110 icon-only"></i>
        </a>

        <a class="btn btn-warning btn-xs my-tooltip-link tooltip-primary" data-placement="bottom" 
           data-url="page/salesmgt/sales_manage_edit" >
            <i class="ace-icon fa fa-send bigger-110 icon-only"></i>
        </a>
        <a class="btn btn-danger btn-xs my-tooltip-link tooltip-primary" data-placement="bottom"
           data-url="page/order/order_addnormal" >
            <i class="ace-icon fa fa-file-text-o  bigger-110 icon-only"></i>
        </a>
    </div>

    <div class="sidebar-shortcuts-mini" id="sidebar-shortcuts-mini">
        <span class="btn btn-success"></span>

        <span class="btn btn-info"></span>

        <span class="btn btn-warning"></span>

        <span class="btn btn-danger"></span>
    </div>
</div>
<ul class="nav nav-list">


<!-- 控制台 -->
<li class="active">
    <a data-url="page/orderlist" href="index.jsp#page/orderlist">
        <i class="menu-icon fa fa-desktop"></i>
        <span class="menu-text">订单列表</span>
    </a>

    <b class="arrow"></b>
</li>
<li class="">
    <a data-url="page/tongjilist" href="index.jsp#page/tongjilist">
        <i class="menu-icon fa fa-tachometer"></i>
        <span class="menu-text">统计列表</span>
    </a>

    <b class="arrow"></b>
</li>
<li class="">
    <a data-url="page/newslist" href="index.jsp#page/newslist">
        <i class="menu-icon fa fa-bullhorn"></i>
        <span class="menu-text">公告管理</span>
    </a>

    <b class="arrow"></b>
</li>
<c:if test="${quanxian=='boss' }">
<li class="">
    <a data-url="page/adminlist" href="index.jsp#page/adminlist">
        <i class="menu-icon fa fa-user"></i>
        <span class="menu-text">账号管理</span>
    </a>

    <b class="arrow"></b>
</li>
</c:if>
</ul>
<!-- /.nav-list -->

<!-- #section:basics/sidebar.layout.minimize -->
<div class="sidebar-toggle sidebar-collapse" id="sidebar-collapse">
    <i class="ace-icon fa fa-angle-double-left" data-icon1="ace-icon fa fa-angle-double-left"
       data-icon2="ace-icon fa fa-angle-double-right"></i>
</div>

<!-- /section:basics/sidebar.layout.minimize -->
<script type="text/javascript">
    try {
        ace.settings.check('sidebar', 'collapsed')
    } catch (e) {
    }
</script>
</div>

<!-- /section:basics/sidebar -->
<div class="main-content">
    <!-- #section:basics/content.breadcrumbs -->
    <div class="breadcrumbs" id="breadcrumbs">
        <script type="text/javascript">
            try {
                ace.settings.check('breadcrumbs', 'fixed')
            } catch (e) {
            }
        </script>

        <ul class="breadcrumb">
            <li>
                <a data-url="page/ydemo_kongzhitai" href="index.html#page/ydemo_kongzhitai"><i
                        class="ace-icon fa fa-home home-icon"></i></a>
            </li>
        </ul>
        <!-- /.breadcrumb -->

        <!-- #section:basics/content.searchbox -->
        <div class="nav-search" id="nav-search">
            <form class="form-search">
							<span class="input-icon">
								<input type="text" placeholder="Search ..." class="nav-search-input"
                                       id="nav-search-input1" autocomplete="off"/>
								<i class="ace-icon fa fa-search nav-search-icon"></i>
							</span>
            </form>
        </div>
        <!-- /.nav-search -->

        <!-- /section:basics/content.searchbox -->
    </div>

    <!-- /section:basics/content.breadcrumbs -->
    <div class="page-content">
        <!-- #section:settings.box -->
        <div class="ace-settings-container" id="ace-settings-container">
            <div class="btn btn-app btn-xs btn-warning ace-settings-btn" id="ace-settings-btn">
                <i class="ace-icon fa fa-cog bigger-150"></i>
            </div>

            <div class="ace-settings-box clearfix" id="ace-settings-box">
                <div class="pull-left width-50">
                    <!-- #section:settings.skins -->
                    <div class="ace-settings-item">
                        <div class="pull-left">
                            <select id="skin-colorpicker" class="hide">
                                <option data-skin="no-skin" value="#438EB9">#438EB9</option>
                                <option data-skin="skin-1" value="#222A2D">#222A2D</option>
                                <option data-skin="skin-2" value="#C6487E">#C6487E</option>
                                <option data-skin="skin-3" value="#D0D0D0">#D0D0D0</option>
                            </select>
                        </div>
                        <span>&nbsp; 选择皮肤</span>
                    </div>

                    <!-- /section:settings.skins -->

                    <!-- #section:settings.navbar -->
                    <div class="ace-settings-item">
                        <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-navbar"/>
                        <label class="lbl" for="ace-settings-navbar"> 固定导航栏</label>
                    </div>

                    <!-- /section:settings.navbar -->

                    <!-- #section:settings.sidebar -->
                    <div class="ace-settings-item">
                        <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-sidebar"/>
                        <label class="lbl" for="ace-settings-sidebar">固定侧边栏</label>
                    </div>

                    <!-- /section:settings.sidebar -->

                    <!-- #section:settings.breadcrumbs -->
                    <div class="ace-settings-item">
                        <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-breadcrumbs"/>
                        <label class="lbl" for="ace-settings-breadcrumbs">固定的面包屑</label>
                    </div>

                    <!-- /section:settings.breadcrumbs -->

                    <!-- #section:settings.rtl -->


                    <!-- /section:settings.rtl -->

                    <!-- #section:settings.container -->
                    <div class="ace-settings-item">
                        <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-add-container"/>
                        <label class="lbl" for="ace-settings-add-container">
                            居中显示

                        </label>
                    </div>

                    <!-- /section:settings.container -->
                </div>
                <!-- /.pull-left -->

                <div class="pull-left width-50">
                    <!-- #section:basics/sidebar.options -->
                    <div class="ace-settings-item">
                        <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-hover"/>
                        <label class="lbl" for="ace-settings-hover">子菜单</label>
                    </div>

                    <div class="ace-settings-item">
                        <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-compact"/>
                        <label class="lbl" for="ace-settings-compact"> 紧凑侧边栏</label>
                    </div>

                    <div class="ace-settings-item">
                        <input type="checkbox" class="ace ace-checkbox-2" id="ace-settings-highlight"/>
                        <label class="lbl" for="ace-settings-highlight"> 活动项目</label>
                    </div>

                    <!-- /section:basics/sidebar.options -->
                </div>
                <!-- /.pull-left -->
            </div>
            <!-- /.ace-settings-box -->
        </div>
        <!-- /.ace-settings-container -->

        <!-- /section:settings.box -->
        <div class="page-content-area">
            <!-- ajax content goes here -->
        </div>
        <!-- /.page-content-area -->
    </div>
    <!-- /.page-content -->
</div>
<!-- /.main-content -->


</div>
<!-- /.main-container -->



<!-- basic scripts -->

<!--[if !IE]> -->
<script type="text/javascript">
    window.jQuery || document.write("<script src='${base}LingUI/js/jquery.min.js'>" + "<" + "/script>");
</script>

<!-- <![endif]-->

<!--[if IE]>
<![endif]-->
<script type="text/javascript">
    if ('ontouchstart' in document.documentElement) document.write("<script src='${base}LingUI/js/jquery.mobile.custom.min.js'>" + "<" + "/script>");
</script>
<script src="${base}LingUI/js/bootstrap.min.js"></script>

<!-- ace scripts -->
<script src="${base}LingUI/js/lui-elements.min.js"></script>
<script src="${base}LingUI/js/lui.min.js"></script>
<script type="text/javascript">
    window.jQuery || document.write("<script src='${base}LingUI/js/jquery1x.min.js'>" + "<" + "/script>");
</script>
<script src="${base}LingUI/js/jquery-ui.min.js"></script>
  <script type="text/javascript" src="${base }js/highslide-with-gallery.js"></script>
    <script src="${base }js/jquery-ui-i18n.js"></script>
<script type="text/javascript">
if("${admin}" == null || "${admin}" == ""){
	location = "${base}jsp/login.jsp";
}
    //Load content via ajax
    jQuery(function ($) {
        $(function () {
            $(".tooltip-primary").tooltip();
            $(".updatebutton").on("click",function(){
            	alert(1);
            })
        });

        if ('enable_ajax_content' in ace) {
            var options = {
                content_url: function (url) {
                    //this is for Ace demo only, you should change it
                    //please refer to documentation for more info

                    if (!url.match(/^page\//)) return false;

                    var path = document.location.pathname;

                    //for Ace HTML demo version, convert ajax.html#page/gallery to > gallery.html and load it
                    if (path.match(/index\.jsp/)) return path.replace(/index\.jsp/, url.replace(/^page\//, '') + '.jsp');

                    //for Ace PHP demo version convert "page/dashboard" to "?page=dashboard" and load it
                    return path + "?" + url.replace(/\//, "=");
                },
                default_url: 'page/orderlist'//default url
            }
            ace.enable_ajax_content($, options)
        }

    })

   

</script>


</body>
</html>
