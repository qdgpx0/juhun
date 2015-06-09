	$.widget( "custom.catcomplete", $.ui.autocomplete, {  //通过自动完成创建主题分类自动完成框
	    _renderMenu: function( ul, items ) {
	      var that = this,
	        currentCategory = "";
	      $.each( items, function( index, item ) {//遍历所有的数据，将category分离出来加载 样式
	        if ( item.category != currentCategory ) {
	          ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );//标题颜色
	          currentCategory = item.category;
	        }
	        that._renderItemData( ul, item );
	      });
	    }
	  });