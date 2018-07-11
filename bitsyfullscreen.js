if (document.getElementsByClassName("load_iframe_btn").length){
  document.getElementsByClassName("load_iframe_btn")[0].click();
}
window.location = document.getElementsByTagName("iframe")[0].src;
