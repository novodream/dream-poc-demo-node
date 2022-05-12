# Dream Demo Node

Simple nodejs express application using [DReAM](https://github.com/novopattern/dream-cli-poc.git) to manage external resources.

It exposes crud endpoints to read and edit a mongodb collection.
For demonstration purpose, mongodb will be provided and autoconfigured by dream.

## What is DReAM
DReAM or Developer Resources Auto-configuration Manager is an experimental tool 
that manages external resources you use in your app like databases. 
For example, you can add a database like mongo in your project just by running: `dream add mongo` 
and dream will deploy an instance of mongodb, inject the necessary environment variables and install 
necessary client libraries preconfigured to connect to the previously deployed database  without you having 
to manage a single connection string. 
You can just start inserting and reading data. 

For now, dream is experimental and work only for mongo as a proof of concept. 
DReAM is designed to work with any language, but for now, it only works with nodejs and go.

## Getting started

* Install [terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli)
* Install and start docker. You may use [docker-desktop](https://docs.docker.com/get-docker/)
* Install [nodejs](https://nodejs.org/en/download/).
* Clone the repository:

```shell
git clone https://github.com/novopattern/dream-poc-demo-node.git 
```

* In your terminal:

```shell
cd dream-poc-demo-node
```

* Install project's dependencies:

```shell
npm install
```

* Start the sample application and watch for changes:

```shell
npm run dev
```

* Test the root endpoint in another terminal tab or window:

```shell
curl localhost:3000/
```

## Adding mongodb with dream

* Install dream:

```shell
npm install -g @novopattern/dream-poc
```

* Run in the root directory of the project:

```shell
dream init -p npm
```

* Now run the following command:

```shell
dream add mongo
```

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
