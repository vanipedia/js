/**********************************************
 *	Flashdetect based on swfObject 2.0.
 *	Flashdetect returns true/false depending on the minimum
 *	version that you require for you your player, etc.
 *	usage:	minVersionRequired = ([7,0,0])
 *			if (flashdetect(minVersionRequired) {
 *				// Good to go!!
 *			} else {
 *				// You need to update your version of flash! :(
 *			}
 ***********************************************/

// variables for flashdetect
var flashMinVersion = [8,0,0];
var flashDetectedVersion = [0,0,0];

flashdetect = function( minVersion ){
	// Flash detection
	// Based on swfObject 2.0: http://code.google.com/p/swfobject/
	var d = null;
	if (typeof navigator.plugins != "undefined" && typeof navigator.plugins["Shockwave Flash"] == "object") {
		d = navigator.plugins["Shockwave Flash"].description;
		if (d) {
			// Got Flash, parse version
			d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
			flashDetectedVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
			flashDetectedVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
			if ( /r/.test(d) ) {
				flashDetectedVersion[2] = parseInt(d.replace(/^.*r(.*)$/, "$1"), 10);
			} else {
				flashDetectedVersion[2] = 0;
			}
			if (flashDetectedVersion[0] > minVersion[0] || (flashDetectedVersion[0] == minVersion[0] && flashDetectedVersion[1] > minVersion[1]) || (flashDetectedVersion[0] == minVersion[0] && flashDetectedVersion[1] == minVersion[1] && flashDetectedVersion[2] >= minVersion[2])){
				// Version ok
				return true;
			} else {
				// Version too old
				return false;
			}
		}
	}
	// No Flash detected
	return false;
};