let quoteGardenAuthor = "";
let quoteGardenText = "";
let kanyeSaid = "";
let kanyeSaidIt = false;
let correctAnswers = 0;
//variables for timer
let answersLeft = 10;
const timeEl = $(".timer");
let timer;
let scoresObj = [];
let isPlaying = false;
let playerScore = { 
  initials: "", 
  score: 0
};



// start button handler function
$("#start-btn").click(function() {
    if (answersLeft > 0) { 
      // add classes and remove classes to show/hide buttons
      $(this).addClass("is-hidden").text("Next");
      $("#kanye-btn").removeClass("is-hidden");
      $("#someone-else-btn").removeClass("is-hidden");

      // update #welcome and #instructions text
      $("#welcome").text("Who said...");
      let quote = randomizeQuote();
      $("#instructions").text(quote);
      answersLeft--;

      // call API functions again for new data
      randomQuote();
      kanyeQuote();
      
      //call countdown function put it here just to test functionality.  Should be in kanye button and someone else button
      clock();
      isPlaying = true;
    }
    else {
      isPlaying = false;
      $("#modal").addClass("is-active");
      $("#playerScore").text(correctAnswers);
      displayHighScores();
    }
});

// submit button
$('#submit-btn').click(function(event){
  event.preventDefault();
  let initials = $('#inputName').val().trim();
  playerScore.initials = initials;
  playerScore.score = correctAnswers;
  scoresObj.push(playerScore);
  $("#modal-footer").addClass("is-hidden");
  sortHighScores(scoresObj);
  saveScores();
  displayHighScores();
});

// create button handler for kanye button
$("#kanye-btn").click(function() {
  $(this).addClass("is-hidden")
  $("#start-btn").removeClass("is-hidden");
  $("#someone-else-btn").addClass("is-hidden");
  
  // if kanyeSaidIt is true - DO STUFF
  clearInterval(timer);
  if (kanyeSaidIt === true) {
    answerIsCorrect()
  }else answerIsWrong()
});

// create button handler for someone-else button
$("#someone-else-btn").click(function() {
  $(this).addClass("is-hidden")
  $("#start-btn").removeClass("is-hidden");
  $("#kanye-btn").addClass("is-hidden");
  
  // if kanyeSaidIt is false - DO OTHER STUFF
  clearInterval(timer);
  if (kanyeSaidIt === false) {
    answerIsCorrect();
  }else answerIsWrong();
});

$("#view-high-scores-btn").click(function() {
  $("#modal-p").addClass("is-invisible");
  $("#playerScore").addClass("is-invisible");
  $("#modal").addClass("is-active");
  $("#modal-footer").addClass("is-invisible");
  displayHighScores();
});

// close modal button handler
$('#close').click(function(){
  if (isPlaying) {
    $("#modal-p").removeClass("is-invisible");
    $("#playerScore").removeClass("is-invisible");
    $("modal-footer").removeClass("is-invisible");
    $("#modal").removeClass('is-active');
  }
  else {
    location.reload();
  }
});

// function to display high scores to modal
let displayHighScores = function() {
  $("#scoresList").children().remove();
  for (let i = 0; i < scoresObj.length; i++) {
    let listEl = $("<li>");
    let initialsEl = $("<span>").text(scoresObj[i].initials);
    let scoreEl = $("<span>").text(" Score: " + scoresObj[i].score);
    listEl.append(initialsEl);
    listEl.append(scoreEl);
    $("#scoresList").append(listEl);
  }
}

// saves scores to localStorage
var saveScores = function(){
  localStorage.setItem("savedScores", JSON.stringify(scoresObj));
}

// loads scores from localStorage
var loadScores = function(){
  var loadedScores = JSON.parse(localStorage.getItem("savedScores"));
  if (!loadedScores) {
    scoresObj = [];
  }
  else {
    scoresObj = loadedScores;
  }
}

// sorts array
var sortHighScores = function(highScoresArray) {
  var newArray = highScoresArray;
  newArray.sort(function(a, b) {
      return b.score - a.score;
  })
  highScores = newArray;
}

// function to execute when correctly answered
function answerIsCorrect(){
  if (kanyeSaidIt === true) {
    $("#instructions").text("Kanye West");
  }
  else {
    $("#instructions").text(quoteGardenAuthor);
  }
  $("#welcome").text("Correct");
  correctAnswers++;
}

// function to execute when incorrectly answered
function answerIsWrong(){
  if (kanyeSaidIt === true) {
    $("#instructions").text("Kanye West");
  }
  else {
    $("#instructions").text(quoteGardenAuthor);
  }
  $("#welcome").text("Wrong");
}

// randomize a quote to return
let randomizeQuote = function() {
  let randomInt = Math.floor(Math.random() * 2)
  if (randomInt === 0) {
    kanyeSaidIt = false;
    return quoteGardenText;
  }
  else {
    kanyeSaidIt = true;
    return kanyeSaid;
  }
}

//function for random quote
function randomQuote() {
    //make a fetch request to quote garden
    fetch(
      `https://quote-garden.herokuapp.com/api/v3/quotes/random`
      )
      .then(function(randomQuote){
        return randomQuote.json();
      })
      .then(function(randomQuote){
        if (randomQuote.data[0].quoteAuthor === "Kanye West") {
          randomQuote();
        }
        else {
          // variable for Author's name
          quoteGardenAuthor = randomQuote.data[0].quoteAuthor;
          // variable for text of quote
          quoteGardenText = randomQuote.data[0].quoteText;
        }
      })
}

//function for kanye quote
function kanyeQuote() {
  //make a fetch request to kanye rest API
  fetch(
    `https://api.kanye.rest/`
    )
    .then(function(kanyeQuote){
      return kanyeQuote.json();
    })
    .then(function(kanyeQuote){
      kanyeSaid = kanyeQuote.quote;
  })
}

//kanye west giphy funciton
// function kanyeGif() {
// // fetch request for Giphy API targeting Kanye West
//   fetch(
//     'https://api.giphy.com/v1/gifs/search?q=smile-kanye&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1'
//   )
//   .then(function(response) {
//     return response.json()
//   })
//         .then(function(response) {
//           console.log(response)
    
//           // Create a variable that will select the <div> where the GIF will be displayed
//           let responseContainerEl = document.querySelector('#response-container');

//           // Empty out the <div> before we append a GIF to it
//           responseContainerEl.innerHTML = '';

//           //create an img element and attach gif source
//           var gifImg = document.createElement('img');
//           gifImg.setAttribute('src', response.data[0].images.fixed_height.url);

//           // Append 'gifImg' to the <div>
//           responseContainerEl.appendChild(gifImg)
//   })
// }
// kanyeGif()

//function for countdown
function countdown(){
  if(timeleft <= 0){
      clearInterval(timer);
      timeEl.text(timeleft);
      $("#welcome").text("Out of Time!");
      $("#kanye-btn").addClass("is-hidden");
      $("#someone-else-btn").addClass("is-hidden");
      $("#start-btn").removeClass("is-hidden");
      if (kanyeSaidIt === true) {
        $("#instructions").text("Kanye West");
      }
      else {
        $("#instructions").text(quoteGardenAuthor);
      }
  } else {
      timeEl.text(timeleft + " seconds remaining");
      }
      timeleft--;
}

//function for countdown to commense
function clock() {
  clearInterval(timer)
      timeleft = 10
      countdown();
      timer = setInterval (countdown,1000);
}

//results
function showResult(){
  let scoreTag = '<span>a You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
  scoreText.innerHTML = scoreTag; 
}

loadScores();
randomQuote();
kanyeQuote();