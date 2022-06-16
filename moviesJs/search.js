const searchBarFilms = document.querySelector("#movieSearch")
const searchBarPeople = document.querySelector("#peopleSearch")
const searchDiv = document.querySelector("#searchDiv")

function searchType(event){
    if(event.keyCode === 13){
        event.preventDefault()
        if(searchBarFilms.value.length < 3 || searchBarPeople.value.length < 3){
            searchDiv.innerHTML = ""
        }
    }
    else{
        if(searchBarFilms.value.length > 2 || searchBarPeople.value.length > 2){
            getSearch(event)
        }
        else{
            searchDiv.innerHTML = ""
        }
    }
}

async function getSearch(event) {
    let type = "movie"
    let search = searchBarFilms.value
    if(event.target.id === "peopleSearch"){
        type = "person"
        search = searchBarPeople.value
    }
    const json = await fetch(`https://api.themoviedb.org/3/search/${type}?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&query=${search}&page=1&include_adult=false`)
    const data = await json.json().catch(err => console.log(err))
    if(data){
        if(event.target.id === "peopleSearch"){
            searchPepleHtmlBuild(data.results)
        }
        else{
            searchHtmlBuild(data.results)
        }
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
    if(data){
    data.forEach(movie => {
        const p = document.createElement("h5")
        const p2 = document.createElement("p")
        p2.innerHTML = `<span class="fw-bold">Rating:</span> <span class="rating">${movie.vote_average}</span>/10`
        p.innerHTML = `${movie.title}`
        const imageDiv = document.createElement("div")
        imageDiv.classList.add("col-lg-2", "col-md-4", "col-6", "mx-4", "d-inline-block", "hover-bigger", "click-info")
        imageDiv.id = "imagePlace"
        const img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
        img.classList.add("img-fluid")
        img.classList.add("border-radius")
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
        document.querySelectorAll(".rating").forEach(rating => {
            rating.style.color = "lime"
            if(rating.innerHTML < 5){
                rating.style.color = "orange"
            }
            if(rating.innerHTML < 3){
                rating.style.color = "red"
            }
        })
    })
    data.forEach(movie => {
        document.querySelectorAll(".click-info").forEach(div => {
            if(movie.id === div.value){
                div.addEventListener("click", () => {infoModel(movie.title, movie.backdrop_path, movie.overview, movie.vote_average, movie.original_title, movie.id)})
        }})
        })
    }
    else{
        searchContent.innerHTML = `
        <div class="container text-center text-secondary">
        <h3 class="">No results found</h1>
        <i class="bi bi-x-circle color-red h1"></i>
        <h5>Please make sure you put a proppper name</h2>
        </div>
        `
    }
}

function searchPepleHtmlBuild(data){
    searchDiv.innerHTML = `
    <div class="container">
        <h1 class="color-red">Search results <i class="bi bi-search"></i></h1>
        <div class="d-flex scroll-right py-3 text-center" id="searchContent">
        </div>
    `
    const searchContent = document.querySelector("#searchContent")
    if(data){
        data.forEach(person => {
            const imageDiv = document.createElement("div")
        imageDiv.classList.add("col-lg-2", "col-md-4", "col-6", "mx-4", "d-inline-block", "hover-bigger", "click-info")
        const h5 = document.createElement("h5")
        h5.innerHTML = `${person.name}`
        const img = document.createElement("img")
        img.src = `https://image.tmdb.org/t/p/w500/${person.profile_path}`
        img.classList.add("img-fluid", "border-radius")
        imageDiv.append(img)
        imageDiv.append(h5)
        imageDiv.value = person.id
        searchContent.append(imageDiv)
        if(!person.profile_path){
            img.src = "/images/no-image.png"
        }
        imageDiv.addEventListener("click", () => {infoModelPerson(person.name, person.profile_path, person.known_for_department, person.popularity, person.known_for)})
        })
    }
}

searchBarFilms.addEventListener("keydown", searchType)
searchBarPeople.addEventListener("keydown", searchType)