var evt = {};

evt.resetdata = function(){
	localStorage.clear();
	console.info("Data reset!");
};
evt.setemail = function(){
	var val = document.getElementById("emailinput").value;
	localStorage.setItem("warning-email", val);
	console.info("Email set!");
};

window.addEventListener('load', function(){
	var btns = document.getElementsByTagName("button");
	for(var i = 0; i < btns.length; ++i){
		console.log(btns[i].getAttribute('id'),evt, evt[btns[i].getAttribute('id')]);
		btns[i].addEventListener("click",evt[btns[i].getAttribute('id')]);
	}
});

