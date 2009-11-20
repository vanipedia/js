/*****************************************************
 *  factsbox form
 *  this script builds the factsbox_form for compilers
 ********************************************************/
if (wgAction == 'edit' && wgCanonicalNamespace === '' && !/section=\d+/.test(this.location.search) && wgUserName != null ) {

    $(document).ready(function() {
    
        /**** Function to retrive factsbox template    ****/
        function clear_template() {
            new_form_value = $('#wpTextbox1').val();
            categories = new Array();
            if (/\[\[Category:/i.test(new_form_value)) {
                cat_matches = new_form_value.match(/\[\[Category:.+?\]\]/ig);
                $.each(cat_matches, function(i, cat) {
                    var cat1 = cat.replace(/(\[|\])/g, '\\$1');
                    cat1 = cat1.replace(/\|/g, '\\|');                    
                    var cat2 = cat.replace(/[\[\]]/g, '');
                    cat2 = cat2.replace(/Category:/i, '');
                    categories.push(cat2);
                    re = new RegExp(cat1);
                    new_form_value = new_form_value.replace(re , '');
                });
            }
            factsbox_section = new_form_value.substring(0, new_form_value.lastIndexOf('}}') + 2 );
            final_form_value = $.trim(new_form_value.substring(factsbox_section.length, new_form_value.length));
            $('#wpTextbox1').val(final_form_value);
            return factsbox_section;
        }

        /**** Date  ****/
        var monthname=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec")
        var d = new Date(); var day = d.getDate().toString(); var month = monthname[d.getMonth()]; var year = d.getYear().toString().substring(1,3);
        if (day.length == 1) { day = '0'+day }
        date = day+month+year;
        empty_terms = 'Copy the expressions list here or add new ones by clicking on the plus icon ';
        empty_goal = 'Type the total quotes found in Vedabase for this compilation ';
        empty_cats = 'Type the categories this page belongs to ';
       /**** Function to request compiler to insert factsbox template if article is empty/new *****/    
        function insert_factsbox_template(v, m) {
            if (v) {
                        
                compiling_template = 
                '{{terms|'+empty_terms+'}}' +
                '{{notes|}} \n\n' +
                '{{compiler|'+wgUserName+' }} \n\n' +
                '{{complete|}} \n\n' +
                '{{goal|'+empty_goal+'}} \n\n';
                '{{first|'+date+' }} \n\n' +
                '{{last|'+date+' }} \n\n' +
                '{{totals by section|BG=0 |SB=0 |CC=0|OB= 0|Lec=0|Let=0 |Con=0}} \n\n' +
                '{{total|Will be populated automatically from the hit count above }} \n\n';
                '{{categories|'+empty_cats+'}} \n\n';
                toc = '{{toc right}}';
        
                edit_form = document.editform.wpTextbox1;
                if (!/\{\{toc/.test(edit_form)) { compiling_template += toc; }
                //IE support
                if (document.selection) {
                  sel = document.selection.createRange();
                  sel.text = compiling_template+'\n\n';
                }
                //MOZILLA/NETSCAPE support
                else if (edit_form.selectionStart || edit_form.selectionStart == '0') {
                    edit_form_scrollTop = edit_form.scrollTop;
                    edit_form.value = compiling_template+'\n\n'+
                    edit_form.value.substring(0, edit_form.value.length);
                }
                // ScrollTo section
                edit_form.scrollTop = edit_form_scrollTop;
            }
        }
       
            
       /**** Function in-place edit  ****/
        function up_info_value(elem, value) {
            $(elem).text(value);
        }
        
        /**** Function that will update the article with the new factsbox statistic values ****/
        save_infovalues = function(elems) {
            hits_count();
            current_val = $('#wpTextbox1').val();
            // Doublecheck that no unwanted tags are already there.
            if (current_val.indexOf('}}') > -1) { 
                $('#wpTextbox1').val(current_val.substr(current_val.lastIndexOf('}}') + 2 ) );
                current_val = $('#wpTextbox1').val();
            }
            
            // Organize table before save
            $('.facts_row').each(function(i, val) {
                // toctoc right - Set toc to bottom
                if (/^toc/.test(val.textContent)) {
                    $(this).insertBefore($('.facts_row:last'));
                }
                // Move Categories to the bottom.
                if(/^categories/.test(val.textContent)) {
                    $(this).insertAfter($('.facts_row:last'));       
                }
            });
            
            // Extract values from table
            var updated_section = '';
            var id_array = new Array();
            var val_array = new Array();
            $('.facts_val').each(function() {
                var id = '';
                id = this.id;
                var values = '';
                values = $(this).text();
                values = values.replace(/\n+/g, '');
                values = values.replace(/ +/g, ' ');
                if (id == 'terms') { values = UniToASCII(Unify(values)); }
                if (id == 'totals_by_section') { values = values.replace(/ +/g, '|'); }
                if (id == 'notes' && /Click to edit/.test(values)) { values = ''; }
                if (id == 'complete') {
                    values = '';
                    typeof all == 'undefined'? all = 0:'';
                    $('.complete_checks').each(function() {
                        if (this.checked === true) {
                            v = $(this).attr('id').replace(/complete-/, '');
                            values += v+'|';
                            v == 'ALL'? all = 1: all = 0;
                        } 
                    });
                    values = values.replace(/\|$/, '');
                }
                if (id == 'goal') { /\D+/.test(values) ? values = '0':''; }
                
                // Change strategy and save in arrays for order and neatness purposes
                id_array.push(id);
                val_array.push(values);
            });
            // Check 
            $.each(id_array,function(i, id) {
                // Filter/delete goal if all sections have been completed
                if (id == 'goal' && all) {
                    val_array[i] = 'delete';
                }
            })
            
            // Loop through arrays to save their values
            $.each(id_array,function(i, id) {
                // If values == delete skip/don't append this tag.
                if (val_array[i] == 'delete') { return; }
                // Toc and categories have special formating
                if (id != 'toc' && id != 'categories') {
                    updated_section += '{{'+id+'|'+val_array[i]+'}}\n\n';
                } else {
                    if (id == 'toc') {
                        updated_section += '{{'+val_array[i]+'}}\n\n';
                    }
                    if (id == 'categories') {
                        if (/empty_cats/.test(val_array[i])) { return; }
                        var cats = val_array[i].split('|');
                        $.each(cats, function(i, cat) {
                            cat = cat.replace(/"/g, '');
                            cat = cat.replace(/\+/g, '|');                            
                            updated_section += '[[Category:'+cat+']]\n\n';
                        });
                    }
                }
            });
            $('#wpTextbox1').val(updated_section+current_val);
        } // end of save_info_values
        /**** Function to count how many quotes have been compiled in this article by book and total    ****/
        hits_count = function() {
            var BG = 0; var SB = 0; var CC = 0; var OB = 0; var Lec = 0; var Con = 0; var Let = 0;
            form_text = '';
            form_text = $('#wpTextbox1').val();
            re1 = new RegExp('<span class=".+?-statistics">', 'g');
            var statistic_a = form_text.match(re1);
            if (statistic_a) {
                total = statistic_a.length;
                for (var j = 0; j < total; j++) {
                    var stats = '';
                    stats = statistic_a[j];
                    if (stats.indexOf('BG') != -1) { BG++;}
                    if (stats.indexOf('SB') != -1) { SB++;}
                    if (stats.indexOf('CC') != -1) { CC++;}
                    if (stats.indexOf('OB') != -1) { OB++;}
                    if (stats.indexOf('LEC') != -1) { Lec++;}
                    if (stats.indexOf('LET') != -1) { Let++;}
                    if (stats.indexOf('CON') != -1) { Con++;}
                }
                hits = 'BG=' +BG+ ' SB=' +SB+ ' CC=' +CC+ ' OB=' +OB+ ' Lec=' +Lec+ ' Con=' +Con+ ' Let=' +Let;
                total = total;
                if ($('#totals_by_section').size()) {
                    $('#totals_by_section').text(hits);
                    $('#total').text(total);
                } else {
                return { values: hits, total: total};
                }
            }
            return 0;
        };
        
        /**** Function to create factsbox form ****/
        // Create factsbox div
        factsbox = function() {
            form_text = $('#wpTextbox1').val();
            // if factsbox  template was not found in the edit box insert it
            if (form_text.indexOf('{{terms') == -1) {
                insert_factsbox_template(true, this);
                // reset the edit box value to the current state e.g: including the template now
                form_text = $('#wpTextbox1').val();
            }
            factsbox_section = clear_template();
            // Split the factsbox template section by {{
            var info_a = new Array();
            info_a = factsbox_section.split('{{');
            // Remove first element since it's empty
            info_a.shift();
            info_sections = new Array();
            if (categories.length) {
                var info_cats = 'categories';
                $.each(categories, function(i, cat) {
                    cat = cat.replace(/\|(\d+)/, '+$1');
                    $.trim(cat);
                    info_cats += '|'+'"'+cat+'"';
                });
                info_a.push(info_cats);
            }
            // Create info_multi_array
            info_id = new Array();
            info_values = new Array();
            for (i in info_a) {
                now = info_a[i].replace(/"/g, '\"');
                now = now.replace(/<.+/, '');
                now = now.replace(/^(.+?)\}\}.*/, '$1');
                now = now.replace(/\n+/g, '');
                now = $.trim(now);
                if (now.indexOf('|') > -1) {
                    info_id[i]  = now.substring(0, now.indexOf('|'));
                    info_values[i] = now.substr(now.indexOf('|') + 1);
                } else {
                    info_id[i] = now.substring(0, now.indexOf(' '));
                    info_values[i] = now.substr(now.indexOf(' ') + 1);
                }
                
            }
            // declare and array with the elements that "should be there". the ones missing will be inserted after check in the loop.
            should_a = new Array('terms', 'goal', 'categories', 'notes', 'compiler', 'complete',  'first', 'last', 'totals_by_section', 'total');
            // Array that will hold existing 
            exists = new Array();
            // check for duplicates in array before proccessing current and add missing ones
            for (i in info_id) {
                info = info_id[i];
                 if ($.inArray(info, exists) != -1) {
                    info_id[i] = 'SKIP';
                } else {
                    exists.push(info);
                }
            }
            for (x in should_a) {
                sh = should_a[x];
                if ($.inArray(sh, exists) == -1) {
                    info_id.push(sh);
                    info_values.push('');
                }
            }
            // Create table (replica of factsbox)
            factsbox_div = '<div id="factsbox" class="factsbox">' +
            '<span class="facts_head">Page facts</span>' +
            '<table class="facts_table">' +
            '<tbody><tr><td class="facts_title"/></tr>';
            for ( i = 0; i < info_id.length; i++) {
                id = info_id[i];
                value = info_values[i];
                title = id;
                if (id == 'SKIP') { continue; }
                // toc is special so we set it up first
                if (/^toc/i.test(id)) {
                    id = 'toc'
                    title = 'toc';
                    value = 'toc '+value;
                }
                if (/^hits/i.test(id)) { continue; }
                if (/^terms/i.test(id)) {
                    if(!/^Copy /.test(value)) {
                        value = value.replace(/"/g, '');
                        value = value.replace(/ +\||\| +/g, '|');
                        value = value.replace(/\|/g, '"|"');
                        value = value.replace(/^ +| +$/g, '');
                        value = '"'+value+'"';
                    }
                    title = 'expressions';
                }
                if (/^totals_by_section/i.test(id)) {
                    id = 'totals_by_section';
                    title = 'totals by section';
                }
                if (/^notes/i.test(id)) { value.match(/Click to edit/i) ? value = '': ''; }
                // Compiler tag
                if (/^compiler/i.test(id)) {  // if this title is compiler
                    if (wgUserName !== null) {    // if wiki UserName is not null, meaning if logged in
                        if (value.indexOf(wgUserName) == -1) {
                            value === '' ? value = wgUserName: value += '| '+wgUserName;
                        }
                    } else { value = 'Please Log-in to include your username in the list of compilers';
                    }
                }
                if (/^complete/i.test(id)) {
                    var comps = new Array('BG', 'SB', 'CC', 'OB', 'LEC', 'CON', 'LET', 'ALL');
                    var list = '';
                    var ch = '';
                    var all = '';
                    if (value !== '') {
                        var vals = value.split('|');
                        $.each(vals, function(i, v){
                            vals[i] = v.toUpperCase();
                        })
                    }
                    $.each(comps, function(i, sec) {
                        if (vals) {
                            if ($.inArray(sec, vals) != -1) {
                                ch = 'checked';
                            } else {
                                ch = '';
                            }
                            vals == 'ALL'? all = 1: all = 0;
                        }
                        list += '<div class="check_div">'+sec+' <input id="complete-'+sec+'" class="complete_checks" type="checkbox" '+ch+'></div> ';
                    });
                    value = list;
                }
                // Creation date
                if (/first/i.test(id)) { value === ''? value = date: ''; }
                // Last edit date
                if (/last/i.test(id)) { value = date; }
                // sections total and page total tag
                if (/totals_by_section/i.test(id)) {
                    if( hits_count()) {
                        hits = hits_count(); value = hits.values; var total = hits.total;
                    } else {
                        value += '<---- Please update this hit count by inserting the corresponding statistic tag to each quote! ---->';
                    }
                }                                                  
                if (/\btotal\b/i.test(id)) { total !== undefined ? value = total : ''; }
                if (/goal/i.test(id)) { value === '' || value === '0' || /Click to edit/.test(value) ? value = empty_goal:''; }
                if (/categories/i.test(id)) { value === '' || /Click to edit/.test(value) ? value = empty_cats:''; }
                
                // Insert row
                factsbox_div += '<tr class="facts_row"><td class="facts_id">' +title+ '</td><td id="' +id+ '" class="facts_val">' +value+ '</td><td id="facts_' +id+ '_buttons"></td></tr>';                
               }
            factsbox_div += '</tbody></table></div>';
            
            $(factsbox_div).css({ "padding": "10px", margin: "10px" }).insertBefore('#form_div');
            $('#toc').parent().hide();
            if (all) { $('#goal').parent().hide(); }
            $('.check_div').css({ position: "relative", float: "left", margin: "0px 2px 0px 2px", padding: " 0px 5px 0px 5px", border: "" });
            
            // Organize table acording to the order in should_a array
            $.each(should_a, function(j, sh) {
                var re = new RegExp('^'+sh);
                $('.facts_row').each(function(i,val) {
                    if (re.test(val.textContent)) {
                        j !== 0 ? index = j + 1: index = 0;
                        // Change position in table to index
                        $(this).insertAfter($('.facts_row').eq(index));
                    }                    
                });
            });

            /**** CSS for factsbox ****/
            $('.facts_head').css({ "font-size": "12pt", "color": "magenta"});
            $('.facts_row').css({ width: "100%", "font-size": "small"});
            $('.facts_id').css({ "font-style": "bold" , "font-size": "Medium", padding: "0px 5px 0px 5px", color: "MediumPurple"});
            $('.facts_val').css({ color: "indigo" });
            $('#facts_table').css({ width: "100%" });
            
            // Make div inline-editable 
            $('.facts_val#terms, #goal, #categories, #notes, #compiler').editable(function(value, settings) {
                up_info_value(this, value); 
             }, { 
                type: "text",
                style: "border: solid 2px indigo;"
            });
            
            // Functions to #add_term
            quick_add("terms");
            quick_add("categories");
            function quick_add(elem) {
                $('<img id="add_'+elem+'" src="/images/plus_sign.jpg" style="cursor: pointer; width: 14px;", title="Add '+elem+'"></img>').insertAfter('#factsbox #'+elem+'');
                $('<input type="text" id="add_'+elem+'_input" size=20 style="border: double rgb(89, 181, 97); padding: 2px;" />').appendTo('#factsbox #facts_'+elem+'_buttons').hide();
                function add_to_list(elem, list) {
                    var formated_list = list.replace(/^[ ,]+|[ ,]+$/g, '');
                    formated_list = formated_list.replace(/ ?, ?/g, '"|"');
                    var current_list = $(elem).html();
                    var final_list = '';
                    /Type |Copy /.test(current_list) ? final_list = '"'+formated_list+'"': final_list = current_list+'|"'+formated_list+'"';
                    $(elem).html(final_list);
                    return;
                }
                // Toggle button function
                $('#add_'+elem+'').toggle(function() {
                    // Event when enter key is pressed, should proces the data in the input box(so we simply click the button)
                    $('#add_'+elem+'_input').keydown(function(e) {
                        //console.log(e.keyCode);
                        if(e.keyCode == 13) {
                            //alert('Enter key was pressed.');
                            $('#add_'+elem+'').click();
                            $(this).unbind("keydown");
                        }
                    })
                    $('#add_'+elem+'_input').animate({
                        width: 'show',
                        opacity: 'show'
                    }, 400).focus();
                }, function() {
                    // if data in input box
                    if ($('#add_'+elem+'_input').val() != '' ) {
                        add_to_list('#'+elem+'', $('#add_'+elem+'_input').val());
                        $('#add_'+elem+'_input').val('');
                    }
                    // Fadeout after. Order is important, so we fade after changes to the input box.
                    $('#add_'+elem+'_input').animate({
                        width: 'hide',
                        opacity: 'hide'
                    }, 400);
                });
                return;
            } // End of quick_add()
            // Add button for copy all terms to clipbard
            $.clipboardReady(function() {
                $('<img id="copy_terms_to_clip" alt="Copy to Clipboard" src="/images/clipboard.jpg" style="cursor: pointer; width: 22px;" title="Copy terms to Clipboard"></img>')
                .insertAfter('#factsbox #add_terms').click(function() {
                    $.clipboard($('#factsbox #terms').html());
                    warn('Terms copied to clipboard');
                })
            }, { swfpath: $jquery_dir+'jquery.clipboard/jquery.clipboard.swf', debug: false });
            
            // Trigger save_infovalues onclick the save button
            $('#wpSave').click(function () {
                window.onbeforeunload = function () { return; }
                save_infovalues();
            });
            $.clipboardReady(function(){
                $('#wpSave').click(function () {
                    $.clipboard($('#wpTextbox1').val());  
                })
            }, { swfpath: $jquery_dir+'jquery.clipboard/jquery.clipboard.swf', debug: false });

            // Hide Factsbox button 
            facts = 1;
            $('<input type="button" id="factsbox_hide" class="factsbox_button" value="Hide Facts" />')
            .click(function() {
                facts = 0;
                $('#float_div, #btn_bk').fadeIn();
                $('#factsbox').slideUp('medium');
                $('#factsbox_show').fadeIn();
            }).appendTo('#factsbox').css({ position: "relative", left: "0px" });
            // Show Factsbox button
            if (!$('#factsbox_show').size()) {
                    $('<input type="button" id="factsbox_show" class="factsbox_button" value="Show Facts" />')
                .click(function() {
                    facts = 1;
                    $('#factsbox').slideDown('medium');
                    $('#factsbox_show').fadeOut();
                }).insertBefore('#turn-off_tips').hide();
            } else { $('#factsbox_show').hide(); }
           
            $('.factsbox_button').css({ "background-color": "#6161C4", "border-color": "CadetBlue", color: "black", "font-family": "arial, verdana, ms sans serif", "font-weight": "bold", "font-size": "10pt", "text-align": "right", padding: "5px", margin: "2px", cursor: "pointer" });
                   
            /**** Checkboxes logic  ****/
            $('.complete_checks').not('#complete-ALL').click(function() {
                $('#complete-ALL').uncheck();
                $('#goal').parent().show();
            });
            $('#complete-ALL').click(function() {
                $('.complete_checks').not(this).uncheck();
                this.checked == true? $('#goal').parent().hide(): $('#goal').parent().show();
            });
            
        } // End of factsbox function
        
        disable_factsbox = function() {
            save_infovalues();
            $('#float_div, #btn_bk').fadeIn();
            $('#factsbox').remove();
        }
        
        
        /**** Check and uncheck functions   ****/
        $.fn.check = function() {
            return this.each(function() {
              this.checked = true;
            });
        };
        $.fn.uncheck = function() {
            return this.each(function() {
              this.checked = false;
            });
        };
        // Before leaving the page refresh/save dump factbox to edit box
        window.onbeforeunload = function (evt) {
            if(evt) {
                if(compiling) {
                    disable_factsbox();
                    return;
                }
            }
        }
    });
    
} // End of if wgAction == 'edit'
