/**************************************************************************
 *  jQuery function to parse url_terms from url when current page was linked from Vaniquotes
 *  The vaniquotes link was modified to include these url_terms in order to
 *  highlight them in the current page in Vanisource
 **************************************************************************/  

//First check if the current page is an Article
if (wgIsArticle && location.search && wgAction == "view") {
  if (/terms/.test(this.location.search)) {
    var $jquery_dir = '/jquery/';
    document.write('<script type="text/javascript" src="'+$jquery_dir+'jquery.highlight_sanskrit.js"></' + 'script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'jquery.getParams.js"></script>');
    $(document).ready(function() {
      var url_string = $.getURLParam('terms');
      var url_terms = decodeURI(url_string).split('+');
      if (url_terms.length > 0 ) {
        for (var i = 0, len = url_terms.length; i < len; ++i) {
          //sanitize text for search
          if (url_terms[i] != "") {
            $('#bodyContent').highlight_sanskrit(url_terms[i]);
          }
        }
      }
      $.scrollTo('span.highlight_terms', '1500', {offset:-100});
    });
  }
}