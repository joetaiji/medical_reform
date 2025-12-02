const bShowAuthDLG = true;
const __pPermpstr = "f71db695a0c52753463212817bcfb81bcf7e78f0bb31f38c10f81c607db049a5";

$(function () {       
    
	zoom('.zoom-drop .drop-menu button') //화면크기조정
	listOpen('.drop-btn', '.drop-wrap') //drop메뉴
	layerPopup('.header .btn-navi.sch') 	//통합검색

    gnb('nodepth2')	//gnb메뉴 

	mobileGnb()	//모바일 gnb메뉴
	
	if(bShowAuthDLG){
		let _AuthUser = sessionStorage.getItem('__CMMDLG_AUTH'); 
		
		if(_AuthUser != "Y")
			$("#divCommonloginDialog").show();	
	}
		
	$("#clPassword").on("keypress", (e) => {
		if(e.key == "Enter")
		{
			e.preventDefault();
			_fnCommonloginCommit();
			return false;
		}
	});
	
});

function hashSHA256CryptoJS(password){
	const hash = CryptoJS.SHA256(password);
	return hash.toString(CryptoJS.enc.Hex);
}

function _fnCommonloginCommit(){

	let ipwd = $("#clPassword").val(); 

	if( ipwd == ""){
		alert("패스워드를 입력해주십시오.");
		$("#clPassword").focus();
		return;
	}
	
	let encryptPwd = hashSHA256CryptoJS(ipwd);
	
	if(encryptPwd.toString() == __pPermpstr){
		sessionStorage.setItem('__CMMDLG_AUTH', 'Y'); 
		$("#divCommonloginDialog").fadeOut();
	}
	
	else {
		alert("패스워드가 정확하지 않습니다.");
		$("#clPassword").val("").focus();
		return;
	}
	
}



