var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// false means not started, true means started
var gameStarted = false;
var level = 0;

//keep track of how many button has the user pressed on this level so far
var userButtonOrder = 0;


//Rules


$("#rules").on("click",function(){
  $("p").slideToggle();
})



//Starts the game. Either by keypress or button click
$(document).keypress(function () {
  if (!gameStarted) {
    startOver();
    $("#level-title").text("Level " + level);
    nextSequence();
  } 
});

$("#start-over").on("click", function () {
  startOver();
  $("#level-title").text("Level " + level);
  nextSequence();
});

//produce next sequence of the game
function nextSequence() {
  level += 1;
  $("h1").text("Level " + level);

  //delay button sequence by 100ms
  setTimeout(function () {
    var num = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[num];
    gamePattern.push(randomChosenColour);
    var selectedBtn = $("#" + randomChosenColour);
    selectedBtn.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }, 50);
}



//record down User input and check if user can advance to next level
$(".button").click(function (event) {
  if (gameStarted) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkIfInputCorrect();
  }
});

function checkIfInputCorrect() {
  if (userClickedPattern[userButtonOrder] == gamePattern[userButtonOrder]) {
    userButtonOrder += 1;
  } else {
    gameOver();
  }
  if (userButtonOrder == level) {
    userClickedPattern = [];
    userButtonOrder = 0;
    setTimeout(nextSequence, 1000);
  }
}

function gameOver() {
  gameStarted = false;
  playSound("wrong");
  $("h1").text("Game over");
  $("#start-over").removeClass("invisible");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
  $("h1").text("Press any key to restart");
}



function startOver() {
  $("#start-over").addClass("invisible");
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  userButtonOrder = 0;
  gameStarted = true;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var selectedBtn = $("#" + currentColour);
  selectedBtn.addClass("pressed");
  setTimeout(function () {
    selectedBtn.removeClass("pressed");
  }, 75);
}
