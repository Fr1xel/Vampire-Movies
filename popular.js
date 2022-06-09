const baseUrl = "https://api.themoviedb.org/3/movie/popular?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1"
const popularDiv = document.querySelector("#popularDiv")

async function PopularMoviesFetch(){
    const content = await fetch(baseUrl).catch(console.log("error"))
    const data = await content.json()
    if(data){
        HtmlDisplay(data.results)
        console.log(data)
    }
}

function HtmlDisplay(data){
    data.forEach(movie => {
        console.log(movie)
        const output = `<div class="col-lg-3 col-md-6 col-12 cursor-pointer hover-bigger">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" class="img-fluid border-radius">
        <h5>${movie.original_title}</h5>
        </div>
        `
        popularDiv.innerHTML += output
    });
}

PopularMoviesFetch()