$(function(){
	const curentUrl = window.location.href;

	if ( curentUrl.indexOf("file://") === -1 )
	{
		/*Ajax hack to pache encoding without bom*/
		$.get( curentUrl, render );
	}
	else
	{
		render(  $("body pre").html() );
	}
});

render = data => {
	const $head = $("head");
	const $body = $("body");
	data = furiganaIt( markdown.toHTML( data, "Maruku" ) );

	$head.html('<meta charset="UTF-8">'
		+ '<meta name="viewport" content="width=device-width, initial-scale=1">'
		+ '<link rel="profile" href="http://gmpg.org/xfn/11">'
		+ '<title> MarkdownQuantum Document </title>');
		$body.html( '<main id="main">'
		+ '<header>'
		+ '	<h1 class="title main-title">'
		+ '		MarkdownQuantum Document...'
		+ '	</h1>'
		+ '</header>'
		+ '<div class="container">'
		+ '<div class="chapter">'
		+ data
		+ '	</div>'
		+ '	</div>'
	);

	/*Set main title in fixed header*/
	const title = $body.find("h1")[1];
	if ( title != void 0 )
	{
		$body.find(".main-title").html( title.innerHTML );
		title.remove();
	}
}
