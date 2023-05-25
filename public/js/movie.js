const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=01057de4f46063e362a4e64cc526e8f9&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=01057de4f46063e362a4e64cc526e8f9&query=";

const REVIEWAPI = "http://localhost:3000/api/v1/reviews/"

// make a url object which help us use url
const url = new URL(location.href);
const movieId = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");

const main = document.getElementById("section");
const title = document.getElementById("movie-title");

title.innerText = movieTitle;



returnReviews(REVIEWAPI);
function returnReviews(url) {
  fetch(url + "movie/" + movieId).then(res => res.json())
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
'${ review.user }')">✏️</a> <a href="#" onclick="deleteReview('${ review._id }')">🗑️</a></p>
            </div>
          </div>
        </div>`;
      main.appendChild(div_card);
    })
  } );
  const div_addReview = document.createElement('div');
  div_addReview.innerHTML = `
    <form id="form_review">
      <label for="review_user"> user:</label>
      <input id="review_user" type="text"><br>
      <label for="review_content">content:</label>
      <input id="review_content" type="text"><br>
      <button type="submit"  onclick="addReview(event)">add review</button>
    </form>
  `;
  main.appendChild(div_addReview);
}

function editReview(id, review, user) {
  const element = document.getElementById(id);
  const reviewInputId = "review"+id;
  const userInputId = "user" +id;

  element.innerHTML = `
    <p>
      <strong>Review: </strong>
      <input type="text" id="${ reviewInputId }" value="${ review }">
    </p>
    <p>
      <strong>User: </strong>
      <input type="text" id="${ userInputId }" value="${ user }">
    </p>
    <p>
      <a href="#" onclick="saveReview('${ reviewInputId}', '${ userInputId }', '${ id }')">💾</a>
    </p>`;
}

function saveReview(reviewInputId, userInputId, id) {
  const review = document.getElementById(reviewInputId).value;
  const user = document.getElementById(userInputId).value;
  fetch(REVIEWAPI + id, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "user": user, "review": review }),
  }).then(response => {
    response.json();
  }).then(json => {
    console.log(json);
    location.reload();
  })
}

function deleteReview(id) {
  fetch(REVIEWAPI + id, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    response.json();
  }).then(json => {
    console.log(json);
    location.reload();
  })
}

function addReview(event) {
  event.preventDefault();
  const review = document.getElementById('review_content').value;
  const user = document.getElementById('review_user').value;
  fetch(REVIEWAPI + 'new/', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ "movieId": parseInt(movieId), "user": user, "review": review }),
  }).then(response => {
    response.json();
  }).then(json => {
    console.log(json);
    location.reload();
  })
}