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
            if(text.match(/\)$/m)) {
                text = fix_numbers(text);
            }
            return text;
        },{
            type: 'textarea',
            onblur: 'submit'
        });
    });
    // Grab the submit action and do the ajax submit
    $('.submit').click(function() {
        $('#ajax > #msg').text('Fetching devanagari...')
        verse = clean_for_submit($(this).siblings('.verse').html());
        translate_diCrunch(verse, this);
    });
    $('.fix_numbers').click(function() {
        message('Fixing numbers...')
        orig = $(this).siblings('.indevr');
        deva = $(this).siblings('.converted');
        orig_a = orig.html().split(/<br\/?>/);
        deva_a = deva.html().split(/\n/);
        if(orig_a.length === deva_a.length) {
            $.each(orig_a, function(i, v) {
                if(v.match(/\)+$/m)) {
                    numbers = v.match(/( (?:\)\) \d+ \))*\))/)[1];
                    numbers = fix_numbers(numbers);
                    deva_a[i] += numbers;
                }
            });
            new_deva = deva_a.join('\n');
            if(deva.html() !== new_deva) {
                deva.html(new_deva);
                console.log(new_deva);
            }
        } else {
            alert("Original devanagari is not equal to converted!");
        }
    });
    // Create loading div for ajax and other messages. Make sure you place the message before the ajax call
    $('<div id="ajax"><span id="msg"></span><br/><img src="/css/indicator.gif"></img></div>').
        ajaxStart(function() { $(this).show(); }).
        ajaxStop(function() { $(this).fadeOut('slow'); }).
        appendTo('body');
    // Save
    $('.save').click(function() {
            $('#ajax > #msg').text('Saving...');
        $.get('/php/convert_devanagari_save.php', {
            id: $(this).siblings('.id').text(),
            deva: $(this).siblings('.converted').text()
        }, function(r) {
            message('Saved!');
        });
    })
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
function fix_numbers(n) {
    n = n.replace(/ \)\)( |$)/mg, ' ॥ ');
    n = n.replace(/ \)( |$)/mg, ' । ');
    n = n.replace(/0/g, '०');
    n = n.replace(/1/g, '१');
    n = n.replace(/2/g, '२');
    n = n.replace(/3/g, '३');
    n = n.replace(/4/g, '४');
    n = n.replace(/5/g, '५');
    n = n.replace(/6/g, '६');
    n = n.replace(/7/g, '७');
    n = n.replace(/8/g, '८');
    n = n.replace(/9/g, '९');
    return n;
}
function message(msg) {
    $('#ajax > #msg').text(msg).parent().show();
    setTimeout(function() { $('#ajax').fadeOut('slow') }, 1000);
}