//View model
var model = {
    universities: []
};

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
        model.universities = data;
        var viewModel = ko.viewmodel.fromModel(model, {
            extend: {
                '{root}.universities[i]': function(uni){
                    uni.showInfoWindow = function(){
                        console.log('showing window: ', uni)
                    }
                }
            }
        });
        console.log(viewModel)
        //console.log('universities viewmodel: ', viewModel.universities, viewModel);

        for(var i = 0; i < viewModel.universities().length; i++){
          googleMapService.createMarker(viewModel.universities()[i]);
        }

       ko.applyBindings(viewModel);
    })
    .catch(function(reason){
        console.log(reason);
    });
});
