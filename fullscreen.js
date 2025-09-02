var _fullscreen = false;
var _frame = document.getElementsByTagName("iframe")[0];

var scrollKeys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function preventDefaultForScrollKeys(e) {
  if (scrollKeys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.addEventListener(wheelEvent, preventDefault, wheelOpt);
  window.addEventListener('touchmove', preventDefault, wheelOpt);
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

// Used only during fullscreen activation to enhance user experience, preventing ads overlaying the game.
function showAds(show) {
    if (!show) {
        let style = document.createElement("style");
        style.id = 'hideAdsStyle';
        style.textContent = `

            .adsbygoogle {
                display: none;
            }

        `;
        
        document.body.appendChild(style);
    } else {
        let el = document.getElementById("hideAdsStyle");

        if (el)
            el.remove();
    }
}

function enableFullscreen() {
    document.body.style.overflow = "hidden";
    _fullscreen = true;
    _frame.setAttribute("class", "fullScreen");
    disableScroll();
    showAds(0);

    if (document.getElementById("fullscrenBackground")) {
        document.getElementById("fullscrenBackground").style.width = '100%';
        document.getElementById("fullscrenBackground").style.display = '';
    }
}

function disableFullscreen() {
    document.body.style.overflow = "";
    _fullscreen = false;
    _frame.setAttribute("class", "");
    enableScroll();
    showAds(1);

    if (document.getElementById("fullscrenBackground")) {
        document.getElementById("fullscrenBackground").style.width = '0';
        document.getElementById("fullscrenBackground").style.display = 'none';
    }
}

function openFullscreen() {
    if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
    }
    enableFullscreen();
}


function EnableDarkMode() {
    document.body.style.filter = 'invert(100%)';
    document.body.style.backgroundColor = 'black';


    const style = document.createElement("style");
    style.textContent = "a { color: white !important; } a { filter: invert(100%) }" + 
                        "iframe { filter: invert(100%) }";
    style.setAttribute("id", "darkmode_style");
    document.head.appendChild(style);
}

function DisableDarkMode() {
    document.body.style.filter = '';
    document.body.style.backgroundColor = '';
    document.body.style.backgroundColor = 'white';
    document.getElementById("darkmode_style").remove();
}

(function(){
    document.onkeydown=function(event) {
        if (_fullscreen && (event.keyCode === 27 || event.keyCode === 122)) {
            disableFullscreen();
            setTimeout(() => document.exitFullscreen(), 1000);
        } else if (!_fullscreen && event.keyCode === 122) {
            enableFullscreen();
        }
    }

    window.onresize = function(e) {
        if (!(!window.screenTop && !window.screenY) && (window.innerWidth == screen.width && window.innerHeight == screen.height)) {
            if (!_fullscreen) {
                enableFullscreen();
            }
        } else if (_fullscreen) {
            disableFullscreen();
        }
    }

    let el = document.createElement('p');
    document.body.appendChild(el);
    el.outerHTML = '<p style="font-family: Arial;">&nbsp;Press <b>F11</b> to enter <a href="#" onclick="openFullscreen()">fullscreen</a>.</p>';

    el = document.createElement("img");
    el.style.width = "20%";
    el.style.height = "18%";
    el.style.transform = "translateX(-14.7%)"
    el.style.cursor = "pointer";
    el.src = "../stennerela.jpg";
    el.title = "More unblocked games";
    document.body.appendChild(el);
    el.style.userSelect = 'none';
    el.outerHTML = '<div style="text-align:right;width:100%;height:100%;"><a href="../index.html" style="width:100%;height:100%">' + el.outerHTML + '</a></div>';

    window.onresize(null);
    _frame.contentWindow.document.addEventListener("keydown", document.onkeydown);

    let ctr = document.createElement("center");

    ctr.style.position = "absolute";
    ctr.style.width = "100%";
    ctr.style.height = "100%";
    ctr.style.top = "85%";

    ctr.appendChild(document.createElement("hr"));

    let desc = document.querySelector('meta[name="description"]');
    if (desc) {
        el = document.createElement("p");
        el.style.fontFamily = 'Arial';
        el.innerText = desc.getAttribute("content");
        ctr.appendChild(el); 
    }
    document.body.appendChild(ctr);
})();


if (getCookie("darkmode") == "1")
    EnableDarkMode();