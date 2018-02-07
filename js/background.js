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

