$(function(){$(".dot").each(function(t){$(this).text(t+1).parent().addClass("borderriffic")})}),$(window).on("load resize",_.throttle(function(t){$('.grid-demo div[class^="col"]').each(function(){var t=$(this);t.text(t.width()+"px")})},100));