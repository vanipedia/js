/******************************************************************************
 *  This script modifies the "Special:Search" page in vaniquotes
 *  in order to make it easy for compilers (page creators)
 *  to create pages without any diacritics from expressions
 *  found in Vedabase. They can simply copy from Vedabse,
 *  paste in the search box and click Go. When landing on the "Special:Search"
 *  page the link to "create this page" will direct them to the desired one
 *  **************************************************************************/

if (wgPageName == 'Special:Search' && wgUserName != null) {
    $(document).ready(function() {
        $('a.new').each(function() {
            html = $(this).html();
            if(html.indexOf('create this page') != -1) {
                parent = $(this).parent();
                html2 = $(parent).html();
                title = html2.replace(/^.+There is no page titled "(.+?)".+/, '$1');
                title = UniToASCII(Unify($.trim(title)));
                link = $(this).parent().children('a').attr('href');
                link = link.replace(/(.+?\?title=).+?(\&action.+)/, '$1'+title+'$2');
                $(this).parent().html('<b>The page as you typed it was not found.</b> Create the page <b>"'+title+'"</b> by clicking <a title="'+title+'" href="'+link+'">here</a>.');
            }
        });
    });
}