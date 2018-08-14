const API_KEY = 'PJxqvrv45z009wVIQbv1UQUY8gUUeUSZ&q'
// use uppercase letters for static elements

const searchEl = document.querySelector('.search-input')
// here we grab our search hint
const hintEl = document.querySelector('.search-hint')
//   	we grab our videos element and add our newly created video to it
const videoEl = document.querySelector('.videos')

// for our clear search button
const clearEl = document.querySelector('.search-clear')

// from https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array
const randomChoice = arr => {
  const randIndex = Math.floor(Math.random() * arr.length)
  return arr[randIndex]
}
function createVideo(src) {
  //   	create element lets us create elements inside javascript
  const video = document.createElement('video')

  video.src = src
  video.muted = true
  video.autoplay = true
  video.loop = true
  video.className = 'video'
  console.log(video)
  return video
}

// when we search show the loading spinner by adding a class to the body. when successful, change the loading hint to see more. on fail, let the user know there was an error
const toggleLoading = state => {
  //   in here we toggle the loading state b/w on and off

  if (state) {
    document.body.classList.add('loading')
    searchEl.disabled = true
  } else {
    document.body.classList.remove('loading')
    searchEl.disabled = false
    searchEl.focus()
  }
}

const searchGiphy = searchTerm => {
  toggleLoading(true)
  // we use backticks for our string so that we can embed our API key adn search term into our url
  fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${searchTerm}&limit=50&offset=0&rating=PG-13&lang=en`
  )
    .then(response => {
      // we convert our responseConvert to JSON
      return response.json()
    })
    .then(json => {
      // 'json' is a big piece of json data we can work with.
      //   here we grab the first result from our images array
      const gif = randomChoice(json.data)
      //   here we look inside the first result and grab the original mp4 source
      const src = gif.images.original.mp4
      console.log(src)

      //   	we use our createVideo function and give it the src element and it gives us back a video element
      const video = createVideo(src)

      videoEl.appendChild(video)

      //   here we listen for loaded event video to fire
      video.addEventListener('loadeddata', event => {
        video.classList.add('visible')
        toggleLoading(false)
        document.body.classList.add('has-results')
        hintEl.innerHTML = 'Hit enter to search more ' + searchTerm
      })
    })

    .catch(error => {
      // lastly we can use .catch() to do something in case our fetch fails
    toggleLoading(false)
    hintEl.innerHTML = `Nothing found for ${searchTerm}`
    })
}

// here we separate out our keyup function and now we can call to it in various sections in our code
const doSearch = event => {
  //   here we grab the search input's value
  const searchTerm = searchEl.value

  //   here set set search term to show when we have a search term longer than 2 characters
  if (searchTerm.length > 2) {
    //     here we set the text to embed our variable as a suggestion
    hintEl.innerHTML = 'Hit enter to search ' + searchTerm
    //     here we add a class to our body class and use it to show our hint using css
    document.body.classList.add('show-hint')
  } else {
    document.body.classList.remove('show-hint')
  }

  if (event.key === 'Enter' && searchTerm.length > 2) {
    searchGiphy(searchTerm)
  }
}


const clearSearch = event =>{
//   this toggles our results state off again
  document.body.classList.remove('has-results')
//   here we clear our all the content
  videoEl.innerHTML = ''
  hintEl.innerHTML = '' 
  searchEl.value = ''
  searchEl.focus()
}

// here we listen to key out events across the whole page. 
document.addEventListener('keyup', event =>{
//   if we press the escape key, fire up the search clear
  if(event.key === 'Escape'){
    clearSearch()
  }
})







// arrow function! woo!
searchEl.addEventListener('keyup', doSearch)
clearEl.addEventListener('click', clearSearch)