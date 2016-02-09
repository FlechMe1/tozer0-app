var app = {
    // Google Play ID : 596840834279

    // Application Constructor
    initialize: function() {
      this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
      this.onDeviceReady();
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      init_game();

      app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    }
};

function initApp() {
  AdMob.createBanner({
    adId: 'ca-app-pub-6973096842645745/4401535872',
    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    autoShow: true
  });
  AdMob.prepareInterstitial({
    adId:"ca-app-pub-6973096842645745/1316971878",
    autoShow:false
  });
}
document.addEventListener('deviceready', initApp, false);


R = Math.random;
d = document;
moves = 0;
var score = 0;

var r = [];

A = function(x, c) {
  return (c || d).querySelector(x)
}
B = function(x, c) {
  return [].slice.call((c || d).querySelectorAll(x))
}
C = function C(x, y) {
  return A('.tile.x' + x + '.y' + (y < 0 ? 'h' : y))
}

$(window).ready(function() {
  width = $('#game').width();
  $('#game').height(width);


  var best_score = localStorage['best_score'];
  if (best_score) {
    min = Math.floor(best_score / 60);
    sec = best_score % 60;
    prnt = ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
    $('.old-score .last').html(prnt);
  }
});

$(window).resize(function() {
  width = $('#game').width();
  $('#game').height(width);
})

// create tile
function tile(x, y, v, t) {

  html = "<div data-x='" + x + "' data-y='" + y + "' class='tile x" + x + " y" + (y < 0 ? 'h' : y) + "'>" + v + "</div>";
  $('#game').append(html);

  $('.tile.x' + x + '.y' + y).data('x', x)
    .data('y', y)
    .css("background-color", get_bg_color(v))
    .css("color", get_color(v));
  return $('.tile.x' + x + '.y' + y);
}

function changePos(x, y, t) {
  t.attr('class', 'tile x' + x + ' y' + (y < 0 ? 'h' : y))
    .data('x', x)
    .data('y', y)
    .css("background-color", get_bg_color(parseInt(t.html())))
    .css("color", get_color(parseInt(t.html())));
}

function getX(c) {
  result = c.match(/x(\d)/)[1];
  return parseInt(result);
}

function getY(c) {
  result = c.match(/y(\d)/)[1];
  return parseInt(result);
}

function getAdjacentTiles(t, t0, value, r) {
  //return un tableau
  var v = parseInt(t.html());
  var x = parseInt(t.data('x'));
  var y = parseInt(t.data('y'));
  var y0 = parseInt(t0.data('y'));
  var x0 = parseInt(t0.data('x'));

  var s0 = get_selector(x0, y0);
  var s = get_selector(x, y);

  tableau = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0]
  ];

  var s1 = get_selector(x, y + 1);
  var s2 = get_selector(x, y - 1);
  var s3 = get_selector(x - 1, y);
  var s4 = get_selector(x + 1, y);
  var t1 = $(s1);
  var t2 = $(s2);
  var t3 = $(s3);
  var t4 = $(s4);
  if (value == v && !t.hasClass('sel')) {
    if (s != s0) {
      t.addClass('sel');
      r.push(t);
    }
    getAdjacentTiles(t1, t0, value, r);
    getAdjacentTiles(t2, t0, value, r);
    getAdjacentTiles(t3, t0, value, r);
    getAdjacentTiles(t4, t0, value, r);
  } else {
    return r;
  }
  return r;
}


function get_selector(x, y) {
  return '.tile.x' + x + '.y' + (y < 0 ? 'h' : y);
}

