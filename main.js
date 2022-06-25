const express = require('express')
const morgan = require('morgan')
const fs = require('fs')
const app = express()

let prefix="/collaborative-movie-list/";

/*
 * Placeholder data. Each element in this array has a name and a boolean flag
 * signaling whether it has been watched. This is the main state holder of the
 * server.
 */
const movieList = {
  list: [
    { name: 'Movie A', watched: false },
    { name: 'Movie B', watched: true },
    { name: 'Movie C', watched: false }
  ]
}

/*
 * 'morgan' is used to log the HTTP requests that this server gets. When used
 * this way, it will log to both a file and standard output.
 */
app.use(morgan('common', {
  stream: fs.createWriteStream('./access.log', { flags: 'a' })
}))
app.use(morgan('dev'))

/*
 * Create a static route. Everything in the 'public' directory will be sent
 * as-is. That includes the index, CSS styling, script files, and images.
 */
app.use(prefix, express.static('public'))

/*
 * This route takes a movie name and adds it to the list with the 'watched'
 * flag set to 'false'.
 *
 * ex: '/add?movie=Terminator%202' will add "Terminator 2" to the list.
 *
 * Returns '200' if the insertion was successful, otherwise '400'.
 */
app.get(prefix + 'add', function (req, res) {
  if (req.query.movie && typeof (req.query.movie === 'string')) {
    movieList.list.push({ name: req.query.movie, watched: false })
    res.sendStatus(200)
  } else {
    res.sendStatus(400)
  }
})

/*
 * This route takes a movie name and removes it from the list if it exists.
 * Note that this route can only be accessed from localhost, and does not have
 * a UI control. For administration only.
 *
 * ex: '/delete?movie=Terminator%202' will delete "Terminator 2" from the list.
 *
 * Returns '200' if the user supplied a valid movie name, otherwise '400'.
 */
app.get(prefix + 'delete', function (req, res) {
  if (req.ip === '::ffff:127.0.0.1') {
    if (req.query.movie && typeof (req.query.movie === 'string')) {
      movieList.list = movieList.list.filter(e => {
        return e.name !== req.query.movie
      })
      res.sendStatus(200)
      return
    }
  }
  res.sendStatus(400)
})

/*
 * This route takes a movie name and toggles its 'toggle' flag.
 *
 * ex: '/toggle?movie=Terminator%202'
 *
 * Returns '200' if the user supplied a valid movie name, and it was in the
 * list, otherwise '400'.
 */
app.get(prefix + 'toggle', function (req, res) {
  if (req.query.movie && typeof (req.query.movie === 'string')) {
    for (const movie of movieList.list) {
      if (movie.name === req.query.movie) {
        movie.watched = !movie.watched
        res.sendStatus(200)
        return
      }
    }
  }
  res.sendStatus(400)
})

/*
 * This route simply returns the movie list.
 *
 * ex: '/list'
 *
 * Returns '200' if the user supplied a valid movie name, and it was in the
 * list, otherwise '400'.
 */
app.get(prefix + 'list', function (req, res) {
  res.json(movieList)
})

app.listen(8082)
console.log('Listening on port 8082...')
