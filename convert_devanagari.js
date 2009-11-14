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
    $('.verse, .sanskrit_uni').click(function () {
        $(this).editable(function(text) {
            if(text.match(/\)$/m)) {
                text = fix_numbers(text);
            }
            return text;
        },{
            type: 'textarea',
            onblur: 'submit',
            callback: function() { update_sanskrit(this); }
        });
    });
    // Grab the submit action and do the ajax submit
    $('.update_sanskrit').click(function() { update_sanskrit(this); });

    $('.fix_numbers').click(function() {
        message('Fixing numbers...')
        orig = $(this).siblings('.indevr');
        deva = $(this).siblings('.sanskrit_uni');
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
                //console.log(new_deva);
            }
        } else {
            alert("Original sanskrit is not equal to unicode sanskrit!");
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
            $(this).siblings('.status').addClass('saving');
        $.get('/php/convert_devanagari_save.php', {
            title: $(this).siblings('.id').text(),
            sanskrit_uni: $(this).siblings('.sanskrit_uni').text()
        }, function(r) {
            saved();
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
            $(elem).siblings('.sanskrit_uni').html(out);
        }
    );
}

function update_sanskrit(elem) {
    $('#ajax > #msg').text('Fetching devanagari...')
    verse = elem.className === 'verse' ? clean_for_submit($(elem).html()) : clean_for_submit($(elem).siblings('.verse').html());
    translate_diCrunch(verse, elem);
};
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
    setTimeout(function() { $('#ajax').fadeOut('slow') }, 800);
}
function saved(elem) {
    message('Saved!');
    disable($('.saving').parent());
}
function disable(elem) {
    $('.status', elem).removeClass('saving').text('saved');
    $(elem).css({ opacity: '0.5' });
    $(elem).children().attr('disabled', 'disabled');
}