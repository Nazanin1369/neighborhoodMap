
/* jshint multistr: true */
/* global $, google */
/* exported googleMapService */

/**
 * Service that manages all operations with the map.
 * @return googleMapService instance
 */
var googleMapService = new (function() {
    'use strict';

    var self = this;

    var map, infoWindow;
    var markers = [];
    var apiEngine;


    self.getMap = function() {
        return map;
    };

    self.getInfoWindow = function() {
        return infoWindow;
    };

    self.getMarkers = function() {
        return markers;
    };

    /**
     * It removes all markers in the map.
     */
    self.clearMarkers = function() {
        markers.forEach(function(marker) {
            if (marker) {
                marker.setMap(null);
            }
        });
        markers = [];
    };

    /**
     * It added a marker in the map.
     * @param  {Event} Event linked to the marker.
     */
    self.createMarker = function(university) {
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(university.location.lat(), university.location.long()),
            animation: google.maps.Animation.DROP
        });

        marker.setMap(map);

        google.maps.event.addListener(marker, 'click', function() {
            self.bounceOnce(this);
            infoWindow.setContent(self.createInfoWindowContent(university));
            infoWindow.open(map, this);
        });

        return marker;
    };

    self.openInfoWindow = function(university){
      var marker = new google.maps.Marker({
          position: new google.maps.LatLng(university.location.lat(), university.location.long()),
          animation: google.maps.Animation.DROP
      });
      
      marker.setMap(map);

      self.bounceOnce(marker);
      infoWindow.setContent(self.createInfoWindowContent(university));
      infoWindow.open(map, marker);

      return marker;
    }

    /**
     * It fits the map bounds to the markers in the map.
     */
    self.fitBounds = function() {
        // Source --> http://stackoverflow.com/questions/15299113/google-maps-v3-fitbounds-on-visible-markers
        var bounds = new google.maps.LatLngBounds();

        if (markers.length > 0) {
            for (var i = 0; i < markers.length; i++) {
                if (markers[i].getVisible()) {
                    bounds.extend(markers[i].getPosition());
                }
            }
            map.fitBounds(bounds);
        }
    };


    /**
     * It adds a bounce-twice effect to a marker.
     * @param  {google.maps.Marker} Marker.
     */
    self.bounceOnce = function(marker) {
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            marker.setAnimation(null);
        }, 1400);
    };



    /**
     * It simulates a click on a marker.
     * @param  {[type]} markerIndex [description]
     * @param  {[type]} engine      [description]
     */
    self.selectMarker = function(markerIndex, engine) {
        apiEngine = engine;
        google.maps.event.trigger(markers[markerIndex], 'click');
    };


    /**
    * Map initialization.
    * @param  {DOMElement} mapCanvasId Canvas that will contain the map.
    */
   self.initializeMap = function(mapCanvasId) {
       var sanFranciscoBayArea = new google.maps.LatLng(37.6292, -122.1381);
       var mapOptions = {
           center: sanFranciscoBayArea,
           zoom: 10,
           disableDefaultUI: true,
           styles: [{
               featureType: 'poi',
               elementType: 'labels',
               stylers: [{
                   visibility: 'off'
               }]
           }]
       };

       map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
   };

   /**
   * @name getData
   * @description get map locations data
   * @return {Array|Object}
   */
   self.getData = function(){
     var request = {
          location: {lat: 37.4292, lng: -122.1381},
          radius: 40000,
          types: ['university']
     };
     return new Promise(function(resolve, reject){
       function myCallBack(results, status) {
           if (status === google.maps.places.PlacesServiceStatus.OK) {
             resolve(results)
             console.log('results', results)
           }
           reject(status);
       }
       new google.maps.places.PlacesService(map).nearbySearch(request, myCallBack);
      });
   }


   /**
    * InfoWindow initialization.
    */
   self.initializeInfoWindow = function() {
       // Initialize the InfoWindow
       infoWindow = new google.maps.InfoWindow();

       google.maps.event.addListener(infoWindow, 'domready', function() {
           var iwOuter = $('.gm-style-iw');

           var iwBackground = iwOuter.prev();

           iwBackground.children(':nth-child(2)').css({
               'display': 'none'
           });
           iwBackground.children(':nth-child(4)').css({
               'display': 'none'
           });

           iwBackground.children(':nth-child(1)').attr('style', function(i, s) {
               return s + 'left: 76px !important;';
           });

           iwBackground.children(':nth-child(3)').attr('style', function(i, s) {
               return s + 'left: 76px !important;';
           });

           iwBackground.children(':nth-child(3)').find('div').children().css({
               'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
               'z-index': '1'
           });

           iwBackground.children(':nth-child(3)').attr('style', function(i, s) {
               return s + 'margin: 0px; padding: 0px;';
           });

           var iwCloseBtn = iwOuter.next();
           iwCloseBtn.css({
               'display': 'none'
           });
       });
   };

   self.createInfoWindowContent = function(university) {
        var uniRating;
        var content = `<div class="info-card-wide mdl-card mdl-shadow--2dp">
                        <div class="mdl-card__title">
                            <h2 class="mdl-card__title-text">@@name@@</h2>
                        </div>
                        <div class="mdl-card__supporting-text">
                        <strong>Rating: @@uniRating@@</strong>
                        <br/>
                        <span>@@uniVicinity@@</span>
                        <br/>
                        <span></span>
                        <br/>
                        <span></span>
                        <span class="pull-right"></span>
                        </div>
                        <div class="mdl-card__menu">
                        <button class="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect" onclick="googleMapService.getInfoWindow().close()">
                        <i class="material-icons">clear</i>
                        </button>
                        </div></div>`;

        if(typeof university.rating == 'undefined'){
            uniRating = 'no rating';
        } else {
            uniRating = university.rating();
        }
        content = content.replace('@@name@@', university.name());
        content = content.replace('@@uniRating@@', uniRating);
        content = content.replace('@@uniVicinity@@', university.vicinity());

        return content;
    };





});
