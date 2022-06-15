const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1"
const popularDiv = document.querySelector("#popularDiv")

async function PopularMoviesFetch(){
    const content = await fetch(baseUrl).catch(console.log("error"))
    const data = await content.json()
    if(data){
        HtmlDisplay(data.results)
    }
}

function HtmlDisplay(data){
    data.forEach(movie => {
        const percent = movie.vote_average * 10
        const div = document.createElement("div")
        div.classList.add("col-lg-3", "col-md-6", "col-12", "cursor-pointer", "hover-bigger", "max-width-100", "click-info")
        const output = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid border-radius">
        <h5 class="p-3 silver-border">${movie.title}</h5>
        <p class="lead">
        <span class="fw-bold">Rating:</span>
         ${percent}%
         </p>
        `
        popularDiv.append(div)
        div.innerHTML = output
        div.value = movie.id
    });
    data.forEach(movie => {
    document.querySelectorAll(".click-info").forEach(div => {
        if(movie.id === div.value){
            div.addEventListener("click", () => {infoModel(movie.title, movie.backdrop_path, movie.overview)})
    }})
    })
}

function infoModel(title, background, overview){
    const modal = document.querySelector("#viewModel")
    modal.innerHTML = `
    <div class="vw-100 vh-100 d-flex flex-column justify-content-center align-items-center position-fixed-center z-9999 darker-background text-light">
    <div class="w-90 h-60 text-center dark-background-poster position-relative overflow-y-scroll">
    <button class="position-absolute tl-0 button-close"><i class="bi bi-x"></i></button>
    <div class="container">
    <h1 class="p-5">${title}</h1>
    <p class="lead p-5">${overview}</p>
    </div>
    </div>
    </div>
    `
    const infoDiv = document.querySelector(".dark-background-poster")
    infoDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(https://image.tmdb.org/t/p/w500/${background})`
    infoDiv.style.backgroundSize = "cover"
    infoDiv.style.backgroundPosition = "center"
    document.querySelector(".button-close").addEventListener("click", () => modal.innerHTML = "")
    if(!background){
        infoDiv.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)) , url(/images/no-background.jpg)`
        infoDiv.style.backgroundSize = "cover"
    }
}

PopularMoviesFetch()