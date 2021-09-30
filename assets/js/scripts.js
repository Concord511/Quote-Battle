


function randomQuote() {
    //make a fetch request to quote garden
    fetch(`https://quote-garden.herokuapp.com/api/v3/quotes/random`)
      
    
    .then(function(randomQuote){
      return randomQuote.json()
    })
        .then(function(randomQuote){
          console.log(randomQuote)
          const quoteAuthor = randomQuote.data[0].quoteAuthor
          console.log(quoteAuthor)
          const quoteText = randomQuote.data[0].quoteText
          console.log(quoteText)
          const  quoteGenre = randomQuote.data[0].quoteGenre
          console.log(quoteGenre)
        })
      }

randomQuote()


function kanyeQuote() {
  //make a fetch request to kanye rest API
  fetch(`https://api.kanye.rest/`)
      
    
    .then(function(kanyeQuote){
      return kanyeQuote.json()
    })
    
  
        .then(function(kanyeQuote){
          const kanyeSaid = kanyeQuote.quote
          console.log(kanyeSaid)
  })
}

kanyeQuote()
  
  
  



// function myFunction() {
  //   fetch(
  //     // Make a fetch request to Wikipedia to get a random article title
  //     `https://en.wikipedia.org/w/api.php?action=query&format=json&list=random&rnnamespace=0&rnlimit=1&origin=*`
  //     //
  //   )
  //     .then(function(wikiResponse) {
  //       return wikiResponse.json();
  //     })
  //     .then(function(wikiResponse) {
  //       console.log(wikiResponse)
  //       // Create a variable to hold the title of the Wikipedia article
  //       // YOUR CODE HERE
  //       var title = wikiResponse.query.random[0].title
  //       // Display the article title above the GIF as a <h2> heading
  //       // YOUR CODE HERE
  //       var headingEl = document.createElement("h2")
  //       headingEl.textContent = title
  //       var responseEl = document.getElementById("response-container")
  //       responseEl.innerHTML = ""
  //       responseEl.appendChild(headingEl)
  //       var rating = document.getElementById("rating").nodeValue