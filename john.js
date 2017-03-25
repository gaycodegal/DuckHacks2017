function john(){
		console.log("hi");
}

//Let's say var info = {Time, Event, Id, nUrl}

var ourHistory = [];
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var storeName = "url";
    chrome.extension.getBackgroundPage().console.log("Updated");
	chrome.extension.getBackgroundPage().console.log(Date.now());
    if(changeInfo.url != undefined){
        chrome.extension.getBackgroundPage().console.log(changeInfo.url);
        var ourHistory = JSON.parse(localStorage.getItem(storeName) || "[]");
        ourHistory.push({time: Date.now(), eventType: "URL_CHANGE", tabId: tabId, nURL: changeInfo.url});
	   localStorage.setItem(storeName,JSON.stringify(ourHistory));
    }

    
  if (changeInfo.status == 'complete' && tab.active) {

    chrome.tabs.query({
      'active': true,
      'lastFocusedWindow': true
    }, function (tabs) {
      var url = btoa(tabs[0].url);
      chrome.storage.sync.get([url], function (o) {
        chrome.tabs.executeScript(null, {
          code: 
                    
					`
                    console.log(Date.now());
                    console.log(window.location.href);
                    console.log("injected")`
        });
      });
    });
  }
});

chrome.tabs.onRemoved.addListener(function (tabId, removeInfo) {
    var storeName = "active";
    chrome.extension.getBackgroundPage().console.log("Removed");
	chrome.extension.getBackgroundPage().console.log(Date.now());
    var ourHistory = JSON.parse(localStorage.getItem(storeName) || "[]");

    ourHistory.push({time: Date.now(), active:false, eventType: "REMOVE", tabId: tabId});
	localStorage.setItem(storeName,JSON.stringify(ourHistory));

    
    
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    var storeName = "active";
    chrome.extension.getBackgroundPage().console.log("Activated");
	chrome.extension.getBackgroundPage().console.log(Date.now());
    chrome.extension.getBackgroundPage().console.log(activeInfo.tabId);
    
 var ourHistory = JSON.parse(localStorage.getItem(storeName) || "[]");
        ourHistory.push({time: Date.now(), active:true, eventType: "ACTIVE", tabId: activeInfo.tabId});
	localStorage.setItem(storeName,JSON.stringify(ourHistory));

});



