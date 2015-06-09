/*
 * dlgType confirmDlg双选确认、alertDlg单选确认、showDlg内容展示弹窗
 * clickId 点击弹出弹框的按钮id
 * dlgTitle 弹框标题
 * dlgCon 弹框内容/url
 * onOkfun 确定响应方法弹框内容
 * onCancelfun 确定响应方法
 * formId 待验证表单Id
 * secNum 二次弹出顺序(默认0)
 * 
 */

/*
 * 重要！注释
 * $("#" + formId).append(dlgHtml); 在jsp里须改为 $("body").append(dlgHtml);
 */
function newDlg(dlgType,clickId,dlgTitle,dlgCon,formId,onOkfun,onCancelfun,secNum){
	// 添加字段准备
	var buttonHtml = "";
	if(onOkfun != null && onOkfun !="" && onOkfun.indexOf("(") < 1){
		onOkfun += "()";
	}
	if(onCancelfun != null && onCancelfun !="" && onCancelfun.indexOf("(") < 1){
		onCancelfun += "()";		
	}
	if(secNum == null){
		secNum = 0;
	}
	var dlgHtml = "";	
	if(dlgType == "confirmDlg"){
		dlgHtml = "<div id='" + clickId + secNum +"Dlg' tabindex='-1' class='modal fade' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>\
						<div class='modal-dialog my-dialog-1'>\
							<div class='modal-content'>\
								<div class='my-dialog-header-1'>\
									<i class='ace-icon fa fa-exclamation-triangle red'></i>"+ dlgTitle +"\
									<button type='button' class='close my-close' data-dismiss='modal' aria-label='Close'><i class='fa fa-times'></i></button>\
								</div>\
								<div class='modal-body  my-dialog-body' data-spy='scroll'>\
									<i class='ace-icon fa fa-hand-o-right blue bigger-120'></i><span id='tishi'>"+ dlgCon +"</span>\
									<div id='loadin'></div>\
								</div>\
								<div class='modal-footer my-dialog-footer'>\
									<button type='button' class='btn btn-primary' data-dismiss='modal' onclick='"+ onOkfun +"'>确认</button>\
									<button type='button' class='btn' data-dismiss='modal' onclick='" + onCancelfun + "'>取消</button>\
								</div>\
							</div>\
						</div>\
					</div>";
		$("form").append($(dlgHtml));
	}else if(dlgType == "alertDlg"){
		dlgHtml = "<div id='" + clickId + secNum + "Dlg' tabindex='-1' class='modal fade' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>\
						<div class='modal-dialog my-dialog-1'>\
							<div class='modal-content'>\
								<div class='my-dialog-header-1'>\
									<i class='ace -icon  fa fa-check'></i> "+ dlgTitle +"\
									<button type='button' class='close my-close' data-dismiss='modal' aria-label='Close'>\
										<i class='fa fa-times'></i>\
									</button>\
								</div>\
								<div class='modal-body my-dialog-body' data-spy='scroll'>\
									<i class='ace-icon fa fa-hand-o-right blue bigger-120'></i><span id='tishi'>"+ dlgCon +"</span>\
									<div id='loadin'></div>\
								</div>\
								<div class='modal-footer my-dialog-footer'>\
									<button type='button' class='btn btn-primary' data-dismiss='modal' onclick='"+ onOkfun +"'>确认</button>\
								</div>\
							</div>\
						</div>\
					</div>";
		$("form").append($(dlgHtml));
	}else if(dlgType == "showDlg"){
		dlgHtml = "<div id='" + clickId + secNum + "Dlg' tabindex='-1' class='modal  fade' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>\
						<div class='modal-dialog my-dialog-2 '>\
							<div class='modal-content'>\
								<div class='my-dialog-header-1'>\
									<i class='ace -icon  fa fa-check'></i>"+ dlgTitle +"\
									<button type='button' class='close   my-close' data-dismiss='modal' aria-label='Close'> <i class='fa fa-times'></i></button>\
								</div>\
								<div class='modal-body  my-dialog-body-5' data-spy='scroll'>\
									<div class='dialogs ace-scroll scroll-active'>\
										<div style='display: block;' class='scroll-track'>\
											<div style='top: 0px;' class='scroll-bar'></div>\
										</div>\
										<div style='' class='scroll-content'>"+ dlgCon +"</div>\
									</div>\
								</div>\
								<div class='modal-footer my-dialog-footer'>\
									<button type='button' class='btn btn-primary' data-dismiss='modal' onclick='"+ onOkfun +"'>确认</button>\
									<button type='button' class='btn' data-dismiss='modal' onclick='" + onCancelfun + "'>取消</button>\
								</div>\
							</div>\
						</div>\
					</div>";
		$("form").append($(dlgHtml));
	}else if(dlgType == "selectDlg"){
		//待完成
	}else if(dlgType == "urlDlg"){
		//待完成
	}
	
	// onclick事件绑定
	if(secNum > 0){
		var Punum = secNum - 1;
		$("#" + clickId + Punum + "Dlg").find(".btn-primary").bind('click', function() {
			/*
			$('#' + clickId + 'Dlg .modal-content .modal-body #loadin').load(url);
			$("#" + clickId + "Dlg .modal-content .modal-body").ace_scroll({
				size : 400
			});
			$("#" + clickId + "Dlg").css('overflow-x', 'hidden');
			*/
			$("#" + clickId + secNum + "Dlg").modal({
				keyboard : true,
			});
		});		
	}else{
		$("#" +clickId).bind('click', function() {
			// 若有表单需验证
			if(formId != null && formId != ""){
				var valid = $("#" + formId).valid();
				if (!valid) {
					return;
				}
			}
			/*
			$('#' + clickId + 'Dlg .modal-content .modal-body #loadin').load(url);
			$("#" + clickId + "Dlg .modal-content .modal-body").ace_scroll({
				size : 400
			});
			$("#" + clickId + "Dlg").css('overflow-x', 'hidden');
			*/
			$("#" + clickId + secNum + "Dlg").modal({
				keyboard : true,
			});
		});		
	}
}