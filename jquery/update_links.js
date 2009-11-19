/******************************************************
 *  This script updates the links onclick by appending
 *  the terminologies on the top of the page
 ******************************************************/  
if (wgAction == 'view' && wgCanonicalNamespace == '') {
  $(document).ready(function() {
    //Update links pointing to vanisource with terms found in spans with class="terms"
    //get terms from <span class="terms" and sanitize them
    var terms = "";
    if ($('span.terms').length) {
      $('span.terms').each(function () {
        var text = $(this).text().replace(/"/g, "");
        text = text.replace(/(\w+) {2,}(\w+)/g, "$1 $2");
        text = text.replace(/^\ +/, "");
        text = text.replace(/\ +$/, ""); 
        terms += text+'+';
      });
    } else { terms = wgTitle; }
    //search in the body for any anchor <a with a attribute href pointing to Vanisource
    //and append the terms to be passed to Vanisource for highlighting
    //Define function to append terms
    append_terms = function() {
      var class_this = $(this).attr('class');
      //alert(class_this);
      //Check if class has been already defined with this same routine (if we have been here), the terms have already been appended
      if(class_this != 'selected'){
        var search_str1 = this.href+'?terms='+terms;
        $(this).attr({href: search_str1, class: 'selected'});
      }
    }
    //Now bind it onclick
    $('#bodyContent a[@href*="vanisource.org"]').not( $('#bodyContent a[@href*="edit"]') ).click(append_terms);
  });
}