// We'll use the files that already exist in the compile app: no need to double and we can keep those in versioning system as well.
var resources = '/js/compile-2.0/resources/';
var jquery = '/js/jquery/';
var css = '/css/';
var js = '/js/';

document.write('<script type="text/javascript" src="'+resources+'jquery.min.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'BaltoUni.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'UniToASCII.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'jquery.highlight_sanskrit.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'highlight_terms.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+js+'highlight_terms_url2.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+js+'update_links2.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+js+'RegExp.escape.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+js+'stats_submit.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+js+'search_suggest.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+js+'manual.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+js+'fix_create_link.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'jquery-autocomplete/jquery.autocomplete.js"></' + 'script>');
document.write('<link rel="stylesheet" type="text/css" href="'+css+'view_mode.css" />');
document.write('<link rel="stylesheet" type="text/css" href="'+css+'jquery.autocomplete.css" />');
