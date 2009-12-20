/*********************************************************
*   jQuery for Vanipedia Manual images, videos and effects
**********************************************************/

/*
    Zoomimage for images in Vanipedia
    For safety (browser incompatibility, javascript turned-off) I have left the original images from wiki and simply transform them with the script.
    Images must reside both within the wiki and in the /images folder
*/
if (/^Manual/.test(wgPageName)) {

    // Dependencies
    var jquery_dir = '/jquery/';
    document.write('<link rel="stylesheet" media="screen" type="text/css" href="'+$jquery_dir+'zoomimage/css/zoomimage.css" />');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'zoomimage/js/eye.js"></script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'zoomimage/js/utils.js"></script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'zoomimage/js/zoomimage.js"></script>');
    document.write('<script type="text/javascript" src="'+$jquery_dir+'flashdetect.js"></script>');

    $(document).ready(function() {
        // Manual:Main page slideToggles
        $('.m_main_desc').hide();
        $('.m_main_heading').mouseover(function() {
            desc = $(this).attr('id');
            desc = desc.replace(/_h_/, '_d_');
            $('#'+desc).slideToggle('medium');
        });
        // Manual toogle Expand/Collapse All
        $('#toggle_divs').wrap('<a title="click to expand and collapse all descriptions"></a>')
        .css({cursor: "pointer", color: "#51CD51", "float": "right" })
        .toggle(function() {
            $('.m_main_desc').slideDown('medium');
            $(this).text('Collapse All');
        },function() {
            $('.m_main_desc').slideUp('medium');
            $(this).text('Expand All');
            })
        // implement zoomimage to images in the Manual
        $('.img_container a').each(function() {
            $(this).addClass("man_img");
            var ref = this.href.replace(/.+?Image:(.+)/, "/images/$1").toLowerCase();
            $(this).attr("href", ref);
        }).children('img').each(function() {
            var w = Math.round( $(this).attr("width") / 2);
            var h = Math.round( $(this).attr("height") / 2);
            $(this).attr("width", w);
            $(this).attr("height", h);
            $(this).parent().zoomimage({
                        centered: true,
                        shadow: 5,
                        controls: false,
                        caption: false
            });
        });
        // Manual CSS
        var introduction_color = 'rgb(111, 223, 223)';
        var compiling_process_color = 'rgb(100, 149, 237)';
        var creating_categories_color = 'rgb(255, 159, 208)';
        var creating_pages_color = 'rgb(253, 245, 230)';
        var tutoring_color = 'rgb(191, 155, 207)';
        var tools_color = 'rgb(175, 255, 95)';
        var troubleshooting_color = 'rgb(143, 191, 164)';
        if(/^Manual:/.test(wgPageName)) {
            var color = wgPageName.replace(/Manual:(.+)/, '$1'+'_color').toLowerCase().valueOf();
            $('.mw-headline').parent().css({border: "1px solid rgb(163, 176, 191)", "margin-top": "2pt", padding: "0.2em 0.4em", background: eval(color) +"none repeat scroll 0% 50%", "-moz-background-clip": "-moz-initial", "-moz-background-origin": "-moz-initial", "-moz-background-inline-policy": "-moz-initial"});
        }
        // SlideToggles for divs with specific content in the Manual
        $('.div_desc').hide();
        $('.div_title').wrap('<a title="Click to display instructions"></a>').css({cursor: "pointer", color: "#51CD51" }).click(function() {
            var div = $(this).attr('id')+'_desc';
            $('#'+div).slideToggle('medium');
        });
        // Wiki table definitions slideToggle
        $('.wiki_table_desc').hide();
        $('.wiki_table_title').wrap('<a title="Click to display code"></a>').css({cursor: "pointer", color: "#51CD51" }).click(function() {
            var div = $(this).attr('id')+'_desc';
            $('#'+div).slideToggle('medium');
        });
        // wiki_markup_table slideToggle
        $('#wiki_markup_table_desc').hide();
        $('#wiki_markup_table').wrap('<a title="Click to display wiki markup table"></a>').css({cursor: "pointer", color: "#51CD51" }).click(function() {
            var div = $(this).attr('id')+'_desc';
            $('#'+div).slideToggle('medium');
        });
        // Css to make headings the same as Manual:Main according to each

        // Flash detection for Manual
        if (!flashdetect([8,0,0])) {
            $('.flash_warning').html('If your session times out during a long editing session, you may be logged out. We have developed a system that will automatically save all your compilation data in the clipboard. The only requirement is that you have installed the latest version of Macromedia Flash. Until you update your Flash plugin the only way to avoid loosing your data in a session timeout is:<br>1.  Place your cursor in the Edit Box<br>2.  Select all the text (Control-a)<br>3.  Copy (Control-c)<br>4.  Press the "Save page" button.');
            $('.flash_detected').html('Your flash plugin should be updated to the latest version by clicking <a href="http://www.adobe.com/products/flashplayer/">here</a> in order to have automated copy to clipboard functionality.')
            $('<span class="flash_warning2">Note: In order to properly view the videos in this manual, you must update your version of Macromedia flash player to the latest version by visiting <a href="http://www.adobe.com/products/flashplayer/">this link</a>. Your flash plugin is <b>'+navigator.plugins["Shockwave Flash"].description+'</b>.</span>').css('color', 'red').appendTo('#bodyContent');
        } else {
            $('.flash_warning').html('If your session times out during a long editing session, you may be logged out. We have developed a system that will automatically save all your compilation data in the clipboard using your flash plugin. In the case of a timeout all you have to do is:<br>1.  Place your cursor in the Edit Box<br>2.  Select all the text (Control-a)<br>3.  Paste (Control-v)<br>4.  Press the "Save page" button.<br>If this doesn\'t work and you arrived again to the error page, you most likely were logged-out. Simply log back in, go back to the page you were compiling and follow the steps above.');
            $('.flash_detected').html('Your flash plugin is <b>'+navigator.plugins["Shockwave Flash"].description+'</b>. This version will allow automated copy to clipboard functionality.');
        }
    });
}
