/*******************************************************************
 *      This javascript(jQuery) code belongs to
 *      convert_devanagari.php for managing the interface,
 *      submitting the data to monier dictionary and
 *      placing the translated (from Uni->Balaram->HK->Devanagari)
 *      verse back in the page for comparison with original
 *      Indevr code
 ******************************************************************/
/*** Dependencies ***/
// No dependendencies in the production version of this script
/*** Main ***/
$(document).ready(function() {
    // Make verse editable so the sanskrit editor (Matea)
    // can correct spacing and other stuff that may come up
    $('.verse_div').one("mouseenter", function () {
        $('.verse, .sanskrit_uni', this).editable(function(text) {
            if(text.match(/\)$/m)) {
                text = fix_numbers(text);
            }
            return text;
        },{
            type: 'textarea',
            onblur: 'submit',
            placeholder: '',
            callback: function() {
                if(this.className === 'verse') { update_sanskrit(this); }
            }
        });
    });
    // Grab the submit action and do the ajax submit
    $('.update_sanskrit').click(function() { update_sanskrit(this); });

    $('.fix_numbers').click(function() {
        var orig, deva, orig_a, deva_a, numbers, new_deva;
        message('Fixing numbers...')
        orig = $(this).siblings('.indevr');
        deva = $(this).siblings('.sanskrit_uni');
        if(deva.html() === '') {
            alert('Missing Unicode Sanskrit. Click Get Devanagari');
            return;
        }
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

    // Tools for zoom and ajax messages
    var tools = ''+
    '<div id="tools">'+
        '<div id="ajax">'+
            '<span id="msg"></span><br/>'+
            '<img src="/css/indicator.gif"></img>'+
        '</div>'+
        '<div id="zoom_all" title="Turn automatic zoom on/off">Zoom</div>'+
        '<div id="zoom">'+
            '<div id="zoom_minus" class="zoom_b" title="zoom in">-</div>'+
            '<div id="zoom_plus" class="zoom_b" title="zoom out">+</div>'+
        '</div>'
    '</div>';
    $(tools).appendTo('#bodyContent');
    // Tools toggle
    $('#tools_toggle').toggle(function() {
        $('#tools').fadeIn();
    }, function() {
        $('#tools').fadeOut();
    });
    // Hook the ajax element to notify ajax activity
    $('#ajax').
        ajaxStart(function() { if($('#tools').is(':visible')) ajax_ui('show'); }).
        ajaxStop(function() { if($('#tools').is(':visible')) ajax_ui('hide'); });

    // Save
    $('.save').click(function() {
        if(!check_before_save(this)) { return; }
        $('#ajax > #msg').text('Saving...');
        $(this).siblings('.status').addClass('saving');
        $.get('/php/convert_devanagari_save.php', {
            title: $(this).siblings('.id').text(),
            sanskrit_uni: $(this).siblings('.sanskrit_uni').text()
        }, function(r) {
            saved();
        });
    });

    // Zoom (auto) button
    $('#zoom_all').toggle(function() {
        var h;
        $(this).text('Zoom Off').css({ color: 'white', opacity: '' });
        $('.verse_div').css({ "font-size": '', "line-height": '', width: '' });
        // test hoverintent  for Zoom
        /*$('.verse_div').hoverIntent({
            sensitivity: 7, // number = sensitivity threshold (must be 1 or higher)
            interval: 100,   // number = milliseconds of polling interval
            over: enter_verse,  // function = onMouseOver callback (required)
            timeout: 0,   // number = milliseconds delay before onMouseOut function call
            out: out_verse    // function = onMouseOut callback (required)
        });*/
        // test standard mouseenter and leave with a setTimeout check
        $('.verse_div').bind("mouseenter", enter_verse).bind("mouseleave", out_verse);
    }, function() { // Toggle off Zoom (auto)
        $(this).text('Zoom On').css({ color: '', opacity: '0.7' });
        $('.verse_div').unbind("mouseenter", enter_verse).unbind("mouseleave", out_verse);
    });

    // Zoom in and out buttons
    $('.zoom_b').mousedown(function() {
        $(this).css('color', 'white');
    }).mouseup(function() {
        zoom_off();
        $(this).css('color', '');
        $(this).attr('id') === 'zoom_plus' ? zoom('in') : zoom('out');
    });

    // More verses will display the next batch of verses simply by doing a full refresh
    $('#more').click(function() { window.location.reload( true ); });

    // Attach Introduction and Manual effects
    $('.desc_handle').toggle(function() {
        var desc;
        desc = '#'+$(this).attr('id')+ '_desc';
        $(desc).slideDown();
    }, function() {
        desc = '#'+$(this).attr('id')+ '_desc';
        $(desc).slideUp();
    });
}); // End of Main


/*** Helper functions for events and processing verses ***/
// FUnction that submits the verse to diCrunch dictionary online with a GET ajax request
function translate_diCrunch(verse, elem) {
    var out;
    $.get('/php/diCrunch-request.php',
        { key: verse },
        function(resp) {
            //console.log(resp);
            out = $('#source', resp).val();
            $(elem).siblings('.sanskrit_uni').html(out);
        }
    );
}

function update_sanskrit(elem) {
    var verse;
    $('#ajax > #msg').text('Fetching devanagari...')
    verse = elem.className === 'verse' ?
        clean_for_submit($(elem).html()) :
        clean_for_submit($(elem).siblings('.verse').html());
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
    if($('#tools').is(':hidden')) { return; }
    $('#ajax > #msg').text(msg);
    ajax_ui('show');
    setTimeout(function() { ajax_ui('hide'); }, 800);
}
function saved(elem) {
    disable($('.saving').parent());
}
function disable(elem) {
    $('.status', elem).removeClass('saving').text('saved');
    $(elem).css({ opacity: '0.5' });
    $(elem).children().attr('disabled', 'disabled');
}
function check_before_save(elem) {
    var sanskrit;
    sanskrit = $(elem).siblings('.sanskrit_uni');
    if(sanskrit.html() === '') {
        alert('Missing Unicode Sanskrit. Click Get Devanagari');
        return false;
    }
    if(!/ ।/.test(sanskrit.html())) {
        alert('Missing numbers in Unicode Sanskrit. Click Fix Numbers to get numbers.');
        return false;
    }
    return true;
}
function ajax_ui(action) {
    action === 'show' ? $('#ajax').slideDown() : $('#ajax').slideUp('slow');
}
function zoom(action) {
    var v, fs, lh, w;
    v = $('.verse_div:last');
    fs = Number(v.css('font-size').match(/\d+/));
    lh = Number(v.css('line-height').match(/\d+/));
    w = Number(v.css('width').match(/\d+/));
    if(action === 'in') {
        $('.verse_div').css({
            "font-size": fs + 2 + 'px',
            "line-height": lh + 6 + 'px',
            width: w + 50 + 'px'
        });
    } else {
        $('.verse_div').css({
            "font-size": fs - 2 + 'px',
            "line-height": lh - 6 + 'px' ,
            width: w - 50 + 'px'
        });
    }
}
function zoom_off() {
    if($('#zoom_all').text().match(/off/i)) {
        $('#zoom_all').click();
    }
}
// hover functions for verse_divs.
// a timeout is set to avoid erratic hover in and out of verse while
// scrolling over child elements
function enter_verse() {
    var that = this;
    $(this).addClass("focused").removeClass("unfocused");
    setTimeout(function() {
        if($(that).hasClass("focused")) {
            $(that).css({
                "font-size": "1.2em",
                "line-height": "1.5"
            });
            $(that).animate({ width: "600px" });
        }
    }, 300);
}
function out_verse() {
    var that = this;
    $(this).addClass("unfocused").removeClass("focused");
    setTimeout(function() {
        if($(that).hasClass("unfocused")) {
            $(that).removeClass("unfocused");
            $(that).css({
                "font-size": "",
                "line-height": ""
            });
            $(that).animate({ width: "500px"});
        }
    }, 800);
}
