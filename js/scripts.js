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
	let body = document.body;
	data = furiganaIt( markdown.toHTML( data, "Maruku" ) );

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
	console.log( data );

}

load = ( url, callBack ) => {
	let xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if ( xmlhttp.readyState === XMLHttpRequest.DONE )
		{
			if ( xmlhttp.status === 200 )
			{
				// console.log( xmlhttp.responseText );
				callBack( xmlhttp.responseText );
				// document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
			}
			else if ( xmlhttp.status === 400 )
			{
				alert( 'There was an error 400' );
			}
			else
			{
				alert( 'something else other than 200 was returned' );
			}
		}
	}
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}


main();
