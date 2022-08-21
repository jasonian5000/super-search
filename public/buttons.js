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
