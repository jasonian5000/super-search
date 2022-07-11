// A website that will allow the user to find media and streaming information related to a specific comic book character.
const cv_key = config.CV_API_KEY;
const charactersURL = "https://www.comicvine.com/api/characters/";
const searchButton = document.getElementById("search-button");
const charCard = document.querySelector(".character-card");
let char = [];
let charDetailed = [];
let charURL = "";

const getCharacter = async () => {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  if (searchInput) {
    let url1 = `${charactersURL}?api_key=${cv_key}&filter=name:${searchInput}&format=json`;
    const charList = await fetch(url1);
    const json1 = await charList.json();
    char = json1.results[0];
    charURL = char.api_detail_url;
    displayChar();
    console.log(char);
    console.log(charURL);
  }
};

const displayChar = () => {
  charCard.innerHTML = "";
  if (char) {
    charCard.innerHTML =
      `<div class="character-card-inner"><div id= "front-card"><h2>${char.name}</h2>` +
      `<img src=${char.image.original_url} alt=${char.name}></div>` +
      // `<div id="back-card"><p>${char.deck}</p></div></div>`;
      "</div>";
  } else {
    charCard.innerText = "No results found";
  }
};

const charDetails = async () => {
  // let url2 = `${charURL}?api_key=${cv_key}&format=json`
  let url2 = `https://comicvine.gamespot.com/api/character/4005-1455/?api_key=${cv_key}&format=json`;
  const result = await fetch(url2);
  const json2 = await result.json();
  let charDetailed = await json2.results;
  console.log(charDetailed);
};

// charDetails()
searchButton.onclick = () => getCharacter();
