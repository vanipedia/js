/***********************************
 *      Detector of Indevr font to
 *      apply to devanagari verses in
 *      BG, SB, etc
 *      *****************************/
$(document).ready(function() {
    // if indevr has not been defined
    if($.cookie('indevr') == null) {
        var indevr_detect = new Detector();
        $.cookie('indevr', indevr_detect.test("Indevr"));
    }
    // If system has Indevr font apply it else hide the devanagari
    $.cookie('indevr') ? $("#devanagari").css('font-family', 'Indevr') : $("#devanagari").hide();
});
