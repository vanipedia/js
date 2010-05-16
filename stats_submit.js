/**********************************************************************************
 *  Statistics jQuery script
 *  Will send the quotes by sections stats and page number to a php script on the server that will
 *  produce a "Total of totals" by maintainig a mysql table with this data.
 **********************************************************************************/
if (wgAction == 'view' && wgNamespaceNumber === 0) {
    $php_dir = '/php/';
    $(document).ready(function() {
        /*** Update results ***/
        //Query results if page == Main Page
        if (wgArticleId == 1) {
            get_stats();
            setInterval('get_stats()', 300000); // Update totals in Main Page every 5mins
        } else {
            /*** Submition ***/
            // Get stats from table
            $('.smwprops').each(function() {
                if(/BG:/.test(this.textContent)) {
                    stats = this.textContent;
                }
            });
            // Post to php script in server
            if (typeof stats != 'undefined' ) {
                $.get($php_dir+"vani-stats.php", { pageId: wgArticleId, page_stats: stats });
            }
        }
    });
} // End of if (wgAction == edit)

function get_stats() {
    $.getJSON($php_dir+"vani-stats.php",
        { t: "Total" },
        function(json) {
            var BG = json.BG;
            var SB = json.SB;
            var CC = json.CC;
            var OB = json.OB;
            var LEC = json.LEC;
            var LET = json.LET;
            var CON = json.CON;
            var Total_of_totals = json.TOTAL;
            var CATS = json.CATS;
            var PAGES = json.PAGES;
            var COMPLETE = json.COMPLETE;
            var INCOMPLETE = json.INCOMPLETE;

            var q_goal = num($('#quotes-goal').text());
            var p_goal = num($('#pages-goal').text());
            var q_goal_percent = parseInt( (num(Total_of_totals)/q_goal) * 100);
            var p_goal_percent = parseInt( (num(PAGES)/p_goal) * 100);

            $('span#bg-stats').text(BG);
            $('span#sb-stats').text(SB);
            $('span#cc-stats').text(CC);
            $('span#ob-stats').text(OB);
            $('span#lec-stats').text(LEC);
            $('span#let-stats').text(LET);
            $('span#con-stats').text(CON);
            $('span#total-stats').text(Total_of_totals);
            $('span#cats-stats').text(CATS);
            $('span#pages-stats').text(PAGES);
            $('span#pages-complete').text(COMPLETE);
            $('span#pages-incomplete').text(INCOMPLETE);
            $('#quotes-goal-percent').text(q_goal_percent);
            $('#pages-goal-percent').text(p_goal_percent);
        }
    );
}

// Convert to number by removing comma(,) or period(.) and returning int number
function num(n) {
    return parseInt(n.replace(/[,.]/g, ''));
}
