var evt = {};

evt.resetdata = function () {
	localStorage.clear();
	console.info("Data reset!");
};
evt.setemail = function () {
	var val = document.getElementById("emailinput").value;
	localStorage.setItem("warning-email", val);
	console.info("Email set!");
	sendTestEmail(val);
};

function make(a, text, st, type) {
	var s = document.createElement(a);
	if (text)
		s.innerHTML = text;
	if (st)
		s.className = st;
	if (type)
		s.type = type;
	return s;
}

function setChecked(type, use, neu, dist) {
	switch (type) {
	case "Useful":
		use.checked = true;
		neu.checked = false;
		dist.checked = false;
		break;
	case "Distracting":
		use.checked = false;
		neu.checked = false;
		dist.checked = true;
		break;
	default:
		use.checked = false;
		neu.checked = true;
		dist.checked = false;
		break;
	}
}

function setTypeUrl(url, type){
	console.log(url+"-utility", type);
	localStorage.setItem(url+"-utility", type);
}

function sendTestEmail(recip){
	var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        console.log(xhr.responseText);
    }
}
xhr.open('GET', 'http://bluecode.altervista.org/email/send.php?to='+ recip+'&subject=Test%20From%20Thrive&message=Get%20ready%20to%20Thrive', true);
xhr.send(null);
	
}

function setClassFn(url, type, use, neu, dist) {
	var weare = null;
	switch (type) {
	case "Useful":
		weare = use;
		break;
	case "Distracting":
		weare = dist;
		break;
	default:
		weare = neu;
		break;
	}
	weare.addEventListener("click", function (e) {
		if (neu != weare)
			neu.checked = false;
		if (dist != weare)
			dist.checked = false;
		if (use != weare)
			use.checked = false;
		
		
		//console.log(window.test = weare);
		setTypeUrl(url, type);
		weare.checked = true;
		e.stopPropagation();
		
		return false;
	})
}

function neutralEdit(url, current) {

	var thing = make("div");
	thing.appendChild(make("p", "Classification: " + url));
	thing.appendChild(make("label", "Useful ", "lblclss"));
	var isuse = make("input", 0, "inpt", "checkbox");
	thing.appendChild(isuse);
	thing.appendChild(make("br"));
	thing.appendChild(make("label", "Neutral ", "lblclss"));
	var isneu = make("input", 0, "inpt", "checkbox");
	thing.appendChild(isneu);
	thing.appendChild(make("br"));
	thing.appendChild(make("label", "Distracting ", "lblclss"));
	var isdist = make("input", 0, "inpt", "checkbox");
	thing.appendChild(isdist);
	thing.appendChild(make("br"));
	thing.appendChild(make("br"));
	thing.appendChild(make("br"));
	setChecked(current, isuse, isneu, isdist);
	setClassFn(url, "Useful", isuse, isneu, isdist);
	setClassFn(url, "Distracting", isuse, isneu, isdist);
	setClassFn(url, "Neutral", isuse, isneu, isdist);
	return thing;
}

window.addEventListener('load', function () {
	var btns = document.getElementsByTagName("button");
	for (var i = 0; i < btns.length; ++i) {
		console.log(btns[i].getAttribute('id'), evt, evt[btns[i].getAttribute('id')]);
		btns[i].addEventListener("click", evt[btns[i].getAttribute('id')]);
	}
	var myform = document.getElementById("wherego");
	myform.appendChild(make("br"));
	myform.appendChild(make("br"));
	var sites = Analyze();
	for (var url in sites) {
		myform.appendChild(neutralEdit(url, IsUseful(url)));
	}
});