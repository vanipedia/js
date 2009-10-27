/***********************************************************
 *      This script is a search suggest plug-in
 *      for Vaniquotes that will give Pages and Category
 *      suggestions to users
 ************************************************************/

$(document).ready(function() {
    var options_search = {
        minChars: 3,
        resultsClass: 'cat-page-suggest_results',
        max: 100,
        delay: 500,
        width: '45em',
        caheLength: 1,
        fixed: false,
        matchContains: true,
        extraParams: { namespace: 'all' }
    }
    $('#searchInput').autocomplete("/php/cat-page_search.php", options_search);
    // Test if we are in Special:Search
    if($('form#search #searchText').length === 1) {
        options_search['width'] = false;
        $('form#search #searchText').autocomplete("/php/cat-page_search.php", options_search);
    }
    if(wgPageName === "Special:AllPages") {
        var table = $('table.allpages');
        var ns = $('#namespace option:selected', table).val() //element selected for searching
        var options_allpages = {
            minChars: 3,
            resultsClass: 'cat-page-suggest_results',
            max: 45,
            delay: 500,
            caheLength: 1,
            fixed: false,
            matchContains: true,
            extraParams: { namespace: ns  }
        };
        if(ns === '0') {
            options['width'] = '45em';
        }
        $('#nsfrom', table).autocomplete("/php/cat-page_search.php", options);
   }
});