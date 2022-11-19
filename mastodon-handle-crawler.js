let tootlist = new Set()
let lastAmountScanned = 0

let tootresult = document.getElementById("tootresult")
if (!tootresult) {
  tootresult = document.createElement("textarea")
  tootresult.id = "tootresult"
  document.body.insertBefore(tootresult, null)
  tootresult.style.background = "yellow"
  tootresult.style.position = "fixed"
  tootresult.style.left = 0
  tootresult.style.top = 0
  tootresult.style.bottom = 0
  tootresult.style.width = "20%"
  tootresult.style.padding = ".5em"
  tootresult.style.overflowY = "scroll"
  tootresult.style.whiteSpace = "pre"
}

function updateResults() {
  console.log(`${tootlist.size} Mastodon handles found.`)
  tootresult.value =
    printCsvHeader() +
    printCsvBody([...tootlist])
}

function printCsvHeader() {
  return "Account address,Show boosts,Notify on new posts,Languages\n"
}

function printCsvBody(list) {
  return list.map(t => `${t},true,false,`).join("\n")
}

function scanToots() {
  [...document.querySelectorAll("[data-testid='cellInnerDiv']")]
    .map(t => t.innerText)
    .map(findHandle)
    .filter(t => t != null)
    .map(convertUrlToHandle)
    .map(fixHandle)
    .filter(t => t != null)
    .forEach(t => {
      let prevAmountScanned = lastAmountScanned
      tootlist.add(t)
      lastAmountScanned = tootlist.size
      if (prevAmountScanned != lastAmountScanned) {
        updateResults()
      }
    })
}

function findHandle(text) {
  let arr = [
    /(@[a-zA-Z0-9-]*@[a-zA-Z0-9-]*\.[a-zA-Z0-9-]*)/g,
    /([a-zA-Z0-9\.:\/-]*\/@[a-zA-Z0-9-]*)/g,
    /([a-zA-Z0-9-]*@[a-zA-Z0-9-]*\.social)/g
  ].map(k => k.exec(text)).filter(k => k != null).map(k => k[1])
  return arr.length ? arr[0] : null
}

function convertUrlToHandle(handle) {
  let items = /(http[s]*:\/\/)([a-zA-Z0-9\.-\/]*)\/(@[a-zA-Z0-9-]*)/g.exec(handle)
  if (items) {
    let [finding, protocoll, host, name] = items
    return `${name}@${host}`
  }
  return handle
}

function fixHandle(handle) {
  return handle.indexOf("@") != 0 ? `@${handle}` : handle
}

function startScanner() {
  stopScanner()
  self.hTootScanner = setInterval(scanToots, 250)
}

function stopScanner() {
  if (self.hTootScanner) {
    clearInterval(self.hTootScanner)
  }
}

function startScrolling() {
  stopScrolling()
  self.hTootScroller = setInterval(function () {
    [...document.querySelectorAll("[data-testid='cellInnerDiv']")].filter((a, b, c) => b == c.length - 1).reduce((d, v) => v, null).scrollIntoView()
  }, 250)
}

function stopScrolling() {
  if (self.hTootScroller) {
    clearInterval(self.hTootScroller)
  }
}

startScanner()
