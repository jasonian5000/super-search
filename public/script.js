let searchResult = [];
const searchInput = document.getElementById("search-input");

const getChar = async () => {
  const inputText = { inputText: searchInput.value.toLowerCase() };
  let messageArea = document.getElementById("message-area");
  if (inputText) {
    const requestChar = await fetch(`${window.location.origin}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputText),
    });
    const charResults = await requestChar.json();
    let searchResults = charResults.results;
    if (searchResults.length === 0) {
      messageArea.innerText = "Try a new search.";
    }
    for (let index = 0; index < searchResults.length; index++) {
      if (searchResults[index].name.toLowerCase() === inputText) {
        let searchResult = searchResults[index];
        localStorage.setItem("char", JSON.stringify(searchResult));
        window.open("./displayResults.html", "_self");
        break;
      }
    }
    let searchResult = searchResults[0];
    localStorage.setItem("char", JSON.stringify(searchResult));
    window.open("./displayResults.html", "_self");
  }
};

const displayChar = () => {
  let displayResult = JSON.parse(localStorage.getItem("char"));
  document.getElementById("charName").innerText = displayResult.name;
  document.getElementById("charImage").src = displayResult.image.medium_url;
  document.getElementById("charSummary").innerText = displayResult.deck;
  document.getElementById("charLink").href = displayResult.site_detail_url;
  charDetails(displayResult);
};

const charDetails = async (displayResult) => {
  let charUrl = { charUrl: displayResult.api_detail_url };
  const requestMovies = await fetch(`${window.location.origin}/results`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(charUrl),
  });
  let movieList = await requestMovies.json()
  let charFull = await movieList.results;
  charMovies(charFull);
};

let movieList = [];
let movieNameList = [];

const charMovies = (charFull) => {
  movieList = charFull.movies;
  movieList = movieList.sort((a, b) => a.id - b.id);
  movieList.forEach((value, index, arr) => {
    movieNameList.push(arr[index].name);
  });
  movieList = [...new Set(movieNameList)];
  createMoviePanels(movieList);
};

let movieName = "";

const createMoviePanels = (movieList) => {
  for (let movie = 0; movie < movieList.length; movie++) {
    movieName = movieList[movie];
    movieSearch(movieName);
  }
};

let movieResults = [];

const movieSearch = async (movieName) => {
  const moviePanels = document.getElementById("movie-panels");
  let encodeMovieName = { encodeMovieName: encodeURIComponent(movieName) };
  let posterPathURL = "http://image.tmdb.org/t/p/original";
  const requestMovie = await fetch(`${window.location.origin}/movie_search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(encodeMovieName),
  });
  let movieReturn = await requestMovie.json()
  movieResults = await movieReturn.results;
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

searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getChar();
  }
});
