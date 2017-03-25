
chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed.");
  // localStorage is persisted, so it's a good place to keep state that you
  // need to persist across page reloads.
  localStorage.clear();
	steph();
	steph();
	steph();

  // Register a webRequest rule to redirect bing to google.
  //var wr = chrome.declarativeWebRequest;
  /*chrome.declarativeWebRequest.onRequest.addRules([{
    id: "0",
    conditions: [new wr.RequestMatcher({url: {hostSuffix: "bing.com"}})],
    actions: [new wr.RedirectRequest({redirectUrl: "http://google.com"})]
  }]);*/
});




