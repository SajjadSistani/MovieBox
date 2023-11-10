"use strict";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    const randomIndex = Math.floor(Math.random() * (i + 1));

    // Swap elements at randomIndex and i
    [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
  }
  return array;
}

const cardsContainer = document.querySelector(".grid");
const searchBtn = document.querySelector(".search-btn");
const searchInput = document.querySelector(".search-input");

const createCard = (image, title) => {
  let html = `<article class ='cards'>
  <div class="card">
    <img src="${image}" alt="" class="card-image" />
    <div class="movie-title">
      <h5>${title}</h5>
    </div>
  </div>
  </article>`;
  cardsContainer.insertAdjacentHTML("beforeend", html);
};

const getSearchedGenreData = async (genre) => {
  try {
    const res = await fetch(
      `http://moviesapi.ir/api/v1/genres/{${genre}}/movies?page={page}`
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const getData = async () => {
  try {
    const res = await fetch("http://moviesapi.ir/api/v1/movies?page={page}");
    const { data } = await res.json();
    console.log(data);
    const shuffle = shuffleArray(data);

    shuffle.map((movie) => createCard(movie.poster, movie.title));
  } catch (error) {
    console.log(error);
  }
};

getData();
searchBtn.addEventListener("click", getSearchedGenreData(searchInput.value));
