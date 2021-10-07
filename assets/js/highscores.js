var highScore = document.querySelector('#highScore');
var back = document.querySelector('#back');
var clear = document.querySelector('#clear');

// local storage
var savedScores = localStorage.getItem("savedScores");
savedScores = JSON.parse(savedScores);

//clear scores

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//back to quiz

back.addEventListener("click", function() {
    window.location.replace("./index.html");
});

