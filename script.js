// A website that will allow the user to find media and streaming information related to a specific comic book character.
const cv_key = config.CV_API_KEY;
const charURL = "https://www.comicvine.com/api/characters/";
const searchButton = document.getElementById("search-button");

const getChar = async () => {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  if (searchInput) {
    let url = `${charURL}?api_key=${cv_key}&filter=name:${searchInput}&limit=1&format=json`;
    const charList = await fetch(url);
    const json = await charList.json();
    localStorage.setItem("char", JSON.stringify(json.results[0]));
    window.open("./displayResults.html", "_self");
    console.log(json)
  }
};

searchButton.onclick = () => getChar();
