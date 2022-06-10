const nowUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1"
const nowDiv = document.querySelector("#nowPlaying")

async function NowPlayingFetch(){
    const json = await fetch(nowUrl).catch(console.log("error"))
    const data = await json.json()
    if(data){
        HtmlSetup(data.results)
    }
}

function HtmlSetup(movie){
    movie.forEach(movie => {
        const output = `<div class="col-lg-2 col-md-4 col-6 mx-4 d-inline-block">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid border-radius">
        <p class="lead">${movie.title}</p>
        </div>
        `
        nowDiv.innerHTML += output
    })
}

NowPlayingFetch()