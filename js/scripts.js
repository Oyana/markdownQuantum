// Encoding: UTF-8
// Released under MIT license
// Copyright (c) 2018 Golga

main = () => {
	const curentUrl = window.location.href;
	if ( curentUrl.indexOf("file://") === -1 )
	{
		/*Ajax hack to pache encoding without bom*/
		load( curentUrl, render );
	}
	else
	{
		render( document.getElementsByTagName("pre")[0].innerHTML );
	}
}

render = data => {
	data = furiganaIt( markdown.toHTML( data, "Maruku" ) );
	renderHead( data );
	renderBody( data );
}

renderHead = data => {
	const head = document.head;

	const metaCharSet = document.createElement('meta');
	metaCharSet.charset = 'UTF-8';
	metaCharSet.attributeName = 'charset';
	document.defaultCharset = 'UTF-8';

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

main();
