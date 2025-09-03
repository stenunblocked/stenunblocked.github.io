// Used for resizing canvases in Unity WebGL games that for some reason doesn't do that by themselves.

function resizeCanvas() {
    var canvas = document.querySelector("#gameContainer canvas");
    if (canvas) {
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
    }
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("load", resizeCanvas);