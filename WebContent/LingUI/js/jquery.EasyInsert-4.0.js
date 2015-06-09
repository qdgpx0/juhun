/**
 * EasyInsert 4.0
 * http://IlikejQuery.com/EasyInsert
 *
 * @Creator   wo_is神仙 <jsw0528@MrZhang.net>
 * @Depend    jQuery 1.4+
**/

;(function($){
	$.fn.extend({
		"easyinsert": function(o){
			o = $.extend({
				//触发器
				clicker: "#easy_addtr",//根据class（或id）选择，默认.next()获取
				//父标签
				//wrap: "li",
				wrap: "tr",
				name: "i-text",
				type: "text",
				value: "",
				maxlength: 20,
				className: "i-text",
				//新增上限值
				toplimit: 0,//0表示不限制
				headers: "",//0表示不限制
				//初始化值，二维数组
				initValue: null//用于修改某资料时显示已有的数据
			}, o || {});
			var oo = {
				//remove: "<a href=\"#\" class=\"remove\">移除</a>",
				remove: "<button type=\"button\" class=\"btn btn-white btn-danger btn-xs\">删除</button>",
				add: "<button id=\"easy_addtr\" type=\"button\" class=\"btn btn-white btn-primary btn-xs\">增加</button>",
				error1: "参数配置错误，数组的长度不一致，请检查。",
				error2: "参数配置错误，每组初始化值都必须是数组，请检查。"
			}
			//容器
			var $container = $(this),  allowed = true;

			//把属性拼成数组（这步不知道是否可以优化？）
			var arrCfg = new Array(o.name, o.type, o.value, o.maxlength, o.className,o.headers);
			//arr ==> [name, type, value, maxlength, className] 
			var arr = new Array();
			$.each(arrCfg, function(i, n) {
				if ( $.isArray(n) ) {
					arr[i] = n;
				} else {
					arr[i] = new Array();
					if ( i === 0 ) {
						arr[0].push(n);
					}else{
						//补全各属性数组（根据name数组长度）
						$.each(arr[0], function() {
							arr[i].push(n);
						});
					}
				}
				//判断各属性数组的长度是否一致
				if ( arr[i].length !== arr[0].length ) {
					allowed = false;
					$container.text(oo.error1);
				}
			});

			if ( allowed ) {
				
				//var $Item = $("<"+ o.wrap +">").appendTo( $container );
				var $Item = $("<"+ o.wrap +">");
				$.each(arr[0], function(i) {
					switch ( arr[1][i] ) {
						case "rownum":$("<td>").appendTo( $Item );break;
						case "select"://下拉框
							var option = "";
							$.each(arr[2][i], function(i, n) {
								option += "<option value='"+ i +"'>"+ n +"</option>";
							});
							$("<td>").append($("<select>", {
								name: arr[0][i],
								class: "lui-height30 lui-floatl col-md-9 col-xs-9"
							}).append( option )).appendTo( $Item );
							break;
						case "custom"://自定义内容，支持html
							$("<td>").appendTo( $Item ).append( arr[2][i] );
							break;
						default://默认是input
							$("<td>").append($("<input>", {//jQuery1.4新增方法
								name: arr[0][i],
								type: arr[1][i],
								value: arr[2][i],
								maxlength: arr[3][i],
								class: "lui-floatl"
							})).appendTo( $Item );
					}
				});
				//初始化开始
				//初始化表头开始
				var thead=$("<thead>");
				var headtr=$("<"+ o.wrap +">").addClass("lui-bs");
				$.each(arr[5], function(i) {
					$("<th>").text(arr[5][0]).appendTo( headtr );
				});
				$("<th>").appendTo( headtr );
				headtr.appendTo( thead );
				thead.appendTo( $container );
				//初始化表头结束
				var len = $container.children('tbody').eq(0).children(o.wrap).length;
				var itemclone=$Item.clone();
				itemclone.children('td').eq(0).text(len+1);
				$("<td>").append($(oo.add)).appendTo( itemclone );
				itemclone.appendTo( $container );
				//初始化结束
				
				//获取触发器
				var $Clicker = !o.clicker ? $container.next() : $(o.clicker);
				
				$Clicker.bind("click", function() {
					var $thistr=$(this).parent().parent();
					var tdnum=$thistr.children().length;
					$thistr.children().each(function(i) {
						if(i<tdnum-1){
							if(i>0){
								var tdval=(arr[1][i] == "select")?
										$(this).children().eq(0).children(":selected").eq(0).text():
										$(this).children().eq(0).val();
								$(this).empty();
								$(this).text(tdval)
							}
						}else{
							$($Clicker).hide();
							$(this).append($(oo.remove).click(
								function(){
									$(this).parent().parent().nextAll().each(function(i){
										var currentnum=$(this).children().eq(0).text();
										$(this).children().eq(0).text(parseInt(currentnum)-1);
									});
									$(this).parent().parent().remove();
							}));
						}
					});
					//未添加前的组数
					var len = $container.children('tbody').eq(0).children(o.wrap).length;
					//定义一个变量，判断是否已经达到上限
					var isMax = o.toplimit === 0 ? false : (len < o.toplimit ? false : true);
					if ( !isMax ) {//没有达到上限才允许添加
						var itemclone=$Item.clone();
						itemclone.children('td').eq(0).text(len+1);
						$("<td>").append($(this).show()).appendTo( itemclone );
						itemclone.appendTo( $container );
					}
					//取消触发器的默认动作
					return false;
				});
			
			}
		}
	});
})(jQuery);