/*************************************************************
 *  Compilation form for vaniquotes
*************************************************************/
// Vars
$php_dir = '/php/';
$img_dir = '/images/';
$jquery_dir = '/jquery/';

if (wgAction == 'edit' && wgCanonicalNamespace == '' && wgUserName != null && !/section=\d+/.test(this.location.search)) {

    /******** Dependencies **********/
    document.write('<script type="text/javascript" src="'+$jquery_dir+'j-corner.js"></script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'tooltip/jquery.tooltip.js"></' + 'script>');
    document.write('<link rel="stylesheet" type="text/css" href="'+$jquery_dir+'tooltip/jquery.tooltip.css" />');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'sections2.js"></' + 'script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'jquery-treeview/jquery.treeview.pack.js"></' + 'script>');
    document.write('<link rel="stylesheet" type="text/css" href="'+$jquery_dir+'jquery-treeview/jquery.treeview.css" />');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'jquery-impromptu.1.5.js"></' + 'script>');
    document.write('<link rel="stylesheet" type="text/css" href="'+$jquery_dir+'jquery-impromptu.css" />');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'jquery.blockUI.js"></' + 'script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'scrollTo.js"></' + 'script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'jquery.clipboard/jquery.clipboard.js"></' + 'script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'factsbox_form.js"></' + 'script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'jquery.jeditable.js"></' + 'script>');

    /****** On document ready *******/
    $('document').ready(function () {

        /***************    Objects creation/insertion section     ***************/

            compiling = 0;
            $('#ca-compile').toggle(function() {
                compiling = 1;
                factsbox();
                $('#form_div').slideDown('medium');
                $('#ca-edit').removeClass('selected');
                $(this).addClass('selected');
            }, function() {
                compiling = 0;
                disable_factsbox();
                $('#form_div').slideUp('medium');
                $('#ca-edit').addClass('selected');
                $(this).removeClass('selected');

            });

            /****   Create form and insert it. Hide until Compile button is clicked.    ****/
           $('<div id="form_div">'
                + '<table id="compile_form"><tr><td></td><td><span id="orig_ref" class="form_elem"></span></td></tr>'
                + '<tr><td><span id="title_title" class="form_title"> Reference: </span></td>'
                    + '<td><input type="text" class="form_elem" id="title" title="2. If no match was found, type some keywords to find the exact reference. (Tip: read the Reference on top of this box)" size="90" value="" /></td></tr>'
                + '<tr><td><span id="section_title" class="form_title"> Translation or Purport<br><span style="font-size: small;">(Use for BG, SB, CC, ISO, NOI): </span></span></td>'
                    + '<td><select class="form_elem" id="section">'
                        + '<option class="sel_elem" id="0">Choose a Section</option>'
                        + '<option class="sel_elem" id="Translation">Translation</option>'
                        + '<option class="sel_elem" id="Purport">Purport</option>'
                        + '<option class="sel_elem" id="Translation and Purport">Translation and Purport</option>'
                    + '</select> </td></tr>'
                + '<tr><td><span id="heading_title" class="form_title"> Heading(optional): </span></td>'
                    + '<td><input type="text" class="form_elem" id="heading" title="Make title by highlightning a portion of the quote in the box below. If you wish to change it just click on the current one and change your selection." size="90" /></td></tr>'
                + '<tr id="tr_quote"><td><span id="quote_title" class="form_title">Quote: </span></td>'
                    + '<td><textarea class="form_elem" id="quote" title="1. Please paste the quote from the Vedabase here including Ref. code. If you wish to have a heading for this quote, highlight it here." cols=20 rows=5 ></textarea></td></tr></table>'
                    + '<input id="clear_form" class="form_elem" type="button" value="Clear form" title="Help buttons. Clear the compile form." />'
                    + '<input id="turn-off_tips" class="form_elem" type="button" value="Turn-off tips" title="Help buttons. Turn-on(off) these tips." />'
              //+ '</form>'
            + '</div>').insertBefore('#toolbar').hide();
            /****************  Buttons   **************/
            $('<div   id="btn_bk"></div>').insertAfter('div#form_div > :last');
            $('<div   id="float_div" ></div>').insertAfter('div#form_div > :last');
            $('<input id="insert" class="form_elem" title="3. Click to build your quote - It will be inserted at the bottom of the page or to a section you have clicked in the edit box" type="button" value="Insert Quote" />').appendTo('#float_div');
            $('<div   id="insert_ref_bg"></div>').insertAfter('#float_div :last').hide();
            $('<div   id="insert_ref" ><span id="insert_ref_span"></span></div>').insertAfter('#float_div > :last').hide();
            //  Insert button. It will appear after quote has been built
            $('<img   id="arrow_up"  class="arrows" src="'+$img_dir+'arrowup3.png" title="Click to navigate up to compile form" >').insertAfter('#float_div > :last');
            $('<img   id="arrow_down"  class="arrows" src="'+$img_dir+'arrowdown3.png" title="Click to navigate down to edit box. Then click on Insert button." >').insertAfter('#float_div > :last');

            /**** Tips section ****/
            // Make Step tips
            $('<div   id="step1" class="steps"><span class="help">Step 1: Paste quote here</span></div>').css({ position: "absolute", left: "589px", top: "200px" }).insertAfter('div#form_div > :last');
            $('<div   id="step2" class="steps"><span class="help">Step 2: Verify Title</span></div>').css({ position: "absolute", right: "0px", top: "28px" }).insertAfter('div#form_div > :last');
            $('<div   id="step3" class="steps"><span class="help">Step 3: Insert to Vaniquotes</span></div>').css({ position: "fixed", left: "67%", top: "118px" }).insertAfter('div#form_div > :last');

            /****  Warning box  ****/
            $('<div  id="warning"><span id="warn_text"></span></div>').insertAfter('#float_div :last').hide();

            /***************   Css   *******************/
            //Css for form elems
            $('#form_div').css({"background-color": "CornflowerBlue", "margin-bottom": "12px"}).corner();
            $('table#compile_form').css({ width: "100%", height: "346px", top: "7px", "border-right": "thin inset", "background-color": "CornflowerBlue", "border-color": "CornflowerBlue" });
            $('#compile_form tr td').css({ padding: "0px 5px 0px 10px" });
            $('#compile_form tr td:even').each(function() {
                $(this).css({width: "200px", color: "Navy"});
            });
            $('#compile_form input[type="text"]').css({width: "95%"});
            $('#compile_form tr td textarea').css({ width: "85%"});
            $('.form_title').css(     { "font-size": "12pt"});
            $('#orig_ref').css(       { left: "10px", top: "0px", "font-family": "Tahoma, sans-serif", "font-size": "small", padding: "5px"});
            $('input[type="button"]').css({ "background-color": "#6161C4", "border-color": "CadetBlue", color: "black", "font-family": "arial, verdana, ms sans serif", "font-weight": "bold", "font-size": "10pt", "text-align": "right", padding: "5px", margin: "2px", cursor: "pointer" });
            $('#clear_form').css(     { left: "8px", top: "312px" });
            $('#turn-off_tips').css(  { left: "100px", top: "312px" });
            $('#compile_form #title, #heading, #section, #quote').css({ "background-color": "Gainsboro", border: "3px solid #cccccc", padding: "5px", "font-family": "Tahoma, sans-serif" });
            $('#compile_form #section').css({ width: "170px"});
            // css for floating buttons
            $('#float_div, #btn_bk').css(   { left: "85%", top: "166px", width: "128px", height: "100px" , "z-index": "2" });
            $('#float_div').css(    { position: "fixed", background: "transparent", "text-align": "center" });
            $('#btn_bk').css(       { "background-color": "black", opacity:".35" }).corner();
            $('#btn_bk').css(       { position: "fixed", top: "166px" }); // Set the position after assign the corner otherwise it doesn't corner() correctly
            var insert_color = '#59b561';
            $('#insert').css(       { position: "relative", left: "0px", top: "28px", margin: "5px", "background-color": insert_color, "border-color": insert_color, color: "black"});
            $('#arrow_up').css(     { top: "-8px"});
            $('#arrow_down').css(   { top: "70px"});
            $('.arrows').css(       { position: "absolute", left: "48px", opacity: ".85", cursor: "pointer"});
            $('#insert_ref_bg').css({ "background-color": "Black", opacity:".35" }).corner();
            doc_w = document.width;
            if (doc_w > 1024) {
                ref_font_s = 20 +'px';
            } else {
                ref_font_s = 18 +'px';
            }
            $('#insert_ref').css(   { color: "Cornsilk", "text-align": "center", "font-size": ref_font_s });
            $('#insert_ref_bg, #insert_ref').css({ position: "fixed", top: "0px", width: "276px", height: "25px"});
            $('#warning').css(      { top: "45%", left: "256px", "text-align": "center", background: "red", width:"800px", height: "35px" });
            $('#warning').corner().css({ position: "fixed" });
            $('span#warn_text').css({ "color": "snow", "font-family": "Tahoma, sans-serif", "font-size": "x-large" });
            // Css for text inside tooltips
            $('div.steps').css(     { position: "absolute", color: "violet", background: "transparent url("+$img_dir+"tooltip1.png)", "background-repeat": "no-repeat", width:"263px", height:"58px", opacity: "0.75" });
            $('#step3').css(        { position: "fixed", background: "transparent url("+$img_dir+"tooltip2.png)", "background-repeat": "no-repeat", width:"240px", height:"74px" })
            $('span.help').css(     { position: "relative", top:"18px", left:"40px", "font-family": "Tahoma, sans-serif", "font-size": "large"});
            $('#step3 span').css(   { position: "relative", top:"34px", left:"8px", "font-family": "Tahoma, sans-serif", "font-size": "large"});

            /****************** Events Section  **********************/


            // Clear text in orig_ref
            $('#clear_form').click(function() {
                clear_form();
            });
            $('.form_elem').not('[type="button"]').focus(function() {
                orig_bgcolor = $(this).css('background-color');
                $(this).css('background-color', 'snow');
            }).blur(function() {
                $(this).css('background-color', orig_bgcolor);
            });
            // Arrows scrollTo
            $('#arrow_up').click(function() {
                $.scrollTo('#form_div', 1000);
                $('#insert_ref').fadeOut('slow');
                $('#insert_ref_bg').fadeOut('slow');
            });
            $('#arrow_down').click(function() {
                insert_ref_show($('#title').val());
                find_section( $('#title').val() );
                $.scrollTo('#wpTextbox1', 1000, {offset:-35} );
            });

            // activate tooltip in form elements
            $('#title, #heading, #quote, #insert, #clear_form, #turn-off_tips, .arrows').tooltip({
                track: true,
                delay: 10,
                showURL: false,
                opacity: 1,
                fixPNG: true,
                showBody: " - ",
                extraClass: "pretty fancy",
                top: -15,
                left: 5
            });
            /**** Turn off/on tips  ****/
            tips = 1;
            $('#turn-off_tips').toggle(function() {
                    if(tips) {
                        $(this).val('Turn-on tips');
                        tips = 0;
                        $('.steps').not(':hidden').fadeOut('slow');
                    }
            },function() {
                    if (!tips) {
                        $(this).val('Turn-off tips');
                        tips = 1;
                    }
            });
            $('#turn-off_tips').click($.tooltip.block);
            $('#turn-off_tips').click();


            //****  Function to make tooltips appear and check if values are not empty   ****/
            inputs = new Array(['quote', 1], ['title', 1]);
            last_title = ''
            $('#form_div').mouseover(function() {
                if (tips) {
                    for ( i = 0, j = 1; i < inputs.length; i++, j++) {
                        $('#'+inputs[i][0]).val() == '' ? inputs[i][1] = 1: inputs[i][1] = 0;

                        if (inputs[i][1]) {
                            $('#step'+j).not(':visible').fadeIn('slow');
                            $('.steps').not('#step'+j).fadeOut('slow');
                            break;
                        } else {
                            $('#step'+j).not(':hidden').fadeOut('slow');
                            if (inputs[i][0] == 'title') {
                                $('#step3').not(':visible').fadeIn('slow');
                                if ( last_title != $('#title').val()) {
                                    last_title = $('#title').val();
                                    $('#step3').not(':hidden').fadeOut('slow');
                                }
                            }
                        }
                    }
                }
            });

            /*** Update quote and submit ref to #title element and build Heading if compiler highlighted text in the #quote  ****/
            $('#quote').mouseout(function() {
                // Grab hightlighted text in quote to build heading
                if ( $('#heading').val() == '') {
                    if (document.selection) { // for IE
                        header = document.selection.createRange().text;
                        $('#heading').val(header);
                    } else if (typeof this.selectionStart != 'undefined') { // for FF, Opera etc...
                        header = this.value.substring(this.selectionStart, this.selectionEnd);
                        $('#heading').val(header);
                    }
                }
                // process the quote
                quote = this.value;
                re = new RegExp(">>> Ref. VedaBase => (.+)");
                clean_q = quote.replace(re,'');
                clean_q = clean_q.replace(/^\s+/, '');
                clean_q = clean_q.replace(/\s+$/, '');
                if (re.exec(quote)) {
                    ref = re.exec(quote);
                    var book_ref = '';
                    book_ref = ref[1].replace(/\s+$/,'');  // Clean extra trailing space
                    book_ref = book_ref.replace(/–/, '-'); // Found in multitext in CC
                    book_ref = Unify(book_ref);
                    book_ref = UniToASCII(book_ref);
                    // If ref is multiple verse eg SB 7.3.9-10 or Bg 5.27-28
                    if (/^(SB|Bg).+?,/.exec(book_ref) ) {
                      comma_match = /.+, (.+?)$/.exec(book_ref);
                      book_ref = comma_match[1];
                    }
                    // Reset insert button to orig state.
                    $('#insert').css({"background-color": insert_color, "border-color": insert_color}).val('Insert quote');
                    // Initiate ajaxStart function to notify ajax queries are in progress
                    var searching = true;
                    $(document).ajaxStart(function() {
                        if (searching) {
                            $('#orig_ref').html('<span style="font-size:medium;font-style:italic;">Searching... </span><img src="'+$img_dir+'indicator.gif"></img>').css({ "background-color": "yellow" }).fadeIn('slow');
                        }
                    });
                    // Make request to vaniref to find exact match
                    $.get($php_dir+"vaniref.php",
                          { q: book_ref },
                          function(resp) {
                            searching = false;
                            if(resp != 0 && !/error in your SQL syntax/i.test(resp)) {
                                if (/Error connecting to mysql/i.test(resp)) {
                                    var err = '';
                                    err = 'Error connecting to database!';
                                    $('#title').val(err);
                                    $('#orig_ref').text(err).css({ "background-color": "red" });
                                    ref_width = $('#orig_ref').text().length * 7.5 +'px';
                                    $('#orig_ref').css({ width: ref_width });
                                } else {
                                    // If successfull response
                                    $('#title').val(resp);
                                    // Change ref in floating window
                                    insert_ref_show(resp);
                                    $('#orig_ref').text('Match found for ref. '+book_ref+'. Please confirm it is the reference you are looking for.').css({ "background-color": "#81FF5B", overflow: "visible" });
                                    ref_width = $('#orig_ref').text().length * 7.5 +'px';
                                    $('#orig_ref').css({ width: ref_width });
                                }
                            } else {
                                // If resp was 0
                                $('#orig_ref').text('No match was found for ref. '+book_ref+' ... Please type it.').css({ "background-color": "red" });
                                $('#title').val("Type any keyword to find the Reference").one("click", function () {
                                    this.value = '';
                                }).blur(function() {
                                   $('#orig_ref').css({ "background-color": ""}).text('Ref: '+book_ref);
                                })
                            }
                    }) // End of ajax request
                    $('#quote').val(clean_q);
                }
            });

            /**** Check for focus  ****/
            i_am_focused = ''

             $('#wpTextbox1').focus(function() {
                $('#insert').val('Insert to Cursor');
                i_am_focused = 'wpTextbox1';
            }).blur(function () {
                $('#insert').val('Insert to bottom');
            });
            $('.form_elem').not('[type="button"]').click(function() {
                id = $(this).attr('id');
                i_am_focused = id;
            });

            /**** Insert on click   ****/
            $('#insert').click(function() {
                var final_q = format_quote();
                if (!final_q) { return;}
                $(this).val('Inserted!').css({ "background-color": "deepPink", "border-color": "deepPink" })
                $('step3').not(':hidden').fadeOut('slow');
                var insert_quote = "\n\n"+final_q+"\n\n";
                var edit_form = document.editform.wpTextbox1;
                // if wpTextbox1 is not focus paste result at the bottom
                if ( i_am_focused == '' || i_am_focused != 'wpTextbox1' || /Insert to bottom/.test($('#insert').val()) ) {
                    var new_form_value = edit_form.value
                    // append to bottom
                    new_form_value += insert_quote;
                    new_form_value = tidyup(new_form_value);
                    edit_form.value = new_form_value;
                    edit_form.scrollTop = edit_form.scrollHeight;
                } else {
                    //// If compiler selected a section in the editbox where to place the quote ....
                    //IE support
                    if (document.selection) {
                      var sel = document.selection.createRange();
                      sel.text = insert_quote;
                    }
                    //MOZILLA/NETSCAPE support
                    else if (edit_form.selectionStart || edit_form.selectionStart == '0') {
                        edit_form_scrollTop = edit_form.scrollTop;
                      var startPos = edit_form.selectionStart;
                      var endPos = edit_form.selectionEnd;
                      edit_form.value = edit_form.value.substring(0, startPos)
                      + insert_quote
                      + edit_form.value.substring(endPos, edit_form.value.length);
                    }
                    edit_form.value = tidyup(edit_form.value);
                    // ScrollTo section
                    edit_form.scrollTop = edit_form_scrollTop;
                }
                i_am_focused = '';
                //clear_form();
                hits_count();
               $('#quote').one("change", function() {
                    $('#insert').css({"background-color": insert_color, "border-color": insert_color}).val('Insert quote');
               });
            });


            // Auto_suggest for titles when not match is found automatically, compilers will need to find an existing title
            $('#title').autocomplete($php_dir+"compile.php", {
                max: 25,
                autoFill: false
            });

            // Attach on change action to update Floating ref box
            $('#title').change(function() {
                $('#insert').css({"background-color": insert_color, "border-color": insert_color }).val('Insert quote');
                $('#orig_ref').css('background-color', '').text('');
                book_ref = '';
                var val = $('#title').val();
                if (typeof prev_ref == 'undefined') {
                     var prev_ref = '';
                }
                if (val != prev_ref) {

                    $(document).one("mousemove", function() {
                        val = $('#title').val();
                        insert_ref_show(val);
                        prev_ref = val;

                    })
                }
            });
        //} // End if wgAction=edit

        /**************** Functions definitions Section ***********************/
        /****   Warning function    ****/
        warn = function(message) {
            $('span#warn_text').text(message);
            $.blockUI({ message: $('#warning') });
            $(document).one('mousedown', function() {
                $.unblockUI();
            });
        }

        /**** Function to Clear form    ****/
        function clear_form(form) {
            $('#orig_ref').css('background-color', '').text('');
            $('.form_elem').not('[type="button"]').val('');
            $('#insert').css({"background-color": insert_color, "border-color": insert_color}).val('Insert quote');

        }

        /***** Function Build quote with the title, heading and quote. Transfomr Balaram to Unicode and paste the result in the #wpTextbox1 textarea.  *****/
        function format_quote() {
            var form = document.forms[0];
            var title = $('#title').val();
            var quote = $('#quote').val();
            var section = $('#section').val();
            var heading = $('#heading').val();
            // Warnings! for missing data in form
            if (title == '' || title == 'Type any keyword to find the Reference') {
                warn('You forgot to set the Reference!');
                return;
            }
            else if (quote == '') {
                warn('You forgot to fill in the Quote!');
                return;
            }
            if (/^(SB \d+.\d+.\d+|BG \d+.\d+|CC (Adi|Madhya|Antya) \d+.\d+)/.test(title) && section == "Choose a Section") {
                warn('You forgot to set the section');
                return;
            }
            // Statistics_tag will be used when inserting the quote; it will be prefixed to the quote itself
            // in order to be counted by the statistics system.
            var statistics_tag = '';
            var statistics_tag_close = '</span>';
            var title2 = '';
            if (title.match(/^SB (.+)/)) { statistics_tag = '<span class="SB-statistics">'; }
            else if (title.match(/^BG (.+)/)) { statistics_tag = '<span class="BG-statistics">' }
            else if (title.match(/^CC (.+)/)) { statistics_tag = '<span class="CC-statistics">' }
            else if (title.match(/Lecture|The Nectar of Devotion|Arrival Address|Initiation|Cornerstone|Wedding|Departure|Philosophy Discussion|Purport/)) { statistics_tag = '<span class="LEC-statistics">' }
            else if (title.match(/Conversation|Morning Walk/i)) { statistics_tag = '<span class="CON-statistics">' }
            else if (title.match(/Letter/)) { statistics_tag = '<span class="LET-statistics">' }
            else if (title.match(/^(TLC|NOD|NOI|EJ|KB|RTW|MOG|LOB|ISO|MMS|NBS)/)) { statistics_tag = '<span class="OB-statistics">'; }
            else { warn('Please set the statistics tag for this quote manually'); }

            // Format name for visible title. title2 will contain what the user sees on the title.
            if (num = title.match(/^NOD (.+)/)) { title2 = "Nectar of Devotion "+num[1];  }
            else if (num = title.match(/^ISO (.+)/)) { title2 = "Sri Isopanisad "+num[1] }
            else if (num = title.match(/^TLC (.+)/)) { title2 = "Teachings of Lord Caitanya, Chapter "+num[1] }
            else if (num = title.match(/^RTW (.+)/)) { title2 = "Renunciation Through Wisdom "+num[1] }
            else if (num = title.match(/^NOI (.+)/)) { title2 = "Nectar of Instruction "+num[1] }
            else if (num = title.match(/^KB (.+)/))  { title2 = "Krsna Book "+num[1] }
            else if (num = title.match(/^EJ (.+)/))  { title2 = "Easy Journey to Other Planets "+num[1] }
            else if (num = title.match(/^LOB (.+)/)) { title2 = "Light of the Bhagavata "+num[1] }
            else if (num = title.match(/^MOG (.+)/)) { title2 = "Message of Godhead "+num[1] }
            else if (num = title.match(/^NBS (.+)/)) { title2 = "Narada Bhakti Sutra "+num[1] }
            else if (num = title.match(/^SB (.+)/))  { title2 = title; }
            else if (num = title.match(/^BG (.+)/))  { title2 = title; }
            else if (num = title.match(/^CC (.+)/))  { title2 = title; }
            else {   title2 = title;
            }
            // Define/format Section from pulldown
            if (section == "Choose a Section") { section_text = '' } else { section_text = ", "+section; }
            // Define/format title including section
            var link = "[[Vanisource:"+title+"|"+title2+section_text+"]]:";
            // Define/format heading
            if(heading) { heading = "<span class=\"q_heading\">'''"+heading+"'''</span>\n\n"; } else { heading = ''}
            //Clean quote
            quote = quote.replace(/^\s+|\s+$/, '');

            // format quote according to Section
            var f_q = '';
            if ( section == "Translation") {
                f_q = heading+statistics_tag+"'''"+link+" "+quote+"'''"+statistics_tag_close;
            } else if (section == "Translation and Purport") {
                quote = quote.replace(/\n*PURPORT/, "'''\n\n");
                f_q = heading+statistics_tag+"'''"+link+" "+quote+statistics_tag_close;
            } else {
                if (title.match(/Conversation|Morning Walk|Philosophy Discussion/)) {
                    quote = quote.replace(/^([^\n]+?:)/mg, "\n$1");
                    f_q = heading+statistics_tag+"'''"+link+"'''\n"+quote+statistics_tag_close;
                } else {
                    f_q = heading+statistics_tag+"'''"+link+"''' "+quote+statistics_tag_close;
                }
            }
            // Final quote
            return f_q = Unify(f_q);
        }

        /**** Funtion to display ref in floating box ****/
        function insert_ref_show(ref) {
            if (ref == '') { return; }
            var ref_text = 'Ref: '+ ref;
            var ref_width = (ref_text.length * 10) + 25;
            doc_w - ref_width > 0 ? ref_pos = (doc_w - ref_width) / 2 : ref_pos = 0;
            $('#insert_ref > span').text(ref_text).css({ position: "relative", top: "10px", margin: "2px" });
            $('#insert_ref_bg, #insert_ref').css({ width: ref_width +'px' , right: ref_pos +'px' }).fadeIn('slow');
            return;
        }
        /**** Function to find the Section to insert the quote  ****/
        function find_section(title) {
        /*
        === Teachings of Lord Caitanya ===
        === Nectar of Devotion ===
        === Krsna, The Supreme Personality of Godhead ===
        === Sri Isopanisad ===
        === Mukunda-mala-stotra (mantras 1 to 6 only) ===
        == Lectures ==
        === Bhagavad-gita As It Is Lectures ===
        === Srimad-Bhagavatam Lectures ===
        === Nectar of Devotion Lectures ===
        === Sri Caitanya-caritamrta Lectures ===
        === Sri Isopanisad Lectures ===
        */
            function ss(title) {
                var section;
                if ( /^SB (\d+).*?/.exec(title) ) {
                    var canto = /SB (\d+).*?/.exec(title);
                    return section = 'SB Canto '+ canto[1];
                }
                if ( /^CC (.+?) .*?/.exec(title) ) {
                    var book = /CC (.+?) .*?/.exec(title);
                    return section = 'CC '+ book[1] +'-lila';
                }
                if ( /^BG (.+?).*?/.exec(title) ) {
                    return section = 'Bhagavad-gita As It Is';
                }
                if ( /^TLC (.+?).*?/.exec(title) ) {
                    return section = 'Teachings of Lord Caitanya';
                }
                if ( /^NOD (.+?).*?/.exec(title) ) {
                    return section = 'Nectar of Devotion';
                }
                if ( /^NOI (.+?).*?/.exec(title) ) {
                    return section = 'Nectar of Instruction';
                }
                if ( /^EJ (.+?).*?/.exec(title) ) {
                    return section = 'Easy Journey to Other Planets';
                }
                if ( /^KB (.+?).*?/.exec(title) ) {
                    return section = 'Krsna, The Supreme Personality of Godhead';
                }
                if ( /^ISO (.+?).*?/.exec(title) ) {
                    return section = 'Sri Isopanisad';
                }
                if ( /^RTW (.+?).*?/.exec(title) ) {
                    return section = 'Renunciation Through Wisdom';
                }
                if ( /^MOG (.+?).*?/.exec(title) ) {
                    return section = 'Message of Godhead';
                }
                if ( /^LOB (.+?).*?/.exec(title) ) {
                    return section = 'Light of the Bhagavata';
                }
                if ( /^MM (.+?).*?/.exec(title) ) {
                    return section = 'Mukunda-mala-stotra (mantras 1 to 6 only)';
                }
                if ( /^NBS (.+?).*?/.exec(title) ) {
                    return section = 'Narada-bhakti-sutra (sutras 1 to 8 only)';
                }
                if ( /^Lecture on BG /.exec(title) ) {
                    return section = 'Bhagavad-gita As It Is Lectures';
                }
                if ( /^Lecture on SB /.exec(title) ) {
                    return section = 'Srimad-Bhagavatam Lectures';
                }
                if ( /The Nectar of Devotion .*?/.exec(title) ) {
                    return section = 'Nectar of Devotion Lectures';
                }
                if ( /Lecture on Sri Isopanisad.*?/.exec(title) ) {
                    return section = 'Sri Isopanisad Lectures';
                }
                if ( /Initiation/.exec(title) ) {
                    return section = 'Initiation Lectures';
                }
                if ( /^Purport .*?/.exec(title) ) {
                    return section = 'Purports to Songs';
                }
                if ( /^Letter .+, (\d+)/.exec(title) ) {
                    var year = '';
                    year = /^Letter .+, (\d+)/.exec(title);
                    return section = year[1]+' Correspondence';
                }
                 if ( /^Morning Walk|Conversation/.exec(title) ) {
                    var year = '';
                    year = /(?:^Morning Walk|Conversation).+?, (19\d+)/.exec(title);
                    return section = year[1]+' Conversations and Morning Walks';
                }
                if ( /^Philosophy Discussion/.exec(title) ) {
                    return section = 'Philosophy Discussions';
                }
                return 0;
            }

            // Define search_seaction by passing title to ss()
            var search_section = '';
            search_section = ss(title);
            // If no results, exit!
            if ( typeof search_section == 'undefined' || search_section == 0) { return; }
            search_section = '== '+ search_section +' ==';
            // Scroll to find Sections in wpTextbox1 when clicking the down arrow in compilers interface
            //search_section = 'SB Canto 1';
            var edit_form = document.editform.wpTextbox1;
            var section_index = edit_form.value.indexOf(search_section);
            var sel = window.getSelection(); // get selection
            // remove all ranges
            sel.removeAllRanges();
            // window.find(aString, aCaseSensitive, aBackwards, aWrapAround, aWholeWord, aSearchInFrames, aShowDialog);
            var finds = this.find(search_section, false, false, false, false, false, false);
            // if section is found, highlight it
            if (finds) { edit_form.setSelectionRange(section_index,section_index + search_section.length); }
        } // End of find_section()

        function tidyup(obj) {

          // non-breaking space character to normal space
            obj = obj.replace(/\u00a0/g, ' ');
          // tab to space
            obj = obj.replace(/ *\t[ \t]*()/g, ' ');
          // remove spaces at the beggining of the line
            obj = obj.replace(/^(\t| |&nbsp;)+/mg, '');
          // remove trailing spaces
            obj = obj.replace(/(\t| |&nbsp;)+\n/g, '\n');
          // remove spaces in empty lines
            obj = obj.replace(/\n( |&nbsp;|\t)+\n/g, '\n\n');
          // empty line before and after headings, spaces around word (lookahead), remove bold, italics, and extra =
            obj = obj.replace(/(^|\n)+(=+) *([^\n]*?) *(=+)(?=(\n|$))/g,
              function(p, p1, p2, p3, p4) {
                p3 = p3.replace(/\'{2,}/g, '');
                return('\n\n' + p2 + ' ' + p3 + ' ' + p2 + '\n\n');
              }
            );
           // single empty lines only
            obj = obj.replace(/\n{3,}/g, '\n\n');
          // remove leading and trailing newlines
            obj = obj.replace(/^\n+/, '');
            obj = obj.replace(/\n{2,}$/, '\n');
            return obj;
        }
        // Safety net for session timeout. This will notify compilers on session timeout that the text is in the clipboard.
        if (wgAction == 'submit' && wgCanonicalNamespace == '' && $('.previewnote')) {
            var pr_text = $('.previewnote').html();
            var solution = '';
            if (detectflash([8,0,0])) {
                wgUserName ? solution = ' If you were compiling, you should have a copy of the final text in your clipboard. Go to the edit box, select all the text and press Ctrl-v (or right-click Paste) and Save.': solution = ' If you were compiling, you should have a copy of the final text in your clipboard. You appear to be logged-out... After you log back in, go to the edit box, select all the text and press Ctrl-v (or right-click Paste) and Save.';
            } else {
                solution = ' You do not have an updated version of flash plugin. Please update by visiting <a href="http://www.adobe.com/products/flashplayer/">this</a> page and installing the newest version for your browser.'
            }
            pr_text += solution;
            $('.previewnote').html(pr_text);
        }

                /*************** Testing section *******************/

    });

}
