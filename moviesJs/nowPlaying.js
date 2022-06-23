const nowUrl =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=ac611aa60fbb0355792b075ff8337fbe&language=en-US&page=1";
const nowDiv = document.querySelector("#nowPlaying");

async function NowPlayingFetch() {
  const json = await fetch(nowUrl).catch((err) => console.log(err));
  const data = await json.json();
  if (data) {
    HtmlSetup(data.results, nowDiv);
  }
}

function HtmlSetup(movie, div) {
  movie.forEach((movie) => {
    const movieDiv = document.createElement("div");
    setImage(movieDiv, movie.poster_path)
    movieNameAuthenticator(movie)
    nowPlayingTitle(movieDiv, movie)
    nowPlayingDivStyle(movieDiv, movie)
    div.append(movieDiv);
  });
  ratingColor()
  const divs = document.querySelectorAll(".click-info-now-playing")
  divInfoModelAdder(divs, movie)
}

function movieNameAuthenticator(movie){
  if (!movie.title) {
    movie.title = movie.name;
  }
}

function nowPlayingTitle(div, movie){
  const p2 = document.createElement("p");
    p2.innerHTML = `<span class="fw-bold">Rating:</span> <span class="rating">${movie.vote_average}</span>/10`;
    const h5 = document.createElement("h5");
    h5.innerHTML = `${movie.title}`;
    h5.classList.add("p-3", "silver-border");
    div.append(h5, p2);
}

function nowPlayingDivStyle(div, movie){
  div.classList.add(
    "col-lg-2",
    "col-md-4",
    "col-6",
    "mx-4",
    "hover-bigger",
    "click-info-now-playing",
    "cursor-pointer"
  );
  div.value = movie.id;
}

NowPlayingFetch();
