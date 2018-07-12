function load(text) {
    stopGame();
    document.documentElement.innerHTML = '<pre>' + text + '</pre>';
}

load(document.getElementById("exportedGameData").innerText);
