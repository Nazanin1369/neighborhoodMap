
//Model
var model = {
    universities: []
};

/**
* @name getInstaPics
* @description make an API call to Instagram API to get pics by tags
* @param count number of pictures to return
* @param hashtag keyword to search pictures with
*/
function getInstaPics(count, hashtag) {
      var clientId = '85a5b3cd341344cebeea9a990a80b3ed';
			return $.getJSON(`https://api.instagram.com/v1/tags/${hashtag}/media/recent?callback=?&client_id=${clientId}&count=${count}`);
}

/**
* @name filterUniversities
* @description filters universities in the view model based on the searchText value
* @param universities view model universities
* @param searchText input searchText
*/

function filterUniversities(universities, searchText) {
    if(searchText == ''){
      return model.universities;
    }
    return _.filter(universities,
       function(uni){
         return (uni.name.indexOf(searchText) > -1);
       });
}

/**
* @name initializeMarkers
* @description It draws map markers based on the viewmodel universities
*/
function initializeMarkers(vm) {
  googleMapService.clearMarkers();
  for(var i = 0; i < vm.universities().length; i++){
    googleMapService.getMarkers().push(googleMapService.createMarker(vm.universities()[i]));
  }
}

// App initialization
$(function() {
    'use strict';

    googleMapService.initializeMap();
    googleMapService.fitBounds();
    googleMapService.getData().then(function(data){

        _.each(data, function(uni){
            uni.location = {'lat': uni.geometry.location.H, 'long': uni.geometry.location.L};
        });

        model.universities = data;

        var viewmodel = ko.viewmodel.fromModel(model, {
            extend: {
                '{root}.universities[i]': function(uni){
                    uni.showInfoWindow = function(){
                        googleMapService.openInfoWindow(uni);
                    };
                    uni.getInstaPictures = function(){
                      getInstaPics(10, uni.name());
                    };
                },
                '{root}': function(root){
                  root.searchText = ko.observable("");
                }
            }
        });

        viewmodel.searchText.subscribe(function(value) {
           var updatedModel = { universities: filterUniversities(model.universities, value)};
           ko.viewmodel.updateFromModel(viewmodel, updatedModel);
           initializeMarkers(viewmodel);
       });

       initializeMarkers(viewmodel);
       ko.applyBindings(viewmodel);
       googleMapService.initializeInfoWindow();
    })
    .catch(function(reason){
        console.log(reason);
    });
});
