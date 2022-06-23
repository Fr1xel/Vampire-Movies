const searchBarFilms = document.querySelector("#movieSearch");
const searchBarPeople = document.querySelector("#peopleSearch");
const searchDiv = document.querySelector("#searchDiv");

function searchType(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    enterValueSender(event)
  } else {
    searchValueSender(event)
  }
}

async function getSearch(event) {
  let type = changingType(event);
  let search = changeSearch(event);
  const json = await fetch(
    `https://api.themoviedb.org/3/search/${type}?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&query=${search}&page=1&include_adult=false`
  );
  const data = await json.json().catch((err) => console.log(err));
  if (data) {
    searchPepleOrMovies(event, data)
  }
}

function searchHtmlBuild(data) {
  searchDivInnerHtml()
  if (data) {
    data.forEach((movie) => {
      const imageDiv = document.createElement("div");
      setImage(imageDiv, movie.poster_path)
     searchTitle(movie, imageDiv)
      imageDivStyling(imageDiv, movie)
      ratingColor()
    });
    const divs = document.querySelectorAll(".click-info-search")
   divInfoModelAdder(divs, data)
  } else {
    noSearchResults()
  }
}

function searchPepleHtmlBuild(data) {
  searchDivInnerHtml()
  if (data) {
    data.forEach((person) => {
      const imageDiv = document.createElement("div");
      setImage(imageDiv, person.profile_path)
      imageDivStyling(imageDiv, person)
      searchPeopleTitle(person, imageDiv)
      peopleEventListener(imageDiv, person)
    });
  }
}

function noImageUrl(img, img_path) {
  if (!img_path) {
    img.src = "/images/no-image.png";
  }
}

function ratingColor() {
  document.querySelectorAll(".rating").forEach((rating) => {
    rating.style.color = "lime";
    if (rating.innerHTML < 5) {
      rating.style.color = "orange";
    }
    if (rating.innerHTML < 3) {
      rating.style.color = "red";
    }
  });
}

function peopleEventListener(div, person) {
  div.addEventListener("click", () => {
    infoModelPerson(person);
  });
}

function noSearchResults(){
  const searchContent = document.querySelector("#searchContent");
    searchContent.innerHTML = `
        <div class="container text-center text-secondary">
        <h3 class="">No results found</h1>
        <i class="bi bi-x-circle color-red h1"></i>
        <h5>Please make sure you put a proppper name</h2>
        </div>
        `;
}

function searchDivInnerHtml(){
  searchDiv.innerHTML = `
    <div class="container">
        <h1 class="color-red">Search results <i class="bi bi-search"></i></h1>
        <div class="d-flex scroll-right py-3 text-center" id="searchContent">
        </div>
    `;
}

function setImage(div, poster){
  const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w500/${poster}`;
      img.classList.add("img-fluid");
      img.classList.add("border-radius");
      div.append(img);
      noImageUrl(img, poster);
}

function searchTitle(movie, div){
  const p = document.createElement("h5");
  const p2 = document.createElement("p");
  p2.innerHTML = `<span class="fw-bold">Rating:</span> <span class="rating">${movie.vote_average}</span>/10`;
  p.innerHTML = `${movie.title}`;
  div.append(p);
      p2.classList.add("lead");
      p.classList.add("p-3", "silver-border", "fw-bold");
      div.append(p2);
}

function imageDivStyling(div, data){
  div.classList.add(
    "col-lg-2",
    "col-md-4",
    "col-6",
    "mx-4",
    "d-inline-block",
    "hover-bigger",
    "click-info-search"
  );
  div.value = data.id
  const searchContent = document.querySelector("#searchContent");
  searchContent.append(div);
}
function searchPeopleTitle(person, div){
  const h5 = document.createElement("h5");
      h5.innerHTML = `${person.name}`;
      div.append(h5)
}

function searchPepleOrMovies(event, data){
  if (event.target.id === "peopleSearch") {
    searchPepleHtmlBuild(data.results);
  } else {
    searchHtmlBuild(data.results);
  }
}

function changingType(event){
  if (event.target.id === "peopleSearch") {
    return "person"
  }
  else{
    return "movie"
  }
}

function changeSearch(event){
  if (event.target.id === "peopleSearch") {
    return searchBarPeople.value;
  }
  else{
    return searchBarFilms.value
  }
}

function enterValueSender(event){
  if (searchBarFilms.value.length < 3 && searchBarPeople.value.length < 3) {
    searchDiv.innerHTML = "";
  } else {
    getSearch(event);
  }
}

function searchValueSender(event){
  if (searchBarFilms.value.length > 3 || searchBarPeople.value.length > 3) {
    getSearch(event);
  } else {
    searchDiv.innerHTML = "";
  }
}

searchBarFilms.addEventListener("keydown", searchType);
searchBarPeople.addEventListener("keydown", searchType);
