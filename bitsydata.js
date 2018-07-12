function load(text) {
    window.open('data:text/plain;charset=utf-8,' + encodeURIComponent(text), "", "_blank");
}

load(document.getElementById("exportedGameData").innerText);
