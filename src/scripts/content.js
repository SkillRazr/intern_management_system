/* eslint-disable no-undef */
var iframe = document.createElement("iframe");

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension",
    request.greeting
  );
  if (request.greeting === "hello") {
    iframe.src = chrome.runtime.getURL("index.html");
    toggle();
  }
  // sendResponse({farewell: "goodbye"});
});

iframe.style.background = "white";
iframe.style.height = "100%";
iframe.style.width = "0px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.style.border = "0px";
iframe.src = chrome.runtime.getURL("sample.html");
/* we are keeping this dummy sample.html to avoid intern app bundle script run on every tab even the extension is not in use 
   and load the index.html to run the extension code when the extension is open
 */
document.body.appendChild(iframe);

function toggle() {
  if (iframe.style.width === "0px") {
    iframe.style.width = "100%";
  } else {
    iframe.style.width = "0px";
  }
}
