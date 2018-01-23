!function(t,e,n,o){"use strict";function i(e,n){this.element=e,this.options=t.extend({},u,n),this._defaults=u,this._name=s,this.init()}var s="audioly",u={element:""};i.prototype={init:function(){var e=this._defaults;e.this=this,e.element=this.element,e.status=0,this.bindControls(),t(".progress").css("width",t(".audio-player").width()+"px"),e.element.addEventListener("timeupdate",function(){var n=(e.element.currentTime+.25)/e.element.duration*100;t(".progress-bar").css("width",n+"%").attr("aria-valuenow",n)})},bindControls:function(){t(".btn-play").on("click",function(){u.this.play()}),t(".btn-stop").on("click",function(){u.this.stop()}),t(".btn-restart").on("click",function(){u.this.goto(0)}),t(".btn-back-5").on("click",function(){u.this.goto(u.element.currentTime-5)}),t(".btn-forward-5").on("click",function(){u.this.goto(u.element.currentTime+5)}),t(".btn-back-1").on("click",function(){u.this.goto(u.element.currentTime-1)}),t(".btn-forward-1").on("click",function(){u.this.goto(u.element.currentTime+1)}),t(".btn-volume-up").on("click",function(){u.this.volume("up")}),t(".btn-volume-down").on("click",function(){u.this.volume("down")}),t("#range-slider").on("change",function(){u.element.volume=t(this).val()/10})},play:function(){0==u.status||2==u.status?(u.element.play(),t(".btn-play span").attr("class","fa fa-pause aligned"),u.status=1):1==u.status&&(u.element.pause(),t(".btn-play span").attr("class","fa fa-play aligned"),u.status=2)},stop:function(){u.element.pause(),u.this.goto(0),t(".btn-play span").attr("class","fa fa-play aligned"),u.status=0},goto:function(t){u.element.currentTime=t},volume:function(t){var e=u.element.volume;"up"==t?Math.round(10*e)/10>=1?u.element.volume=1:u.element.volume+=.1:Math.round(10*e)/10<=0?u.element.volume=0:u.element.volume-=.1}},t.fn[s]=function(e){return this.each(function(){t.data(this,"plugin_"+s)||t.data(this,"plugin_"+s,new i(this,e))})}}(jQuery,window,document),jQuery().audioly?$("audio").audioly():console.error?console.error("The Bootstrap 4 Audio plugin is required."):console.log("The Bootstrap 4 Audio plugin is required.");