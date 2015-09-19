//View model
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
        var viewModel = ko.viewmodel.fromModel(model, {
            extend: {
                '{root}.universities[i]': function(uni){
                    uni.showInfoWindow = function(){
                        console.log('showing window: ', uni);
                        googleMapService.openInfoWindow(uni);

                    }
                }
            }
        });
        console.log(viewModel);

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
