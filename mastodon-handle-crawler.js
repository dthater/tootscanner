let tootlist = new Set()
let lastAmountScanned = 0

let tootresult = document.getElementById("tootresult")
if (!tootresult){
	tootresult = document.createElement("pre")
	tootresult.id = "tootresult"
	document.body.insertBefore(tootresult, null)
	tootresult.style.background = "yellow"
	tootresult.style.position = "fixed"
	tootresult.style.left = 0
	tootresult.style.top = 0
	tootresult.style.bottom = 0
	tootresult.style.padding = ".5em"
	tootresult.style.scrollBar = "auto"
	tootresult.style.overflowY = "scroll"  
}

function updateResults(){
  tootresult.innerText = `${tootlist.size} Mastodon handles:\n${[...tootlist].join("\n")}`
}

function scanToots(){
[...document.querySelectorAll("[data-testid='cellInnerDiv']")]
.map( t => t.innerText )
.map( t => {
	let arr = [
		/(@[a-zA-Z0-9-]*@[a-zA-Z0-9-]*\.[a-zA-Z0-9-]*)/g,
		/([a-zA-Z0-9\.:\/-]*\/@[a-zA-Z0-9-]*)/g,
		/([a-zA-Z0-9-]*@[a-zA-Z0-9-]*\.social)/g
	].map(k => k.exec(t)).filter(k => k != null).map(k => k[1])
	return arr.length ? arr[0] : null
})
.filter( t => t != null).forEach( t => {
	let prevAmountScanned = lastAmountScanned
  tootlist.add(t)
  lastAmountScanned = tootlist.size
  if (prevAmountScanned != lastAmountScanned) {
    updateResults()
  }
})
}

function startScanner(){
  stopScanner()
  self.hTootScanner = setInterval(scanToots, 250)
}

function stopScanner(){
  if (self.hTootScanner) {
    clearInterval(self.hTootScanner)
  }
}

function startScrolling(){
  stopScrolling()
  self.hTootScroller = setInterval(function (){
    [...document.querySelectorAll("[data-testid='cellInnerDiv']")].filter( (a,b,c) => b == c.length-1 ).reduce( (d,v) => v, null ).scrollIntoView()
  }, 250)
}

function stopScrolling(){
  if (self.hTootScroller) {
    clearInterval(self.hTootScroller)
  }
}

startScanner()
