//Michael is the name of the guy

function steph() {
	var tabid = "frogs";
	var ourHistory = JSON.parse(localStorage.getItem(tabid + "-test") || "[]");
	ourHistory.push({
		time: Date.now(),
		eventType: "URL Changed",
		Identification: "asdf",
		nURL: "asdf"
	});
	console.log(ourHistory);
	localStorage.setItem(tabid + "-test", JSON.stringify(ourHistory));
}

function AnalyzeData() {
	var SampleDataURL = [{
		time: 100,
		eventType: AnalyzeData.URL_CHANGE,
		tabId: 1012032,
		nURL: "http://www.google.com/"
	}, {
		time: 400,
		eventType: AnalyzeData.URL_CHANGE,
		Identification: 1012032,
		nURL: "http://www.facebook.com/"
	}, {
		time: 600,
		eventType: AnalyzeData.URL_CHANGE,
		Identification: 1012032,
		nURL: "http://www.google.com/"
	}];

	var SampleDataActive = [{
		time: 50,
		active: true
	}, {
		time: 150,
		active: false
	}, {
		time: 200,
		active: true
	}, {
		time: 210,
		active: true
	}];

	for (var i = 250; i < 500; i += 100) {
		SampleDataActive.push({
			time: i,
			active: true
		});
		SampleDataActive.push({
			time: i + 50,
			active: false
		});
	}

	if (!SampleDataURL.length)
		return;
	var temp = SampleDataURL[0];
	var url = temp.nURL;
	var validUntil = (SampleDataURL.length >= 2) ? SampleDataURL[1].time : Infinity;
	var activePtr = 0;
	var urlPtr = 0;
	if (!SampleDataActive.length)
		return;
	var currentTime = SampleDataActive[0].time;
	var done = false;
	while (activePtr < SampleDataActive.length && !done) {
		while (currentTime < validUntil && !done) {

			activePtr++;
			if (activePtr >= SampleDataActive.length) {
				done = true;
			} else {
				currentTime = SampleDataActive[activePtr].time;
			}
		}
		urlPtr++;
		validUntil = (SampleDataURL.length >= urlPtr + 2) ? SampleDataURL[urlPtr + 1].time : Infinity;
	}

}

AnalyzeData.URL_CHANGE = "URL_CHANGE";
/*
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	console.log()
});*/
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

//localStorage.setItem(tabid+"-update",JSON.stringify([]));
//localStorage.setItem(tabid+"-active",JSON.stringify([]));

/*
var obj = {
	"adsf":1234,
	asd:2,
	a:[1,2,""]
}*/

function IsUseful(url){
	var res = localStorage.getItem(url+"-utility");
	console.log(url+"-utility",res);
	if(!res)
		return "Neutral";
	return res;
	//return "Useful";
	//return "Distracting";
}

function Analyze() {
	var storeName = "active";
	var activities = JSON.parse(localStorage.getItem(storeName) || "[]");
	
	var unused = [];
	var activityPtr = 0;
	var attime = 0,
		nattime = 0;
	var activity = null;
	var tabId = 0;
	var lastActive = -1;
	var timeSlicesByTabId = {};
	//console.info(activities);
	
	if(!activities.length)
		return;
	while (activityPtr < activities.length) {
		activity = activities[activityPtr];
		if(!activity) continue;
		tabId = activity.tabId;
		nattime = activity.time;
		if (lastActive != -1) {
			var list = timeSlicesByTabId[lastActive];
			if (!list) {
				list = [];
				timeSlicesByTabId[lastActive] = list;
			}
			timeSlicesByTabId[lastActive].push({
				s: attime,
				e: nattime,
				l: (nattime - attime)
			});
		}
		lastActive = tabId;
		attime = nattime;
		if (!activity.active) {
			lastActive = -1;
		}
		++activityPtr;
	}
	if (activity.active)
		unused = [activity];

	//localStorage.setItem(storeName, JSON.stringify(unused));
	var timeStore = {};
	for (tabId in timeSlicesByTabId) {
		var ret = AnalyseByTab(tabId, timeSlicesByTabId[tabId]);
		for(var url in ret){
			if(!timeStore[url]){
				timeStore[url] = ret[url];
			}else{
				timeStore[url] += ret[url];
			}
		}
	}
	
	for(var url in timeStore){
		console.info("spent " + timeStore[url]/1000/60 + " minutes on " + url);
	}
	return timeStore;
}

