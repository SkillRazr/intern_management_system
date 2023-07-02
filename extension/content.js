(() => {
  chrome.runtime.onMessage.addListener(function (t, i, n) {
    console.log(
      i.tab ? "from a content script:" + i.tab.url : "from the extension",
      t.greeting
    );

    "hello" === t.greeting &&
      ("0px" === e.style.width
        ? ((e.style.width = "100%"),
          (e.src = chrome.runtime.getURL("index.html")))
        : (e.style.width = "0px"));
  });

  var e = document.createElement("iframe");
  e.style.background = "white";
  e.style.height = "100%";
  e.style.width = "0px";
  e.style.position = "fixed";
  e.style.top = "0px";
  e.style.right = "0px";
  e.style.zIndex = "9000000000000000000";
  e.src = chrome.runtime.getURL("sample.html"); // by default we are not injecting the main app index.html file to avoid scripts running in every tab we open even the extension is not open yet
  e.style.border = "0px";
  document.body.appendChild(e);
})();
