var patternRegex = /(((?:\{|\｛)[^\}\｝]+(?:\}|\｝)(?:\（|\()[^\}\｝]+(?:\）|\)))+)/g;
var kanjiRegex = /(?:\{|\｛)([^\}\｝]+)(?:\}|\｝)(?:\（|\()([^\}\｝]+)(?:\）|\))/g;

function furiganaIt(text){
	var match;
	while (match = patternRegex.exec(text))
	{
		var html = ["<ruby>"];
		var phrase = match[0];
		while (secondMatch = kanjiRegex.exec(phrase))
		{
			var kanji = secondMatch[1];
			var reading = secondMatch[2];
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
