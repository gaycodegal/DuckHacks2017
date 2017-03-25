//Let's say var info = {Time, Event, Id, nUrl}

var ourHistory = [];
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    chrome.extension.getBackgroundPage().console.log("Updated");
	chrome.extension.getBackgroundPage().console.log(Date.now());
    if(changeInfo.url != undefined){
        chrome.extension.getBackgroundPage().console.log(changeInfo.url);
    ourHistory.push({time: Date.now(), eventType: "URL Changed", Identification: tabId, nURL: changeInfo.url})
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
    chrome.extension.getBackgroundPage().console.log("Removed");
	chrome.extension.getBackgroundPage().console.log(Date.now());
    ourHistory.push({time: Date.now(), eventType: "Removed", Identification: tabId})
});

chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.extension.getBackgroundPage().console.log("Activated");
	chrome.extension.getBackgroundPage().console.log(Date.now());
    chrome.extension.getBackgroundPage().console.log(activeInfo.tabId);
        ourHistory.push({time: Date.now(), eventType: "Activated", Identification: activeInfo.tabId})
});

function printHistory(){
    for(var a = 0; a < ourHistory.length; a++){
        var oTest = ourHistory[a];
        if(oTest.nURL == null){
        chrome.extension.getBackgroundPage().console.log("Time: " + oTest.time + "  Event: " + oTest.eventType + "  TabId: " +oTest.Identification);
        }
        else{
        chrome.extension.getBackgroundPage().console.log("Time: " + oTest.time + "  Event: " + oTest.eventType + "  TabId: " +oTest.Identification + "  URL: " + oTest.nURL);
        }
    }
    
}