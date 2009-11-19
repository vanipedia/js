/***********************************************************************************************************
 *  This Jquery code is used to give suggestions in the search box for words with diacritics.
 *  It uses jquery.autocomplete and all its dependencies to fetch suggestions from a php script in the server
 *  and show it in a suggest box as the visitor types.
 ***********************************************************************************************************/
if ($('#searchInput') || $('#google_search')) {
	var $jquery_auto = '/jquery/jquery-autocomplete/';
	document.write('<script type="text/javascript" src="'+ $jquery_auto+ 'jquery.autocomplete.pack.js"></' + 'script>');
	document.write('<script type="text/javascript" src="' +$jquery_auto+ 'lib/jquery.bgiframe.min.js"></' + 'script>');
	document.write('<script type="text/javascript" src="'+ $jquery_auto+'lib/jquery.dimensions.js"></' + 'script>');
	document.write('<script type="text/javascript" src="'+ $jquery_auto+ 'lib/jquery.ajaxQueue.js"></' + 'script>');
	document.write('<link rel="stylesheet" type="text/css" href="'+$jquery_auto+'jquery.autocomplete.css" />');

	$('document').ready(function () {
		$("#searchInput").autocomplete("/php_scripts/dictionary.php", {
			scroll: true,
		  autofill: false,
		  selectFirst: false,
		  maxItemsToShow: 10,
		  minChars: 2,
		  multiple: true,
		  multipleSeparator: ' '
		});
	});
}