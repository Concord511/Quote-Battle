let quoteText = "";
let quoteGardenAuthor = "";
let quoteGardenText = "";
let kanyeSaid = "";
let kanyeSaidIt = false;
let famousQuotes = [];
//variables for timer
const timeEl = document.querySelector(".timer")
let timer 


// start button handler function
$("#start-btn").click(function() {
    // add classes and remove classes to show/hide buttons
    $(this).addClass("hide")
    $("#kanye-btn").removeClass("hide");
    $("#someone-else-btn").removeClass("hide");

    // update #welcome and #instructions text
    $("#welcome").text("Who said...");
    let quote = randomizeQuote();
    $("#instructions").text(quote);
    
    // add quote to famousQuotes array
    famousQuotes.push(quote);
    
    // call API functions again for new data
    randomQuote();
    kanyeQuote();
    
    //call countdown function put it here just to test functionality.  Should be in kanye button and someone else button
    clock()
});

// create button handler for kanye button
$("#kanye-btn").click(function() {
  
  $(this).addClass("hide")
  let startBtnEl = $("#start-btn");
  startBtnEl.removeClass("hide").text("Next");
  $("#someone-else-btn").addClass("hide");

  // if kanyeSaidIt is true - DO STUFF
  if (kanyeSaidIt === true && $(this) === true) {
    return answerIsCorrect()
    
  }else answerIsWrong()

});
console.log(answerIsCorrect())

// create button handler for someone-else button
$("#someone-else-btn").click(function() {
  $(this).addClass("hide")
  let startBtnEl = $("#start-btn");
  startBtnEl.removeClass("hide").text("Next");
  $("#someone-else-btn").addClass("hide");

  // if kanyeSaidIt is false - DO OTHER STUFF
  if (kanyeSaidIt === true && $(this) === true) {
    return answerIsWrong()
  }
});




  
function answerIsCorrect(){
  $("#instructions").text("Correct")
  
}

function answerIsWrong(){
  $("#instructions").text("Correct")
}

// checkAnswer()
// console.log(checkAnswer())

// randomize a quote to return
let randomizeQuote = function() {
  let randomInt = (math.Floor(math.Random() * 2))
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
        // variable for Author's name
        quoteGardenAuthor = randomQuote.data[0].quoteAuthor;
        // variable for text of quote
        quoteGardenText = randomQuote.data[0].quoteText;
      })
  }

randomQuote();

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

kanyeQuote();

// kanye west giphy funciton
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
//           var responseContainerEl = document.querySelector('#response-container');

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
      timeEl.innerHTML = timeleft
  } else {
      timeEl.innerHTML = timeleft + " seconds remaining";
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