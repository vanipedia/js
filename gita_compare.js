$(document).ready(function() {
    if(/^BG /.test(wgTitle)) {
        $("#text").css({ 'white-space': 'pre' });
        if(/&diff=/.test(document.location)) {
            $('.verse_tools').hide();
            if(!/&htmldiff=0/.test(document.location)) {
                $('.diff').hide();
            }
        }
    }
});
