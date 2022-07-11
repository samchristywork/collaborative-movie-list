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
const lists = {
  movies: [
    { name: 'Movie A', tagged: false },
    { name: 'Movie B', tagged: true },
    { name: 'Movie C', tagged: false }
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
 * This route takes an item and adds it to the list with the 'tagged' flag set
 * to 'false'.
 *
 * ex: '/add?list=movies&name=Terminator%202' will add "Terminator 2" to the list.
 *
 * Returns '200' if the insertion was successful, otherwise '400'.
 */
app.get(prefix + 'add', function (req, res) {
  if (req.query.list && typeof (req.query.list === 'string')) {
    if (req.query.name && typeof (req.query.name === 'string')) {
      lists[req.query.list].push({ name: req.query.name, tagged: false })
      res.sendStatus(200)
      return
    }
  }
  res.sendStatus(400)
  return
})

/*
 * This route takes an item and removes it from the list if it exists.
 * Note that this route can only be accessed from localhost, and does not have
 * a UI control. For administration only.
 *
 * ex: '/delete?list=movies&name=Terminator%202' will delete "Terminator 2" from the list.
 *
 * Returns '200' if the user supplied a valid movie name, otherwise '400'.
 */
app.get(prefix + 'delete', function (req, res) {
  if (req.ip === '::ffff:127.0.0.1') {
    if (req.query.list && typeof (req.query.list === 'string')) {
      if (req.query.name && typeof (req.query.name === 'string')) {
        list[req.query.list] = movieList.list.filter(e => {
          return e.name !== req.query.name
        })
        res.sendStatus(200)
        return
      }
    }
  }
  res.sendStatus(400)
  return
})

/*
 * This route takes an item name and toggles its 'toggle' flag.
 *
 * ex: '/toggle?list=movies&name=Terminator%202'
 *
 * Returns '200' if the user supplied a valid name, and it was in the list,
 * otherwise '400'.
 */
app.get(prefix + 'toggle', function (req, res) {
  if (req.query.list && typeof (req.query.list === 'string')) {
    if (req.query.name && typeof (req.query.name === 'string')) {
      for (const item of lists[req.query.list]) {
        console.log(req.query.name, item.name)
        if (item.name == req.query.name) {
          console.log("HERE")
          item.tagged = !item.tagged
          res.sendStatus(200)
          return
        }
      }
    }
  }
  res.sendStatus(400)
})

/*
 * This route simply returns the movie list.
 *
 * ex: '/list?list=movies'
 *
 * Returns '200' if the user supplied a valid movie name, and it was in the
 * list, otherwise '400'.
 */
app.get(prefix + 'list', function (req, res) {
  if (req.query.list && typeof (req.query.list === 'string')) {
    res.json(lists[req.query.list])
    return
  }
  res.sendStatus(400)
})

app.listen(8082)
console.log('Listening on port 8082...')
