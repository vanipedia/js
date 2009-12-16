$(document).ready(function() {
    if(wgTitle == 'BG edition comparison') {
        $('.verse_tools').hide();
        if(!/&visual=0/.test(document.location)) {
            $("#devanagari, #text").css('white-space', 'normal');
        }
    }
});
