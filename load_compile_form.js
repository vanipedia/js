// Script will be executed on Compile tab in wiki
function load_compile_form() {
    if(wgAction !== 'edit') {
        /&action=/.test(document.location) ? simple_href() : complex_href();
    } else if(!/compile=true/.test(document.location)) {
        simple_href();
    }

    function simple_href() {
        document.location = document.location.href.replace(/action=.+/, 'action=edit')+"&compile=true";
    }
    function complex_href() {
        var page = document.location.href.replace(/#.+/, '').replace(/.+\/(.+)/, '$1');
        document.location = wgScript+"?title="+page+"&action=edit&compile=true";
    }
}