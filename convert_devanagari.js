/*******************************************************************
 *      This javascript(jQuery) code belongs to
 *      convert_devanagari.php for managing the interface,
 *      submitting the data to monier dictionary and
 *      placing the translated (from Uni->Balaram->HK->Devanagari)
 *      verse back in the page for comparison with original
 *      Indevr code
 ******************************************************************/
$(document).ready(function() {
    // Make verse editable so the sanskrit editor (Matea)
    // can correct spacing and other stuff that may come up
    $('.verse, .converted').click(function () {
        $(this).editable(function(text) {
            text = text.replace(/ \)\)( |$)/g, ' ॥ ');
            text = text.replace(/ \)( |$)/g, ' । ');
            text = text.replace(/0/g, '०');
            text = text.replace(/1/g, '१');
            text = text.replace(/2/g, '२');
            text = text.replace(/3/g, '३');
            text = text.replace(/4/g, '४');
            text = text.replace(/5/g, '५');
            text = text.replace(/6/g, '६');
            text = text.replace(/7/g, '७');
            text = text.replace(/8/g, '८');
            text = text.replace(/9/g, '९');
            return text;
        },{
            type: 'textarea',
            onblur: 'submit'
        });
    });
    // Grab the submit action and do the ajax submit
    $('.submit').click(function() {
        verse = clean_for_submit($(this).siblings('.verse').html());
        translate_diCrunch(verse, this);
    });
    $('<div id="loading">Retrieving Devanagari...<br/><img src="/css/indicator.gif"></img></div>').
    ajaxStart(function() { $(this).show(); }).
    ajaxStop(function() { $(this).fadeOut(); }).
    appendTo('body');
});


// FUnction that submits the verse to diCrunch dictionary online with a GET ajax request

function translate_diCrunch(verse, elem) {
    $.get('/php/diCrunch-request.php',
        { key: verse },
        function(resp) {
            console.log(resp);
            out = $('#source', resp).val();
            $(elem).siblings('.converted').html(out);
        }
    );
}

function clean_for_submit(v) {
    v = v.replace(/-/g, '');
    v = v.replace(/ '/g, '');
    return v;
}