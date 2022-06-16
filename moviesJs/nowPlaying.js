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
        movieDiv.classList.add("col-lg-2", "col-md-4", "col-6", "mx-4", "d-inline-block", "hover-bigger", "click-info", "cursor-pointer")
        const output = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid border-radius">
        <p class="lead">${movie.title}</p>
        `
        movieDiv.value = movie.id
        movieDiv.innerHTML = output
        div.append(movieDiv)
    })
    movie.forEach(movie => {
        document.querySelectorAll(".click-info").forEach(div => {
            if(movie.id === div.value){
                div.addEventListener("click", () => {infoModel(movie.title, movie.backdrop_path, movie.overview, movie.vote_average, movie.original_title)})
        }}
        )
})
}

NowPlayingFetch()