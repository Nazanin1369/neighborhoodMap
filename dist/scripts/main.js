"use strict";function getInstaPics(n,e){var t="85a5b3cd341344cebeea9a990a80b3ed";return new Promise(function(o,i){$.getJSON("https://api.instagram.com/v1/tags/"+e+"/media/recent?callback=?&client_id="+t+"&count="+n).then(function(n){"200"!=n.meta.code?(i(n.status),console.log("Could not get images from Instagram API.")):o(n.data)})})}function filterUniversities(n,e){return""==e?model.universities:_.filter(n,function(n){return n.name.indexOf(e)>-1})}function initializeMarkers(n){googleMapService.clearMarkers();for(var e=0;e<n.universities().length;e++)googleMapService.getMarkers().push(googleMapService.createMarker(n.universities()[e],n))}-function(){function n(n,e){var t=n?n[e.full]||n[e.parent]||n[e.name]||{}:{};return s&&s(e,t,n),t}function e(n){return null===n||void 0===n}function t(n){return null===n||void 0===n||n.constructor===String||n.constructor===Number||n.constructor===Boolean||n instanceof Date}function o(a,r,s,c){var u,f,g,_,v,h,b;if(c=c||n(r,s),u=c.custom)h=!0,"function"==typeof u?(f=u(a),e(f)||(f.___$mapCustom=u)):(f=u.map(a),e(f)||(f.___$mapCustom=u.map,u.unmap&&(f.___$unmapCustom=u.unmap)));else if(c.append)h=!0,f=a;else{if(c.exclude)return h=!0,m;if(t(a))f=s.parentIsArray?a:p(a);else if(a instanceof Array){for(f=[],g=0,u=a.length;u>g;g++)f[g]=o(a[g],r,{name:"[i]",parent:s.name+"[i]",full:s.full+"[i]",parentIsArray:!0});(!s.parentIsArray||l)&&(_={name:"[i]",parent:s.name+"[i]",full:s.full+"[i]",parentIsArray:!0},f=d(f),(a=c.arrayChildId)&&(f.___$childIdName=a),f.pushFromModel=function(n){n=o(n,r,_),f.push(n)},f.unshiftFromModel=function(n){n=o(n,r,_),f.unshift(n)},f.popToModel=function(n){return n=f.pop(),i(n,_)},f.shiftToModel=function(n){return n=f.shift(),i(n,_)})}else if(a.constructor===Object)for(g in f={},a)_={name:g,parent:("[i]"===s.name?s.parent:s.name)+"."+g,full:s.full+"."+g},b=a[g],(u=t(b)?n(r,_):void 0)&&u.custom?(f.___$customChildren=f.___$customChildren||{},f.___$customChildren[g]=u.custom,f[g]="function"==typeof u.custom?u.custom(a[g]):u.custom.map(a[g])):(u=o(b,r,_,u),u!==m&&(f[g]=u))}return!h&&(v=c.extend)&&("function"==typeof v?f=v(f)||f:v.constructor===Object&&("function"==typeof v.map&&(f=v.map(f)||f),"function"==typeof v.unmap&&(f.___$unmapExtend=v.unmap))),f}function i(n,o){var a,r,l,u,p=c(n);if(u=n!==p,s&&s(o),!u&&n&&n.constructor===Function)return m;if(n&&n.___$unmapCustom)a=n.___$unmapCustom(n);else if(u&&t(p)||e(p))a=p;else if(p instanceof Array)for(a=[],r=0,l=p.length;l>r;r++)a[r]=i(p[r],{name:"[i]",parent:o.name+"[i]",full:o.full+"[i]"});else if(p.constructor===Object)for(r in a={},p)"___$"!==r.substr(0,4)&&(n.___$customChildren&&n.___$customChildren[r]&&n.___$customChildren[r].unmap?a[r]=n.___$customChildren[r].unmap(p[r]):(u=p[r],ko.isComputed(u)||(l=c(u))&&l.constructor===Function||(u=i(u,{name:r,parent:("[i]"===o.name?o.parent:o.name)+"."+r,full:o.full+"."+r}),u!==m&&(a[r]=u))));else!u&&"function"!=typeof p&&(a=p);return n&&n.___$unmapExtend&&(a=n.___$unmapExtend(a,n)),a}function a(n,o,i,r,l){var p,d,f,m,g,_,v,h=c(o);if(d=o!==h,s&&s(i),d&&e(h)^e(n))o(n);else if(n&&h&&h.constructor==Object&&n.constructor===Object)for(p in n)o.___$customChildren&&o.___$customChildren[p]?(r=o.___$customChildren[p].map||o.___$customChildren[p],h[p]=r(n[p])):(r=h[p],!d&&h.hasOwnProperty(p)&&(t(r)||r&&r.constructor===Array)?h[p]=n[p]:r&&"function"==typeof r.___$mapCustom?u(r)?(f=r.___$mapCustom(n[p],r),f=c(f),r(f)):h[p]=r.___$mapCustom(n[p],r):e(n[p])&&h[p]&&h[p].constructor===Object?h[p]=n[p]:l?(r=function(n,e,t){return function(){a(n[t],h[t],{name:t,parent:("[i]"===i.name?i.parent:i.name)+"."+t,full:i.full+"."+t},h,l),l(l()-1)}}(n,o,p),l(l()+1),setTimeout(r,0)):a(n[p],h[p],{name:p,parent:("[i]"===i.name?i.parent:i.name)+"."+p,full:i.full+"."+p}));else if(h&&h instanceof Array)if(v=o.___$childIdName){for(f=[],m=[],p=n.length-1;p>=0;p--)for(g=n[p][v],d=h.length-1;d>=0;d--)if(r=h[d],_=c(r),_=c(_[v]),_===g){r.___$mapCustom?ko.isObservable(r)?(g=r.___$mapCustom(n[p],r),u(g)&&g!=r&&r(c(g))):h[d]=r.___$mapCustom(n[p],r):l?(r=function(n,e,t,o){return function(){a(n[t],h[o],{name:"[i]",parent:i.name+"[i]",full:i.full+"[i]"},void 0,l),l(l()-1)}}(n,o,p,d),l(l()+1),setTimeout(r,0)):a(n[p],h[d],{name:"[i]",parent:i.name+"[i]",full:i.full+"[i]"}),m[d]=!0,f[p]=!0;break}for(d=h.length-1;d>=0;d--)m[d]||o.splice(d,1);for(p=n.length-1;p>=0;p--)f[p]||o.pushFromModel(n[p])}else if(f=[],d=o.___$mapCustom,"function"==typeof d){for(p=0,r=n.length;r>p;p++)f[p]=n[p];o(d(f))}else for(o(f),p=0,r=n?n.length:0;r>p;p++)o.pushFromModel(n[p]);else d&&o(n);return"{root}"===i.name&&l?{onComplete:function(n){n&&"function"==typeof n&&(l?ko.computed(function(){n&&0===l()&&(n(),n=void 0)}).extend({throttle:50}):n())}}:void 0}function r(n,e){l=n.makeChildArraysObservable,window.console&&n.logging?(console.log(e),s=function(n,e,t){console.log("- "+(e&&e.settingType?e.settingType+" "+n.full+" (matched: '"+((t[n.full]?n.full:"")||(t[n.parent]?n.parent:"")||n.name)+"')":"default "+n.full))}):s=void 0}var s,l,c=ko.utils.unwrapObservable,u=ko.isObservable,p=ko.observable,d=ko.observableArray,f={name:"{root}",parent:"{root}",full:"{root}"},m=function(){};ko.viewmodel={options:{makeChildArraysObservable:!0,logging:!1},fromModel:function(n,e){var t,i,a,s,l,c,u,p={},d=e?e.shared||{}:{};for(l in e)if(t=e[l]||{},"shared"!==l)if(t instanceof Array)for(i=0,s=t.length;s>i;i++)a=t[i],p[a]=p[a]||{},p[a][l]=!0,p[a].settingType=p[a].settingType?"multiple":l;else if(t.constructor===Object)for(a in t){if(p[a]=p[a]||{},i=t[a],(i="arrayChildId"!==l&&i&&i.constructor===String&&d[i]?d[i]:i)&&i.constructor===Object)for(c in i)(u=i[c])&&u.constructor==String&&d[u]&&(i[c]=d[u]);p[a][l]=i,p[a].settingType=p[a].settingType?"multiple":l}return r(this.options,"Mapping From Model"),o(n,p,f)},toModel:function(n){return r(this.options,"Mapping To Model"),i(n,f)},updateFromModel:function(n,e,t){return t=t?ko.observable(0):void 0,r(this.options,"Update From Model"),a(e,n,f,void 0,t)}}}();var model={universities:[]};$(function(){googleMapService.initializeMap(),googleMapService.fitBounds(),googleMapService.getData().then(function(n){_.each(n,function(n){n.location={lat:n.geometry.location.H,"long":n.geometry.location.L}}),model.universities=n;var e=ko.viewmodel.fromModel(model,{extend:{"{root}.universities[i]":function(n,t){n.showInfoWindow=function(){googleMapService.openInfoWindow(n,e)}},"{root}":function(n){n.searchText=ko.observable(""),n.errors=ko.observable(""),n.instagramPictures=ko.observableArray([{link:ko.observable(""),txt:ko.observable("")}]),n.loadPics=function(e){var t,o=e.split(/[\s,.]+/);t=o.length<3?e.replace(/[\s]+/g,"").toLowerCase():(o[0]+" "+o[1]+" "+o[2]).replace(/\s+/g,"").toLowerCase(),getInstaPics(10,t).then(function(e){n.instagramPictures().length>1&&n.instagramPictures.removeAll(),_.map(e,function(e){e.picUrl=ko.observable(e.images.thumbnail.url),e.txt=ko.observable(e.caption.text),n.instagramPictures.push(e)})})["catch"](function(e){n.errors("Cannot load pictures!")})}}}});e.searchText.subscribe(function(n){var t={universities:filterUniversities(model.universities,n)};ko.viewmodel.updateFromModel(e,t),initializeMarkers(e)}),initializeMarkers(e),ko.applyBindings(e),googleMapService.initializeInfoWindow()})["catch"](function(n){console.log(n),alert("Cannot connect to googleMap API service, Please try again!")})});var googleMapService=new function(){var n,e,t,o=this,i=[];o.getMap=function(){return n},o.getInfoWindow=function(){return e},o.getMarkers=function(){return i},o.clearMarkers=function(){i.forEach(function(n){n&&n.setMap(null)}),i=[]},o.createMarker=function(t,i){var a=new google.maps.Marker({position:new google.maps.LatLng(t.location.lat(),t.location["long"]()),animation:google.maps.Animation.DROP,icon:"../images/uni.png"});return a.setMap(n),google.maps.event.addListener(a,"click",function(){o.bounceOnce(this),e.setContent(o.createInfoWindowContent(t)),i.loadPics(t.name()),e.open(n,this),ko.applyBindings(i,$(".info-popup")[0])}),a},o.openInfoWindow=function(t,i){var a=new google.maps.Marker({position:new google.maps.LatLng(t.location.lat(),t.location["long"]()),animation:google.maps.Animation.DROP,icon:"../images/uni.png"});return a.setMap(n),o.bounceOnce(a),e.setContent(o.createInfoWindowContent(t)),i.loadPics(t.name()),e.open(n,a),ko.applyBindings(i,$(".info-popup")[0]),a},o.fitBounds=function(){var e=new google.maps.LatLngBounds;if(i.length>0){for(var t=0;t<i.length;t++)i[t].getVisible()&&e.extend(i[t].getPosition());n.fitBounds(e)}},o.bounceOnce=function(n){n.setAnimation(google.maps.Animation.BOUNCE),setTimeout(function(){n.setAnimation(null)},1400)},o.selectMarker=function(n,e){t=e,google.maps.event.trigger(i[n],"click")},o.initializeMap=function(e){var t=new google.maps.LatLng(37.6292,-122.1381),o={center:t,zoom:10,disableDefaultUI:!0,styles:[{featureType:"poi",elementType:"labels",stylers:[{visibility:"off"}]}]};n=new google.maps.Map(document.getElementById("google-map"),o)},o.getData=function(){var e={location:{lat:37.4292,lng:-122.1381},radius:4e4,types:["university"]};return new Promise(function(t,o){function i(n,e){e===google.maps.places.PlacesServiceStatus.OK&&t(n),o(e)}new google.maps.places.PlacesService(n).nearbySearch(e,i)})},o.initializeInfoWindow=function(){e=new google.maps.InfoWindow,google.maps.event.addListener(e,"domready",function(){var n=$(".gm-style-iw"),e=n.prev();e.children(":nth-child(2)").css({display:"none"}),e.children(":nth-child(4)").css({display:"none"}),e.children(":nth-child(1)").attr("style",function(n,e){return e+"left: 76px !important;"}),e.children(":nth-child(3)").attr("style",function(n,e){return e+"left: 76px !important;"}),e.children(":nth-child(3)").find("div").children().css({"box-shadow":"rgba(72, 181, 233, 0.6) 0px 1px 6px","z-index":"1"}),e.children(":nth-child(3)").attr("style",function(n,e){return e+"margin: 0px; padding: 0px;"});var t=n.next();t.css({display:"none"})})},o.createInfoWindowContent=function(n){var e;e="undefined"==typeof n.rating?"no rating":n.rating();var t='<div class="info-card-wide mdl-card mdl-shadow--2dp info-popup">\n                        <div class="mdl-card__title">\n                            <h2 class="mdl-card__title-text">'+n.name()+'</h2>\n                        </div>\n                        <div class="mdl-card__supporting-text">\n                          <strong>Rating: '+e+"</strong>\n                          <br/>\n                          <span>"+n.vicinity()+'</span>\n                          <br/>\n                          <span class="pull-right">\n                              <img src="../images/insta.png" class="insta-icon"/>\n                          </span>\n                        </div>\n                        <div class="mdl-card__actions mdl-card--border">\n                          <div class="row infoPics" data-bind="foreach: instagramPictures">\n                            <div class="col-xs-6 col-md-3" style="width: 250px; height: 300px;">\n                              <a data-bind="attr: {href: $data.link}" target="_blank" class="thumbnail">\n                                <img data-bind="attr: {src: $data.picUrl, href: $data.link}">\n                                <div class="caption">\n                                   <p data-bind="text: txt"></p>\n                                </div>\n                              </a>\n                            </div>\n                          </div>\n                        </div>\n                        <div class="mdl-card__actions mdl-card--border" data-bind="visible: errors().length > 0">\n                            <p data-bind="text: errors"></p>\n                        </div>\n\n                        <div class="mdl-card__menu">\n                          <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick="googleMapService.getInfoWindow().close()">\n                            <i class="material-icons">clear</i>\n                          </button>\n                        </div></div>';return t}};