
(function(){

  /*******************
        HOME
  *******************/
  window.home = {};

  home.controller = function () {

  }

  home.view = function (ctrl) {
    return m('.home',[
      m('.inner .cover .trans-bg', [
        m('h2', { class: "cover-heading thin marginless"},"Welcome To"),
        m('h1',{ class: "cover-heading thin big"}, "AUSTIN TEXAS")
      ])
    ])
  }

  /*******************
        MAP
  *******************/


  window.map = {};

  map.controller = function () {
    var ctrl = this;

    ctrl.center = new google.maps.LatLng(30.2737251,-97.7368969);
    ctrl.locations = [[30.2728541,-97.744922, "Capital Meet Up"],[30.257416,-97.761144, "ACL", true],[30.2677578,-97.738871, "Trivia Night"], [30.402230, -97.717327, "IBM Meeting"],[30.137393, -97.637709,"X-Games",true]]

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

        if(item[3]){
          marker.setIcon("./images/green-dot.png")
        } else {
          marker.setIcon("./images/blue-dot.png")
        }

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

  music.stubData = [
  { name: "Great Lake Swimmers",
    url: "http://www.austinchronicle.com/imager/b/filmreview/1641992/f2c5/front_slide_img2-956x400.jpg",
    description: "Canadian folk-pop ruralists return with sixth LP, A Forest of Arms.",
    time: "Tue., June 16, 7pm",
    location: "The Parish"
  },
  { name: "The Weepies",
    url: "http://i.ytimg.com/vi/3PmXpT6ejE4/maxresdefault.jpg",
    description: "Cambridge folk marrieds Deb Talan and Steve Tannen cry out fifth LP Sirens.",
    time: "Fri., July 5th, 5pm",
    location: "B.D. Riley's Irish Pub"
  },
  { name: "The Spits",
    url: "http://i.ytimg.com/vi/8Ffx9MoOr-c/hqdefault.jpg",
    description: "Native austin band playing their 3rd LP",
    time: "Thur., July 11, 7pm",
    location: "Bat Bar"
  },
  {
    name: "D'Angelo",
    url: "http://www.okayplayer.com/wp-content/uploads/2012/05/DAngelo-GQ.jpg",
    description: "Cambridge folk marrieds Deb Talan and Steve Tannen cry out fifth LP Sirens.",
    time: "Tue. July 5th, 5pm",
    location: "Downtown somewhere"
  },
  { name: "Outkast",
    url: "http://static.guim.co.uk/sys-images/Music/Pix/pictures/2012/2/27/1330339837566/Outkast-Big-Boi-and-Andre-007.jpg",
    description: "Bringing back some old school hip hop to Bat Bar",
    time: "Thur. July 11, 7pm",
    location: "Bat Bar"
  },
  { name: "Kendrick Lamar",
    url: "http://ecx.images-amazon.com/images/I/51Zzc7PUDML.jpg",
    description: "Good Kid Mad City",
    time: "Tue. July 5th, 5pm",
    location: "B.D. Riley's Irish Pub"
  },
  { name: "God Smack",
    url: "http://www.billboard.com/files/styles/promo_650/public/stylus/107089-godsmack_617.jpg?itok=qSTkB-xl",
    description: "A great band for a the 4th",
    time: "Fri. July 4th, 7pm",
    location: "Shakespears"
  }

  ]

  music.model = function(img, desc, time, loc){
    this.img = m.prop(img)
    this.description = m.prop(desc)
    this.time = m.prop(time)
    this.location = m.prop(loc)
  }

  music.controller = function(){
    var ctrl = this;

  }

  music.view = function(){
   return m('.music',[
       m('h3.title-layer.marginless.big','Music'),
         music.stubData.map(function(song, i){
           var entry = ""
           var float = "left"
           if(i==0){
             entry = ".first-entry"
           }

           return [
             m('.entry'+entry,[
               m("h3", i+1 +": "+song.name),
               m("img[src=" + song.url + "]", {class: float}),
               m("p",[
                 m("b", "Time: "),
                 m("span", song.time)
               ]),
               m("p",[
                 m("b", "Description: "),
                 m("span", song.description)
               ]),
               m("p",[
                 m("b", "location: "),
                 m("span", song.location)
               ])


             ])
           ]
         })
       ])
  }

    /*******************
        Music
  *******************/

  window.outdoors = {}

  outdoors.stubData = [
  { name: "Greenbelt Meetup",
    url: "http://farm1.staticflickr.com/32/53560666_afe01bb852_z.jpg",
    description: "A great place to cool off during the summer. Especially after all this rain!",
    time: "Fri., July 5th, 5pm",
    location: "Secret Beach"
  },
  { name: "ACL",
    url: "http://blog.tickpick.com/wp-content/uploads/2013/09/acl-1.jpg",
    description: "One of the biggest music festivals in the country. See why they say Austing is the Live Music Capitol of the World!",
    time: "Fri., Oct 5th, 5pm",
    location: "Zilker Park"
  },
  { name: "Fun Fun Fun Fest",
    url: "http://images.huffingtonpost.com/2014-11-04-funfunfunfestphoto.jpg",
    description: "Yet another great music festival in Austin. See your favorite underground artists",
    time: "Thur., Nov 6, 7pm",
    location: "Auditorium Shores"
  },
  {
    name: "Blues on the Green",
    url: "http://cdn2.content.compendiumblog.com/import_uploads/a5d2fdfa-ecda-434a-b7c8-b0d555e9a4ed/c98befd653b27e10ac16be014e994668/Blues-on-the-Green2.jpg",
    description: "Listen to Blues and enjoy the outdoors at Zilker every other wednesday during the summer",
    time: "Every other Wednesday",
    location: "Zilker"
  }

  ]

  outdoors.model = function(img, desc, time, loc){
    this.img = m.prop(img)
    this.description = m.prop(desc)
    this.time = m.prop(time)
    this.location = m.prop(loc)
  }

  outdoors.controller = function(){
    var ctrl = this;

  }

  outdoors.view = function(){

    return m('.outdoors',[
         m('h3.title-layer.marginless.big','Outdoors'),

         outdoors.stubData.map(function(song, i){
           var float = "left";
           var entry = "";

           if(i==0){
             entry = ".first-entry"
           }

           return [
             m('.entry' + entry,[
               m("h3", i+1 +": "+song.name),
               m("img[src="+song.url+"]", {class: float}),
               m("p",[
                 m("b", "Time:"),
                 m("span", song.time)
               ]),
               m("p",[
                 m("b", "Description: "),
                 m("span", song.description)
               ]),
               m("p",[
                 m("b", "location: "),
                 m("span", song.location)
               ])
             ])
           ]
         })
       ])
  }

})();




