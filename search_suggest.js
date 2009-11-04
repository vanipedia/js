
/***********************************************************
 *      This script is a search suggest plug-in
 *      for Vaniquotes that will give Pages and Category
 *      suggestions to users
 ************************************************************/

$(document).ready(function() {
    $('#searchInput').autocomplete("/php/cat-page_search.php", {
        minChars: 3,
        resultsClass: 'cat-page-suggest_results',
        max: 100,
        delay: 500,
        caheLength: 1,
        fixed: false,
        width: '45em',
        matchContains: true,
        selectFirst: false,
        extraParams: { namespace: 'all' }
    });
    if(wgPageName === "Special:AllPages") {
        var table = $('table.allpages');
        var ns = $('#namespace option:selected', table).val() //element selected for searching
        var options = {
            minChars: 3,
            resultsClass: 'cat-page-suggest_results',
            max: 45,
            delay: 500,
            caheLength: 1,
            fixed: false,
            matchContains: true,
            selectFirst: false,
            extraParams: { namespace: ns  }
        };
        if(ns === '0') {
            options['width'] = '45em';
        }
        $('#nsfrom', table).autocomplete("/php/cat-page_search.php", options);
   }
});
