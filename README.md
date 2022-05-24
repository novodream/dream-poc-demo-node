# DReAM Demo Node

Simple nodejs express application using [DReAM](https://www.npmjs.com/package/@novopattern/dream-poc) to manage external
resources.

It exposes crud endpoints to read and edit a mongodb collection.
For demonstration purpose, mongodb will be provided and autoconfigured by dream.

## What is DReAM

DReAM or Developer Resources Auto-configuration Manager is an experimental tool
that manages external resources you use in your app like databases.
For example, you can add a database like mongo in your project just by running: `dream add mongo`
and dream will deploy an instance of mongodb, inject the necessary environment variables without you having
to manage a single connection string.
You can just start inserting and reading data.

For now, dream is experimental and work only for mongo as a proof of concept.
DReAM is designed to work with any language.

## Prerequisites

* Install and start docker. You may use [docker-desktop](https://docs.docker.com/get-docker/)
* Install [nodejs](https://nodejs.org/en/download/).

## Getting started

* Clone the repository:

```shell
git clone https://github.com/novodream/dream-poc-demo-node.git 
```

* In your terminal:

```shell
cd dream-poc-demo-node
```

* Install project's dependencies:

```shell
npm install
```

* Install dream:

```shell
npm install -g @novodream/cli-poc
```

* Run in the root directory of the project:

```shell
dream init
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

Keep the terminal tab or window running `npm run dev` and in another one,

* run the following command:

```shell
dream add mongo
```

## Adding CRUD routes

To connect to mongo, we are going to use [mongoose](https://mongoosejs.com), but you can use any mongo client you want,
but if you do, you will have to update the following instructions accordingly.

To install [mongoose](https://mongoosejs.com), run 
```shell
npm install mongoose
```

By running the app with `dream run <cmd>` via the script `npm run dev`,
dream has injected environment variables exported by the mongo package previously added.
One of them is `MONGO_URL`, the connection url to our mongo database.

In `index.mjs` file, add the following import:

```js
import mongoose from "mongoose";
```

Then replace

```js 
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
```

by

```js
mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(port, () => {
        console.log(`app listening on port ${port}`)
    })
})
```

This will ensure the connection to mongodb before the server starts up.

CRUD endpoints are implemented in `movies.mjs` module. Add the following import in `index.mjs`file:

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

* List movies:

```shell
curl localhost:3000/movies
```

* Add a movie:

```shell
curl -X POST -H "Content-Type: application/json" \
localhost:3000/movies \
-d '{"title": "Back to the future", "year": 1985}'
```

* Get a movie:

```shell
curl localhost:3000/movies/:id
```

* Delete a movie:

```shell
curl -X DELETE localhost:3000/movies/:id
```

## Removing mongo

To remove mongo from the app, first, remove any code using mongo and run:

```shell
dream remove mongo
```
