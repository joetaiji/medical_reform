// 글쓰기_비로그인
function form_notlogin(sid){
	//if(confirm("로그인 후 이용하실 수 있습니다.\n로그인 페이지로 이동하시겠습니까?")){
		parent.location.href = "/login_search.es?sid="+sid;
	//}
}

// 글쓰기_본인확인서비스회원
function fncNonmemberLogin(sid){
	parent.location.href = "/loginPin_search.es?sid="+sid;
}

//
function reSize(obj){
	var obj_document = obj.contentWindow.document;
	if(obj_document.height){
		obj.style.height = obj_document.height;
	}else{
		obj.style.height = obj_document.body.scrollHeight;
	}
}

// 에디터 이미지 업로드
function pasteHTML(arg)
{
	sHTML = arg;
	oEditors.getById["content_textarea"].exec("PASTE_HTML", [sHTML]);
}

// 등록중입니다 이미지 표현
function upload(){
	var o = document.getElementById("contents");
	var s = "<div class=\"ui-overlay\"></div>";
	s += "<div id=\"ui-upload\"><img src=\"/ease_src/loading.gif\" alt=\"등록중입니다.\" class=\"imgLoading\"></div>";
    o.innerHTML += s;
}



//메일선택시
function mailChange(arg, arg2){
	var sel_f = document.getElementById(arg2);
	if(arg == ""){
		sel_f.readOnly = false;
		sel_f.focus();
		sel_f.display = "block";
	}else{
		sel_f.readOnly = true;
		sel_f.display = "none";
	}
	sel_f.value = arg;
}

//이메일형식 체크
function isMail_check(arg){
	if( (arg.value).indexOf("@") < 0 || (arg.value).indexOf(".") < 0 ){
		return false;
	}else{
		return true;
	}
}

//첨부파일체크
function fnc_xfile(arg, type){
	var xfile = arg;
	xfile = xfile.substring(xfile.lastIndexOf(".")+1);
	if(xfile.toLowerCase() != type){
		alert(xfile.toUpperCase() + "파일은 업로드 할 수 없습니다.");
		return false;
	}else{
		return true;
	}
}

//링크보내기
function link_go(arg){
	location.href = arg;
}

//링크보내기
function selectLink(url, arg){
	location.href = url + arg;
}

//input type box
function inputFunction(formObj, inputType){
	
	var keycode = event.keyCode;
	var smark   = formObj.mark;
	var rvalue  = formObj.value;

	var keychar = String.fromCharCode(keycode);

	// 대문자로 변환
	if(inputType.toUpperCase() == "L"){
		formObj.value = rvalue + keychar.toUpperCase();
		event.returnValue = false;
	}

	// 소문자로 변환
	if(inputType.toUpperCase() == "S"){
		formObj.value = rvalue + keychar.toLowerCase();
		event.returnValue = false;
	}

	// 숫자만 입력
	if(inputType.toUpperCase() == "N" && (event.keyCode < 48 || event.keyCode > 57)){
		event.returnValue = false;
	}
}

// 파일 용량체크
function getFileSize(maxSize, arg){
	var img = new Image();
	img.dynsrc = arg;
	var filesize = img.fileSize;
	alert(filesize + ", " + maxSize);
	if(filesize > maxSize){
		return false;
	}else{
		return true;
	}
}

// 파일 확장자 체크
function reviewUploadImg(fileObj, argName, fileExp){		// 첨부파일, input name, 첨부가능한 확장자
	var result = false;
	var filePath = fileObj.value;
	var fileName = filePath.substring(filePath.lastIndexOf("\\")+1);
	var fileKind;
	if(fileName.lastIndexOf(".") > -1){
		fileKind = fileName.substring(fileName.lastIndexOf(".")+1);
		fileKind = fileKind.toLowerCase();	// 확장자를 소문자로 변환
	}
	var fileExpansion = fileExp.split(",");
	
	if(filePath == ""){
		return true;
	}
	
	for(var i = 0 ; i < fileExpansion.length ; i++)
	{
		if(fileKind != fileExpansion[i]){
			result = false;
		}else{
			result = true;
			return result;
		}
	}
	
	if(!result) {
		alert(fileExp + " 파일만 가능합니다.");
		document.getElementById(argName).value = "";
		document.getElementById(argName).select();
		document.selection.clear();
	}
	return result;
}

