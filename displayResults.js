const cv_key = config.CV_API_KEY;
const tmdb_key = config.TMDB_KEY;
const searchResult = JSON.parse(localStorage.getItem("char"));

const displayChar = () => {
    document.getElementById("charName").innerText = searchResult.name
    document.getElementById("charImage").src = searchResult.image.medium_url
    document.getElementById("charSummary").innerText = searchResult.deck
    document.getElementById("charLink").href = searchResult.site_detail_url
    console.log(searchResult)
};

displayChar()

let charFull = JSON.parse(localStorage.getItem("charList"));

const charDetails = async () => {
  let charUrl = searchResult.api_detail_url;
  let url = `${charUrl}?api_key=${cv_key}&field_list=movies&format=json`;
  const result = await fetch(url);
  const json = await result.json();
  charFull = await json.results;
  localStorage.setItem("charList", JSON.stringify(json.results));
  console.log(charFull);
    charMovies();
};

let movieList = [];
let movieNameList = [];

const charMovies = () => {
  movieList = charFull.movies;
  movieList = movieList.sort((a, b) => a.id - b.id);
  movieList.forEach((value, index, arr) => {
    movieNameList.push(arr[index].name);
  });
  movieList = [...new Set(movieNameList)];
  createMoviePanels(movieList);
};

// setTimeout(function () {charDetails()}, 1001);

let movieName = "";
let movieResults = [];
const moviePanels = document.getElementById("movie-panels");

const movieSearch = async (movieName) => {
  let encodeMovieName = encodeURIComponent(movieName);
  let posterPathURL = "http://image.tmdb.org/t/p/original";
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_key}&query=${encodeMovieName}&include_adult=false`;
  //   let url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_key}&query=Batman&include_adult=false`;
  // let url = `https://api.themoviedb.org/3/movie/560057/watch/providers?api_key=${tmdb_key}&language=en-US`
  const result = await fetch(url);
  const json = await result.json();
  movieResults = await json.results;
  console.log(movieName);
  if (movieResults.length > 0) {
    for (let index = 0; index < movieResults.length; index++) {
      if (
        movieResults[index].title.length > movieName.length + 1 ||
        movieResults[index].title.length < movieName.length - 1 ||
        movieResults[index].genre_ids.includes(16) ||
        movieResults[index].genre_ids.includes(99) ||
        movieResults[index].popularity === 0.6 ||
        movieResults[index].title === "Puncture" ||
        movieResults[index].title === "Injustice"
      ) {
        movieResults.splice(index, 1);
        index--;
      }
    }
  }
  if (movieResults.length > 0) {
    var imageDiv = `<li><div class="image_title"><a href="#">${movieName}</a></div>
                    <a href=""><img src=${posterPathURL}${movieResults[0].poster_path} border="0"></a></li>`;
    moviePanels.insertAdjacentHTML("beforeend", imageDiv);
    console.log(movieResults);
  }
};
// movieSearch("Batman");

const createMoviePanels = (movieList) => {
  for (let movie = 0; movie < movieList.length; movie++) {
    movieName = movieList[movie];
    movieSearch(movieName);
  }
};
// charMovies()

const leftButton = document.getElementById("left-button")
const rightButton = document.getElementById("right-button")
leftButton.onmousedown = () => {document.getElementById("movie-panels").scrollBy({left: -100, behavior: 'smooth'});
console.log("left")}
rightButton.onmousedown = () => {document.getElementById("movie-panels").scrollBy({left: 100, behavior: 'smooth'})}
// setTimeout(function () {charDetails()}, 1001);
