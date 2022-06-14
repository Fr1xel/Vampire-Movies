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
        const p = document.createElement("p")
        p.innerHTML = `${movie.title}`
        const imageDiv = document.createElement("div")
        imageDiv.classList.add("col-lg-2", "col-md-4", "col-6", "mx-4", "d-inline-block", "hover-bigger")
        imageDiv.id = "imagePlace"
        const img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        img.classList.add("img-fluid")
        img.classList.add("border-radius")
        img.id = "searchImage"
        imageDiv.append(img)
        searchContent.append(imageDiv)
        imageDiv.append(p)
        if(!movie.poster_path){
            img.src = "/images/no-image.png"
        }
    })
}

searchBarFilms.addEventListener("keypress", searchType)