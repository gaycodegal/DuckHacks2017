
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	chrome.extension.getBackgroundPage().console.log('foo');
	
  if (changeInfo.status == 'complete' && tab.active) {

    chrome.tabs.query({
      'active': true,
      'lastFocusedWindow': true
    }, function (tabs) {
      var url = btoa(tabs[0].url);
      chrome.storage.sync.get([url], function (o) {
        chrome.tabs.executeScript(null, {
          code: 
					`console.log("injected")`
        });
      });
    });
  }
});