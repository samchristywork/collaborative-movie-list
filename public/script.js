const movieList = document.querySelector('#movie-list')

let prefix="/collaborative-movie-list/";

// Repopulate the movie list with an up to date version.
function refresh () {
  fetch(prefix + 'list?list=movies')
    .then(x => x.json())
    .then(y => {
      y.sort((a, b) => {
        return a.name > b.name
      })
      movieList.innerHTML = ''
      for (const movie of y) {
        const d = document.createElement('div')
        d.innerText = movie.name
        d.classList = 'list-item'
        if (movie.tagged) {
          d.style.textDecoration = 'line-through'
        }
        d.onclick = e => {
          console.log(movie)
          fetch(prefix + `toggle?list=movies&name=${movie.name}`)
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
    fetch(prefix + `add?list=movies&name=${movie}`)
      .then(x => x.text())
      .then(y => {
        refresh()
      })
  }
}

refresh()
