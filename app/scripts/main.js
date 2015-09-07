

var University = (data) => {
  this.id = data.id;
  this.name = ko.observable(data.name);
  this.address = ko.observable(data.formatted_address);
  this.location = ko.computed(function(){
    return {lat: data.geometry.location.G, long: data.geometry.location.K};
  }, this);
  this.icon = ko.observable(data.icon);
  this.website = ko.observable(data.website);
  this.showInfoWindow = ()  => {
      alert("show me");
  };
  
};

var dataMappingOptions = {
    key: function(data) {
        return data.id;
    },
    create: function(options) {
        return new University(options.data);
    }
};

/**
* Application ViewModel.
*/
var viewModel = {
    universities: ko.mapping.fromJS([]),
    loadInitialData: function(data) {
        ko.mapping.fromJS(data, dataMappingOptions, viewModel.universities);
    }
};

// App initialization
$(function() {
    'use strict';


    googleMapService.initializeMap();

    googleMapService.getData().then(function(data){
        viewModel.loadInitialData(data);
    })
    .catch(function(reason){
        console.log(reason);
    });
    ko.applyBindings(viewModel);


});
