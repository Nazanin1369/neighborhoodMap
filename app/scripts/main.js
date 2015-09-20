//View model
var viewModel = {}

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
    return _.filter(universities,
       function(uni){
         return (uni.name().indexOf(searchText) > -1);
       });
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
        getInstaPics(10, 'standford').then(function(response){
            console.log(response.data )
        })
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
        console.log('vm: ', viewmodel);
        viewModel = viewmodel;
        viewmodel.searchText.subscribe(function(value) {
           console.log(value);
           var filtered = filterUniversities(viewModel.universities(), value);
           var updatedModel = { universities: function(){ return filtered } };
           console.log(updatedModel)
           ko.viewmodel.updateFromModel(viewmodel, updatedModel, true).onComplete(function () {
             console.log(ko.viewmodel.toModel(updatedModel));
           });
           viewModel = updatedModel;

           //update the viewmodel with new filtered list
           /*var unis = viewmodel.universities();
           for(var i = 0; i < unis.length; i++){
             console.log('name: ', unis[i]);
           }*/
         })

        for(var i = 0; i < viewModel.universities().length; i++){
          googleMapService.createMarker(viewModel.universities()[i]);
        }

       ko.applyBindings(viewModel);
       googleMapService.initializeInfoWindow();
    })
    .catch(function(reason){
        console.log(reason);
    });
});
