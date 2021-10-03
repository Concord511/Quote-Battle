// TO DO:
// add modal code to start-btn handler else section

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


// start button handler function
$("#start-btn").click(function() {
    if (answersLeft > 0) { 
      // add classes and remove classes to show/hide buttons
      $(this).addClass("hide").text("Next");
      $("#kanye-btn").removeClass("hide");
      $("#someone-else-btn").removeClass("hide");

      // update #welcome and #instructions text
      $("#welcome").text("Who said...");
      let quote = randomizeQuote();
      $("#instructions").text(quote);
      answersLeft--;

      // call API functions again for new data
      randomQuote();
      kanyeQuote();
      
      //call countdown function put it here just to test functionality.  Should be in kanye button and someone else button
      clock()
    }
    else {
      // pull up modal and show score
    }
});

// create button handler for kanye button
$("#kanye-btn").click(function() {
  $(this).addClass("hide")
  $("#start-btn").removeClass("hide");
  $("#someone-else-btn").addClass("hide");

  // if kanyeSaidIt is true - DO STUFF
  clearInterval(timer);
  if (kanyeSaidIt === true) {
    answerIsCorrect()
  }else answerIsWrong()
});

// create button handler for someone-else button
$("#someone-else-btn").click(function() {
  $(this).addClass("hide")
  $("#start-btn").removeClass("hide");
  $("#someone-else-btn").addClass("hide");

  // if kanyeSaidIt is false - DO OTHER STUFF
  clearInterval(timer);
  if (kanyeSaidIt === false) {
     answerIsCorrect();
  }else answerIsWrong();
});


var saveScores = function(){
    localStorage.setItem("savedScores", JSON.stringify(scoreObj));
}


var loadScores = function(){
    var loadedScores = JSON.parse(localStorage.getItem(savedScores));
    if (!loadScores) {
      scoresObj = [];
    }
    else {
      scoresObj = loadedScores;
    }
}



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
      timeEl.text("Out of Time!");
      $("#kanye-btn").addClass("hide");
      $("#someone-else-btn").addClass("hide");
      $("#start-btn").removeClass("hide");
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

randomQuote();
kanyeQuote();