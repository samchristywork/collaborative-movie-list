![Banner](https://s-christy.com/status-banner-service/collaborative-movie-list/banner-slim.svg)

## Overview

This is a simple web app that will allow my SO and me to keep and collaborate
on a list of movies to watch. It will run on a VPS behind an Nginx proxy.

When it is running, uses can add new movies to the list by clicking the "Add
Movie" button, and toggle a strikethrough line by clicking on the item in
question.

## Features

- Web app for creating a list of movies
- Simple user interface
- Movies can be toggled between watched and not watched
- Immutable list (items can be deleted from `localhost` only)
- Logging with `morgan` middleware
- Designed to be hosted behind Nginx or Apache proxy

## Setup

To run this server you first need to install all of the dependencies:

```
npm i
```

Then, start the server with:

```
node main.js
```

## Dependencies

You'll need to have Node.js installed for this to work.

```
nodejs
npm
```

## Credits

Photo by [Alessia C_Jpg](https://unsplash.com/photos/cGNVTBcP7vY)

## License

This work is licensed under the GNU General Public License version 3 (GPLv3).

[<img src="https://s-christy.com/status-banner-service/GPLv3_Logo.svg" width="150" />](https://www.gnu.org/licenses/gpl-3.0.en.html)
