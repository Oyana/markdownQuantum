// Encoding: UTF-8
// Released under MIT license
// Copyright (c) 2018 Golga

furiganaIt = text => {
	const patternRegex = /(((?:\{|\｛)[^\}\｝]+(?:\}|\｝)(?:\（|\()[^\}\｝]+(?:\）|\)))+)/g;
	const kanjiRegex = /(?:\{|\｛)([^\}\｝]+)(?:\}|\｝)(?:\（|\()([^\}\｝]+)(?:\）|\))/g;

	let match;
	while (match = patternRegex.exec(text))
	{
		const html = ["<ruby>"];
		const phrase = match[0];
		while (secondMatch = kanjiRegex.exec(phrase))
		{
			const kanji = secondMatch[1];
			const reading = secondMatch[2];
			html.push(kanji);
			html.push("<rt>");
			html.push(reading);
			html.push("</rt>");
		}
		html.push("</ruby>");
		text = match.input.replace(phrase, html.join(""));
	}
	return text;
}

load = ( url, callBack ) => {
	const xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if ( xmlhttp.readyState === XMLHttpRequest.DONE )
		{
			if ( xmlhttp.status === 200 )
			{
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
