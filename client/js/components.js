
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
    ctrl.locations = [[30.2728541,-97.744922, "Capital Meet Up"],[30.257416,-97.761144, "ACL"],[30.2677578,-97.738871, "Trivia Night"], [30.402230, -97.717327, "IBM Meeting"],[30.137393, -97.637709,"X-Games"]]

     ctrl.mapStyle =[{"elementType":"geometry","stylers":[{"hue":"#ff4400"},{"saturation":-68},{"lightness":-4},{"gamma":0.72}]},{"featureType":"road","elementType":"labels.icon"},{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"hue":"#0077ff"},{"gamma":3.1}]},{"featureType":"water","stylers":[{"hue":"#00ccff"},{"gamma":0.44},{"saturation":-33}]},{"featureType":"poi.park","stylers":[{"hue":"#44ff00"},{"saturation":-23}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"hue":"#007fff"},{"gamma":0.77},{"saturation":65},{"lightness":99}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"gamma":0.11},{"weight":5.6},{"saturation":99},{"hue":"#0091ff"},{"lightness":-86}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"lightness":-48},{"hue":"#ff5e00"},{"gamma":1.2},{"saturation":-23}]},{"featureType":"transit","elementType":"labels.text.stroke","stylers":[{"saturation":-64},{"hue":"#ff9100"},{"lightness":16},{"gamma":0.47},{"weight":2.7}]}]

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

  // MAP HELPERS

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
      map.set('styles', ctrl.mapStyle)
    }
  }// END MOUNT CHART


  /*******************
        Music
  *******************/

  window.music = {}

  music.controller = function(){
    var ctrl = this;
  }

  music.view = function(){
   return m('.inner .cover .trans-bg', [
      m('h2', { class: "cover-heading thin marginless"},"Welcome To"),
      m('h1',{ class: "cover-heading thin big"}, "The Music Page")
    ])
  }

  /*******************
       Outdoors
  *******************/

  window.outdoors = {}

  outdoors.controller = function(){
    var ctrl = this;
  }

  outdoors.view = function(){
   return m('.inner .cover .trans-bg', [
      m('h2', { class: "cover-heading thin marginless"},"Welcome To"),
      m('h1',{ class: "cover-heading thin big"}, "The outdoors Page")
    ])
  }

})();




