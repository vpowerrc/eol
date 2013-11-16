/*
 * jPlayer Plugin for jQuery JavaScript Library
 * http://www.happyworm.com/jquery/jplayer
 *
 * Copyright (c) 2009 - 2010 Happyworm Ltd
 * Dual licensed under the MIT and GPL licenses.
 *  - http://www.opensource.org/licenses/mit-license.php
 *  - http://www.gnu.org/copyleft/gpl.html
 *
 * Author: Mark J Panaghiston
 * Version: 2.0.0
 * Date: 20th December 2010
 */
(function(e,t){e.fn.jPlayer=function(n){var r=typeof n=="string",i=Array.prototype.slice.call(arguments,1),s=this;return n=!r&&i.length?e.extend.apply(null,[!0,n].concat(i)):n,r&&n.charAt(0)==="_"?s:(r?this.each(function(){var r=e.data(this,"jPlayer"),o=r&&e.isFunction(r[n])?r[n].apply(r,i):r;if(o!==r&&o!==t)return s=o,!1}):this.each(function(){var t=e.data(this,"jPlayer");t?(t.option(n||{})._init(),t.option(n||{})):e.data(this,"jPlayer",new e.jPlayer(n,this))}),s)},e.jPlayer=function(t,n){if(arguments.length){this.element=e(n),this.options=e.extend(!0,{},this.options,t);var r=this;this.element.bind("remove.jPlayer",function(){r.destroy()}),this._init()}},e.jPlayer.event={ready:"jPlayer_ready",resize:"jPlayer_resize",error:"jPlayer_error",warning:"jPlayer_warning",loadstart:"jPlayer_loadstart",progress:"jPlayer_progress",suspend:"jPlayer_suspend",abort:"jPlayer_abort",emptied:"jPlayer_emptied",stalled:"jPlayer_stalled",play:"jPlayer_play",pause:"jPlayer_pause",loadedmetadata:"jPlayer_loadedmetadata",loadeddata:"jPlayer_loadeddata",waiting:"jPlayer_waiting",playing:"jPlayer_playing",canplay:"jPlayer_canplay",canplaythrough:"jPlayer_canplaythrough",seeking:"jPlayer_seeking",seeked:"jPlayer_seeked",timeupdate:"jPlayer_timeupdate",ended:"jPlayer_ended",ratechange:"jPlayer_ratechange",durationchange:"jPlayer_durationchange",volumechange:"jPlayer_volumechange"},e.jPlayer.htmlEvent=["loadstart","abort","emptied","stalled","loadedmetadata","loadeddata","canplaythrough","ratechange"],e.jPlayer.pause=function(){e.each(e.jPlayer.prototype.instances,function(e,t){t.data("jPlayer").status.srcSet&&t.jPlayer("pause")})},e.jPlayer.timeFormat={showHour:!1,showMin:!0,showSec:!0,padHour:!1,padMin:!0,padSec:!0,sepHour:":",sepMin:":",sepSec:""},e.jPlayer.convertTime=function(t){t=new Date(t*1e3);var n=t.getUTCHours(),r=t.getUTCMinutes();return t=t.getUTCSeconds(),n=e.jPlayer.timeFormat.padHour&&n<10?"0"+n:n,r=e.jPlayer.timeFormat.padMin&&r<10?"0"+r:r,t=e.jPlayer.timeFormat.padSec&&t<10?"0"+t:t,(e.jPlayer.timeFormat.showHour?n+e.jPlayer.timeFormat.sepHour:"")+(e.jPlayer.timeFormat.showMin?r+e.jPlayer.timeFormat.sepMin:"")+(e.jPlayer.timeFormat.showSec?t+e.jPlayer.timeFormat.sepSec:"")},e.jPlayer.uaMatch=function(e){e=e.toLowerCase();var t=/(opera)(?:.*version)?[ \/]([\w.]+)/,n=/(msie) ([\w.]+)/,r=/(mozilla)(?:.*? rv:([\w.]+))?/;return e=/(webkit)[ \/]([\w.]+)/.exec(e)||t.exec(e)||n.exec(e)||e.indexOf("compatible")<0&&r.exec(e)||[],{browser:e[1]||"",version:e[2]||"0"}},e.jPlayer.browser={};var n=e.jPlayer.uaMatch(navigator.userAgent);n.browser&&(e.jPlayer.browser[n.browser]=!0,e.jPlayer.browser.version=n.version),e.jPlayer.prototype={count:0,version:{script:"2.0.0",needFlash:"2.0.0",flash:"unknown"},options:{swfPath:"js",solution:"html, flash",supplied:"mp3",preload:"metadata",volume:.8,muted:!1,backgroundColor:"#000000",cssSelectorAncestor:"#jp_interface_1",cssSelector:{videoPlay:".jp-video-play",play:".jp-play",pause:".jp-pause",stop:".jp-stop",seekBar:".jp-seek-bar",playBar:".jp-play-bar",mute:".jp-mute",unmute:".jp-unmute",volumeBar:".jp-volume-bar",volumeBarValue:".jp-volume-bar-value",currentTime:".jp-current-time",duration:".jp-duration"},idPrefix:"jp",errorAlerts:!1,warningAlerts:!1},instances:{},status:{src:"",media:{},paused:!0,format:{},formatType:"",waitForPlay:!0,waitForLoad:!0,srcSet:!1,video:!1,seekPercent:0,currentPercentRelative:0,currentPercentAbsolute:0,currentTime:0,duration:0},_status:{volume:t,muted:!1,width:0,height:0},internal:{ready:!1,instance:t,htmlDlyCmdId:t},solution:{html:!0,flash:!0},format:{mp3:{codec:'audio/mpeg; codecs="mp3"',flashCanPlay:!0,media:"audio"},m4a:{codec:'audio/mp4; codecs="mp4a.40.2"',flashCanPlay:!0,media:"audio"},oga:{codec:'audio/ogg; codecs="vorbis"',flashCanPlay:!1,media:"audio"},wav:{codec:'audio/wav; codecs="1"',flashCanPlay:!1,media:"audio"},webma:{codec:'audio/webm; codecs="vorbis"',flashCanPlay:!1,media:"audio"},m4v:{codec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"',flashCanPlay:!0,media:"video"},ogv:{codec:'video/ogg; codecs="theora, vorbis"',flashCanPlay:!1,media:"video"},webmv:{codec:'video/webm; codecs="vorbis, vp8"',flashCanPlay:!1,media:"video"}},_init:function(){var n=this;this.element.empty(),this.status=e.extend({},this.status,this._status),this.internal=e.extend({},this.internal),this.formats=[],this.solutions=[],this.require={},this.htmlElement={},this.html={},this.html.audio={},this.html.video={},this.flash={},this.css={},this.css.cs={},this.css.jq={},this.status.volume=this._limitValue(this.options.volume,0,1),this.status.muted=this.options.muted,this.status.width=this.element.css("width"),this.status.height=this.element.css("height"),this.element.css({"background-color":this.options.backgroundColor}),e.each(this.options.supplied.toLowerCase().split(","),function(t,r){var i=r.replace(/^\s+|\s+$/g,"");if(n.format[i]){var s=!1;e.each(n.formats,function(e,t){if(i===t)return s=!0,!1}),s||n.formats.push(i)}}),e.each(this.options.solution.toLowerCase().split(","),function(t,r){var i=r.replace(/^\s+|\s+$/g,"");if(n.solution[i]){var s=!1;e.each(n.solutions,function(e,t){if(i===t)return s=!0,!1}),s||n.solutions.push(i)}}),this.internal.instance="jp_"+this.count,this.instances[this.internal.instance]=this.element,this.element.attr("id")===""&&this.element.attr("id",this.options.idPrefix+"_jplayer_"+this.count),this.internal.self=e.extend({},{id:this.element.attr("id"),jq:this.element}),this.internal.audio=e.extend({},{id:this.options.idPrefix+"_audio_"+this.count,jq:t}),this.internal.video=e.extend({},{id:this.options.idPrefix+"_video_"+this.count,jq:t}),this.internal.flash=e.extend({},{id:this.options.idPrefix+"_flash_"+this.count,jq:t,swf:this.options.swfPath+(this.options.swfPath!==""&&this.options.swfPath.slice(-1)!=="/"?"/":"")+"Jplayer.swf"}),this.internal.poster=e.extend({},{id:this.options.idPrefix+"_poster_"+this.count,jq:t}),e.each(e.jPlayer.event,function(e,r){n.options[e]!==t&&(n.element.bind(r+".jPlayer",n.options[e]),n.options[e]=t)}),this.htmlElement.poster=document.createElement("img"),this.htmlElement.poster.id=this.internal.poster.id,this.htmlElement.poster.onload=function(){(!n.status.video||n.status.waitForPlay)&&n.internal.poster.jq.show()},this.element.append(this.htmlElement.poster),this.internal.poster.jq=e("#"+this.internal.poster.id),this.internal.poster.jq.css({width:this.status.width,height:this.status.height}),this.internal.poster.jq.hide(),this.require.audio=!1,this.require.video=!1,e.each(this.formats,function(e,t){n.require[n.format[t].media]=!0}),this.html.audio.available=!1,this.require.audio&&(this.htmlElement.audio=document.createElement("audio"),this.htmlElement.audio.id=this.internal.audio.id,this.html.audio.available=!!this.htmlElement.audio.canPlayType),this.html.video.available=!1,this.require.video&&(this.htmlElement.video=document.createElement("video"),this.htmlElement.video.id=this.internal.video.id,this.html.video.available=!!this.htmlElement.video.canPlayType),this.flash.available=this._checkForFlash(10),this.html.canPlay={},this.flash.canPlay={},e.each(this.formats,function(e,t){n.html.canPlay[t]=n.html[n.format[t].media].available&&""!==n.htmlElement[n.format[t].media].canPlayType(n.format[t].codec),n.flash.canPlay[t]=n.format[t].flashCanPlay&&n.flash.available}),this.html.desired=!1,this.flash.desired=!1,e.each(this.solutions,function(t,r){if(t===0)n[r].desired=!0;else{var i=!1,s=!1;e.each(n.formats,function(e,t){n[n.solutions[0]].canPlay[t]&&(n.format[t].media==="video"?s=!0:i=!0)}),n[r].desired=n.require.audio&&!i||n.require.video&&!s}}),this.html.support={},this.flash.support={},e.each(this.formats,function(e,t){n.html.support[t]=n.html.canPlay[t]&&n.html.desired,n.flash.support[t]=n.flash.canPlay[t]&&n.flash.desired}),this.html.used=!1,this.flash.used=!1,e.each(this.solutions,function(t,r){e.each(n.formats,function(e,t){if(n[r].support[t])return n[r].used=!0,!1})}),this.html.used||this.flash.used||this._error({type:e.jPlayer.error.NO_SOLUTION,context:"{solution:'"+this.options.solution+"', supplied:'"+this.options.supplied+"'}",message:e.jPlayer.errorMsg.NO_SOLUTION,hint:e.jPlayer.errorHint.NO_SOLUTION}),this.html.active=!1,this.html.audio.gate=!1,this.html.video.gate=!1,this.flash.active=!1,this.flash.gate=!1;if(this.flash.used){var r="id="+escape(this.internal.self.id)+"&vol="+this.status.volume+"&muted="+this.status.muted;if(e.browser.msie&&Number(e.browser.version)<=8){var i='<object id="'+this.internal.flash.id+'"';i+=' classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"',i+=' codebase="'+document.URL.substring(0,document.URL.indexOf(":"))+'://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab"',i+=' type="application/x-shockwave-flash"',i+=' width="0" height="0">',i+="</object>";var s=[];s[0]='<param name="movie" value="'+this.internal.flash.swf+'" />',s[1]='<param name="quality" value="high" />',s[2]='<param name="FlashVars" value="'+r+'" />',s[3]='<param name="allowScriptAccess" value="always" />',s[4]='<param name="bgcolor" value="'+this.options.backgroundColor+'" />',r=document.createElement(i);for(i=0;i<s.length;i++)r.appendChild(document.createElement(s[i]));this.element.append(r)}else s='<embed name="'+this.internal.flash.id+'" id="'+this.internal.flash.id+'" src="'+this.internal.flash.swf+'"',s+=' width="0" height="0" bgcolor="'+this.options.backgroundColor+'"',s+=' quality="high" FlashVars="'+r+'"',s+=' allowScriptAccess="always"',s+=' type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />',this.element.append(s);this.internal.flash.jq=e("#"+this.internal.flash.id),this.internal.flash.jq.css({width:"0px",height:"0px"})}this.html.used&&(this.html.audio.available&&(this._addHtmlEventListeners(this.htmlElement.audio,this.html.audio),this.element.append(this.htmlElement.audio),this.internal.audio.jq=e("#"+this.internal.audio.id)),this.html.video.available&&(this._addHtmlEventListeners(this.htmlElement.video,this.html.video),this.element.append(this.htmlElement.video),this.internal.video.jq=e("#"+this.internal.video.id),this.internal.video.jq.css({width:"0px",height:"0px"}))),this.html.used&&!this.flash.used&&window.setTimeout(function(){n.internal.ready=!0,n.version.flash="n/a",n._trigger(e.jPlayer.event.ready)},100),e.each(this.options.cssSelector,function(e,t){n._cssSelector(e,t)}),this._updateInterface(),this._updateButtons(!1),this._updateVolume(this.status.volume),this._updateMute(this.status.muted),this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),e.jPlayer.prototype.count++},destroy:function(){this._resetStatus(),this._updateInterface(),this._seeked(),this.css.jq.currentTime.length&&this.css.jq.currentTime.text(""),this.css.jq.duration.length&&this.css.jq.duration.text(""),this.status.srcSet&&this.pause(),e.each(this.css.jq,function(e,t){t.unbind(".jPlayer")}),this.element.removeData("jPlayer"),this.element.unbind(".jPlayer"),this.element.empty(),this.instances[this.internal.instance]=t},enable:function(){},disable:function(){},_addHtmlEventListeners:function(t,n){var r=this;t.preload=this.options.preload,t.muted=this.options.muted,t.addEventListener("progress",function(){n.gate&&!r.status.waitForLoad&&(r._getHtmlStatus(t),r._updateInterface(),r._trigger(e.jPlayer.event.progress))},!1),t.addEventListener("timeupdate",function(){n.gate&&!r.status.waitForLoad&&(r._getHtmlStatus(t),r._updateInterface(),r._trigger(e.jPlayer.event.timeupdate))},!1),t.addEventListener("durationchange",function(){n.gate&&!r.status.waitForLoad&&(r.status.duration=this.duration,r._getHtmlStatus(t),r._updateInterface(),r._trigger(e.jPlayer.event.durationchange))},!1),t.addEventListener("play",function(){n.gate&&!r.status.waitForLoad&&(r._updateButtons(!0),r._trigger(e.jPlayer.event.play))},!1),t.addEventListener("playing",function(){n.gate&&!r.status.waitForLoad&&(r._updateButtons(!0),r._seeked(),r._trigger(e.jPlayer.event.playing))},!1),t.addEventListener("pause",function(){n.gate&&!r.status.waitForLoad&&(r._updateButtons(!1),r._trigger(e.jPlayer.event.pause))},!1),t.addEventListener("waiting",function(){n.gate&&!r.status.waitForLoad&&(r._seeking(),r._trigger(e.jPlayer.event.waiting))},!1),t.addEventListener("canplay",function(){n.gate&&!r.status.waitForLoad&&(t.volume=r._volumeFix(r.status.volume),r._trigger(e.jPlayer.event.canplay))},!1),t.addEventListener("seeking",function(){n.gate&&!r.status.waitForLoad&&(r._seeking(),r._trigger(e.jPlayer.event.seeking))},!1),t.addEventListener("seeked",function(){n.gate&&!r.status.waitForLoad&&(r._seeked(),r._trigger(e.jPlayer.event.seeked))},!1),t.addEventListener("suspend",function(){n.gate&&!r.status.waitForLoad&&(r._seeked(),r._trigger(e.jPlayer.event.suspend))},!1),t.addEventListener("ended",function(){n.gate&&!r.status.waitForLoad&&(e.jPlayer.browser.webkit||(r.htmlElement.media.currentTime=0),r.htmlElement.media.pause(),r._updateButtons(!1),r._getHtmlStatus(t,!0),r._updateInterface(),r._trigger(e.jPlayer.event.ended))},!1),t.addEventListener("error",function(){n.gate&&!r.status.waitForLoad&&(r._updateButtons(!1),r._seeked(),r.status.srcSet&&(r.status.waitForLoad=!0,r.status.waitForPlay=!0,r.status.video&&r.internal.video.jq.css({width:"0px",height:"0px"}),r._validString(r.status.media.poster)&&r.internal.poster.jq.show(),r.css.jq.videoPlay.length&&r.css.jq.videoPlay.show(),r._error({type:e.jPlayer.error.URL,context:r.status.src,message:e.jPlayer.errorMsg.URL,hint:e.jPlayer.errorHint.URL})))},!1),e.each(e.jPlayer.htmlEvent,function(i,s){t.addEventListener(this,function(){n.gate&&!r.status.waitForLoad&&r._trigger(e.jPlayer.event[s])},!1)})},_getHtmlStatus:function(e,t){var n=0,r=0,i=0,s=0;n=e.currentTime,r=this.status.duration>0?100*n/this.status.duration:0,typeof e.seekable=="object"&&e.seekable.length>0?(i=this.status.duration>0?100*e.seekable.end(e.seekable.length-1)/this.status.duration:100,s=100*e.currentTime/e.seekable.end(e.seekable.length-1)):(i=100,s=r),t&&(r=s=n=0),this.status.seekPercent=i,this.status.currentPercentRelative=s,this.status.currentPercentAbsolute=r,this.status.currentTime=n},_resetStatus:function(){this.status=e.extend({},this.status,e.jPlayer.prototype.status)},_trigger:function(t,n,r){t=e.Event(t),t.jPlayer={},t.jPlayer.version=e.extend({},this.version),t.jPlayer.status=e.extend(!0,{},this.status),t.jPlayer.html=e.extend(!0,{},this.html),t.jPlayer.flash=e.extend(!0,{},this.flash),n&&(t.jPlayer.error=e.extend({},n)),r&&(t.jPlayer.warning=e.extend({},r)),this.element.trigger(t)},jPlayerFlashEvent:function(t,n){t===e.jPlayer.event.ready&&!this.internal.ready&&(this.internal.ready=!0,this.version.flash=n.version,this.version.needFlash!==this.version.flash&&this._error({type:e.jPlayer.error.VERSION,context:this.version.flash,message:e.jPlayer.errorMsg.VERSION+this.version.flash,hint:e.jPlayer.errorHint.VERSION}),this._trigger(t));if(this.flash.gate)switch(t){case e.jPlayer.event.progress:this._getFlashStatus(n),this._updateInterface(),this._trigger(t);break;case e.jPlayer.event.timeupdate:this._getFlashStatus(n),this._updateInterface(),this._trigger(t);break;case e.jPlayer.event.play:this._seeked(),this._updateButtons(!0),this._trigger(t);break;case e.jPlayer.event.pause:this._updateButtons(!1),this._trigger(t);break;case e.jPlayer.event.ended:this._updateButtons(!1),this._trigger(t);break;case e.jPlayer.event.error:this.status.waitForLoad=!0,this.status.waitForPlay=!0,this.status.video&&this.internal.flash.jq.css({width:"0px",height:"0px"}),this._validString(this.status.media.poster)&&this.internal.poster.jq.show(),this.css.jq.videoPlay.length&&this.css.jq.videoPlay.show(),this.status.video?this._flash_setVideo(this.status.media):this._flash_setAudio(this.status.media),this._error({type:e.jPlayer.error.URL,context:n.src,message:e.jPlayer.errorMsg.URL,hint:e.jPlayer.errorHint.URL});break;case e.jPlayer.event.seeking:this._seeking(),this._trigger(t);break;case e.jPlayer.event.seeked:this._seeked(),this._trigger(t);break;default:this._trigger(t)}return!1},_getFlashStatus:function(e){this.status.seekPercent=e.seekPercent,this.status.currentPercentRelative=e.currentPercentRelative,this.status.currentPercentAbsolute=e.currentPercentAbsolute,this.status.currentTime=e.currentTime,this.status.duration=e.duration},_updateButtons:function(e){this.status.paused=!e,this.css.jq.play.length&&this.css.jq.pause.length&&(e?(this.css.jq.play.hide(),this.css.jq.pause.show()):(this.css.jq.play.show(),this.css.jq.pause.hide()))},_updateInterface:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.width(this.status.seekPercent+"%"),this.css.jq.playBar.length&&this.css.jq.playBar.width(this.status.currentPercentRelative+"%"),this.css.jq.currentTime.length&&this.css.jq.currentTime.text(e.jPlayer.convertTime(this.status.currentTime)),this.css.jq.duration.length&&this.css.jq.duration.text(e.jPlayer.convertTime(this.status.duration))},_seeking:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.addClass("jp-seeking-bg")},_seeked:function(){this.css.jq.seekBar.length&&this.css.jq.seekBar.removeClass("jp-seeking-bg")},setMedia:function(t){var n=this;this._seeked(),clearTimeout(this.internal.htmlDlyCmdId);var r=this.html.audio.gate,i=this.html.video.gate,s=!1;e.each(this.formats,function(o,u){var l=n.format[u].media==="video";e.each(n.solutions,function(e,o){if(n[o].support[u]&&n._validString(t[u])){var c=o==="html";return l?c?(n.html.audio.gate=!1,n.html.video.gate=!0,n.flash.gate=!1):(n.html.audio.gate=!1,n.html.video.gate=!1,n.flash.gate=!0):c?(n.html.audio.gate=!0,n.html.video.gate=!1,n.flash.gate=!1):(n.html.audio.gate=!1,n.html.video.gate=!1,n.flash.gate=!0),n.flash.active||n.html.active&&n.flash.gate||r===n.html.audio.gate&&i===n.html.video.gate?n.clearMedia():r!==n.html.audio.gate&&i!==n.html.video.gate&&(n._html_pause(),n.status.video&&n.internal.video.jq.css({width:"0px",height:"0px"}),n._resetStatus()),l?(c?(n._html_setVideo(t),n.html.active=!0,n.flash.active=!1):(n._flash_setVideo(t),n.html.active=!1,n.flash.active=!0),n.css.jq.videoPlay.length&&n.css.jq.videoPlay.show(),n.status.video=!0):(c?(n._html_setAudio(t),n.html.active=!0,n.flash.active=!1):(n._flash_setAudio(t),n.html.active=!1,n.flash.active=!0),n.css.jq.videoPlay.length&&n.css.jq.videoPlay.hide(),n.status.video=!1),s=!0,!1}});if(s)return!1}),s?(this._validString(t.poster)?this.htmlElement.poster.src!==t.poster?this.htmlElement.poster.src=t.poster:this.internal.poster.jq.show():this.internal.poster.jq.hide(),this.status.srcSet=!0,this.status.media=e.extend({},t),this._updateButtons(!1),this._updateInterface()):(this.status.srcSet&&!this.status.waitForPlay&&this.pause(),this.html.audio.gate=!1,this.html.video.gate=!1,this.flash.gate=!1,this.html.active=!1,this.flash.active=!1,this._resetStatus(),this._updateInterface(),this._updateButtons(!1),this.internal.poster.jq.hide(),this.html.used&&this.require.video&&this.internal.video.jq.css({width:"0px",height:"0px"}),this.flash.used&&this.internal.flash.jq.css({width:"0px",height:"0px"}),this._error({type:e.jPlayer.error.NO_SUPPORT,context:"{supplied:'"+this.options.supplied+"'}",message:e.jPlayer.errorMsg.NO_SUPPORT,hint:e.jPlayer.errorHint.NO_SUPPORT}))},clearMedia:function(){this._resetStatus(),this._updateButtons(!1),this.internal.poster.jq.hide(),clearTimeout(this.internal.htmlDlyCmdId),this.html.active?this._html_clearMedia():this.flash.active&&this._flash_clearMedia()},load:function(){this.status.srcSet?this.html.active?this._html_load():this.flash.active&&this._flash_load():this._urlNotSetError("load")},play:function(e){e=typeof e=="number"?e:NaN,this.status.srcSet?this.html.active?this._html_play(e):this.flash.active&&this._flash_play(e):this._urlNotSetError("play")},videoPlay:function(){this.play()},pause:function(e){e=typeof e=="number"?e:NaN,this.status.srcSet?this.html.active?this._html_pause(e):this.flash.active&&this._flash_pause(e):this._urlNotSetError("pause")},pauseOthers:function(){var t=this;e.each(this.instances,function(e,n){t.element!==n&&n.data("jPlayer").status.srcSet&&n.jPlayer("pause")})},stop:function(){this.status.srcSet?this.html.active?this._html_pause(0):this.flash.active&&this._flash_pause(0):this._urlNotSetError("stop")},playHead:function(e){e=this._limitValue(e,0,100),this.status.srcSet?this.html.active?this._html_playHead(e):this.flash.active&&this._flash_playHead(e):this._urlNotSetError("playHead")},mute:function(){this.status.muted=!0,this.html.used&&this._html_mute(!0),this.flash.used&&this._flash_mute(!0),this._updateMute(!0),this._updateVolume(0),this._trigger(e.jPlayer.event.volumechange)},unmute:function(){this.status.muted=!1,this.html.used&&this._html_mute(!1),this.flash.used&&this._flash_mute(!1),this._updateMute(!1),this._updateVolume(this.status.volume),this._trigger(e.jPlayer.event.volumechange)},_updateMute:function(e){this.css.jq.mute.length&&this.css.jq.unmute.length&&(e?(this.css.jq.mute.hide(),this.css.jq.unmute.show()):(this.css.jq.mute.show(),this.css.jq.unmute.hide()))},volume:function(t){t=this._limitValue(t,0,1),this.status.volume=t,this.html.used&&this._html_volume(t),this.flash.used&&this._flash_volume(t),this.status.muted||this._updateVolume(t),this._trigger(e.jPlayer.event.volumechange)},volumeBar:function(e){if(!this.status.muted&&this.css.jq.volumeBar){var t=this.css.jq.volumeBar.offset();e=e.pageX-t.left,t=this.css.jq.volumeBar.width(),this.volume(e/t)}},volumeBarValue:function(e){this.volumeBar(e)},_updateVolume:function(e){this.css.jq.volumeBarValue.length&&this.css.jq.volumeBarValue.width(e*100+"%")},_volumeFix:function(e){var t=.001*Math.random();return e+(e<.5?t:-t)},_cssSelectorAncestor:function(t,n){this.options.cssSelectorAncestor=t,n&&e.each(this.options.cssSelector,function(e,t){self._cssSelector(e,t)})},_cssSelector:function(t,n){var r=this;typeof n=="string"?e.jPlayer.prototype.options.cssSelector[t]?(this.css.jq[t]&&this.css.jq[t].length&&this.css.jq[t].unbind(".jPlayer"),this.options.cssSelector[t]=n,this.css.cs[t]=this.options.cssSelectorAncestor+" "+n,this.css.jq[t]=n?e(this.css.cs[t]):[],this.css.jq[t].length&&this.css.jq[t].bind("click.jPlayer",function(n){return r[t](n),e(this).blur(),!1}),n&&this.css.jq[t].length!==1&&this._warning({type:e.jPlayer.warning.CSS_SELECTOR_COUNT,context:this.css.cs[t],message:e.jPlayer.warningMsg.CSS_SELECTOR_COUNT+this.css.jq[t].length+" found for "+t+" method.",hint:e.jPlayer.warningHint.CSS_SELECTOR_COUNT})):this._warning({type:e.jPlayer.warning.CSS_SELECTOR_METHOD,context:t,message:e.jPlayer.warningMsg.CSS_SELECTOR_METHOD,hint:e.jPlayer.warningHint.CSS_SELECTOR_METHOD}):this._warning({type:e.jPlayer.warning.CSS_SELECTOR_STRING,context:n,message:e.jPlayer.warningMsg.CSS_SELECTOR_STRING,hint:e.jPlayer.warningHint.CSS_SELECTOR_STRING})},seekBar:function(e){if(this.css.jq.seekBar){var t=this.css.jq.seekBar.offset();e=e.pageX-t.left,t=this.css.jq.seekBar.width(),this.playHead(100*e/t)}},playBar:function(e){this.seekBar(e)},currentTime:function(){},duration:function(){},option:function(n,r){var i=n;if(arguments.length===0)return e.extend(!0,{},this.options);if(typeof n=="string"){var s=n.split(".");if(r===t){for(var o=e.extend(!0,{},this.options),u=0;u<s.length;u++){if(o[s[u]]===t)return this._warning({type:e.jPlayer.warning.OPTION_KEY,context:n,message:e.jPlayer.warningMsg.OPTION_KEY,hint:e.jPlayer.warningHint.OPTION_KEY}),t;o=o[s[u]]}return o}o=i={};for(u=0;u<s.length;u++)u<s.length-1?(o[s[u]]={},o=o[s[u]]):o[s[u]]=r}return this._setOptions(i),this},_setOptions:function(t){var n=this;return e.each(t,function(e,t){n._setOption(e,t)}),this},_setOption:function(t,n){var r=this;switch(t){case"cssSelectorAncestor":this.options[t]=n,e.each(r.options.cssSelector,function(e,t){r._cssSelector(e,t)});break;case"cssSelector":e.each(n,function(e,t){r._cssSelector(e,t)})}return this},resize:function(t){this.html.active&&this._resizeHtml(t),this.flash.active&&this._resizeFlash(t),this._trigger(e.jPlayer.event.resize)},_resizePoster:function(){},_resizeHtml:function(){},_resizeFlash:function(e){this.internal.flash.jq.css({width:e.width,height:e.height})},_html_initMedia:function(){this.status.srcSet&&!this.status.waitForPlay&&this.htmlElement.media.pause(),this.options.preload!=="none"&&this._html_load(),this._trigger(e.jPlayer.event.timeupdate)},_html_setAudio:function(t){var n=this;e.each(this.formats,function(e,r){if(n.html.support[r]&&t[r])return n.status.src=t[r],n.status.format[r]=!0,n.status.formatType=r,!1}),this.htmlElement.media=this.htmlElement.audio,this._html_initMedia()},_html_setVideo:function(t){var n=this;e.each(this.formats,function(e,r){if(n.html.support[r]&&t[r])return n.status.src=t[r],n.status.format[r]=!0,n.status.formatType=r,!1}),this.htmlElement.media=this.htmlElement.video,this._html_initMedia()},_html_clearMedia:function(){this.htmlElement.media&&(this.htmlElement.media.id===this.internal.video.id&&this.internal.video.jq.css({width:"0px",height:"0px"}),this.htmlElement.media.pause(),this.htmlElement.media.src="",e.browser.msie&&Number(e.browser.version)>=9||this.htmlElement.media.load())},_html_load:function(){if(this.status.waitForLoad){this.status.waitForLoad=!1,this.htmlElement.media.src=this.status.src;try{this.htmlElement.media.load()}catch(e){}}clearTimeout(this.internal.htmlDlyCmdId)},_html_play:function(e){var t=this;this._html_load(),this.htmlElement.media.play();if(!isNaN(e))try{this.htmlElement.media.currentTime=e}catch(n){this.internal.htmlDlyCmdId=setTimeout(function(){t.play(e)},100);return}this._html_checkWaitForPlay()},_html_pause:function(e){var t=this;e>0?this._html_load():clearTimeout(this.internal.htmlDlyCmdId),this.htmlElement.media.pause();if(!isNaN(e))try{this.htmlElement.media.currentTime=e}catch(n){this.internal.htmlDlyCmdId=setTimeout(function(){t.pause(e)},100);return}e>0&&this._html_checkWaitForPlay()},_html_playHead:function(e){var t=this;this._html_load();try{if(typeof this.htmlElement.media.seekable=="object"&&this.htmlElement.media.seekable.length>0)this.htmlElement.media.currentTime=e*this.htmlElement.media.seekable.end(this.htmlElement.media.seekable.length-1)/100;else{if(!(this.htmlElement.media.duration>0&&!isNaN(this.htmlElement.media.duration)))throw"e";this.htmlElement.media.currentTime=e*this.htmlElement.media.duration/100}}catch(n){this.internal.htmlDlyCmdId=setTimeout(function(){t.playHead(e)},100);return}this.status.waitForLoad||this._html_checkWaitForPlay()},_html_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.video.jq.css({width:this.status.width,height:this.status.height})))},_html_volume:function(e){this.html.audio.available&&(this.htmlElement.audio.volume=e),this.html.video.available&&(this.htmlElement.video.volume=e)},_html_mute:function(e){this.html.audio.available&&(this.htmlElement.audio.muted=e),this.html.video.available&&(this.htmlElement.video.muted=e)},_flash_setAudio:function(t){var n=this;try{e.each(this.formats,function(e,r){if(n.flash.support[r]&&t[r]){switch(r){case"m4a":n._getMovie().fl_setAudio_m4a(t[r]);break;case"mp3":n._getMovie().fl_setAudio_mp3(t[r])}return n.status.src=t[r],n.status.format[r]=!0,n.status.formatType=r,!1}}),this.options.preload==="auto"&&(this._flash_load(),this.status.waitForLoad=!1)}catch(r){this._flashError(r)}},_flash_setVideo:function(t){var n=this;try{e.each(this.formats,function(e,r){if(n.flash.support[r]&&t[r]){switch(r){case"m4v":n._getMovie().fl_setVideo_m4v(t[r])}return n.status.src=t[r],n.status.format[r]=!0,n.status.formatType=r,!1}}),this.options.preload==="auto"&&(this._flash_load(),this.status.waitForLoad=!1)}catch(r){this._flashError(r)}},_flash_clearMedia:function(){this.internal.flash.jq.css({width:"0px",height:"0px"});try{this._getMovie().fl_clearMedia()}catch(e){this._flashError(e)}},_flash_load:function(){try{this._getMovie().fl_load()}catch(e){this._flashError(e)}this.status.waitForLoad=!1},_flash_play:function(e){try{this._getMovie().fl_play(e)}catch(t){this._flashError(t)}this.status.waitForLoad=!1,this._flash_checkWaitForPlay()},_flash_pause:function(e){try{this._getMovie().fl_pause(e)}catch(t){this._flashError(t)}e>0&&(this.status.waitForLoad=!1,this._flash_checkWaitForPlay())},_flash_playHead:function(e){try{this._getMovie().fl_play_head(e)}catch(t){this._flashError(t)}this.status.waitForLoad||this._flash_checkWaitForPlay()},_flash_checkWaitForPlay:function(){this.status.waitForPlay&&(this.status.waitForPlay=!1,this.css.jq.videoPlay.length&&this.css.jq.videoPlay.hide(),this.status.video&&(this.internal.poster.jq.hide(),this.internal.flash.jq.css({width:this.status.width,height:this.status.height})))},_flash_volume:function(e){try{this._getMovie().fl_volume(e)}catch(t){this._flashError(t)}},_flash_mute:function(e){try{this._getMovie().fl_mute(e)}catch(t){this._flashError(t)}},_getMovie:function(){return document[this.internal.flash.id]},_checkForFlash:function(t){var n=!1,r;if(window.ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+t),n=!0}catch(i){}else navigator.plugins&&navigator.mimeTypes.length>0&&(r=navigator.plugins["Shockwave Flash"])&&navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/,"$1")>=t&&(n=!0);return e.browser.msie&&Number(e.browser.version)>=9?!1:n},_validString:function(e){return e&&typeof e=="string"},_limitValue:function(e,t,n){return e<t?t:e>n?n:e},_urlNotSetError:function(t){this._error({type:e.jPlayer.error.URL_NOT_SET,context:t,message:e.jPlayer.errorMsg.URL_NOT_SET,hint:e.jPlayer.errorHint.URL_NOT_SET})},_flashError:function(t){this._error({type:e.jPlayer.error.FLASH,context:this.internal.flash.swf,message:e.jPlayer.errorMsg.FLASH+t.message,hint:e.jPlayer.errorHint.FLASH})},_error:function(t){this._trigger(e.jPlayer.event.error,t),this.options.errorAlerts&&this._alert("Error!"+(t.message?"\n\n"+t.message:"")+(t.hint?"\n\n"+t.hint:"")+"\n\nContext: "+t.context)},_warning:function(n){this._trigger(e.jPlayer.event.warning,t,n),this.options.errorAlerts&&this._alert("Warning!"+(n.message?"\n\n"+n.message:"")+(n.hint?"\n\n"+n.hint:"")+"\n\nContext: "+n.context)},_alert:function(e){alert("jPlayer "+this.version.script+" : id='"+this.internal.self.id+"' : "+e)}},e.jPlayer.error={FLASH:"e_flash",NO_SOLUTION:"e_no_solution",NO_SUPPORT:"e_no_support",URL:"e_url",URL_NOT_SET:"e_url_not_set",VERSION:"e_version"},e.jPlayer.errorMsg={FLASH:"jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ",NO_SOLUTION:"No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.",NO_SUPPORT:"It is not possible to play any media format provided in setMedia() on this browser using your current options.",URL:"Media URL could not be loaded.",URL_NOT_SET:"Attempt to issue media playback commands, while no media url is set.",VERSION:"jPlayer "+e.jPlayer.prototype.version.script+" needs Jplayer.swf version "+e.jPlayer.prototype.version.needFlash+" but found "},e.jPlayer.errorHint={FLASH:"Check your swfPath option and that Jplayer.swf is there.",NO_SOLUTION:"Review the jPlayer options: support and supplied.",NO_SUPPORT:"Video or audio formats defined in the supplied option are missing.",URL:"Check media URL is valid.",URL_NOT_SET:"Use setMedia() to set the media URL.",VERSION:"Update jPlayer files."},e.jPlayer.warning={CSS_SELECTOR_COUNT:"e_css_selector_count",CSS_SELECTOR_METHOD:"e_css_selector_method",CSS_SELECTOR_STRING:"e_css_selector_string",OPTION_KEY:"e_option_key"},e.jPlayer.warningMsg={CSS_SELECTOR_COUNT:"The number of methodCssSelectors found did not equal one: ",CSS_SELECTOR_METHOD:"The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.",CSS_SELECTOR_STRING:"The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.",OPTION_KEY:"The option requested in jPlayer('option') is undefined."},e.jPlayer.warningHint={CSS_SELECTOR_COUNT:"Check your css selector and the ancestor.",CSS_SELECTOR_METHOD:"Check your method name.",CSS_SELECTOR_STRING:"Check your css selector is a string.",OPTION_KEY:"Check your option name."}})(jQuery),$(function(){(function(e){$("#switch_hierarchy_entry").length>0&&$(".taxon_concept_exemplar_image").hide()})($("#switch_hierarchy_entry")),function(e){e.find("a.play").each(function(){switch($(this).attr("data-mime_type")){case"audio/mpeg":var e={mp3:$(this).attr("href"
)},t="mp3";break;case"application/ogg":var e={oga:$(this).attr("href")},t="oga";break;default:$(this).parent("div").find("a.pause").remove(),$(this).parent("div").find("a.stop").remove();var e={}}$(this).parent("div").prev("div").jPlayer({swfPath:"/assets/jplayer/js",supplied:t,cssSelectorAncestor:"#"+$(this).parent("div").attr("id"),cssSelector:{play:".play",pause:".pause",stop:".stop",currentTime:".current_time",duration:".duration"},ready:function(){$(this).jPlayer("setMedia",e)}}).bind($.jPlayer.event.play,function(){$(this).jPlayer("pauseOthers")})}),$li=e.find("li"),$li.find(".associations").hide(),$li.find(".flag").accessibleHover(function(){$(this).parent().find(".associations").addClass("balloon").show()},function(){$(this).parent().find(".associations").hide().removeClass("balloon")})}($("#media_list"))});