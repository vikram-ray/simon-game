// TO TRACK IF THE GAME IS STARTED BY THE USER
var gameStarted = false;
// TO CAPTURE THE SEQUENCE OF RANDOM COLORS
var gamePattern = [];
var score = 0;
var level = 0;
//TO CAPTURE THE SEQUENCE OF USER INPUT SQUENCE AND GETS RESET AT EVERY LEVEL
var userClickedPattern = [];

var buttonColors = ["red", "blue", "green", "yellow"];
// TO KNOW IF THE GAME IS STARTTED
$(document).keypress(function() {
  if (!gameStarted) {
    $("h1").text("Level 0");
    nextSequence();
    gameStarted = true;
  }
})

// THIS CHECK IF THE BUTTONS ARE pressed AND IF PRESSSED-
// ADD THAT PATTERN TO THE USERCLICKED PATTERN AND CHECK THE ANS AT EVERY CLICK
$(".btn").click(function(event) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});


//ADD A NEW RANDOM COLOR AT THE END OF THE GAMEPATTERN ARRAY
function nextSequence() {
  var randonNumber = Math.floor(Math.random() * 4) + 1;
  var randomChosenColor = buttonColors[randonNumber - 1];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  level++;
  $("h1").text("Level  " + level);
}

function playSound(color) {
  var sound = new Audio("sounds/" + color + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed")
  }, 100);
}


//THIS COMPARE EACH INPUT BY THE USER WITH GAMEPATTERN AND IT VERIFY IF THE USER ENTERS ALL THE SEQUENCE
//BY COMPARING THE SIZE OF BOTH THE ARRAY
//IF IT FIND EQUAL THEN USER IS RIGHT TILL NOW AND IT CALLS THE nextSequence WHICH INCRESES THE GAME LEVEL
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    score++;
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } else {
    console.log("failure");
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over, Press Any Key to Restart<br>Your score : " + score);
    startOver();
  }

}
// THIS WILL RESET ALL THE DATA
function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
  userClickedPattern = [];
  score = 0;
}
