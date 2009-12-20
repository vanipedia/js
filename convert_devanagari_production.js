$(document).ready(function(){$(".verse_div").one("mouseenter",function(){$(".verse, .sanskrit_uni",this).editable(function(b){if(b.match(/\)$/m)){b=fix_numbers(b)}return b},{type:"textarea",onblur:"submit",placeholder:"",callback:function(){if(this.className==="verse"){update_sanskrit(this)}}})});$(".update_sanskrit").click(function(){update_sanskrit(this)});$(".fix_numbers").click(function(){var g,e,d,c,b,f;message("Fixing numbers...");g=$(this).siblings(".indevr");e=$(this).siblings(".sanskrit_uni");if(e.html()===""){alert("Missing Unicode Sanskrit. Click Get Devanagari");return}d=g.html().split(/<br\/?>/);c=e.html().split(/\n/);if(d.length===c.length){$.each(d,function(j,h){if(h.match(/\)+$/m)){b=h.match(/( (?:\)\) \d+ \))*\))/)[1];b=fix_numbers(b);c[j]+=b}});f=c.join("\n");if(e.html()!==f){e.html(f)}}else{alert("Original sanskrit is not equal to unicode sanskrit!")}});var a='<div id="tools"><div id="ajax"><span id="msg"></span><br/><img src="/css/indicator.gif"></img></div><div id="zoom_all" title="Turn automatic zoom on/off">Zoom</div><div id="zoom"><div id="zoom_minus" class="zoom_b" title="zoom in">-</div><div id="zoom_plus" class="zoom_b" title="zoom out">+</div></div>';"</div>";$(a).appendTo("#bodyContent");$("#tools_toggle").toggle(function(){$("#tools").fadeIn()},function(){$("#tools").fadeOut()});$("#ajax").ajaxStart(function(){if($("#tools").is(":visible")){ajax_ui("show")}}).ajaxStop(function(){if($("#tools").is(":visible")){ajax_ui("hide")}});$(".save").click(function(){if(!check_before_save(this)){return}$("#ajax > #msg").text("Saving...");$(this).siblings(".status").addClass("saving");$.get("/php/convert_devanagari_save.php",{title:$(this).siblings(".id").text(),sanskrit_uni:$(this).siblings(".sanskrit_uni").text()},function(b){saved()})});$("#zoom_all").toggle(function(){var b;$(this).text("Zoom Off").css({color:"white",opacity:""});$(".verse_div").css({"font-size":"","line-height":"",width:""});$(".verse_div").bind("mouseenter",enter_verse).bind("mouseleave",out_verse)},function(){$(this).text("Zoom On").css({color:"",opacity:"0.7"});$(".verse_div").unbind("mouseenter",enter_verse).unbind("mouseleave",out_verse)});$(".zoom_b").mousedown(function(){$(this).css("color","white")}).mouseup(function(){zoom_off();$(this).css("color","");$(this).attr("id")==="zoom_plus"?zoom("in"):zoom("out")});$("#more").click(function(){window.location.reload(true)});$(".desc_handle").toggle(function(){var b;b="#"+$(this).attr("id")+"_desc";$(b).slideDown()},function(){desc="#"+$(this).attr("id")+"_desc";$(desc).slideUp()})});function translate_diCrunch(a,c){var b;$.get("/php/diCrunch-request.php",{key:a},function(d){b=$("#source",d).val();$(c).siblings(".sanskrit_uni").html(b)})}function update_sanskrit(b){var a;$("#ajax > #msg").text("Fetching devanagari...");a=b.className==="verse"?clean_for_submit($(b).html()):clean_for_submit($(b).siblings(".verse").html());translate_diCrunch(a,b)}function clean_for_submit(a){a=a.replace(/-/g,"");a=a.replace(/ '/g,"");return a}function fix_numbers(a){a=a.replace(/ \)\)( |$)/mg," ॥ ");a=a.replace(/ \)( |$)/mg," । ");a=a.replace(/0/g,"०");a=a.replace(/1/g,"१");a=a.replace(/2/g,"२");a=a.replace(/3/g,"३");a=a.replace(/4/g,"४");a=a.replace(/5/g,"५");a=a.replace(/6/g,"६");a=a.replace(/7/g,"७");a=a.replace(/8/g,"८");a=a.replace(/9/g,"९");return a}function message(a){if($("#tools").is(":hidden")){return}$("#ajax > #msg").text(a);ajax_ui("show");setTimeout(function(){ajax_ui("hide")},800)}function saved(a){disable($(".saving").parent())}function disable(a){$(".status",a).removeClass("saving").text("saved");$(a).css({opacity:"0.5"});$(a).children().attr("disabled","disabled")}function check_before_save(a){var b;b=$(a).siblings(".sanskrit_uni");if(b.html()===""){alert("Missing Unicode Sanskrit. Click Get Devanagari");return false}if(!/ ।/.test(b.html())){alert("Missing numbers in Unicode Sanskrit. Click Fix Numbers to get numbers.");return false}return true}function ajax_ui(a){a==="show"?$("#ajax").slideDown():$("#ajax").slideUp("slow")}function zoom(e){var d,a,c,b;d=$(".verse_div:last");a=Number(d.css("font-size").match(/\d+/));c=Number(d.css("line-height").match(/\d+/));b=Number(d.css("width").match(/\d+/));if(e==="in"){$(".verse_div").css({"font-size":a+2+"px","line-height":c+6+"px",width:b+50+"px"})}else{$(".verse_div").css({"font-size":a-2+"px","line-height":c-6+"px",width:b-50+"px"})}}function zoom_off(){if($("#zoom_all").text().match(/off/i)){$("#zoom_all").click()}}function enter_verse(){var a=this;$(this).addClass("focused").removeClass("unfocused");setTimeout(function(){if($(a).hasClass("focused")){$(a).css({"font-size":"1.2em","line-height":"1.5"});$(a).animate({width:"600px"})}},300)}function out_verse(){var a=this;$(this).addClass("unfocused").removeClass("focused");setTimeout(function(){if($(a).hasClass("unfocused")){$(a).removeClass("unfocused");$(a).css({"font-size":"","line-height":""});$(a).animate({width:"500px"})}},800)};