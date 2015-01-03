// 全域變數
var count = 0;
var userInput = '';
var arr = [["Demo 元素",1419649200000]];
var timeString = '';

// 當Add 按鈕觸發時執行
var clickAddButton = function() {

	// 取得當下時間戳記
	var nowTimestamp = $.now();
	
	// 將時間戳記轉換為JavaScript時間物件
	var date = new Date(nowTimestamp);

	// 取得text field value
	userInput = $('#user-input').val();

	// 判斷輸入內容是否為空
	if(userInput == '') {
		alert("輸入欄位不可以是空白喔！");
	}
	else {
		timeString = timeFormat(date);

		// 加入一個新事件到DOM當中
		$('.work-list')
		.append(
			$('<div id="'+count+'" class="work-list-item">')
			.append('<i class="fa fa-gittip fa-2x"></i>')
			.append('<label for="work-item' + count +  '" class="work-title">' + userInput)
			.append('<span class="work-date">' + timeString));

		// 新增新的元素之後幫它綁定監聽事件
		$('#'+count).click(function() {
			$(this).toggleClass('work-active');
		});

		// 新增一筆新的item, count加一
		count++;

		// 將使用者新輸入的值放到陣列當中
		arr.push([userInput, nowTimestamp]);

		// 儲存至local stroage
		localStorage.setItem("todoList", JSON.stringify(arr));

		// 新增成功後將text field 設為空值
		$('#user-input').val('');
	}
}

var clickInitButton = function() {
	// 刪除local stroage
	localStorage.removeItem("todoList");

	// 將所有work-list-item 移除
	$('.work-list-item').each(function() {
		$(this).remove();
	});

	// 將arr 陣列初始化為原本的值
	arr = [["Demo 元素",1419649200000]];
	initArray();
}

// 用以初始化列表，將所有arr內的資料append到html當中
function initArray() {
	console.log(arr);
	for(var i = 0; i < arr.length; i++) {

		var workDate = new Date(arr[i][1]);
		timeString = timeFormat(workDate);

		$('.work-list')
		.append(
			$('<div id="'+count+'" class="work-list-item">')
			.append('<i class="fa fa-gittip fa-2x"></i>')
			.append('<label for="work-item' + count +  '" class="work-title">' + arr[i][0])
			.append('<span class="work-date">' + timeString));

		// 新增新的元素之後幫它綁定監聽事件
		$('#'+count).click(function() {
			$(this).toggleClass('work-active');
		});

		// 新增一筆新的item, count加一
		count++;
	}
}

// 將時間戳記轉為 HH : MM : SS 的格式
function timeFormat(date) {
	var formatTimeString = '';

	// 將時、分、秒分別判斷是否為0，若為0，則將格式改為00，再將其組合成我們預想的格式
	formatTimeString = (date.getHours() == 0) ? '00' : date.getHours();
	formatTimeString += ' : ';
	formatTimeString += (date.getMinutes() == 0) ? '00' : date.getMinutes();
	formatTimeString += ' : ';
	formatTimeString += (date.getSeconds() == 0) ? '00' : date.getSeconds();

	return formatTimeString;
}

$(document).ready(function() {
	// 如果有local stroage則將它讀出放到arr 陣列當中
	if(localStorage.getItem("todoList") === null) {
		console.log('todolist did not had value.');
	}
	else {
		console.log('todolist had value');
		console.log(localStorage.getItem("todoList"));
		arr = JSON.parse(localStorage.getItem("todoList"));
	}

	// 初始化陣列，若loacl stroage 有值，則arr為之前儲存的內容，相反則為Demo 元素
	initArray();

	// 新增按鈕綁定事件
	$('#add').on('click', clickAddButton);
	$('#init').on('click', clickInitButton);

	// 讓text field 可以透過enter觸發click事件
	$("#user-input").keyup(function(event){
		if(event.keyCode == 13){
			$("#add").click();
		}
	});
});