// 
function filePreview(bid, list_no)
{
	alert("파일 미리보기 준비중입니다.");
}

var rssShowBoolean = "false";
function rss_layer_show() {
	if(rssShowBoolean == "false"){
		document.getElementById("rssList").style.visibility = "visible";
		rssShowBoolean = "true";
	}else{
		document.getElementById("rssList").style.visibility = "hidden";
		rssShowBoolean = "false";
	}
}

// 코멘트 글자수 제한
function insertContentsMax(spanID, max, formNm) {
	if(formNm.value.length > max){
		formNm.value = formNm.value.substr(0,max);
	}
	document.getElementById(spanID).innerHTML = formNm.value.length;
}

// 체크박스 전체 선택
function chkAllCheck(formNm){
	if(formNm.chkAll.checked){
		for(var i=0; i < formNm.chk.length; i++){
			formNm.chk[i].checked = true;
		}
	}else{
		for(var i=0; i<formNm.chk.length; i++){
			formNm.chk[i].checked = false;
		}
	}
}
//체크박스 객체별 선택
function chkBoxCheck(formNm){
	var nChecked = 0;
	for(var i=0; i < formNm.chk.length; i++){
		if(formNm.chk[i].checked){
			nChecked++;
		}
	}
	if(nChecked == formNm.chk.length){
		formNm.chkAll.checked = true;
	}else{
		formNm.chkAll.checked = false;
	}
}

// 댓글 수정 영역
function spread_upt(k){
	var spread_comment = document.getElementById("comment_" + k);
	spread_comment.style.display=(spread_comment.style.display=='block')?'none':'block';
	
	var spread_box = document.getElementById(k + "_box");
	spread_box.style.display=(spread_box.style.display=='block')?'none':'block';
}

// 답글 영역
function spread(k){
	var spread_btn = document.getElementById(k);
	var spread_box = document.getElementById(k + "_box");
	spread_btn.className=(spread_btn.className=='of_reply on')?'of_reply off':'of_reply on';
	spread_box.style.display=(spread_box.style.display=='block')?'none':'block';
}


// 실명인증 서비스
function openCBAWindow()
{ 
	var CBA_window = window.open('', 'CbaWindow', 'width=410, height=450, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=300, top=200' );
	document.cbaForm.action = 'https://name.siren24.com/vname/jsp/vname_j10.jsp';                     // 가상식별 실명확인서비스 URL
	document.cbaForm.target = 'CbaWindow';
	document.cbaForm.method = "post";
	document.cbaForm.submit();
}
// 공공아이핀
function testAuth() {
    wWidth = 360;
    wHight = 120;
    
    wX = (window.screen.width - wWidth) / 2;
    wY = (window.screen.height - wHight) / 2;
		 
	window.open("/G-PIN/Sample-AuthRequest.jsp?retPage=/01kr/community/05community/index.jsp%3Frealcheck=chk", "gPinLoginWin", "directories=no,toolbar=no,left="+wX+",top="+wY+",width="+wWidth+",height="+wHight);
}

// 글등록이 등록중입니다 이미지 호출하는 스크립트
function write_loading(){
	$("#mw_temp").html("<div class=\"bg\"></div><div class=\"fg\"><span class=\"loding\"><img src=\"/ease_src/img/loding.gif\" alt=\"Loading...\"></span></div>");
	$("#mw_temp").css("display","block");
}