function interAction(t, a, b, m) {
  if ($('.sel').length > 0) return; //empêche la selection d'un elem si suppression en cours

  m = parseInt(t.html());
  var r = [];
  a = getAdjacentTiles(t, t, m, r); //t, t0, value, r


  if (m == 1 && r.length > 0) {
    clearTimeout(compte);
    score = $('.score .actual').html();
    $('.game-over').addClass('active');
    AdMob.showInterstitial()
    var best_score = localStorage['best_score'];
    var current_score = minu * 60 + secon;
    if (!best_score || best_score > current_score) {
      localStorage['best_score'] = current_score;

      $('.old-score .last').html(("0" + minu).slice(-2) + ":" + ("0" + secon).slice(-2));
    }
  }
  if (m > 0 && r.length > 0) {
    t.html(m - 1);
    t.css("background-color", get_bg_color(parseInt(t.html())))
      .css("color", get_color(parseInt(t.html())));
    removeTiles(r);

    fall(1);
  }

}


// remove tile and execute callback on transition end
function removeTile(t) {
  t.addClass('fade-out');
  setTimeout(function() {
    t.remove();
  }, 50);
}

function removeTiles(a) {
  if (a.length > 0) {
    b = a.pop();
    removeTile(b);
    removeTiles(a);
  }
}

function fall(r, f, x, y, t) {
  for (y = 5; y >= -1; y--) {
    for (x = 7; x--;) {

      selector = get_selector(x, y);
      selector_plusone = get_selector(x, y + 1);

      var elem_plusone = $(selector_plusone); // EN DESSOUS

      if ((elem = $(selector)) && !elem_plusone.length) {
        changePos(x, y + 1, elem);
        f++
      }
    }
  }
  if (f > 0) {
    return setTimeout(function() {
      fall(r)
    }, 10);
  }

  if (r > 0) {
    for (x = 7; x--;) {
      var selector = get_selector(x, 0);
      var olem = $(selector);

      if (!olem.length && R() < .8) {
        value = 7 + (R() * 3) | 0;
        tile(x, -1, value);
      }
      setTimeout(function() {
        fall(r - 1)
      }, 50);
    }

  }
}


// init game

var centi = 0;
var secon = 0;
var minu = 0;
var clic = 0;
var compte = null;
var prec_score = 0;

var is_start = false;

function init_game() {
  is_start = false;
  clearTimeout(compte);
  compte = null;
  $('.game-over').removeClass('active');
  prec_score = centi + (secon * 1000) + (minu * 60000);
  centi = secon = minu = clic = 0;
  is_start = false;
  $('#game').html('');
  for (i = 7; i--;) {
    for (j = 7; j--;) {
      tile(i, j, 7 + (R() * 3) | 0);
    }
  }
  $('.actual').html("00:00");
  $('#game').click(function(event) {
    if ($(event.target).hasClass('tile')) {
      clic++;
      interAction($(event.target));
      if (!is_start) {
        is_start = true;
        chrono();
      }
    }

  });
}

function get_bg_color(number) {
  switch (number) {
    case 1:
      return "#95a5a6";
      break;
    case 2:
      return "#e74c3c";
      break;
    case 3:
      return "#e67e22";
      break;
    case 4:
      return "#f1c40f";
      break;
    case 5:
      return "#1abc9c";
      break;
    case 6:
      return "#2ecc71";
      break;
    case 7:
      return "#3498db";
      break;
    case 8:
      return "#9b59b6";
      break;
    case 9:
      return "#34495e";
      break;
    default:
      return "#000";
      break;
  }
}

function get_color(number) {
  switch (number) {
    case 1:
      return "#333";
      break;
    case 2:
      return "#fff";
      break;
    case 3:
      return "#fff";
      break;
    case 4:
      return "#fff";
      break;
    case 5:
      return "#fff";
      break;
    case 6:
      return "#fff";
      break;
    case 7:
      return "#fff";
      break;
    case 8:
      return "#fff";
      break;
    case 9:
      return "#fff";
      break;
    default:
      return "#000";
      break;
  }
}

function chrono() {
  centi++;
  if (centi > 9) {
    centi = 0;
    secon++;
  }
  if (secon > 59) {
    secon = 0;
    minu++;
  }
  time = minu * 60 + secon;
  s = (time * clic);

  $('.score .actual').html(("0" + minu).slice(-2) + ":" + ("0" + secon).slice(-2));
  compte = setTimeout('chrono()', 100);
}
