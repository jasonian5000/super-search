<<<<<<< HEAD:public/displayResults.js
const cv_key = process.env.CV_API_KEY;
const tmdb_key = process.env.TMDB_KEY;
=======
const cv_key = config.CV_API_KEY;
const tmdb_key = config.TMDB_KEY;
>>>>>>> parent of e5cf21a (reconfigured into node.js to prep for deployment):displayResults.js
const charURL = "https://www.comicvine.com/api/characters/";
const searchResult = JSON.parse(localStorage.getItem("char"));

const displayChar = () => {
  document.getElementById("charName").innerText = searchResult.name;
  document.getElementById("charImage").src = searchResult.image.medium_url;
  document.getElementById("charSummary").innerText = searchResult.deck;
  document.getElementById("charLink").href = searchResult.site_detail_url;
};

displayChar();

let charFull = JSON.parse(localStorage.getItem("charList"));

const charDetails = async () => {
  let charUrl = searchResult.api_detail_url;
  let url = `${charUrl}?api_key=${cv_key}&field_list=movies&format=json`;
  const result = await fetch(url);
  const json = await result.json();
  charFull = await json.results;
  localStorage.setItem("charList", JSON.stringify(json.results));
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

let movieName = "";
let movieResults = [];
const moviePanels = document.getElementById("movie-panels");

const movieSearch = async (movieName) => {
  let encodeMovieName = encodeURIComponent(movieName);
  let posterPathURL = "http://image.tmdb.org/t/p/original";
  let url = `https://api.themoviedb.org/3/search/movie?api_key=${tmdb_key}&query=${encodeMovieName}&include_adult=false`;
  const result = await fetch(url);
  const json = await result.json();
  movieResults = await json.results;
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
    var tmdbLink = `https://www.themoviedb.org/movie/${movieResults[0].id}`;
    var imageDiv = `<li><div class="image_title"><a href="${tmdbLink}" target="_blank">${movieName}</a></div>
                    <a href="${tmdbLink}" target="_blank"><img src=${posterPathURL}${movieResults[0].poster_path} border="0"></a></li>`;
    moviePanels.insertAdjacentHTML("beforeend", imageDiv);
  }
};

const createMoviePanels = (movieList) => {
  for (let movie = 0; movie < movieList.length; movie++) {
    movieName = movieList[movie];
    movieSearch(movieName);
  }
};

const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");
leftButton.onclick = () => {
  document
    .getElementById("movie-panels")
    .scrollBy({ left: -224, behavior: "smooth" });
};
rightButton.onclick = () => {
  document
    .getElementById("movie-panels")
    .scrollBy({ left: 224, behavior: "smooth" });
};
setTimeout(function () {
  charDetails();
}, 1001);

const getChar = async () => {
  const inputText = searchInput.value.toLowerCase();
  let messageArea = document.getElementById("message-area");
  let fieldList = "name,deck,image,site_detail_url,api_detail_url";
  if (inputText) {
    let url = `${charURL}?api_key=${cv_key}&filter=name:${inputText}&field_list=${fieldList}&format=json`;
    try {
      const charList = await fetch(url);
      const json = await charList.json();
      let searchResults = json.results;
      if (searchResults.length === 0) {
        messageArea.innerText = "Try a new search.";
      }
      for (let index = 0; index < searchResults.length; index++) {
        if (searchResults[index].name.toLowerCase() === inputText) {
          localStorage.setItem("char", JSON.stringify(searchResults[index]));
          window.open("./displayResults.html", "_self");
          break;
        } else {
          localStorage.setItem("char", JSON.stringify(searchResults[0]));
          window.open("./displayResults.html", "_self");
        }
      }
    } catch (e) {
      console.error(e);
      messageArea.innerText = "Try again later.";
    }
    let charFull = JSON.parse(localStorage.getItem("charList"));
  }
};

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getChar();
  }
});
