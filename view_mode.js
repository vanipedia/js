// We'll use the files that already exist in the compile app: no need to double and we can keep those in versioning system as well.
var resources = '/js/compile-2.0/resources/';
var jquery = '/js/jquery/';
var css = '/js/compile-2.0/stylesheets/';

document.write('<script type="text/javascript" src="'+resources+'jquery.min.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'BaltoUni.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'UniToASCII.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'jquery.highlight_sanskrit.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'highlight_terms.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+jquery+'highlight_terms_url2.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+jquery+'update_links2.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'RegExp.escape.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+jquery+'stats_submit.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'search_suggest.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+resources+'jquery-autocomplete/jquery.autocomplete.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+jquery+'stats_submit.js"></' + 'script>');
document.write('<link rel="stylesheet" type="text/css" href="'+css+'view_mode.css" />');
document.write('<link rel="stylesheet" type="text/css" href="'+css+'jquery.autocomplete.css" />');
