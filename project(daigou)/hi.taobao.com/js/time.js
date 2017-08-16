//发送验证码
var wait = 60;
function time(o) {
	$(".forget-send-code").hide();
	$(".time").show();
	if(wait == 0) {
		o.removeAttribute("disabled");
		/* o.value="获取验证码";*/
		o.innerHTML = "获取验证码";
		$(".forget-send-code").show();
		$(".time").hide();
		wait = 60;
	} else {
		o.setAttribute("disabled", true);
		/* o.value="重新发送(" + wait + ")";*/
		$(".time").text("重新发送(" + wait + ")")
		wait--;
		setTimeout(function() {
				time(o)
		},1000)
	}
}
