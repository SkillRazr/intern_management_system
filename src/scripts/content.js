/* eslint-disable no-undef */
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension",
    request.greeting
  );
  if (request.greeting === "hello") toggle();
  // sendResponse({farewell: "goodbye"});
});

var iframe = document.createElement("iframe");
iframe.style.background = "white";
iframe.style.height = "100%";
iframe.style.width = "0px";
iframe.style.position = "fixed";
iframe.style.top = "0px";
iframe.style.right = "0px";
iframe.style.zIndex = "9000000000000000000";
iframe.style.border = "0px";
iframe.src = chrome.runtime.getURL("index.html");

document.body.appendChild(iframe);

function toggle() {
  if (iframe.style.width === "0px") {
    iframe.style.width = "100%";
  } else {
    iframe.style.width = "0px";
  }
}
