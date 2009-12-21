/***********************************************************************************************************
 *  This Jquery code is used to give suggestions in the search box for words with diacritics.
 *  It uses jquery.autocomplete and all its dependencies to fetch suggestions from a php script in the server
 *  and show it in a suggest box as the visitor types.
 ***********************************************************************************************************/
if ($('#searchInput')) {
    $(document).ready(function () {
        $("#searchInput").autocomplete("/php_scripts/dictionary.php", {
            scroll: true,
            autofill: false,
            selectFirst: false,
            maxItemsToShow: 10,
            minChars: 2,
            multiple: true,
            multipleSeparator: ' '
        });
    });
}
