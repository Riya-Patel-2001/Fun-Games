// Riya Patel's Page

// This year for footer
var year = new Date().getFullYear();

//e-mail pattern for validation 
var emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}\b/;

//API for maintaining user details
var api ="https://jsonbox.io/box_858c0c50b8c4f59bb643/users";

$(document).ready(function(){
    //jquery UI using IIFE
    ( function() {
        $( "#tabs" ).tabs();
        $("#emailInput").focus();
    } )();
    
    //log in form submit event
    $("#logInForm").submit(function(){
        $("#spinner").css("display", "block");
        $("#logIn").css("display", "none");

        var validationStatus = true;
        
        //form validation for log in form
        if($("#telInput").val() == ""){
            validationStatus = false;
            $("#err_telephone").text("This field is required.");
        } 
        else if(isNaN($("#telInput").val())){
            validationStatus = false;
            $("#err_telephone").text("Please enter number.");
        }
        else{
            $("#err_telephone").text("");
        }
        if($("#emailInput").val() == ""){
            validationStatus = false;
            $("#err_emailInput").text("This field is required.");
        } 
        else if(!emailPattern.test($("#emailInput").val())){
            validationStatus = false;
            $("#err_emailInput").text("Must be a valid e-mail address.");
        }
        else{
            $("#err_emailInput").text("");
        }

        if(validationStatus){
            userValidate($("#emailInput").val(), $("#telInput").val(), true);           
        }
        else{
            $("#spinner").css("display", "none");
            $("#logIn").css("display", "block");
        }
        return false;
    });

    //sign up form submit event
    $("#signUpForm").submit(function(){
        $("#spinner").css("display", "block");
        $("#signUp").css("display", "none");
        var validationStatus = true;

        //form validation for sign up form
        if($("#firstName").val() == ""){
            validationStatus = false;
            $("#err_firstName").text("This field is required.");
        } 
        else{
            $("#err_firstName").text("");
        }

        if($("#lastName").val() == ""){
            validationStatus = false;
            $("#err_lastName").text("This field is required.");
        } 
        else{
            $("#err_lastName").text("");
        }

        if($("#userEmail").val() == ""){
            validationStatus = false;
            $("#err_userEmail").text("This field is required.");
        } 
        else if(!emailPattern.test($("#userEmail").val())){
            validationStatus = false;
            $("#err_userEmail").text("Must be a valid e-mail address.");
        }
        else{
            $("#err_emailInput").text("");
        }

        if($("#userTelephone").val() == ""){
            validationStatus = false;
            $("#err_userTelephone").text("This field is required.");
        } 
        else if(isNaN($("#userTelephone").val())){
            validationStatus = false;
            $("#err_userTelephone").text("Please enter number.");
        }
        else{
            $("#err_userTelephone").text("");
        }

        if($("#birthDateInput").val() == ""){
            validationStatus = false;
            $("#err_birthDateInput").text("This field is required.");
        } 
        else{
            $("#err_birthDateInput").text("");
        }

        if(validationStatus){
            userValidate($("#emailInput").val(), $("#telInput").val(), false);
        }
        else{
            $("#spinner").css("display", "none");
            $("#signUp").css("display", "block");
        }
        return false;
    });

    //xhr call to API to check user is exist or not
    var userValidate = function(email, telephone, isLogIn){
        var xhr = new XMLHttpRequest();
        xhr.withCredentials = false;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4 && this.status == 200) {
                if(isLogIn){
                    logInHandler(this.responseText);
                }
                else{
                    signUpHandler(this.responseText);
                }
            }
        });

        xhr.open("GET", api + "?q=userEmail:" + email + ",userTelephone:" + telephone);
        xhr.setRequestHeader("content-type", "application/json");
        xhr.setRequestHeader("cache-control", "no-cache");
        xhr.send();
    }

    //log in if API sends success or show error in case no user found
    var logInHandler = function(response){
        if(response == "" || response == "[]"){
            //error
            $("#err_logInForm").text("No specific record found.");
            $("#spinner").css("display", "none");
            $("#logIn").css("display", "block");
        }
        else{
            transitionHandler(response);
        }
    }

    //create user if same user not exist or show error if user already exist
    var signUpHandler = function(response){
        if(response == "" || response == "[]"){
            var data = JSON.stringify({
                "firstName": $("#firstName").val(),
                "lastName": $("#lastName").val(),
                "userEmail": $("#userEmail").val(),
                "userTelephone": $("#userTelephone").val(),
                "birthDateInput": $("#birthDateInput").val()
            });

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = false;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4 && this.status == 200) {
                    transitionHandler(this.responseText);
                }
            });

            xhr.open("POST", api);
            xhr.setRequestHeader("content-type", "application/json");
            xhr.setRequestHeader("cache-control", "no-cache");
            xhr.send(data);
        }
        else{
            $("#err_signUpForm").text("This record is already exist.");
            $("#spinner").css("display", "none");
            $("#signUp").css("display", "block");
        }
    }

    //store user data in session and display after log in page
    var transitionHandler = function(response){
        var json = JSON.parse(response);
        if(Array.isArray(json)){
            sessionStorage.userDetail = response;
            $("#playerName").text(json[0].firstName + " " + json[0].lastName);
        }
        else{
            sessionStorage.userDetail = response;
            $("#playerName").text(json.firstName + " " + json.lastName);
        }
        $("#homePage").css("display", "flex");
        $("#tabs").css("display", "none");
    }
    //for footer
    $("#year").html(year);
}); 