function wpTextboxReplace()
{
    var s = prompt("Text to replace:");
    if(s){
        var r = prompt("Replace /"+s+"/ with:");
        if(!r && r != '') return;
        var txt = document.editform.wpTextbox1;
        txt.value = txt.value.replace(new RegExp(s, "mg"), r);
    }
}