const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=01057de4f46063e362a4e64cc526e8f9&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=01057de4f46063e362a4e64cc526e8f9&query=";

const REVIEWAPI = "http://localhost:3000/api/v1/movie/"

// make a url object which help us use url
const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const main = document.getElementById("section");
const title = document.getElementById("movie-title");

title.innerText = movieTitle;

returnReviews(REVIEWAPI);
function returnReviews(url) {
  fetch(url + movieId).then(res => res.json())
  .then( function(data) {
    data.forEach(review => {
      const div_card = document.createElement('div');
      div_card.innerHTML = `
        <div class="row">
          <div class="column">
            <div class="card" id="${ review._id }">
              <p><strong>Review: </strong>${ review.review }</p>
              <p><strong>User: </strong>${ review.user }</p>
              <p><a href="#" onclick="editReview('${ review._id }', '${review.review }',
'${ review.user }')">write</a> <a href="#" onclick="deleteReview('${ review._id }')">delete</a>/p>
            </div>
          </div>
        </div>
      `;
      main.appendChild(div_card);
    })
  } )
}