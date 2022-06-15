const searchBarFilms = document.querySelector("#movieSearch")
const searchDiv = document.querySelector("#searchDiv")

function searchType(event){
    if(event.keyCode === 13){
        event.preventDefault()
    }
    else{
        if(searchBarFilms.value.length > 2){
            getSearch()
        }
        else{
            searchContent.innerHTML = ""
        }
    }
}

async function getSearch() {
    const json = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&query=${searchBarFilms.value}&page=1&include_adult=false`)
    const data = await json.json().catch(err => console.log(err))
    if(data){
        searchHtmlBuild(data.results)
    }
}

function searchHtmlBuild(data){
    searchDiv.innerHTML = `
    <div class="container">
        <h1 class="color-red">Search results <i class="bi bi-search"></i></h1>
        <div class="d-flex scroll-right py-3 text-center" id="searchContent">
        </div>
    `
    const searchContent = document.querySelector("#searchContent")
    data.forEach(movie => {
        let percent = movie.vote_average * 10
        if(movie.vote_average > 0){
            percent = movie.vote_average * 10
        }
        const p = document.createElement("h5")
        const p2 = document.createElement("p")
        p2.innerHTML = `<span class="fw-bold">Rating:</span> ${percent}%`
        p.innerHTML = `${movie.title}`
        const imageDiv = document.createElement("div")
        imageDiv.classList.add("col-lg-2", "col-md-4", "col-6", "mx-4", "d-inline-block", "hover-bigger", "click-info")
        imageDiv.id = "imagePlace"
        const img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        img.classList.add("img-fluid")
        img.classList.add("border-radius")
        img.id = "searchImage"
        imageDiv.append(img)
        searchContent.append(imageDiv)
        imageDiv.append(p)
        p2.classList.add("lead")
        p.classList.add("p-3", "silver-border", "fw-bold") 
        imageDiv.append(p2)
        imageDiv.value = movie.id
        if(!movie.poster_path){
            img.src = "/images/no-image.png"
        }
    })
    data.forEach(movie => {
        document.querySelectorAll(".click-info").forEach(div => {
            if(movie.id === div.value){
                div.addEventListener("click", () => {infoModel(movie.title, movie.backdrop_path, movie.overview, movie.vote_average, movie.original_title)})
        }})
        })
}

searchBarFilms.addEventListener("keypress", searchType)