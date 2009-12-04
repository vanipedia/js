if(/^BG /.test(wgTitle) && /&diff=/.test(document.location)) {
    $(document).ready(function() {
        $('.verse_tools').hide();
        if(!/&htmldiff=0/.test(document.location)) {
            $('.diff').hide();
        }
    });
}
