

//function for random quote
function randomQuote() {
    //make a fetch request to quote garden
    fetch(
      `https://quote-garden.herokuapp.com/api/v3/quotes/random`
      )
      
    
    .then(function(randomQuote){
      return randomQuote.json()
    })
        .then(function(randomQuote){
          console.log(randomQuote)
          // variable for Author's name
          const quoteAuthor = randomQuote.data[0].quoteAuthor
          console.log(quoteAuthor)
          // variable for text of quote
          const quoteText = randomQuote.data[0].quoteText
          console.log(quoteText)
          // variable for the genre of the quote
          const  quoteGenre = randomQuote.data[0].quoteGenre
          console.log(quoteGenre)
        })
  }

randomQuote()


//function for kanye quote
function kanyeQuote() {
  //make a fetch request to kanye rest API
  fetch(
    `https://api.kanye.rest/`
    )
      
    
    .then(function(kanyeQuote){
      return kanyeQuote.json()
    })
    
  
        .then(function(kanyeQuote){
          console.log(kanyeQuote)
          const kanyeSaid = kanyeQuote.quote
          console.log(kanyeSaid)
  })
}

kanyeQuote()




// kanye west giphy funciton
function kanyeGif() {

// fetch request for Giphy API targeting Kanye West
fetch(
  'https://api.giphy.com/v1/gifs/search?q=smile-kanye&api_key=HvaacROi9w5oQCDYHSIk42eiDSIXH3FN&limit=1'
)
  .then(function(response) {
    return response.json()
  })
        .then(function(response) {
          console.log(response)
    
          // Create a variable that will select the <div> where the GIF will be displayed
          var responseContainerEl = document.querySelector('#response-container');

          // Empty out the <div> before we append a GIF to it
          responseContainerEl.innerHTML = '';

          //create an img element and attach gif source
          var gifImg = document.createElement('img');
          gifImg.setAttribute('src', response.data[0].images.fixed_height.url);

          // Append 'gifImg' to the <div>
          responseContainerEl.appendChild(gifImg)
  
  
  })

}

  kanyeGif()


