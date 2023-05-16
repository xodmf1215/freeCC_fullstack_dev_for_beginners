const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=01057de4f46063e362a4e64cc526e8f9&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?api_key=01057de4f46063e362a4e64cc526e8f9&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

function returnMovies(url) {
    fetch(url).then(res => res.json())
    .then(function(data) {
        console.log(data.results);
        data.results.forEach(element => {
            const div_card = document.createElement('div');
            const div_row = document.createElement('div');
            const div_column = document.createElement('div');
            const image = document.createElement('img');
            const title = document.createElement('h3');
            title.setAttribute('id','title')
            //const center = document.createElement('center');

            title.innerHTML = `${element.title}`;
            image.src = IMG_PATH + element.poster_path;
            image.setAttribute("id", "image");
            image.setAttribute("class","thumbnail");
            image.setAttribute("margin-left","auto");
            image.setAttribute("margin-right","auto");
            div_card.setAttribute("class","card")
            //center.appendChild(image);
            div_card.appendChild(image);
            //div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_column.setAttribute("class","column");
            div_row.appendChild(div_column);
            div_row.setAttribute("class","row");

            main.appendChild(div_row);
        });
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    main.innerHTML = '';

    const searchItem = search.value;

    if(searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";
    }
})