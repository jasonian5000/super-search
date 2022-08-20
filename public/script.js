const cv_key = config.CV_API_KEY || process.env.CV_API_KEY;
const charURL = "https://www.comicvine.com/api/characters/";

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
