/* eslint-disable no-undef */
chrome.action.onClicked.addListener((tab) => {
  console.log("before message sent", tab.id);
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { greeting: "hello" });
  });
  console.log("message sent");
});
