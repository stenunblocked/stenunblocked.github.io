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

function AddNewStyle() {
    let el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = '../beststyle.css';
    el.type = 'text/css';
    el.id = 'beststyle';

    document.head.appendChild(el);
}

function RemoveNewStyle() {
    let el = document.getElementById("beststyle");

    if (el)
        el.remove();
}

// Used only during fullscreen activation to enhance user experience, preventing ads overlaying the game.
function showAds(show) {
    if (!show) {
        let style = document.createElement("style");
        style.id = 'hideAdsStyle';
        style.textContent = `

            .adsbygoogle, .adsbygoogle iframe,
            .left-side-rail-dismiss-btn, .left-side-rail-edge,
            .right-side-rail-dismiss-btn, .right-side-rail-edge {
                display: none !important;
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

function isFullscreen() {
    return (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
    ) != null;
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

function closeFullscreen() {
    if (document.exitFullscreen)
        document.exitFullscreen();
    else if (document.webkitExitFullscreen)
        document.webkitExitFullscreen();
    else if (document.msExitFullscreen)
        document.msExitFullscreen();

    disableFullscreen();
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
    RemoveNewStyle();
}

function DisableDarkMode() {
    document.body.style.filter = '';
    document.body.style.backgroundColor = '';
    document.body.style.backgroundColor = 'white';
    document.getElementById("darkmode_style").remove();
    AddNewStyle();
}

(function(){
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && _fullscreen) {
            closeFullscreen();
        } else if (event.key === "F11") {
            event.preventDefault();
            if (!_fullscreen) 
                openFullscreen();
            else 
                closeFullscreen();
        }
    });

    document.addEventListener("fullscreenchange", () => {
        _fullscreen = !!document.fullscreenElement;
        if (!_fullscreen) 
            disableFullscreen();
        else
            enableFullscreen();
    });

    document.addEventListener("webkitfullscreenchange", () => {
        _fullscreen = !!document.webkitFullscreenElement;
        if (!_fullscreen) 
            disableFullscreen();
        else
            enableFullscreen();
    });

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

    _fullscreen = !!document.fullscreenElement;
    if (_fullscreen) 
        enableFullscreen();
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

    // For games which looks best in a mobile aspect ratio
    if (typeof mobile !== 'undefined') {
        let style = document.createElement("style");
        style.textContent = `

            iframe:not(.fullScreen) {
                height: 80% !important;
                width: calc(80% * 0.3) !important;
            }

        `;
        document.body.appendChild(style);
    }

    AddNewStyle();
})();


if (getCookie("darkmode") == "1")
    EnableDarkMode();