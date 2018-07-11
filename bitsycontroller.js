var controller = document.createElement("div");
var buttonlogic = document.createElement("script");
var dynamicbackground = document.createElement("script");

window.fakeKeyPress = (function (direction) {
  if (!isPlayerEmbeddedInEditor) curPlayerDirection = Direction.None;
  if (dialogBuffer.IsActive()) {
    if (dialogBuffer.CanContinue()) {
      var hasMoreDialog = dialogBuffer.Continue();
      if (!hasMoreDialog) {
        console.log("EXIT DIALOG --- onkeydown");
        onExitDialog();
      }
    } else {
      dialogBuffer.Skip();
    }
  } else if (isEnding) {
    reset_cur_game();
  } else {
    curPlayerDirection = direction;
  }
  movePlayer(curPlayerDirection);
  curPlayerDirection = Direction.NONE;
});

var palWrap = function(f) {
  var _f = window[f];
  window[f] = function() {
    var p1, p2;
    try {
      p1 = window.curPal();
    } catch (e) {
      p1 = null;
    }
    if (_f) {
      _f.apply(undefined, arguments);
      p2 = window.curPal();
      if (p1 !== p2) {
        changeButtonColors();
        document.body.style.background =
          "rgb(" + window.getPal(window.curPal())[0].toString() + ")";
      }
    }
  };
};

var changeButtonColors = function() {
  var buttons = document.getElementsByClassName("controller-button");
  for (i = 0; i < buttons.length; i++) {
    buttons[i].style.backgroundColor =
      "rgb(" + window.getPal(window.curPal())[2].toString() + ")";
  }
};

document.addEventListener(
  "touchmove",
  function(event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  },
  false
);
changeButtonColors();
document.body.style.background =
  "rgb(" + window.getPal(window.curPal())[0].toString() + ")";

controller.innerHTML =
  '<div id="controller">' +
  "<style> html {-webkit-user-select: none}" +
  "button{touch-action: manipulation }" +
  "html,body {cursor: pointer; overflow: hidden;}" +
  "canvas { z-index: -10; position: fixed; top: 0vh; height: 100vw; width: 100vw; }" +
  "#controller { position: fixed; top: 60vh; height: 100vw; width: 100vw; left: 0vw; z-index:10; }" +
  ".controller-button { width: 12.5vw; height: 12.5vw; position:fixed; display:block; border-radius: 100%; background-color: white; overflow: hidden; }" +
  "#upButton { bottom: 15vh; left:43.75vw; }" +
  "#downButton { bottom: 5vh; left:43.75vw; }" +
  "#leftButton { bottom: 10vh; left: 30vw; }" +
  "#rightButton { bottom: 10vh; right: 30vw; }" +
  '</style> <button id="upButton" class="controller-button" onclick="fakeKeyPress(Direction.Up)"></button>' +
  '<button id="downButton" class="controller-button" onclick="fakeKeyPress(Direction.Down)"></button>' +
  '<button id="leftButton" class="controller-button" onclick="fakeKeyPress(Direction.Left)"></button>' +
  '<button id="rightButton" class="controller-button" onclick="fakeKeyPress(Direction.Right)"></button>' +
  "</div>";


palWrap("moveSprites");
palWrap("movePlayer");
palWrap("parseWorld");

document.body.append(controller);
changeButtonColors();
