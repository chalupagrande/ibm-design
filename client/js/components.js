
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

  }

  map.view = function (ctrl) {
    return m('.#map', {config: mountMap()})
  }

})();




