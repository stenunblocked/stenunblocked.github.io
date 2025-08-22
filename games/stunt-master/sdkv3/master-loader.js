"use strict";
var scripts = document.getElementsByTagName("script"),
    scriptUrl = scripts[scripts.length - 1].src,
    root = scriptUrl.split("sdkv3/master-loader.js")[0],
    loaders = {
        unity: "sdkv3/unity.js", "unity-2020": "/../sdkv3/unity-2020.js"
    };
if (0 <= window.location.href.indexOf("pokiForceLocalLoader") 
	&& (loaders.unity = "sdkv3/unity.js",
		
		root = "/loaders"), !window.config) throw Error("window.config not found");
var loader = loaders[window.config.loader];
if (!loader) throw Error('Loader "' + window.config.loader + '" not found');
if (!window.config.unityWebglLoaderUrl) {
    var versionSplit = window.config.unityVersion ? window.config.unityVersion.split(".") : [],
        year = versionSplit[0],
        minor = versionSplit[1];
          window.config.unityWebglLoaderUrl ="../sdkv3/UnityLoader.js";
    // switch (year) {
    //     case "2019":
    //         window.config.unityWebglLoaderUrl = 1 === minor ? "./UnityLoader.2019.1.js" : "./UnityLoader.2019.2.js";
    //         break;
    //     default:
    //         window.config.unityWebglLoaderUrl = "https://game-cdn.poki.com/loaders/v2/unity/static/UnityLoader.js"
    // }
}
var sdkScript = document.createElement("script");
sdkScript.src = "../sdkv3/poki-sdk.js", sdkScript.onload = function() {
    var i = document.createElement("script");
    console.log(root + loader);
    i.src = root + loader, document.body.appendChild(i)
}, document.body.appendChild(sdkScript);