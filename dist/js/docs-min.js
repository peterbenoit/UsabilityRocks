function makeSVG(){$('.icon-grid img[src$=".svg"]').each(function(e){var t=$(this),a=t.parent(),i=t.attr("src"),r=(t.prop("attributes"),t.attr("alt"));$.get({url:i,cache:!1}).then(function(e){$svg=$(e).find("svg"),$svg=$svg.removeAttr("xmlns:a"),t.replaceWith($svg),a.append("<p>"+r+"</p>")},"xml")}),$("#fg").show().spectrum({showPaletteOnly:!0,togglePaletteOnly:!0,preferredFormat:"hex",color:"#005eaa",showPalette:!0,palette:[["#ffffff","#000000","#333","#555","#bdbdbd","#e0e0e0","#f0f0f0","#f5f5f5","#005eaa","#88c3ea","#c0e9ff","#712177","#b890bb","#e3d3e4","#00695c","#4ebaaa","#ceece7","#bb4d00","#ffad42","#ffe97d"]],move:function(e){$("head").append('<style type="text/css"></style>');$("head").children(":last").html(".fill-p{fill: "+e.toHexString()+"!important; }")}}),$("#bg").show().spectrum({showPaletteOnly:!0,togglePaletteOnly:!0,preferredFormat:"hex",color:"#f0f0f0",showPalette:!0,palette:[["#ffffff","#000000","#333","#555","#bdbdbd","#e0e0e0","#f0f0f0","#f5f5f5","#005eaa","#88c3ea","#c0e9ff","#712177","#b890bb","#e3d3e4","#00695c","#4ebaaa","#ceece7","#bb4d00","#ffad42","#ffe97d"]],move:function(e){$("head").append('<style type="text/css"></style>');$("head").children(":last").html(".icon-grid img, .icon-grid svg { background: "+e.toHexString()+"!important; }")}})}function searchCallback(e,t){if(e)console.error(e);else{var a="";for(i=0;i<t.hits.length;i++)a+='<li><a href="'+t.hits[i].page_url+'">'+t.hits[i].page_name+"</a></li>";$("#search-results").html(a)}}function iconsort(){var e=$(".icon-grid"),t=e.children("div").children("svg").get();"asc"===sortdir?(t.sort(function(e,t){return $(t).find("title").text().trim().toUpperCase().localeCompare($(e).find("title").text().trim().toUpperCase())}),sortdir="desc"):(t.sort(function(e,t){return $(e).find("title").text().trim().toUpperCase().localeCompare($(t).find("title").text().trim().toUpperCase())}),sortdir="asc"),e.empty(),$.each(t,function(t,a){e.append(a)}),$(".icon-grid svg").each(function(e,t){$(t).wrap("<div>").after("<p>"+$(t).find("title").text().trim()+"</p>")})}function iconsize(e){var t;"plus"===e?t=(iconwidth+=2)+"px":"minus"===e?t=(iconwidth-=2)+"px":(iconwidth=80,t="80px"),$(".icon-grid img, .icon-grid svg").css({width:t,height:t})}var path=window.location.pathname.split("/").pop();$(".nav a").each(function(){var e=$(this).attr("href");path.substring(0,e.length)===e&&$(this).closest("li").addClass("active")}),$(".buttons a").on("click",function(){var e=$(this).attr("href");return $(this).parent().next("iframe").css("width",e),!1}),$(function(){var e,t,a,i,r,n="";$("h2:not(.demo), h3:not(.demo)").each(function(o,s){e=$(this),t=e.text(),a="#"+e.attr("id"),i=e.prop("nodeName").toLowerCase(),r=i.substr(i.length-1),n+='<li class="toc-entry toc-'+i+'"><a href='+a+">"+t+"</a></li>",r}),$("#sectionnav ul").prepend(n);var o=window.location.hash.substr(1);o.length>0&&document.getElementById(o).scrollIntoView(),$("iframe").each(function(e,t){var a=document.createElement("a");a.text=" Full ",a.href=t.src,a.target="_blank",a.style="padding: 10px",a.className+="rounded-top-right col",$(t).prev().append(a)}),$(".bd-example:not(.prism-ignore)").each(function(){var e=$(this),t=e.html();t.trim().length>0&&e.after('<pre class="language-html"><code>'+$("<div/>").text(t).html()+"</code></pre>")}),$(".bd-example").promise().done(function(){Prism.highlightAll()}),$(".markup textarea").each(function(){var e=$(this);e.after('<pre class="language-html"><code>'+$("<div/>").text(e.val()).html()+"</code></pre>").hide()}),$(".markup textarea").promise().done(function(){Prism.highlightAll()});var s=0;$(".migration textarea").each(function(){var e=$(this);s%2&&e.after('<div class="bd-example">'+e.val()+"</div>"),e.after('<pre class="language-html"><code>'+$("<div/>").text(e.val()).html()+"</code></pre>").hide(),s++}),$(".migration textarea").promise().done(function(){Prism.highlightAll()});var c=window.location.pathname,l=$("a[href='"+c.substring(c.lastIndexOf("/")+1)+"']");"127.0.0.1"===location.hostname||location.hostname,l.length>0&&l.closest(".bd-toc-item").addClass("active");var d=$(".dropdown:first"),h=d.find(".dropdown-menu .active"),f=d.find('[data-toggle="dropdown"]');h.length&&f.text(h.text()),makeSVG()});var client=algoliasearch("G2FUZ82WJ6","6ed2ed9a83a0bd747f2986aa04722cb0"),docs_search=client.initIndex("docs_search");autocomplete("#aa-search-input",{},[{source:autocomplete.sources.hits(docs_search,{hitsPerPage:3}),displayKey:"page_name",templates:{header:'<div class="aa-suggestions-category">Pages</div>',suggestion:function(e){return'<span><a href="'+e.page_url+'">'+e._highlightResult.page_name.value+"</a></span>"}}}]);var sortdir="desc",iconwidth=80;