// Motasim Foad worked on this

var year = new Date().getFullYear();
var score = 0;
var highScore = 0;
var temp;
var rock;
var pikachu;
var timeUp = false;
var gameStart = false;
var pika = new Audio('../../Assets/Audio/WAM/pika.wav');
var boing = new Audio('../../Assets/Audio/WAM/boing.mp3');
var backgroundSound = new Audio('../../Assets/Audio/WAM/background.mp3');
backgroundSound.volume = 0.4;

var pikaImg ;
var deadPikaImg ;
var level;
var gameSpeed;
var gameTimer;
var pow = "../../Assets/Images/WAM/pow.png";


$(document).ready(function(){
// End game dialog
    $( "#dialog" ).dialog({
        autoOpen: false,
        show: {
          effect: "explode",
          duration: 500
        },
        hide: {
          effect: "blind",
          duration: 500
        }
      });
   // Displaying the footer year
   $("#year").html(year);

   // making rock array by usng tagname

   rock = document.getElementsByTagName("img");

   // For level 1

   $("#begin1").click(function (e) { 
       $("#gameBoard2").removeClass("hide");
       $("#gameBoard1").addClass("hide");
       level = 1;
       gameSpeed = 750;
       gameTimer = 30000;

   });

    // For level 2

   $("#begin2").click(function (e) { 
        $("#gameBoard2").removeClass("hide");
        $("#gameBoard1").addClass("hide");
        level = 2;
        gameSpeed = 700;
        gameTimer = 25000;
   });

    // For level 3

   $("#begin3").click(function (e) { 
        $("#gameBoard2").removeClass("hide");
        $("#gameBoard1").addClass("hide");
        level = 3;
        gameSpeed = 600;
        gameTimer = 20000;
   });

   // Game start button 

   $("#start").click(function (e) {

   // Switch case to determine game level with corresponding graphics, audiom time and speed

    switch (level) {
        case 3:
         pikaImg = "../../Assets/Images/WAM/mewtwo.png";
         deadPikaImg = "../../Assets/Images/WAM/deadMewtow.png"; 
         pika = new Audio('../../Assets/Audio/WAM/mew2.mp3');
         backgroundSound = new Audio('../../Assets/Audio/WAM/background.mp3'); 
         backgroundSound.volume = 0.4;
            break;
 
        case 2:
          pikaImg = "../../Assets/Images/WAM/raichu.png";
          deadPikaImg = "../../Assets/Images/WAM/deadraichu.png"; 
          pika = new Audio('../../Assets/Audio/WAM/raichu.mp3');
          backgroundSound = new Audio('../../Assets/Audio/WAM/background2.mp3');
          backgroundSound.volume = 0.4;
             break;
 
        case 1:
         pikaImg = "../../Assets/Images/WAM/pikachu.png";
         deadPikaImg = "../../Assets/Images/WAM/deadPikachu.png";
         pika = new Audio('../../Assets/Audio/WAM/pika.wav');
         backgroundSound = new Audio('../../Assets/Audio/WAM/background3.mp3');
         backgroundSound.volume = 0.4;
            break;
 
       default:
         pikaImg = "../../Assets/Images/WAM/pikachu.png";
         deadPikaImg = "../../Assets/Images/WAM/deadPikachu.png";
         pika = new Audio('../../Assets/Audio/WAM/pika.wav');
         backgroundSound.volume = 0.4;
            break;
    }
   

       // Background sound turned on and game status turned to true

        backgroundSound.play();
        gameStart = true;

       // Hiding start button

        $("#start").addClass("hide");

       // Interval to generate random pikachu/raichu/mewto2

        setInterval(function(){ 
            if (timeUp == false) {
            randomChu();   
        }
        }, gameSpeed);

       // Hiding game board and popping up score dialog with next options

       setTimeout(function(){ 
        $("#gameBoard2").addClass("hide");
        $( "#dialog" ).dialog( "open" );
        $("#currentScore").html(score);
        backgroundSound.pause();
        backgroundSound.currentTime = 0;
        }, gameTimer);
       setTimeout(() => timeUp = true, gameTimer);
       setTimeout(() => gameStart = true, gameTimer);
    });

    // Restarts the game at the same level

    $("#restart").click(function (e) {
        $( "#dialog" ).dialog( "close" );
        $("#gameBoard2").removeClass("hide");
        backgroundSound.play();
        gameStart = true;
        timeUp = false;
        score = 0;
        $("#score").text(score);
        setTimeout(function(){ 
            $("#gameBoard2").addClass("hide");
            $( "#dialog" ).dialog( "open" );
            $("#currentScore").html(score);
            backgroundSound.pause();
            backgroundSound.currentTime = 0;
            }, gameTimer);
        setTimeout(() => timeUp = true, gameTimer);
        setTimeout(() => gameStart = true, gameTimer);
    });

    // Take back to home

    $("#reload").click(function (param) { 
        location.reload(); 
     })

   // Validating a users click and calculating scores

   $("img").click(function (e) { 
       if ($(this).attr("value") == pikachu) {
           $(this).attr("src",  deadPikaImg);
           score = score+1;
           $("#score").text(score);
           $(this).animate({opacity: '0'});
           pika.play();
       } else if(gameStart == true) {
           $(this).attr("src", pow);
           score = score-1;
           $("#score").text(score);
           boing.play();
       }
    });
});

   // Generates random pikachu, Raichu or Mewtow, also clears the game board

function randomChu() {
    pikachu = Math.floor((Math.random() * 9) + 1);
    temp = pikachu;
   
    for (let i = 0; i < rock.length; i++) {
       if ($(rock[i]).attr("value") == pikachu) {
           $(rock[i]).attr("src", pikaImg);
       } else {
           $(rock[i]).attr("src",  "../../Assets/Images/WAM/rock.png");
           $(rock[i]).animate({opacity: '1'});
       }
    }
}