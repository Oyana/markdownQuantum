var gettingAllTabs = browser.tabs.query({});
var alreadyRender = [];
var currentSettings = '';
// When first loaded, initialize the page action for all tabs.
gettingAllTabs.then((tabs) => {
	for ( let tab of tabs ) {
		refreshSetting();
		renderMD(tab);
	}
});

// Each time a tab is updated, reset the page action for that tab.
browser.tabs.onUpdated.addListener( (id, changeInfo, tab) => {
	renderMD(tab);
});

refreshSetting = () => {
	var getdata = browser.storage.sync.get();
	getdata.then( ( res ) => {
		currentSettings = res;
		gettingAllTabs.then((tabs) => {
			for (let tab of tabs) {
				renderMD(tab);
			}
		});
	});
}

handleClick = () =>{
	browser.runtime.openOptionsPage();
}

// handle button click to load settings.
browser.browserAction.onClicked.addListener(handleClick);


canRender = tab => {
	if(
		tab.status == "complete"
		&& tab.url.indexOf(".md") > 0
	){
		return true;
	}
	return false;
}

renderMD = tab  => {
	if ( canRender( tab ) )
	{
		// console.log( currentSettings );
		// browser.tabs.insertCSS(currentSettings.o_custom_css)
		// () => {
		// 	// browser.tabs.executeScript( tab.id, {
		// 	// 	file: "../js/_jQuery.js"
		// 	// },
		// 	// () => {
		// 	// 	browser.tabs.executeScript( tab.id, {
		// 	// 		file: "../js/_markdown.js"
		// 	// 	},
		// 	// 	() => {
		// 	// 			browser.tabs.executeScript( tab.id, {
		// 	// 			file: "../js/_furigana.js"
		// 	// 		},
		// 	// 		() => {
		// 	// 			browser.tabs.executeScript( tab.id, {
		// 	// 				file: "../js/scripts.js"
		// 	// 			},
		// 	// 			() => {
		// 	// 				console.log("render ok", tab);
		// 	// 			});
		// 	// 		});
		// 	// 	});
		// 	// });
		// });
	}
};


function rewriteUserAgentHeader(e) {
	e.requestHeaders.push({'name':'supportHeaderParams', 'value':'true'});
	e.requestHeaders.push({'name':'Vary', 'value':'Accept-Encoding'});
	e.requestHeaders.push({'name':'Accept-Charset', 'value':'utf-8'});
	e.requestHeaders.push({'name':'Accept-Language', 'value':'utf-8, iso-8859-1;q=0.5, *;q=0.1'});
	e.requestHeaders.push({'name':'Content-Type', 'value':'text/html; charset=utf-8'});
	e.requestHeaders.push({'name':'Accept-Patch', 'value':'text/html; charset=utf-8'});
	e.requestHeaders.push({'name':'AddDefaultCharset', 'value':'utf-8'});
	e.requestHeaders.push({'name':'AddCharset', 'value':'utf-8'});

  return {requestHeaders: e.requestHeaders};
}

browser.webRequest.onBeforeSendHeaders.addListener(
  rewriteUserAgentHeader,
  {urls: [ "http://*/*.md", "https://*/*.md", "file://*/*.md" ]},
  ["blocking", "requestHeaders"]
);

// function logURL(requestDetails) {
//   console.log(requestDetails);
// }

// browser.webRequest.onBeforeRequest.addListener(
//   logURL,
//   {urls: [ "http://*/*.md", "https://*/*.md", "file://*/*.md" ]},
//   ["blocking", "requestBody"]
// );

function listener(details) {
  let filter = browser.webRequest.filterResponseData(details.requestId);
  let decoder = new TextDecoder("utf-8");
  let encoder = new TextEncoder();

  filter.ondata = event => {
  console.log(event);

	let str = decoder.decode(event.data, {stream: true});
	let html = '<html>';
	html += '<head>';
	html += '<meta charset="UTF-8">';
	html += '<meta name="viewport" content="width=device-width, initial-scale=1">';
	html += '<link rel="profile" href="http://gmpg.org/xfn/11">';
	html += '<title> MarkdownQuantum Document </title>';
	html += '</head>';
	html += '<body>';
	html += str+'testtest';
	html += '</body>';
	html += '</html>';
	//	+ '<meta charset="UTF-8">'
	// 	+ '<meta name="viewport" content="width=device-width, initial-scale=1">'
	// 	+ '<link rel="profile" href="http://gmpg.org/xfn/11">'
	// 	+ '<title> MarkdownQuantum Document </title>
	// Just change any instance of Example in the HTTP response
	// to WebExtension Example.
	str = str.replace(/Example/g, 'WebExtension Example');
	filter.write(encoder.encode(html));
	filter.disconnect();
  }
  filterBis.ondata = event => {
	console.log( event );
  }

  return {};
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {urls: [ "http://*/*.md", "https://*/*.md", "file://*/*.md" ], types: ["main_frame"]},
  ["blocking"]
);