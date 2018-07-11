var controller = document.createElement("div");
var buttonlogic = document.createElement("script");
var dynamicbackground = document.createElement("script");
document.addEventListener(
  "touchmove",
  function(event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  },
  false
);

controller.innerHTML =
  '<div id="controller">' +
  "<style> html {-webkit-user-select: none}" +
  "button{touch-action: manipulation }" +
  "html,body {cursor: pointer; overflow: hidden;}" +
  "canvas { z-index: -10; position: fixed; top: 0vh; height: 100vw; width: 100vw; }" +
  "#controller { position: fixed; top: 60vh; height: 100vw; width: 100vw; left: 0vw; z-index:10; }" +
  ".controller-button { width: 12.5vw; height: 12.5vw; position:fixed; display:block; border-radius: 100%; border: solid black 1px; background-color: white; overflow: hidden; }" +
  "#upButton { bottom: 15vh; left:43.75vw; }" +
  "#downButton { bottom: 5vh; left:43.75vw; }" +
  "#leftButton { bottom: 10vh; left: 30vw; }" +
  "#rightButton { bottom: 10vh; right: 30vw; }" +
  '</style> <button id="upButton" class="controller-button" onclick="fakeKeyPress(Direction.Up)"></button>' +
  '<button id="downButton" class="controller-button" onclick="fakeKeyPress(Direction.Down)"></button>' +
  '<button id="leftButton" class="controller-button" onclick="fakeKeyPress(Direction.Left)"></button>' +
  '<button id="rightButton" class="controller-button" onclick="fakeKeyPress(Direction.Right)"></button>' +
  "</div>";

buttonlogic.innerHTML =
  "function fakeKeyPress(direction) {" +
  "if (!isPlayerEmbeddedInEditor) curPlayerDirection = Direction.None;" +
  "if (dialogBuffer.IsActive()) {" +
  "if (dialogBuffer.CanContinue()) {" +
  "var hasMoreDialog = dialogBuffer.Continue();" +
  "if (!hasMoreDialog) {" +
  "console.log('EXIT DIALOG --- onkeydown');" +
  "onExitDialog();" +
  "}" +
  "} else {" +
  "dialogBuffer.Skip();" +
  "}" +
  "} else if (isEnding) {" +
  "reset_cur_game();" +
  "} else {" +
  "curPlayerDirection = direction;" +
  "}" +
  "movePlayer(curPlayerDirection);" +
  "curPlayerDirection = Direction.NONE;" +
  "}";

  dynamicbackground.innerHTML =
  'import bitsy from "bitsy";'+
  'function palWrap(f) {'+
  	'var _f = bitsy[f];'+
  	'bitsy[f] = function () {'+
  		'var p1, p2;'+
  		'try {'+
  			'p1 = bitsy.curPal();'+
  		'} catch (e) {'+
  			'p1 = null;'+
  		'}'+
  		'if (_f) {'+
  			'_f.apply(undefined, arguments);'+
  			'p2 = bitsy.curPal();'+
  			'if (p1 !== p2) {'+
  				'document.body.style.background = "rgb(" + bitsy.getPal(bitsy.curPal())[0].toString() + ")";'+
  			'}'+
  		'}'+
  	'};'+
  '}'+
  'palWrap("moveSprites");'+
  'palWrap("movePlayer");'+
  'palWrap("parseWorld");';

document.body.append(controller);
document.body.append(buttonlogic);
document.body.append(dynamicbackground);
