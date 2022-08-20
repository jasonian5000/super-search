const express = require("express");
const app = express();
const cors = require("cors");
const es6Renderer = require("express-es6-template-engine");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

app.use(express.static("public"));
app.engine("html", es6Renderer);
app.set("views", "./public");
app.set("view engine", "html");
app.use(
  cors({ origin: "http://127.0.0.1:5500", methods: "GET,POST,PUT,DELETE" })
);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