// 페이지 이동
function goPage(arg){
	var fm = document.srhForm;
	fm.nPage.value = arg;
	fm.act.value = "list";
	fm.submit();
}

// 상세페이지 이동
function goView(arg){
	var fm = document.srhForm;
	fm.list_no.value = arg;
	fm.act.value = "view";
	fm.submit();
}

//상세페이지 이동
function goView2(list_no, nPage, page_num){
	var fm = document.srhForm;
	fm.list_no.value = list_no;
	fm.nPage.value = nPage;
	fm.page_num.value = page_num;
	fm.act.value = "view";
	fm.submit();
}

//상세에서 하위목록페이지 이동
function goViewin(arg){
	var fm = document.vewForm;
	fm.list_no.value = arg;
	fm.act.value = "view";
	fm.submit();
}

// 목록으로 이동
function goList(){
	var fm = document.vewForm;
	fm.act.value = "list";
	fm.submit();
}

// 달력 상세보기
var nListCount = 1;
function fncCalendarDetail(sel_date){
	var fm = document.srhForm;
	fm.sel_date.value = sel_date;
	var formData = $("#srhForm").serialize();
	$.ajax({
		type:'POST',
		async:true,
		data:formData,
		url:'/boardCalendarAjax.es?nPage='+nListCount,
		success:function(result){
			var response = result.trim();
			if(response == ""){
				$("#listView").html("<span class=\"nodata\">일정이 없습니다.</span>");
			}else{
				$("#listView").html(response);
				$('html,body').animate({
					scrollTop: 498
				}, 500);
			}
		},
		error:function(data,status,err){
			errorBox("오류가 발생했습니다.");
		}
	});
}
function fncCalendarDetailAll(sel_date){
	var fm = document.srhForm;
	fm.sel_date.value = sel_date;
	var formData = $("#srhForm").serialize();
	$.ajax({
		type:'POST',
		async:true,
		data:formData,
		url:'/boardCalendarAllAjax.es?nPage='+nListCount,
		success:function(result){
			var response = result.trim();
			if(response == ""){
				$("#listView").html("<span class=\"nodata\">일정이 없습니다.</span>");
			}else{
				$("#listView").html(response);
				$('html,body').animate({
					scrollTop: 498
				}, 500);
			}
		},
		error:function(data,status,err){
			errorBox("오류가 발생했습니다.");
		}
	});
}

// 글쓰기 버튼 선택시 IPIN버튼 활성화
function fncBoardWriteIPIN(){
	var fm = document.srhForm;
	var formData = $("#srhForm").serialize();
	$.ajax({
		type:'POST',
		async:true,
		data:formData,
		url:'/ease_src/board/btn_ipin.jsp',
		success:function(result){
			var response = result.trim();
			if(response == ""){
				$("#listView").html("<span class=\"nodata\">일정이 없습니다.</span>");
			}else{
				$("#listView").html(response);
			}
		},
		error:function(data,status,err){
			alert("오류가 발생했습니다.");
		}
	});
}

// 댓글 수정 버튼클릭
function fncCmtUpdate(divId1, divId2){
	$(divId1).toggle(300);
	$(divId2).toggle(300);
}

// 댓글 답변 버튼클릭
function fncCmtReply(divId, bid, list_no, seq, formName){
	$(divId).toggle(300);
}


// 프린트
function printTarget(arg){
	var item = $(arg).html();
	var win = null;
    win = window.open();
    self.focus();
    win.document.open();
    win.document.write(item);
    win.document.close();
    win.print();
    win.close();
}
$(function(){
	/* faq 아코디언 */
	$(".listFaq .question > a").on("click",
		function() {
			$(this).parent().parent().toggleClass("active").siblings()
					.removeClass("active");
			return false;
		});
});

// 상세페이지 이전글 다음글이동
function goViewAB(arg){
	var fm = document.vewForm;
	fm.list_no.value = arg;
	fm.act.value = "view";
	fm.submit();
}
