$(function(){
	$("head").html('<meta charset="UTF-8">'
		+ '<meta name="viewport" content="width=device-width, initial-scale=1">'
		+ '<link rel="profile" href="http://gmpg.org/xfn/11">'
		+ '<title> MarkdownQuantum Document </title>');
	$.get( window.location.href , function( data ) {
		data = furiganaIt( markdown.toHTML( data, "Maruku" ) );
		$("body").html( '<main id="main">'
		+ '<header>'
		+ '	<h1>'
		+ '		日本語 USJ1'
		+ '	</h1>'
		+ '</header>'
		+ '<div class="container">'
		+ '<div class="chapter">'
		+ data
		+ '	</div>'
		+ '	</div>' );
	});

});
