/*!
 * NETEYE Touch-Gallery jQuery Plugin
 *
 * Copyright (c) 2010 NETEYE GmbH
 * Licensed under the MIT license
 *
 * Author: Felix Gnass [fgnass at neteye dot de]
 * Version: @{VERSION}
 */
(function(e){function n(t,n,i){n.activity();var s=new Image;s.onload=function(){n.activity(!1),r(t,t.index(n),this,i.getSource)},s.src=e.proxy(i.getSource,n.get(0))()}function r(t,n,r,i){var a=p(x(e('<div id="galleryViewport">').css({position:"fixed",top:0,left:0,overflow:"hidden"}).transform(!1).appendTo("body"))),f=e('<div id="galleryStripe">').css({position:"absolute",height:"100%",top:0,left:-n*y()+"px"}).width(t.length*y()).transform(!1).appendTo(a);h(f,y(),n,t.length-1),e(window).bind("orientationchange.gallery",function(){p(a),f.find("img").each(o)}),t.each(function(l){var h=e("<div>").addClass("galleryPage").css({display:"block",position:"absolute",left:l*y()+"px",overflow:"hidden",height:"100%"}).width(y()).data("thumbs",t).data("thumb",e(this)).transform(!1).appendTo(f);if(l==n){var p=e(r).css({position:"absolute",display:"block"}).transform(!1);E(o(n,r,p)).appendTo(h),u(e(this),p,function(){f.addClass("ready"),c(n)}),s(a)}else{h.activity({color:"#fff"});var d=new Image,v=e.proxy(i,this)();h.one("loadImage",function(){d.src=v}),d.onload=function(){var t=e(this).css({position:"absolute",display:"block"}).transform(!1);o(l,this,t).appendTo(h.activity(!1)),h.trigger("loaded")}}})}function i(t){if(t.is(".ready")&&!t.is(".panning")){e("#galleryShade").remove();var n=t.find(".galleryPage").eq(t.data("galleryIndex"));n.data("thumbs").removeClass("open");var r=n.data("thumb");t.add(window).add(document).unbind(".gallery"),a(n.find("img"),r,function(){w(r).transform(!1),e("#galleryViewport").remove()})}}function s(n,r){var i=e('<div id="galleryShade">').css({top:0,left:0,background:"#000",opacity:0});if(t){var s=Math.max(screen.width,screen.height)*(window.devicePixelRatio||1)+Math.max(g(),m())+100;i.css({position:"absolute"}).width(s).height(s)}else i.css({position:"fixed",width:"100%",height:"100%"});i.insertBefore(n).transform(!1).transition({opacity:1},{delay:200,duration:.8,onFinish:r})}function o(t,n,r){r=r||e(n),n.naturalWidth||(n.naturalWidth=n.width,n.naturalHeight=n.height);var i=Math.min(d(),Math.min(b()/n.naturalHeight,y()/n.naturalWidth));return r.css({top:Math.round((b()-n.naturalHeight*i)/2)+"px",left:Math.round((y()-n.naturalWidth*i)/2)+"px"}).width(Math.round(n.naturalWidth*i)),r}function u(e,n,r){var i=S(n),s=S(e),o=Math.max(s.width/n.width(),s.height/n.height()),u=t?0:g(),a=t?0:m();n.transform({translate:{x:s.left-i.left-u-Math.round((i.width*o-s.width)/2),y:s.top-i.top-a-Math.round((i.height*o-s.height)/2)},scale:o}),setTimeout(function(){w(n),E(e),n.transformTransition({reset:!0,onFinish:r})},1)}function a(t,n,r){if(t.length===0||!e.fn.transition.supported){r&&r();return}var i=S(t),s=S(n),o=Math.min(i.height*s.width/s.height,i.width),u=Math.min(i.width*s.height/s.width,i.height),a=Math.max(s.width/o,s.height/u),f=e("<div>").css({overflow:"hidden",position:"absolute",width:o+"px",height:u+"px",top:m()+Math.round((b()-u)/2)+"px",left:g()+Math.round((y()-o)/2)+"px"}).appendTo("body").append(t.css({top:1-Math.floor((i.height-u)/2)+"px",left:-Math.floor((i.width-o)/2)+"px"})).transform(!1);i=S(f),f.transformTransition({translate:{x:s.left-i.left-Math.round((o*a-s.width)/2),y:s.top-i.top-Math.round((u*a-s.height)/2)},scale:a,onFinish:function(){r(),f.remove()}})}function f(t){return e("#galleryStripe .galleryPage").eq(t)}function l(e){return f(e).data("thumb")}function c(e){function n(){f(e-1).add(f(e+1)).trigger("loadImage")}var t=f(e);t.find("img").length>0?n():t.one("loaded",n)}function h(t,n,r,s){function a(r){var i=t.data("galleryIndex");w(l(i)),i=Math.max(0,Math.min(i+r,s)),t.data("galleryIndex",i),E(l(i)),c(i);if(e.fn.transform.supported){var o=-i*n-u;o!=t.transform().translate.x&&t.addClass("panning").transformTransition({translate:{x:o},onFinish:function(){this.removeClass("panning")}})}else t.css("left",-i*n+"px")}var o=d(),u=parseInt(t.css("left"),10);t.data("galleryIndex",r),e(document).bind("keydown.gallery",function(e){return e.keyCode==37?t.trigger("prev"):e.keyCode==39&&t.trigger("next"),(e.keyCode==27||e.keyCode==32)&&t.trigger("close"),!1}),t.bind("touchstart",function(){return e(this).data("pan",{startX:event.targetTouches[0].screenX,lastX:event.targetTouches[0].screenX,startTime:(new Date).getTime(),startOffset:e(this).transform().translate.x,distance:function(){return Math.round(o*(this.startX-this.lastX))},delta:function(){var e=event.targetTouches[0].screenX;this.dir=this.lastX>e?1:-1;var t=Math.round(o*(this.lastX-e));return this.lastX=e,t},duration:function(){return(new Date).getTime()-this.startTime}}),!1}).bind("touchmove",function(){var t=e(this).data("pan");return e(this).transform({translateBy:{x:-t.delta()}}),!1}).bind("touchend",function(){var t=e(this).data("pan");return t.distance()===0&&t.duration()<500?e(event.target).trigger("click"):a(t.dir),!1}).bind("prev",function(){a(-1)}).bind("next",function(){a(1)}).bind("click close",function(){i(t)})}function p(e){return t&&e.css({top:m()+"px",left:g()+"px"}),e.width(y()).height(b())}function d(){return y()/document.documentElement.clientWidth}function v(e,t){if(window[e]!==undefined)return window[e];var n=document.documentElement;return n&&n[t]?n[t]:document.body[t]}function m(){return v("pageYOffset","scrollTop")}function g(){return v("pageXOffset","scrollLeft")}function y(){return v("innerWidth","clientWidth")}function b(){return v("innerHeight","clientHeight")}function w(e){return e.css("visibility","visible")}function E(e){return e.css("visibility","hidden")}function S(t){var n=t.get(0);return n&&n.getBoundingClientRect?n.getBoundingClientRect():e.extend({width:t.width(),height:t.height()},t.offset())}function x(e){return e.bind("touchstart",function(){return!1})}var t=/Mobile.*Safari/.test(navigator.userAgent);e.fn.touchGallery=function(t){t=e.extend({},e.fn.touchGallery.defaults,t);var r=this;return this.live("click",function(i){i.preventDefault();var s=e(this);s.is(".open")||(r.addClass("open"),n(r,s,t))}),this},e.fn.touchGallery.defaults={getSource:function(){return this.href}}})(jQuery);