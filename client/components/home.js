(function(){
  window.home = {};

  home.controller = function () {

  }

  home.view = function (ctrl) {
    return m('.home', [
      m('h3', "Welcome To Chart Me!"),
    ])
  }

})()