const express = require("express");
const fetch = require("node-fetch");
const app = express();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.engine("html", es6Renderer);
app.set("views", "./public");
app.set("view engine", "html");
app.use(express.json());
app.use(
  cors({ origin: "http://127.0.0.1:5500", methods: "GET,POST,PUT,DELETE" })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/search", async (req, res) => {
  const { inputText } = req.body;
  let fieldList = "name,deck,image,site_detail_url,api_detail_url";
  const cv_key = process.env.CV_API_KEY;
  const charURL = "https://www.comicvine.com/api/characters/";
  let url = `${charURL}?api_key=${cv_key}&filter=name:${inputText}&field_list=${fieldList}&format=json`;
  try {
    const charList = await fetch(url);
    const json = await charList.json();
    res.status(200).json(json);
  } catch (error) {
    res.status(400).send("error");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/results", async (req, res) => {
  const cv_key = process.env.CV_API_KEY;
  let { charUrl } = req.body;
  let url = `${charUrl}?api_key=${cv_key}&field_list=movies&format=json`;
  try {
    const result = await fetch(url);
    const json = await result.json();
    res.status(200).json(json);
  } catch (error) {
    res.status(400).send("error");
  }
});

app.post("/movie_search", async (req, res) => {
  const { encodeMovieName } = req.body;
  const tmdb_key = process.env.TMDB_KEY;
  const movieURL = "https://api.themoviedb.org/3/search/movie";
  let url = `${movieURL}?api_key=${tmdb_key}&query=${encodeMovieName}&include_adult=false`;
  try {
    const result = await fetch(url);
    const json = await result.json();
    res.status(200).json(json);
  } catch (error) {
    res.status(400).send("error");
  }
});
