// Encoding: UTF-8
// Released under MIT license
// Copyright (c) 2018 Golga

main = () => {
	const curentUrl = window.location.href;
	if ( curentUrl.indexOf("file://") === -1 )
	{
		/*Ajax hack to pache encoding without bom*/
		console.log( document.charset );
		load( curentUrl, render );
	}
	else
	{
		console.log( document.charset );
		render( document.getElementsByTagName("pre")[0].innerHTML );
	}
}

render = data => {
	data = furiganaIt( markdown.toHTML( data, "Maruku" ) );
	renderHead( data );
	renderBody( data );
	renderTitle();
}

renderHead = data => {
	const head = document.head;

	const metaCharSet = document.createElement('meta');
	metaCharSet.charset = 'UTF-8';
	metaCharSet.attributeName = 'charset';

	const metaViewPort = document.createElement('meta');
	metaViewPort.name = 'viewport';
	metaViewPort.content = 'width=device-width, initial-scale=1';

	document.title = "MarkdownQuantum Document";
	head.appendChild( metaCharSet );
	head.appendChild( metaViewPort );
}

renderBody = data => {
	const body = document.body;
	body.innerHTML = '<main id="main">'
		+ '<header>'
		+ '	<h1 class="title main-title">'
		+ '		MarkdownQuantum Document...'
		+ '	</h1>'
		+ '</header>'
		+ '<div class="container">'
		+ '<div class="chapter">'
		+ data
		+ '	</div>'
		+ '	</div>';
}

renderTitle = () => {
	const title = document.getElementsByTagName("h1")[1];
	if ( title !== void 0 )
	{
		title.remove();
		document.getElementsByTagName("h1")[0].innerHTML = title.innerHTML;
		if ( title.innerText !== void 0 && title.innerText )
		{
			document.title = title.innerText + " | MarkdownQuantum Document";
		}
	}
}
main();
