//Bhargav Desai created

$(window).ready(function(){
    
//    IIFE for setting year and hidding game board
    (function(){
        $("#board").addClass("hidden");
        var year = new Date().getFullYear();
        $("#year").html(year);
    })();
    
//    clicking on start button shows game board
    $(".start").click(function(){
        sessionStorage.player1 = $("#p1").val() || "player 1";
        sessionStorage.player2 = $("#p2").val() || "player 2";
        $(".names").addClass("hidden");
        $("#board").removeClass("hidden");
        $("#screen").text(sessionStorage.player1 + " TURN");
    });
    
//    Consecutive player Turns and checking wrong moves
    var turn = 1;
    
    var moves = 0; //cecking for draws
    $("button").click(function() {
        if($(this).hasClass("fa fa-times") || $(this).hasClass("fa fa-check")){
            $(this).css("background-color", "red"); 
            setTimeout(() => { 
                $(this).css("background-color", "white"); 
            }, 300);         
        }else{
            if(turn == 1) {
                $("#screen").text(sessionStorage.player2 + " TURN"); 
                $(this).addClass("fa fa-check");
                moves++;
                if(check("fa-check")){
                    $("#screen").text(sessionStorage.player1 + " Wins!");
                    $("#screen").css({"color":"green","font-size":"50px"});
                    $("button").css({"pointer-events":"none"});
                    $(".reset").focus();
                }else if(moves == 9){
                    $("#screen").text("It's a Draw!");
                    $("#screen").css({"font-size":"50px"});
                    $("button").css({"pointer-events":"none"});
                    $(".reset").focus();
                } 
                turn = 2;             
            } 
            else {
                $("#screen").text(sessionStorage.player1 +" TURN"); 
                $(this).addClass("fa fa-times");
                moves++;
                if(check("fa-times")){
                    $("#screen").text(sessionStorage.player2 + " Wins!");
                    $("#screen").css({"color":"green","font-size":"50px"});
                    $("button").css({"pointer-events":"none"});
                    $(".reset").focus();
                }else if(moves == 9){
                    $("#screen").text("It's a Draw!");
                    $("#screen").css({"font-size":"50px"});
                    $("button").css({"pointer-events":"none"});
                    $(".reset").focus();
                }
                turn = 1; 
            }
        }
        
    });
    
//    checking winning move
    function check(symbol) {
        if ($(".sq1").hasClass(symbol) &&  
            $(".sq2").hasClass(symbol) && 
            $(".sq3").hasClass(symbol)) 
        { 
            $(".sq1").css("color", "green"); 
            $(".sq2").css("color", "green"); 
            $(".sq3").css("color", "green"); 
            return true; 
        } else if ($(".sq4").hasClass(symbol) 
                && $(".sq5").hasClass(symbol) 
                && $(".sq6").hasClass(symbol)) 
        { 
            $(".sq4").css("color", "green"); 
            $(".sq5").css("color", "green"); 
            $(".sq6").css("color", "green"); 
            return true; 
        } else if ($(".sq7").hasClass(symbol) 
                && $(".sq8").hasClass(symbol) 
                && $(".sq9").hasClass(symbol)) 
        { 
            $(".sq7").css("color", "green"); 
            $(".sq8").css("color", "green"); 
            $(".sq9").css("color", "green"); 
            return true; 
        } else if ($(".sq1").hasClass(symbol) 
                && $(".sq4").hasClass(symbol) 
                && $(".sq7").hasClass(symbol))  
        { 
            $(".sq1").css("color", "green"); 
            $(".sq4").css("color", "green"); 
            $(".sq7").css("color", "green"); 
            return true; 
        } else if ($(".sq2").hasClass(symbol) 
                && $(".sq5").hasClass(symbol) 
                && $(".sq8").hasClass(symbol)) 
        { 
            $(".sq2").css("color", "green"); 
            $(".sq5").css("color", "green"); 
            $(".sq8").css("color", "green"); 
            return true; 
        } else if ($(".sq3").hasClass(symbol) 
                && $(".sq6").hasClass(symbol) 
                && $(".sq9").hasClass(symbol))  
        { 
            $(".sq3").css("color", "green"); 
            $(".sq6").css("color", "green"); 
            $(".sq9").css("color", "green"); 
            return true; 
        } else if ($(".sq1").hasClass(symbol) 
                && $(".sq5").hasClass(symbol) 
                && $(".sq9").hasClass(symbol))  
        { 
            $(".sq1").css("color", "green"); 
            $(".sq5").css("color", "green"); 
            $(".sq9").css("color", "green"); 
            return true; 
        } else if ($(".sq3").hasClass(symbol) 
                && $(".sq5").hasClass(symbol) 
                && $(".sq7").hasClass(symbol))  
        { 
            $(".sq3").css("color", "green"); 
            $(".sq5").css("color", "green"); 
            $(".sq7").css("color", "green"); 
            return true; 
        } else { 
            return false; 
        } 
    }

//    reset button
   $(".reset").click(function(){
       location.reload();
    }); 
});