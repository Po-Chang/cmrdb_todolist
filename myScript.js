// 全域變數
var count = 0;
var userInput = '';

// 當Add 按鈕觸發時執行
var clickAddButton = function() {

	// 取得text field value
	userInput = $('#user-input').val();
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

		// 新增一筆新的item, count加一
		count++;
	}
}

	

$(document).ready(function() {

	// 新增Demo 元素, 只有網頁第一次執行才會創造一個Demo 元素
	if(count == 0) {
		userInput = 'Demo 元素';

		$('.work-list')
		.append(
			$('<div id="'+count+'" class="work-list-item">')
			.append('<i class="fa fa-gittip fa-2x"></i>')
			.append('<label for="work-item' + count +  '" class="work-title">' + userInput));

		// 新增新的元素之後幫它綁定監聽事件
		$('#'+count).click(function() {
			$(this).toggleClass('work-active');
		});

		// 新增一筆新的item, count加一
		count++;
	}

	// 新增按鈕綁定事件
	$('#add').on('click', clickAddButton);

	// 讓text field 可以透過enter觸發click事件
	$("#user-input").keyup(function(event){
		if(event.keyCode == 13){
			$("#add").click();
		}
	});
});