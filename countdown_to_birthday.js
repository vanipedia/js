/*****************************************************************
 *    Countdown to October 4th 2015 for Vanipedia final birthdate
 *    ************************************************************/

$(document).ready(function() {
    // new Date(year, mth - 1, day, hr, min, sec) - date/time to count down to
    // birthday is October 4th 2015
    var birthdate = new Date(2015, 9, 4);
    //format: 'dHMS', // Format for display - upper case for always, lower case only if non-zero,
    // 'Y' years, 'O' months, 'W' weeks, 'D' days, 'H' hours, 'M' minutes, 'S' seconds
    $('#countdown').countdown({ until: birthdate, format: 'YODHMS' });
});