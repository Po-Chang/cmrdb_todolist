// 全域變數
var count = 0;
var userInput = '';
var arr = ["Demo 元素"];

// 當Add 按鈕觸發時執行
var clickAddButton = function() {

	var date = new Date();

	// 取得text field value
	userInput = $('#user-input').val();

	// 判斷輸入內容是否為空
	if(userInput == '') {
		alert("輸入欄位不可以是空白喔！");
	}
	else {
		// 加入一個新事件到DOM當中
		$('.work-list')
		.append(
			$('<div id="'+count+'" class="work-list-item">')
			.append('<i class="fa fa-gittip fa-2x"></i>')
			.append('<label for="work-item' + count +  '" class="work-title">' + userInput));

		// 新增新的元素之後幫它綁定監聽事件
		$('#'+count).click(function() {
			$(this).toggleClass('work-active');
		});

		// 將使用者新輸入的值放到陣列當中
		arr.push(userInput);

		// 儲存至local stroage
		localStorage["todoList"] = JSON.stringify(arr);

		// 新增一筆新的item, count加一
		count++;

		// 新增成功後將text field 設為空值
		$('#user-input').val('');
	}
}

var clickInitButton = function() {
	// 刪除local stroage
	localStorage["todoList"] = undefined;

	// 將所有work-list-item 移除
	$('.work-list-item').each(function() {
		$(this).remove();
	});


	// 將arr 陣列初始化為原本的值
	arr = ["Demo 元素"];
	initArray();
}

// 用以初始化列表，將所有arr內的資料append到html當中
function initArray() {
	for(var i = 0; i < arr.length; i++) {
		$('.work-list')
		.append(
			$('<div id="'+count+'" class="work-list-item">')
			.append('<i class="fa fa-gittip fa-2x"></i>')
			.append('<label for="work-item' + count +  '" class="work-title">' + arr[i]));

		// 新增新的元素之後幫它綁定監聽事件
		$('#'+count).click(function() {
			$(this).toggleClass('work-active');
		});

		// 新增一筆新的item, count加一
		count++;
	}
}

$(document).ready(function() {
	// 如果有local stroage則將它讀出放到arr 陣列當中
	if(localStorage["todoList"] !== 'undefined') {
		arr = JSON.parse(localStorage["todoList"]);
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