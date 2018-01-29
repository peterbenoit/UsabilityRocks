!function(t,e,n,o){"use strict";var i="audioly",s={element:""};function u(e,n){this.element=e,this.options=t.extend({},s,n),this._defaults=s,this._name=i,this.init()}u.prototype={init:function(){var e=this._defaults;e.this=this,e.element=this.element,e.status=0,this.bindControls(),t(".progress").css("width",t(".audio-player").width()+"px"),e.element.addEventListener("timeupdate",function(){var n=(e.element.currentTime+.25)/e.element.duration*100;t(".progress-bar").css("width",n+"%").attr("aria-valuenow",n)})},bindControls:function(){t(".btn-play").on("click",function(){s.this.play()}),t(".btn-stop").on("click",function(){s.this.stop()}),t(".btn-restart").on("click",function(){s.this.goto(0)}),t(".btn-back-5").on("click",function(){s.this.goto(s.element.currentTime-5)}),t(".btn-forward-5").on("click",function(){s.this.goto(s.element.currentTime+5)}),t(".btn-back-1").on("click",function(){s.this.goto(s.element.currentTime-1)}),t(".btn-forward-1").on("click",function(){s.this.goto(s.element.currentTime+1)}),t(".btn-volume-up").on("click",function(){s.this.volume("up")}),t(".btn-volume-down").on("click",function(){s.this.volume("down")})},play:function(){0==s.status||2==s.status?(s.element.play(),t(".btn-play span").attr("class","fa fa-pause aligned"),s.status=1):1==s.status&&(s.element.pause(),t(".btn-play span").attr("class","fa fa-play aligned"),s.status=2)},stop:function(){s.element.pause(),s.this.goto(0),t(".btn-play span").attr("class","fa fa-play aligned"),s.status=0},goto:function(t){s.element.currentTime=t},volume:function(t){var e=s.element.volume;"up"==t?Math.round(10*e)/10>=1?s.element.volume=1:s.element.volume+=.1:Math.round(10*e)/10<=0?s.element.volume=0:s.element.volume-=.1}},t.fn[i]=function(e){return this.each(function(){t.data(this,"plugin_"+i)||t.data(this,"plugin_"+i,new u(this,e))})}}(jQuery,window,document),jQuery().audioly?$("audio").audioly():console.error?console.error("The Bootstrap 4 Audio plugin is required."):console.log("The Bootstrap 4 Audio plugin is required.");