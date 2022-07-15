# Super Search

### Super Search is an app that allows users to search for movie information related to any comic book character using api data from [ComicVine](https://comicvine.gamespot.com/api/) and [TheMovieDB](https://developers.themoviedb.org/3/getting-started/introduction). I created this app because I am a fan of all things comic book related and want to help people who enjoy the Marvel and DC movie characters discover new ways to enjoy them.

---
This is my first front end project and first time using an api. Please feel free to reach out with questions or comments.

---

## Setting Up The App
---

- Download this repository using whatever method you are most comfortable. You may use the **Code** button above and follow one of the methods provided.
- Sign up for free api keys from [ComicVine](https://comicvine.gamespot.com/api/) and [TheMovieDB](https://developers.themoviedb.org/3/getting-started/introduction) by following the links provided.
- Create a **config.js** file in the repository folder on your computer. The config should have the following text inside:
```
var config = {
  CV_API_KEY: "your_comicvine_api_key",
  TMDB_KEY: "your_themoviedb_api_key",
};
```
- Replace the "your_api_key" areas with your personal api keys and do not share them.
- open the **index.html** file in the browser of your choice.
---

## Using the App
---
- Type a comic book character's name in the search bar and press enter.
- On the results page you should find a brief summary about the character and link to the related ComicVine page along with a scrollable set of movie posters of movies the character has appeared in.
- Click any of the movie posters to follow a link to the related TheMovieDB movie page.
---
You can read more about how I created this project at [dev.to](https://dev.to/jasonian5000/my-first-front-end-api-project-58jl)
