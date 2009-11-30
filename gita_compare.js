
if(/^BG \d+\.\d+/.test(wgTitle) && /&diff=/.test(document.location)) {
    $(document).ready(function() {
        $('#diff_link').parent().hide();
        if(!/&htmldiff=0/.test(document.location)) {
            $('.diff').hide();
        }
    });
}

