(() => {
  var e = document.createElement("iframe");
  chrome.runtime.onMessage.addListener(function (t, i, n) {
    console.log(
      i.tab ? "from a content script:" + i.tab.url : "from the extension",
      t.greeting
    ),
      "hello" === t.greeting &&
        ((e.src = chrome.runtime.getURL("index.html")),
        "0px" === e.style.width
          ? (e.style.width = "100%")
          : (e.style.width = "0px"));
  }),
    (e.style.background = "white"),
    (e.style.height = "100%"),
    (e.style.width = "0px"),
    (e.style.position = "fixed"),
    (e.style.top = "0px"),
    (e.style.right = "0px"),
    (e.style.zIndex = "9000000000000000000"),
    (e.style.border = "0px"),
    (e.src = chrome.runtime.getURL("sample.html")),
    document.body.appendChild(e);
})();
