/**************************************************************************
 *  jQuery function to parse url_terms from url when current page was linked from Vaniquotes
 *  The vaniquotes link was modified to include these url_terms in order to
 *  highlight them in the current page in Vanisource
 **************************************************************************/

//First check if the current page is an Article and is in view mode
if (wgIsArticle && location.search && wgAction == "view") {
  if (/terms/.test(this.location.search)) {
    var $jquery_dir = '/jquery/';
    document.write('<script type="text/javascript" src="'+$jquery_dir+'jquery.highlight_sanskrit.js"></' + 'script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'jquery.getParams.js"></script>');

    $(document).ready(function() {
      // Get params in url
        var terms, first, last, re_first, re_last, found, p, area, w, t, h, diff, off;
        terms = decode('terms').split('+');
        first = decode('first');
        last  = decode('last');
        re_first = new RegExp(RegExp.escape(first), 'i');
        re_last = new RegExp(RegExp.escape(last), 'i');
        found = false;
        p = $('#bodyContent p');
        p.each(function(i, v) {
            // if first is not found yet
            if(!found) {
                // if first not found on this p continue (iterate), else set found to true
                if(!re_first.test($(this).text())) {
                    return true;
                } else {
                    found = true;
                }
            }
            // If we made it this far that means that either this is the first p with the quote or a subsequent
            $(this).addClass('highlight_quote');
            // if the last part of the quote is in this p, break the iteration
            if(re_last.test($(this).text())) { return false; }
            // if this is the last iteration through the objects (p dom elements in bodyContent) and still not found the end of the quote,
            // remove the highlighting. This is a failsafe in case we cannot match the begin(first) AND end(last) of the original quote.
            if(i === p.length - 1 && !re_last.test($(this).text())) { $('.highlight_quote').removeClass('highlight_quote'); }
        });

        // Set the area to highlight terms, if there is a highlight_quote then search within else just highlight anywhere
        area = $('.highlight_quote').length > 0 ? $('.highlight_quote') : $('#bodyContent p');
        // Iterate through the terms and highlight them
        $.each(terms, function(i, val) {
            area.highlight_sanskrit(val);
        });

        // Find offset to scrollTo
        w = window.innerHeight;
        t = $('.highlight_quote').length > 0 ? $('.highlight_quote') : $('.highlight_terms');
        h = t.height();
        diff = w - h;
        off = diff <= 0 ? -50 : -diff / 2;
        // Scroll to first p.highlight_quote or .highlight_terms
        $.scrollTo(t, '1500', {offset: off});

        function decode(param) {
            return decodeURI($.getURLParam(param));
        }
    });
  }
}
