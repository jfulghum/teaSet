document.addEventListener("DOMContentLoaded", () => {
  
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var teacup = new Image;
  teacup.src = "assets/teacup.png";
  var background = new Image;
  background.src = "assets/background.jpeg";
  ctx.drawImage(background, 10, 10);
  ctx.drawImage(teacup, 90 , 90);
});