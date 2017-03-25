
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {

  if (changeInfo.status == 'complete' && tab.active) {

    chrome.tabs.query({
      'active': true,
      'lastFocusedWindow': true
    }, function (tabs) {
      var url = btoa(tabs[0].url);
      chrome.storage.sync.get([url], function (o) {
        chrome.tabs.executeScript(null, {
          code: `
(function(){var scriptText = \`(function (prox_alert, prox_prompt, prox_confirm) {
  var message = eval(localStorage.getItem("onlyoncemessage")+"");
  var should_alert = message === null ? 1 : message;
  console.log("passed message is:" + message);
  //if message === Infinity, popups are enabled permanently
  window.alert = function () {
    // communicate with extension to figure out if you should send alert
    if (should_alert > 0) {
      should_alert--;
      messageExtension(should_alert);
      return prox_alert.apply(this, arguments);
    } else {
      return undefined;
    }
  };
  window.prompt = function () {
    // communicate with extension to figure out if you should send alert
    if (should_alert > 0) {
      should_alert--;
      messageExtension(should_alert);
      return prox_prompt.apply(this, arguments);
    } else {
      return null;
    }
  };
  window.confirm = function () {
    // communicate with extension to figure out if you should send alert
    if (should_alert > 0) {
      should_alert--;
      messageExtension(should_alert);
      return prox_confirm.apply(this, arguments);
    } else {
      return false;
    }
  };

function messageExtension(){
if(!eval(localStorage.getItem("onlyoncenotstatic")+"")){
  localStorage.setItem("onlyoncemessage",should_alert);
}
}

})(window.alert, window.prompt, window.confirm)\`;
var supathing = document.createElement("script");
supathing.type = "text/javascript";
supathing.textContent = scriptText;
document.documentElement.appendChild(supathing);
supathing.parentNode.removeChild(supathing);})();`
        });
      });
    });
  }
});