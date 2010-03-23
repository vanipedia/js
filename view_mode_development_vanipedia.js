// We'll use the files that already exist in the compile app: no need to double and we can keep those in versioning system as well.
var resources = '/js/compile-2.0/resources/';
var jquery = '/js/jquery/';
var css = '/css/';
var js = '/js/';

document.write('<script type="text/javascript" src="'+jquery+'jquery.min.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+js+'stats_submit.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+jquery+'jquery.countdown.pack.js"></' + 'script>');
document.write('<script type="text/javascript" src="'+js+'countdown_to_birthday.js"></' + 'script>');
