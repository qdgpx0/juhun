//注：jsUtil-placeholder.js文件为 输入框水印 js
/*var scripts = [null,
"LingUI/js/jquery.maskedinput.min.js",
"LingUI/js/date-time/bootstrap-datepicker.min.js",
"LingUI/js/select2.min.js",
"LingUI/js/lui.jiantingdiv.js",
"LingUI/js/jquery.validate.min.js",
"LingUI/js/jquery.maskedinput.min.js",
"LingUI/js/select2.min.js",
"LingUI/js/jquery-ui.custom.min.js",
"LingUI/js/chosen.jquery.min.js",
"LingUI/js/jquery.autosize.min.js",
"LingUI/js/jquery.inputlimiter.1.3.1.min.js",
"LingUI/js/jquery.maskedinput.min.js",
null]*/
//统一页面传值方法
function setList(formid,rules,messages) {
	ace.load_ajax_scripts(scripts, function() {
		jQuery(function($) {
			$('.date-picker').datepicker({
			      autoclose: true,
			      todayHighlight: true
			    })
			    //show datepicker when clicking on the icon
			$('[data-rel=tooltip]').tooltip();   //悬停 时出现提示框
			var $validation = true;
			$('#'+formid).validate({
				errorElement: 'div',
		        errorClass: 'help-block col-md-offset-3 col-sm-offset-3 col-xs-8',
				focusInvalid: false,
				rules:rules,
				messages: messages,
				highlight: function (e) {
					$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
				},
		
				success: function (e) {
					$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
					$(e).remove();
				},
		
				errorPlacement: function (error, element) {
					if(element.is('input[type=checkbox]') || element.is('input[type=radio]')) {
						var controls = element.closest('div[class*="col-"]');
						if(controls.find(':checkbox,:radio').length > 1) controls.append(error);
						else error.insertAfter(element.nextAll('.lbl:eq(0)').eq(0));
					}
					else if(element.is('.select2')) {
						error.insertAfter(element.siblings('[class*="select2-container"]:eq(0)'));
					}
					else if(element.is('.chosen-select')) {
						error.insertAfter(element.siblings('[class*="chosen-container"]:eq(0)'));
					}
					else if(element.is('.date-picker')) {
						error.insertAfter(element.parent().parent());
					}
					else error.insertAfter(element.parent());
				},
		
				submitHandler: function (form) {
				},
				invalidHandler: function (form) {
				}
			});
		
			$(".form-actions").width($(".form-horizontal").width()-40);
			$(".form-horizontal").resize(function()
   				{

	    	$(".form-actions").width($(".form-horizontal").width()-40);
   			})
		})
	
		
});
	
   
	
}