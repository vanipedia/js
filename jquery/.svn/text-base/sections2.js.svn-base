/*********  Sections.js will be called by the compile_form.js.
 *          Compilers will use the menu tree created by this file to insert the appropriate
 *          section title according to the book from vanisource.
 *          The section is characterized by equal signs '====' before and after a section title, eg.: === Srimad Bhagavatam ===
 *          Each section has a subsection and they differ by the levels - amounts of equal(=) signs that they are embedded(surrounded) by.
 *
 *          Statistics will be used to account for how many quotes have been compiled in every article by book and total.
 *          This total will be tide up to grand a total that will be displayed in the front page of Vaniquotes.
 *          Use the Statistics box to insert the tags at the beggining of each quote.
 *          
 **********/
if (wgAction == 'edit' && wgUserName != null) {
    // Function to paste sections into the wiki editbox when compilers click on the menutree              
    function insert_section_title(title, level) {
        switch(level) {
            case '1':
                l = '=';
                break;
            case '2':
                l = '==';
                break;
            case '3':
                l = '===';
                break;
            case '4':
                l = '====';
                break;
            case '5':
                l = '=====';
                break;
            case '6':
                l = '======';
                break;
        }
         
        var edit_form = document.editform.wpTextbox1;
        //// If compiler selected a section in the editbox where to place the quote ....
        //IE support
        if (document.selection) {
          sel = document.selection.createRange();
          sel.text = '\r'+l+' '+title+' '+l+'\r\r';
        }
        //MOZILLA/NETSCAPE support
        else if (edit_form.selectionStart || edit_form.selectionStart == '0') {
            edit_form_scrollTop = edit_form.scrollTop;
          var startPos = edit_form.selectionStart;
          var endPos = edit_form.selectionEnd;
          edit_form.value = edit_form.value.substring(0, startPos)+
             '\r'+l+' '+title+' '+l+'\r\r'+
             edit_form.value.substring(endPos, edit_form.value.length);
        }
        // ScrollTo section
        edit_form.scrollTop = edit_form_scrollTop;
    } // End of insert_section_title function
    
    // Function to paste statistics tag at the begginging of each quote compiled.
    function insert_statistics_title(book) {
        var insert_tag = '<span class="' +book+ '-statistics">';
         
        edit_form = document.editform.wpTextbox1;
        //// If compiler selected a section in the editbox where to place the quote ....
        //IE support
        if (document.selection) {
          sel = document.selection.createRange();
          sel.text = insert_tag;
        }
        //MOZILLA/NETSCAPE support
        else if (edit_form.selectionStart || edit_form.selectionStart == '0') {
            edit_form_scrollTop = edit_form.scrollTop;
          var startPos = edit_form.selectionStart;
          var endPos = edit_form.selectionEnd;
          edit_form.value = edit_form.value.substring(0, startPos)+
             insert_tag+edit_form.value.substring(endPos, edit_form.value.length);
        }
        // ScrollTo section
        edit_form.scrollTop = edit_form_scrollTop;
        // Update individual and total hits
        hits_count();
    } // End of insert_statistic_title function
    // Function to automate insertion of tags in existing articles without them
    function insert_statistics_auto() {
        var re1 = /(^'''\[\[Vanisource:(BG|SB|CC))/mg;
        var re2 = /(^'''\[\[Vanisource:(?:Lecture|Purport|The Nectar|Arrival))/mg;
        var re3 = /(^'''\[\[Vanisource:Letter)/mg;
        var re4 = /(^'''\[\[Vanisource:(TLC|NOD|NOI|EJ|KB|RTW|MOG|LOB|ISO|MMS|NBS))/mg;
        var re5 = /(^'''\[\[Vanisource:.+?(Conversation|Morning Walk).+?\]\])/mg;
        edit_form = $('#wpTextbox1').val();
        if (book = re1.exec(edit_form)) {
          edit_form = edit_form.replace(re1, '<span class="$2-statistics">$1');
        } 
        if (book = re2.exec(edit_form)) {
          edit_form = edit_form.replace(re2, '<span class="LEC-statistics">$1');
        } 
        if (book = re3.exec(edit_form)) {
          edit_form = edit_form.replace(re3, '<span class="LET-statistics">$1');
        } 
        if (book = re4.exec(edit_form)) {
          edit_form = edit_form.replace(re4, '<span class="OB-statistics">$1');
        } 
        if (book = re5.exec(edit_form)) {
          edit_form = edit_form.replace(re5, '<span class="CON-statistics">$1');
        }
        $('#wpTextbox1').val(edit_form, function() {
            hits_count()
        });
    }
    $('document').ready(function () {      
            insert_statistics_auto();
                //Insert the box with the sections menu tree. It has all the titles and their respective code and level number. The higher the level the least = signs it's surrounded by
                  $('<div id="section_tree_div" class="portlet">'+
             '<h5>Vaniquotes Sections</h5>'+
             '<div class="pBody">'+
             '<ul id="section_tree" class="filetree">'+
             '<li><span class="folder">Sections</span>'+
             '<ul>'+
             '	<li><span class="folder">BG</span>'+
             '		<ul>'+
             '			<li><a href="#" onclick="insert_section_title(\'Bhagavad-gita As It Is\', \'2\'); return false;"><span class="file">Bhagavad-gita As It Is</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'BG Preface and Introduction\', \'3\'); return false;"><span class="file">BG Preface and Introduction</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'BG Chapters 1 - 6\', \'3\'); return false;"><span class="file">BG Chapters 1 - 6</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'BG Chapters 7 - 12\', \'3\'); return false;"><span class="file">BG Chapters 7 - 12</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'BG Chapters 13 - 18\', \'3\'); return false;"><span class="file">BG Chapters 13 - 18</span></a></li>'+
             '		</ul>'+
             '	</li>'+
             '	<li><span class="folder">SB</span>'+
             '		<ul>'+
             '			<li><a href="#" onclick="insert_section_title(\'Srimad-Bhagavatam\', \'2\'); return false;"><span class="file">Srimad-Bhagavatam</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Preface and Introduction\', \'3\'); return false;"><span class="file">SB Preface and Introduction</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Canto 1\', \'3\'); return false;"><span class="file">SB Canto 1</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Canto 2\', \'3\'); return false;"><span class="file">SB Canto 2</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Canto 3\', \'3\'); return false;"><span class="file">SB Canto 3</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Canto 4\', \'3\'); return false;"><span class="file">SB Canto 4</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Canto 5\', \'3\'); return false;"><span class="file">SB Canto 5</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Canto 6\', \'3\'); return false;"><span class="file">SB Canto 6</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Canto 7\', \'3\'); return false;"><span class="file">SB Canto 7</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Canto 8\', \'3\'); return false;"><span class="file">SB Canto 8</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Canto 9\', \'3\'); return false;"><span class="file">SB Canto 9</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Canto 10.1 to 10.13\', \'3\'); return false;"><span class="file">SB Canto 10.1 to 10.13</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'SB Cantos 10.14 to 12 (Translations Only)\', \'3\'); return false;"><span class="file">SB Cantos 10.14 to 12 (Translations Only)</span></a></li>'+
             '		</ul>'+
             '	</li>'+
             '	<li><span class="folder">CC</span>'+
             '		<ul>'+
             '			<li><a href="#" onclick="insert_section_title(\'Sri Caitanya-caritamrta\', \'2\'); return false;"><span class="file">Sri Caitanya-caritamrta</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'CC Preface and Introduction\', \'3\'); return false;"><span class="file">CC Preface and Introduction</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'CC Adi-lila\', \'3\'); return false;"><span class="file">CC Adi-lila</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'CC Madhya-lila\', \'3\'); return false;"><span class="file">CC Madhya-lila</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'CC Antya-lila\', \'3\'); return false;"><span class="file">CC Antya-lila</span></a></li>'+
             '		</ul>'+
             '	</li>'+
             '	<li><span class="folder">Other Books</span>'+
             '		<ul>'+
             '			<li><a href="#" onclick="insert_section_title(\'Other Books by Srila Prabhupada\', \'2\'); return false;"><span class="file">Other Books by Srila Prabhupada</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Teachings of Lord Caitanya\', \'3\'); return false;"><span class="file">Teachings of Lord Caitanya</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Nectar of Devotion\', \'3\'); return false;"><span class="file">Nectar of Devotion</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Nectar of Instruction\', \'3\'); return false;"><span class="file">Nectar of Instruction</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Easy Journey to Other Planets\', \'3\'); return false;"><span class="file">Easy Journey to Other Planets</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Krsna, The Supreme Personality of Godhead\', \'3\'); return false;"><span class="file">Krsna, The Supreme Personality of Godhead</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Renunciation Through Wisdom\', \'3\'); return false;"><span class="file">Renunciation Through Wisdom</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Message of Godhead\', \'3\'); return false;"><span class="file">Message of Godhead</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Light of the Bhagavata\', \'3\'); return false;"><span class="file">Light of the Bhagavata</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Sri Isopanisad\', \'3\'); return false;"><span class="file">Sri Isopanisad</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Mukunda-mala-stotra (mantras 1 to 6 only)\', \'3\'); return false;"><span class="file">Mukunda-mala-stotra (mantras 1 to 6 only)</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Narada-bhakti-sutra (sutras 1 to 8 only)\', \'3\'); return false;"><span class="file">Narada-bhakti-sutra (sutras 1 to 8 only)</span></a></li>'+
             '		</ul>'+
             '	</li>'+
             '	<li><span class="folder">Lectures</span>'+
             '		<ul>'+
             '			<li><a href="#" onclick="insert_section_title(\'Lectures\', \'2\'); return false;"><span class="file">Lectures</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Bhagavad-gita As It Is Lectures\', \'3\'); return false;"><span class="file">BG</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Srimad-Bhagavatam Lectures\', \'3\'); return false;"><span class="file">SB</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Nectar of Devotion Lectures\', \'3\'); return false;"><span class="file">Nectar of Devotion</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Sri Caitanya-caritamrta Lectures\', \'3\'); return false;"><span class="file">CC</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Sri Isopanisad Lectures\', \'3\'); return false;"><span class="file">Sri Isopanisad</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Sri Brahma-samhita Lectures\', \'3\'); return false;"><span class="file">Sri Brahma-samhita</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Festival Lectures\', \'3\'); return false;"><span class="file">Festival</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Arrival Addresses and Talks\', \'3\'); return false;"><span class="file">Arrival Addresses and Talks</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Initiation Lectures\', \'3\'); return false;"><span class="file">Initiation</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Cornerstone Ceremonies\', \'3\'); return false;"><span class="file">Cornerstone Ceremonies</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Wedding Ceremonies\', \'3\'); return false;"><span class="file">Wedding Ceremonies</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'General Lectures\', \'3\'); return false;"><span class="file">General</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Departure Talks\', \'3\'); return false;"><span class="file">Departure Talks</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Philosophy Discussions\', \'3\'); return false;"><span class="file">Philosophy Discussions</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'Purports to Songs\', \'3\'); return false;"><span class="file">Purports to Songs</span></a></li>'+
             '		</ul>'+
             '	</li>'+
             '	<li><span class="folder">Conversations and Morning Walks</span>'+
             '		<ul>'+
             '			<li><a href="#" onclick="insert_section_title(\'Conversations and Morning Walks\', \'2\'); return false;"><span class="file">Conversations and Morning Walks</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1967 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1967</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1968 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1968</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1969 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1969</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1970 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1970</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1971 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1971</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1972 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1972</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1973 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1973</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1974 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1974</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1975 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1975</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1976 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1976</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1977 Conversations and Morning Walks\', \'3\'); return false;"><span class="file">1977</span></a></li>'+
             '		</ul>'+
             '	</li>'+
             '	<li><span class="folder">Correspondence (Letters)</span>'+
             '		<ul>'+
             '			<li><a href="#" onclick="insert_section_title(\'Correspondence\', \'2\'); return false;"><span class="file">Correspondence</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1947 to 1965 Correspondence\', \'3\'); return false;"><span class="file">1947 to 1965</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1966 Correspondence\', \'3\'); return false;"><span class="file">1966</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1967 Correspondence\', \'3\'); return false;"><span class="file">1967</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1968 Correspondence\', \'3\'); return false;"><span class="file">1968</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1969 Correspondence\', \'3\'); return false;"><span class="file">1969</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1970 Correspondence\', \'3\'); return false;"><span class="file">1970</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1971 Correspondence\', \'3\'); return false;"><span class="file">1971</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1972 Correspondence\', \'3\'); return false;"><span class="file">1972</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1973 Correspondence\', \'3\'); return false;"><span class="file">1973</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1974 Correspondence\', \'3\'); return false;"><span class="file">1974</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1975 Correspondence\', \'3\'); return false;"><span class="file">1975</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1976 Correspondence\', \'3\'); return false;"><span class="file">1976</span></a></li>'+
             '			<li><a href="#" onclick="insert_section_title(\'1977 Correspondence\', \'3\'); return false;"><span class="file">1977</span></a></li>'+
             '		</ul>'+
             '	</li>'+         '</ul>'+
             '</li>'+
             '</ul></div></div>').insertAfter('#p-tb');
             
             // jQuery treeview apply to ul by id="section_tree"
                $('#section_tree').treeview({
                   collapsed: true,
                   unique: true
                });
                
            /**** Tree for tag inserting. Statistics needs to be updated according to the differenct quotes in each article.
             * By inserting this <span elements at the beggining of everyquote we can have a head count and update totals for each book and compilation/article totatls.
                                                                                                                                                                        ****/
            $('<div id="statistics_tree_div" class="portlet">'+
             '<h5>Vaniquotes Statistics</h5>'+
             '<div class="pBody">'+
             '<ul id="statistics_tree" class="filetree">'+
             '	<li><span class="folder">Tags</span>'+
             '		<ul>'+
             '			<li><a href="#" onclick="insert_statistics_title(\'BG\'); return false;"><span class="file">Bhagavad-gita As It Is</span></a></li>'+
             '			<li><a href="#" onclick="insert_statistics_title(\'SB\'); return false;"><span class="file">Srimad-Bhagavatam</span></a></li>'+
             '			<li><a href="#" onclick="insert_statistics_title(\'CC\'); return false;"><span class="file">Sri Caitanya-caritamrta</span></a></li>'+
             '			<li><a href="#" onclick="insert_statistics_title(\'OB\'); return false;"><span class="file">Other Books</span></a></li>'+
             '			<li><a href="#" onclick="insert_statistics_title(\'LEC\'); return false;"><span class="file">Lectures</span></a></li>'+
             '			<li><a href="#" onclick="insert_statistics_title(\'CON\'); return false;"><span class="file">Conversations and Morning Walks</span></a></li>'+
             '			<li><a href="#" onclick="insert_statistics_title(\'LET\'); return false;"><span class="file">Correspondence</span></a></li>'+
             '		</ul>'+
             '	</li>'+
             '</ul></div></div>').insertAfter('#section_tree_div');
            // jQuery treeview apply to ul by id="statistics_tree"
                $('#statistics_tree').treeview({
                   collapsed: true,
                   unique: true
                });
    });
} // End of if action='edit'        