function AnalyseByTab(tabId, slices) {
	var storeName = tabId + "url";
	if (!slices || !slices.length)
		return;
	var urls = JSON.parse(localStorage.getItem(storeName) || "[]");
	if (!urls.length)
		return;

	var s, e, l;
	var urllen = urls.length;
	var urlslices = new Array(urllen);
	for (var i = 0; i < urllen - 1; ++i) {
		s = urls[i].time;
		e = urls[i + 1].time;
		l = e - s;
		urlslices[i] = {
			s: s,
			e: e,
			l: l,
			url: getCanonicalURL(urls[i].nURL)
		};
		if (!urlslices[i].url)
			urlslices[i] = null;
	}

	var timeStore = {};

	urlslices[urllen - 1] = {
		s: urls[urllen - 1].time,
		e: Infinity,
		l: Infinity,
		url: getCanonicalURL(urls[urllen - 1].nURL)
	};

	//console.log(urlslices, slices);
	var sliceptr = 0;
	var urlsliceptr = 0,
		lasturl = null;
	while (!lasturl && urlsliceptr < urlslices.length) {
		lasturl = urlslices[urlsliceptr++];
	}
	if (!lasturl)
		return;
	var forcestart = lasturl.s;
	while (sliceptr < slices.length) {
		var slice = slices[sliceptr];
		var start = slice.s;
		var end = slice.e;
		var consumed = false;
		while (!consumed) {
			var consumeEnd = Math.min(lasturl.e, end);
			var consumeStart = Math.max(forcestart, start);
			var chunk = consumeEnd - consumeStart;
			var url = lasturl.url;
			//console.warn(lasturl);
			if (!timeStore[url])
				timeStore[url] = 0;
			if (chunk > 0) {
				timeStore[url] += chunk;
			} else {
				//console.warn("chunk non positive");
				break;
			}
			start += chunk;
			if (start >= end)
				consumed = true;
			while (!consumed && (!lasturl || lasturl.e) <= start && urlsliceptr < urlslices.length) {
				lasturl = urlslices[urlsliceptr++];
			}
		}
		sliceptr++;
	}
	
	delete(timeStore[""]);
	
	return timeStore;
	//localStorage.setItem(storeName, JSON.stringify([urls[urls.length - 1]]));
}

function getCanonicalURL(url) {
	try {
		var parts = url.split("://")[1].split("/")[0].split(".");
		return parts.slice(parts.length - 2).join(".");
	} catch(e) {
		return false;
	}
}

window.Analyze = Analyze;

function SendWarnings(data){
	var storeName = "triggers";
	var triggers = null;
	
}
/*
activity = activities[activityPtr];
tabId = activity.tabId;
url = tabURLs[tabId];
if(url === false){
	++activityPtr;
	continue;
}
if(url === undefined){
	timenull = true;
}else{
	time = currentTimes[tabId];
	attime = activity.time;
	timenull = (time === undefined);
}
		
		
if(timenull || (time >= 0 && attime > time)){
	
	cuttime = getTime(attime, tabId, timenull ? 0 : currentTimes[url], urls, tabURLs);
	if(!timenull){
		timeSums[url] += Math.m;
	}
}
url = tabURLs[activities.tabId];
if(url === false){
	++activityPtr;
	continue;
}
if(time == -Infinity){
	++activityPtr;
	unused.push(activity);
}
*/