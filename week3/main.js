// shorthand for the document.addEventListener('load', ()=>{})
// not using DOMEventLoaded (doesnt wait for entire onpage to load)
window.onload = () => {
    console.log('script is connected')

    // retrieving the button element on my page 
    let button = document.getElementById('send')
    // adding a click event to my button to detext when it has been clicked
    button.addEventListener('click', () => {
        // retrieving my input text box
        let text = document.getElementById('search')
        // printing out that data to the console
        console.log(text.value)

        request(text.value)

        // resetting my text value to be empty
        text.value = ''
    })

    // call my function
    // request() // only when the my button has been clicked 
}

// added async inside function header so that we can use await
async function request(inputText){
    // this is the base url, retrieved from the OMDB API docs
    let baseURL = "http://www.omdbapi.com/?"

    // apikey = 8af58fe
    // s = "one battle after another"

    let params = new URLSearchParams({
        apikey: "8af58fe",
        s: inputText,
        type: "movie"
    })

    console.log(baseURL + params)

    let url = baseURL + params

    // this retrieves the entire request that I am making to the server
    let response = await fetch(url)

    console.log(response)
    // i just want to see the data not everything about the request
    let json = await response.json()
    
    console.log(json)

    // this json.Search comes from the OMDB.api, the Search field is determined by the external service (OMDB)
    let movies = json.Search
    console.log(movies)

    // 1. retrieve where on the webpage where my movie data should be added
    let container = document.getElementById('container')
    container.innerHTML = ''

    for (let movie of movies){
        // 2. create the item to be added
        let m = document.createElement('div')
        m.textContent = movie.Title + " " + movie.Year
        // 2.5 add the poster element
        let img = document.createElement('img')
        img.src = movie.Poster
        // 3. add the image to the div
        m.appendChild(img)
        // 4. add the div to the container
        container.appendChild(m)
    }
}