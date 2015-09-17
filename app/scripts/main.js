//View model
var universities;

// App initialization
$(function() {
    'use strict';

    googleMapService.initializeMap();

    googleMapService.getData().then(function(data){
        console.log(data)
        for(var i = 0; i < data.length; i++){
            data[i].location = {'lat': data[i].geometry.location.H, 'long': data[i].geometry.location.L};
        }
        var universitiesModel = ko.viewmodel.fromModel(data);
        universities =  ko.viewmodel.toModel(universitiesModel);
        console.log('universities viewmodel: ', universities);

        for(var i = 0; i < universities.length; i++){
           //console.log(universities[i] )
          googleMapService.createMarker(universities[i]);
        }

        ko.applyBindings(ko.viewmodel.toModel(universities));
    })
    .catch(function(reason){
        console.log(reason);
    });
});
