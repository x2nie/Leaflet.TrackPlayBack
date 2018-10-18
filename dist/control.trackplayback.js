!function(t){var e={};function i(n){if(e[n])return e[n].exports;var a=e[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,i),a.l=!0,a.exports}i.m=t,i.c=e,i.d=function(t,e,n){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)i.d(n,a,function(e){return t[e]}.bind(null,a));return n},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=2)}({2:function(t,e,i){"use strict";i.r(e);const n=L.Control.extend({options:{position:"topright",showOptions:!0,showInfo:!0,showSlider:!0,autoPlay:!1},initialize:function(t,e){L.Control.prototype.initialize.call(this,e),this.trackPlayBack=t,this.trackPlayBack.on("tick",this._tickCallback,this)},onAdd:function(t){return this._initContainer(),this._container},onRemove:function(t){this.trackPlayBack.dispose(),this.trackPlayBack.off("tick",this._tickCallback,this)},getTimeStrFromUnix:function(t,e="s"){t=parseInt(1e3*t);let i,n=new Date(t),a=n.getFullYear(),o=n.getMonth()+1<10?"0"+(n.getMonth()+1):n.getMonth()+1,r=n.getDate()<10?"0"+n.getDate():n.getDate(),s=n.getHours()<10?"0"+n.getHours():n.getHours(),c=n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes(),l=n.getSeconds()<10?"0"+n.getSeconds():n.getSeconds();return i="d"===e?a+"-"+o+"-"+r:"h"===e?a+"-"+o+"-"+r+" "+s:"m"===e?a+"-"+o+"-"+r+" "+s+":"+c:a+"-"+o+"-"+r+" "+s+":"+c+":"+l},_initContainer:function(){return this._container=L.DomUtil.create("div","leaflet-control-playback"),L.DomEvent.disableClickPropagation(this._container),this._optionsContainer=this._createContainer("optionsContainer",this._container),this._buttonContainer=this._createContainer("buttonContainer",this._container),this._infoContainer=this._createContainer("infoContainer",this._container),this._sliderContainer=this._createContainer("sliderContainer",this._container),this._pointCbx=this._createCheckbox("show trackPoint","show-trackpoint",this._optionsContainer,this._showTrackPoint),this._lineCbx=this._createCheckbox("show trackLine","show-trackLine",this._optionsContainer,this._showTrackLine),this._playBtn=this._createButton("play","btn-stop",this._buttonContainer,this._play),this._restartBtn=this._createButton("replay","btn-restart",this._buttonContainer,this._restart),this._slowSpeedBtn=this._createButton("slow","btn-slow",this._buttonContainer,this._slow),this._quickSpeedBtn=this._createButton("quick","btn-quick",this._buttonContainer,this._quick),this._closeBtn=this._createButton("close","btn-close",this._buttonContainer,this._close),this._infoStartTime=this._createInfo("startTime: ",this.getTimeStrFromUnix(this.trackPlayBack.getStartTime()),"info-start-time",this._infoContainer),this._infoEndTime=this._createInfo("endTime: ",this.getTimeStrFromUnix(this.trackPlayBack.getEndTime()),"info-end-time",this._infoContainer),this._infoCurTime=this._createInfo("curTime: ",this.getTimeStrFromUnix(this.trackPlayBack.getCurTime()),"info-cur-time",this._infoContainer),this._infoSpeedRatio=this._createInfo("speed: ",`X${this.trackPlayBack.getSpeed()}`,"info-speed-ratio",this._infoContainer),this._slider=this._createSlider("time-slider",this._sliderContainer,this._scrollchange),this._container},_createContainer:function(t,e){return L.DomUtil.create("div",t,e)},_createCheckbox:function(t,e,i,n){let a=L.DomUtil.create("div",e+" trackplayback-checkbox",i),o=L.DomUtil.create("input","trackplayback-input",a),r=`trackplayback-input-${L.Util.stamp(o)}`;o.setAttribute("type","checkbox"),o.setAttribute("id",r);let s=L.DomUtil.create("label","trackplayback-label",a);return s.setAttribute("for",r),s.innerHTML=t,L.DomEvent.on(o,"change",n,this),a},_createButton:function(t,e,i,n){let a=L.DomUtil.create("a",e,i);return a.href="#",a.title=t,a.setAttribute("role","button"),a.setAttribute("aria-label",t),L.DomEvent.disableClickPropagation(a),L.DomEvent.on(a,"click",n,this),a},_createInfo:function(t,e,i,n){let a=L.DomUtil.create("div","info-container",n);L.DomUtil.create("span","info-title",a).innerHTML=t;let o=L.DomUtil.create("span",i,a);return o.innerHTML=e,o},_createSlider:function(t,e,i){let n=L.DomUtil.create("input",t,e);return n.setAttribute("type","range"),n.setAttribute("min",this.trackPlayBack.getStartTime()),n.setAttribute("max",this.trackPlayBack.getEndTime()),n.setAttribute("value",this.trackPlayBack.getCurTime()),L.DomEvent.on(n,"click mousedown dbclick",L.DomEvent.stopPropagation).on(n,"click",L.DomEvent.preventDefault).on(n,"change",i,this).on(n,"mousemove",i,this),n},_showTrackPoint(t){t.target.checked?this.trackPlayBack.showTrackPoint():this.trackPlayBack.hideTrackPoint()},_showTrackLine(t){t.target.checked?this.trackPlayBack.showTrackLine():this.trackPlayBack.hideTrackLine()},_play:function(){L.DomUtil.hasClass(this._playBtn,"btn-stop")?(L.DomUtil.removeClass(this._playBtn,"btn-stop"),L.DomUtil.addClass(this._playBtn,"btn-start"),this._playBtn.setAttribute("title","stop"),this.trackPlayBack.start()):(L.DomUtil.removeClass(this._playBtn,"btn-start"),L.DomUtil.addClass(this._playBtn,"btn-stop"),this._playBtn.setAttribute("title","play"),this.trackPlayBack.stop())},_restart:function(){L.DomUtil.removeClass(this._playBtn,"btn-stop"),L.DomUtil.addClass(this._playBtn,"btn-start"),this._playBtn.setAttribute("title","stop"),this.trackPlayBack.rePlaying()},_slow:function(){this.trackPlayBack.slowSpeed();let t=this.trackPlayBack.getSpeed();this._infoSpeedRatio.innerHTML=`X${t}`},_quick:function(){this.trackPlayBack.quickSpeed();let t=this.trackPlayBack.getSpeed();this._infoSpeedRatio.innerHTML=`X${t}`},_close:function(){return L.DomUtil.remove(this._container),this.onRemove&&this.onRemove(this._map),this},_scrollchange:function(t){let e=Number(t.target.value);this.trackPlayBack.setCursor(e)},_tickCallback:function(t){let e=this.getTimeStrFromUnix(t.time);this._infoCurTime.innerHTML=e,this._slider.value=t.time,t.time>=this.trackPlayBack.getEndTime()&&(L.DomUtil.removeClass(this._playBtn,"btn-start"),L.DomUtil.addClass(this._playBtn,"btn-stop"),this._playBtn.setAttribute("title","play"),this.trackPlayBack.stop())}});L.TrackPlayBackControl=n,L.trackplaybackcontrol=function(t,e){return new n(t,e)}}});
//# sourceMappingURL=control.trackplayback.js.map