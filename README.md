# Dream Demo Node

Simple nodejs express application using dream to manage external resources.

It exposes crud endpoints to read and edits a mongodb collection.
For demonstration purpose, mongodb will be provided and autoconfigured by dream.

## Getting started

* Install [terraform]()
* Install and start docker. You may use [docker-desktop]()
* Install [nodejs]().
* Clone the repository: `git clone https://github.com/novopattern/dream-poc-demo-node.git`
* In your terminal: `cd dream-poc-demo-node`
* Install project's dependencies: `npm install`
* Start the sample application and watch for changes: `npm run dev`
* Test the root endpoint in another terminal tab or window: `curl localhost:3000/`

## Adding mongodb with dream

* Install dream: `npm install -g @novopattern/dream-poc`
* Run in the root directory of the project: `dream init -p npm`
* Now run the following command: `dream add mongo`

## Adding CRUD routes

In `index.mjs` file, add the following imports:

```js
import {connect} from '@novopattern/dream-mongo-poc'
```

Then replace

```js 
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
```

by

```js
connect().then(() => {
    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
    })
})
```

This will ensure the connection to mongodb before the server starts up.

Crud endpoints are implemented in `movies.mjs` module. Add the following import in `index.mjs`file:

```js
import {moviesRouter} from "./movies.mjs"
```

Just bellow the line

```js
app.use(bodyParser.json())
```

add

```js
app.use('/movies', moviesRouter)
```

That's it, now you can perform CRUD operations to list, add, get and delete movies.

## Testing endpoints

Make sure your app is running with `npm run dev`.
In another terminal window, test the endpoints with curl. You may use other request tools like postman. In this
tutorial, we will cover curl.

* List movies: `curl localhost:3000/movies`
* Add a
  movie: `curl -X POST -H "Content-Type: application/json" localhost:3000/movies -d '{"title": "Back to the future", "year": 1985}'`
* Get a movie: `curl localhost:3000/movies/:id`
* Delete a movie: `curl -X DELETE localhost:3000/movies/:id`

## Removing mongo

To remove mongo from the app, first, remove any code using mongo and run: `dream remove mongo`.
