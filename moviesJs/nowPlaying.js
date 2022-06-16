const nowUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1"
const nowDiv = document.querySelector("#nowPlaying")

async function NowPlayingFetch(){
    const json = await fetch(nowUrl).catch(err => console.log(err))
    const data = await json.json()
    if(data){
        HtmlSetup(data.results, nowDiv)
    }
}

function HtmlSetup(movie, div){
    movie.forEach(movie => {
        if(!movie.title){
            movie.title = movie.name
        }
        const movieDiv = document.createElement("div")
        const p2 = document.createElement("p")
        p2.innerHTML = `<span class="fw-bold">Rating:</span> <span class="rating">${movie.vote_average}</span>/10`
        movieDiv.classList.add("col-lg-2", "col-md-4", "col-6", "mx-4", "d-inline-block", "hover-bigger", "click-info", "cursor-pointer")
        const h5 = document.createElement("h5")
        h5.innerHTML = `${movie.title}`
        h5.classList.add("p-3", "silver-border")
        const img = document.createElement("img")
        img.classList.add("img-fluid", "border-radius")
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        if(!movie.poster_path){
            img.src = "/images/no-image.png"
        }
        movieDiv.append(img, h5, p2)
        movieDiv.value = movie.id
        div.append(movieDiv)
    })
    document.querySelectorAll(".rating").forEach(rating => {
        rating.style.color = "lime"
        if(rating.innerHTML < 5){
            rating.style.color = "orange"
        }
        if(rating.innerHTML < 3){
            rating.style.color = "red"
        }
    })
    movie.forEach(movie => {
        document.querySelectorAll(".click-info").forEach(div => {
            if(movie.id === div.value){
                div.addEventListener("click", () => {infoModel(movie.title, movie.backdrop_path, movie.overview, movie.vote_average, movie.original_title, movie.id)})
        }}
        )
})
}

NowPlayingFetch()