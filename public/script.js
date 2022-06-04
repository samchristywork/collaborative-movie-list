const movieList = document.querySelector('#movie-list')

let prefix="/collaborative-movie-list/";

// Repopulate the movie list with an up to date version.
function refresh () {
  fetch(prefix + 'movies.json')
    .then(x => x.json())
    .then(y => {
      y.list.sort((a, b) => {
        return a.name > b.name
      })
      movieList.innerHTML = ''
      for (const movie of y.list) {
        const d = document.createElement('div')
        d.innerText = movie.name
        d.classList = 'list-item'
        if (movie.watched) {
          d.style.textDecoration = 'line-through'
        }
        d.onclick = e => {
          console.log(movie)
          fetch(prefix + `watched?movie=${movie.name}`)
            .then(x => x.text())
            .then(y => {
              refresh()
            })
        }
        movieList.appendChild(d)
      }
    })
}

// Add a movie to the list.
function addMovie () {
  if (confirm('Would you like to add a movie?')) {
    const movie = prompt('What movie do you want to add?')
    console.log(movie)
    fetch(prefix + `add_movie?movie=${movie}`)
      .then(x => x.text())
      .then(y => {
        refresh()
      })
  }
}

refresh()
