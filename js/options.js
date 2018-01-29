// store settings from option page (retrived from input value).
saveOptions = e =>{
	browser.storage.sync.set({
		o_custom_css: document.querySelector(".o_custom_css").value
	});
	e.preventDefault();
}

// Load option value into settings form.
restoreOptions = () => {
	var getdata = browser.storage.sync.get();
	getdata.then( (res) => {
		aplyValue( ".o_custom_css", res.o_custom_css, "body{}" );
	} );
}

// restoreOptions hellper (aply value to a specific selector)
aplyValue = ( selector, inptValue, inptDefaultValue = false, isRadio = false ) => {
	if ( isRadio == true )
	{
		if ( inptValue == 0 )
		{
			document.querySelector( selector + ".disable").checked = true;
		}
		else if ( inptValue == 2 )
		{
			document.querySelector( selector + ".atnight").checked = true;
		}
		else // 1 or unset
		{
			document.querySelector( selector + ".enable").checked = true;
		}
	}
	else
	{
		document.querySelector( selector ).value = inptValue || inptDefaultValue;
	}
}

toggle = selector =>{
	document.querySelector( selector ).classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("submit", refreshSetting);