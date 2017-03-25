function steph(){
		console.log("hi");
}
/*
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	
	chrome.extension.getBackgroundPage().console.log('fee');
	steph();
	var testValue = 1337;
	var myval = JSON.parse(localStorage.getItem("a"));
	if(!myval) myval = 0;
	localStorage.setItem("a",JSON.stringify(myval + 1));
	console.log("local storage? " + myval);
	
	var searchFor = 'test';
	chrome.storage.sync.get([searchFor], function (o) {

		chrome.extension.getBackgroundPage().console.log('async storage test get returns: ' + o[searchFor]);
	});

	chrome.storage.sync.set({
		'test': testValue
	}, function () {

		chrome.extension.getBackgroundPage().console.log('async storage test set works');
	});

	if (changeInfo.status == 'complete' && tab.active) {

		chrome.tabs.query({
			'active': true,
			'lastFocusedWindow': true
		}, function (tabs) {
				chrome.tabs.executeScript(null, {
					code: `console.log("injected")`
				});
		});
	}
});*/