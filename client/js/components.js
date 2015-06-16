
(function(){

  /*******************
        HOME
  *******************/
  window.home = {};

  home.controller = function () {

  }

  home.view = function (ctrl) {
    return m('.inner .cover .trans-bg', [
      m('h2', { class: "cover-heading thin marginless"},"Welcome To"),
      m('h1',{ class: "cover-heading thin big"}, "AUSTIN TEXAS")
    ])
  }

  /*******************
        MAP
  *******************/


  window.map = {};

  map.controller = function () {
    var ctrl = this;

    ctrl.center = new google.maps.LatLng(30.2737251,-97.7368969);
    ctrl.locations = [[30.2728541,-97.744922, "Capital Meet Up"],[30.257416,-97.761144, "ACL"],[30.2677578,-97.738871, "Trivia Night"]]

    ctrl.initializeMap = function() {
      // getLocation();
      var mapCanvas = document.getElementById('map')
      var mapOptions = {
        center: center,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      var map = new google.maps.Map(mapCanvas, mapOptions)
      map.set('styles', mapStyle)
      addMarkers(map);

    }

    ctrl.getLocation = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position){
          center = new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
        })
      }
    }

    ctrl.addMarkers = function(map){
      ctrl.locations.forEach(function(item){
        var marker = new google.maps.Marker({
          position: new google.maps.LatLng(item[0],item[1]),
          map: map
        });

        var infowindow = new google.maps.InfoWindow({
          content: "<span class='map-info'>"+item[2]+"</span>"
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map, marker);
        });
      })
    }



  }// end Controller

  map.view = function (ctrl) {
    return m('#map', {config: mountMap.papp(ctrl)})
  }

  function mountMap (ctrl, elem, hasInitialized, context) {
    if (!hasInitialized) {
      $(elem).height($(window).height())
      var mapCanvas = document.getElementById('map');
      var mapOptions = {
        center: ctrl.center,
        zoom: 11,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      var map = new google.maps.Map(mapCanvas, mapOptions)
      ctrl.addMarkers(map);
    }
  }// END MOUNT CHART

})();




