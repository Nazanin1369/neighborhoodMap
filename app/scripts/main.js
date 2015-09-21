
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

function filterUniversities(universities, searchText){
  console.log('searchText', searchText);
    if(searchText == ''){
      return model.vmUniversities;
    }
    return _.filter(universities,
       function(uni){
         return (uni.name().indexOf(searchText) > -1);
       });
}
/**
* @name initializeMarkers
* @description It draws map markers based on the viewmodel universities
*/
function initializeMarkers(vm){
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
        console.log(data)
        for(var i = 0; i < data.length; i++){
            data[i].location = {'lat': data[i].geometry.location.H, 'long': data[i].geometry.location.L};
        }
        /*getInstaPics(10, 'standford').then(function(response){
            console.log(response.data )
        })*/
        model.universities = data;
        var viewmodel = ko.viewmodel.fromModel(model, {
            extend: {
                '{root}.universities[i]': function(uni){
                    uni.showInfoWindow = function(){
                        googleMapService.openInfoWindow(uni);

                    }
                },
                '{root}': function(root){
                  root.searchText = ko.observable("");
                }
            }
        });
        //for resetting the markers on empty search text we need this
        model.vmUniversities = viewmodel.universities();
        viewmodel.searchText.subscribe(function(value) {
           console.log(value);
           var filtered = filterUniversities(viewmodel.universities(), value);

           //TESTING
           for(var i = 0; i < filtered.length; i++){
             console.log('name: ', filtered[i].name());
           }
           var updatedModel = { universities: function(){ return filtered } };

           ko.viewmodel.updateFromModel(viewmodel, updatedModel, true).onComplete(function () {
             var m = ko.viewmodel.toModel(updatedModel)
           });
           viewmodel = updatedModel;
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
