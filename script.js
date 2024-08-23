let timeout;
const apiKey = '3ff8bc9c';
const resultsDiv = document.getElementById('results');
const modal = document.getElementById('myModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContent = document.getElementById('modalContent');

function debounceSearch() {
    clearTimeout(timeout);
    timeout = setTimeout(searchMovies, 500);
}

async function searchMovies() {
    const query = document.getElementById('search').value;
    if (!query) return;
    
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`);
    const data = await response.json();
    
    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        resultsDiv.innerHTML = 'No movies found';
    }
}

function displayMovies(movies) {
    resultsDiv.innerHTML = '';
    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');
        movieCard.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
        `;
        movieCard.onclick = () => showMovieDetails(movie.imdbID);
        resultsDiv.appendChild(movieCard);
    });
}

async function showMovieDetails(id) {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${apiKey}&i=${id}`);
    const data = await response.json();
    
    modalContent.innerHTML = `
        <h2>${data.Title} (${data.Year})</h2>
        <img src="${data.Poster}" alt="${data.Title}">
        <p>${data.Plot}</p>
        <p><strong>Cast:</strong> ${data.Actors}</p>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Released:</strong> ${data.Released}</p>
    `;
    modal.style.display = "block";
}

// Close the modal
closeModalBtn.onclick = function() {
    modal.style.display = "none";
}

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
