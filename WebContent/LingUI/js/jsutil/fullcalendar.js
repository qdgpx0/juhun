//var calendar1 =_getFullCalendar("#calendar",selectFunc,eventFunc,events);


function _getFullCalendar(id,selectFunc,eventFunc,events){
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();


	if(!events){
		events= [
		  {
			title: '明日有约',
			start: new Date(y, m, 1),
			className: 'label-important'
		  },
		  {
			title: '喝酒',
			start: new Date(y, m, d-5),
			end: new Date(y, m, d-2),
			className: 'label-success'
		  },
		  {
				title: '吃饭',
				start: new Date(y, m, d-2),
				className: 'label-info'
			  }
		];
	}
	
	if(!selectFunc){
		selectFunc =function(calEvent, jsEvent, view) {
			eClick(calEvent, jsEvent, view)
		}
	/*	selectFunc =function (start, end, allDay) {
            bootbox.prompt("新的日程", function (title) {
                if (title !== null) {
                    calendar.fullCalendar('renderEvent', {
                            title: title,
                            start: start,
                            end: end,
                            allDay: allDay
                        },
                        true // make the event "stick"
                    );
                }
            });
            calendar.fullCalendar('unselect');
        };*/
	}
	
	if(!eventFunc){
		eventFunc =function(calEvent, jsEvent, view) {
			eClick(calEvent, jsEvent, view)
		}
	}
	
	
	
	$(id).fullCalendar({
		//isRTL: true,
		 buttonHtml: {
			prev: '<i class="ace-icon fa fa-chevron-left"></i>',
			next: '<i class="ace-icon fa fa-chevron-right"></i>'
		},
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		},
	    monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthNamesShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		dayNames: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		dayNamesShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		today: ["今天"],
		firstDay: 1,
	  buttonText: {
				today: '本月',
				month: '月',
				week: '周',
				day: '日',
	            prev: '上一月',
	            next: '下一月'
	      },
		events: events
		,
		editable: true,
		droppable: true, // this allows things to be dropped onto the calendar !!!
		drop: function(date, allDay) { // this function is called when something is dropped
		
			// retrieve the dropped element's stored Event Object
			var originalEventObject = $(this).data('eventObject');
			var $extraEventClass = $(this).attr('data-class');
			
			
			// we need to copy it, so that multiple events don't have a reference to the same object
			var copiedEventObject = $.extend({}, originalEventObject);
			
			// assign it the date that was reported
			copiedEventObject.start = date;
			copiedEventObject.allDay = allDay;
			if($extraEventClass) copiedEventObject['className'] = [$extraEventClass];
			
			// render the event on the calendar
			// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
			$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);
			
			// is the "remove after drop" checkbox checked?
			if ($('#drop-remove').is(':checked')) {
				// if so, remove the element from the "Draggable Events" list
				$(this).remove();
			}
			
		}
		,
		selectable: true,
		selectHelper: true,
		select:selectFunc ,
		eventClick: eventFunc
		
	});
}



function  eClick(calEvent, jsEvent, view){
	//var modal = "#openwindow_event";
		
		
			var modal = $("#openwindow_event").appendTo('body');
			modal.find('form').on('submit', function(ev){
				ev.preventDefault();

				calEvent.title = $(this).find("input[type=text]").val();
				calendar.fullCalendar('updateEvent', calEvent);
				modal.modal("hide");
			});
			modal.find('button[data-action=delete]').on('click', function() {
				calendar.fullCalendar('removeEvents' , function(ev){
					return (ev._id == calEvent._id);
				})
				modal.modal("hide");
			});
			
			modal.modal('show').on('hidden', function(){
				modal.remove();
			});


			//console.log(calEvent.id);
			//console.log(jsEvent);
			//console.log(view);

			// change the border color just for fun
			//$(this).css('border-color', 'red');
	}