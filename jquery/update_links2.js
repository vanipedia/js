/******************************************************
 *  This jQuery script updates the links onclick by appending
 *  the terminologies inside the clicked quote and
 *  first 100chars of the quote with its length.
 *  With this system we don't have to pass the whole
 *  quote to the receiving script on the Vanisource page
 *  but just enough to find it and highlight it
 ******************************************************/  
if (wgAction == 'view' && wgCanonicalNamespace == '') {
  $(document).ready(function() {
    //Define function to append terms
    append_terms = function() {
      var class_this, terms_array, parent_h, h_terms, terms, quote_h, quote, len, type, search_str, first, last;
      class_this = $(this).attr('class');
      //Check if class has been already defined with this same routine (if we have been here), the data has already been appended
      if(class_this != 'selected'){
        // We'll use this until we move to the new xml or classed system
        //var parent_h    = $(this).parent().parent();
        terms  = [];
        parent_h = $(this).parents('.quote').children('.text');
        parent_h.each(function() {
            h_terms = $(this).find('.highlight_terms');
            if(h_terms.length > 0) {
                quote_h = $.trim($(this).text());
                h_terms.each(function() {
                    terms.push($(this).text());
                });
                // exit the loop
                return false;
            }
        });
        if(quote_h !== undefined) {
            // Take the first 10 words of the quote
            first = quote_h.split(' ').slice(0,10).join(' ');
            // Check for newlines or p in quote
            first = first.replace(/(.+?)\n+.+/, '$1');
            last = quote_h.split(' ').slice(-10).join(' ');
            last = last.replace(/.+\n+(.+)/, '$1');
            // Assemble the string with the terms, the head of the quote and the quote's length and type (div for multiple paragraph)
            search_str = this.href+'?terms='+terms.join('+')+'&first='+first+'&last='+last;
            $(this).attr({href: search_str, class: 'selected'});
        }
      }
    }
    //Now bind it onclick
    $('#bodyContent a').not( $('#bodyContent a[href*="edit"]') ).click(append_terms);
  });
}