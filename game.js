var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("h1").text("level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] == userClickedPattern[currentLevel]){
        if(gamePattern.length == userClickedPattern.length){
        setTimeout(function(){
        nextSequence();
    },1000);
    }}
    else{
    playsound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over !! Press any key to restart.");
    setTimeout(function() {
        $("body").removeClass("game-over")}
        ,200);
    startOver();
}}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChoosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChoosenColor);

    $("#" + randomChoosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playsound(randomChoosenColor);

    // while(userClickedPattern.length!=0){
        // userClickedPattern.pop();
    // }
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function playsound(name){
    var makesound = new Audio("sounds/" + name + ".mp3");
    makesound.play();
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}