(function(){

  var clientHeight = document.documentElement.clientHeight

  window.onresize = function() {
    clientHeight = document.documentElement.clientHeight
  }

  var update = function() {
    var scrollTop = window.pageYOffset ||
                    document.documentElement.scrollTop ||
                    document.body.scrollTop || 0,
        elements = document.getElementsByClassName('load-demand')

    for (var i = 0, max = elements.length; i < max; i++) {

      if (elements[i].innerHTML != '') {
        continue
      }

      var y1 = elements[i].offsetTop, y2 = elements[i].offsetTop + elements[i].offsetHeight
          // x1 = elements[i].offsetLeft, x2 = elements[i].offsetLeft + elements[i].offsetWidth

      if (scrollTop <= y1 && y1 < scrollTop + clientHeight ||
        scrollTop < y2 && y2 < scrollTop + clientHeight
      ) {
        elements[i].innerHTML = elements[i].getAttribute('data-load-demand')
      }
    }
  }

  setInterval(function(){

    update()

  }, 300)

}())
