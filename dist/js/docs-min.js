function makeSVG(){$('.icon-grid img[src$=".svg"]').each(function(e){var t=$(this),a=t.attr("src"),i=t.prop("attributes");$.get({url:a,cache:!1}).then(function(e){$svg=$(e).find("svg"),$svg=$svg.removeAttr("xmlns:a"),$.each(i,function(){$svg.attr(this.name,this.value)}),t.replaceWith($svg)},"xml")}),$("#fg").show().spectrum({showPaletteOnly:!0,togglePaletteOnly:!0,preferredFormat:"hex",color:"#005eaa",showPalette:!0,palette:[["#ffffff","#000000","#333","#555","#bdbdbd","#e0e0e0","#f0f0f0","#f5f5f5","#005eaa","#88c3ea","#c0e9ff","#712177","#b890bb","#e3d3e4","#00695c","#4ebaaa","#ceece7","#bb4d00","#ffad42","#ffe97d"]],move:function(e){$("head").append('<style type="text/css"></style>');$("head").children(":last").html(".fill-p{fill: "+e.toHexString()+"!important; }")}}),$("#bg").show().spectrum({showPaletteOnly:!0,togglePaletteOnly:!0,preferredFormat:"hex",color:"#f0f0f0",showPalette:!0,palette:[["#ffffff","#000000","#333","#555","#bdbdbd","#e0e0e0","#f0f0f0","#f5f5f5","#005eaa","#88c3ea","#c0e9ff","#712177","#b890bb","#e3d3e4","#00695c","#4ebaaa","#ceece7","#bb4d00","#ffad42","#ffe97d"]],move:function(e){$("head").append('<style type="text/css"></style>');$("head").children(":last").html(".icon-grid img, .icon-grid svg { background: "+e.toHexString()+"!important; }")}})}function searchCallback(e,t){if(e)console.error(e);else{var a="";for(i=0;i<t.hits.length;i++)a+='<li><a href="'+t.hits[i].page_url+'">'+t.hits[i].page_name+"</a></li>";$("#search-results").html(a)}}function iconsort(){var e=$(".icon-grid"),t=e.children("div").children("svg").get();"asc"===sortdir?(t.sort(function(e,t){return $(t).find("title").text().trim().toUpperCase().localeCompare($(e).find("title").text().trim().toUpperCase())}),sortdir="desc"):(t.sort(function(e,t){return $(e).find("title").text().trim().toUpperCase().localeCompare($(t).find("title").text().trim().toUpperCase())}),sortdir="asc"),e.empty(),$.each(t,function(t,a){e.append(a)}),$(".icon-grid svg").each(function(e,t){$(t).wrap("<div>").after("<p>"+$(t).find("title").text().trim()+"</p>")})}function iconsize(e){var t;"plus"===e?t=(iconwidth+=2)+"px":"minus"===e?t=(iconwidth-=2)+"px":(iconwidth=80,t="80px"),$(".icon-grid img, .icon-grid svg").css({width:t,height:t})}var path=window.location.pathname.split("/").pop();$(".nav a").each(function(){var e=$(this).attr("href");path.substring(0,e.length)===e&&$(this).closest("li").addClass("active")}),$(".buttons a").on("click",function(){var e=$(this).attr("href");return $(this).parent().next("iframe").css("width",e),!1}),$(function(){var e,t,a,i,n,o="";$("h2:not(.demo), h3:not(.demo)").each(function(r,s){e=$(this),t=e.text(),a="#"+e.attr("id"),i=e.prop("nodeName").toLowerCase(),n=i.substr(i.length-1),o+='<li class="toc-entry toc-'+i+'"><a href='+a+">"+t+"</a></li>",n}),$("#sectionnav ul").prepend(o);var r=window.location.hash.substr(1);r.length>0&&document.getElementById(r).scrollIntoView(),$("iframe").each(function(e,t){var a=document.createElement("a");a.text=" Demo ",a.href=t.src,a.target="_blank",a.style="padding: 10px",a.className+="rounded-top-right col",$(t).prev().append(a)});var s=window.location.pathname,c=$("a[href='"+s.substring(s.lastIndexOf("/")+1)+"']");"127.0.0.1"===location.hostname||location.hostname,c.length>0&&c.closest(".bd-toc-item").addClass("active");var l=$(".dropdown"),d=l.find(".dropdown-menu .active"),f=l.find('[data-toggle="dropdown"]');d.length&&f.text(d.text()),makeSVG()}),$(window).on("load resize scroll",function(e){var t=$("#standard");if(t.length){var a=t.offset().top,i=t.outerWidth()+t.offset().left;$(".ctrl").css({top:a,left:i})}});var client=algoliasearch("G2FUZ82WJ6","6ed2ed9a83a0bd747f2986aa04722cb0"),docs_search=client.initIndex("docs_search");autocomplete("#aa-search-input",{},[{source:autocomplete.sources.hits(docs_search,{hitsPerPage:3}),displayKey:"page_name",templates:{header:'<div class="aa-suggestions-category">Pages</div>',suggestion:function(e){return'<span><a href="'+e.page_url+'">'+e._highlightResult.page_name.value+"</a></span>"}}}]);var sortdir="desc",iconwidth=80;